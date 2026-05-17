import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { CiEdit } from "react-icons/ci";
import { FaPlay, FaVideo, FaQuoteLeft, FaEye, FaEyeSlash, FaSave } from "react-icons/fa";
import adminApi from "../../services/adminApi";
import useServices from "../../hooks/useServices";
import TableComponetWithApi from "../../utils/TableComponetWithApi";
import ReusableModal from "../Modal/Modal";


const getYoutubeEmbedUrl = (url, showControls = false) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}?autoplay=1&mute=1&controls=${showControls ? 1 : 0}&loop=1&playlist=${match[2]}&modestbranding=1&rel=0&iv_load_policy=3`;
  }
  return null;
};

const AdminFloatingVideo = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const getFloatingVideoConfigApi = useServices(adminApi.getFloatingVideoConfig);
  const updateFloatingVideoConfigApi = useServices(adminApi.updateFloatingVideoConfig);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const isActive = watch("isActive");
  const showTooltip = watch("showTooltip");

  const fetchConfig = async () => {
    try {
      const response = await getFloatingVideoConfigApi.callApi();
      if (response && response.config) {
        setData([response.config]);
      } else {
        setData([{
          _id: "default_config",
          videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
          isActive: true,
          tooltipText: "✨ See how it works",
          showTooltip: true
        }]);
      }
    } catch (error) {
      console.error("Error fetching floating video config:", error);
      setData([{
        _id: "default_config_err",
        videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
        isActive: true,
        tooltipText: "✨ See how it works",
        showTooltip: true
      }]);
    }
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  const handleEdit = (item) => {
    setEditingItem(item);
    reset(item);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    reset();
  };

  const onSubmit = async (formData) => {
    // Ensure boolean types for status fields as select elements return strings
    const payload = {
      ...formData,
      isActive: String(formData.isActive) === "true",
      showTooltip: String(formData.showTooltip) === "true",
      showControls: String(formData.showControls) === "true",
    };

    console.log("Floating Video Update Payload:", payload);

    try {
      const response = await updateFloatingVideoConfigApi.callApi(payload);
      if (response) {
        toast.success("Configuration updated successfully!");
        handleClose();
        fetchConfig();
      }
    } catch (error) {
      console.error("Error updating config:", error);
      toast.error("Failed to update configuration");
    }
  };

  const columns = [
    { label: "No", key: "index", render: (_, i) => i + 1 },
    {
      label: "Preview",
      key: "preview",
      render: (row) => {
        const youtubeUrl = getYoutubeEmbedUrl(row.videoUrl, row.showControls);
        return (
          <div className="w-12 h-16 bg-black rounded overflow-hidden mx-auto border border-gray-200">
            {youtubeUrl ? (
              <iframe
                src={youtubeUrl}
                className="w-full h-full border-0"
                title="YouTube Preview"
              />
            ) : (
              <video
                key={row.videoUrl}
                src={row.videoUrl}
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                controls={row.showControls}
              />
            )}
          </div>
        );
      },
    },
    { label: "Tooltip Text", key: "tooltipText", render: (row) => row.tooltipText || "N/A" },
    {
      label: "Status",
      key: "isActive",
      render: (row) => (
        <span className={`px-2 py-1 rounded text-sm font-medium ${row.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
          {row.isActive ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      label: "Tooltip",
      key: "showTooltip",
      render: (row) => (
        <span className={`px-2 py-1 rounded text-sm font-medium ${row.showTooltip ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-500"}`}>
          {row.showTooltip ? "Visible" : "Hidden"}
        </span>
      ),
    },
    {
      label: "Action",
      key: "action",
      render: (row) => (
        <div className="flex items-center justify-center">
          <CiEdit
            className="text-3xl font-semibold cursor-pointer text-textGray hover:text-primary transition-colors"
            onClick={() => handleEdit(row)}
          />
        </div>
      ),
    },
  ];

  const inputStyles = "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all";

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Floating Video Management</h2>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <TableComponetWithApi
          columns={columns}
          data={data}
          totalPages={1}
          page={1}
          onPageChange={() => { }}
        />
      </div>

      <ReusableModal
        open={isModalOpen}
        onClose={handleClose}
        title="Edit Floating Video"
        width="50%"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Video URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Video URL
            </label>
            <input
              type="text"
              {...register("videoUrl", { required: "Video URL is required" })}
              className={inputStyles}
              placeholder="Enter video URL"
            />
            {errors.videoUrl && (
              <p className="text-sm text-red-500 mt-1">{errors.videoUrl.message}</p>
            )}
          </div>

          {/* Tooltip Text */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tooltip Text
            </label>
            <input
              type="text"
              {...register("tooltipText")}
              className={inputStyles}
              placeholder="Enter tooltip text"
            />
          </div>

          {/* Status Select */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Widget Status
            </label>
            <select
              {...register("isActive")}
              className={inputStyles}
            >
              <option value={true}>Active (Visible)</option>
              <option value={false}>Inactive (Hidden)</option>
            </select>
          </div>

          {/* Tooltip Toggle Select */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tooltip Visibility
            </label>
            <select
              {...register("showTooltip")}
              className={inputStyles}
            >
              <option value={true}>Visible</option>
              <option value={false}>Hidden</option>
            </select>
          </div>

          {/* Show Controls Select */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Player Controls
            </label>
            <select
              {...register("showControls")}
              className={inputStyles}
            >
              <option value={true}>Enable Controls</option>
              <option value={false}>Hide Controls</option>
            </select>
          </div>

          {/* Preview Placeholder in Modal */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Live Player Preview</p>
            <div className="w-full aspect-video bg-black rounded-xl overflow-hidden shadow-xl border border-gray-300">
              {watch("videoUrl") ? (
                getYoutubeEmbedUrl(watch("videoUrl"), watch("showControls")) ? (
                  <iframe
                    key={getYoutubeEmbedUrl(watch("videoUrl"), watch("showControls"))}
                    src={getYoutubeEmbedUrl(watch("videoUrl"), watch("showControls"))}
                    className="w-full h-full border-0"
                    title="YouTube Preview"
                    allow="autoplay; encrypted-media"
                  />
                ) : (
                  <video
                    key={watch("videoUrl")}
                    src={watch("videoUrl")}
                    className="w-full h-full object-contain"
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls={watch("showControls")}
                  />
                )
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 gap-2">
                  <FaVideo size={40} className="opacity-20" />
                  <p className="text-xs font-medium">No video URL provided</p>
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={updateFloatingVideoConfigApi.loading}
            className={`w-full bg-purple-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 transition-all ${updateFloatingVideoConfigApi.loading ? "opacity-70 cursor-not-allowed" : "hover:bg-purple-700"
              }`}
          >
            {updateFloatingVideoConfigApi.loading ? "Saving..." : "Update Configuration"}
          </button>
        </form>
      </ReusableModal>
    </div>
  );
};

export default AdminFloatingVideo;
