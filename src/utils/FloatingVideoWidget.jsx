import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaVolumeMute, FaVolumeUp } from "react-icons/fa";

import adminApi from "../services/adminApi";

const getYoutubeEmbedUrl = (url, showControls = false) => {
  if (!url) return null;
  // Enhanced regex to handle watch links with extra params like lists
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[2] && match[2].length === 11) {
    const videoId = match[2];
    const origin = window.location.origin;
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=${showControls ? 1 : 0}&loop=1&playlist=${videoId}&modestbranding=1&rel=0&iv_load_policy=3&enablejsapi=1&origin=${origin}&widget_referrer=${origin}`;
  }
  return null;
};

const FloatingVideoWidget = () => {
  const [isDismissed, setIsDismissed] = useState(false);
  const [config, setConfig] = useState(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const videoRef = useRef(null);

  // Default values
  const defaultVideoUrl = "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4";
  const defaultTooltipText = "✨ See how it works";

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await adminApi.getFloatingVideoConfig();
        if (response && response?.data?.config) {
          setConfig(response.data.config);
        }
      } catch (error) {
        console.error("Error fetching floating video config:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchConfig();
  }, []);

  const videoUrl = config?.videoUrl || (isLoading ? "" : defaultVideoUrl);
  const tooltipText = config?.tooltipText || defaultTooltipText;
  const showTooltip = config?.showTooltip !== false;
  const isActive = config?.isActive !== false;
  const showControls = config?.showControls === true;

  // Sync mute state for native video
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
      videoRef.current.play().catch(() => { });
    }
  }, [isMuted, videoUrl]);

  const handleBubbleClick = (e) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setIsDismissed(true);
  };

  if (isDismissed || !isActive || (isLoading && !config)) return null;

  return (
    <>
      <AnimatePresence>
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
          {/* Tooltip */}
          {showTooltip && (
            <motion.div
              className="absolute right-[calc(100%+20px)] top-[20%] bg-white text-[#1a1a2e] px-4 py-2.5 rounded-xl shadow-[0_8px_25px_rgba(0,0,0,0.12)] whitespace-nowrap text-[13px] font-bold flex items-center gap-2 pointer-events-none origin-right border border-gray-100/50"
              initial={{ opacity: 0, x: 20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 1.5, duration: 0.6, type: "spring", bounce: 0.5 }}
            >
              {tooltipText}
              <div className="absolute right-[-5px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rotate-45 border-r border-t border-gray-100/50"></div>
            </motion.div>
          )}

          {/* Pulsing Ring Behind */}
          <div className="absolute inset-0 rounded-[2rem] border-2 border-[#7e22ce] animate-[ping_3s_ease-in-out_infinite] opacity-30 pointer-events-none scale-105"></div>

          <motion.div
            whileHover={{ scale: 1.05, translateY: -5 }}
            whileTap={{ scale: 0.95 }}
            className="relative cursor-pointer shadow-[0_15px_35px_rgba(126,34,206,0.3)] rounded-[2rem] overflow-hidden border-[3px] border-white group bg-black"
            style={{ width: "105px", height: "160px" }}
            onClick={handleBubbleClick}
          >
            {getYoutubeEmbedUrl(videoUrl, showControls) ? (
              <iframe
                key={`${videoUrl}-${isMuted}`}
                src={getYoutubeEmbedUrl(videoUrl, showControls).replace("mute=1", isMuted ? "mute=1" : "mute=0")}
                className="w-full h-full border-0 scale-150 pointer-events-none"
                title="YouTube Widget"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            ) : (
              <video
                key={videoUrl}
                ref={videoRef}
                src={videoUrl}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                autoPlay
                loop
                muted={isMuted}
                playsInline
              />
            )}

            {/* Audio Wave animated indicator */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center items-end gap-1 pointer-events-none z-10 transition-opacity duration-300 group-hover:opacity-0">
              <div className={`w-[3px] bg-white rounded-full transition-all duration-300 ${isMuted ? "h-1 opacity-20" : "animate-[bounce_1s_infinite] h-2"}`}></div>
              <div className={`w-[3px] bg-white rounded-full transition-all duration-300 ${isMuted ? "h-1 opacity-20" : "animate-[bounce_1.2s_infinite] h-4"}`}></div>
              <div className={`w-[3px] bg-white rounded-full transition-all duration-300 ${isMuted ? "h-1 opacity-20" : "animate-[bounce_0.8s_infinite] h-3"}`}></div>
              <div className={`w-[3px] bg-white rounded-full transition-all duration-300 ${isMuted ? "h-1 opacity-20" : "animate-[bounce_1.1s_infinite] h-5"}`}></div>
            </div>

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 w-6 h-6 bg-black/40 hover:bg-[#ff4d4f] text-white rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 z-20 opacity-0 group-hover:opacity-100 transform -translate-y-2 group-hover:translate-y-0"
            >
              <FaTimes size={10} />
            </button>

            {/* Voice Control Indicator Overlay */}
            <div className={`absolute inset-0 bg-black/10 transition-opacity duration-300 flex items-center justify-center z-10 ${isMuted ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
              <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 shadow-lg">
                {isMuted ? <FaVolumeMute size={14} /> : <FaVolumeUp size={14} />}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default FloatingVideoWidget;
