import React, { useState, useRef } from "react";
import { FaPlay } from "react-icons/fa";

const ProductGallery = ({ images = [], videoUrl, badge }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const isVideoSelected = videoUrl && selectedIndex === images.length;

  // Handle Play Click
  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  // Reset play state if thumbnail changes
  const handleThumbnailClick = (index) => {
    setSelectedIndex(index);
    setIsPlaying(false);
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  // Dummy working video if the passed url is just "dummy-video"
  const actualVideoUrl = videoUrl === "dummy-video"
    ? "https://www.w3schools.com/html/mov_bbb.mp4"
    : videoUrl;

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image or Video Container */}
      <div className="relative w-full aspect-square bg-[#f8f9fa] rounded-2xl overflow-hidden shadow-sm">
        {isVideoSelected ? (
          <div className="w-full h-full bg-black relative flex items-center justify-center group/video">
            {isPlaying ? (
              <video
                ref={videoRef}
                src={actualVideoUrl}
                autoPlay
                className="w-full h-full object-contain cursor-pointer"
                onClick={togglePlayPause}
              />
            ) : (
              <>
                <video src={`${actualVideoUrl}#t=0.001`} className="w-full h-full object-cover opacity-50 pointer-events-none" muted playsInline />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="w-16 h-16 bg-[#7e22ce] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#6b1eaf] transition-colors shadow-lg shadow-purple-900/40 transform hover:scale-105 active:scale-95 duration-200"
                    onClick={handlePlayClick}
                  >
                    <FaPlay className="text-white text-xl ml-1" />
                  </div>
                </div>
              </>
            )}
          </div>
        ) : (
          <img
            src={images[selectedIndex]}
            alt="Product Main"
            className="w-full h-full object-cover transition-all duration-300"
          />
        )}

        {badge && !isVideoSelected && (
          <div className="absolute top-4 right-4 bg-white text-[#7e22ce] text-[10px] font-bold uppercase px-3 py-1 rounded-full shadow-md tracking-wider">
            {badge}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar">
        {images.map((img, idx) => (
          <button
            key={`img-${idx}`}
            onClick={() => handleThumbnailClick(idx)}
            className={`relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${selectedIndex === idx ? "border-[#7e22ce] shadow-md" : "border-transparent hover:border-gray-300 opacity-60 hover:opacity-100"
              }`}
          >
            <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
        {/* Render Video Thumbnail if provided */}
        {videoUrl && (
          <button
            key="video-thumb"
            onClick={() => handleThumbnailClick(images.length)}
            className={`relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all group ${selectedIndex === images.length ? "border-[#7e22ce] shadow-md" : "border-transparent hover:border-gray-300 opacity-60 hover:opacity-100"
              }`}
          >
            <video src={`${actualVideoUrl}#t=0.001`} className="w-full h-full object-cover opacity-70 pointer-events-none" muted playsInline />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
              <div className="w-8 h-8 bg-[#7e22ce] rounded-full flex items-center justify-center shadow-md">
                <FaPlay className="text-white text-[10px] ml-0.5" />
              </div>
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductGallery;
