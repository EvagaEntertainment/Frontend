'use client';

import React, { useState, useMemo, useRef } from "react";
import TableComponetWithApi from "../../utils/TableComponetWithApi";
import ReusableModal from "../Modal/Modal";
import { toast } from "react-toastify";
import { FaEdit, FaEye, FaArrowLeft, FaPlus, FaTrash, FaDesktop, FaCheck, FaTimes, FaGlobe, FaUpload } from "react-icons/fa";

// 36 Event Services Pages List
const servicePages = [
  { id: 1, slug: "1st-birthday-planner-bangalore", title: "1st Birthday Planner Bangalore", path: "/1st-birthday-planner-bangalore", category: "Birthday" },
  { id: 2, slug: "adult-birthday-planner-bangalore", title: "Adult Birthday Planner Bangalore", path: "/adult-birthday-planner-bangalore", category: "Birthday" },
  { id: 3, slug: "barbie-theme-birthday-bangalore", title: "Barbie Theme Birthday Bangalore", path: "/barbie-theme-birthday-bangalore", category: "Birthday Theme" },
  { id: 4, slug: "birthday-celebration-at-home-bangalore", title: "Birthday Celebration at Home Bangalore", path: "/birthday-celebration-at-home-bangalore", category: "Birthday" },
  { id: 5, slug: "birthday-decoration-bangalore", title: "Birthday Decoration Bangalore", path: "/birthday-decoration-bangalore", category: "Decoration" },
  { id: 6, slug: "birthday-party-resorts-bangalore", title: "Birthday Party Resorts Bangalore", path: "/birthday-party-resorts-bangalore", category: "Venues" },
  { id: 7, slug: "birthday-planner-bangalore", title: "Birthday Planner Bangalore", path: "/birthday-planner-bangalore", category: "Birthday" },
  { id: 8, slug: "birthday-planner-bellandur", title: "Birthday Planner Bellandur", path: "/birthday-planner-bellandur", category: "Local Planners" },
  { id: 9, slug: "birthday-planner-electronic-city", title: "Birthday Planner Electronic City", path: "/birthday-planner-electronic-city", category: "Local Planners" },
  { id: 10, slug: "birthday-planner-hebbal", title: "Birthday Planner Hebbal", path: "/birthday-planner-hebbal", category: "Local Planners" },
  { id: 11, slug: "birthday-planner-hennur", title: "Birthday Planner Hennur", path: "/birthday-planner-hennur", category: "Local Planners" },
  { id: 12, slug: "birthday-planner-hsr-layout", title: "Birthday Planner HSR Layout", path: "/birthday-planner-hsr-layout", category: "Local Planners" },
  { id: 13, slug: "birthday-planner-indiranagar", title: "Birthday Planner Indiranagar", path: "/birthday-planner-indiranagar", category: "Local Planners" },
  { id: 14, slug: "birthday-planner-jp-nagar", title: "Birthday Planner JP Nagar", path: "/birthday-planner-jp-nagar", category: "Local Planners" },
  { id: 15, slug: "birthday-planner-koramangala", title: "Birthday Planner Koramangala", path: "/birthday-planner-koramangala", category: "Local Planners" },
  { id: 16, slug: "birthday-planner-sarjapur", title: "Birthday Planner Sarjapur", path: "/birthday-planner-sarjapur", category: "Local Planners" },
  { id: 17, slug: "birthday-planner-whitefield", title: "Birthday Planner Whitefield", path: "/birthday-planner-whitefield", category: "Local Planners" },
  { id: 18, slug: "birthday-planner-yellhanka", title: "Birthday Planner Yellhanka", path: "/birthday-planner-yellhanka", category: "Local Planners" },
  { id: 19, slug: "birthday-venues-bangalore", title: "Birthday Venues Bangalore", path: "/birthday-venues-bangalore", category: "Venues" },
  { id: 20, slug: "birthday-venues-under-50k-bangalore", title: "Birthday Venues Under 50k Bangalore", path: "/birthday-venues-under-50k-bangalore", category: "Venues" },
  { id: 21, slug: "birthday-venues-whitefield", title: "Birthday Venues Whitefield", path: "/birthday-venues-whitefield", category: "Venues" },
  { id: 22, slug: "boss-baby-birthday-decoration-bangalore", title: "Boss Baby Birthday Decoration Bangalore", path: "/boss-baby-birthday-decoration-bangalore", category: "Birthday Theme" },
  { id: 23, slug: "cocomelon-birthday-theme-bangalore", title: "Cocomelon Birthday Theme Bangalore", path: "/cocomelon-birthday-theme-bangalore", category: "Birthday Theme" },
  { id: 24, slug: "indoor-birthday-venues-bangalore", title: "Indoor Birthday Venues Bangalore", path: "/indoor-birthday-venues-bangalore", category: "Venues" },
  { id: 25, slug: "jungle-theme-birthday-bangalore", title: "Jungle Theme Birthday Bangalore", path: "/jungle-theme-birthday-bangalore", category: "Birthday Theme" },
  { id: 26, slug: "kids-birthday-party-bangalore", title: "Kids Birthday Party Bangalore", path: "/kids-birthday-party-bangalore", category: "Birthday" },
  { id: 27, slug: "kids-birthday-planner-bangalore", title: "Kids Birthday Planner Bangalore", path: "/kids-birthday-planner-bangalore", category: "Birthday" },
  { id: 28, slug: "luxury-birthday-planner-bangalore", title: "Luxury Birthday Planner Bangalore", path: "/luxury-birthday-planner-bangalore", category: "Birthday" },
  { id: 29, slug: "premium-baby-shower-planner", title: "Premium Baby Shower Planner", path: "/premium-baby-shower-planner", category: "Baby Shower" },
  { id: 30, slug: "premium-birthday-end-to-end-planner", title: "Premium Birthday End-to-End Planner", path: "/premium-birthday-end-to-end-planner", category: "Birthday" },
  { id: 31, slug: "premium-birthday-planner", title: "Premium Birthday Planner", path: "/premium-birthday-planner", category: "Birthday" },
  { id: 32, slug: "premium-house-warming-planner", title: "Premium House Warming Planner", path: "/premium-house-warming-planner", category: "House Warming" },
  { id: 33, slug: "space-theme-birthday-bangalore", title: "Space Theme Birthday Bangalore", path: "/space-theme-birthday-bangalore", category: "Birthday Theme" },
  { id: 34, slug: "teen-birthday-celebration-bangalore", title: "Teen Birthday Celebration Bangalore", path: "/teen-birthday-celebration-bangalore", category: "Birthday" },
  { id: 35, slug: "unicorn-theme-birthday-bangalore", title: "Unicorn Theme Birthday Bangalore", path: "/unicorn-theme-birthday-bangalore", category: "Birthday Theme" },
  { id: 36, slug: "anniversary-celebration-planner-bangalore", title: "Anniversary Celebration Planner Bangalore (New)", path: "/anniversary-celebration-planner-bangalore", category: "Anniversary" }
];

// Helper to generate realistic mock page configuration data based on page properties
const getMockPageConfig = (page) => {
  const isBirthday = page.category.includes("Birthday") || page.category.includes("Theme");
  const isVenues = page.category.includes("Venues");
  
  return {
    title: page.title,
    badge: isBirthday ? "Birthday Specialists" : isVenues ? "Venue Partners" : "Event Experts",
    h1: `${page.title} — Premium Celebrations by Eevagga`,
    heroSubtitle: `Make your ${page.category.toLowerCase()} event in Bangalore spectacular. Complete decoration setups, top-rated planning services, and on-ground management by Eevagga.`,
    heroImage: "https://placehold.co/800x400/ece6f5/6a1b9a?text=Birthday+Hero+Setup",
    heroImageAlt: `${page.title} setup in Bangalore by Eevagga`,
    stats: [
      { value: "350+", label: "Successful Events" },
      { value: "4.9★", label: "Average Rating" },
      { value: "100%", label: "Stress Free Planning" },
      { value: "24hr", label: "Quick Turnaround" }
    ],
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: page.category, href: `/category/${page.category.toLowerCase().replace(/\s+/g, '-')}` },
      { label: page.title }
    ],
    gallery: [
      { src: "https://placehold.co/600x400/ece6f5/6a1b9a?text=Stage+Backdrop+Setup", alt: `${page.title} primary backdrop`, caption: "Stage backdrop setup" },
      { src: "https://placehold.co/600x400/ece6f5/6a1b9a?text=Entrance+Balloon+Arch", alt: `${page.title} entrance gate`, caption: "Welcome entrance balloon arch" },
      { src: "https://placehold.co/600x400/ece6f5/6a1b9a?text=Cake+Table+Prop+Layout", alt: `${page.title} cake table decoration`, caption: "Customized cake table prop layout" },
      { src: "https://placehold.co/600x400/ece6f5/6a1b9a?text=Candid+Photo+Zone", alt: `${page.title} secondary photo zone`, caption: "Candid photo zone zone" }
    ],
    features: [
      { icon: "✨", title: "Tailored Decor Design", description: "Vibrant designs customized to match your budget, colors, and specific theme expectations." },
      { icon: "🎈", title: "Premium Balloon Work", description: "Top-quality child-safe organic balloon arches, pillars, ceiling coverage and custom backdrops." },
      { icon: "🎂", title: "Dessert Table Layout", description: "Beautiful cake tables, themed cake stands, character cutouts and matching prop decoration." },
      { icon: "📸", title: "Professional Support", description: "Experienced event managers on-site ensuring everything matches your schedule." }
    ],
    relatedLinks: [
      { label: "Kids Birthday Party", href: "/kids-birthday-party-bangalore" },
      { label: "Adult Birthday Planner", href: "/adult-birthday-planner-bangalore" },
      { label: "Premium Baby Shower", href: "/premium-baby-shower-planner" }
    ],
    // Schema & FAQs
    schemaLowPrice: 15000,
    schemaHighPrice: 75000,
    faqs: [
      { question: "What is included in standard event packages?", answer: "Our packages standardly include stage decoration, custom theme backdrops, entrance arch, themed cake table accessories, balloon clusters, and complete team coordination." },
      { question: "Can you manage catering and venue arrangements?", answer: "Yes, we work with several top-rated catering providers and venues in Bangalore, allowing us to package these services under a single point of coordination for you." },
      { question: "How many days in advance should we make a booking?", answer: "We recommend confirming your booking at least 2 weeks ahead of time to allow proper custom props planning and secure event manager availability." }
    ]
  };
};

function AdminEventServices() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingPage, setEditingPage] = useState(null);
  const [viewingPage, setViewingPage] = useState(null);
  const [formData, setFormData] = useState(null);
  const [activeTab, setActiveTab] = useState("hero"); // hero, features, gallery, faqs_links
  const [isSaved, setIsSaved] = useState(false);
  
  const heroFileRef = useRef(null);
  const galleryFileRef = useRef(null);
  const itemsPerPage = 8;

  // Filter service pages based on search term
  const filteredPages = useMemo(() => {
    return servicePages.filter((page) => 
      page.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      page.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
      page.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredPages.length / itemsPerPage);

  // Get current page's slice of data
  const currentTableData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredPages.slice(start, start + itemsPerPage);
  }, [filteredPages, currentPage]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleEditClick = (page) => {
    const config = getMockPageConfig(page);
    setEditingPage(page);
    setFormData(config);
    setActiveTab("hero");
    setIsSaved(false);
  };

  const handleViewClick = (page) => {
    const config = getMockPageConfig(page);
    setViewingPage({ ...page, config });
  };

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  // File Upload Handlers (Generating ObjectURLs as local previews)
  const handleHeroImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        heroImage: previewUrl,
        heroImageFile: file // holds reference to actual upload file
      }));
    }
  };

  const handleGalleryImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newItems = files.map((file) => ({
      src: URL.createObjectURL(file),
      file: file, // holds reference to actual upload file
      alt: "Event decor photo",
      caption: "Portfolio Image"
    }));
    setFormData((prev) => ({
      ...prev,
      gallery: [...prev.gallery, ...newItems]
    }));
  };

  const removeHeroImage = () => {
    setFormData((prev) => ({
      ...prev,
      heroImage: "",
      heroImageFile: null
    }));
  };

  // Add/Remove dynamic entries helpers
  const updateListItem = (field, index, key, value) => {
    setFormData((prev) => {
      const listCopy = [...prev[field]];
      listCopy[index] = { ...listCopy[index], [key]: value };
      return { ...prev, [field]: listCopy };
    });
  };

  const addListItem = (field, newObj) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], newObj]
    }));
  };

  const removeListItem = (field, index) => {
    setFormData((prev) => {
      const listCopy = [...prev[field]];
      listCopy.splice(index, 1);
      return { ...prev, [field]: listCopy };
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log("Saving Event Service Content Payload for Page " + editingPage.slug + ":", formData);
    setIsSaved(true);
    toast.success(`${editingPage.title} content updated successfully! (Data payload logged to developer console)`);
    setTimeout(() => setIsSaved(false), 3000);
  };

  // Table Columns
  const columns = [
    { label: "No", key: "index", render: (_, i) => (currentPage - 1) * itemsPerPage + i + 1 },
    { label: "Page Name / Title", key: "title" },
    { 
      label: "Path / Route", 
      key: "path", 
      render: (row) => (
        <span className="font-mono text-purple-600 bg-purple-50 px-2 py-0.5 rounded text-xs">
          {row.path}
        </span>
      )
    },
    { 
      label: "Category", 
      key: "category",
      render: (row) => (
        <span className="text-gray-600 bg-gray-100 px-2.5 py-0.5 rounded-full text-xs font-medium">
          {row.category}
        </span>
      )
    },
    {
      label: "Actions",
      render: (row) => (
        <div className="flex items-center justify-center gap-4 text-lg">
          <button 
            type="button"
            onClick={() => handleViewClick(row)}
            className="text-purple-600 hover:text-purple-800 transition duration-200"
            title="View Details"
          >
            <FaEye />
          </button>
          <button 
            type="button"
            onClick={() => handleEditClick(row)}
            className="text-indigo-600 hover:text-indigo-800 transition duration-200"
            title="Edit Content"
          >
            <FaEdit />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6 min-h-[80vh]">
      {/* ─── TITLE HEADER ─── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-200 pb-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FaGlobe className="text-purple-600" />
            Website Event Services
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage page-specific content, headers, images, stats and FAQs for all 36 landing pages.
          </p>
        </div>
        {editingPage && (
          <button 
            type="button"
            onClick={() => setEditingPage(null)}
            className="mt-4 md:mt-0 flex items-center gap-2 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg font-medium transition duration-200"
          >
            <FaArrowLeft /> Back to List
          </button>
        )}
      </div>

      {/* ─── PAGE LIST TABLE VIEW ─── */}
      {!editingPage && (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="Search by page name, category, or path..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm"
              />
            </div>
            <div className="text-sm text-gray-500 font-medium bg-purple-50 text-purple-700 px-3 py-1 rounded-md">
              Total Event Service Pages: <span className="font-bold">{servicePages.length}</span>
            </div>
          </div>

          <div className="overflow-x-auto border border-gray-200 rounded-xl shadow-sm">
            <TableComponetWithApi
              columns={columns}
              data={currentTableData}
              page={currentPage}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
              totalPages={totalPages}
            />
          </div>
        </div>
      )}

      {/* ─── EDIT WORKSPACE ─── */}
      {editingPage && formData && (
        <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Form Tabs Navigation & Inputs (Left/Main Pane) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Tab Bar */}
            <div className="flex border-b border-gray-200 scrollbar-none overflow-x-auto whitespace-nowrap gap-1">
              {[
                { id: "hero", label: "Hero & Stats" },
                { id: "features", label: "Features & Perks" },
                { id: "gallery", label: "Gallery Portfolio" },
                { id: "faqs_links", label: "FAQs & Related Links" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2.5 font-semibold text-sm border-b-2 transition duration-200 ${
                    activeTab === tab.id
                      ? "border-purple-600 text-purple-600 bg-purple-50/50"
                      : "border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content 1: Hero & Stats */}
            {activeTab === "hero" && (
              <div className="space-y-6 animate-fadeIn">
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-4">Hero Information</h3>
                  
                  {/* Image Upload Area instead of text URL input */}
                  <div className="mb-4">
                    <label className="block text-xs font-semibold text-gray-500 mb-2">Hero Image Banner</label>
                    <input 
                      type="file" 
                      accept="image/*"
                      ref={heroFileRef}
                      onChange={handleHeroImageChange}
                      className="hidden"
                    />
                    
                    {formData.heroImage ? (
                      <div className="relative w-full max-w-md h-48 bg-gray-100 rounded-xl overflow-hidden border border-gray-300 group">
                        <img 
                          src={formData.heroImage} 
                          alt="Hero banner preview" 
                          className="object-cover w-full h-full"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-200 flex items-center justify-center gap-3">
                          <button
                            type="button"
                            onClick={() => heroFileRef.current.click()}
                            className="bg-white/90 text-gray-800 font-semibold text-xs px-3 py-1.5 rounded-lg hover:bg-white transition"
                          >
                            Change Image
                          </button>
                          <button
                            type="button"
                            onClick={removeHeroImage}
                            className="bg-red-600/90 text-white font-semibold text-xs p-1.5 rounded-lg hover:bg-red-650 transition"
                            title="Remove Image"
                          >
                            <FaTimes size={14} />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div 
                        onClick={() => heroFileRef.current.click()}
                        className="w-full max-w-md h-40 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:text-purple-650 hover:border-purple-400 cursor-pointer transition duration-250 bg-white"
                      >
                        <FaUpload className="text-2xl mb-2" />
                        <span className="text-xs font-medium">Click to upload banner image</span>
                        <span className="text-[10px] text-gray-400 mt-1">Supports PNG, JPG, JPEG</span>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">Badge Tagline</label>
                      <input 
                        type="text" 
                        value={formData.badge} 
                        onChange={(e) => handleFieldChange("badge", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-purple-600"
                        placeholder="e.g. Birthday Specialists"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">Main H1 Title</label>
                      <input 
                        type="text" 
                        value={formData.h1} 
                        onChange={(e) => handleFieldChange("h1", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-purple-600"
                        placeholder="Page main H1"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-gray-500 mb-1">Hero Subtitle</label>
                      <textarea 
                        rows={3}
                        value={formData.heroSubtitle} 
                        onChange={(e) => handleFieldChange("heroSubtitle", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-purple-600"
                        placeholder="Brief summary below heading"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-gray-500 mb-1">Hero Image Alt Tag</label>
                      <input 
                        type="text" 
                        value={formData.heroImageAlt} 
                        onChange={(e) => handleFieldChange("heroImageAlt", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-purple-600"
                        placeholder="Alt text describing layout"
                      />
                    </div>
                  </div>
                </div>

                {/* Metric/Stats Blocks */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Metrics / Stats Blocks</h3>
                    <button 
                      type="button"
                      onClick={() => addListItem("stats", { value: "100%", label: "New Stat Metric" })}
                      className="flex items-center gap-1 text-xs text-purple-600 hover:text-purple-800 font-semibold bg-white border border-purple-200 px-2 py-1 rounded"
                    >
                      <FaPlus size={10} /> Add Stat
                    </button>
                  </div>
                  <div className="space-y-3">
                    {formData.stats.map((stat, idx) => (
                      <div key={idx} className="flex items-center gap-3 bg-white p-2.5 rounded-lg border border-gray-200">
                        <input 
                          type="text" 
                          value={stat.value} 
                          onChange={(e) => updateListItem("stats", idx, "value", e.target.value)}
                          className="w-24 px-2 py-1.5 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-purple-600 font-bold text-purple-700 text-center"
                          placeholder="e.g. 500+"
                        />
                        <input 
                          type="text" 
                          value={stat.label} 
                          onChange={(e) => updateListItem("stats", idx, "label", e.target.value)}
                          className="flex-grow px-2 py-1.5 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-purple-600"
                          placeholder="Label (e.g. Happy Couples)"
                        />
                        <button 
                          type="button"
                          onClick={() => removeListItem("stats", idx)}
                          className="text-red-500 hover:text-red-700 p-1.5"
                          title="Delete Stat"
                        >
                          <FaTrash size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab Content 2: Features & Perks */}
            {activeTab === "features" && (
              <div className="space-y-6 animate-fadeIn">
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Page Feature Highlight Cards</h3>
                    <button 
                      type="button"
                      onClick={() => addListItem("features", { icon: "⭐", title: "New Feature Title", description: "Short description outlining this event perk details." })}
                      className="flex items-center gap-1 text-xs text-purple-600 hover:text-purple-800 font-semibold bg-white border border-purple-200 px-2.5 py-1 rounded"
                    >
                      <FaPlus size={10} /> Add Feature
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {formData.features.map((feat, idx) => (
                      <div key={idx} className="bg-white p-3 rounded-lg border border-gray-200 flex flex-col gap-2 relative group shadow-sm">
                        <button 
                          type="button"
                          onClick={() => removeListItem("features", idx)}
                          className="absolute top-2 right-2 text-red-450 hover:text-red-650 hidden group-hover:block transition duration-150"
                          title="Delete Feature Card"
                        >
                          <FaTrash size={12} />
                        </button>
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            value={feat.icon} 
                            onChange={(e) => updateListItem("features", idx, "icon", e.target.value)}
                            className="w-12 px-1 py-1 border border-gray-300 rounded text-center text-sm font-bold"
                            placeholder="Emoji"
                          />
                          <input 
                            type="text" 
                            value={feat.title} 
                            onChange={(e) => updateListItem("features", idx, "title", e.target.value)}
                            className="flex-grow px-2 py-1 border border-gray-300 rounded text-sm font-bold focus:ring-1 focus:ring-purple-600"
                            placeholder="Feature Title"
                          />
                        </div>
                        <textarea 
                          rows={2}
                          value={feat.description} 
                          onChange={(e) => updateListItem("features", idx, "description", e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-purple-600 text-gray-500"
                          placeholder="Feature description detail."
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab Content 3: Gallery Portfolio (With image upload and cross removal) */}
            {activeTab === "gallery" && (
              <div className="space-y-6 animate-fadeIn">
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Page Gallery / Portfolio Pictures</h3>
                    
                    {/* Upload new image button triggers hidden file selector */}
                    <input 
                      type="file" 
                      multiple 
                      accept="image/*"
                      ref={galleryFileRef}
                      onChange={handleGalleryImageChange}
                      className="hidden"
                    />
                    <button 
                      type="button"
                      onClick={() => galleryFileRef.current.click()}
                      className="flex items-center gap-1.5 text-xs text-purple-600 hover:text-purple-800 font-semibold bg-white border border-purple-200 px-3 py-1.5 rounded-lg transition"
                    >
                      <FaUpload size={11} /> Upload New Photo
                    </button>
                  </div>
                  
                  {/* Grid showing existing images with absolute cross button to remove */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {formData.gallery.map((img, idx) => (
                      <div key={idx} className="bg-white p-3 rounded-lg border border-gray-200 flex flex-col gap-2 relative shadow-sm group">
                        
                        {/* Red cross overlays absolute top-right of image container to remove it */}
                        <div className="relative h-28 w-full bg-gray-100 rounded-md overflow-hidden border border-gray-200">
                          <img 
                            src={img.src} 
                            alt={img.alt} 
                            onError={(e) => {
                              e.target.onerror = null; 
                              e.target.src = "https://placehold.co/600x400/ece6f5/6a1b9a?text=Image+Missing";
                            }}
                            className="object-cover h-full w-full"
                          />
                          <button
                            type="button"
                            onClick={() => removeListItem("gallery", idx)}
                            className="absolute top-1.5 right-1.5 bg-red-650/90 text-white rounded-full p-1 shadow-md hover:bg-red-700 hover:scale-105 transition"
                            title="Remove Photo"
                          >
                            <FaTimes size={10} />
                          </button>
                        </div>
                        
                        {/* Caption and Alt fields (Image path textbox removed completely) */}
                        <div className="space-y-1.5 pt-1">
                          <div>
                            <label className="block text-[9px] font-semibold text-gray-400 uppercase">Caption</label>
                            <input 
                              type="text" 
                              value={img.caption} 
                              onChange={(e) => updateListItem("gallery", idx, "caption", e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-purple-650"
                              placeholder="Image Caption text"
                            />
                          </div>
                          <div>
                            <label className="block text-[9px] font-semibold text-gray-400 uppercase">Alt Description (SEO)</label>
                            <input 
                              type="text" 
                              value={img.alt} 
                              onChange={(e) => updateListItem("gallery", idx, "alt", e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-purple-650"
                              placeholder="Describe for visually impaired/SEO"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {/* Add empty/new image trigger area inside grid */}
                    <div 
                      onClick={() => galleryFileRef.current.click()}
                      className="border-2 border-dashed border-gray-300 rounded-lg h-[210px] bg-white flex flex-col items-center justify-center text-gray-400 hover:text-purple-650 hover:border-purple-400 cursor-pointer transition duration-200"
                    >
                      <FaPlus className="text-xl mb-1.5" />
                      <span className="text-xs font-semibold">Upload Photo Entry</span>
                      <span className="text-[9px] text-gray-400 mt-0.5">JPEG, PNG formats</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab Content 4: FAQs & Related Links */}
            {activeTab === "faqs_links" && (
              <div className="space-y-6 animate-fadeIn">
                
                {/* FAQ Section */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Frequently Asked Questions (FAQ)</h3>
                    <button 
                      type="button"
                      onClick={() => addListItem("faqs", { question: "Insert Question here?", answer: "Insert Answer content here." })}
                      className="flex items-center gap-1 text-xs text-purple-600 hover:text-purple-800 font-semibold bg-white border border-purple-200 px-2.5 py-1 rounded"
                    >
                      <FaPlus size={10} /> Add Q&A
                    </button>
                  </div>
                  <div className="space-y-4">
                    {formData.faqs.map((faq, idx) => (
                      <div key={idx} className="bg-white p-3 rounded-lg border border-gray-200 flex flex-col gap-2 relative group shadow-sm">
                        <button 
                          type="button"
                          onClick={() => removeListItem("faqs", idx)}
                          className="absolute top-2 right-2 text-red-500 hover:text-red-700 hidden group-hover:block transition duration-150"
                          title="Delete FAQ"
                        >
                          <FaTrash size={12} />
                        </button>
                        <div>
                          <label className="block text-[10px] font-semibold text-gray-400">QUESTION #{idx + 1}</label>
                          <input 
                            type="text" 
                            value={faq.question} 
                            onChange={(e) => updateListItem("faqs", idx, "question", e.target.value)}
                            className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm font-semibold focus:ring-1 focus:ring-purple-600"
                            placeholder="Question"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-semibold text-gray-400">ANSWER</label>
                          <textarea 
                            rows={2}
                            value={faq.answer} 
                            onChange={(e) => updateListItem("faqs", idx, "answer", e.target.value)}
                            className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-purple-600 text-gray-500"
                            placeholder="Answer"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Schema Aggregate Pricing */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider md:col-span-2">Schema Aggregate Pricing</h3>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">Lowest Offer Price (INR)</label>
                    <input 
                      type="number" 
                      value={formData.schemaLowPrice} 
                      onChange={(e) => handleFieldChange("schemaLowPrice", parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-purple-600 font-mono"
                      placeholder="Low price"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">Highest Offer Price (INR)</label>
                    <input 
                      type="number" 
                      value={formData.schemaHighPrice} 
                      onChange={(e) => handleFieldChange("schemaHighPrice", parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-purple-600 font-mono"
                      placeholder="High price"
                    />
                  </div>
                </div>

                {/* Related Links */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Related Services Links</h3>
                    <button 
                      type="button"
                      onClick={() => addListItem("relatedLinks", { label: "New Service Link", href: "/services" })}
                      className="flex items-center gap-1 text-xs text-purple-600 hover:text-purple-800 font-semibold bg-white border border-purple-200 px-2.5 py-1 rounded"
                    >
                      <FaPlus size={10} /> Add Link
                    </button>
                  </div>
                  <div className="space-y-3">
                    {formData.relatedLinks.map((link, idx) => (
                      <div key={idx} className="flex items-center gap-3 bg-white p-2 rounded-lg border border-gray-200 relative group">
                        <input 
                          type="text" 
                          value={link.label} 
                          onChange={(e) => updateListItem("relatedLinks", idx, "label", e.target.value)}
                          className="w-48 px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-purple-600 font-medium"
                          placeholder="Link Text"
                        />
                        <input 
                          type="text" 
                          value={link.href} 
                          onChange={(e) => updateListItem("relatedLinks", idx, "href", e.target.value)}
                          className="flex-grow px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-purple-600 font-mono text-xs text-purple-600"
                          placeholder="e.g. /link-path"
                        />
                        <button 
                          type="button"
                          onClick={() => removeListItem("relatedLinks", idx)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <FaTrash size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}
            
            {/* Form Footer Action Buttons */}
            <div className="flex items-center gap-4 border-t border-gray-200 pt-4 mt-6">
              <button 
                type="submit"
                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-medium text-sm px-6 py-2.5 rounded-lg shadow-sm transition duration-150"
              >
                <FaCheck /> Save Changes
              </button>
              <button 
                type="button"
                onClick={() => {
                  const initial = getMockPageConfig(editingPage);
                  setFormData(initial);
                  toast.info("Form fields reset to default values.");
                }}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium text-sm px-5 py-2.5 rounded-lg transition duration-150"
              >
                Reset Form
              </button>
            </div>

          </div>

          {/* ─── LIVE OUTLINE OUTLINE PREVIEW (Right Panel) ─── */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 sticky top-6">
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-3 flex items-center gap-2 border-b border-gray-200 pb-2">
                <FaDesktop className="text-indigo-500" />
                Live Page Layout Outline
              </h3>
              
              <div className="border border-gray-300 bg-white rounded-lg shadow-sm overflow-hidden text-left flex flex-col font-sans max-h-[70vh] overflow-y-auto scrollbar-thin">
                
                {/* Simulated Header/Badge */}
                <div className="p-4 bg-purple-950 text-white text-center space-y-2">
                  {formData.badge && (
                    <span className="inline-block bg-purple-750 text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded">
                      {formData.badge}
                    </span>
                  )}
                  <h2 className="text-sm font-bold leading-tight">{formData.h1 || editingPage.title}</h2>
                  <p className="text-[10px] text-purple-200 line-clamp-3 leading-tight">{formData.heroSubtitle}</p>
                </div>

                {/* Simulated Stats Bar */}
                <div className="grid grid-cols-4 gap-1 p-2 bg-purple-50 text-center border-b border-gray-200">
                  {formData.stats && formData.stats.map((s, i) => (
                    <div key={i} className="flex flex-col py-1">
                      <span className="text-[10px] font-bold text-purple-800 leading-none">{s.value || "—"}</span>
                      <span className="text-[8px] text-gray-500 truncate leading-none mt-0.5">{s.label}</span>
                    </div>
                  ))}
                </div>

                {/* Features Section */}
                <div className="p-3 space-y-2 border-b border-gray-100">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-purple-800">Our Services & Features</h4>
                  <div className="grid grid-cols-2 gap-1.5">
                    {formData.features && formData.features.map((f, i) => (
                      <div key={i} className="p-1.5 border border-gray-200 rounded text-[9px] bg-gray-50 flex gap-1 items-start">
                        <span>{f.icon || "✨"}</span>
                        <div className="flex flex-col leading-tight">
                          <strong className="text-gray-700 font-bold leading-none">{f.title || "Feature"}</strong>
                          <p className="text-gray-400 text-[8px] leading-tight mt-0.5 truncate">{f.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Image Gallery Outline */}
                <div className="p-3 space-y-2 border-b border-gray-100">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-purple-800">Event Portfolio</h4>
                  <div className="grid grid-cols-4 gap-1">
                    {formData.gallery && formData.gallery.map((g, i) => (
                      <div key={i} className="aspect-square bg-gray-100 rounded overflow-hidden relative group">
                        <img 
                          src={g.src} 
                          alt="preview"
                          onError={(e) => {
                            e.target.onerror = null; 
                            e.target.src = "https://placehold.co/100/ece6f5/6a1b9a?text=Image";
                          }}
                          className="object-cover h-full w-full"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center transition duration-150">
                          <span className="text-[6px] text-white p-0.5 text-center truncate">{g.caption}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* FAQ Accordion Preview */}
                <div className="p-3 space-y-2 border-b border-gray-100">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-purple-800">FAQs</h4>
                  <div className="space-y-1">
                    {formData.faqs && formData.faqs.map((q, i) => (
                      <div key={i} className="p-1.5 border border-gray-100 rounded bg-white text-[8px]">
                        <div className="font-bold text-gray-700 flex justify-between">
                          <span>Q: {q.question}</span>
                          <span>➕</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Related Links preview */}
                <div className="p-3 bg-gray-50 flex flex-wrap gap-1 items-center">
                  <span className="text-[8px] font-semibold text-gray-400 uppercase mr-1">Check Also:</span>
                  {formData.relatedLinks && formData.relatedLinks.map((lnk, i) => (
                    <span key={i} className="bg-purple-100 text-purple-800 px-1.5 py-0.5 rounded text-[8px] font-semibold">
                      {lnk.label}
                    </span>
                  ))}
                </div>

              </div>
              <p className="text-[10px] text-gray-400 mt-2 italic text-center">
                Updating fields will update this layout outline mock preview in real-time.
              </p>
            </div>
          </div>

        </form>
      )}

      {/* ─── DETAIL VIEW MODAL ─── */}
      <ReusableModal 
        open={!!viewingPage} 
        onClose={() => setViewingPage(null)} 
        width={"60%"}
      >
        {viewingPage && (
          <div className="p-6 text-left max-h-[85vh] overflow-y-auto scrollbar-thin">
            
            {/* Modal Header */}
            <div className="flex justify-between items-start border-b border-gray-200 pb-4 mb-4">
              <div>
                <span className="text-[10px] bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  {viewingPage.category} Page
                </span>
                <h2 className="text-xl font-bold text-gray-800 mt-1">{viewingPage.title}</h2>
                <p className="text-xs font-mono text-purple-600 bg-purple-50 px-2 py-0.5 rounded mt-1.5 w-fit">
                  Path: {viewingPage.path}
                </p>
              </div>
              <button 
                type="button"
                onClick={() => setViewingPage(null)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <FaTimes size={18} />
              </button>
            </div>

            {/* Modal Content Summary */}
            <div className="space-y-6">
              
              {/* Hero details card */}
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-3">
                <h3 className="text-xs font-bold text-purple-900 uppercase tracking-widest border-b border-purple-100 pb-1">
                  Hero Banner Content
                </h3>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="col-span-3">
                    <span className="font-semibold text-gray-400 block uppercase text-[10px]">H1 Title</span>
                    <p className="text-gray-800 font-bold">{viewingPage.config.h1}</p>
                  </div>
                  <div className="col-span-3">
                    <span className="font-semibold text-gray-400 block uppercase text-[10px]">Hero Subtitle</span>
                    <p className="text-gray-600">{viewingPage.config.heroSubtitle}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-400 block uppercase text-[10px]">Badge</span>
                    <p className="text-gray-800">{viewingPage.config.badge}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-400 block uppercase text-[10px]">Hero Image Banner</span>
                    <div className="w-20 h-12 rounded border border-gray-200 overflow-hidden bg-gray-100 mt-1">
                      <img src={viewingPage.config.heroImage} alt="hero banner preview" className="object-cover w-full h-full" />
                    </div>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-400 block uppercase text-[10px]">Alt Text</span>
                    <p className="text-gray-800 truncate">{viewingPage.config.heroImageAlt}</p>
                  </div>
                </div>
              </div>

              {/* Stats metric blocks */}
              <div>
                <h3 className="text-xs font-bold text-purple-900 uppercase tracking-widest border-b border-purple-100 pb-1 mb-2">
                  Highlight Stats
                </h3>
                <div className="grid grid-cols-4 gap-3">
                  {viewingPage.config.stats.map((s, idx) => (
                    <div key={idx} className="bg-purple-50 border border-purple-100 text-center p-2.5 rounded-lg">
                      <span className="block text-base font-bold text-purple-800">{s.value}</span>
                      <span className="text-[10px] text-gray-500">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Feature bullet cards */}
              <div>
                <h3 className="text-xs font-bold text-purple-900 uppercase tracking-widest border-b border-purple-100 pb-1 mb-2">
                  Feature / Service Highlights ({viewingPage.config.features.length})
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {viewingPage.config.features.map((f, idx) => (
                    <div key={idx} className="border border-gray-200 bg-white p-3 rounded-lg flex items-start gap-2 text-xs">
                      <span className="text-base">{f.icon}</span>
                      <div>
                        <strong className="text-gray-800 block">{f.title}</strong>
                        <p className="text-gray-500 mt-0.5 leading-tight">{f.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ Accordion item preview */}
              <div>
                <h3 className="text-xs font-bold text-purple-900 uppercase tracking-widest border-b border-purple-100 pb-1 mb-2">
                  FAQs ({viewingPage.config.faqs.length})
                </h3>
                <div className="space-y-2.5">
                  {viewingPage.config.faqs.map((faq, idx) => (
                    <div key={idx} className="bg-gray-50 border border-gray-200 p-2.5 rounded-lg text-xs">
                      <div className="font-bold text-purple-800">Q: {faq.question}</div>
                      <div className="text-gray-600 mt-1 pl-4">A: {faq.answer}</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Modal Action Buttons */}
            <div className="flex justify-end gap-3 border-t border-gray-200 pt-4 mt-6">
              <button 
                type="button"
                onClick={() => {
                  const pg = viewingPage;
                  setViewingPage(null);
                  handleEditClick(pg);
                }}
                className="bg-purple-600 hover:bg-purple-700 text-white font-medium text-xs px-4 py-2 rounded-lg transition duration-150"
              >
                Go to Editor
              </button>
              <button 
                type="button"
                onClick={() => setViewingPage(null)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium text-xs px-4 py-2 rounded-lg transition duration-150"
              >
                Close View
              </button>
            </div>

          </div>
        )}
      </ReusableModal>
    </div>
  );
}

export default AdminEventServices;
