import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { BiBrain, BiStar } from "react-icons/bi";
import { IoMdArrowRoundForward } from "react-icons/io";

const AIBuilder = () => {
  const navigate = useNavigate();
  const [activeFeature, setActiveFeature] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedMood, setSelectedMood] = useState(null);

  const runAI = () => {
    setIsProcessing(true);
    setShowResults(false);
    setTimeout(() => {
      setIsProcessing(false);
      setShowResults(true);
    }, 2000);
  };

  const packageResults = [
    { id: 1, title: "Good Package", price: "₹24,999", image: "https://images.unsplash.com/photo-1547014762-df9ea72960f4?w=500", items: ["Basic Decor", "Balloon Arch", "Standard Sound System"], rating: "4.5" },
    { id: 3, title: "Better Package", price: "₹39,999", image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=500", items: ["Themed Decor", "Grand Entry", "Professional DJ", "Photography"], rating: "4.8", badge: "BEST VALUE" },
    { id: 2, title: "Premium Package", price: "₹64,999", image: "https://images.unsplash.com/photo-1530103862676-de3c9de59f9e?w=500", items: ["Luxury Theme", "Live Entertainment", "Full Event Coverage", "Catering Service"], rating: "5.0" },
  ];

  const moodboards = [
    { 
      id: "boho-dream",
      theme: "Boho Dream", 
      img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600", 
      range: "₹40k - ₹60k",
      description: "A blend of rustic charm and chic elegance. Think pampas grass, warm wood, and soft macramé details.",
      colors: ["#D4A373", "#FEFAE0", "#E9EDC9", "#CCD5AE"],
      gallery: [
        "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400",
        "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400"
      ],
      skus: ["Pampas Arch", "Macrame Backdrop", "Low Seating Table"]
    },
    { 
      id: "cosmic-neon",
      theme: "Cosmic Neon", 
      img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600", 
      range: "₹55k - ₹80k",
      description: "Vibrant LEDs, holographic surfaces, and a futuristic vibe that brings the party to life.",
      colors: ["#FF00FF", "#00FFFF", "#7E22CE", "#000000"],
      gallery: [
        "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400",
        "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400"
      ],
      skus: ["LED Tunnel", "Holographic Bar", "Laser Show"]
    },
    { 
      id: "vintage-garden",
      theme: "Vintage Garden", 
      img: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600", 
      range: "₹35k - ₹50k",
      description: "Timeless floral arrangements, antique chairs, and the soft glow of fairy lights in a lush setting.",
      colors: ["#778899", "#F5F5DC", "#BC8F8F", "#556B2F"],
      gallery: [
        "https://images.unsplash.com/photo-1547014762-df9ea72960f4?w=400",
        "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400"
      ],
      skus: ["Floral Arch", "Fairy Light String", "Vintage Chandelier"]
    },
    { 
      id: "royal-gold",
      theme: "Royal Gold", 
      img: "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?w=800", 
      range: "₹70k - ₹120k",
      description: "Unapologetic luxury. Velvet textures, dripping crystals, and a palette of gold and black.",
      colors: ["#D4AF37", "#000000", "#FFFFFF", "#B08D57"],
      gallery: [
        "https://images.unsplash.com/photo-1530103862676-de3c9de59f9e?w=400",
        "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=400"
      ],
      skus: ["Gold Throne", "Crystal Chandelier", "Velvet Draping"]
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto py-4">
      <div className="flex flex-col items-center mb-12">
        <h2 className="text-3xl font-black text-[#1a1a2e] mb-6 tracking-tight text-center">
          Build with <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c026d3] to-[#7e22ce]">Evagga AI</span>
        </h2>
        <div className="flex p-1 bg-gray-100 rounded-2xl shadow-inner border border-gray-200">
          <button 
            onClick={() => { setActiveFeature(1); setShowResults(false); }}
            className={`px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${activeFeature === 1 ? "bg-white text-[#c026d3] shadow-md" : "text-gray-500"}`}
          >
            AI Package Generator
          </button>
          <button 
            onClick={() => { setActiveFeature(2); setShowResults(false); }}
            className={`px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${activeFeature === 2 ? "bg-white text-[#c026d3] shadow-md" : "text-gray-500"}`}
          >
            Auto Moodboards
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <motion.div layout className="lg:col-span-5 bg-white p-8 rounded-[2rem] shadow-xl border border-purple-50">
          {activeFeature === 1 ? (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-800 flex items-center">
                <span className="w-8 h-8 rounded-lg bg-purple-100 text-[#7e22ce] flex items-center justify-center mr-3 text-sm">01</span>
                Event Details
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider pl-1 font-sans">Occasion</label>
                  <select className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-purple-200 outline-none text-sm font-medium">
                    <option>1st Birthday</option>
                    <option>Sweet 16</option>
                    <option>Milestone Birthday</option>
                    <option>Adult Celebration</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider pl-1 font-sans">Guests</label>
                    <select className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-purple-200 outline-none text-sm font-medium">
                      <option>10-25</option>
                      <option>25-50</option>
                      <option>50-100</option>
                      <option>100+</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider pl-1 font-sans">Setting</label>
                    <select className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-purple-200 outline-none text-sm font-medium">
                      <option>Indoor</option>
                      <option>Outdoor</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider pl-1 font-sans">City</label>
                  <input type="text" defaultValue="New Delhi" className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-purple-200 outline-none text-sm font-medium" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider pl-1 font-sans">Budget Band</label>
                  <select className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-purple-200 outline-none text-sm font-bold text-[#c026d3]">
                    <option>₹10,000 - ₹30,000</option>
                    <option>₹30,000 - ₹60,000</option>
                    <option>Above ₹1,00,000</option>
                  </select>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-800 flex items-center">
                <span className="w-8 h-8 rounded-lg bg-pink-100 text-[#c026d3] flex items-center justify-center mr-3 text-sm">02</span>
                Inspiration Box
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider pl-1 font-sans">Max Budget (₹)</label>
                  <input type="number" defaultValue="50000" className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl focus:ring-2 focus:ring-pink-200 outline-none text-2xl font-black text-[#c026d3]" />
                </div>
                <p className="text-xs font-medium text-gray-400 leading-relaxed italic">AI will curate the best vision moodboards for your budget.</p>
              </div>
            </div>
          )}

          <button 
            onClick={runAI}
            disabled={isProcessing}
            className="w-full mt-10 bg-gradient-to-r from-[#c026d3] to-[#7e22ce] text-white font-black py-4 rounded-2xl shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-3 tracking-widest text-sm uppercase"
          >
            {isProcessing ? <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Processing...</> : <><BiStar className="text-lg" /> Generate Now</>}
          </button>
        </motion.div>

        <div className="lg:col-span-7 min-h-[400px]">
          <AnimatePresence mode="wait">
            {isProcessing ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full flex flex-col items-center justify-center space-y-4">
                <BiBrain className="text-6xl text-[#c026d3] animate-pulse" />
                <p className="text-[#c026d3] font-bold tracking-widest uppercase text-xs">Analyzing SKU Library...</p>
              </motion.div>
            ) : showResults ? (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <h3 className="text-2xl font-black text-[#1a1a2e]">AI Recommendations</h3>
                {activeFeature === 1 ? (
                  <div className="space-y-4">
                    {packageResults.map((pkg, i) => (
                      <div 
                        key={i} 
                        onClick={() => navigate(`/celebration/${pkg.id}`)}
                        className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#c026d3]/30 transition-all duration-300 relative overflow-hidden flex flex-col sm:flex-row cursor-pointer group"
                      >
                        {pkg.badge && <span className="absolute top-3 left-3 z-10 bg-[#c026d3] text-white text-[9px] font-black px-3 py-1 rounded-full shadow-lg">{pkg.badge}</span>}
                        
                        {/* Package Image */}
                        <div className="w-full sm:w-40 h-40 sm:h-auto flex-shrink-0 relative overflow-hidden">
                          <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>

                        <div className="flex-grow p-5 flex flex-col justify-between">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-bold text-gray-800 text-lg leading-tight group-hover:text-[#c026d3] transition-colors">{pkg.title}</h4>
                              <p className="text-[11px] text-gray-400 mt-2 font-medium leading-relaxed">{pkg.items.join(" • ")}</p>
                              <div className="flex items-center mt-2">
                                <span className="text-yellow-400 text-xs">★</span>
                                <span className="text-[10px] text-gray-500 font-bold ml-1">{pkg.rating}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-xl font-black text-[#c026d3]">{pkg.price}</div>
                              <button className="mt-3 bg-[#fcf5ff] text-[#c026d3] px-4 py-2 rounded-xl text-[10px] font-black uppercase hover:bg-[#c026d3] hover:text-white flex items-center gap-1 transition-all duration-300 transform group-hover:translate-x-1">
                                View Details <IoMdArrowRoundForward />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <AnimatePresence mode="wait">
                    {selectedMood ? (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-white p-6 rounded-[2.5rem] border border-purple-50 shadow-2xl overflow-hidden"
                      >
                        <div className="flex items-center gap-4 mb-6">
                          <button onClick={() => setSelectedMood(null)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                          </button>
                          <div>
                            <h2 className="text-2xl font-black text-[#1a1a2e]">{selectedMood.theme}</h2>
                            <p className="text-xs font-bold text-[#c026d3] uppercase tracking-widest">{selectedMood.range}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-6">
                            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-lg">
                              <img src={selectedMood.img} className="w-full h-full object-cover" alt={selectedMood.theme} />
                            </div>
                            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
                              {selectedMood.gallery.map((img, idx) => (
                                <img key={idx} src={img} className="w-24 h-24 rounded-2xl object-cover flex-shrink-0 border-2 border-transparent hover:border-[#c026d3] transition-all cursor-pointer" alt="Gallery item" />
                              ))}
                            </div>
                          </div>
                          
                          <div className="space-y-8">
                            <div>
                              <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-3">Theme Vision</h4>
                              <p className="text-sm text-gray-500 leading-relaxed font-medium">{selectedMood.description}</p>
                            </div>

                            <div>
                              <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-4">Color Palette</h4>
                              <div className="flex gap-4">
                                {selectedMood.colors.map(color => (
                                  <div key={color} className="flex flex-col items-center gap-2">
                                    <div className="w-12 h-12 rounded-2xl shadow-inner border border-gray-100" style={{ backgroundColor: color }} />
                                    <span className="text-[10px] font-bold text-gray-400 uppercase">{color}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-4">Top SKUs for this theme</h4>
                              <div className="space-y-3">
                                {selectedMood.skus.map((sku, idx) => (
                                  <div key={idx} className="flex items-center justify-between p-3 rounded-2xl border border-gray-50 hover:border-[#c026d3]/20 bg-gray-50/30 transition-all cursor-pointer group">
                                    <span className="text-xs font-bold text-gray-600 group-hover:text-[#c026d3] transition-colors">{sku}</span>
                                    <button className="text-[10px] bg-white text-gray-400 font-black px-3 py-1.5 rounded-full border border-gray-200 group-hover:bg-[#c026d3] group-hover:text-white transition-all">Quick Add</button>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <button className="w-full bg-[#1a1a2e] text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg hover:shadow-[#c026d3]/20 hover:bg-[#c026d3] transition-all">
                              Generate Custom Quotation
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                      >
                        {moodboards.map((mood, i) => (
                          <div 
                            key={i} 
                            onClick={() => setSelectedMood(mood)}
                            className="relative h-[200px] rounded-3xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-xl transition-all"
                          >
                            <img src={mood.img} className="w-full h-full object-cover transition-transform group-hover:scale-110" alt={mood.theme} />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
                              <h4 className="text-white font-bold">{mood.theme}</h4>
                              <p className="text-white/70 text-xs">{mood.range}</p>
                              <div className="mt-2 text-[8px] text-white opacity-0 group-hover:opacity-100 transition-opacity bg-white/20 backdrop-blur-md px-2 py-1 rounded-full w-fit">
                                Explore Vision Details
                              </div>
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-10 bg-gray-50/50 rounded-[2rem] border border-dashed border-gray-300">
                <BiBrain className="text-4xl text-gray-300 mb-4" />
                <h4 className="text-lg font-bold text-gray-400">Ready to build?</h4>
                <p className="text-xs text-gray-400 mt-1">Fill the form and hit generate to see AI magic.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Instant Clarity", desc: "No more waiting for quotes." },
          { title: "Fast Decisions", desc: "Compare and book in minutes." },
          { title: "Smart Pricing", desc: "AI picks based on SKU rules." },
          { title: "Curated Themes", desc: "Visual moodboards for inspiration." }
        ].map((item, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-gray-50 shadow-sm">
            <h5 className="font-bold text-gray-800 text-sm">{item.title}</h5>
            <p className="text-[11px] text-gray-500 mt-1">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIBuilder;
