'use client';
import { motion } from "framer-motion";
import { useState } from "react";

function BannerNew({ image, height, category, preview }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleBooking = () => {
    const section = document.getElementById("booking-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const altText = category
    ? `${category} celebration in Bangalore — Eevagga`
    : "Birthday celebration in Bangalore — Eevagga";

  return (
    <div className="banner-container relative w-full h-[50dvh] sm:h-[65dvh] md:h-[85dvh] overflow-hidden">
      {/* Background Image with Skeleton */}
      <div className="absolute inset-0 overflow-hidden bg-gray-200">
        {!imageLoaded && (
          preview ? (
            <img
              src={preview?.src || preview}
              alt={altText}
              className="absolute inset-0 w-full h-full object-cover blur-md"
            />
          ) : (
            <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
          )
        )}
        <img
          src={process.env.NEXT_PUBLIC_API_Aws_Image_BASE_URL + image}
          alt={altText}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${!imageLoaded ? 'opacity-0' : 'opacity-100'}`}
          loading="eager"
          fetchPriority="high"
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-end pb-[10%] pt-20">
        <motion.div
          className="text-center space-y-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
            whileHover={{ y: -3 }}
          >
            Celebrate Without the Stress
          </motion.h1>

          <motion.button
            className="px-8 sm:px-12 py-3 sm:py-4 bg-[#FFE500] rounded-[0.5rem] text-lg sm:text-xl font-bold text-primary relative z-10"
            onClick={handleBooking}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Free Expert Advice
          </motion.button>
        </motion.div>

        {/* Decorative Element */}
        <motion.div
          className="absolute left-1/2 -bottom-20 w-64 h-64 bg-[#6A1B9A]/30 blur-[80px] -translate-x-1/2 z-[-1]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
      </div>
    </div>
  );
}

export default BannerNew;
