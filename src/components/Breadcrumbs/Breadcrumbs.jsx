'use client';
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const Breadcrumbs = () => {
  const pathname = usePathname();
  const pathnames = (pathname || "")
    .split("/")
    .filter((x) => x && !/^[0-9a-fA-F]{24}$/.test(x));

  // If we are on the homepage, don't show breadcrumbs
  if (pathname === "/") return null;

  // Custom mapping for human-readable names
  const routeNameMap = {
    "about-us": "About Us",
    "careers": "Careers",
    "blogs": "Blogs",
    "singleBlog": "Single Blog",
    "press-releases": "Press Releases",
    "cancellation-policy": "Cancellation Policy",
    "terms-and-condition": "Terms & Conditions",
    "privacy-policy": "Privacy Policy",
    "feedback-form": "Feedback Form",
    "customer-service": "Customer Service",
    "services": "Our Services",
    "checkout": "Checkout",
    "payment": "Payment",
    "orderStatus": "Order Status",
    "select-your-interest": "Interest Selection",
    "thank-you": "Thank You",
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, x: -10 },
    show: { opacity: 1, x: 0 },
  };

  return (
    <motion.nav
      variants={container}
      initial="hidden"
      animate="show"
      aria-label="Breadcrumb"
      className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 mt-2"
    >
      <ol className="flex items-center flex-wrap gap-2 text-sm font-medium">
        <motion.li variants={item}>
          <Link
            href="/"
            className="text-gray-400 hover:text-[#6A1B9A] transition-colors duration-200 flex items-center"
          >
            <span className="opacity-60">Home</span>
          </Link>
        </motion.li>

        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          
          // Format name: Use map, or replace hyphens with spaces and capitalize
          const humanReadableName = 
            routeNameMap[value] || 
            value.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

          return (
            <motion.li key={to} variants={item} className="flex items-center gap-2">
              <span className="text-gray-300 font-light select-none">/</span>
              <span className={last ? "text-[#6A1B9A] font-semibold" : ""}>
                {last ? (
                  <span className="cursor-default tracking-wide">{humanReadableName}</span>
                ) : (
                  <Link
                    href={to}
                    className="text-gray-500 hover:text-[#6A1B9A] transition-colors duration-200"
                  >
                    {humanReadableName}
                  </Link>
                )}
              </span>
            </motion.li>
          );
        })}
      </ol>
    </motion.nav>
  );
};

export default Breadcrumbs;
