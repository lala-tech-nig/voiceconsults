const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Summary = require('./models/Summary');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb+srv://olaniyanshamsudeenyinka001_db_user:nx7yxFZMmSx7yFH4@cluster0.rbxdroe.mongodb.net/summaries?appName=Cluster0')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Helper: Parse ISO 8601 duration (PT8M24S -> 08:24)
const parseDuration = (isoDuration) => {
    if (!isoDuration) return "10:00";
    const matches = isoDuration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!matches) return "10:00";

    const hours = (matches[1] || '').replace('H', '');
    const minutes = (matches[2] || '').replace('M', '');
    const seconds = (matches[3] || '').replace('S', '');

    let duration = '';
    if (hours) duration += `${hours.padStart(2, '0')}:`;
    duration += `${(minutes || '0').padStart(2, '0')}:`;
    duration += `${(seconds || '0').padStart(2, '0')}`;

    return duration.startsWith('00:') ? duration.substring(3) : duration; // Remove leading 00: if just minutes
};

// Helper: Fetch YouTube Metadata
const fetchYouTubeMetadata = async (url) => {
    try {
        const response = await fetch(url);
        const text = await response.text();

        // Extract using regex
        const titleMatch = text.match(/<meta name="title" content="(.*?)"/);
        const descMatch = text.match(/<meta name="description" content="(.*?)"/);
        const imageMatch = text.match(/<meta property="og:image" content="(.*?)"/);
        const durationMatch = text.match(/<meta itemprop="duration" content="(.*?)"/);

        return {
            title: titleMatch ? titleMatch[1] : "",
            description: descMatch ? descMatch[1] : "",
            thumbnail: imageMatch ? imageMatch[1] : "",
            duration: durationMatch ? parseDuration(durationMatch[1]) : "10:00"
        };
    } catch (error) {
        console.error("Error scraping YouTube:", error);
        return null;
    }
};

// Routes

// GET: Root
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// GET: Fetch all summaries
app.get('/api/summaries', async (req, res) => {
    try {
        const summaries = await Summary.find().sort({ createdAt: -1 });
        res.json(summaries);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST: Fetch Metadata (New Endpoint used by Fetch Button)
app.post('/api/metadata', async (req, res) => {
    const { videoUrl } = req.body;
    if (!videoUrl) return res.status(400).json({ message: "No URL provided" });

    const metadata = await fetchYouTubeMetadata(videoUrl);
    if (metadata) {
        res.json(metadata);
    } else {
        res.status(500).json({ message: "Failed to fetch metadata" });
    }
});

// POST: Create a new summary
app.post('/api/summaries', async (req, res) => {
    let { title, videoUrl, thumbnail, description, tags, duration } = req.body;

    // If details are missing, try to fetch them
    if (!title || !description || !thumbnail) {
        console.log("Missing fields, attempting to auto-fetch from URL...");
        const metadata = await fetchYouTubeMetadata(videoUrl);
        if (metadata) {
            title = title || metadata.title;
            description = description || metadata.description;
            thumbnail = thumbnail || metadata.thumbnail;
            duration = duration || metadata.duration;
        }
    }

    const summary = new Summary({
        title,
        videoUrl,
        thumbnail: thumbnail || "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=800&auto=format&fit=crop",
        description,
        duration: duration || "10:00"
    });

    try {
        const newSummary = await summary.save();
        res.status(201).json(newSummary);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});
