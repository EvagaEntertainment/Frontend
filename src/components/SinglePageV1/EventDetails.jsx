import { FaStar, FaCheckSquare, FaTruck, FaLock, FaPlus, FaMinus } from "react-icons/fa";
import { BsCartPlus } from "react-icons/bs";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { internalRoutes } from "../../utils/internalRoutes";

const EventDetails = ({ product }) => {
  const [activeTab, setActiveTab] = useState("Details");
  const [customMsg, setCustomMsg] = useState("");
  const [addonState, setAddonState] = useState({});
  const navigate = useNavigate();

  const handleAddonUpdate = (addonId, minOrder, increment) => {
    setAddonState(prev => {
      const current = prev[addonId] || 0;
      let next = current;
      if (increment) {
        if (current === 0) next = minOrder || 1;
        else next = current + 1;
      } else {
        if (current === (minOrder || 1)) next = 0;
        else if (current > 0) next = current - 1;
      }
      return { ...prev, [addonId]: next };
    });
  };

  const addonsTotal = (product.addons || []).reduce((acc, addon) => {
    const qty = addonState[addon._id || addon.itemName] || 0;
    return acc + (qty * Number(addon.price || 0));
  }, 0);

  const grandTotal = Number(product.price || 0) + addonsTotal;

  const handleBookPackage = () => {
    const selectedAddons = (product.addons || []).filter(addon => (addonState[addon._id || addon.itemName] || 0) > 0).map(addon => ({
      ...addon,
      quantity: addonState[addon._id || addon.itemName]
    }));

    const bookingData = {
      product: {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.images?.[0] || ""
      },
      addons: selectedAddons,
      specialRequests: customMsg,
      baseTotal: Number(product.price || 0),
      addonsTotal,
      grandTotal
    };

    localStorage.setItem("packageBookingData", JSON.stringify(bookingData));
    navigate(internalRoutes.packageBooking || "/package-booking");
  };

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
            <FaCheckSquare className="text-green-500" /> Event Package
          </div>
        </div>
      </div>

      {/* Pricing Block */}
      <div className="bg-[#FAF8FC] p-6 rounded-2xl border border-purple-50 shadow-sm mt-2">
        <div className="flex items-baseline gap-3 mb-2">
          <span className="text-4xl font-black text-[#7e22ce]">₹{Number(product.price).toLocaleString('en-IN')}</span>
          <span className="text-lg font-bold text-gray-400 line-through">₹{Number(product.originalPrice * 1.15).toLocaleString('en-IN')}</span>
          <span className="bg-[#fbbf24] text-white text-[10px] font-bold px-2 py-1 rounded-full ml-1 shadow-sm uppercase tracking-widest">
            Special Deal
          </span>
        </div>
        <p className="text-gray-500 text-sm leading-relaxed max-w-lg mt-2 font-medium">
          {product.description}
        </p>
        {product.venueType && (
          <div className="mt-4 flex items-center gap-2 text-[13px] text-[#7e22ce] font-semibold bg-purple-50 border border-purple-100 w-fit px-3 py-1.5 rounded-lg shadow-sm">
            <span>📍 Preferred Venue:</span>
            <span>{product.venueType}</span>
          </div>
        )}

        {/* Premium Addons Section */}
        {product.addons && product.addons.length > 0 && (
          <div className="mt-8 border-t border-gray-100 pt-6">
            <h4 className="text-xs font-black text-gray-900 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7e22ce]"></span>
              Customize Configuration
            </h4>
            <div className="grid grid-cols-1 gap-3">
              {product.addons.map((addon) => {
                const qty = addonState[addon._id || addon.itemName] || 0;
                const min = addon.minOrder || 1;
                const isSelected = qty > 0;

                return (
                  <div key={addon._id || addon.itemName} className={`relative overflow-hidden flex justify-between items-center bg-white p-4 rounded-xl border transition-all duration-300 shadow-sm ${isSelected ? 'border-[#7e22ce] shadow-md bg-purple-50/30' : 'border-gray-200 hover:border-[#7e22ce] hover:bg-gradient-to-r hover:from-white hover:to-purple-50/50 hover:shadow-[0_8px_30px_rgb(126,34,206,0.12)] cursor-pointer group hover:-translate-y-0.5'}`}>
                    <div className="flex items-center gap-4 z-10 w-full" onClick={() => !isSelected && handleAddonUpdate(addon._id || addon.itemName, min, true)}>
                      {isSelected ? (
                        <div className="flex items-center bg-[#7e22ce] text-white rounded-full shadow-inner font-bold border border-[#7e22ce]">
                          <button onClick={(e) => { e.stopPropagation(); handleAddonUpdate(addon._id || addon.itemName, min, false); }} className="w-8 h-8 flex items-center justify-center hover:bg-white/20 rounded-l-full transition-colors"><FaMinus className="text-[10px]" /></button>
                          <span className="w-6 text-center text-xs">{qty}</span>
                          <button onClick={(e) => { e.stopPropagation(); handleAddonUpdate(addon._id || addon.itemName, min, true); }} className="w-8 h-8 flex items-center justify-center hover:bg-white/20 rounded-r-full transition-colors"><FaPlus className="text-[10px]" /></button>
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 font-bold group-hover:bg-[#7e22ce] group-hover:border-[#7e22ce] group-hover:text-white transition-all duration-300 shadow-inner group-active:scale-95 shrink-0">
                          <FaPlus className="text-xs" />
                        </div>
                      )}
                      <div className="flex flex-col ml-1">
                        <p className={`text-[15px] font-bold capitalize tracking-tight transition-colors ${isSelected ? 'text-[#7e22ce]' : 'text-gray-900 group-hover:text-[#7e22ce]'}`}>{addon.itemName}</p>
                        {addon.minOrder > 1 && !isSelected && (
                          <div className="mt-1 flex items-center">
                            <span className="bg-orange-50 border border-orange-100 text-orange-600 text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest shadow-sm">
                              Min Qty: {addon.minOrder}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end z-10">
                      <div className="flex items-baseline gap-1">
                        <span className={`text-lg font-black transition-colors ${isSelected ? 'text-[#7e22ce]' : 'text-gray-900 group-hover:text-[#7e22ce]'}`}>₹{Number(addon.price).toLocaleString('en-IN')}</span>
                      </div>
                      <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400">per unit</p>
                    </div>
                    {!isSelected && <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#7e22ce]/[0.07] to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* Personalization (e.g. Special Requests) */}
      <div className="mt-4">
        <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Special Requests & Inquiries</h4>
        <textarea
          rows={3}
          value={customMsg}
          onChange={(e) => setCustomMsg(e.target.value)}
          placeholder="Any dietary requirements, venue preferences, or special requests..."
          className="w-full border border-gray-200 rounded-xl p-4 text-sm focus:outline-none focus:border-[#7e22ce] focus:ring-1 focus:ring-[#7e22ce] transition-all bg-white shadow-sm resize-none font-medium text-gray-700"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 mt-4">
        {addonsTotal > 0 && (
          <div className="flex justify-between items-center bg-[#FAF8FC] p-4 rounded-xl border border-purple-100 shadow-sm animate-[fadeIn_0.3s_ease-out]">
             <div className="flex flex-col">
               <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Base Package: ₹{Number(product.price).toLocaleString('en-IN')}</span>
               <span className="text-[10px] font-bold text-[#7e22ce] uppercase tracking-widest">+ Addons: ₹{addonsTotal.toLocaleString('en-IN')}</span>
             </div>
             <div className="text-right">
               <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-0.5">Grand Total</span>
               <span className="text-2xl font-black text-gray-900 leading-none">₹{grandTotal.toLocaleString('en-IN')}</span>
             </div>
          </div>
        )}
        <button onClick={handleBookPackage} className="w-full py-4 bg-[#7e22ce] text-white rounded-xl font-bold tracking-wide flex items-center justify-center gap-2 hover:bg-[#6b1eaf] transition-all shadow-md active:scale-[0.98]">
          {addonsTotal > 0 ? `Book Package • ₹${grandTotal.toLocaleString('en-IN')}` : "Book This Package"}
        </button>
      </div>

      {/* Info Badges */}
      <div className="flex items-center justify-center gap-6 py-4 border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wider mt-2">
        <span className="flex items-center gap-2"><FaCheckSquare className="text-gray-400 mb-[2px]" /> Assured Quality</span>
        <span className="flex items-center gap-2"><FaLock className="text-gray-400 mb-[2px]" /> 100% Secure Checkout</span>
      </div>

      {/* Tabs */}
      <div className="mt-4">
        <div className="flex border-b border-gray-100 gap-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-bold uppercase transition-all tracking-wider ${activeTab === tab
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
              {product.detail ? (
                <div dangerouslySetInnerHTML={{ __html: product.detail }} className="prose prose-sm max-w-none prose-p:mb-2 prose-p:mt-0 text-gray-500" />
              ) : (
                <>
                  <p className="mb-4">
                    This exclusive event package ensures a memorable and high-end experience, perfectly tailored for exceptional occasions.
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Professional Venue Setting</li>
                    <li>Exclusive Catering and Beverages</li>
                    <li>Custom Decoration Theme</li>
                    <li>Dedicated Event Manager On-site</li>
                  </ul>
                </>
              )}
            </div>
          )}
          {activeTab === "Contents" && (
            <div className="animate-[fadeIn_0.3s_ease-out]">
              {product.contents ? (
                <div dangerouslySetInnerHTML={{ __html: product.contents }} className="prose prose-sm max-w-none prose-p:mb-2 prose-p:mt-0 text-gray-500" />
              ) : (
                <p>The package seamlessly covers all core details, allowing you and your guests to enjoy an uninterrupted, perfectly orchestrated celebration without stress.</p>
              )}
            </div>
          )}
          {activeTab === "Delivery" && (
            <div className="animate-[fadeIn_0.3s_ease-out]">
              {product.delivery ? (
                <div dangerouslySetInnerHTML={{ __html: product.delivery }} className="prose prose-sm max-w-none prose-p:mb-2 prose-p:mt-0 text-gray-500" />
              ) : (
                <p>Specific delivery and logistics protocols will be handled meticulously prior to the event execution.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
