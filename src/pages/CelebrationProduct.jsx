import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProductCardV3 from "../components/Cards/ProductCardV3";
import CustomPagination from "../utils/CustomPagination";
import { internalRoutes } from "../utils/internalRoutes";
import { BiFilterAlt } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";

// Dummy data to match the UI precisely
const dummyProducts = [
  { id: 1, image: "https://images.unsplash.com/photo-1530103862676-de3c9de59f9e?w=800&q=80", category: "BALLOONS", rating: "4.9", title: "Midnight Gala Balloon Bouquet", price: 34.99, reviews: 120, useCartIcon: false },
  { id: 2, image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80", category: "BANNERS", rating: "4.8", title: "Luxe Gold Glitter Banner Set", price: 19.50, reviews: 85, useCartIcon: false },
  { id: 3, image: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=800&q=80", category: "KITS", rating: "5.0", title: "Grand Celebration Master Kit", price: 89.00, badge: "BEST SELLER", reviews: 210, useCartIcon: false },
  { id: 4, image: "https://images.unsplash.com/photo-1496332274465-d0697fd38729?w=800&q=80", category: "STREAMERS", rating: "4.7", title: "Velvet Cascading Streamers", price: 12.99, reviews: 60, useCartIcon: false },
  { id: 5, image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&q=80", category: "EXTRAS", rating: "4.9", title: "Golden Rain Confetti Cannon", price: 8.50, reviews: 340, useCartIcon: false },
  { id: 6, image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80", category: "DECOR", rating: "4.6", title: "Metallic Foil Shimmer Curtain", price: 15.00, reviews: 45, useCartIcon: false },
  { id: 7, image: "https://images.unsplash.com/photo-1531058240690-006c446962bf?w=800&q=80", category: "BALLOONS", rating: "4.8", title: 'Giant 40" Number Balloons (Gold)', price: 12.50, reviews: 90, useCartIcon: false },
  { id: 8, image: "https://images.unsplash.com/photo-1606917631379-3ef1f0d01d4a?w=800&q=80", category: "KITS", rating: "4.9", title: "Boho Chic Tabletop Decor Set", price: 45.00, reviews: 110, useCartIcon: false },
];

const CelebrationSidebar = () => {
  const [activePrices, setActivePrices] = useState(["$25 - $50"]);
  const [activeTypes, setActiveTypes] = useState(["Premium Balloons"]);
  const [activeColor, setActiveColor] = useState("#4285f4"); // The blue circle

  const priceOptions = ["Under $25", "$25 - $50", "$50 - $100", "$100+"];
  const typeOptions = ["Premium Balloons", "Decor Kits", "Banners & Signs", "Party Streamers"];
  const colors = ["#1a1a2e", "#fbbf24", "#ed4956", "#ffffff", "#4285f4"];

  const toggleFilter = (state, setState, option) => {
    setState((prev) =>
      prev.includes(option) ? prev.filter((v) => v !== option) : [...prev, option]
    );
  };

  return (
    <div className="w-full bg-[#fcfafd] rounded-2xl p-6 border border-purple-50 shadow-sm font-sans mb-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <BiFilterAlt className="text-[#7e22ce] text-xl" />
        <h2 className="text-lg font-bold text-gray-800">Filters</h2>
      </div>

      {/* Price Range */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-[12px] font-bold text-gray-500 tracking-wider uppercase">Price Range</h3>
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

      {/* Product Type */}
      <div className="mb-8 border-t border-purple-50 pt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-[12px] font-bold text-gray-500 tracking-wider uppercase">Product Type</h3>
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

      {/* Color Theme */}
      <div className="border-t border-purple-50 pt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-[12px] font-bold text-gray-500 tracking-wider uppercase">Color Theme</h3>
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

const CelebrationProduct = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [isGridAnimating, setIsGridAnimating] = useState(false);

  const products = dummyProducts;

  // Animation effect on load
  useEffect(() => {
    setIsGridAnimating(false);
    const timer = setTimeout(() => setIsGridAnimating(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handlePageChange = (event, value) => {
    if (value === currentPage) return;
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col pt-[50px] font-sans">
      <div className="flex-grow pt-4 pb-6 max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center space-x-2 text-[13px] text-gray-500 mb-6 font-medium">
          <Link to={internalRoutes.home} className="hover:text-[#7e22ce] transition-colors">Home</Link>
          <span className="text-gray-400 text-[10px]">›</span>
          <span className="hover:text-[#7e22ce] transition-colors cursor-pointer">Occasions</span>
          <span className="text-gray-400 text-[10px]">›</span>
          <span className="text-[#7e22ce] font-semibold">Celebration Products</span>
        </div>

        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-[34px] sm:text-[40px] font-extrabold text-[#1a1a2e] tracking-tight mb-2">
            Celebration Essentials
          </h1>
          <p className="text-gray-500 text-[15px] sm:text-[16px] max-w-2xl">
            Premium decor to make every birthday, anniversary, and party unforgettable.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12">
          
          {/* Left Sidebar */}
          <div className="hidden lg:block w-[260px] flex-shrink-0 sticky top-[90px] self-start h-auto">
            <CelebrationSidebar />
          </div>

          {/* Right Main Content */}
          <div className="flex-1">
            
            {/* Sort Section */}
            <div className="flex justify-end items-center mb-8 pr-2">
              <span className="text-gray-500 text-[13px] font-bold uppercase tracking-wider mr-3">Sort by:</span>
              <select className="border border-purple-200 rounded-[20px] px-4 py-2 text-[14px] font-semibold text-[#7e22ce] bg-white focus:outline-none focus:ring-2 focus:ring-purple-200 cursor-pointer shadow-sm hover:border-[#7e22ce] transition-all duration-300">
                <option>Featured</option>
                <option>Best Selling</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 gap-y-10 justify-items-center min-h-[500px]">
              {products.map((product, index) => (
                <div 
                  key={product.id}
                  className={`transition-all duration-700 ease-out transform w-full flex justify-center ${
                    isGridAnimating ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 80}ms` }}
                >
                  <ProductCardV3
                    image={product.image}
                    category={product.category}
                    rating={product.rating}
                    title={product.title}
                    price={product.price}
                    badge={product.badge}
                    reviewsCount={product.reviews}
                    useCartIcon={false} // Match the mock style (uses Plus icon)
                    onClickCard={() => navigate(`/celebration/${product.id}`)}
                  />
                </div>
              ))}
            </div>

            {/* Pagination Container */}
            <div className="mt-20 mb-10 flex justify-center pt-8">
              <CustomPagination 
                currentPage={currentPage}
                totalPage={12} // hardcoded to match the mocked image (1 .. 12)
                onChange={handlePageChange}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CelebrationProduct;
