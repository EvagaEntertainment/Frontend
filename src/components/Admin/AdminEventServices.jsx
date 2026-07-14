'use client';

import React, { useState, useEffect, useMemo, useRef } from "react";
import TableComponetWithApi from "../../utils/TableComponetWithApi";
import ReusableModal from "../Modal/Modal";
import { toast } from "react-toastify";
import { FaEdit, FaEye, FaArrowLeft, FaPlus, FaTrash, FaDesktop, FaCheck, FaTimes, FaGlobe, FaUpload } from "react-icons/fa";
import useServices from "../../hooks/useServices";
import eventServicesApi from "../../services/eventServicesApi";

// Resolve S3 relative keys to full URLs using env base path
const getImageUrl = (src) => {
  if (!src) return "https://placehold.co/600x400/ece6f5/6a1b9a?text=No+Image";
  if (src.startsWith("http://") || src.startsWith("https://") || src.startsWith("data:") || src.startsWith("blob:")) {
    return src;
  }
  return (process.env.NEXT_PUBLIC_API_Aws_Image_BASE_URL || "") + src;
};

function AdminEventServices() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingPage, setEditingPage] = useState(null);
  const [viewingPage, setViewingPage] = useState(null);
  const [formData, setFormData] = useState(null);
  const [activeTab, setActiveTab] = useState("hero"); // hero, features, gallery, links
  const [isSaved, setIsSaved] = useState(false);
  
  // API loader hooks
  const getAllPagesApi = useServices(eventServicesApi.getAllEventServicePages);
  const getPageByIdApi = useServices(eventServicesApi.getEventServicePageById);
  const updatePageApi = useServices(eventServicesApi.updateEventServicePage);

  // Table & data loading states
  const [pagesList, setPagesList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const heroFileRef = useRef(null);
  const galleryFileRef = useRef(null);
  const itemsPerPage = 8;

  // Fetch list of event service pages from the backend
  const fetchPages = async () => {
    setLoading(true);
    try {
      const response = await getAllPagesApi.callApi({
        page: currentPage,
        limit: itemsPerPage,
        search: searchTerm
      });
      if (response && response.success) {
        setPagesList(response.data || []);
        setTotalCount(response.pagination?.total || 0);
        setTotalPages(response.pagination?.totalPages || 1);
      }
    } catch (error) {
      console.error("Error fetching pages list:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, [currentPage, searchTerm]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Retrieve single page configuration details for editing
  const handleEditClick = async (page) => {
    try {
      const response = await getPageByIdApi.callApi(page._id);
      if (response && response.success) {
        setEditingPage(response.data);
        setFormData(response.data);
        setActiveTab("hero");
        setIsSaved(false);
      } else {
        toast.error("Failed to load page configurations.");
      }
    } catch (error) {
      console.error("Error loading page config for edit:", error);
      toast.error("An error occurred while loading details.");
    }
  };

  // Retrieve single page configuration details for viewing
  const handleViewClick = async (page) => {
    try {
      const response = await getPageByIdApi.callApi(page._id);
      if (response && response.success) {
        setViewingPage(response.data);
      } else {
        toast.error("Failed to load page details.");
      }
    } catch (error) {
      console.error("Error loading page details for modal:", error);
    }
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
      caption: "Portfolio Image",
      isNew: true
    }));
    setFormData((prev) => ({
      ...prev,
      gallery: [...(prev.gallery || []), ...newItems]
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
      [field]: [...(prev[field] || []), newObj]
    }));
  };

  const removeListItem = (field, index) => {
    setFormData((prev) => {
      const listCopy = [...prev[field]];
      listCopy.splice(index, 1);
      return { ...prev, [field]: listCopy };
    });
  };

  // Build FormData payload and update database entry
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const payload = new FormData();
      payload.append("title", formData.title || "");
      payload.append("slug", formData.slug || "");
      payload.append("path", formData.path || "");
      payload.append("category", formData.category || "");
      payload.append("badge", formData.badge || "");
      payload.append("h1", formData.h1 || "");
      payload.append("heroSubtitle", formData.heroSubtitle || "");
      payload.append("heroImageAlt", formData.heroImageAlt || "");
      payload.append("isActive", formData.isActive);

      payload.append("stats", JSON.stringify(formData.stats || []));
      payload.append("features", JSON.stringify(formData.features || []));
      payload.append("relatedLinks", JSON.stringify(formData.relatedLinks || []));
      
      // Map gallery entries, appends newly uploaded files
      const mappedGallery = (formData.gallery || []).map((item) => {
        if (item.file) {
          payload.append("galleryImages", item.file);
          return {
            src: item.src, // temporary blob preview url
            alt: item.alt || "",
            caption: item.caption || "",
            isNew: true
          };
        }
        return {
          src: item.src, // existing S3 key
          alt: item.alt || "",
          caption: item.caption || ""
        };
      });
      payload.append("gallery", JSON.stringify(mappedGallery));

      // Append Hero Image if it was uploaded
      if (formData.heroImageFile) {
        payload.append("heroImage", formData.heroImageFile);
      } else {
        payload.append("heroImage", formData.heroImage || "");
      }

      const response = await updatePageApi.callApi(editingPage._id, payload);
      if (response && response.success) {
        setIsSaved(true);
        toast.success(`${editingPage.title} content updated successfully!`);
        setEditingPage(response.data);
        setFormData(response.data);
        fetchPages(); // reload paginated list
        setTimeout(() => setIsSaved(false), 3000);
      } else {
        toast.error(response?.message || "Failed to update landing page config.");
      }
    } catch (error) {
      console.error("Error saving page edits:", error);
      toast.error("An error occurred while saving configs.");
    }
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
      label: "Status",
      key: "isActive",
      render: (row) => (
        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
          row.isActive ? "text-green-700 bg-green-50" : "text-amber-700 bg-amber-50"
        }`}>
          {row.isActive ? "Active" : "Maintenance"}
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
            Manage page-specific content, headers, images, stats and links for all 36 landing pages.
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
              Total Event Service Pages: <span className="font-bold">{totalCount}</span>
            </div>
          </div>

          <div className="overflow-x-auto border border-gray-200 rounded-xl shadow-sm">
            <TableComponetWithApi
              columns={columns}
              data={pagesList}
              page={currentPage}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
              totalPages={totalPages}
              loading={loading}
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
                { id: "links", label: "Related Links" }
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
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Hero Information</h3>
                    <div className="flex items-center gap-2">
                      <label className="text-xs font-semibold text-gray-500">Page Status:</label>
                      <select 
                        value={formData.isActive}
                        onChange={(e) => handleFieldChange("isActive", e.target.value === "true")}
                        className="px-2 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-purple-650"
                      >
                        <option value="true">Active</option>
                        <option value="false">Maintenance Mode</option>
                      </select>
                    </div>
                  </div>
                  
                  {/* Image Upload Area */}
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
                          src={getImageUrl(formData.heroImage)} 
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
                        value={formData.badge || ""} 
                        onChange={(e) => handleFieldChange("badge", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-purple-600"
                        placeholder="e.g. Birthday Specialists"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1">Main H1 Title</label>
                      <input 
                        type="text" 
                        value={formData.h1 || ""} 
                        onChange={(e) => handleFieldChange("h1", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-purple-600"
                        placeholder="Page main H1"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-gray-500 mb-1">Hero Subtitle</label>
                      <textarea 
                        rows={3}
                        value={formData.heroSubtitle || ""} 
                        onChange={(e) => handleFieldChange("heroSubtitle", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-purple-600"
                        placeholder="Brief summary below heading"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-gray-500 mb-1">Hero Image Alt Tag</label>
                      <input 
                        type="text" 
                        value={formData.heroImageAlt || ""} 
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
                    {formData.stats && formData.stats.map((stat, idx) => (
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
                    {formData.features && formData.features.map((feat, idx) => (
                      <div key={idx} className="bg-white p-3 rounded-lg border border-gray-200 flex flex-col gap-2 relative group shadow-sm">
                        <button 
                          type="button"
                          onClick={() => removeListItem("features", idx)}
                          className="absolute top-2 right-2 text-red-450 hover:text-red-655 hidden group-hover:block transition duration-150"
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

            {/* Tab Content 3: Gallery Portfolio */}
            {activeTab === "gallery" && (
              <div className="space-y-6 animate-fadeIn">
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Page Gallery / Portfolio Pictures</h3>
                    
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
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {formData.gallery && formData.gallery.map((img, idx) => (
                      <div key={idx} className="bg-white p-3 rounded-lg border border-gray-200 flex flex-col gap-2 relative shadow-sm group">
                        
                        <div className="relative h-28 w-full bg-gray-100 rounded-md overflow-hidden border border-gray-200">
                          <img 
                            src={getImageUrl(img.src)} 
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
                            className="absolute top-1.5 right-1.5 bg-red-655/90 text-white rounded-full p-1 shadow-md hover:bg-red-700 hover:scale-105 transition"
                            title="Remove Photo"
                          >
                            <FaTimes size={10} />
                          </button>
                        </div>
                        
                        <div className="space-y-1.5 pt-1">
                          <div>
                            <label className="block text-[9px] font-semibold text-gray-400 uppercase">Caption</label>
                            <input 
                              type="text" 
                              value={img.caption} 
                              onChange={(e) => updateListItem("gallery", idx, "caption", e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-purple-655"
                              placeholder="Image Caption text"
                            />
                          </div>
                          <div>
                            <label className="block text-[9px] font-semibold text-gray-400 uppercase">Alt Description (SEO)</label>
                            <input 
                              type="text" 
                              value={img.alt} 
                              onChange={(e) => updateListItem("gallery", idx, "alt", e.target.value)}
                              className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:ring-1 focus:ring-purple-655"
                              placeholder="Describe for visually impaired/SEO"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <div 
                      onClick={() => galleryFileRef.current.click()}
                      className="border-2 border-dashed border-gray-300 rounded-lg h-[210px] bg-white flex flex-col items-center justify-center text-gray-400 hover:text-purple-655 hover:border-purple-400 cursor-pointer transition duration-200"
                    >
                      <FaPlus className="text-xl mb-1.5" />
                      <span className="text-xs font-semibold">Upload Photo Entry</span>
                      <span className="text-[9px] text-gray-400 mt-0.5">JPEG, PNG formats</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab Content 4: Related Links */}
            {activeTab === "links" && (
              <div className="space-y-6 animate-fadeIn">
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
                    {formData.relatedLinks && formData.relatedLinks.map((link, idx) => (
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
                  handleEditClick(editingPage);
                  toast.info("Form fields reset to DB values.");
                }}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium text-sm px-5 py-2.5 rounded-lg transition duration-150"
              >
                Reset Form
              </button>
            </div>

          </div>

          {/* ─── LIVE OUTLINE PREVIEW (Right Panel) ─── */}
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
                          src={getImageUrl(g.src)} 
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
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="text-xs font-mono text-purple-600 bg-purple-50 px-2 py-0.5 rounded">
                    Path: {viewingPage.path}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    viewingPage.isActive ? "text-green-700 bg-green-50" : "text-amber-700 bg-amber-50"
                  }`}>
                    {viewingPage.isActive ? "Active" : "Maintenance Mode"}
                  </span>
                </div>
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
                    <p className="text-gray-800 font-bold">{viewingPage.h1}</p>
                  </div>
                  <div className="col-span-3">
                    <span className="font-semibold text-gray-400 block uppercase text-[10px]">Hero Subtitle</span>
                    <p className="text-gray-600">{viewingPage.heroSubtitle}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-400 block uppercase text-[10px]">Badge</span>
                    <p className="text-gray-800">{viewingPage.badge}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-400 block uppercase text-[10px]">Hero Image Banner</span>
                    <div className="w-20 h-12 rounded border border-gray-200 overflow-hidden bg-gray-100 mt-1">
                      <img src={getImageUrl(viewingPage.heroImage)} alt="hero banner preview" className="object-cover w-full h-full" />
                    </div>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-400 block uppercase text-[10px]">Alt Text</span>
                    <p className="text-gray-800 truncate">{viewingPage.heroImageAlt}</p>
                  </div>
                </div>
              </div>

              {/* Stats metric blocks */}
              <div>
                <h3 className="text-xs font-bold text-purple-900 uppercase tracking-widest border-b border-purple-100 pb-1 mb-2">
                  Highlight Stats
                </h3>
                <div className="grid grid-cols-4 gap-3">
                  {viewingPage.stats && viewingPage.stats.map((s, idx) => (
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
                  Feature / Service Highlights ({(viewingPage.features || []).length})
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {viewingPage.features && viewingPage.features.map((f, idx) => (
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

              {/* Related links list */}
              <div>
                <h3 className="text-xs font-bold text-purple-900 uppercase tracking-widest border-b border-purple-100 pb-1 mb-2">
                  Related Service Links
                </h3>
                <div className="flex flex-wrap gap-2">
                  {viewingPage.relatedLinks && viewingPage.relatedLinks.map((link, idx) => (
                    <span key={idx} className="bg-purple-50 border border-purple-100 px-3 py-1.5 rounded-lg text-xs font-medium text-purple-800">
                      {link.label} ({link.href})
                    </span>
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
