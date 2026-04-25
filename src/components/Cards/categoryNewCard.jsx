import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const CategoryNewCard = ({ imageUrl, title, text, link, disabled }) => {
  return (
    <a
      href={disabled ? "#" : link}
      onClick={(e) => {
        if (disabled) e.preventDefault();
      }}
      rel="noopener noreferrer"
      className={`group relative block h-[400px] sm:h-[430px] w-full overflow-hidden rounded-[2.5rem] shadow-lg transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] isolate transform-gpu ${
        disabled ? "opacity-80 cursor-not-allowed grayscale-[15%]" : "cursor-pointer hover:shadow-[0_20px_40px_rgba(0,0,0,0.25)] hover:-translate-y-3"
      }`}
      style={{
        WebkitMaskImage: "-webkit-radial-gradient(white, black)",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Container for Image & Gradients */}
      <div className="absolute inset-0 bg-[#0a0a0a] -z-10">
        <LazyLoadImage
          src={
            typeof imageUrl === "object"
              ? imageUrl.src
              : typeof imageUrl === "string" && (imageUrl.startsWith("http") || imageUrl.startsWith("/"))
              ? imageUrl
              : process.env.NEXT_PUBLIC_API_Aws_Image_BASE_URL + imageUrl
          }
          alt={title}
          className={`w-full h-full object-cover transform-gpu transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] will-change-transform ${
            !disabled && "group-hover:scale-[1.12]"
          }`}
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transformStyle: "preserve-3d" }}
          effect="blur"
          placeholderSrc={"UNIVERSAL_PLACEHOLDER"}
          wrapperClassName="w-full h-full block"
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
        
        {/* Base Gradient Overlay for standard legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent backdrop-blur-[2px] transition-opacity duration-700" />
        
        {/* Deep Dark/Accent Hover Overlay (Smooth Cross Fade) */}
        {!disabled && (
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/30 opacity-0 backdrop-blur-[4px] transition-opacity duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:opacity-100" />
        )}
      </div>

      {/* Elegant Inner Border Ring */}
      <div className="absolute inset-0 rounded-[2.5rem] border-[1.5px] border-white/10 transition-colors duration-700 pointer-events-none group-hover:border-white/20" />

      {/* Content Container */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 pointer-events-none z-10 overflow-hidden">
        
        {/* Content Wrapper translating up on hover */}
        <div className="flex flex-col transform-gpu transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] translate-y-[3.5rem] group-hover:translate-y-0">
          
          {/* Animated Accent Marker */}
          {!disabled && (
            <div className="w-12 h-1 bg-white mb-4 rounded-full opacity-0 -translate-x-4 transition-all duration-700 group-hover:opacity-100 group-hover:translate-x-0 shadow-[0_0_12px_rgba(255,255,255,0.6)]" />
          )}
          
          {/* Title Area */}
          <div className="flex justify-between items-end gap-3 mb-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight drop-shadow-lg relative leading-tight">
              {title}
            </h3>
            
            {/* Sliding "Arrow" Icon */}
            {!disabled && (
              <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/25 text-white transform-gpu transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 shadow-lg delay-75">
                <svg className="w-5 h-5 -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            )}
          </div>

          {/* Descriptive Text Wrapper */}
          <div className="relative w-full max-w-[95%]">
             <p className="text-gray-200/90 font-medium leading-relaxed text-sm sm:text-base drop-shadow-md transform-gpu transition-all duration-700 ease-out opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 delay-100">
               {text}
             </p>
          </div>

        </div>
      </div>

      {/* Disabled / Coming Soon Badge */}
      {disabled && (
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center z-20 pointer-events-none">
          <div className="relative group/badge">
            <div className="absolute inset-0 bg-white/20 blur-2xl rounded-full" />
            <div className="relative bg-black/60 backdrop-blur-xl border border-white/20 text-white font-bold py-3.5 px-8 rounded-full shadow-2xl tracking-[0.25em] text-sm flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse shadow-[0_0_10px_rgba(250,204,21,0.8)]" />
              COMING SOON
            </div>
          </div>
        </div>
      )}
    </a>
  );
};

export default CategoryNewCard;
