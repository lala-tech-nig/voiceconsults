"use client";
import React from "react";
import { Search, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

export default function Header() {
  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-[#FDFBF7]/80 backdrop-blur-md border-b border-stone-100"
    >
      <div className="flex items-center gap-2 cursor-pointer">
        <div className="text-orange-500">
           {/* Logo Icon Placeholder - using BookOpen for now as implied by context */}
           <BookOpen size={24} fill="currentColor" strokeWidth={0} /> 
        </div>
        <span className="text-xl font-bold tracking-tight text-stone-900">Voice Consults</span>
      </div>

      <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-500">
        <a href="#" className="hover:text-stone-900 transition-colors">Videos</a>
        <a href="#" className="hover:text-stone-900 transition-colors">About</a>
        <a href="#" className="hover:text-stone-900 transition-colors">Login</a>
      </nav>

      <div className="flex items-center gap-4">
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search" 
            className="pl-9 pr-4 py-2 bg-white border border-stone-200 rounded-full text-sm text-stone-700 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400 transition-all w-64 shadow-sm placeholder:text-stone-300"
          />
        </div>
        <button className="bg-orange-200/50 hover:bg-orange-200 text-orange-700 px-5 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer">
          Subscribe
        </button>
      </div>
    </motion.header>
  );
}
