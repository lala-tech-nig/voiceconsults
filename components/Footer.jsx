"use client";
import React from "react";
import { BookOpen, Youtube, Twitter } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-white border-t border-stone-100 py-12">
            <div className="flex flex-col items-center justify-center gap-6">
                <div className="flex items-center gap-2 text-stone-900 font-bold text-lg">
                    <BookOpen className="text-orange-400" size={24} />
                    <span>Voice Consults</span>
                </div>

                <div className="flex items-center gap-6">
                    <a href="#" className="p-2 text-stone-500 hover:text-stone-900 transition-colors bg-stone-100 rounded-full hover:bg-stone-200">
                        <Youtube size={20} />
                    </a>
                    <a href="#" className="p-2 text-stone-500 hover:text-stone-900 transition-colors bg-stone-100 rounded-full hover:bg-stone-200">
                        <Twitter size={20} />
                    </a>
                </div>

                <p className="text-sm text-stone-400">
                    © 2026 Voice Consults. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
