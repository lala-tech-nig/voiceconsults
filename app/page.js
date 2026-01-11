"use client";
import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import Header from "../components/Header";
import Hero from "../components/Hero";
import LatestSummaries from "../components/LatestSummaries";
import Merchandise from "../components/Merchandise";
import AboutSection from "../components/AboutSection";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";
import SubscribeModal from "../components/SubscribeModal";

// Utility hook for window size
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Initialize
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [recycleConfetti, setRecycleConfetti] = useState(true);
  const { width, height } = useWindowSize();

  useEffect(() => {
    // Show modal after 5 seconds ONLY if not already subscribed
    const modalTimer = setTimeout(() => {
      if (!localStorage.getItem('subscribed')) {
        setShowModal(true);
      }
    }, 5000);

    // Stop recycling confetti after 7 seconds
    const confettiTimer = setTimeout(() => {
      setRecycleConfetti(false);
    }, 7000);

    return () => {
      clearTimeout(modalTimer);
      clearTimeout(confettiTimer);
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#FDFBF7]">
      <Confetti
        width={width}
        height={height}
        recycle={recycleConfetti}
        numberOfPieces={500}
        gravity={0.15}
      />

      <Header />
      <Hero />
      <LatestSummaries />
      <Merchandise />
      <AboutSection />
      <ContactForm />
      <Footer />

      <SubscribeModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </main>
  );
}
