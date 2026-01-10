"use client";
import React from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

export default function Hero() {
    return (
        <section className="px-6 py-8">
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                className="relative w-full rounded-3xl overflow-hidden bg-black text-white py-24 px-8 text-center"
            >
                {/* Subtle Background Gradient/Glow - matching the dark aesthetic in Image 3 */}
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800 via-black to-black opacity-50 z-0"></div>

                <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-5xl md:text-7xl font-bold tracking-tighter mb-6"
                    >
                        Voice Consults
                    </motion.h1>

                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-lg md:text-xl text-stone-300 max-w-2xl mb-10 leading-relaxed"
                    >
                        Curated Book Summaries for the Modern Mind. We distill hours of deep reading into minutes of engaging watching.
                    </motion.p>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg flex items-center gap-2 shadow-lg shadow-orange-500/20 transition-all cursor-pointer"
                    >
                        Start Watching
                    </motion.button>
                </div>
            </motion.div>
        </section>
    );
}
