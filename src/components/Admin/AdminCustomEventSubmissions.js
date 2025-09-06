import React, { useEffect, useState } from "react";
import useServices from "../../hooks/useServices";
import adminActionsApi from "../../services/adminActionsApi";
import { formatDateTime } from "../../utils/formatDateTime";
import TableComponetWithApi from "../../utils/TableComponetWithApi";
import ReusableModal from "../Modal/Modal";
import { MdOutlineVisibility, MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import { toast } from "react-toastify";
import { BiSolidCalendarEvent, BiUser, BiEnvelope, BiPhone } from "react-icons/bi";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function AdminCustomEventSubmissions() {
  const [allSubmissions, setAllSubmissions] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [oneSubmission, setOneSubmission] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [open, setOpen] = useState(false);
  const [showSensitiveData, setShowSensitiveData] = useState({});

  // API hooks
  const getAllSubmissionsApi = useServices(adminActionsApi.getAllCustomEventSubmissions);
  const getSubmissionByIdApi = useServices(adminActionsApi.getCustomEventSubmissionById);
  const updateSubmissionStatusApi = useServices(adminActionsApi.updateCustomEventSubmissionStatus);
  const deleteSubmissionApi = useServices(adminActionsApi.deleteCustomEventSubmission);

  const getAllSubmissionsHandle = async () => {
    try {
      const queryParams = { page: page || 1, limit: 10 };
      const response = await getAllSubmissionsApi.callApi(queryParams);
      
      if (response && response.success && response.data) {
        const submissions = response.data.submissions || response.data;
        const pagination = response.data.pagination || response.pagination;
        
        setAllSubmissions(submissions);
        setTotalPages(pagination?.totalPages || 1);
      } else {
        // Handle API error responses
        const errorMessage = response?.message || response?.error || "API response structure unexpected";
        const statusCode = response?.status || response?.statusCode || "Unknown";
        
        if (statusCode >= 400 && statusCode < 500) {
          toast.error(`Client Error (${statusCode}): ${errorMessage}`);
        } else if (statusCode >= 500) {
          toast.error(`Server Error (${statusCode}): ${errorMessage}`);
        } else {
          toast.warning(`API Warning: ${errorMessage}`);
        }
        
        // Fallback to mock data if API structure is unexpected
        const mockData = [
          {
            _id: '1',
            customEventId: '68bc68e168d01402aa999770',
            eventType: 'Birthday Party',
            templateName: 'Birthday Party',
            formData: {
              eventType: 'Birthday Party',
              ageGroup: '11-15 years',
              birthdayDate: '2025-09-06',
              guestCount: '10',
              mobileNumber: '9876543210',
              email: 'test@example.com',
              themeCards: ['Princess Theme', 'Superhero Theme'],
              budget: '50000-100000',
              foodMenu: {
                veg: {
                  starters: ['Paneer Tikka', 'Veg Spring Rolls'],
                  mainCourse: ['Veg Biryani', 'Dal Makhani'],
                  desserts: ['Gulab Jamun', 'Ras Malai']
                },
                nonVeg: {
                  starters: ['Chicken Tikka', 'Fish Fingers'],
                  mainCourse: ['Chicken Curry', 'Mutton Biryani'],
                  desserts: ['Ice Cream', 'Cake']
                }
              },
              specialRequirements: 'Need a DJ and photographer'
            },
            status: 'pending',
            submittedAt: new Date().toISOString(),
            userInfo: {
              email: 'test@example.com',
              mobileNumber: '9876543210'
            }
          }
        ];
        setAllSubmissions(mockData);
        setTotalPages(1);
      }
    } catch (error) {
      // Check if it's a network error or server error
      if (error.message.includes('Network Error') || error.message.includes('Failed to fetch')) {
        toast.warning('Network error - using mock data for demonstration');
      } else {
        toast.error('Failed to fetch custom event submissions');
      }
      
      // Fallback to mock data on error
      const mockData = [
        {
          _id: '1',
          customEventId: '68bc68e168d01402aa999770',
          eventType: 'Birthday Party',
          templateName: 'Birthday Party',
          formData: {
            eventType: 'Birthday Party',
            ageGroup: '11-15 years',
            birthdayDate: '2025-09-06',
            guestCount: '10',
            mobileNumber: '9876543210',
            email: 'test@example.com',
            themeCards: ['Princess Theme', 'Superhero Theme'],
            budget: '50000-100000',
            foodMenu: {
              veg: {
                starters: ['Paneer Tikka', 'Veg Spring Rolls'],
                mainCourse: ['Veg Biryani', 'Dal Makhani'],
                desserts: ['Gulab Jamun', 'Ras Malai']
              },
              nonVeg: {
                starters: ['Chicken Tikka', 'Fish Fingers'],
                mainCourse: ['Chicken Curry', 'Mutton Biryani'],
                desserts: ['Ice Cream', 'Cake']
              }
            },
            specialRequirements: 'Need a DJ and photographer'
          },
          status: 'pending',
          submittedAt: new Date().toISOString(),
          userInfo: {
            email: 'test@example.com',
            mobileNumber: '9876543210'
          }
        }
      ];
      setAllSubmissions(mockData);
      setTotalPages(1);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleOpen = () => setOpen(true);
  
  const handleClose = () => {
    setOpen(false);
    setOneSubmission(null);
    setModalType(null);
  };

  const handleViewSubmission = async (submission) => {
    try {
      setOneSubmission(submission);
      setModalType("viewSubmission");
      handleOpen();
    } catch (error) {
      toast.error("Failed to load submission details");
    }
  };

  const handleUpdateStatus = async (submissionId, newStatus) => {
    try {
      setIsSubmitting(true);
      
      const response = await updateSubmissionStatusApi.callApi(submissionId, { status: newStatus });
      
      if (response && response.success) {
        toast.success(`Submission status updated to ${newStatus}`);
        getAllSubmissionsHandle();
        handleClose();
      } else {
        toast.error(`Failed to update submission status: ${response?.message || response?.error || 'Unknown error'}`);
      }
    } catch (error) {
      toast.error(`Failed to update submission status: ${error.message || 'Network error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteSubmission = async () => {
    try {
      setIsSubmitting(true);
      const response = await deleteSubmissionApi.callApi(oneSubmission._id);
      
      if (response && response.success) {
        toast.success("Submission deleted successfully");
        getAllSubmissionsHandle();
        handleClose();
      } else {
        toast.error("Failed to delete submission");
      }
    } catch (error) {
      toast.error("Failed to delete submission");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleSensitiveData = (submissionId) => {
    setShowSensitiveData(prev => ({
      ...prev,
      [submissionId]: !prev[submissionId]
    }));
  };

  const maskSensitiveData = (data, submissionId) => {
    if (showSensitiveData[submissionId]) {
      return data;
    }
    
    if (typeof data === 'string') {
      if (data.includes('@')) {
        // Email masking
        const [local, domain] = data.split('@');
        return `${local.substring(0, 2)}***@${domain}`;
      } else if (data.length === 10 && /^\d+$/.test(data)) {
        // Phone number masking
        return `${data.substring(0, 3)}***${data.substring(6)}`;
      }
    }
    
    return data;
  };

  useEffect(() => {
    getAllSubmissionsHandle();
  }, [page]);

  const columns = [
    { label: "No", key: "index", render: (_, i) => i + 1 },
    {
      label: "Event Type",
      key: "eventType",
      render: (row) => (
        <div className="flex items-center space-x-2">
          <BiSolidCalendarEvent className="text-purple-600" />
          <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
            {row?.eventType || "N/A"}
          </span>
        </div>
      ),
    },
    {
      label: "Template",
      key: "templateName",
      render: (row) => (
        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
          {row?.templateName || "Custom"}
        </span>
      ),
    },
    {
      label: "Contact Info",
      key: "contactInfo",
      render: (row) => {
        const email = row?.userInfo?.email || row?.formData?.email || "N/A";
        const phone = row?.userInfo?.mobileNumber || row?.formData?.mobileNumber || "N/A";
        
        return (
          <div className="space-y-1">
            <div className="flex items-center space-x-1 text-xs">
              <BiEnvelope className="text-gray-500" />
              <span className="text-gray-600">
                {maskSensitiveData(email, row._id)}
              </span>
            </div>
            <div className="flex items-center space-x-1 text-xs">
              <BiPhone className="text-gray-500" />
              <span className="text-gray-600">
                {maskSensitiveData(phone, row._id)}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      label: "Status",
      key: "status",
      render: (row) => {
        const statusColors = {
          pending: "bg-yellow-100 text-yellow-800",
          approved: "bg-green-100 text-green-800",
          rejected: "bg-red-100 text-red-800",
          in_progress: "bg-blue-100 text-blue-800",
          completed: "bg-purple-100 text-purple-800"
        };
        
        return (
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            statusColors[row?.status] || 'bg-gray-100 text-gray-800'
          }`}>
            {row?.status?.charAt(0).toUpperCase() + row?.status?.slice(1) || 'Unknown'}
          </span>
        );
      },
    },
    {
      label: "Submitted At",
      key: "submittedAt",
      render: (row) => formatDateTime(row?.submittedAt || row?.createdAt),
    },
    {
      label: "Action",
      key: "action",
      render: (row) => (
        <div className="flex items-center justify-center gap-2">
          <MdOutlineVisibility
            className="text-2xl font-semibold cursor-pointer text-blue-600 hover:text-blue-800 transition-colors duration-200"
            onClick={() => handleViewSubmission(row)}
            title="View Details"
          />
          <MdOutlineEdit
            className="text-2xl font-semibold cursor-pointer text-green-600 hover:text-green-800 transition-colors duration-200"
            onClick={() => {
              setOneSubmission(row);
              setModalType("updateStatus");
              handleOpen();
            }}
            title="Update Status"
          />
          <MdOutlineDelete
            className="text-2xl font-semibold cursor-pointer text-red-600 hover:text-red-800 transition-colors duration-200"
            onClick={() => {
              setOneSubmission(row);
              setModalType("deleteSubmission");
              handleOpen();
            }}
            title="Delete Submission"
          />
        </div>
      ),
    },
  ];

  const renderFormData = (formData, submissionId) => {
    if (!formData) return <p className="text-gray-500">No form data available</p>;

    // Filter out duplicate fields that are already shown in header
    const excludeFields = ['eventType', 'email', 'mobileNumber'];
    
    // Clean the form data to remove duplicates and normalize field names
    const cleanedFormData = {};
    Object.entries(formData).forEach(([key, value]) => {
      // Remove the ID suffix from field names
      const cleanKey = key.split('_')[0];
      if (!excludeFields.includes(cleanKey) && !cleanedFormData[cleanKey]) {
        cleanedFormData[cleanKey] = value;
      }
    });
    
    return (
      <div className="space-y-4">
        {Object.entries(cleanedFormData)
          .map(([key, value], index) => {
            if (key === 'themeCards' && Array.isArray(value)) {
              return (
                <div key={`${key}-${index}`} className="border border-gray-200 rounded-lg p-3">
                  <h4 className="font-medium text-gray-800 mb-2">🎨 Selected Themes</h4>
                  <div className="flex flex-wrap gap-2">
                    {value.map((theme, index) => (
                      <span key={index} className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                        {theme}
                      </span>
                    ))}
                  </div>
                </div>
              );
            }
            
            if (key === 'foodMenu' && typeof value === 'object') {
              return (
                <div key={`${key}-${index}`} className="border border-gray-200 rounded-lg p-3">
                  <h4 className="font-medium text-gray-800 mb-2">🍽️ Food Menu</h4>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(value).map(([category, items]) => {
                      if (typeof items === 'object' && items !== null) {
                        return Object.entries(items).map(([course, courseItems]) => {
                          if (Array.isArray(courseItems)) {
                            return courseItems.map((item, itemIndex) => (
                              <span key={`${category}-${course}-${itemIndex}`} className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
                                {typeof item === 'string' ? item : item.name || item}
                              </span>
                            ));
                          }
                          return null;
                        });
                      }
                      return null;
                    }).flat().filter(Boolean)}
                  </div>
                </div>
              );
            }
            
            // Handle other form fields
            if (typeof value === 'object' && value !== null) {
              return (
                <div key={`${key}-${index}`} className="border border-gray-200 rounded-lg p-3">
                  <h4 className="font-medium text-gray-800 capitalize mb-2">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </h4>
                  <div className="text-gray-600">
                    {Array.isArray(value) ? (
                      <div className="flex flex-wrap gap-1">
                        {value.map((item, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                            {typeof item === 'object' ? JSON.stringify(item) : item}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <pre className="text-xs bg-gray-50 p-2 rounded overflow-x-auto">
                        {JSON.stringify(value, null, 2)}
                      </pre>
                    )}
                  </div>
                </div>
              );
            }
            
            return (
              <div key={`${key}-${index}`} className="border border-gray-200 rounded-lg p-3">
                <h4 className="font-medium text-gray-800 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </h4>
                <p className="text-gray-600">{value}</p>
              </div>
            );
          })}
      </div>
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Custom Event Submissions</h2>
        <div className="text-sm text-gray-500">
          Total: {allSubmissions.length} submissions
        </div>
      </div>
      
      <TableComponetWithApi
        columns={columns}
        data={allSubmissions}
        page={page}
        itemsPerPage={10}
        onPageChange={handlePageChange}
        totalPages={totalPages}
      />
      
      <ReusableModal open={open} onClose={handleClose} width={"80%"}>
        {modalType === "viewSubmission" && oneSubmission && (
          <div key={`submission-${oneSubmission._id}`} className="p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-primary">
              Submission Details
            </h2>
            
            <div className="space-y-6">
              {/* Header Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-lg font-medium text-blue-800 mb-2">Event Information</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <BiSolidCalendarEvent className="text-blue-600" />
                        <span className="font-medium">Event Type:</span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                          {oneSubmission.eventType}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">Template:</span>
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                          {oneSubmission.templateName}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">Status:</span>
                        <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                          oneSubmission.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          oneSubmission.status === 'approved' ? 'bg-green-100 text-green-800' :
                          oneSubmission.status === 'rejected' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {oneSubmission.status?.charAt(0).toUpperCase() + oneSubmission.status?.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-blue-800 mb-2">Contact Information</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <BiEnvelope className="text-blue-600" />
                        <span className="font-medium">Email:</span>
                        <span className="text-gray-600">
                          {maskSensitiveData(oneSubmission.userInfo?.email || oneSubmission.formData?.email, oneSubmission._id)}
                        </span>
                        <button
                          onClick={() => toggleSensitiveData(oneSubmission._id)}
                          className="p-1 text-gray-500 hover:text-gray-700"
                          title={showSensitiveData[oneSubmission._id] ? "Hide" : "Show"}
                        >
                          {showSensitiveData[oneSubmission._id] ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                      <div className="flex items-center space-x-2">
                        <BiPhone className="text-blue-600" />
                        <span className="font-medium">Phone:</span>
                        <span className="text-gray-600">
                          {maskSensitiveData(oneSubmission.userInfo?.mobileNumber || oneSubmission.formData?.mobileNumber, oneSubmission._id)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">Submitted:</span>
                        <span className="text-gray-600">
                          {formatDateTime(oneSubmission.submittedAt || oneSubmission.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Form Data */}
              <div key={`form-data-${oneSubmission._id}`}>
                <h3 className="text-lg font-medium text-gray-800 mb-4">Form Responses</h3>
                {renderFormData(oneSubmission.formData, oneSubmission._id)}
              </div>
            </div>
          </div>
        )}

        {modalType === "updateStatus" && oneSubmission && (
          <div className="p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-primary">
              Update Submission Status
            </h2>
            
            <div className="space-y-4">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-800 mb-2">Current Status</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  oneSubmission.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  oneSubmission.status === 'approved' ? 'bg-green-100 text-green-800' :
                  oneSubmission.status === 'rejected' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {oneSubmission.status?.charAt(0).toUpperCase() + oneSubmission.status?.slice(1)}
                </span>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-800 mb-3">Select New Status</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {['pending', 'approved', 'rejected', 'in_progress', 'completed'].map((status) => (
                    <button
                      key={status}
                      onClick={() => handleUpdateStatus(oneSubmission._id, status)}
                      disabled={isSubmitting || status === oneSubmission.status}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                        status === oneSubmission.status
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                          : status === 'approved'
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : status === 'rejected'
                          ? 'bg-red-100 text-red-800 hover:bg-red-200'
                          : status === 'in_progress'
                          ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                          : 'bg-purple-100 text-purple-800 hover:bg-purple-200'
                      }`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {modalType === "deleteSubmission" && oneSubmission && (
          <div className="p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-red-600">
              Delete Submission
            </h2>
            
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="font-medium text-red-800 mb-2">⚠️ Warning</h3>
                <p className="text-red-700">
                  Are you sure you want to delete this submission? This action cannot be undone.
                </p>
              </div>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-800 mb-2">Submission Details</h3>
                <p className="text-gray-600">
                  <strong>Event Type:</strong> {oneSubmission.eventType}
                </p>
                <p className="text-gray-600">
                  <strong>Template:</strong> {oneSubmission.templateName}
                </p>
                <p className="text-gray-600">
                  <strong>Submitted:</strong> {formatDateTime(oneSubmission.submittedAt || oneSubmission.createdAt)}
                </p>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleClose}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteSubmission}
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Deleting..." : "Delete Submission"}
                </button>
              </div>
            </div>
          </div>
        )}
      </ReusableModal>
    </div>
  );
}

export default AdminCustomEventSubmissions;
