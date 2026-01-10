"use client";
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import LatestSummaries from "../components/LatestSummaries";
import AboutSection from "../components/AboutSection";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";
import SubscribeModal from "../components/SubscribeModal";

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  // Show modal after 5 seconds automatically for demo effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-[#FDFBF7]">
      <Header />
      <Hero />
      <LatestSummaries />
      <AboutSection />
      <ContactForm />
      <Footer />

      <SubscribeModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </main>
  );
}
