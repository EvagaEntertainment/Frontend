'use client';
import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes, FaHome, FaInfoCircle, FaPhone, FaChevronDown, FaChevronUp } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "../../assets/Temporary Images/Eevagga_yellow.webp";
import { internalRoutes } from "../../utils/internalRoutes";

const celebrationLinks = [
  { name: "Birthday Planner", path: "/birthday-planner-bangalore" },
  { name: "Kids Birthday", path: "/kids-birthday-planner-bangalore" },
  { name: "Birthday Decoration", path: "/birthday-decoration-bangalore" },
  { name: "House Warming", path: "/premium-house-warming-planner" },
  { name: "Baby Shower", path: "/premium-baby-shower-planner" },
  { name: "Browse All Packages", path: internalRoutes.viewAllPage },
];

function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [celebrationsOpen, setCelebrationsOpen] = useState(false);
  const [mobileCelebrationsOpen, setMobileCelebrationsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navLinks = [
    { name: "Home", path: internalRoutes.home, icon: <FaHome /> },
    { name: "About Us", path: internalRoutes.aboutUs, icon: <FaInfoCircle /> },
    { name: "Our Services", path: internalRoutes.ourServices, icon: <FaPhone /> },
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
    setMobileCelebrationsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setCelebrationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link key={link.name} href={link.path} className={`relative text-sm font-medium ${isActive ? "text-[#FFE500]" : "text-white"}`}>
                <motion.span className="inline-block" variants={linkVariants} whileHover="hover" whileTap="tap">
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="activeIndicator"
                      className="absolute left-0 -bottom-1 w-full h-0.5 bg-[#FFE500] text-sm"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.span>
              </Link>
            );
          })}

          {/* Celebrations Dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              className={`flex items-center gap-1 text-sm font-medium ${isCelebrationActive ? "text-[#FFE500]" : "text-white"} focus:outline-none`}
              onMouseEnter={() => setCelebrationsOpen(true)}
              onMouseLeave={() => setCelebrationsOpen(false)}
              onClick={() => setCelebrationsOpen(prev => !prev)}
            >
              <motion.span variants={linkVariants} whileHover="hover" className="inline-block">
                Celebrations
              </motion.span>
              <FaChevronDown size={11} className={`transition-transform duration-200 ${celebrationsOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {celebrationsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.18 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-52 bg-white rounded-xl shadow-xl overflow-hidden z-50"
                  onMouseEnter={() => setCelebrationsOpen(true)}
                  onMouseLeave={() => setCelebrationsOpen(false)}
                >
                  {celebrationLinks.map((link) => (
                    <Link
                      key={link.path}
                      href={link.path}
                      className={`block px-4 py-2.5 text-sm font-medium transition-colors ${pathname === link.path ? 'bg-[#6A1B9A] text-[#FFE500]' : 'text-gray-800 hover:bg-[#6A1B9A] hover:text-white'}`}
                    >
                      {link.name}
                    </Link>
                  ))}
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
                        className={`flex items-center text-base font-medium py-3 px-4 rounded-xl transition-all ${isActive ? "text-[#FFE500] bg-[#FFE500]/20" : "text-white hover:bg-[#FFE500]/20"}`}
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
                  <div>
                    <button
                      className={`flex items-center w-full text-base font-medium py-3 px-4 rounded-xl transition-all ${isCelebrationActive ? "text-[#FFE500] bg-[#FFE500]/20" : "text-white hover:bg-[#FFE500]/20"}`}
                      onClick={() => setMobileCelebrationsOpen(prev => !prev)}
                    >
                      <span className="mr-3 text-lg">🎉</span>
                      <span className="flex-grow">Celebrations</span>
                      {mobileCelebrationsOpen ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
                    </button>

                    <AnimatePresence>
                      {mobileCelebrationsOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.22 }}
                          className="overflow-hidden pl-4"
                        >
                          {celebrationLinks.map((link) => (
                            <Link
                              key={link.path}
                              href={link.path}
                              className={`flex items-center text-sm font-medium py-2.5 px-4 rounded-xl transition-all ${pathname === link.path ? "text-[#FFE500] bg-[#FFE500]/20" : "text-white/85 hover:bg-[#FFE500]/20 hover:text-white"}`}
                              onClick={toggleMenu}
                            >
                              {link.name}
                            </Link>
                          ))}
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
