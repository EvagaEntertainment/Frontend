import React, { useRef } from "react";
import GiftCategoryCard from "../Cards/GiftCategoryCard";
import { FaBirthdayCake, FaGift, FaLeaf, FaWineGlass, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BsCCircle, BsStars } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
import { GiFlowerPot } from "react-icons/gi";
import { TbCards } from "react-icons/tb";
import { internalRoutes } from "../../utils/internalRoutes";

const categories = [
  {
    title: "Flowers",
    icon: <GiFlowerPot />,
    link: `${internalRoutes?.giftStudio}/Flowers`,
  },
  {
    title: "Cakes",
    icon: <FaBirthdayCake />,
    link: `${internalRoutes?.giftStudio}/Cakes`,
  },
  {
    title: "Cards",
    icon: <TbCards />,
    link: `${internalRoutes?.giftStudio}/Cards`,
  },
  {
    title: "Gift Boxes",
    icon: <FaGift />,
    link: `${internalRoutes?.giftStudio}/GiftBoxes`,
  },
  {
    title: "Jewelry",
    icon: <IoDiamond />,
    link: `${internalRoutes?.giftStudio}/Jewelry`,
  },
  {
    title: "Plants",
    icon: <FaLeaf />,
    link: `${internalRoutes?.giftStudio}/Plants`,
  },
  {
    title: "Gourmet",
    icon: <FaWineGlass />,
    link: `${internalRoutes?.giftStudio}/Gourmet`,
  },
  {
    title: "Custom",
    icon: <BsStars />,
    link: `${internalRoutes?.giftStudio}/Custom`,
  },
];

const GiftCategory = () => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full bg-transparent py-4 mt-6 border-b border-gray-200">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Section */}
        <div className="flex flex-row justify-between items-end mb-8 pl-2">
          <div className="text-left relative">
            <h2 className="text-3xl md:text-4xl font-extrabold text-textGray mb-2 tracking-tight">
              Explore by Category
            </h2>
            <p className="text-gray-500 text-base md:text-lg font-medium">
              Find exactly what you're looking for
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="hidden md:flex gap-4">
            <button
              onClick={scrollLeft}
              className="w-12 h-12 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-500 hover:text-[#7e22ce] hover:border-purple-200 hover:bg-purple-50 hover:shadow-[0_8px_20px_rgba(126,34,206,0.15)] focus:outline-none transition-all duration-300 ease-out transform hover:-translate-y-1"
              aria-label="Scroll left"
            >
              <FaChevronLeft className="text-base mr-0.5" />
            </button>
            <button
              onClick={scrollRight}
              className="w-12 h-12 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-500 hover:text-[#7e22ce] hover:border-purple-200 hover:bg-purple-50 hover:shadow-[0_8px_20px_rgba(126,34,206,0.15)] focus:outline-none transition-all duration-300 ease-out transform hover:-translate-y-1"
              aria-label="Scroll right"
            >
              <FaChevronRight className="text-base ml-0.5" />
            </button>
          </div>
        </div>

        {/* Render a scrollable row of cards */}
        <div
          ref={scrollRef}
          className="flex flex-row overflow-x-auto pb-6 gap-4 sm:gap-6 justify-start scroll-smooth no-scrollbar items-center"
        >
          {categories.map((cat, index) => (
            <GiftCategoryCard
              key={index}
              title={cat.title}
              icon={cat.icon}
              link={cat.link}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GiftCategory;
