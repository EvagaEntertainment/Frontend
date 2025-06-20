import React, { useEffect, useState } from "react";
import TableComponet from "../../utils/TableComponet";
import { useDispatch } from "react-redux";
import useServices from "../../hooks/useServices";
import { MdOutlineDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import adminActionsApi from "../../services/adminActionsApi";
import { formatDate } from "../../utils/formatDate";
import commonApis from "../../services/commonApis";

function FeedbackTable() {
  const [page, setPage] = useState(1);
  const getAllFeedBackApi = useServices(commonApis.getAllFeedBack);
  const [feedback, setFeedback] = useState([]);
  const dispatch = useDispatch();
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const getAllFeedBackFormHandle = async () => {
    const response = await getAllFeedBackApi.callApi();
    setFeedback(response ? response?.data : []);
  };
  useEffect(() => {
    getAllFeedBackFormHandle();
  }, []);
  const columns = [
    { label: "No", key: "index", render: (_, i) => i + 1 },
    {
      label: "Event Type",
      key: "eventType",
    },
    {
      label: "Heard From",
      key: "heardAbout",
    },

    {
      label: "Response Time",
      key: "responseTime",

    },
    {
      label: "Pricing Clarity",
      key: "pricingClarity",
    },
    {
      label: "Booking Process",
      key: "bookingProcess",
    },
    {
      label: "Customer Care",
      key: "customerCare",
    },
    {
      label: "Event Execution",
      key: "eventExecution",
    },
    {
      label: "Recommend",
      key: "recommend",
    },
    {
      label: "Suggestions",
      key: "suggestions",
    },
    // {
    //   label: "Action",
    //   key: "interests",
    //   render: (row) => (
    //     <div className="flex items-center justify-center gap-2">
    //       <CiEdit
    //         className="text-3xl font-semibold cursor-pointer text-textGray"
    //         onClick={() => [
    //           // handleOpen(),
    //           // setModalType("editCoupon"),
    //           // getOneCouponsHandle(row?._id),
    //         ]}
    //       />
    //       <MdOutlineDelete
    //         className="text-3xl font-semibold cursor-pointer text-textGray"
    //         onClick={() => [
    //           // handleOpen(),
    //           // setModalType("deleteCoupon"),
    //           // setCouponId(row?._id),
    //         ]}
    //       />
    //     </div>
    //   ),
    // },
  ];
  return (
    <div>
      <TableComponet
        columns={columns}
        data={feedback}
        page={page}
        itemsPerPage={10}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default FeedbackTable;
