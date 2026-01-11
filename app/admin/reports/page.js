"use client";
import React, { useState, useEffect } from "react";
import { ArrowLeft, Users, MessageSquare, Mail, Calendar, Search } from "lucide-react";
import AdminHeader from "../../../components/AdminHeader";
import { motion } from "framer-motion";

export default function ReportsPage() {
    const [activeTab, setActiveTab] = useState("subscribers");
    const [subscribers, setSubscribers] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [subRes, contactRes] = await Promise.all([
                fetch('https://voiceconsults.onrender.com/api/subscribers'),
                fetch('https://voiceconsults.onrender.com/api/contacts')
            ]);

            const subData = await subRes.json();
            const contactData = await contactRes.json();

            setSubscribers(subData);
            setContacts(contactData);
        } catch (error) {
            console.error("Failed to fetch reports:", error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7]">
            <AdminHeader />

            <main className="max-w-6xl mx-auto py-12 px-6">
                <a href="/admin" className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors mb-8 font-medium">
                    <ArrowLeft size={18} />
                    Back to Dashboard
                </a>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-stone-900 mb-2">Reports & Analytics</h1>
                        <p className="text-stone-500">Track your community growth and messages.</p>
                    </div>

                    <div className="flex bg-white p-1 rounded-xl border border-stone-200 shadow-sm">
                        <button
                            onClick={() => setActiveTab("subscribers")}
                            className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === "subscribers" ? "bg-orange-50 text-orange-700 shadow-sm" : "text-stone-500 hover:bg-stone-50"}`}
                        >
                            <div className="flex items-center gap-2">
                                <Users size={16} />
                                Subscribers
                                <span className={`ml-1 text-xs px-2 py-0.5 rounded-full ${activeTab === "subscribers" ? "bg-orange-200 text-orange-800" : "bg-stone-100 text-stone-600"}`}>
                                    {subscribers.length}
                                </span>
                            </div>
                        </button>
                        <button
                            onClick={() => setActiveTab("contacts")}
                            className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === "contacts" ? "bg-orange-50 text-orange-700 shadow-sm" : "text-stone-500 hover:bg-stone-50"}`}
                        >
                            <div className="flex items-center gap-2">
                                <MessageSquare size={16} />
                                Messages
                                <span className={`ml-1 text-xs px-2 py-0.5 rounded-full ${activeTab === "contacts" ? "bg-orange-200 text-orange-800" : "bg-stone-100 text-stone-600"}`}>
                                    {contacts.length}
                                </span>
                            </div>
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-20 bg-white rounded-3xl border border-stone-100 shadow-sm">
                        <div className="w-8 h-8 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="bg-white rounded-3xl overflow-hidden border border-stone-100 shadow-sm min-h-[400px]">
                        {activeTab === "subscribers" && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="overflow-x-auto"
                            >
                                <table className="w-full text-left">
                                    <thead className="bg-stone-50 border-b border-stone-100">
                                        <tr>
                                            <th className="px-8 py-4 text-xs font-bold text-stone-400 uppercase tracking-wider">Email Address</th>
                                            <th className="px-8 py-4 text-xs font-bold text-stone-400 uppercase tracking-wider">Date Subscribed</th>
                                            <th className="px-8 py-4 text-xs font-bold text-stone-400 uppercase tracking-wider">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-stone-100">
                                        {subscribers.length === 0 ? (
                                            <tr>
                                                <td colSpan="3" className="px-8 py-12 text-center text-stone-400">No subscribers yet.</td>
                                            </tr>
                                        ) : (
                                            subscribers.map((sub, idx) => (
                                                <tr key={idx} className="hover:bg-stone-50/50 transition-colors">
                                                    <td className="px-8 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                                                                <Mail size={14} />
                                                            </div>
                                                            <span className="font-medium text-stone-700">{sub.email}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-4 text-stone-500 text-sm">
                                                        <div className="flex items-center gap-2">
                                                            <Calendar size={14} className="text-stone-300" />
                                                            {formatDate(sub.createdAt)}
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-4">
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                            Active
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </motion.div>
                        )}

                        {activeTab === "contacts" && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="divide-y divide-stone-100"
                            >
                                {contacts.length === 0 ? (
                                    <div className="px-8 py-12 text-center text-stone-400">No messages yet.</div>
                                ) : (
                                    contacts.map((msg, idx) => (
                                        <div key={idx} className="p-8 hover:bg-stone-50/50 transition-colors group">
                                            <div className="flex justify-between items-start mb-2">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center text-stone-500 font-bold uppercase">
                                                        {msg.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-stone-900">{msg.subject}</h3>
                                                        <p className="text-sm text-stone-500">From: <span className="text-stone-900 font-medium">{msg.name}</span> &lt;{msg.email}&gt;</p>
                                                    </div>
                                                </div>
                                                <span className="text-xs text-stone-400 font-medium whitespace-nowrap">
                                                    {formatDate(msg.createdAt)}
                                                </span>
                                            </div>
                                            <div className="pl-13 mt-4">
                                                <p className="text-stone-600 bg-stone-50/50 p-4 rounded-2xl border border-stone-100 leading-relaxed text-sm">
                                                    {msg.message}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </motion.div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}