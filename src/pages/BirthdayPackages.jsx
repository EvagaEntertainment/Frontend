import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProductCardV3 from "../components/Cards/ProductCardV3";
import { motion, AnimatePresence } from "framer-motion";
import CustomPagination from "../utils/CustomPagination";
import { internalRoutes } from "../utils/internalRoutes";
import { BiFilterAlt, BiBrain, BiStar } from "react-icons/bi";
import { IoIosArrowDown, IoMdArrowRoundForward } from "react-icons/io";
import AIBuilder from "../components/AIBuilder/AIBuilder";

// Dummy data for Birthday Packages with Tiers
const dummyProducts = [
  // ELITE Tiers
  { id: 1, tier: "Elite", image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&q=80", category: "ELITE BIRTHDAY", rating: "4.9", title: "Grand Palace Royale Package", price: 99999.99, reviews: 120, useCartIcon: false, badge: "MOST LUXURIOUS" },
  { id: 2, tier: "Elite", image: "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?w=800&q=80", category: "ELITE BIRTHDAY", rating: "4.8", title: "Midnight Yacht Celebration", price: 129950.50, reviews: 85, useCartIcon: false },
  
  // PREMIUM Tiers
  { id: 3, tier: "Premium", image: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=800&q=80", category: "PREMIUM DECOR", rating: "5.0", title: "Royal Golden Celebration Decor", price: 48900.00, badge: "MOST LOVED", reviews: 210, useCartIcon: false },
  { id: 4, tier: "Premium", image: "https://images.unsplash.com/photo-1496332274465-d0697fd38729?w=800&q=80", category: "PREMIUM THEMES", rating: "4.7", title: "Fairytale Princess Party Kit", price: 37599.99, reviews: 60, useCartIcon: false },
  { id: 5, tier: "Premium", image: "https://images.unsplash.com/photo-1606917631379-3ef1f0d01d4a?w=800&q=80", category: "PREMIUM EXTRAS", rating: "4.9", title: "Neon Glow Birthday Setup", price: 41050.50, reviews: 340, useCartIcon: false },
  
  // GOLD Tiers
  { id: 6, tier: "Gold", image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80", category: "GOLD BIRTHDAY", rating: "4.6", title: "Classic Family Gala Setup", price: 15000.00, reviews: 45, useCartIcon: false },
  { id: 7, tier: "Gold", image: "https://images.unsplash.com/photo-1531058240690-006c446962bf?w=800&q=80", category: "GOLD MILESTONE", rating: "4.8", title: "Essential Milestone Package", price: 19999.00, reviews: 90, useCartIcon: false },
  { id: 8, tier: "Gold", image: "https://images.unsplash.com/photo-1530103862676-de3c9de59f9e?w=800&q=80", category: "GOLD KIDS", rating: "4.9", title: "Safari Adventure Basics", price: 12000.00, reviews: 110, useCartIcon: false },
];

const BirthdaySidebar = () => {
  const [activePrices, setActivePrices] = useState(["$100 - $300"]);
  const [activeTypes, setActiveTypes] = useState(["Kids Birthday"]);
  const [activeColor, setActiveColor] = useState("#fbbf24"); 

  const priceOptions = ["Under $100", "$100 - $300", "$300 - $500", "$500+"];
  const typeOptions = ["Kids Birthday", "Adult Birthday", "Milestone Events", "Themes & Decor"];
  const colors = ["#1a1a2e", "#fbbf24", "#ed4956", "#ffffff", "#4285f4"];

  const toggleFilter = (state, setState, option) => {
    setState((prev) =>
      prev.includes(option) ? prev.filter((v) => v !== option) : [...prev, option]
    );
  };

  return (
    <div className="w-full bg-[#fcfafd] rounded-2xl p-6 border border-purple-50 shadow-sm font-sans mb-6">
      <div className="flex items-center gap-2 mb-6">
        <BiFilterAlt className="text-[#7e22ce] text-xl" />
        <h2 className="text-lg font-bold text-gray-800">Filters</h2>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-[12px] font-bold text-gray-500 tracking-wider uppercase">Budget Range</h3>
          <IoIosArrowDown className="text-gray-400 text-sm" />
        </div>
        <div className="flex flex-col gap-3">
          {priceOptions.map((option) => (
            <label key={option} className="flex items-center gap-3 cursor-pointer group">
              <div
                className={`w-[16px] h-[16px] rounded-[4px] border-[1.5px] flex items-center justify-center transition-colors shadow-sm ${
                  activePrices.includes(option)
                    ? "border-[#7e22ce] bg-[#7e22ce]"
                    : "border-gray-300 bg-white group-hover:border-[#7e22ce]"
                }`}
                onClick={() => toggleFilter(activePrices, setActivePrices, option)}
              >
                {activePrices.includes(option) && (
                  <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span
                className={`text-[14px] transition-colors ${
                  activePrices.includes(option) ? "text-gray-900 font-semibold" : "text-gray-600 font-medium group-hover:text-gray-900"
                }`}
              >
                {option}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-8 border-t border-purple-50 pt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-[12px] font-bold text-gray-500 tracking-wider uppercase">Package Category</h3>
          <IoIosArrowDown className="text-gray-400 text-sm" />
        </div>
        <div className="flex flex-col gap-3">
          {typeOptions.map((option) => (
            <label key={option} className="flex items-center gap-3 cursor-pointer group">
              <div
                className={`w-[16px] h-[16px] rounded-[4px] border-[1.5px] flex items-center justify-center transition-colors shadow-sm ${
                  activeTypes.includes(option)
                    ? "border-[#7e22ce] bg-[#7e22ce]"
                    : "border-gray-300 bg-white group-hover:border-[#7e22ce]"
                }`}
                onClick={() => toggleFilter(activeTypes, setActiveTypes, option)}
              >
                {activeTypes.includes(option) && (
                  <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span
                className={`text-[14px] transition-colors ${
                  activeTypes.includes(option) ? "text-gray-900 font-semibold" : "text-gray-600 font-medium group-hover:text-gray-900"
                }`}
              >
                {option}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="border-t border-purple-50 pt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-[12px] font-bold text-gray-500 tracking-wider uppercase">Event Theme Color</h3>
          <IoIosArrowDown className="text-gray-400 text-sm" />
        </div>
        <div className="flex gap-3 mt-2 flex-wrap">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => setActiveColor(color)}
              className={`w-[26px] h-[26px] rounded-full shadow-sm transition-transform duration-300 outline-none ${
                activeColor === color ? "scale-110 ring-[3px] ring-offset-2 ring-[#7e22ce]" : "hover:scale-110 ring-1 ring-gray-200"
              }`}
              style={{ backgroundColor: color }}
              aria-label={`Select color ${color}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const BirthdayPackages = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [isGridAnimating, setIsGridAnimating] = useState(false);
  const [activeTier, setActiveTier] = useState("Premium");

  const tiers = ["Gold", "Premium", "Elite", "AI Builder"];
  const filteredProducts = dummyProducts.filter(p => p.tier === activeTier);

  useEffect(() => {
    setIsGridAnimating(false);
    const timer = setTimeout(() => setIsGridAnimating(true), 50);
    return () => clearTimeout(timer);
  }, [activeTier]);

  const handlePageChange = (event, value) => {
    if (value === currentPage) return;
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      {/* Simple & Modern Hero Banner */}
      <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden flex items-center justify-center bg-gray-900">
        <img 
          src="https://images.unsplash.com/photo-1464349153735-7db50ed83c84?q=80&w=2400" 
          className="absolute inset-0 w-full h-full object-cover opacity-50" 
          alt="Birthday Packages" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
              Birthday <span className="text-[#c026d3]">Packages</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-medium leading-relaxed">
              Discover curated birthday experiences designed to spark joy and create lasting memories.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="flex-grow py-8 max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2 text-[13px] text-gray-500 mb-10 font-medium pl-2">
          <Link to={internalRoutes.home} className="hover:text-[#c026d3]">Home</Link>
          <span>›</span>
          <span className="text-[#c026d3] font-semibold">Birthday Packages</span>
        </div>

        <div className="flex items-center justify-center mb-16">
          <div className="flex items-center bg-gray-100 p-1 rounded-full border border-gray-200 shadow-inner">
            {tiers.map((tier) => (
              <button key={tier} onClick={() => { setActiveTier(tier); setCurrentPage(1); }} className={`relative px-8 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all ${activeTier === tier ? "text-white" : "text-gray-500 hover:text-gray-800"}`}>
                {activeTier === tier && <motion.div layoutId="activeTier" className="absolute inset-0 bg-gradient-to-r from-[#c026d3] to-[#7e22ce] rounded-full shadow-lg" transition={{ type: "spring", stiffness: 300, damping: 30 }} />}
                <span className="relative z-10 uppercase">{tier}</span>
              </button>
            ))}
          </div>
        </div>

        {activeTier === "AI Builder" ? <AIBuilder /> : (
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="hidden lg:block w-[280px] flex-shrink-0 sticky top-[90px] self-start h-auto"><BirthdaySidebar /></div>
            <div className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center min-h-[500px]">
                {filteredProducts.map((product, index) => (
                  <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={isGridAnimating ? { opacity: 1, y: 0 } : {}} transition={{ delay: index * 0.1 }} className="w-full flex justify-center">
                    <ProductCardV3 
                      image={product.image} 
                      category={product.category} 
                      rating={product.rating} 
                      title={product.title} 
                      price={product.price} 
                      badge={product.badge} 
                      reviewsCount={product.reviews} 
                      useCartIcon={false} 
                      onClickCard={() => navigate(`/celebration/${product.id}`)} 
                      onQuickView={() => navigate(`/celebration/${product.id}`)}
                    />
                  </motion.div>
                ))}
              </div>
              <div className="mt-20 flex justify-center"><CustomPagination currentPage={currentPage} totalPage={Math.ceil(filteredProducts.length / 4) || 1} onChange={handlePageChange} /></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BirthdayPackages;
