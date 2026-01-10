"use client";
import React, { useState } from "react";
import { ArrowLeft, Link as LinkIcon, Image as ImageIcon, Sparkles, Plus, X, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import AdminHeader from "../../components/AdminHeader";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminPage() {
    const [tags, setTags] = useState(["Productivity"]);
    const [formData, setFormData] = useState({
        title: "",
        videoUrl: "",
        thumbnail: "",
        description: ""
    });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null); // 'success' or 'error'

    const removeTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFetchMetadata = async () => {
        if (!formData.videoUrl) return;

        try {
            const res = await fetch('http://localhost:5000/api/metadata', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ videoUrl: formData.videoUrl })
            });

            if (!res.ok) throw new Error("Failed to fetch");

            const data = await res.json();
            setFormData(prev => ({
                ...prev,
                title: data.title || "",
                description: data.description || "",
                thumbnail: data.thumbnail || "",
                // Store duration implicitly or add a field if backend schema supports it (which it does now)
            }));
        } catch (error) {
            setStatus('error');
            setTimeout(() => setStatus(null), 3000);
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        setStatus(null);
        try {
            const res = await fetch('http://localhost:5000/api/summaries', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...formData, tags }),
            });

            if (!res.ok) throw new Error('Failed to create summary');

            setStatus('success');
            setFormData({ title: "", videoUrl: "", thumbnail: "", description: "" });
            setTags(["Productivity"]);
        } catch (error) {
            console.error(error);
            setStatus('error');
        } finally {
            setLoading(false);
        }
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

                <div className="bg-white rounded-3xl p-8 shadow-sm border border-stone-100 relative overflow-hidden">

                    <AnimatePresence>
                        {status === 'success' && (
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="mb-6 p-4 bg-green-50 text-green-700 rounded-xl flex items-center gap-2 border border-green-100"
                            >
                                <CheckCircle size={20} />
                                Summary published successfully!
                                <button onClick={() => setStatus(null)} className="ml-auto hover:bg-green-100 p-1 rounded-full"><X size={16} /></button>
                            </motion.div>
                        )}
                        {status === 'error' && (
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl flex items-center gap-2 border border-red-100"
                            >
                                <AlertCircle size={20} />
                                Something went wrong. Please try again.
                                <button onClick={() => setStatus(null)} className="ml-auto hover:bg-red-100 p-1 rounded-full"><X size={16} /></button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* YouTube Link */}
                    <div className="mb-8">
                        <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">YouTube Link</label>
                        <div className="relative">
                            <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                            <input
                                type="text"
                                name="videoUrl"
                                value={formData.videoUrl}
                                onChange={handleChange}
                                placeholder="https://youtube.com/watch?v=..."
                                className="w-full pl-12 pr-20 py-3 border border-stone-200 rounded-xl text-stone-700 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all bg-stone-50"
                            />
                            <button
                                onClick={handleFetchMetadata}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-orange-600 hover:text-orange-700 font-bold text-sm px-3 py-1"
                            >
                                Fetch
                            </button>
                        </div>
                    </div>

                    {/* Thumbnail Preview */}
                    <div className="mb-8">
                        <div className="w-full aspect-video bg-stone-50 border-2 border-dashed border-stone-200 rounded-2xl flex flex-col items-center justify-center text-stone-400 overflow-hidden relative">
                            {formData.thumbnail ? (
                                <img src={formData.thumbnail} alt="Thumbnail preview" className="w-full h-full object-cover" />
                            ) : (
                                <>
                                    <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mb-3 text-stone-300">
                                        <ImageIcon size={24} />
                                    </div>
                                    <span className="font-bold text-stone-500 mb-1">Thumbnail Preview</span>
                                    <span className="text-xs">Paste a valid YouTube link above to automatically load the thumbnail.</span>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Video Title */}
                    <div className="mb-8">
                        <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">Video Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
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
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
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
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-orange-500/20 transition-all transform hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {loading && <Loader2 className="animate-spin" size={20} />}
                            {loading ? 'Publishing...' : 'Publish Video'}
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
