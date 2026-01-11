"use client";
import React from "react";
import { Play, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function VideoCard({ title, duration, image, videoUrl, delay }) {
    const handleClick = () => {
        if (videoUrl) {
            window.open(videoUrl, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: delay, duration: 0.5 }}
            whileHover={{ y: -5 }}
            onClick={handleClick}
            className="group cursor-pointer"
        >
            <div className="relative aspect-video rounded-2xl overflow-hidden mb-4 shadow-md bg-stone-200">
                {/* Placeholder gradient/image */}
                <div className={`absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110`} style={{ backgroundImage: `url(${image})` }}></div>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>

                {/* Duration Badge */}
                <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1">
                    <Clock size={10} />
                    {duration}
                </div>

                {/* Play Icon Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/90 p-4 rounded-full shadow-lg transform scale-50 group-hover:scale-100 transition-transform duration-300">
                        <Play className="text-orange-500 fill-orange-500 ml-1" size={24} />
                    </div>
                </div>
            </div>

            <h3 className="text-lg font-bold text-stone-900 group-hover:text-orange-600 transition-colors mb-1 line-clamp-1">{title}</h3>
            <p className="text-sm text-stone-500 line-clamp-2">
                Timeless lessons on wealth, greed, and happiness. Why how you behave matters more than what you know.
            </p>
        </motion.div>
    );
}
