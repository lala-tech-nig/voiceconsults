"use client";
import React, { useState } from "react";
import { X, Mail, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SubscribeModal({ isOpen, onClose }) {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('https://voiceconsults.onrender.com/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            if (res.ok) {
                setSubmitted(true);
                if (typeof window !== 'undefined') {
                    localStorage.setItem('subscribed', 'true');
                }
                setTimeout(onClose, 3000);
            } else {
                alert("Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error(error);
            alert("Failed to subscribe.");
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl overflow-hidden"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-stone-400 hover:text-stone-600 transition-colors p-1"
                        >
                            <X size={20} />
                        </button>

                        <AnimatePresence mode="wait">
                            {!submitted ? (
                                <motion.div
                                    key="form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="text-center"
                                >
                                    <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <Mail className="text-orange-500" size={32} />
                                    </div>

                                    <h3 className="text-2xl font-bold text-stone-900 mb-2">Get Book Wisdom, Simply.</h3>
                                    <p className="text-stone-500 mb-8">Join 10,000+ others receiving our curated voice summaries of the world's best non-fiction.</p>

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                                            <input
                                                type="email"
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="Enter your email address"
                                                className="w-full pl-12 pr-4 py-3 border border-stone-200 rounded-full text-stone-700 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all bg-stone-50"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-full shadow-lg shadow-orange-500/20 transition-all transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
                                        >
                                            Subscribe Free
                                            <motion.span
                                                animate={{ x: [0, 5, 0] }}
                                                transition={{ repeat: Infinity, duration: 1.5 }}
                                            >→</motion.span>
                                        </button>
                                    </form>
                                    <p className="text-xs text-stone-400 mt-4">We respect your inbox. Unsubscribe at any time.</p>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-8"
                                >
                                    <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <Check className="text-orange-500" size={40} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-stone-900 mb-2">You're on the list!</h3>
                                    <p className="text-stone-500 mb-8">Welcome to the community. Your first summary is on its way.</p>
                                    <button
                                        onClick={onClose}
                                        className="w-full bg-stone-900 hover:bg-black text-white font-bold py-3 rounded-full transition-all cursor-pointer"
                                    >
                                        Continue to Site
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
