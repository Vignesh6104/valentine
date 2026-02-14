"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Music, Volume2, VolumeX, RefreshCw } from "lucide-react";

// --- Components ---

const FloatingPetals = () => {
  const [petals, setPetals] = useState<{ id: number; left: number; delay: number; duration: number }[]>([]);

  useEffect(() => {
    const newPetals = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: Math.random() * 10 + 10,
    }));
    setPetals(newPetals);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute text-xl md:text-2xl opacity-70"
          initial={{ y: -50, rotate: 0, opacity: 0 }}
          animate={{
            y: "110vh",
            rotate: 360,
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: petal.duration,
            repeat: Infinity,
            delay: petal.delay,
            ease: "linear",
          }}
          style={{ left: `${petal.left}%` }}
        >
          🌹
        </motion.div>
      ))}
    </div>
  );
};

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("https://cdn.pixabay.com/download/audio/2022/10/25/audio_24925e00a2.mp3?filename=romantic-piano-125048.mp3"); // Free generic romantic piano music
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <button
      onClick={toggleMusic}
      className="fixed top-4 right-4 z-50 p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-[#f5e6d3] hover:bg-white/20 transition-all shadow-lg"
      aria-label="Toggle Music"
    >
      {isPlaying ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
    </button>
  );
};

const DateIdeaGenerator = () => {
  const ideas = [
    "Candlelit Dinner at Home 🕯️",
    "Stargazing Night 🌌",
    "Movie Marathon & Cuddles 🎬",
    "Cooking a New Recipe Together 🍝",
    "Sunset Picnic in the Park 🧺",
    "Late Night Drive with Music 🚗",
    "Building a Blanket Fort 🏰",
    "Wine & Paint Night 🍷",
    "Breakfast in Bed 🥞",
    "Recreating Our First Date ❤️"
  ];
  
  const [idea, setIdea] = useState("");

  const generateIdea = () => {
    const randomIdea = ideas[Math.floor(Math.random() * ideas.length)];
    setIdea(randomIdea);
  };

  return (
    <div className="mt-8 text-center">
      <h3 className="text-xl text-[#d4af37] font-serif italic mb-4">Let's plan our date...</h3>
      <motion.div 
        className="min-h-[60px] flex items-center justify-center"
        initial={false}
        animate={idea ? { scale: [0.9, 1.1, 1] } : {}}
      >
        {idea ? (
          <p className="text-2xl text-[#f5e6d3] font-medium drop-shadow-md">{idea}</p>
        ) : (
          <p className="text-white/40 text-sm">Click the button below</p>
        )}
      </motion.div>
      <button
        onClick={generateIdea}
        className="mt-4 px-6 py-2 bg-[#c41e3a]/80 text-white rounded-full flex items-center gap-2 mx-auto hover:bg-[#c41e3a] transition-all"
      >
        <RefreshCw className="w-4 h-4" /> Generate Idea
      </button>
    </div>
  );
};

// --- Main Page ---

export default function ValentineProposal() {
  const [hasAccepted, setHasAccepted] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [noCount, setNoCount] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [showEnvelope, setShowEnvelope] = useState(false);
  const [isLetterOpen, setIsLetterOpen] = useState(false);

  const noMessages = [
    "No",
    "Are you sure?",
    "Really sure?",
    "Think again!",
    "Last chance!",
    "Surely not?",
    "You might regret this!",
    "Give it another thought!",
    "Are you absolutely certain?",
    "This could be a mistake!",
    "Have a heart!",
    "Don't be so cold!",
    "Change of heart?",
    "Wouldn't you reconsider?",
    "Is that your final answer?",
    "You're breaking my heart ;(",
    "Pls? 🥺",
    "Pretty pls? 🍒",
    "With a cherry on top?",
    "I'll make cookies!",
    "And get you chocolate!",
    "And give back rubs!",
    "Okay, now you're just being mean!",
  ];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const moveButton = useCallback(() => {
    if (typeof window === "undefined") return;
    
    const btnWidth = 150; 
    const btnHeight = 60; 
    
    const newX = Math.random() * (window.innerWidth - btnWidth);
    const newY = Math.random() * (window.innerHeight - btnHeight);
    
    setNoButtonPos({ x: newX, y: newY });
    setNoCount((prev) => prev + 1);
  }, []);

  const handleYes = () => {
    setHasAccepted(true);
    // Delay showing the envelope slightly for transition
    setTimeout(() => setShowEnvelope(true), 500);
  };

  const getNoText = () => {
    return noMessages[Math.min(noCount, noMessages.length - 1)];
  };

  if (!isMounted) return <div className="min-h-screen bg-[#0f0101]" />;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#0f0101] overflow-hidden relative selection:bg-[#c41e3a] selection:text-white">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#2d0404_0%,_#0f0101_80%)]" />
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]" />
      
      <FloatingPetals />
      <MusicPlayer />

      <AnimatePresence mode="wait">
        {!hasAccepted ? (
          <motion.div
            key="proposal"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 text-center px-4 max-w-4xl mx-auto"
          >
            {/* Pulsing Heart Header */}
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                filter: ["drop-shadow(0 0 10px rgba(196, 30, 58, 0.4))", "drop-shadow(0 0 25px rgba(196, 30, 58, 0.8))", "drop-shadow(0 0 10px rgba(196, 30, 58, 0.4))"]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="mb-8 inline-block"
            >
              <Heart className="w-20 h-20 text-[#c41e3a] fill-[#c41e3a]" />
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-serif text-[#f5e6d3] mb-6 tracking-wide leading-tight text-glow">
              To My <span className="text-[#c41e3a] italic">Love</span>,
            </h1>

            <h2 className="text-3xl md:text-5xl font-serif text-[#f5e6d3]/90 mb-8 tracking-wider leading-relaxed">
              Will you be my <br />
              <span className="text-[#c41e3a] italic underline decoration-1 underline-offset-8">Valentine?</span>
            </h2>

            <p className="text-[#a08a70] mb-12 max-w-lg mx-auto font-light tracking-wide italic text-lg md:text-xl">
              "In all the world, there is no heart for me like yours. <br/>In all the world, there is no love for you like mine."
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-8 min-h-[100px]">
              <motion.button
                whileHover={{ scale: 1.1, boxShadow: "0 0 30px rgba(196, 30, 58, 0.6)" }}
                whileTap={{ scale: 0.95 }}
                onClick={handleYes}
                className="px-12 py-4 bg-gradient-to-r from-[#c41e3a] to-[#a01830] text-white rounded-full text-xl font-medium tracking-widest uppercase transition-all shadow-lg shadow-red-900/40 border border-red-500/30 z-20"
              >
                Yes ❤️
              </motion.button>

              <motion.button
                animate={noCount > 0 ? { left: noButtonPos.x, top: noButtonPos.y } : {}}
                onMouseEnter={moveButton}
                onTouchStart={(e) => {
                  e.preventDefault();
                  moveButton();
                }}
                onClick={moveButton}
                className="px-10 py-4 bg-transparent text-[#a08a70] border border-[#a08a70]/30 rounded-full text-lg font-medium tracking-widest uppercase hover:bg-white/5 transition-colors whitespace-nowrap z-50 backdrop-blur-sm"
                style={{ 
                  position: noCount > 0 ? "fixed" : "relative",
                  touchAction: "none"
                }}
              >
                {getNoText()}
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="accepted"
            className="relative z-10 flex flex-col items-center justify-center w-full max-w-2xl px-4"
          >
            {!isLetterOpen ? (
              <motion.div
                initial={{ scale: 0, opacity: 0, rotate: -10 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="cursor-pointer group"
                onClick={() => setIsLetterOpen(true)}
              >
                 <div className="relative w-64 h-48 bg-[#f5e6d3] rounded-md shadow-2xl flex items-center justify-center border-2 border-[#d4af37]/30 transform group-hover:scale-105 transition-transform duration-300">
                    <div className="absolute inset-0 border-[16px] border-[#e6d0b3] border-b-transparent border-l-transparent rounded-tr-md" style={{ transform: 'rotate(45deg) translate(-20px, 20px)' }}></div>
                    <Heart className="w-12 h-12 text-[#c41e3a] fill-[#c41e3a] z-10 drop-shadow-md" />
                    <span className="absolute bottom-4 text-[#a08a70] font-serif italic text-sm">Tap to open</span>
                 </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#fffcf7] p-8 md:p-12 rounded-lg shadow-2xl max-w-xl text-center border border-[#d4af37]/20 relative"
              >
                 <div className="absolute top-4 right-4">
                    <Sparkles className="w-6 h-6 text-[#d4af37]" />
                 </div>
                 
                 <motion.h2 
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="text-4xl md:text-6xl font-serif text-[#c41e3a] mb-6 italic"
                 >
                    Yay! ❤️
                 </motion.h2>

                 <p className="text-[#5a4a3a] text-lg md:text-xl font-serif leading-relaxed mb-8">
                    You've made me the happiest person alive.<br/>
                    I promise to make this Valentine's Day unforgettable.
                 </p>

                 <div className="w-full h-px bg-[#d4af37]/20 my-6" />
                 
                 <DateIdeaGenerator />

                 {/* Decorative Hearts */}
                 <div className="absolute -top-6 -left-6 transform -rotate-12">
                    <Heart className="w-12 h-12 text-[#c41e3a] fill-[#c41e3a] opacity-80" />
                 </div>
                 <div className="absolute -bottom-6 -right-6 transform rotate-12">
                     <Heart className="w-12 h-12 text-[#c41e3a] fill-[#c41e3a] opacity-80" />
                 </div>
              </motion.div>
            )}

            {/* Confetti Hearts */}
            {hasAccepted && (
              <div className="fixed inset-0 pointer-events-none z-0">
                {[...Array(50)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ 
                      x: "50vw", 
                      y: "50vh", 
                      scale: 0 
                    }}
                    animate={{ 
                      x: `${Math.random() * 100}vw`, 
                      y: `${Math.random() * 100}vh`,
                      opacity: [1, 1, 0],
                      scale: [0, Math.random() + 0.5, 0],
                      rotate: Math.random() * 360
                    }}
                    transition={{ 
                      duration: Math.random() * 2 + 1,
                      ease: "easeOut",
                      delay: Math.random() * 0.2
                    }}
                    className="absolute text-[#c41e3a]"
                  >
                    <Heart className="w-6 h-6 fill-current" />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
