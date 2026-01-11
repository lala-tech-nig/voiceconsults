"use client";
import React, { useState, useEffect } from "react";
import { ArrowLeft, Sparkles } from "lucide-react";
import VideoCard from "../../components/VideoCard";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { motion, AnimatePresence } from "framer-motion";

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
            <Header />

            {/* Hero Section for Summaries */}
            <div className="relative overflow-hidden bg-white border-b border-stone-100 py-16 px-6">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-orange-50/50 -z-10" style={{ clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0% 100%)' }}></div>

                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <a href="/" className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors font-medium mb-8">
                            <ArrowLeft size={18} />
                            Back to Home
                        </a>

                        <h1 className="text-5xl font-bold text-stone-900 mb-4 tracking-tight">
                            All Video <span className="text-orange-500">Summaries</span>
                        </h1>
                        <p className="text-stone-500 text-xl max-w-2xl leading-relaxed">
                            Explore our complete library of insightful book summaries and key takeaways, perfectly curated for your growth.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 py-20">
                <AnimatePresence mode="wait">
                    {loading ? (
                        <motion.div
                            key="loader"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center py-32"
                        >
                            <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mb-4"></div>
                            <p className="text-stone-400 font-medium">Loading collection...</p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="grid"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="flex items-center justify-between mb-10">
                                <div className="flex items-center gap-2 text-stone-900 font-bold">
                                    <Sparkles className="text-orange-400" size={20} />
                                    <span>{videos.length} {videos.length === 1 ? 'Summary' : 'Summaries'} Total</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
                                {videos.length === 0 ? (
                                    <div className="col-span-full py-20 bg-white rounded-3xl border border-dashed border-stone-200 text-center">
                                        <p className="text-stone-500 text-lg">No summaries found. Add some from the Admin page!</p>
                                    </div>
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
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            <Footer />
        </div>
    );
}
