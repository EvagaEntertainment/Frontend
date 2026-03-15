import React from "react";
import { Link } from "react-router-dom";

const GiftCategoryCard = ({ title, icon, link }) => {
  return (
    <Link
      to={link || "#"}
      className="group relative flex flex-col items-center justify-center p-4 bg-white rounded-3xl w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] flex-shrink-0 transition-all duration-500 ease-out border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_15px_30px_rgba(126,34,206,0.12)] hover:-translate-y-2 hover:border-purple-200 overflow-hidden"
    >
      {/* Decorative gradient blob inside card */}
      <div className="absolute w-[150%] h-[150%] bg-gradient-to-tr from-purple-50/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full top-0 left-0 pointer-events-none -translate-x-1/4 -translate-y-1/4" />
      
      {/* Icon Container */}
      <div className="w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] bg-gradient-to-br from-[#f8f5fd] to-purple-50/50 rounded-[1.2rem] flex items-center justify-center mb-3 transition-all duration-500 group-hover:bg-gradient-to-br group-hover:from-purple-100 group-hover:to-purple-200 group-hover:scale-110 shadow-sm relative z-10">
        <div className="text-[#7e22ce] text-2xl sm:text-[1.8rem] transition-transform duration-500 group-hover:scale-110 group-hover:text-purple-700">
          {icon}
        </div>
      </div>
      
      {/* Title */}
      <span className="text-[12px] sm:text-sm font-semibold text-gray-700 group-hover:text-[#7e22ce] transition-colors duration-500 text-center whitespace-nowrap relative z-10">
        {title}
      </span>
    </Link>
  );
};

export default GiftCategoryCard;
