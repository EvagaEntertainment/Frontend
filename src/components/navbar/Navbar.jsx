'use client';
import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes, FaHome, FaInfoCircle, FaPhone, FaStar, FaChevronDown, FaChevronUp } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { internalRoutes } from "../../utils/internalRoutes";

function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: internalRoutes.home, icon: <FaHome /> },
    { name: "About Us", path: internalRoutes.aboutUs, icon: <FaInfoCircle /> },
    { name: "Our Services", path: internalRoutes.ourServices, icon: <FaPhone /> },
  ];

  const celebrationLinks = [
    { name: "Birthday Planner Bangalore", path: "/birthday-planner-bangalore" },
    { name: "Kids Birthday Planner", path: "/kids-birthday-planner-bangalore" },
    { name: "Birthday Decoration", path: "/birthday-decoration-bangalore" },
    { name: "Celebration At Home", path: "/birthday-celebration-at-home-bangalore" },
    { name: "Luxury Birthday Planner", path: "/luxury-birthday-planner-bangalore" },
    { name: "Premium Birthday Planner", path: "/premium-birthday-planner" },
    { name: "Premium House Warming", path: "/premium-house-warming-planner" },
    { name: "Premium Baby Shower", path: "/premium-baby-shower-planner" },
    { name: "Premium Birthday End-to-End", path: "/premium-birthday-end-to-end-planner" },
  ];

  const toggleMenu = () => {
    if (!isOpen) {
      setMenuVisible(true);
    }
    setIsOpen((prev) => !prev);
  };

  const menuVariants = {
    open: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
    closed: { opacity: 0, x: "100%", transition: { duration: 0.3 } },
  };

  const linkVariants = {
    hover: { color: "#FFE500", y: -2, transition: { type: "spring", stiffness: 400, damping: 10, duration: 0.3 } },
    tap: { scale: 0.95, transition: { duration: 0.2 } },
  };

  const handleAnimationComplete = () => {
    if (!isOpen) {
      setMenuVisible(false);
    }
  };

  useEffect(() => {
    setIsOpen(false);
    setDropdownOpen(false);
    setMobileDropdownOpen(false);
  }, [pathname]);

  const isCelebrationActive = celebrationLinks.some(l => pathname === l.path);

  return (
    <nav className="bg-[#6A1B9A] w-full z-50 border-b border-[#FFE500]/20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link href={internalRoutes.home} className="flex items-center">
            <img
              src={process.env.NEXT_PUBLIC_API_Aws_Image_BASE_URL + "gallery/1749377446139_Eevagga_yellow.webp"}
              alt="Eevagga Logo"
              className="h-10 md:h-10 object-contain"
            />
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-10 items-center">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.name}
                href={link.path}
                className={`relative text-sm font-medium ${
                  isActive ? "text-[#FFE500]" : "text-white"
                }`}
              >
                <motion.span
                  className="inline-block"
                  variants={linkVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="activeIndicator"
                      className="absolute left-0 -bottom-1 w-full h-0.5 bg-[#FFE500]"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.span>
              </Link>
            );
          })}

          {/* Celebrations Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button
              className={`flex items-center gap-1.5 text-sm font-medium transition-colors duration-200 cursor-pointer ${
                isCelebrationActive ? "text-[#FFE500]" : "text-white hover:text-[#FFE500]"
              }`}
            >
              <FaStar className="text-xs" />
              Celebrations
              <FaChevronDown className={`text-[10px] transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2.5 z-50 origin-top-left"
                >
                  {celebrationLinks.map((subLink) => {
                    const isSubActive = pathname === subLink.path;
                    return (
                      <Link
                        key={subLink.name}
                        href={subLink.path}
                        className={`block px-4 py-2 text-sm transition-colors duration-150 ${
                          isSubActive
                            ? "bg-[#6A1B9A]/10 text-[#6A1B9A] font-semibold"
                            : "text-gray-700 hover:bg-gray-50 hover:text-[#6A1B9A]"
                        }`}
                      >
                        {subLink.name}
                      </Link>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Hamburger Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="md:hidden text-white p-3 focus:outline-none"
          onClick={toggleMenu}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </motion.button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuVisible && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isOpen ? 1 : 0 }}
                exit={{ opacity: 0 }}
                className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                onClick={toggleMenu}
                style={{ pointerEvents: isOpen ? "auto" : "none" }}
              />

              <motion.div
                initial="closed"
                animate={isOpen ? "open" : "closed"}
                exit="closed"
                variants={menuVariants}
                onAnimationComplete={handleAnimationComplete}
                className="md:hidden fixed top-0 right-0 h-full w-4/5 max-w-sm bg-[#6A1B9A] shadow-2xl z-50 flex flex-col"
              >
                <div className="p-4 flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-white p-2"
                    onClick={toggleMenu}
                  >
                    <FaTimes size={28} />
                  </motion.button>
                </div>

                <div className="flex-grow overflow-y-auto p-6 space-y-2">
                  {navLinks.map((link) => {
                    const isActive = pathname === link.path;
                    return (
                      <Link
                        key={link.name}
                        href={link.path}
                        className={`flex items-center text-base font-medium py-3 px-4 rounded-xl transition-all ${
                          isActive
                            ? "text-[#FFE500] bg-[#FFE500]/20"
                            : "text-white hover:bg-[#FFE500]/20"
                        }`}
                        onClick={toggleMenu}
                      >
                        <span className="mr-3 text-lg">{link.icon}</span>
                        <span className="flex-grow">{link.name}</span>
                        {isActive && (
                          <motion.span
                            layoutId="mobileActiveIndicator"
                            className="ml-2 w-2.5 h-2.5 rounded-full bg-[#FFE500]"
                            initial={false}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        )}
                      </Link>
                    );
                  })}

                  {/* Mobile Celebrations Accordion */}
                  <div className="space-y-1">
                    <button
                      onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                      className={`flex items-center justify-between w-full text-base font-medium py-3 px-4 rounded-xl transition-all ${
                        isCelebrationActive
                          ? "text-[#FFE500] bg-[#FFE500]/20"
                          : "text-white hover:bg-[#FFE500]/20"
                      }`}
                    >
                      <span className="flex items-center">
                        <span className="mr-3 text-lg"><FaStar /></span>
                        <span>Celebrations</span>
                      </span>
                      <FaChevronDown className={`text-xs transition-transform duration-200 ${mobileDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence initial={false}>
                      {mobileDropdownOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden pl-8 space-y-1"
                        >
                          {celebrationLinks.map((subLink) => {
                            const isSubActive = pathname === subLink.path;
                            return (
                              <Link
                                key={subLink.name}
                                href={subLink.path}
                                className={`block text-sm py-2.5 px-4 rounded-lg transition-all ${
                                  isSubActive
                                    ? "text-[#FFE500] font-semibold bg-[#FFE500]/10"
                                    : "text-white/80 hover:text-white hover:bg-[#FFE500]/10"
                                }`}
                                onClick={toggleMenu}
                              >
                                {subLink.name}
                              </Link>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

export default Navbar;
