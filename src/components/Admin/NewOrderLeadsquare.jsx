import React, { useState, useEffect, useRef } from "react";
import TableComponetWithApi from "../../utils/TableComponetWithApi";
import { MdOutlineDelete } from "react-icons/md";
import { CiViewBoard, CiEdit } from "react-icons/ci";
import { IoMdRefresh } from "react-icons/io";
import { FaFilter } from "react-icons/fa";
import ReusableModal from "../Modal/Modal";
import useServices from "../../hooks/useServices";
import orderApis from "../../services/orderApis";
import { toast } from "react-toastify";

function NewOrderLeadsquare() {
  const syncLeadsApi = useServices(orderApis.syncLeads);
  const getAllSyncLeadsApi = useServices(orderApis.getAllSyncLeads);
  const updateSyncLeadApi = useServices(orderApis.updateOneSyncLead);
  const deleteSyncLeadApi = useServices(orderApis.deleteOneSyncLead);
  const getOneSyncLeadApi = useServices(orderApis.getOneSyncLead);

  const [allLeads, setAllLeads] = useState([]);
  const [itemName, setItemName] = useState("");
  const [status, setStatus] = useState("pending");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState(""); // e.g., 'A-Z' or 'Z-A'
  
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState("viewOrder");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const dropdownRef = useRef(null);

  const handleOpenModal = async (type, order) => {
    setModalType(type);
    setSelectedOrder(order);
    
    // Set form defaults if editing
    if (type === "editOrder") {
      setItemName(order?.itemName || "");
      setStatus(order?.status || "pending");
    }
    
    setOpenModal(true);
    
    // Optionally fetch full details
    if (order && (order.id || order._id)) {
      try {
        const res = await getOneSyncLeadApi.callApi(order.id || order._id);
        if (res && res.data) {
           setSelectedOrder(res.data);
           if (type === "editOrder") {
             setItemName(res.data.itemName || order?.itemName || "");
             setStatus(res.data.status || order?.status || "pending");
           }
        }
      } catch (e) {}
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedOrder(null);
    setItemName("");
    setStatus("pending");
  };

  const fetchAllLeads = async () => {
    try {
      const response = await getAllSyncLeadsApi.callApi({ page, sort: sortOrder });
      setAllLeads(response?.leads || response?.data || response || []);
      setTotalPages(response?.pagination?.totalPages || response?.totalPages || 1);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchAllLeads();
  }, [page, sortOrder]);

  const COOLDOWN_TIME = 5 * 60 * 1000; // 5 minutes in ms
  const [isRefreshDisabled, setIsRefreshDisabled] = useState(() => {
    const lastSyncStr = localStorage.getItem("lastSyncLeadsTime");
    if (lastSyncStr) {
      const lastSync = parseInt(lastSyncStr, 10);
      return (Date.now() - lastSync) < COOLDOWN_TIME;
    }
    return false;
  });

  const [timeLeft, setTimeLeft] = useState(() => {
    const lastSyncStr = localStorage.getItem("lastSyncLeadsTime");
    if (lastSyncStr) {
      const lastSync = parseInt(lastSyncStr, 10);
      const diff = Date.now() - lastSync;
      if (diff < COOLDOWN_TIME) {
        return Math.ceil((COOLDOWN_TIME - diff) / 1000);
      }
    }
    return 0;
  });

  useEffect(() => {
    let interval;
    if (isRefreshDisabled) {
      interval = setInterval(() => {
        const lastSyncStrCheck = localStorage.getItem("lastSyncLeadsTime");
        if (!lastSyncStrCheck) return;
        
        const lastSync = parseInt(lastSyncStrCheck, 10);
        const now = Date.now();
        const diff = now - lastSync;
        if (diff >= COOLDOWN_TIME) {
          setIsRefreshDisabled(false);
          setTimeLeft(0);
          clearInterval(interval);
        } else {
          setTimeLeft(Math.ceil((COOLDOWN_TIME - diff) / 1000));
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRefreshDisabled]);

  const handleRefresh = async () => {
    if (isRefreshDisabled) return;

    try {
      await syncLeadsApi.callApi();
      toast.success("Leads synced successfully!");
      
      localStorage.setItem("lastSyncLeadsTime", Date.now().toString());
      setIsRefreshDisabled(true);
      setTimeLeft(COOLDOWN_TIME / 1000);
      
      fetchAllLeads();
    } catch (error) {
      console.error("Failed to sync leads:", error);
      toast.error("Failed to sync leads!");
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Replaced dummyData with real allLeads array

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleSort = (order) => {
    setSortOrder(order);
    setIsFilterOpen(false);
    console.log("Sort order selected:", order);
    // Logic for sorting can be added here once API is integrated
  };

  const columns = [
    { label: "No", key: "index", render: (_, i) => i + 1 },
    {
      label: "Order ID",
      key: "orderid",
      render: (row) => row.orderid || row.OrderId || row._id || "N/A"
    },
    {
      label: "Customer Name",
      key: "customerName",
      render: (row) => row.customerName || row.name || "N/A"
    },
    {
      label: "Mobile",
      key: "customerMobile",
      render: (row) => row.customerMobile || "N/A"
    },
    {
      label: "Date",
      key: "createdAt",
      render: (row) => row.createdAt ? new Date(row.createdAt).toLocaleDateString() : "N/A",
    },
    {
      label: "Items Count",
      key: "items",
      render: (row) => row.items?.length || 0,
    },
    {
      label: "Action",
      key: "action",
      render: (row) => (
        <div className="flex items-center justify-center gap-2">
          <CiViewBoard 
            className="text-3xl font-semibold cursor-pointer text-textGray hover:text-primary transition"
            onClick={() => handleOpenModal("viewOrder", row)}
          />
          <CiEdit 
            className="text-3xl font-semibold cursor-pointer text-textGray hover:text-primary transition"
            onClick={() => handleOpenModal("editOrder", row)}
          />
          <MdOutlineDelete 
            className="text-3xl font-semibold cursor-pointer text-textGray hover:text-red-500 transition" 
            onClick={async () => {
              try {
                await deleteSyncLeadApi.callApi(row._id || row.id);
                toast.success("Lead deleted successfully!");
                fetchAllLeads();
              } catch (e) {
                toast.error("Failed to delete lead!");
              }
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-end items-center gap-4 mb-4">
        <button
          onClick={handleRefresh}
          disabled={isRefreshDisabled}
          className={`float-right w-fit px-2 mb-2 flex items-center gap-2 ${
            isRefreshDisabled ? "bg-gray-400 cursor-not-allowed text-white rounded py-2" : "btn-primary rounded py-2"
          }`}
        >
          <IoMdRefresh className={`text-lg ${isRefreshDisabled ? "animate-spin" : ""}`} />
          {isRefreshDisabled ? `Refresh (${formatTime(timeLeft)})` : "Refresh"}
        </button>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="float-right btn-primary w-fit px-2 mb-2 flex items-center gap-2"
          >
            <FaFilter className="text-sm" />
            Filter {sortOrder && `(${sortOrder})`}
          </button>

          {isFilterOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow-lg z-10">
              <button
                onClick={() => handleSort("A-Z")}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Sort A - Z
              </button>
              <button
                onClick={() => handleSort("Z-A")}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Sort Z - A
              </button>
            </div>
          )}
        </div>
      </div>

      <TableComponetWithApi
        columns={columns}
        data={allLeads}
        page={page}
        itemsPerPage={10}
        onPageChange={handlePageChange}
        totalPages={totalPages}
      />

      <ReusableModal
        open={openModal}
        onClose={handleCloseModal}
        title={modalType === "viewOrder" ? "View Order" : "Edit Order"}
      >
        {modalType === "viewOrder" && (
          <div className="w-full mx-auto p-6 bg-white overflow-y-auto max-h-[70vh]">
            <div className="flex justify-between items-start mb-4 border-b pb-3">
              <h2 className="text-2xl font-bold text-primary">
                Order Details
              </h2>
              <button 
                onClick={() => {
                   const rawMobile = selectedOrder?.customerMobile?.replace("+91-", "") || selectedOrder?.customerMobile;
                   const url = `${window.location.origin}/track-order?id=${rawMobile}`;
                   navigator.clipboard.writeText(url);
                   toast.success("Tracking URL copied to clipboard!");
                }} 
                className="bg-primary hover:bg-primary/90 text-white px-4 py-2 text-sm font-semibold rounded shadow-sm transition-all"
              >
                Copy Tracking Link
              </button>
            </div>
            <div className="space-y-3 text-gray-700">
              <p>
                <strong className="text-primary">Order ID:</strong> {selectedOrder?.orderid || selectedOrder?._id}
              </p>
              <p>
                <strong className="text-primary">Customer Name:</strong> {selectedOrder?.customerName}
              </p>
              <p>
                <strong className="text-primary">Mobile:</strong> {selectedOrder?.customerMobile}
              </p>
              <p>
                <strong className="text-primary">Created At:</strong> {selectedOrder?.createdAt && new Date(selectedOrder.createdAt).toLocaleString()}
              </p>

              {selectedOrder?.items && selectedOrder.items.length > 0 && (
                <div className="mt-4 border-t pt-4">
                  <h3 className="text-lg font-bold mb-2 text-primary">Items</h3>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item, idx) => (
                      <div key={idx} className="p-3 bg-gray-50 border border-gray-100 rounded flex items-center justify-between">
                        <span className="font-medium text-gray-800">{item.itemName || item.name || "Unnamed"}</span>
                        <span className={`text-sm px-3 py-1 bg-purple-100 text-purple-700 rounded-full font-bold capitalize`}>
                           {item.currentStatus || item.status || "Unknown"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {modalType === "editOrder" && (
          <div className="w-full mx-auto p-6 bg-white overflow-y-auto max-h-[70vh]">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-primary">
                Edit Order
              </h2>
              <button 
                type="button"
                onClick={() => {
                   const rawMobile = selectedOrder?.customerMobile?.replace("+91-", "") || selectedOrder?.customerMobile;
                   const url = `${window.location.origin}/track-order?id=${rawMobile}`;
                   navigator.clipboard.writeText(url);
                   toast.success("Tracking URL copied to clipboard!");
                }} 
                className="bg-primary hover:bg-primary/90 text-white px-4 py-2 text-sm font-semibold rounded shadow-sm transition-all"
              >
                Copy Tracking Link
              </button>
            </div>
            
            <div className="space-y-4 mb-6 text-gray-700 border-b pb-6">
              <p><strong className="text-primary">Order ID:</strong> {selectedOrder?.orderid || selectedOrder?._id}</p>
              <p><strong className="text-primary">Customer Name:</strong> {selectedOrder?.customerName}</p>
            </div>

            {selectedOrder?.items && selectedOrder.items.length > 0 && (
              <div className="mb-6 border-b pb-6">
                <h3 className="text-lg font-semibold mb-4 text-primary">Update Existing Item Status</h3>
                <div className="space-y-3">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-100 rounded-lg">
                      <span className="flex-1 font-medium text-gray-800">{item.name || item.itemName}</span>
                      <select 
                        className="px-3 py-1.5 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:outline-none text-sm font-medium w-40 capitalize"
                        defaultValue={item.currentStatus || item.status}
                        onChange={async (e) => {
                            const newStatus = e.target.value;
                            try {
                               const payload = { itemName: item.name || item.itemName, status: newStatus };
                               await updateSyncLeadApi.callApi(selectedOrder._id || selectedOrder.id, payload);
                               toast.success(`Updated "${item.name || item.itemName}" status to ${newStatus}`);
                               fetchAllLeads();
                               
                               // Optmistic local update
                               setSelectedOrder(prev => {
                                  const newItems = [...prev.items];
                                  newItems[idx] = { ...newItems[idx], currentStatus: newStatus, status: newStatus };
                                  return { ...prev, items: newItems };
                               });
                            } catch (err) {
                               toast.error("Failed to update item status!");
                            }
                        }}
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="completed">Completed</option>
                        <option value="failed">Failed</option>
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <h3 className="text-lg font-semibold mb-3 text-primary">
              Add New Option
            </h3>
            
            <form className="space-y-4 bg-gray-50/50 p-4 rounded-xl border border-gray-100">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Item Name
                </label>
                <input
                  type="text"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  placeholder="Enter item name..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select 
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="completed">Completed</option>
                  <option value="failed">Failed</option>
                </select>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-gray-700 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={async () => {
                     try {
                        const payload = { itemName, status };
                        await updateSyncLeadApi.callApi(selectedOrder._id || selectedOrder.id, payload);
                        toast.success("Lead updated successfully!");
                        handleCloseModal();
                        fetchAllLeads();
                     } catch(e) {
                        toast.error("Failed to update lead!");
                     }
                  }}
                  className="px-4 py-2 bg-primary text-white rounded-md hover:opacity-90 font-medium"
                >
                  Add Option
                </button>
              </div>
            </form>
          </div>
        )}
      </ReusableModal>
    </div>
  );
}

export default NewOrderLeadsquare;
