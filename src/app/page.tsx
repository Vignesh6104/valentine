"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

export default function ValentineProposal() {
  const [hasAccepted, setHasAccepted] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [noCount, setNoCount] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const moveButton = useCallback(() => {
    if (typeof window === "undefined") return;
    
    const btnWidth = 140; // Approximate button width
    const btnHeight = 50; // Approximate button height
    
    // Calculate random position within viewport bounds
    const newX = Math.random() * (window.innerWidth - btnWidth);
    const newY = Math.random() * (window.innerHeight - btnHeight);
    
    setNoButtonPos({ x: newX, y: newY });
    setNoCount((prev) => prev + 1);
  }, []);

  const handleYes = () => {
    setHasAccepted(true);
  };

  if (!isMounted) return <div className="min-h-screen bg-[#0f0101]" />;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#0f0101] overflow-hidden relative">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(120,0,0,0.15)_0%,_transparent_70%)]" />
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]" />

      <AnimatePresence mode="wait">
        {!hasAccepted ? (
          <motion.div
            key="proposal"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 text-center px-4"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="mb-8 inline-block"
            >
              <Heart className="w-16 h-16 text-[#d4af37] fill-[#d4af37] drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]" />
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-serif text-[#f5e6d3] mb-4 tracking-wider leading-tight">
              Will you be my <br />
              <span className="text-[#c41e3a] italic">Valentine?</span>
            </h1>

            <p className="text-[#a08a70] mb-12 max-w-md mx-auto font-light tracking-wide italic">
              "In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine."
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-8 min-h-[100px]">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(196, 30, 58, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                onClick={handleYes}
                className="px-12 py-4 bg-[#c41e3a] text-[#f5e6d3] rounded-full text-xl font-medium tracking-widest uppercase transition-colors hover:bg-[#a01830] shadow-lg shadow-red-900/20 border border-red-500/30"
              >
                Yes
              </motion.button>

              <motion.button
                animate={noCount > 0 ? { left: noButtonPos.x, top: noButtonPos.y } : {}}
                onMouseEnter={moveButton}
                onTouchStart={(e) => {
                  e.preventDefault(); // Prevent accidental clicks or scrolling
                  moveButton();
                }}
                onClick={moveButton}
                className="px-12 py-4 bg-transparent text-[#a08a70] border border-[#a08a70]/30 rounded-full text-xl font-medium tracking-widest uppercase hover:bg-white/5 transition-colors whitespace-nowrap"
                style={{ 
                  position: noCount > 0 ? "fixed" : "relative",
                  zIndex: 50,
                  touchAction: "none" // Disables browser handling of all panning and zooming gestures
                }}
              >
                {noCount === 0 ? "No" : noCount > 5 ? "Try Harder 😉" : "No"}
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="accepted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-10 text-center px-4"
          >
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Heart className="w-8 h-8 text-[#d4af37] fill-[#d4af37]" />
                </motion.div>
              ))}
            </div>

            <h2 className="text-5xl md:text-7xl font-serif text-[#f5e6d3] mb-6 tracking-widest italic">
              Yay! ❤️
            </h2>
            
            <p className="text-[#a08a70] text-xl font-light tracking-widest max-w-md mx-auto mb-12">
              You've made me the happiest person alive. <br />
              I can't wait to spend this day with you.
            </p>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 12, stiffness: 100, delay: 0.5 }}
              className="relative inline-block"
            >
              <div className="absolute inset-0 blur-2xl bg-[#c41e3a]/30 rounded-full" />
              <div className="relative border-2 border-[#d4af37]/40 p-8 rounded-full">
                <Sparkles className="w-12 h-12 text-[#d4af37] animate-pulse" />
              </div>
            </motion.div>

            {/* Floating Hearts Animation */}
            <div className="fixed inset-0 pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ 
                    x: typeof window !== "undefined" ? Math.random() * window.innerWidth : 0, 
                    y: typeof window !== "undefined" ? window.innerHeight + 100 : 0,
                    opacity: 0,
                    scale: Math.random() * 0.5 + 0.5
                  }}
                  animate={{ 
                    y: -100,
                    opacity: [0, 1, 1, 0],
                    rotate: 360
                  }}
                  transition={{ 
                    duration: Math.random() * 3 + 2,
                    repeat: Infinity,
                    delay: Math.random() * 5
                  }}
                  className="absolute text-[#c41e3a]"
                >
                  ❤️
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle floating particles or accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {isMounted && [...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#d4af37]/20 rounded-full"
            animate={{
              y: [-20, typeof window !== "undefined" ? window.innerHeight + 20 : 1000],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: -20,
            }}
          />
        ))}
      </div>
    </main>
  );
}
