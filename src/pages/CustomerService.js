import React, { useEffect, useState } from "react";
import AccordionCard from "../components/Cards/AccordionCard";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NonOrderRelatedQuery from "../components/Cards/NonOrderRelatedQuery";
import useServices from "../hooks/useServices";
import commonApis from "../services/commonApis";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { internalRoutes } from "../utils/internalRoutes";
function CustomerService() {
  const [activeTab, setActiveTab] = useState("faq");
  const [expanded, setExpanded] = useState(null);
  const userId = Cookies.get("userId");
  const location = useLocation();
  const navigate = useNavigate();
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };
  const email = "info@evagaentertainment.com";
  const subject = "Support Request";
  const body = "Hello Support Team,\n\nI need assistance with...";

  const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    email
  )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  const faqData = [
    {
      category: "Orders & Bookings",
      items: [
        {
          question: "How do I book a birthday celebration with Eevagga?",
          answer:
            "You can explore our website and submit a booking request, or connect with our team directly. We’ll guide you through themes, customization, and final planning.",
        },
        {
          question: "Can I modify my booking after confirmation?",
          answer:
            "Yes, certain changes can be accommodated based on timelines and availability. We recommend informing our team as early as possible for smooth coordination.",
        },
        {
          question: "Do you take last-minute bookings?",
          answer:
            "We try our best to accommodate urgent requests. Availability depends on the type of setup and resources required.",
        },
      ],
    },
    {
      category: "Delivery & Products",
      items: [
        {
          question: "How long does it take to deliver Eevagga products?",
          answer:
            "Delivery timelines vary based on your location and the product ordered. Standard delivery timelines will be shared during checkout.",
        },
        {
          question: "Do you offer same-day delivery?",
          answer:
            "Selected products and decoration kits may be available for quick or same-day delivery in certain locations.",
        },
        {
          question: "Can I track my order?",
          answer:
            "Yes, once your order is confirmed, you will receive tracking details (where applicable).",
        },
      ],
    },
    {
      category: "Returns & Refunds",
      items: [
        {
          question: "Can I cancel or reschedule my booking?",
          answer:
            "Cancellations and rescheduling are subject to timelines and booking terms. Our team will guide you based on your specific case.",
        },
        {
          question: "Do you offer refunds on products?",
          answer:
            "Refunds are applicable in case of damaged or incorrect items. Please contact our support team within the specified time after delivery.",
        },
        {
          question: "What if there is an issue with my order or setup?",
          answer:
            "We take quality seriously. If something isn’t right, our team will work quickly to resolve it and ensure your experience meets Eevagga standards.",
        },
      ],
    },
    {
      category: "Customization & Services",
      items: [
        {
          question: "Can I request a fully customized birthday theme?",
          answer:
            "Yes. We specialize in creating custom birthday experiences tailored to your preferences, theme, and budget.",
        },
        {
          question: "Do you help with small home celebrations as well?",
          answer:
            "Absolutely. We cater to both intimate home setups and large-scale birthday events.",
        },
      ],
    },
  ];

  const CreateQueryApi = useServices(commonApis.CreateQuery);
  const CreateQueryApiHandle = async (data) => {
    if (!userId) {
      localStorage.setItem(
        "pendingQuery",
        JSON.stringify({
          subject: data?.subject,
          query: data?.query,
          redirectPath: location.pathname + (location.search || ""),
        })
      );

      navigate(
        `${internalRoutes.userLogin}?redirect=${encodeURIComponent(
          location.pathname + (location.search || "")
        )}`
      );
      return;
    }

    try {
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("role", "User");
      formData.append("subject", data?.subject);
      formData.append("query", data?.query);

      const response = await CreateQueryApi.callApi(formData);

      if (response) {
        toast.success("Query Submitted successfully!");
      } else {
        toast.error("Failed to create query. Please try again later.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    }
  };

  useEffect(() => {
    const pendingQuery = localStorage.getItem("pendingQuery");

    if (userId && pendingQuery) {
      const queryData = JSON.parse(pendingQuery);

      // Add a submission flag to prevent multiple submissions
      if (!queryData.submitted) {
        queryData.submitted = true; // Mark as submitted
        localStorage.setItem("pendingQuery", JSON.stringify(queryData));

        // Automatically submit the stored query
        (async () => {
          try {
            const formData = new FormData();
            formData.append("userId", userId);
            formData.append("role", "User");
            formData.append("subject", queryData.subject);
            formData.append("query", queryData.query);

            const response = await CreateQueryApi.callApi(formData);

            if (response) {
              toast.success("Query Submitted successfully!");
              localStorage.removeItem("pendingQuery"); // Clear localStorage after successful submission
              navigate(queryData.redirectPath || "/");
            } else {
              toast.error("Failed to create query. Please try again later.");
            }
          } catch (error) {
            toast.error("An error occurred while submitting the query.");
          }
        })();
      }
    }
  }, [userId]);

  return (
    <>
      <div className="flex flex-col md:flex-row items-start justify-between gap-5 px-5 py-5 md:px-[2%] md:py-[2%] w-full">
        <div className="flex-[0.28] flex flex-col gap-2">
          <h3 className="text-primary text-xl font-semibold">Eevagga Support</h3>
          <hr />
          {/* <p
          className={
            activeTab === "orderRelQry"
              ? "text-primary cursor-pointer font-medium"
              : "text-textGray cursor-pointer font-medium"
          }
          onClick={() => setActiveTab("orderRelQry")}
        >
          Order Related Query
        </p>{" "} */}
          <p
            className={"text-textGray cursor-pointer font-medium"}
            // onClick={() => setActiveTab("orderRelQry")}
          >
            <Link
              to={"https://whatsapp.com/channel/0029VaWXX585fM5adzGAzC1C"}
              target="_blank"
            >
              Whatsapp Support
            </Link>
          </p>{" "}
          <p
            className={"text-textGray cursor-pointer font-medium"}
            onClick={() => window.open(gmailLink, "_blank")}
          >
            Email Support
          </p>{" "}
          <p
            className={"text-textGray cursor-pointer font-medium"}
            onClick={() => (window.location.href = "tel:+918296157611")}
          >
            Click To Call
          </p>
          <p
            className={
              activeTab === "nonOrderRelQry"
                ? "text-primary cursor-pointer font-medium"
                : "text-textGray cursor-pointer font-medium"
            }
            onClick={() => setActiveTab("nonOrderRelQry")}
          >
            Send Your Query
          </p>
          <p
            className={
              activeTab === "faq"
                ? "text-primary cursor-pointer font-medium"
                : "text-textGray cursor-pointer font-medium"
            }
            onClick={() => setActiveTab("faq")}
          >
            Frequently Asked Questions(FAQs)
          </p>
          <p className={"text-textGray cursor-pointer font-medium"}>
            Call Us : +91 82961 57611
          </p>{" "}
          <p className={"text-textGray cursor-pointer font-medium"}>
            Email Us : info@evagaentertainment.com
          </p>
          <hr />
        </div>
        <div className=" flex-1 md:flex-[0.67] w-full">
          {activeTab === "nonOrderRelQry" && (
            <NonOrderRelatedQuery saveForm={CreateQueryApiHandle} />
          )}
          {activeTab === "faq" && (
            <div className="flex flex-col gap-6">
              {/* <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold text-primary">Customer Support</h1>
              <p className="text-textGray text-lg">
                We’re here to make your celebration experience seamless from start to finish.
                If you need any assistance, our team is always ready to help.
              </p>
            </div> */}

              <div className="mt-4">
                <h2 className="text-xl font-semibold text-primary mb-6 border-b pb-2">
                  Frequently Asked Support Questions
                </h2>

                {faqData.map((category, catIndex) => (
                  <div key={catIndex} className="mb-8">
                    <h3 className="text-lg font-bold text-primary mb-4 bg-gray-50 p-2 rounded">
                      {category.category}
                    </h3>
                    <div className="flex flex-col gap-2">
                      {category.items.map((item, index) => {
                        const panelId = `panel-${catIndex}-${index}`;
                        return (
                          <AccordionCard
                            key={panelId}
                            title={item.question}
                            summary={item.answer}
                            isExpanded={expanded === panelId}
                            onToggle={handleChange(panelId)}
                            panelId={panelId}
                            sn={index + 1}
                          />
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      {activeTab === "faq" && (
        <p className="mt-5 mb-10 text-xl font-medium text-primary text-center italic border-t pt-8 leading-relaxed max-w-4xl mx-auto px-5">
          At Eevagga, we don’t just plan celebrations — we ensure every
          experience is smooth, thoughtful, and memorable.
        </p>
      )}
    </>
  );
}

export default CustomerService;
