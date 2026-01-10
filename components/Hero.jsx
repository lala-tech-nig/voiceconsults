"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Play } from "lucide-react";

const slides = [
    {
        id: 1,
        title: "Unlock 100+ Minds",
        description: "Access the distilled wisdom of the world's greatest thinkers. From psychology to productivity, we have it all.",
        gradient: "from-orange-500 via-red-600 to-purple-600",
        buttonText: "Start Learning",
    },
    {
        id: 2,
        title: "Read Less, Know More",
        description: "Stop drowning in information. Start swimming in wisdom. 15-minute video summaries that stick.",
        gradient: "from-blue-600 via-indigo-700 to-purple-800",
        buttonText: "Explore Library",
    },
    {
        id: 3,
        title: "Your Daily Brain Upgrade",
        description: "Transform your commute into a masterclass. Level up your career, relationships, and health.",
        gradient: "from-emerald-500 via-teal-600 to-cyan-700",
        buttonText: "Join Now",
    }
];

export default function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

    return (
        <section className="px-6 py-8">
            <div className="relative w-full rounded-3xl overflow-hidden bg-black text-white h-[600px] shadow-2xl">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.7 }}
                        className={`absolute inset-0 bg-gradient-to-br ${slides[currentSlide].gradient} opacity-40`}
                    />
                </AnimatePresence>

                {/* Texture Overlay */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-150 contrast-150"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

                <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentSlide}
                            className="max-w-4xl mx-auto"
                        >
                            <motion.h1
                                initial={{ y: 40, opacity: 0, filter: "blur(10px)" }}
                                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                                exit={{ y: -40, opacity: 0, filter: "blur(10px)" }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 drop-shadow-lg"
                            >
                                {slides[currentSlide].title}
                            </motion.h1>

                            <motion.p
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                                className="text-lg md:text-2xl text-stone-200 max-w-2xl mx-auto mb-12 leading-relaxed font-medium drop-shadow-md"
                            >
                                {slides[currentSlide].description}
                            </motion.p>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="bg-white text-black px-10 py-5 rounded-full font-bold text-lg flex items-center gap-2 mx-auto shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-10px_rgba(255,255,255,0.5)] transition-all cursor-pointer group"
                            >
                                <Play className="fill-black group-hover:scale-110 transition-transform" size={20} />
                                {slides[currentSlide].buttonText}
                            </motion.button>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Navigation Dots */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4 z-20">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${index === currentSlide ? "w-12 bg-white" : "w-2 bg-white/30 hover:bg-white/50"
                                }`}
                        />
                    ))}
                </div>

                {/* Arrows */}
                <button
                    onClick={prevSlide}
                    className="absolute left-8 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-md p-3 rounded-full text-white transition-all cursor-pointer group hidden md:block"
                >
                    <ChevronLeft className="group-hover:-translate-x-1 transition-transform" />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-8 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-md p-3 rounded-full text-white transition-all cursor-pointer group hidden md:block"
                >
                    <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </section>
    );
}
