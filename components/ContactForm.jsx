"use client";
import React, { useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactForm() {
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "General Inquiry",
        message: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('https://voiceconsults.onrender.com/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setSubmitted(true);
                setFormData({ name: "", email: "", subject: "General Inquiry", message: "" });
                setTimeout(() => setSubmitted(false), 5000);
            } else {
                alert("Failed to send message.");
            }
        } catch (error) {
            console.error(error);
            alert("Error sending message.");
        }
    };

    return (
        <section className="py-20 px-6 max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-stone-900 mb-2">Get in Touch</h2>
            <p className="text-stone-500 mb-12">Have a book suggestion or partnership inquiry?</p>

            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-stone-100 relative overflow-hidden min-h-[500px]">
                <AnimatePresence mode="wait">
                    {!submitted ? (
                        <motion.form
                            key="form"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onSubmit={handleSubmit}
                            className="grid grid-cols-1 md:grid-cols-2 gap-8"
                        >
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-stone-700 mb-2">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Your name"
                                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-stone-700 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-stone-700 mb-2">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="you@example.com"
                                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-stone-700 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-stone-700 mb-2">Subject</label>
                                    <div className="relative">
                                        <select
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-stone-700 appearance-none focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all cursor-pointer"
                                        >
                                            <option>General Inquiry</option>
                                            <option>Support</option>
                                            <option>Feedback</option>
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" size={16} />
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col h-full">
                                <label className="block text-sm font-bold text-stone-700 mb-2">Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="How can we help?"
                                    className="w-full flex-grow bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-stone-700 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all resize-none min-h-[200px]"
                                    required
                                ></textarea>
                                <div className="mt-6 flex justify-end">
                                    <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-orange-500/20 transition-all transform hover:scale-105 active:scale-95 cursor-pointer">
                                        Send Message
                                    </button>
                                </div>
                            </div>
                        </motion.form>
                    ) : (
                        <motion.div
                            key="success"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", duration: 0.6 }}
                            className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
                        >
                            <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mb-6">
                                <Check className="text-orange-500" size={40} />
                            </div>
                            <h3 className="text-2xl font-bold text-stone-900 mb-2">Message Sent Successfully</h3>
                            <p className="text-stone-500 text-lg">Thanks for reaching out! We'll get back to you soon.</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
