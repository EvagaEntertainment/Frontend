'use client';
import React, { useEffect, useState } from "react";
import useServices from "../../hooks/useServices";
import adminActionsApi from "../../services/adminActionsApi";
import TableComponetWithApi from "../../utils/TableComponetWithApi";
import { formatDate } from "../../utils/formatDate";
import useDebounce from "../../utils/useDebounce";
import { formatDateTime } from "../../utils/formatDateTime";
import ReusableModal from "../Modal/Modal";
import DateRangePicker from "../../utils/DateRangePicker";
function BookingCTA({ term }) {
  const [page, setPage] = useState(1);
  const [allErrorLogs, setAllErrorLogs] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const debounce = useDebounce(term);
  const getAllBookingCtaApi = useServices(adminActionsApi.getAllBookingCta);
  const exportBookingCtaApi = useServices(adminActionsApi.exportBookingCta);
  const markAsReadBookingCtaApi = useServices(adminActionsApi.markAsReadBookingCta);

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const downloadBookingCSVApiHandle = async (fromDate, toDate) => {
    const queryParams = {
      startDate: fromDate || "",
      endDate: toDate || "",
    };
    try {
      const response = await exportBookingCtaApi.callApi(queryParams);

      if (response && response) {
        const blob = new Blob([response], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "bookings.csv";
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        console.error("No data received for CSV download");
      }
    } catch (error) {
      console.error("Error downloading CSV:", error);
    }
  };
  const getAllErrorLogsApiHandle = async () => {
    const queryParams = {
      search: debounce || "",
      page: page || 1,
      // sortOrder: sortvalue || "asc",
    };

    const response = await getAllBookingCtaApi.callApi(queryParams);
    setAllErrorLogs(response ? response?.data : []);
    setTotalPages(response ? response?.totalPages : 1);
  };

  const handleToggleReadStatus = async (row) => {
    try {
      const response = await markAsReadBookingCtaApi.callApi(row._id);
      if (response && response.success) {
        setAllErrorLogs((prevLogs) => 
          prevLogs.map((log) => 
            log._id === row._id ? { ...log, isRead: !log.isRead } : log
          )
        );
      } else {
         console.error("Failed to update status");
      }
    } catch (error) {
       console.error(error);
    }
  };

  useEffect(() => {
    getAllErrorLogsApiHandle();
  }, [page, debounce]);
  const columns = [
    { label: "No", key: "index", render: (_, i) => i + 1 },
    {
      label: "Name",
      key: "name",
    },
    {
      label: "Phone Number",
      key: "phone",
    },
    {
      label: "Email",
      key: "email",
    },
    {
      label: "Event Type",
      key: "eventType",
    },
    // {
    //   label: "Event Date",
    //   key: "preferredDate",
    //   render: (row) => row?.preferredDate ?? "",
    // },
    {
      label: "Event Month",
      key: "eventMonth",
    },
    {
      label: "Event Location",
      key: "eventLocation",
    },  {
      label: "Sku Code",
      key: "sku",
    },
    {
      label: "Form Submitted Date",
      key: "preferredDate",
      render: (row) => formatDateTime(row?.createdAt),
    },
    {
      label: "Read Submissions",
      key: "isRead",
      render: (row) => (
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={row?.isRead || false}
            onChange={() => handleToggleReadStatus(row)}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
        </label>
      ),
    },
  ];
  return (
    <div>
      <button
        onClick={() => handleOpenModal()}
        className="float-right btn-primary w-fit px-2 mb-2"
      >
        Download
      </button>
      <TableComponetWithApi
        columns={columns}
        data={allErrorLogs}
        page={page}
        itemsPerPage={10}
        onPageChange={handlePageChange}
        totalPages={totalPages}
      />
      <ReusableModal
        open={openModal}
        onClose={handleCloseModal}
        title="Select Date Range"
      >
        <div className="w-full flex items-center justify-center">
          <DateRangePicker onSearch={downloadBookingCSVApiHandle} />
        </div>
      </ReusableModal>
    </div>
  );
}

export default BookingCTA;
