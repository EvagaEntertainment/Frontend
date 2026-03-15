import React from "react";
import GiftCategory from "../components/GiftCategory/GiftCategory";
import ProductCardV3 from "../components/Cards/ProductCardV3";
import { motion } from "framer-motion";

const sampleProducts = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1548842220-418ebfc87eb7?q=80&w=600&auto=format&fit=crop",
    category: "FOOD & SWEETS",
    rating: "4.8",
    title: "Midnight Treats Macaron Box",
    description: "A luxury selection of 12 handcrafted artisanal macarons.",
    price: 1499,
    useCartIcon: true,
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=600&auto=format&fit=crop",
    category: "BALLOONS",
    rating: "4.9",
    title: "Midnight Gala Balloon Bouquet",
    description: "",
    price: 899,
    useCartIcon: false,
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1542841791-1925b02a2bf8?q=80&w=600&auto=format&fit=crop",
    category: "PREMIUM CACAO",
    rating: "5.0",
    title: "Artisanal Dark Chocolate Box",
    description: "Decadent rich dark chocolate box with rare floral notes.",
    price: 2499,
    useCartIcon: true,
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=600&auto=format&fit=crop",
    category: "GIFT BOXES",
    rating: "4.7",
    title: "Romantic Evening Gift Set",
    description: "Curated essentials for a perfect memorable evening.",
    price: 4999,
    useCartIcon: false,
  }
];

const GiftStudio = () => {
  return (
    <div className="min-h-screen bg-[#faf9fc] flex flex-col font-sans">
      {/* Enhanced Animated Banner Hero Section */}
      <div className="relative w-full h-[450px] md:h-[550px] lg:h-[650px] overflow-hidden flex items-center justify-center bg-[#0a0a0f] shadow-sm group">
        
        {/* Animated Background Image */}
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=2040&auto=format&fit=crop" 
            alt="Gift Studio Banner" 
            className="w-full h-full object-cover opacity-50 transition-transform duration-[15s] ease-linear group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/60 to-transparent"></div>
          {/* Subtle colored glow overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#7e22ce]/20 to-transparent mix-blend-overlay"></div>
        </div>

        {/* Floating Decorative Elements */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute right-[10%] top-[20%] w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none"
        />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.8 }}
          className="absolute left-[30%] bottom-[10%] w-80 h-80 bg-pink-500/10 rounded-full blur-[100px] pointer-events-none"
        />

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 flex flex-col items-start mt-8 sm:mt-0">
          
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="mb-5 inline-block py-1.5 px-5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white/90 text-[11px] sm:text-xs font-bold tracking-[0.25em] uppercase shadow-lg shadow-black/20"
          >
            <span className="mr-2">✨</span> Introducing
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-6 tracking-tight drop-shadow-2xl max-w-3xl leading-[1.05]"
          >
            Eevagga <br className="hidden sm:block"/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d8b4fe] via-[#fbcfe8] to-[#f9a8d4] inline-block">Gift Studio</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-2xl font-medium leading-relaxed drop-shadow-md mb-10"
          >
            Curated, personalized, and unforgettable gifts crafted for every precious occasion. Discover the true art of giving and make every moment magical.
          </motion.p>
          
          <motion.button 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-8 py-4 bg-white text-[#7e22ce] font-extrabold rounded-full overflow-hidden shadow-[0_8px_25px_rgba(126,34,206,0.3)] transition-all duration-300 text-[13px] sm:text-sm tracking-widest uppercase flex items-center"
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-white">Explore Collection</span>
            <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-[#7e22ce] to-[#c026d3] transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100 z-0"></div>
          </motion.button>
        </div>
        
        {/* Subtle Bottom Curve/Gradient for blending into next section */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#faf9fc] to-transparent z-10"></div>
      </div>

      <div className="relative z-20 w-full mt-4">
        {/* Render the new Category Menu */}
        <div className="w-full">
          <GiftCategory />
        </div>
      </div>

      <div className="flex-grow py-6 pb-20 max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col mb-10 pl-2">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a1a2e] mb-2 tracking-tight">
            Trending Gifts <span className="text-[#7e22ce]">✨</span>
          </h2>
          <p className="text-gray-500 text-base md:text-lg font-medium">
            Explore our most loved handcrafted selections
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
          {sampleProducts.map((product) => (
            <ProductCardV3
              key={product.id}
              image={product.image}
              category={product.category}
              rating={product.rating}
              title={product.title}
              description={product.description}
              price={product.price}
              useCartIcon={product.useCartIcon}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GiftStudio;
