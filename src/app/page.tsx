"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useSpring, useTransform } from "framer-motion";
import { Heart, Sparkles, RefreshCw } from "lucide-react";

// --- Components ---

const ScrapbookGallery = ({ images }: { images: string[] }) => {
  return (
    <div className="relative w-full max-w-4xl mx-auto min-h-[500px] p-8 md:p-12 bg-[#f4e4bc] shadow-inner rounded-sm overflow-hidden border-8 border-[#3d0606]/10">
      {/* Crumpled paper texture overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/crumpled-paper.png')]" />
      
      {/* Decorative Floral Accents (Simple Lucide or SVGs) */}
      <div className="absolute top-4 left-4 text-[#8a7a5a] opacity-40 -rotate-12">
        <Sparkles className="w-12 h-12" />
      </div>
      <div className="absolute bottom-4 right-4 text-[#8a7a5a] opacity-40 rotate-12">
        <Heart className="w-16 h-16" />
      </div>

      <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 gap-8">
        {images.map((src, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8, rotate: Math.random() * 20 - 10 }}
            animate={{ opacity: 1, scale: 1, rotate: Math.random() * 20 - 10 }}
            transition={{ delay: i * 0.2 }}
            whileHover={{ scale: 1.05, rotate: 0, zIndex: 50, transition: { duration: 0.3 } }}
            className="relative p-3 bg-white shadow-xl border border-gray-100 group cursor-pointer"
          >
            {/* "Tape" effect */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-8 bg-white/40 backdrop-blur-sm border border-white/20 -rotate-2 z-20" />
            
            <div className="aspect-[4/5] overflow-hidden bg-gray-100 relative group">
              <img src={src} alt="Memory" className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500" />
              {/* White Inner Fade/Glow */}
              <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_transparent_40%,_rgba(255,255,255,0.4)_100%)] mix-blend-soft-light" />
              <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_40px_rgba(255,255,255,0.3)]" />
            </div>
            <div className="mt-4 text-center font-serif italic text-[#5a4a3a] text-sm md:text-base">
              Sweet Moment
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-12 text-center relative z-10">
         <h2 className="text-4xl md:text-6xl font-serif text-[#c41e3a] mb-4 italic">Forever Yours ❤️</h2>
         <p className="text-[#5a4a3a] text-xl font-serif italic max-w-lg mx-auto leading-relaxed">
           "Our story is my favorite fairy tale."
         </p>
         <div className="mt-8">
            <DateIdeaGenerator />
         </div>
      </div>
    </div>
  );
};

const BackgroundSlideshow = () => {
  const images = [
    "https://res.cloudinary.com/dievsawtw/image/upload/v1771070023/WhatsApp_Image_2026-02-14_at_5.09.56_PM_pxedn2.jpg",
    "https://res.cloudinary.com/dievsawtw/image/upload/v1771070022/WhatsApp_Image_2026-02-14_at_5.08.55_PM_lcnvbv.jpg",
    "https://res.cloudinary.com/dievsawtw/image/upload/v1771070023/WhatsApp_Image_2026-02-14_at_5.08.56_PM_3_zwmgny.jpg",
    "https://res.cloudinary.com/dievsawtw/image/upload/v1771070023/WhatsApp_Image_2026-02-14_at_5.08.56_PM_2_qqaicm.jpg",
    "https://res.cloudinary.com/dievsawtw/image/upload/v1771070023/WhatsApp_Image_2026-02-14_at_5.08.56_PM_hsqrxz.jpg",
    "https://res.cloudinary.com/dievsawtw/image/upload/v1771070023/WhatsApp_Image_2026-02-14_at_5.09.56_PM_pxedn2.jpg"
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3500); // Change image every 3.5 seconds
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="absolute inset-0 z-0">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-[opacity]"
          style={{ backgroundImage: `url(${images[index]})` }}
        />
      </AnimatePresence>
      {/* Dark Overlay for Readability */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f0101]/40 to-[#0f0101]" />
    </div>
  );
};

const TypewriterText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const words = text.split(" ");
  
  return (
    <motion.span className="inline-block">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.1,
            ease: "easeOut"
          }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};

const FloatingPetals = () => {
  const [petals, setPetals] = useState<{ id: number; left: number; delay: number; duration: number; size: number }[]>([]);

  useEffect(() => {
    const newPetals = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 20,
      duration: Math.random() * 15 + 15,
      size: Math.random() * 15 + 10,
    }));
    setPetals(newPetals);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute opacity-50 will-change-transform"
          initial={{ y: -50, rotate: 0 }}
          animate={{
            y: "110vh",
            rotate: 360,
            x: [0, 15, -15, 0],
          }}
          transition={{
            duration: petal.duration,
            repeat: Infinity,
            delay: petal.delay,
            ease: "linear",
          }}
          style={{ left: `${petal.left}%`, fontSize: petal.size }}
        >
          🌹
        </motion.div>
      ))}
    </div>
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
    const sound = new Audio("https://www.myinstants.com/media/sounds/sparkle.mp3");
    sound.volume = 0.2;
    sound.play().catch(() => {});
    const randomIdea = ideas[Math.floor(Math.random() * ideas.length)];
    setIdea(randomIdea);
  };

  return (
    <div className="mt-8 text-center bg-white/50 p-6 rounded-2xl border border-[#d4af37]/10">
      <h3 className="text-xl text-[#c41e3a] font-serif italic mb-4">Let's plan our date...</h3>
      <motion.div 
        className="min-h-[60px] flex items-center justify-center"
        initial={false}
        animate={idea ? { scale: [0.95, 1.05, 1] } : {}}
      >
        {idea ? (
          <p className="text-2xl text-[#5a4a3a] font-medium italic">{idea}</p>
        ) : (
          <p className="text-[#a08a70] text-sm italic">Tap the button to reveal a surprise...</p>
        )}
      </motion.div>
      <button
        onClick={generateIdea}
        className="mt-6 px-8 py-3 bg-[#c41e3a] text-white rounded-full flex items-center gap-2 mx-auto hover:bg-[#a01830] transition-all shadow-lg active:scale-95"
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
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [recipient, setRecipient] = useState("My Love");
  const [clickHearts, setClickHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  
  const mouseX = useSpring(0, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 50, damping: 20 });

  useEffect(() => {
    setIsMounted(true);
    const params = new URLSearchParams(window.location.search);
    const name = params.get("to");
    if (name) setRecipient(name);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const addClickHeart = (e: React.MouseEvent) => {
    const newHeart = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY,
    };
    setClickHearts(prev => [...prev, newHeart]);
    setTimeout(() => {
      setClickHearts(prev => prev.filter(h => h.id !== newHeart.id));
    }, 1000);
  };

  const moveButton = useCallback(() => {
    const btnWidth = 150; 
    const btnHeight = 60; 
    const newX = Math.random() * (window.innerWidth - btnWidth);
    const newY = Math.random() * (window.innerHeight - btnHeight);
    setNoButtonPos({ x: newX, y: newY });
    setNoCount((prev) => prev + 1);
  }, []);

  const handleYes = () => {
    const sound = new Audio("https://www.myinstants.com/media/sounds/level-up-191.mp3");
    sound.volume = 0.2;
    sound.play().catch(() => {});
    setHasAccepted(true);
  };

  const handleOpenLetter = () => {
    const sound = new Audio("https://www.myinstants.com/media/sounds/paper-rustle.mp3");
    sound.volume = 0.3;
    sound.play().catch(() => {});
    setIsLetterOpen(true);
  };

  const bgX = useTransform(mouseX, [0, 2000], [5, -5]);
  const bgY = useTransform(mouseY, [0, 1000], [5, -5]);

  const noMessages = [
    "No", "Wait... 🥺", "Are you sure?", "Really sure?", "Think again!", "Pls? 🍒"
  ];

  if (!isMounted) return <div className="min-h-screen bg-[#0f0101]" />;

  return (
    <main 
      onClick={addClickHeart}
      className="min-h-screen flex flex-col items-center justify-center bg-[#0f0101] overflow-hidden relative selection:bg-[#c41e3a] selection:text-white"
    >
      <BackgroundSlideshow />
      
      <FloatingPetals />

      {/* Click Hearts */}
      <AnimatePresence>
        {clickHearts.map(heart => (
          <motion.div
            key={heart.id}
            initial={{ opacity: 1, scale: 0.5, x: heart.x - 12, y: heart.y - 12 }}
            animate={{ opacity: 0, scale: 2, y: heart.y - 100 }}
            exit={{ opacity: 0 }}
            className="fixed pointer-events-none z-[100] text-[#c41e3a]"
          >
            <Heart className="w-6 h-6 fill-current" />
          </motion.div>
        ))}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!hasAccepted ? (
          <motion.div
            key="proposal"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 text-center px-4 max-w-4xl mx-auto"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                filter: ["drop-shadow(0 0 10px rgba(196, 30, 58, 0.4))", "drop-shadow(0 0 25px rgba(196, 30, 58, 0.8))", "drop-shadow(0 0 10px rgba(196, 30, 58, 0.4))"]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mb-8 inline-block"
            >
              <Heart className="w-24 h-24 text-[#c41e3a] fill-[#c41e3a]" />
            </motion.div>

            <h1 className="text-5xl md:text-8xl font-serif text-[#f5e6d3] mb-6 tracking-tight text-glow">
              To <span className="text-[#c41e3a] italic">{recipient}</span>,
            </h1>

            <h2 className="text-3xl md:text-5xl font-serif text-[#f5e6d3]/90 mb-12 tracking-wider leading-relaxed">
              <TypewriterText text="Will you be my Valentine?" delay={0.5} />
            </h2>

            <p className="text-[#a08a70] mb-16 max-w-lg mx-auto font-light italic text-xl leading-relaxed">
              <TypewriterText text="In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine." delay={2} />
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-10 min-h-[100px]">
              <motion.button
                whileHover={{ scale: 1.1, boxShadow: "0 0 40px rgba(196, 30, 58, 0.7)" }}
                whileTap={{ scale: 0.9 }}
                onClick={handleYes}
                className="px-16 py-5 bg-gradient-to-r from-[#c41e3a] to-[#8a1429] text-white rounded-full text-2xl font-serif tracking-widest uppercase shadow-2xl border border-red-500/40 z-20"
              >
                Yes ❤️
              </motion.button>

              <motion.button
                animate={noCount > 0 ? { left: noButtonPos.x, top: noButtonPos.y } : {}}
                onMouseEnter={moveButton}
                onClick={moveButton}
                className="px-12 py-5 bg-transparent text-[#a08a70] border border-[#a08a70]/40 rounded-full text-xl font-serif tracking-widest uppercase hover:bg-white/5 transition-colors z-50 backdrop-blur-md"
                style={{ position: noCount > 0 ? "fixed" : "relative" }}
              >
                {noMessages[Math.min(noCount, noMessages.length - 1)]}
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="accepted"
            className="relative z-10 flex flex-col items-center justify-center w-full max-w-6xl px-4 py-12"
          >
            {!isLetterOpen ? (
              <motion.div
                initial={{ scale: 0, opacity: 0, rotate: -15 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="cursor-pointer relative"
                onClick={handleOpenLetter}
              >
                 <div className="w-80 h-56 bg-[#f5e6d3] rounded-sm shadow-[0_30px_60px_rgba(0,0,0,0.5)] flex items-center justify-center border border-[#d4af37]/20 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full border-[20px] border-[#e9dcc9] border-b-transparent border-l-transparent" />
                    <Heart className="w-16 h-16 text-[#c41e3a] fill-[#c41e3a] drop-shadow-xl" />
                    <span className="absolute bottom-6 text-[#a08a70] font-serif italic tracking-widest animate-pulse">Our Memories Inside</span>
                 </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full"
              >
                 <ScrapbookGallery images={[
                    "https://res.cloudinary.com/dievsawtw/image/upload/v1771070023/WhatsApp_Image_2026-02-14_at_5.09.56_PM_pxedn2.jpg",
                    "https://res.cloudinary.com/dievsawtw/image/upload/v1771070022/WhatsApp_Image_2026-02-14_at_5.08.55_PM_lcnvbv.jpg",
                    "https://res.cloudinary.com/dievsawtw/image/upload/v1771070023/WhatsApp_Image_2026-02-14_at_5.08.56_PM_3_zwmgny.jpg",
                    "https://res.cloudinary.com/dievsawtw/image/upload/v1771070023/WhatsApp_Image_2026-02-14_at_5.08.56_PM_2_qqaicm.jpg",
                    "https://res.cloudinary.com/dievsawtw/image/upload/v1771070023/WhatsApp_Image_2026-02-14_at_5.08.56_PM_hsqrxz.jpg",
                    "https://res.cloudinary.com/dievsawtw/image/upload/v1771070023/WhatsApp_Image_2026-02-14_at_5.09.56_PM_pxedn2.jpg"
                 ]} />
              </motion.div>
            )}

            {/* Success Confetti */}
            {hasAccepted && (
              <div className="fixed inset-0 pointer-events-none z-0">
                {[...Array(40)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ x: "50vw", y: "110vh", scale: 0 }}
                    animate={{ 
                      x: `${Math.random() * 100}vw`, 
                      y: "-10vh",
                      opacity: [0, 1, 0],
                      scale: [0, Math.random() + 0.5, 0],
                      rotate: Math.random() * 720
                    }}
                    transition={{ 
                      duration: Math.random() * 4 + 3,
                      ease: "easeOut",
                      delay: Math.random() * 2
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
