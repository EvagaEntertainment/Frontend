import React, { useEffect, useRef, useState } from "react";
import {
  FaHome,
  FaUsers,
  FaClipboardList,
  FaUserShield,
  FaHeadset,
  FaRegMoneyBillAlt,
  FaBorderAll,
  FaRegNewspaper,
} from "react-icons/fa";
import { TfiWrite } from "react-icons/tfi";
import { RiCoupon3Line } from "react-icons/ri";
import MainLogo from "../../assets/Temporary Images/Evaga Logo.png";
import { TbBrandBlogger, TbBrandBooking, TbReport } from "react-icons/tb";
import { useAuth } from "../../context/AuthContext";
import { BiMessageAltError, BiSolidCalendarEvent } from "react-icons/bi";
import {
  FaChevronDown,
  FaFirstOrder,
  FaFirstOrderAlt,
  FaRegImage,
  FaWpforms,
} from "react-icons/fa6";
import { GrCompliance } from "react-icons/gr";
import { motion, AnimatePresence } from "framer-motion";
import {
  MdAttachMoney,
  MdBorderClear,
  MdEventNote,
  MdOutlineFeed,
  MdRateReview,
} from "react-icons/md";
import { LuGalleryThumbnails } from "react-icons/lu";
// import { IoArrowBackSharp } from "react-icons/io5";
import { IoMdArrowForward } from "react-icons/io";
import { useSelector } from "react-redux";

const dropdownVariants = {
  hidden: {
    height: 0,
    opacity: 0,
    transition: {
      height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
      opacity: { duration: 0.2, ease: "easeOut" },
    },
  },
  visible: {
    height: "auto",
    opacity: 1,
    transition: {
      height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
      opacity: { duration: 0.25, delay: 0.05, ease: "easeIn" },
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.04,
      duration: 0.25,
      ease: [0.4, 0, 0.2, 1],
    },
  }),
  exit: { opacity: 0, x: -8, transition: { duration: 0.15 } },
};

const AdminSideBar = ({ selectedMenu, onMenuSelect }) => {
  const { logout, auth } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { details } = useSelector((state) => state.admin);
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);

  const handleDropdownToggle = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const menuItems = [
    { id: "Home", label: "Home", icon: <FaHome /> },
    {
      id: "User Management",
      label: "User Management",
      icon: <FaUsers />,
      children: [
        { id: "Vendor", label: "Vendor", icon: <FaUsers /> },
        { id: "Client", label: "Client", icon: <FaClipboardList /> },
        { id: "All Services", label: "All Services", icon: <MdEventNote /> },
        { id: "Waitlist", label: "Waitlist", icon: <MdOutlineFeed /> },
      ],
    },
    {
      id: "Website Management",
      label: "Website Management",
      icon: <FaRegMoneyBillAlt />,
      children: [
        { id: "Banner", label: "Banner", icon: <FaRegImage /> },
        { id: "Gallery", label: "Gallery", icon: <LuGalleryThumbnails /> },
        { id: "AdminCustomEvent", label: "Custom Event", icon: <BiSolidCalendarEvent /> },
        { id: "Coupons", label: "Coupons", icon: <RiCoupon3Line /> },
        {
          id: "Fee Breakdown by Category",
          label: "Fee Breakdown by Category",
          icon: <FaRegMoneyBillAlt />,
        },
        {
          id: "Gst by Category",
          label: "GST by Category",
          icon: <MdAttachMoney />,
        },
        {
          id: "Testimonial",
          label: "Testimonial",
          icon: <MdRateReview />,
        },
      ],
    },
    {
      id: "Catalog Management",
      label: "Catalog Management",
      icon: <FaBorderAll />,
      children: [
        { id: "Categories", label: "Categories", icon: <FaBorderAll /> },
        { id: "Attributes", label: "Attributes (Filters)", icon: <FaClipboardList /> },
        { id: "Products", label: "Products", icon: <TbBrandBooking /> },
      ],
    },
    {
      id: "Orders",
      label: "Orders",
      icon: <FaRegMoneyBillAlt />,
      children: [
        { id: "New Orders", label: "New Orders", icon: <FaBorderAll /> },
        {
          id: "Confirmed Orders",
          label: "Confirmed Orders",
          icon: <FaFirstOrder />,
        },
        {
          id: "Ongoing Orders",
          label: "Ongoing Orders",
          icon: <FaFirstOrderAlt />,
        },
        {
          id: "Completed Orders",
          label: "Completed Orders",
          icon: <GrCompliance />,
        },
        {
          id: "Cancelled Orders",
          label: "Cancelled Orders",
          icon: <MdBorderClear />,
        },
      ],
    },
    {
      id: "Reports",
      label: "Reports Center",
      icon: <TbReport />,
      children: [
        {
          id: "Vendor Reports",
          label: "Vendor Reports",
          icon: <FaBorderAll />,
        },
        {
          id: "Customer Reports",
          label: "Customer Reports",
          icon: <FaFirstOrder />,
        },
        {
          id: "Booking Reports",
          label: "Booking Reports",
          icon: <FaWpforms />,
        },
        {
          id: "Payment Financial Reports",
          label: "Payment Financial Reports",
          icon: <FaWpforms />,
        },
      ],
    },
    {
      id: "WriteSpace",
      label: "Write Space",
      icon: <TfiWrite />,
      children: [
        {
          id: "Blog",
          label: "Blog",
          icon: <TbBrandBlogger />,
        },
        {
          id: "NewsLetter",
          label: "News Letter",
          icon: <FaRegNewspaper />,
        },
      ],
    },
    {
      id: "SupportCenter",
      label: "Support Center",
      icon: <FaHeadset />,
      children: [
        {
          id: "Customer Query",
          label: "Customer Query",
          icon: <FaBorderAll />,
        },
        {
          id: "Vendor Query",
          label: "Vendor Query",
          icon: <FaFirstOrder />,
        },
        { id: "Feedback", label: "Feedback Form", icon: <FaWpforms /> },
        { id: "BookingCTA", label: "Booking CTA", icon: <TbBrandBooking /> },
        { id: "AdminCustomEventSubmissions", label: "Event Submissions", icon: <FaWpforms /> },
      ],
    },
    { id: "Admin Users", label: "Roles", icon: <FaUserShield /> },
    { id: "Error Logs", label: "Error Logs", icon: <BiMessageAltError /> },
  ];

  const filterMenuItems = (role, permissions) => {
    const parsedPermissions =
      typeof permissions === "string" ? JSON.parse(permissions) : permissions;

    return menuItems.filter((item) => {
      // Always exclude "Home" for sub_admin unless explicitly allowed
      if (role === "sub_admin" && item.id === "Home") {
        return false;
      }

      if (role === "admin") {
        return true; // Show all items for admin
      }

      if (role === "sub_admin" && parsedPermissions.includes("superadmin")) {
        return true; // Show all items for sub_admin with superadmin permission
      }

      if (role === "sub_admin") {
        if (parsedPermissions.includes("ContentModerator")) {
          return (
            item.id === "User Management" &&
            item.children?.some((child) => child.id === "All Services")
          );
        }
        if (parsedPermissions.includes("support")) {
          return item.id === "SupportCenter";
        }
        if (parsedPermissions.includes("marketingandPromotions")) {
          return item.id === "Website Management";
        }
        if (parsedPermissions.includes("vendorManager")) {
          return item.id === "User Management";
        }
        if (parsedPermissions.includes("eventManager")) {
          return item.id === "Orders";
        }
      }

      return false;
    });
  };

  const filteredMenuItems = filterMenuItems(details?.role, details?.permissions);

  return (
    <motion.div
      className="bg-primary text-white sticky top-0 h-full min-h-[100vh] flex flex-col overflow-hidden flex-shrink-0"
      animate={{ width: isCollapsed ? 80 : 256 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="py-6 text-center pl-2 text-xl font-bold border-b border-purple-500/40">
        <img className="w-[40px] mx-auto" src={MainLogo} alt="Evaga" />
      </div>

      <motion.button
        className="flex items-center justify-center p-4 focus:outline-none"
        onClick={() => setIsCollapsed(!isCollapsed)}
        whileHover={{ backgroundColor: "rgba(147, 51, 234, 0.5)" }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        <motion.span
          animate={{ rotate: isCollapsed ? 0 : 180 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        >
          <IoMdArrowForward />
        </motion.span>
      </motion.button>

      {/* Menu Items */}
      <nav
        className="flex flex-col flex-grow overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-purple-500/30"
        ref={dropdownRef}
      >
        {filteredMenuItems.map((item) =>
          item.children ? (
            <div className="w-full" key={item.id}>
              <motion.button
                className={`w-full flex items-center justify-between px-6 py-3.5 text-left font-medium focus:outline-none ${selectedMenu === item.id || openDropdown === item.id
                  ? "bg-purple-600/80"
                  : ""
                  }`}
                onClick={() => handleDropdownToggle(item.id)}
                whileHover={{ backgroundColor: "rgba(147, 51, 234, 0.5)" }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center whitespace-nowrap">
                  <span className="mr-3 text-lg flex-shrink-0">{item.icon}</span>
                  <AnimatePresence>
                    {!isCollapsed && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden text-sm"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
                {!isCollapsed && (
                  <motion.span
                    className="ml-auto flex-shrink-0"
                    animate={{ rotate: openDropdown === item.id ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <FaChevronDown size={12} />
                  </motion.span>
                )}
              </motion.button>

              <AnimatePresence initial={false}>
                {openDropdown === item.id && (
                  <motion.div
                    className="flex flex-col overflow-hidden bg-purple-900/30"
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    {item.children.map((child, i) => (
                      <motion.button
                        key={child.id}
                        custom={i}
                        variants={childVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className={`flex items-center pl-10 pr-6 py-3 text-left text-sm font-medium focus:outline-none whitespace-nowrap ${selectedMenu === child.id
                          ? "bg-purple-600/80 border-l-2 border-white"
                          : "border-l-2 border-transparent"
                          }`}
                        onClick={() => onMenuSelect(child.id)}
                        whileHover={{
                          backgroundColor: "rgba(147, 51, 234, 0.5)",
                          paddingLeft: 44,
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <span className="mr-3 text-base flex-shrink-0">{child.icon}</span>
                        <AnimatePresence>
                          {!isCollapsed && (
                            <motion.span
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.15 }}
                            >
                              {child.label}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <motion.button
              key={item.id}
              className={`flex items-center px-6 py-3.5 text-left font-medium focus:outline-none whitespace-nowrap ${selectedMenu === item.id ? "bg-purple-600/80" : ""
                }`}
              onClick={() => onMenuSelect(item.id)}
              whileHover={{ backgroundColor: "rgba(147, 51, 234, 0.5)" }}
              transition={{ duration: 0.2 }}
            >
              <span className="mr-3 text-lg flex-shrink-0">{item.icon}</span>
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden text-sm"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          )
        )}
      </nav>

      {/* Logout */}
      <div className="border-t border-purple-500/40">
        <motion.button
          className="w-full flex items-center px-6 py-4 text-left text-white focus:outline-none"
          onClick={logout}
          whileHover={{ backgroundColor: "rgba(147, 51, 234, 0.5)" }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
        >
          <span className="mr-3 text-lg flex-shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 4a1 1 0 011-1h10a1 1 0 011 1v2a1 1 0 11-2 0V5H5v10h8v-1a1 1 0 112 0v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm10.707 5.707a1 1 0 10-1.414-1.414L10 10.586 8.707 9.293a1 1 0 10-1.414 1.414l2 2a1 1 0 001.414 0l2-2z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                Log out
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default AdminSideBar;
