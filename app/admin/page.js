"use client";
import React, { useState } from "react";
import { ArrowLeft, Link as LinkIcon, Image as ImageIcon, Sparkles, Plus, X } from "lucide-react";
import AdminHeader from "../../components/AdminHeader";
import { motion } from "framer-motion";

export default function AdminPage() {
    const [tags, setTags] = useState(["Productivity"]);

    const removeTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7]">
            <AdminHeader />

            <main className="max-w-4xl mx-auto py-12 px-6">
                <a href="/" className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors mb-8 font-medium">
                    <ArrowLeft size={18} />
                    Back to Dashboard
                </a>

                <h1 className="text-4xl font-bold text-stone-900 mb-2">Post New Video</h1>
                <p className="text-stone-500 mb-10">Add a new book summary to your video library.</p>

                <div className="bg-white rounded-3xl p-8 shadow-sm border border-stone-100">
                    {/* YouTube Link */}
                    <div className="mb-8">
                        <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">YouTube Link</label>
                        <div className="relative">
                            <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                            <input
                                type="text"
                                placeholder="https://youtube.com/watch?v=..."
                                className="w-full pl-12 pr-20 py-3 border border-stone-200 rounded-xl text-stone-700 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all bg-stone-50"
                            />
                            <button className="absolute right-2 top-1/2 -translate-y-1/2 text-orange-600 hover:text-orange-700 font-bold text-sm px-3 py-1">
                                Fetch
                            </button>
                        </div>
                    </div>

                    {/* Thumbnail Preview */}
                    <div className="mb-8">
                        <div className="w-full aspect-video bg-stone-50 border-2 border-dashed border-stone-200 rounded-2xl flex flex-col items-center justify-center text-stone-400">
                            <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mb-3 text-stone-300">
                                <ImageIcon size={24} />
                            </div>
                            <span className="font-bold text-stone-500 mb-1">Thumbnail Preview</span>
                            <span className="text-xs">Paste a valid YouTube link above to automatically load the thumbnail.</span>
                        </div>
                    </div>

                    {/* Video Title */}
                    <div className="mb-8">
                        <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">Video Title</label>
                        <input
                            type="text"
                            placeholder="e.g. Atomic Habits: An Easy & Proven Way"
                            className="w-full px-4 py-3 border border-stone-200 rounded-xl text-stone-700 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all bg-stone-50"
                        />
                    </div>

                    {/* Description */}
                    <div className="mb-8 relative">
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider">Description</label>
                            <button className="text-xs font-bold text-orange-500 hover:text-orange-600 flex items-center gap-1">
                                <Sparkles size={12} />
                                Generate with AI
                            </button>
                        </div>
                        <textarea
                            placeholder="Summarize the key takeaways and main concepts covered in the video..."
                            className="w-full h-32 px-4 py-3 border border-stone-200 rounded-xl text-stone-700 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all bg-stone-50 resize-none"
                        ></textarea>
                        <div className="absolute bottom-3 right-3 text-xs text-stone-300 font-medium">Markdown Supported</div>
                    </div>

                    {/* Tags */}
                    <div className="mb-12">
                        <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">Tags</label>
                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag, index) => (
                                <span key={index} className="bg-orange-50 text-orange-700 font-medium px-3 py-1.5 rounded-full text-sm flex items-center gap-1 border border-orange-100">
                                    {tag}
                                    <button onClick={() => removeTag(tag)} className="hover:text-orange-900"><X size={14} /></button>
                                </span>
                            ))}
                            <button className="bg-stone-50 hover:bg-stone-100 text-stone-500 font-medium px-3 py-1.5 rounded-full text-sm flex items-center gap-1 border border-stone-200 transition-colors">
                                <Plus size={14} />
                                Add Tag
                            </button>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-4 border-t border-stone-100 pt-8">
                        <button className="text-stone-500 hover:text-stone-900 font-bold px-6 py-3 transition-colors">
                            Save Draft
                        </button>
                        <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-orange-500/20 transition-all transform hover:scale-105 active:scale-95">
                            Publish Video
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
