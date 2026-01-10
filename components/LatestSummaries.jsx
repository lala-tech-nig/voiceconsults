"use client";
import React from "react";
import VideoCard from "./VideoCard";

export default function LatestSummaries() {
    const videos = [
        { title: "The Psychology of Money", duration: "08:24", image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=800&auto=format&fit=crop" },
        { title: "Atomic Habits", duration: "12:15", image: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0fe?q=80&w=800&auto=format&fit=crop" },
        { title: "Deep Work", duration: "09:50", image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800&auto=format&fit=crop" },
        { title: "Sapiens: A Brief History", duration: "15:30", image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop" },
        { title: "Thinking, Fast and Slow", duration: "11:05", image: "https://images.unsplash.com/photo-1555445054-848885171438?q=80&w=800&auto=format&fit=crop" },
        { title: "The 4-Hour Work Week", duration: "07:45", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop" }
    ];

    return (
        <section className="px-6 py-20 max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-stone-900 mb-8">Latest Summaries</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 row-gap-12">
                {videos.map((video, index) => (
                    <VideoCard
                        key={index}
                        {...video}
                        delay={index * 0.1}
                    />
                ))}
            </div>
        </section>
    );
}
