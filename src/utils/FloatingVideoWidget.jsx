import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaPlay, FaPause, FaVolumeMute, FaVolumeUp } from "react-icons/fa";

const FloatingVideoWidget = () => {
  const [isDismissed, setIsDismissed] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  const videoRef = useRef(null);
  const expandedVideoRef = useRef(null);

  // Example high-quality placeholder video suitable for a welcome/hero context
  const videoUrl = "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4";

  const handleTimeUpdate = () => {
    const activeRef = isExpanded ? expandedVideoRef : videoRef;
    if (activeRef.current) {
      const current = activeRef.current.currentTime;
      const total = activeRef.current.duration;
      if (!isNaN(total)) {
        setProgress((current / total) * 100);
      }
    }
  };

  useEffect(() => {
    const activeRef = isExpanded ? expandedVideoRef : videoRef;
    if (activeRef.current) {
      if (isPlaying) {
        activeRef.current.play().catch(e => console.log("Auto-play prevented", e));
      } else {
        activeRef.current.pause();
      }
    }
  }, [isPlaying, isExpanded]);

  useEffect(() => {
    const activeRef = isExpanded ? expandedVideoRef : videoRef;
    if (activeRef.current) {
      activeRef.current.muted = isMuted;
    }
  }, [isMuted, isExpanded]);

  const toggleExpand = (e) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      setIsMuted(false); // Unmute when expanding
    } else {
      setIsMuted(true); // Mute when shrinking back
    }
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setIsDismissed(true);
  };

  if (isDismissed) return null;

  return (
    <>
      <AnimatePresence>
        {!isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
            exit={{ opacity: 0, scale: 0.5, y: 50 }}
            transition={{
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              scale: { type: "spring", stiffness: 300, damping: 25 },
              opacity: { duration: 0.4 }
            }}
            className="fixed z-[999] flex items-end justify-end"
            style={{ bottom: "105px", right: "30px" }}
          >
            {/* Tooltip that slides out (only visible occasionally or on hover of the container) */}
            <motion.div
              className="absolute right-[calc(100%+20px)] top-[20%] bg-white text-[#1a1a2e] px-4 py-2.5 rounded-xl shadow-[0_8px_25px_rgba(0,0,0,0.12)] whitespace-nowrap text-[13px] font-bold flex items-center gap-2 pointer-events-none origin-right border border-gray-100/50"
              initial={{ opacity: 0, x: 20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 1.5, duration: 0.6, type: "spring", bounce: 0.5 }}
            >
              <span className="text-base">✨</span> See how it works
              {/* Little triangle pointer (speech bubble tail) */}
              <div className="absolute right-[-5px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rotate-45 border-r border-t border-gray-100/50"></div>
            </motion.div>

            {/* Subtle Pulsing Ring Behind */}
            <div className="absolute inset-0 rounded-[2rem] border-2 border-[#7e22ce] animate-[ping_3s_ease-in-out_infinite] opacity-30 pointer-events-none scale-105"></div>

            <motion.div
              whileHover={{ scale: 1.05, translateY: -5 }}
              whileTap={{ scale: 0.95 }}
              className="relative cursor-pointer shadow-[0_15px_35px_rgba(126,34,206,0.3)] rounded-[2rem] overflow-hidden border-[3px] border-white group"
              style={{ width: "105px", height: "160px" }}
              onClick={toggleExpand}
            >
              <video
                ref={videoRef}
                src={videoUrl}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                autoPlay
                loop
                muted
                playsInline
                onTimeUpdate={handleTimeUpdate}
              />

              {/* Audio Wave animated indicator */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center items-end gap-1 pointer-events-none z-10 transition-opacity duration-300 group-hover:opacity-0">
                <div className="w-[3px] bg-white rounded-full animate-[bounce_1s_infinite] h-2"></div>
                <div className="w-[3px] bg-white rounded-full animate-[bounce_1.2s_infinite] h-4"></div>
                <div className="w-[3px] bg-white rounded-full animate-[bounce_0.8s_infinite] h-3"></div>
                <div className="w-[3px] bg-white rounded-full animate-[bounce_1.1s_infinite] h-5"></div>
              </div>

              {/* Close Button (Fades in, slides down) */}
              <button
                onClick={handleClose}
                className="absolute top-2 right-2 w-6 h-6 bg-black/40 hover:bg-[#ff4d4f] text-white rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 z-20 opacity-0 group-hover:opacity-100 transform -translate-y-2 group-hover:translate-y-0"
              >
                <FaTimes size={10} />
              </button>

              {/* Expand Action Overlay (Center Play button pop) */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                <div className="w-12 h-12 bg-gradient-to-tr from-[#7e22ce] to-[#c026d3] rounded-full flex items-center justify-center text-white shadow-xl transform scale-50 group-hover:scale-100 transition-transform duration-300 ease-out">
                  <FaPlay size={14} className="ml-1 drop-shadow-md" />
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80"
            onClick={() => setIsExpanded(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-[95%] md:w-[80%] lg:w-[65%] max-w-5xl aspect-video rounded-[2rem] overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.8)] bg-black ring-1 ring-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                ref={expandedVideoRef}
                src={videoUrl}
                className="w-full h-full object-contain"
                autoPlay
                loop
                onTimeUpdate={handleTimeUpdate}
                onClick={() => setIsPlaying(!isPlaying)}
              />

              {/* Master Controls Overlay - High end glassmorphism */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">

                {/* Top Header Bar */}
                <div className="w-full p-6 sm:p-8 flex justify-between items-start bg-gradient-to-b from-black/80 to-transparent pointer-events-auto">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#7e22ce] to-[#c026d3] flex items-center justify-center shadow-lg border border-white/20">
                      <span className="text-white text-xl font-bold font-serif">E</span>
                    </div>
                    <div>
                      <h3 className="text-white font-black text-lg sm:text-xl tracking-wide drop-shadow-md">Eevagga Experience</h3>
                      <p className="text-white/70 text-xs sm:text-sm font-medium tracking-wider uppercase mt-0.5">Brand Story</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsExpanded(false)}
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 hover:bg-[#ff4d4f] text-white rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 border border-white/10 hover:border-transparent hover:scale-105 group"
                  >
                    <FaTimes size={18} className="group-hover:rotate-90 transition-transform duration-300" />
                  </button>
                </div>

                {/* Bottom Controls Bar */}
                <div className="w-full p-6 sm:p-8 flex flex-col justify-end bg-gradient-to-t from-black/95 via-black/50 to-transparent pointer-events-auto">
                  <div className="flex justify-between items-center gap-4 sm:gap-6 backdrop-blur-sm bg-black/20 p-4 rounded-2xl border border-white/10">

                    {/* Play/Pause */}
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-12 h-12 sm:w-14 sm:h-14 bg-white/10 hover:bg-[#7e22ce] rounded-full flex items-center justify-center text-white backdrop-blur-md transition-all duration-300 border border-white/10 hover:border-[#7e22ce] hover:scale-105"
                    >
                      {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} className="ml-1" />}
                    </button>

                    {/* Smooth Progress Bar */}
                    <div className="flex-grow h-2 bg-white/10 rounded-full overflow-hidden relative">
                      <div
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#7e22ce] via-[#c026d3] to-[#fbcfe8] transition-all duration-150 ease-linear rounded-full"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>

                    {/* Mute/Unmute */}
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="w-12 h-12 sm:w-14 sm:h-14 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white backdrop-blur-md transition-all duration-300 border border-white/10 hover:scale-105"
                    >
                      {isMuted ? <FaVolumeMute size={20} /> : <FaVolumeUp size={20} />}
                    </button>

                  </div>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingVideoWidget;
