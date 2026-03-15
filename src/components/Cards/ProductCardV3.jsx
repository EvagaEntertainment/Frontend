import React, { useState } from "react";
import { FaStar, FaPlus } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { BsCartPlus } from "react-icons/bs";

const ProductCardV3 = ({ 
  image, 
  rating, 
  reviewsCount = 120,
  badge,
  title, 
  description, 
  price, 
  onQuickView, 
  onAddToCart,
  onFavorite,
  onClickCard,
  useCartIcon = true
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  // Helper to determine badge color
  const getBadgeColor = (type) => {
    if (type === "EGGLESS") return "bg-[#eab308]"; // Yellow
    return "bg-[#7e22ce]"; // Default Purple for BESTSELLER, TRENDING, etc.
  };

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    setIsFavorite(!isFavorite);
    if(onFavorite) onFavorite();
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    setIsAdding(true);
    setTimeout(() => setIsAdding(false), 200);
    if(onAddToCart) onAddToCart();
  };

  return (
    <div 
      className={`group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 relative max-w-[300px] w-full transition-all duration-500 ease-out hover:shadow-[0_12px_30px_rgba(0,0,0,0.1)] hover:-translate-y-1 ${onClickCard ? "cursor-pointer" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClickCard && onClickCard()}
    >
      {/* Image Container */}
      <div className="relative h-[240px] w-full overflow-hidden p-[6px]">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover rounded-xl transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />
        {/* Subtle Dark overlay on hover */}
        <div className={`absolute inset-[6px] rounded-xl bg-black/15 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />

        {/* Badge (Top Left) */}
        {badge && (
          <div className={`absolute top-4 left-4 ${getBadgeColor(badge)} text-white text-[9px] font-bold uppercase px-2 py-0.5 rounded-[4px] tracking-wider shadow-sm z-10 animate-[pulse_3s_ease-in-out_infinite]`}>
            {badge}
          </div>
        )}

        {/* Favorite Button (Circle, top right) */}
        <button 
          className={`absolute top-4 right-4 w-[34px] h-[34px] bg-white/95 backdrop-blur-sm shadow-sm rounded-full flex items-center justify-center transition-all duration-300 z-10 hover:scale-110 active:scale-90 ${isFavorite ? "text-[#ed4956]" : "text-gray-500 hover:text-[#7e22ce]"}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsFavorite(!isFavorite);
            if(onFavorite) onFavorite();
          }}
        >
          {isFavorite ? (
            <svg className="w-[17px] h-[17px] animate-[bounce_0.4s_ease-out_1]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          ) : (
            <FiHeart className="text-[16px] font-bold" />
          )}
        </button>

        {/* Quick View Button (Oval, center) */}
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 z-10 ${isHovered ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95 pointer-events-none'}`}>
          <button 
            onClick={(e) => { 
                e.preventDefault(); 
                e.stopPropagation(); 
                if(onQuickView) onQuickView(); 
            }}
            className="bg-white/95 backdrop-blur text-[#7e22ce] font-bold py-2 px-6 rounded-full shadow-lg hover:bg-[#7e22ce] hover:text-white transition-all duration-300 transform active:scale-90 text-[13px] tracking-wide"
          >
            Quick View
          </button>
        </div>
      </div>

      {/* Content Container */}
      <div className="px-4 py-4 flex flex-col flex-grow">
        
        {/* Rating and Reviews */}
        <div className="flex items-center text-[12px] font-bold text-[#1a1a2e] mb-1.5 transition-transform duration-300 origin-left group-hover:translate-x-1">
          <FaStar className="text-[#fbbf24] mr-1.5 text-[13px] mb-[1px]" />
          {rating}
          <span className="text-gray-400 font-medium ml-1.5">({reviewsCount} reviews)</span>
        </div>

        {/* Title */}
        <h3 className="text-[17px] font-serif font-bold text-[#1a1a2e] mb-1 leading-snug transition-colors duration-300 group-hover:text-[#7e22ce]">
          {title}
        </h3>

        {/* Description */}
        {description && (
          <p className="text-gray-500 text-[12px] mb-4 line-clamp-1 font-normal opacity-90">
            {description}
          </p>
        )}

        {/* Spacer */}
        <div className="flex-grow"></div>

        {/* Price & Add to Cart */}
        <div className="flex justify-between items-center mt-auto pt-1">
          <span className="text-[18px] font-extrabold text-[#7e22ce] transition-transform duration-300 group-hover:scale-[1.05] origin-left">
            ₹{Number(price).toLocaleString('en-IN')}
          </span>
          <button 
            onClick={(e) => { 
                e.preventDefault(); 
                e.stopPropagation(); 
                setIsAdding(true);
                setTimeout(() => setIsAdding(false), 200);
                if(onAddToCart) onAddToCart(); 
            }}
            style={{ transform: isAdding ? 'scale(0.92)' : 'none' }}
            className="px-4 py-2 bg-[#7e22ce] text-white rounded-[10px] flex items-center justify-center hover:bg-[#6b1eaf] transition-all duration-300 hover:shadow-[0_4px_12px_rgba(126,34,206,0.3)] text-[13px] font-semibold active:shadow-inner"
          >
            {useCartIcon ? <BsCartPlus className="mr-1.5 text-[15px]" /> : <FaPlus className="mr-1.5 text-[12px]" />}
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCardV3;
