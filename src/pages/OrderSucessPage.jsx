'use client';
import React, { useEffect } from "react";
import successImage from "../assets/Temporary Images/badge-check 1.png";
import { useRouter } from "next/router";
import useServices from "../hooks/useServices";
import orderApis from "../services/orderApis";

function OrderSucessPage() {
  const router = useRouter();
  const { order_id } = router.query;
  const getPaymentDetailsByOrderIdApi = useServices(
    orderApis.getPaymentDetailsByOrderId
  );
  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        if (order_id) {
          const response = await getPaymentDetailsByOrderIdApi.callApi(order_id);
          console.log("Payment Details:", response);
        }
      } catch (error) {
        console.error("Error fetching payment details:", error);
      }
    };

    fetchPaymentDetails();
  }, [order_id]); 

  return (
    <div className="w-full min-h-[50vh] flex items-center justify-center flex-col gap-2">
      <img
        src={successImage?.src || successImage}
        alt="success"
        className="object-contain h-[3rem]"
      />
      <h2 className="text-2xl font-medium text-primary">
        {" "}
        Your Order has been Placed
      </h2>
    </div>
  );
}

export default OrderSucessPage;
