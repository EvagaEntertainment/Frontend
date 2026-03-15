import React, { useState } from "react";
import { FaStar, FaCheckSquare, FaTruck, FaLock } from "react-icons/fa";
import { BsCartPlus } from "react-icons/bs";

const ProductDetails = ({ product }) => {
  const [selectedWrap, setSelectedWrap] = useState(0);
  const [activeTab, setActiveTab] = useState("Details");
  const [customMsg, setCustomMsg] = useState("");

  const wraps = ["#4B0082", "#2F4F4F", "#FFD700"];
  const tabs = ["Details", "Contents", "Delivery"];

  return (
    <div className="flex flex-col gap-5 text-[#1a1a2e] font-sans">
      {/* Title & Rating */}
      <div>
        <h1 className="text-3xl md:text-5xl font-serif font-bold tracking-tight mb-3 leading-snug text-gray-900">
          {product.title}
        </h1>
        <div className="flex items-center gap-4 text-sm font-semibold text-gray-500">
          <div className="flex items-center text-[#fbbf24]">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="text-sm mr-1" />
            ))}
            <span className="text-gray-500 ml-2">4.8 ({product.reviews} reviews)</span>
          </div>
          <div className="flex items-center text-green-600 gap-1.5">
            <FaCheckSquare className="text-green-500" /> In Stock
          </div>
        </div>
      </div>

      {/* Pricing Block */}
      <div className="bg-[#FAF8FC] p-6 rounded-2xl border border-purple-50 shadow-sm mt-2">
        <div className="flex items-baseline gap-3 mb-2">
          <span className="text-4xl font-black text-[#7e22ce]">₹{Number(product.price).toLocaleString('en-IN')}</span>
          <span className="text-lg font-bold text-gray-400 line-through">₹{Number(product.originalPrice).toLocaleString('en-IN')}</span>
          <span className="bg-[#fbbf24] text-white text-[10px] font-bold px-2 py-1 rounded-full ml-1 shadow-sm uppercase tracking-widest">
            Save 15%
          </span>
        </div>
        <p className="text-gray-500 text-sm leading-relaxed max-w-lg mt-2 font-medium">
          {product.description} A curated selection of award-winning artisan treats, from single-origin dark chocolate truffles to vintage reserve sparkling wine. Perfect for anniversaries, corporate milestones, or ultimate self-care.
        </p>
      </div>

      {/* Options */}
      <div className="mt-4">
        <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Choose Gift Wrap</h4>
        <div className="flex gap-3">
          {wraps.map((color, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedWrap(idx)}
              className={`w-8 h-8 rounded-full border-2 p-[2px] transition-all duration-300 ${
                selectedWrap === idx ? "border-[#7e22ce] scale-110 shadow-md" : "border-transparent hover:scale-105"
              }`}
            >
              <div className="w-full h-full rounded-full" style={{ backgroundColor: color }}></div>
            </button>
          ))}
        </div>
      </div>

      {/* Personalization */}
      <div className="mt-4">
        <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Personalized Message</h4>
        <textarea
          rows={3}
          value={customMsg}
          onChange={(e) => setCustomMsg(e.target.value)}
          placeholder="Type your personal message here..."
          className="w-full border border-gray-200 rounded-xl p-4 text-sm focus:outline-none focus:border-[#7e22ce] focus:ring-1 focus:ring-[#7e22ce] transition-all bg-white shadow-sm resize-none font-medium text-gray-700"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 mt-4">
        <button className="w-full py-4 bg-[#7e22ce] text-white rounded-xl font-bold tracking-wide flex items-center justify-center gap-2 hover:bg-[#6b1eaf] transition-all shadow-md active:scale-[0.98]">
          <BsCartPlus className="text-xl" /> Add to Cart
        </button>
        <button className="w-full py-4 bg-[#fbbf24] text-[#1a1a2e] rounded-xl font-bold tracking-wide flex items-center justify-center gap-2 hover:bg-[#f59e0b] transition-all shadow-md active:scale-[0.98]">
          Buy it Now
        </button>
      </div>

      {/* Shipping / Trust Badges */}
      <div className="flex items-center justify-center gap-6 py-4 border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wider mt-2">
        <span className="flex items-center gap-2"><FaTruck className="text-gray-400 mb-[2px]" /> Free Express Shipping</span>
        <span className="flex items-center gap-2"><FaLock className="text-gray-400 mb-[2px]" /> 100% Secure Checkout</span>
      </div>

      {/* Tabs */}
      <div className="mt-4">
        <div className="flex border-b border-gray-100 gap-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-bold uppercase transition-all tracking-wider ${
                activeTab === tab
                  ? "text-[#7e22ce] border-b-2 border-[#7e22ce]"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        
        <div className="py-6 text-sm text-gray-500 leading-relaxed font-medium">
          {activeTab === "Details" && (
            <div className="animate-[fadeIn_0.3s_ease-out]">
              <p className="mb-4">
                Our Midnight Velvet hamper is designed for those who appreciate the finer things. Each item is hand-picked for quality and sustainability.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Premium 750ml Reserve Sparkling Wine</li>
                <li>Box of 12 Artisan Ganache Truffles</li>
                <li>Hand-poured Soy Wax Candle (Lavender & Oud)</li>
                <li>Luxury Magnetic Keepsake Box</li>
              </ul>
            </div>
          )}
          {activeTab === "Contents" && (
            <div className="animate-[fadeIn_0.3s_ease-out]">
              <p>Contents included vary slightly based on seasonal availability to ensure the freshest and highest quality ingredients. All chocolates are freshly tempered and wines are stored in a climate-controlled vault prior to shipping.</p>
            </div>
          )}
          {activeTab === "Delivery" && (
            <div className="animate-[fadeIn_0.3s_ease-out]">
              <p>We offer overnight cold-shipping to preserve the integrity of chocolates and wine. Delivery is available nationwide, with signature required upon delivery to ensure safety.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
