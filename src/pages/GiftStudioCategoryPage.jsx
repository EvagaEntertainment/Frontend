import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import ProductCardV3 from "../components/Cards/ProductCardV3";
import CustomPagination from "../utils/CustomPagination";
import { internalRoutes } from "../utils/internalRoutes";
import { FaArrowLeft } from "react-icons/fa";
import SortandFilterCard from "../components/Cards/SortAndFilterCard";

// Dummy data for products specific to a category
const generateDummyProducts = (categoryName) => {
  return Array.from({ length: 24 }).map((_, index) => ({
    id: index + 1,
    image: `https://images.unsplash.com/photo-${1500000000000 + index * 100000}?q=80&w=600&auto=format&fit=crop`,
    category: categoryName.toUpperCase(),
    rating: (4 + Math.random()).toFixed(1),
    title: `Premium ${categoryName} Item ${index + 1}`,
    description: `Perfect for anniversaries and birthdays.`,
    price: Math.floor(Math.random() * 4000) + 500,
    reviews: Math.floor(Math.random() * 400) + 20,
    badge: index % 4 === 0 ? "BESTSELLER" : index % 3 === 0 ? "EGGLESS" : index % 5 === 0 ? "TRENDING" : null,
    useCartIcon: Math.random() > 0.5,
  }));
};

const GiftStudioCategoryPage = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [isGridAnimating, setIsGridAnimating] = useState(false);
  const itemsPerPage = 8;
  
  // Format category name for display (e.g., GiftBoxes -> Gift Boxes)
  const displayCategoryName = categoryName.replace(/([A-Z])/g, ' $1').trim();

  // Generate some products
  const products = generateDummyProducts(displayCategoryName);

  // Pagination Logic
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Stagger animation driver
  useEffect(() => {
    setIsGridAnimating(false);
    const timer = setTimeout(() => setIsGridAnimating(true), 50);
    return () => clearTimeout(timer);
  }, [currentPage, categoryName]);

  const handlePageChange = (event, value) => {
    if (value === currentPage) return;
    setCurrentPage(value);
    window.scrollTo({ top: 150, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#f9f9fb] flex flex-col pt-[50px] font-sans">
      <div className="flex-grow pt-0 pb-6 max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Section */}
        <div className="flex items-center space-x-2 text-[13px] text-gray-500 mb-6 mt-0">
          <Link to={internalRoutes.home} className="hover:text-[#7e22ce] transition-colors">Home</Link>
          <span className="text-gray-400">›</span>
          <Link to={internalRoutes.giftStudio} className="hover:text-[#7e22ce] transition-colors">Bakery</Link>
          <span className="text-gray-400">›</span>
          <span className="text-gray-900 font-semibold">{displayCategoryName}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Area */}
          <div className="hidden lg:block w-[260px] flex-shrink-0 sticky top-[100px] self-start h-auto">
            <SortandFilterCard />
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            
            {/* Header & Sort Section */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-8 pl-1">
              <div>
                <h1 className="text-[28px] font-bold text-[#1a1a2e] tracking-tight mb-1">
                  Delicious {displayCategoryName}
                </h1>
                <p className="text-gray-500 text-[14px]">
                  Found {products.length} artisanal {displayCategoryName.toLowerCase()} for your celebration.
                </p>
              </div>
              <div className="flex items-center mt-4 sm:mt-0">
                <span className="text-gray-500 text-[12px] font-bold tracking-wider mr-3 uppercase">Sort:</span>
                <select className="border border-gray-200 rounded-[8px] px-3 py-2 text-[14px] font-semibold text-gray-700 bg-white focus:outline-none focus:border-[#7e22ce] cursor-pointer shadow-sm">
                  <option>Best Selling</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest Arrivals</option>
                </select>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 justify-items-center min-h-[500px]">
              {currentProducts.map((product, index) => (
                <div 
                  key={product.id}
                  className={`transition-all duration-700 ease-out transform w-full flex justify-center ${
                    isGridAnimating ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <ProductCardV3
                    image={product.image}
                    category={product.category}
                    rating={product.rating}
                    title={product.title}
                    description={product.description}
                    price={product.price}
                    badge={product.badge}
                    reviewsCount={product.reviews}
                    useCartIcon={product.useCartIcon}
                    onClickCard={() => navigate(`${internalRoutes.giftStudio}/${categoryName}/${product.id}`)}
                  />
                </div>
              ))}
            </div>

            {/* Pagination Container */}
            <div className="mt-16 mb-8 flex justify-center border-t border-gray-200 pt-8">
              <CustomPagination 
                currentPage={currentPage}
                totalPage={totalPages}
                onChange={handlePageChange}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default GiftStudioCategoryPage;
