"use client";
import React from "react";
import { BookOpen } from "lucide-react";

export default function AdminHeader() {
    return (
        <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-stone-100">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 cursor-pointer">
                    <div className="text-orange-500">
                        <BookOpen size={24} fill="currentColor" strokeWidth={0} />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-stone-900">Voice Consults</span>
                </div>
                <span className="bg-stone-100 text-stone-500 text-xs font-bold px-2 py-1 rounded-md tracking-wider">ADMIN</span>
            </div>

            <div className="flex items-center gap-6 text-sm font-medium text-stone-600">
                <a href="/admin" className="hover:text-stone-900 transition-colors">Dashboard</a>
                <a href="/admin/reports" className="hover:text-stone-900 transition-colors">Reports</a>
                <button className="border border-stone-200 hover:border-stone-300 text-stone-700 px-4 py-2 rounded-full transition-colors">
                    Logout
                </button>
            </div>
        </header>
    );
}
