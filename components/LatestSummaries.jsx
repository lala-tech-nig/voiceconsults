"use client";
import React, { useState, useEffect } from "react";
import VideoCard from "./VideoCard";

export default function LatestSummaries() {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5000/api/summaries')
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

    // Limit to 6 videos on homepage
    const displayedVideos = videos.slice(0, 6);

    return (
        <section className="px-6 py-20 max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-stone-900 mb-8">Latest Summaries</h2>

            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="w-8 h-8 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 row-gap-12">
                        {displayedVideos.length === 0 ? (
                            <p className="text-stone-500 mt-4 col-span-full text-center py-10 bg-stone-50 rounded-2xl">No summaries found. Add some from the Admin page!</p>
                        ) : (
                            displayedVideos.map((video, index) => (
                                <VideoCard
                                    key={video._id}
                                    title={video.title}
                                    duration={video.duration}
                                    image={video.thumbnail}
                                    videoUrl={video.videoUrl}
                                    delay={index * 0.1}
                                />
                            ))
                        )}
                    </div>

                    <div className="flex justify-center mt-12">
                        <a
                            href="/summaries"
                            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-orange-500/20 transition-all transform hover:scale-105 active:scale-95"
                        >
                            View All Summaries
                        </a>
                    </div>
                </>
            )}
        </section>
    );
}
