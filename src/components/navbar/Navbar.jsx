'use client';
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes, FaHome, FaInfoCircle, FaPhone, FaStar, FaChevronDown, FaMapMarkerAlt } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { internalRoutes } from "../../utils/internalRoutes";

/* ─── All 35 celebration pages in 5 categories ───────────────────────────── */
const celebrationCategories = [
  {
    label: "Our Services",
    emoji: "🎉",
    color: "#7C3AED",
    links: [
      { name: "Birthday Planner Bangalore", path: "/birthday-planner-bangalore" },
      { name: "Kids Birthday Planner", path: "/kids-birthday-planner-bangalore" },
      { name: "Birthday Decoration", path: "/birthday-decoration-bangalore" },
      { name: "Celebration At Home", path: "/birthday-celebration-at-home-bangalore" },
      { name: "Luxury Birthday Planner", path: "/luxury-birthday-planner-bangalore" },
      { name: "Premium Birthday Planner", path: "/premium-birthday-planner" },
      { name: "Premium House Warming", path: "/premium-house-warming-planner" },
      { name: "Premium Baby Shower", path: "/premium-baby-shower-planner" },
      { name: "Premium Birthday End-to-End", path: "/premium-birthday-end-to-end-planner" },
    ],
  },
  {
    label: "Theme-Based",
    emoji: "🎨",
    color: "#DB2777",
    links: [
      { name: "Unicorn Theme Birthday", path: "/unicorn-theme-birthday-bangalore" },
      { name: "Jungle Theme Birthday", path: "/jungle-theme-birthday-bangalore" },
      { name: "Barbie Theme Birthday", path: "/barbie-theme-birthday-bangalore" },
      { name: "Space Theme Birthday", path: "/space-theme-birthday-bangalore" },
      { name: "Cocomelon Birthday Theme", path: "/cocomelon-birthday-theme-bangalore" },
      { name: "Boss Baby Decoration", path: "/boss-baby-birthday-decoration-bangalore" },
    ],
  },
  {
    label: "Age-Based",
    emoji: "🎂",
    color: "#D97706",
    links: [
      { name: "1st Birthday Planner", path: "/1st-birthday-planner-bangalore" },
      { name: "Kids Birthday Party", path: "/kids-birthday-party-bangalore" },
      { name: "Teen Birthday Celebration", path: "/teen-birthday-celebration-bangalore" },
      { name: "Adult Birthday Planner", path: "/adult-birthday-planner-bangalore" },
    ],
  },
  {
    label: "Venue & Location",
    emoji: "📍",
    color: "#059669",
    links: [
      { name: "Birthday Venues Bangalore", path: "/birthday-venues-bangalore" },
      { name: "Indoor Birthday Venues", path: "/indoor-birthday-venues-bangalore" },
      { name: "Venues in Whitefield", path: "/birthday-venues-whitefield" },
      { name: "Birthday Party Resorts", path: "/birthday-party-resorts-bangalore" },
      { name: "Venues Under ₹50K", path: "/birthday-venues-under-50k-bangalore" },
    ],
  },
  {
    label: "By Area",
    emoji: "🏙️",
    color: "#0284C7",
    links: [
      { name: "Whitefield", path: "/birthday-planner-whitefield" },
      { name: "HSR Layout", path: "/birthday-planner-hsr-layout" },
      { name: "Koramangala", path: "/birthday-planner-koramangala" },
      { name: "Indiranagar", path: "/birthday-planner-indiranagar" },
      { name: "Sarjapur", path: "/birthday-planner-sarjapur" },
      { name: "Bellandur", path: "/birthday-planner-bellandur" },
      { name: "Hebbal", path: "/birthday-planner-hebbal" },
      { name: "Electronic City", path: "/birthday-planner-electronic-city" },
      { name: "Hennur", path: "/birthday-planner-hennur" },
      { name: "Yelahanka", path: "/birthday-planner-yellhanka" },
      { name: "JP Nagar", path: "/birthday-planner-jp-nagar" },
    ],
  },
];

const allCelebrationPaths = celebrationCategories.flatMap((c) => c.links.map((l) => l.path));

function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [mobileCatOpen, setMobileCatOpen] = useState(null);
  const closeTimer = useRef(null);

  const navLinks = [
    { name: "Home", path: internalRoutes.home, icon: <FaHome /> },
    { name: "About Us", path: internalRoutes.aboutUs, icon: <FaInfoCircle /> },
    { name: "Our Services", path: internalRoutes.ourServices, icon: <FaPhone /> },
  ];

  const toggleMenu = () => {
    if (!isOpen) setMenuVisible(true);
    setIsOpen((prev) => !prev);
  };

  const menuVariants = {
    open: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
    closed: { opacity: 0, x: "100%", transition: { duration: 0.3 } },
  };

  const linkVariants = {
    hover: { color: "#FFE500", y: -2, transition: { type: "spring", stiffness: 400, damping: 10 } },
    tap: { scale: 0.95 },
  };

  const handleAnimationComplete = () => {
    if (!isOpen) setMenuVisible(false);
  };

  // Debounced close so mouse can travel from button → panel
  const handleMouseEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setDropdownOpen(true);
  };
  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setDropdownOpen(false), 120);
  };

  useEffect(() => {
    setIsOpen(false);
    setDropdownOpen(false);
    setMobileDropdownOpen(false);
    setMobileCatOpen(null);
  }, [pathname]);

  useEffect(() => () => { if (closeTimer.current) clearTimeout(closeTimer.current); }, []);

  const isCelebrationActive = allCelebrationPaths.includes(pathname);

  return (
    <nav className="bg-[#6A1B9A] w-full z-50 border-b border-[#FFE500]/20 relative">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* ── Logo ─────────────────────────────────────────── */}
        <Link href={internalRoutes.home} passHref legacyBehavior>
          <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center">
            <img
              src={process.env.NEXT_PUBLIC_API_Aws_Image_BASE_URL + "gallery/1749377446139_Eevagga_yellow.webp"}
              alt="Evaga Logo"
              className="h-10 object-contain"
            />
          </motion.a>
        </Link>

        {/* ── Desktop Nav ───────────────────────────────────── */}
        <div className="hidden md:flex items-center gap-8">

          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.name}
                href={link.path}
                className={`relative text-sm font-medium ${isActive ? "text-[#FFE500]" : "text-white"}`}
              >
                <motion.span className="inline-block" variants={linkVariants} whileHover="hover" whileTap="tap">
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

          {/* ── Celebrations Mega-Menu trigger ─────────────── */}
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className={`flex items-center gap-1.5 text-sm font-medium transition-colors duration-200 ${isCelebrationActive ? "text-[#FFE500]" : "text-white hover:text-[#FFE500]"
                }`}
            >
              <FaStar className="text-xs" />
              Celebrations
              <FaChevronDown className={`text-[10px] transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.14 }}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  /* Anchor to right side of viewport via fixed positioning relative to navbar */
                  className="fixed left-0 right-0 z-50"
                  style={{ top: "72px" }}
                >
                  <div className="max-w-7xl mx-auto px-6">
                    {/* Caret */}
                    <div className="flex justify-end pr-4">
                      <div className="w-3 h-3 bg-[#6A1B9A] rotate-45 -mb-1.5 relative z-10" />
                    </div>

                    {/* Panel */}
                    <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">

                      {/* Purple header */}
                      <div className="bg-gradient-to-r from-[#6A1B9A] to-[#8E24AA] px-6 py-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FaStar className="text-[#FFE500]" />
                          <span className="text-white font-semibold text-sm">All Celebrations &amp; Services</span>
                        </div>
                        <span className="text-[#FFE500]/80 text-xs">35 pages • Bangalore</span>
                      </div>

                      {/* 5-column grid */}
                      <div className="grid grid-cols-5 divide-x divide-gray-100">
                        {celebrationCategories.map((cat) => (
                          <div key={cat.label} className="py-5 px-5">
                            {/* Category header */}
                            <div className="flex items-center gap-2 mb-3 pb-2.5 border-b-2" style={{ borderColor: cat.color + "30" }}>
                              <span className="text-base leading-none">{cat.emoji}</span>
                              <span
                                className="text-[10px] font-black uppercase tracking-wider"
                                style={{ color: cat.color }}
                              >
                                {cat.label}
                              </span>
                            </div>

                            {/* Links list */}
                            <ul className="space-y-0.5">
                              {cat.links.map((link) => {
                                const isActive = pathname === link.path;
                                return (
                                  <li key={link.path}>
                                    <Link
                                      href={link.path}
                                      className={`flex items-start gap-1.5 text-[11.5px] leading-snug py-1.5 px-2 rounded-lg transition-all duration-150 group ${isActive
                                          ? "font-semibold"
                                          : "text-gray-600 hover:text-gray-900"
                                        }`}
                                      style={isActive ? { color: cat.color, backgroundColor: cat.color + "15" } : {}}
                                    >
                                      <span
                                        className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                        style={{ backgroundColor: cat.color }}
                                      />
                                      <span className="group-hover:translate-x-0.5 transition-transform duration-150">
                                        {link.name}
                                      </span>
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        ))}
                      </div>

                      {/* Footer */}
                      <div className="bg-gradient-to-r from-gray-50 to-purple-50 border-t border-gray-100 px-6 py-3 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <FaMapMarkerAlt className="text-[#6A1B9A] text-[10px]" />
                          <span>Serving all areas of Bangalore</span>
                        </div>

                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ── Mobile Hamburger ──────────────────────────────── */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </motion.button>

        {/* ── Mobile slide-over ─────────────────────────────── */}
        <AnimatePresence>
          {menuVisible && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isOpen ? 1 : 0 }}
                exit={{ opacity: 0 }}
                className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                onClick={toggleMenu}
                style={{ pointerEvents: isOpen ? "auto" : "none" }}
              />

              {/* Panel */}
              <motion.div
                initial="closed"
                animate={isOpen ? "open" : "closed"}
                exit="closed"
                variants={menuVariants}
                onAnimationComplete={handleAnimationComplete}
                className="md:hidden fixed top-0 right-0 h-full w-[88vw] max-w-sm bg-[#6A1B9A] shadow-2xl z-50 flex flex-col"
              >
                {/* Close */}
                <div className="p-4 flex justify-between items-center border-b border-white/10">
                  <span className="text-white font-semibold text-sm">Menu</span>
                  <motion.button whileTap={{ scale: 0.9 }} className="text-white p-1" onClick={toggleMenu}>
                    <FaTimes size={22} />
                  </motion.button>
                </div>

                {/* Scrollable content */}
                <div className="flex-grow overflow-y-auto py-4">

                  {/* Standard links */}
                  {navLinks.map((link) => {
                    const isActive = pathname === link.path;
                    return (
                      <Link
                        key={link.name}
                        href={link.path}
                        className={`flex items-center gap-3 text-sm font-medium mx-3 mb-1 py-3 px-4 rounded-xl transition-all ${isActive ? "text-[#FFE500] bg-[#FFE500]/15" : "text-white hover:bg-white/10"
                          }`}
                        onClick={toggleMenu}
                      >
                        <span className="text-base opacity-80">{link.icon}</span>
                        {link.name}
                        {isActive && <span className="ml-auto w-2 h-2 rounded-full bg-[#FFE500]" />}
                      </Link>
                    );
                  })}

                  <div className="mx-3 mt-2 border-t border-white/10 pt-2" />

                  {/* Celebrations accordion */}
                  <div className="mx-3 mt-1">
                    <button
                      onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                      className={`flex items-center justify-between w-full text-sm font-medium py-3 px-4 rounded-xl transition-all ${isCelebrationActive ? "text-[#FFE500] bg-[#FFE500]/15" : "text-white hover:bg-white/10"
                        }`}
                    >
                      <span className="flex items-center gap-3">
                        <FaStar className="text-base opacity-80" />
                        <span>Celebrations</span>
                      </span>
                      <FaChevronDown className={`text-xs transition-transform duration-200 ${mobileDropdownOpen ? "rotate-180" : ""}`} />
                    </button>

                    <AnimatePresence initial={false}>
                      {mobileDropdownOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.22 }}
                          className="overflow-hidden"
                        >
                          {celebrationCategories.map((cat) => (
                            <div key={cat.label} className="ml-2 mt-1">
                              {/* Category accordion toggle */}
                              <button
                                onClick={() => setMobileCatOpen(mobileCatOpen === cat.label ? null : cat.label)}
                                className="flex items-center justify-between w-full py-2 px-4 rounded-lg transition-all hover:bg-white/10"
                              >
                                <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider" style={{ color: "#FFE500CC" }}>
                                  <span>{cat.emoji}</span>
                                  <span>{cat.label}</span>
                                  <span className="ml-1 text-white/40 normal-case tracking-normal font-normal">({cat.links.length})</span>
                                </span>
                                <FaChevronDown
                                  className={`text-[9px] text-white/50 transition-transform duration-200 ${mobileCatOpen === cat.label ? "rotate-180" : ""}`}
                                />
                              </button>

                              <AnimatePresence initial={false}>
                                {mobileCatOpen === cat.label && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.18 }}
                                    className="overflow-hidden pl-6 pr-2 pb-1"
                                  >
                                    {cat.links.map((subLink) => {
                                      const isSubActive = pathname === subLink.path;
                                      return (
                                        <Link
                                          key={subLink.path}
                                          href={subLink.path}
                                          className={`flex items-center gap-2 text-[13px] py-2 px-3 rounded-lg transition-all ${isSubActive
                                              ? "text-[#FFE500] font-semibold bg-[#FFE500]/10"
                                              : "text-white/75 hover:text-white hover:bg-white/10"
                                            }`}
                                          onClick={toggleMenu}
                                        >
                                          <span className="w-1.5 h-1.5 rounded-full bg-white/30 flex-shrink-0" />
                                          {subLink.name}
                                        </Link>
                                      );
                                    })}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Mobile footer */}
                <div className="border-t border-white/10 px-6 py-4">
                  <p className="text-white/40 text-xs text-center">500+ events · All Bangalore</p>
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
