import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  // Cursor tracking for background interaction
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring effect for the background glow
  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Particle configuration
  const particles = Array.from({ length: 5 });

  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | Eevagga</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      
      {/* Interaction Layer (Background) */}
      <div className="relative flex flex-col items-center justify-center min-h-[90vh] bg-white text-[#1a1a1a] px-6 overflow-hidden selection:bg-[#6A1B9A]/10">
        
        {/* Dynamic Background Spotlight */}
        <motion.div
          className="pointer-events-none fixed inset-0 z-0 opacity-40 blur-[120px]"
          style={{
            background: `radial-gradient(circle 400px at var(--x) var(--y), rgba(106, 27, 154, 0.15), transparent 80%)`,
            "--x": smoothX,
            "--y": smoothY
          }}
        />

        {/* Playful Floating Accent Particles */}
        {particles.map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-[0.1] pointer-events-none"
            style={{
              width: 15 + i * 5,
              height: 15 + i * 5,
              backgroundColor: i % 2 === 0 ? "#6A1B9A" : "#BA68C8",
              left: `${20 + i * 15}%`,
              top: `${20 + i * 15}%`,
            }}
            animate={{
              y: [0, 40, -40, 0],
              x: [0, -30, 30, 0],
              scale: [1, 1.2, 0.9, 1],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}

        {/* Main Content (Centered) */}
        <div className="relative z-10 flex flex-col items-center max-w-2xl text-center">
          
          {/* Subtle Masked 404 Typography */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative select-none"
          >
            <h1 className="text-[140px] md:text-[240px] font-black leading-none tracking-tighter text-[#1a1a1a] opacity-[0.03]">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-xl md:text-2xl font-bold tracking-[0.3em] text-[#6A1B9A] uppercase bg-white px-6">
                Lost in space
              </span>
            </div>
          </motion.div>

          {/* Interactive Message & Call-to-Action */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-6 space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
                This party hasn't <span className="text-[#6A1B9A]">started yet.</span>
              </h2>
              <p className="text-gray-400 text-lg md:text-xl max-w-md mx-auto font-medium">
                The page you're searching for is missing. Let me show you the way back.
              </p>
            </div>

            {/* Simple, Interactive Premium Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block"
            >
              <Link
                to="/"
                className="flex items-center gap-4 px-12 py-5 rounded-full bg-[#6A1B9A] text-white font-bold tracking-wide transition-all duration-300 shadow-[0_20px_40px_-10px_rgba(106,27,154,0.3)] hover:shadow-[0_20px_60px_-10px_rgba(106,27,154,0.5)]"
              >
                <span>Take me Home</span>
                <motion.svg 
                  width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <path d="M5 10H15M15 10L11 6M15 10L11 14" />
                </motion.svg>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Global Branding Micro-Detail */}
        <div className="absolute bottom-10 left-10 hidden md:block">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-200 rotate-90 origin-left">
            Eevagga Premium
          </p>
        </div>
      </div>
    </>
  );
};

export default NotFound;
