"use client";
import React from "react";
import { BookOpen, Clock, Eye, Users } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutSection() {
    const features = [
        {
            icon: <BookOpen className="text-orange-500" size={24} />,
            title: "Curated Selection",
            description: "Only the most impactful books.",
            bg: "bg-orange-50"
        },
        {
            icon: <Clock className="text-orange-500" size={24} />,
            title: "Time Efficient",
            description: "Key takeaways in <10 mins.",
            bg: "bg-orange-50"
        },
        {
            icon: <Eye className="text-orange-500" size={24} />,
            title: "Visual Learning",
            description: "Animations for complex ideas.",
            bg: "bg-orange-50"
        },
        {
            icon: <Users className="text-orange-500" size={24} />,
            title: "Community",
            description: "Join 10k+ active learners.",
            bg: "bg-stone-50"
        }
    ];

    return (
        <section className="bg-stone-50/50 py-20 px-6">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
                {/* Left Text Content */}
                <div className="lg:w-1/3">
                    <h2 className="text-3xl font-bold text-stone-900 mb-6">About Voice Consults</h2>
                    <p className="text-stone-600 mb-6 leading-relaxed">
                        In an age of information overload, wisdom is often lost in noise. Voice Consults was founded on a simple mission: to distill the world's most valuable non-fiction books into accessible, engaging video summaries.
                    </p>
                    <p className="text-stone-600 leading-relaxed">
                        Join 10,000+ others who are learning faster, thinking deeper, and applying key insights to their daily lives without spending hours reading every page.
                    </p>
                </div>

                {/* Right Feature Grid */}
                <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 hover:shadow-md transition-all"
                        >
                            <div className={`w-10 h-10 ${feature.bg} rounded-full flex items-center justify-center mb-4`}>
                                {feature.icon}
                            </div>
                            <h3 className="text-lg font-bold text-stone-900 mb-2">{feature.title}</h3>
                            <p className="text-sm text-stone-500">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
