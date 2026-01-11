"use client";
import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import VideoCard from "../../components/VideoCard";

export default function AllSummariesPage() {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://voiceconsults.onrender.com/api/summaries')
            .then(res => res.json())
            .then(data => {
                setVideos(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch summaries:", err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="min-h-screen bg-[#FDFBF7]">
            {/* Header */}
            <header className="bg-white border-b border-stone-100 sticky top-0 z-50 backdrop-blur-sm bg-white/90">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <a href="/" className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors font-medium">
                        <ArrowLeft size={18} />
                        Back to Home
                    </a>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 py-12">
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-stone-900 mb-3">All Video Summaries</h1>
                    <p className="text-stone-500 text-lg">
                        Browse our complete collection of book summary videos
                    </p>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="w-8 h-8 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {videos.length === 0 ? (
                            <p className="text-stone-500 mt-4 col-span-full text-center py-10 bg-stone-50 rounded-2xl">
                                No summaries found. Add some from the Admin page!
                            </p>
                        ) : (
                            videos.map((video, index) => (
                                <VideoCard
                                    key={video._id}
                                    title={video.title}
                                    duration={video.duration}
                                    image={video.thumbnail}
                                    videoUrl={video.videoUrl}
                                    delay={index * 0.05}
                                />
                            ))
                        )}
                    </div>
                )}

                {/* Summary Count */}
                {!loading && videos.length > 0 && (
                    <div className="mt-12 text-center">
                        <p className="text-stone-500 font-medium">
                            Showing {videos.length} {videos.length === 1 ? 'summary' : 'summaries'}
                        </p>
                    </div>
                )}
            </main>
        </div>
    );
}
