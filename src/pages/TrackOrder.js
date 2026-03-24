import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { TbTruckDelivery, TbConfetti } from "react-icons/tb";
import { FiArrowRight } from "react-icons/fi";
import { BsStars } from "react-icons/bs";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import useServices from "../hooks/useServices";
import orderApis from "../services/orderApis";

function TrackOrder() {
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  
  const initialQuery = searchParams.get("id") || "";
  
  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    mode: "onChange",
    defaultValues: { searchQuery: initialQuery }
  });

  const trackOrderApi = useServices(orderApis.trackSyncLead);

  const onSubmit = async (data) => {
    setLoading(true);
    setOrderData(null);
    
    const queryStr = data.searchQuery.trim();
    
    // Update the URL beautifully so users can share or refresh
    setSearchParams({ id: queryStr });
    
    const isNumeric = /^\d+$/.test(queryStr);
    
    const payload = {};
    if (isNumeric) {
      // Pass as customerMobile formatted to DB matching rules
      payload.customerMobile = `+91-${queryStr}`;
    } else {
      // Pass as Order ID
      payload.orderid = queryStr;
    }
    
    try {
      const response = await trackOrderApi.callApi(payload);
      
      // The backend returns an array: either in response.data or response itself
      let trackingResult = null;
      if (response?.data && Array.isArray(response.data) && response.data.length > 0) {
         trackingResult = response.data[0];
      } else if (Array.isArray(response) && response.length > 0) {
         trackingResult = response[0];
      } else if (response?.data && !Array.isArray(response.data)) {
         trackingResult = response.data;
      }
      
      if (trackingResult) {
        setOrderData(trackingResult);
        toast.success("Tracking data retrieved successfully!");
      } else {
        toast.error("No tracking details found. Please verify your ID or Mobile.");
      }
    } catch (error) {
       console.error("Tracking Error:", error);
       toast.error("Failed to track order. Please check your details and try again.");
    } finally {
       setLoading(false);
    }
  };

  return (
    <div className="font-[Outfit] min-h-screen bg-[#faf9f8] overflow-hidden">
      {/* HERO SECTION */}
      <div className="relative pt-20 pb-24 lg:pt-32 lg:pb-32">
        {/* Soft Gradient Background Blobs */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-purple-100/60 to-transparent pointer-events-none rounded-bl-full mix-blend-multiply blur-3xl"></div>
        <div className="absolute top-0 left-0 w-1/3 h-1/2 bg-gradient-to-br from-pink-50/80 to-transparent pointer-events-none rounded-br-full mix-blend-multiply blur-2xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

            {/* Left Text Content */}
            <div className="max-w-2xl px-2 lg:px-0">
              <span className="inline-block py-1.5 px-4 rounded-full bg-purple-100/70 text-primary text-xs font-bold tracking-widest uppercase mb-8 border border-purple-200/50">
                Concierge Tracking
              </span>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 tracking-tight leading-[1.05] mb-6">
                Track Your <br className="hidden sm:block" />
                <span className="font-serif italic text-primary font-normal pr-4">Celebration</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-500 leading-relaxed max-w-lg font-medium">
                Real-time updates for your curated events. From artisan gifts to luxury venue setup, stay connected with every detail of your joy.
              </p>
            </div>

            {/* Right Card Form */}
            <div className="lg:justify-self-end w-full max-w-[440px] px-2 lg:px-0">
              <div className="bg-white rounded-[2rem] p-8 sm:p-10 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] border border-gray-100">
                <h3 className="text-2xl font-extrabold text-gray-900 mb-2">Locate Booking</h3>
                <p className="text-sm font-medium text-gray-400 mb-8">Enter your details to view live status.</p>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-400">
                        <BsStars className="text-xl" />
                      </div>
                      <input
                        type="text"
                        className={`w-full pl-14 pr-5 py-4 bg-gray-50 hover:bg-gray-100 focus:bg-white border-2 rounded-2xl transition-all outline-none text-gray-800 font-semibold placeholder-gray-400 ${errors.searchQuery ? "border-red-500 focus:border-red-500 bg-red-50/20 text-red-900" : "border-transparent focus:border-primary/20"}`}
                        placeholder="Tracking Order ID or Mobile Number"
                        {...register("searchQuery", {
                          required: "Please enter a Phone number or Order ID",
                          validate: (value) => {
                            const trimmed = value.trim();
                            // Check characters: If it contains ONLY digits, it's evaluated as a mobile number.
                            const isNumeric = /^\d+$/.test(trimmed);
                            
                            // Check if they typed a mobile number but used +, hyphens, or spaces which they shouldn't
                            const hasInvalidSymbols = /^[+\-\s]+\d+|\d+[+\-\s]+/.test(trimmed);
                            
                            if (isNumeric) {
                              if (trimmed.length !== 10) return "Mobile number must be exactly 10 digits without symbols.";
                            } else {
                               // It's likely an Order ID, which can contain letters and hyphens
                               if (hasInvalidSymbols && !isNaN(trimmed.replace(/[^\d]/g, ''))) {
                                  return "Mobile number must be exactly 10 digits without + or any extra symbols.";
                               }
                               if (trimmed.length < 5) return "Please enter a valid Order ID.";
                            }
                            return true;
                          }
                        })}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full sm:w-auto sm:min-w-[140px] bg-[#4a0072] hover:bg-[#39005a] text-white font-semibold py-4 rounded-2xl transition-all shadow-lg hover:shadow-xl flex justify-center items-center gap-3 group disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      ) : (
                        <>Track <FiArrowRight className="group-hover:translate-x-1.5 transition-transform text-lg" /></>
                      )}
                    </button>
                  </div>
                  {errors.searchQuery && (
                    <p className="text-red-500 text-xs font-bold tracking-wide mt-1 ml-2 animate-fade-in-up">
                      {errors.searchQuery.message}
                    </p>
                  )}
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* DYNAMIC BOTTOM HALF */}
      {orderData ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 animate-fade-in-up">
          <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden flex flex-col lg:flex-row">

            {/* Left Side: Meta Info */}
            <div className="w-full lg:w-1/3 bg-gray-50/50 p-8 sm:p-12 lg:border-r border-gray-100 flex flex-col justify-center">
              <div className="mb-10">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Order Overview</p>
                <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">Status <span className="text-primary">Live</span></h3>
              </div>

              <div className="space-y-8">
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Order ID</p>
                  <p className="text-lg font-bold text-gray-900 break-all">{orderData.orderId || orderData.orderid}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Customer</p>
                  <p className="text-lg font-bold text-gray-900 capitalize">{orderData.customerName ? orderData.customerName.replace(/_/g, '') : "N/A"}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Contact</p>
                  <p className="text-lg font-bold text-gray-900">{orderData.customerMobile}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Placed On</p>
                  <p className="text-lg font-bold text-gray-900">
                    {new Date(orderData.createdAt).toLocaleDateString("en-US", {
                      weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'
                    })}
                  </p>
                </div>
                {orderData.updatedAt && (
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Last Updated Status</p>
                    <p className="text-lg font-bold text-primary">
                      {new Date(orderData.updatedAt).toLocaleDateString("en-US", {
                        month: 'short', day: 'numeric', year: 'numeric'
                      })}
                      <span className="text-sm font-semibold ml-2 text-gray-500">
                        {new Date(orderData.updatedAt).toLocaleTimeString("en-US", {
                          hour: '2-digit', minute: '2-digit'
                        })}
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Side: Timeline */}
            <div className="w-full lg:w-2/3 p-8 sm:p-12">
              <h3 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-4 mb-8">Live Tracking Event History</h3>

              {orderData.items && orderData.items.length > 0 ? (
                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-[1.10rem] before:-translate-x-px md:before:ml-[1.10rem] before:h-full before:w-[2px] before:bg-gradient-to-b before:from-primary/20 before:via-gray-200 before:to-transparent">
                  {orderData.items.map((item, index) => {
                    const statusVal = item.currentStatus || item.status || "pending";
                    const isCompleted = statusVal.toLowerCase() === 'completed';
                    const isProcessing = statusVal.toLowerCase() === 'processing';

                    return (
                      <div key={index} className="relative flex items-start gap-6 group">
                        <div className={`w-9 h-9 mt-0.5 rounded-full flex items-center justify-center shrink-0 z-10 border-4 border-white shadow-sm transition-transform duration-300 group-hover:scale-110 ${isCompleted ? 'bg-green-500' : isProcessing ? 'bg-amber-400' : 'bg-primary'
                          }`}>
                          <IoCheckmarkCircleOutline className="text-white text-lg" />
                        </div>
                        <div className="bg-gray-50/50 hover:bg-gray-50 border border-gray-100 rounded-2xl p-5 flex-1 transition-colors">
                          <p className="font-bold text-gray-900 text-lg mb-1">{item.name || item.itemName}</p>
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${isCompleted ? 'bg-green-100 text-green-700' :
                              isProcessing ? 'bg-amber-100 text-amber-700' : 'bg-primary/10 text-primary'
                            }`}>
                            Status: {statusVal}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-16 text-gray-400 font-medium">
                  No tracking events have been posted yet.
                </div>
              )}
            </div>

          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

            {/* Left Visual Composition */}
            <div className="relative pt-10 lg:pt-0 px-4 lg:px-0">
              <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl relative z-0 border border-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800"
                  alt="Luxury Venue Setup"
                  className="w-full h-full object-cover custom-filter transform transition hover:scale-105 duration-700"
                />
                {/* Dark overlay for rich contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
              <div className="absolute -bottom-10 -right-6 lg:-right-12 w-48 sm:w-64 aspect-square rounded-[2rem] overflow-hidden shadow-[0_20px_50px_-15px_rgba(0,0,0,0.3)] border-8 border-white z-10">
                <img
                  src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=400"
                  alt="Bespoke Gift"
                  className="w-full h-full object-cover transform transition hover:scale-105 duration-700"
                />
              </div>
            </div>

            {/* Right Value Props */}
            <div className="lg:pl-8 xl:pl-16 mt-16 lg:mt-0">
              {/* Decorative Dash */}
              <div className="w-12 h-1 bg-[#b4985a] rounded-full mb-8"></div>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-12 tracking-tight leading-[1.15]">
                Complete Visibility Over Your Magic Moments
              </h2>

              <div className="space-y-10">
                <div className="flex gap-6 group">
                  <div className="shrink-0 w-14 h-14 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center text-primary transition-transform group-hover:-translate-y-1 duration-300">
                    <IoCheckmarkCircleOutline className="text-2xl" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Gift Preparation</h4>
                    <p className="text-gray-500 font-medium leading-relaxed">Watch as our curators hand-pick and intuitively wrap each bespoke element of your order.</p>
                  </div>
                </div>

                <div className="flex gap-6 group">
                  <div className="shrink-0 w-14 h-14 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center text-primary transition-transform group-hover:-translate-y-1 duration-300">
                    <TbTruckDelivery className="text-2xl" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">White-Glove Delivery</h4>
                    <p className="text-gray-500 font-medium leading-relaxed">Real-time GPS status for our dedicated, highly-trained celebration couriers en route to your venue.</p>
                  </div>
                </div>

                <div className="flex gap-6 group">
                  <div className="shrink-0 w-14 h-14 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center text-primary transition-transform group-hover:-translate-y-1 duration-300">
                    <TbConfetti className="text-2xl" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">On-Site Activation</h4>
                    <p className="text-gray-500 font-medium leading-relaxed">Live status from the venue as our team completes the final aesthetic touches to your milestone.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default TrackOrder;
