import React, { useState } from "react";
import { BiFilterAlt } from "react-icons/bi";

function SortandFilterCard({ filters, setFilters }) {
  // State for active selections
  const [activeDietary, setActiveDietary] = useState("");
  const [activePrice, setActivePrice] = useState("");
  const [activeFlavors, setActiveFlavors] = useState([]);

  const dietaryOptions = ["Eggless Only", "Sugar Free", "Gluten Free"];
  const priceOptions = ["Under ₹2500", "₹2500 - ₹5000", "₹5000+"];
  const flavorOptions = ["Chocolate", "Vanilla", "Red Velvet", "Fruit"];

  const handleFlavorToggle = (flavor) => {
    setActiveFlavors((prev) =>
      prev.includes(flavor)
        ? prev.filter((f) => f !== flavor)
        : [...prev, flavor]
    );
  };

  return (
    <div className="w-full bg-white rounded-[20px] pb-6 font-sans">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <BiFilterAlt className="text-[#7e22ce] text-2xl" />
        <h2 className="text-[22px] font-bold text-[#1a1a2e]">Filters</h2>
      </div>

      {/* Dietary Section */}
      <div className="mb-8 pl-1">
        <h3 className="text-[16px] font-bold text-[#374151] mb-4">Dietary</h3>
        <div className="flex flex-col gap-3.5">
          {dietaryOptions.map((option) => (
            <label
              key={option}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div
                className={`w-[18px] h-[18px] rounded-full border-[1.5px] flex items-center justify-center transition-colors ${
                  activeDietary === option
                    ? "border-[#7e22ce] bg-[#7e22ce]"
                    : "border-purple-200 bg-transparent group-hover:border-[#7e22ce]"
                }`}
                onClick={() => setActiveDietary(option)}
              >
                {activeDietary === option && (
                  <div className="w-2 h-2 bg-white rounded-full" />
                )}
              </div>
              <span className={`text-[15px] transition-colors ${activeDietary === option ? "text-[#1a1a2e] font-semibold" : "text-gray-600 font-medium"}`}>{option}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Section */}
      <div className="mb-8 pl-1">
        <h3 className="text-[16px] font-bold text-[#374151] mb-4">Price Range</h3>
        <div className="flex flex-col gap-3.5">
          {priceOptions.map((option) => (
            <label
              key={option}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div
                className={`w-[18px] h-[18px] rounded-full border-[1.5px] flex items-center justify-center transition-colors ${
                  activePrice === option
                    ? "border-[#7e22ce] bg-[#7e22ce]"
                    : "border-purple-200 bg-transparent group-hover:border-[#7e22ce]"
                }`}
                onClick={() => setActivePrice(option)}
              >
                {activePrice === option && (
                  <div className="w-2 h-2 bg-white rounded-full" />
                )}
              </div>
              <span className={`text-[15px] transition-colors ${activePrice === option ? "text-[#1a1a2e] font-semibold" : "text-gray-600 font-medium"}`}>{option}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Flavors Section */}
      <div className="pl-1">
        <h3 className="text-[16px] font-bold text-[#374151] mb-4">Flavors</h3>
        <div className="grid grid-cols-2 gap-3">
          {flavorOptions.map((flavor) => (
            <button
              key={flavor}
              onClick={() => handleFlavorToggle(flavor)}
              className={`py-2 px-1 text-center rounded-[12px] border text-[13px] font-semibold transition-all duration-300 ${
                activeFlavors.includes(flavor)
                  ? "bg-[#7e22ce] text-white border-[#7e22ce] shadow-[0_4px_10px_rgba(126,34,206,0.25)]"
                  : "bg-white text-gray-600 border-purple-200 hover:border-[#7e22ce] hover:text-[#7e22ce]"
              }`}
            >
              {flavor}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SortandFilterCard;
