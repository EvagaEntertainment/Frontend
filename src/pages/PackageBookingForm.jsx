import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { internalRoutes } from "../utils/internalRoutes";

const PackageBookingForm = () => {
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    eventDate: "",
    location: "",
    address: "",
  });

  useEffect(() => {
    const data = localStorage.getItem("packageBookingData");
    if (data) {
      setBookingData(JSON.parse(data));
    } else {
      // If no data, redirect back to packages
      navigate(internalRoutes.birthdayPackages);
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDisplayToast = (msg) => {
    alert(msg); // Placeholder, ideally use react-toastify or similar if configured
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.phone || !formData.eventDate) {
      handleDisplayToast("Please fill all required fields.");
      return;
    }
    
    // Here you would hook into your API to post the booking:
    console.log("Submitting Booking Payload:", {
      user: formData,
      booking: bookingData
    });

    handleDisplayToast("Booking submitted successfully!");
    // Optional: clear localstorage and navigate to success page
    // localStorage.removeItem("packageBookingData");
    // navigate("/success");
  };

  if (!bookingData) return null; // or a loader

  return (
    <div className="min-h-screen bg-[#f9f9fb] pt-[100px] pb-20 font-sans">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-8">Finalize Your Booking</h1>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left Form Column */}
          <div className="w-full lg:flex-1 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Contact & Event Details</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">First Name <span className="text-red-500">*</span></label>
                  <input required name="firstName" value={formData.firstName} onChange={handleInputChange} type="text" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#7e22ce] transition-shadow" placeholder="John" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                  <input name="lastName" value={formData.lastName} onChange={handleInputChange} type="text" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#7e22ce] transition-shadow" placeholder="Doe" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address <span className="text-red-500">*</span></label>
                  <input required name="email" value={formData.email} onChange={handleInputChange} type="email" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#7e22ce] transition-shadow" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number <span className="text-red-500">*</span></label>
                  <input required name="phone" value={formData.phone} onChange={handleInputChange} type="tel" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#7e22ce] transition-shadow" placeholder="+91 9876543210" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Event Date <span className="text-red-500">*</span></label>
                <input required name="eventDate" value={formData.eventDate} onChange={handleInputChange} type="date" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#7e22ce] transition-shadow" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">City / Location <span className="text-red-500">*</span></label>
                <input required name="location" value={formData.location} onChange={handleInputChange} type="text" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#7e22ce] transition-shadow" placeholder="e.g. Mumbai" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Address</label>
                <textarea rows={2} name="address" value={formData.address} onChange={handleInputChange} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#7e22ce] transition-shadow resize-none" placeholder="Provide full address or venue details if known..." />
              </div>

              <button type="submit" className="w-full py-4 mt-4 bg-[#7e22ce] text-white rounded-xl font-bold tracking-wide hover:bg-[#6b1eaf] transition-all shadow-md active:scale-[0.98]">
                Submit Booking Request
              </button>
            </form>
          </div>

          {/* Right Summary Column */}
          <div className="w-full lg:w-[400px] flex-shrink-0">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-3">Booking Summary</h3>
              
              <div className="flex gap-4 mb-6">
                <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden shrink-0">
                  <img src={bookingData.product.image || "https://placehold.co/400x400"} alt={bookingData.product.title} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 leading-tight mb-1">{bookingData.product.title}</p>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Event Package</p>
                </div>
              </div>

              <div className="space-y-3 text-sm text-gray-600 border-b border-gray-100 pb-4 mb-4">
                <div className="flex justify-between font-medium">
                  <span>Base Package</span>
                  <span className="text-gray-900">₹{bookingData.baseTotal.toLocaleString('en-IN')}</span>
                </div>
                
                {bookingData.addons.length > 0 && (
                  <div className="pt-2">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Selected Add-ons</p>
                    {bookingData.addons.map((addon, idx) => (
                      <div key={idx} className="flex justify-between text-xs mb-2">
                        <span className="text-gray-600">{addon.quantity}x {addon.itemName}</span>
                        <span className="text-gray-900 font-medium">₹{(addon.quantity * addon.price).toLocaleString('en-IN')}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {bookingData.specialRequests && (
                <div className="mb-6 bg-purple-50 p-3 rounded-lg border border-purple-100">
                  <p className="text-[10px] font-bold text-[#7e22ce] uppercase tracking-wider mb-1">Special Requests</p>
                  <p className="text-xs text-gray-700 italic">"{bookingData.specialRequests}"</p>
                </div>
              )}

              <div className="flex justify-between items-center pt-2">
                <span className="text-gray-500 font-bold uppercase tracking-wider text-sm">Grand Total</span>
                <span className="text-3xl font-black text-[#7e22ce]">₹{bookingData.grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageBookingForm;
