import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { motion, AnimatePresence } from "framer-motion";
import { FiMail, FiPhone, FiX } from "react-icons/fi";

const StickyAd = () => {
  const [showAd, setShowAd] = useState(false);

  useEffect(() => {
    const adDismissed = Cookies.get("adDismissed");
    if (!adDismissed) {
      setTimeout(() => setShowAd(true), 2000); // 2-second delay
    }
  }, []);

  const handleDismiss = () => {
    Cookies.set("adDismissed", "true", { expires: 30 });
    setShowAd(false);
  };

  return (
    <AnimatePresence>
      {showAd && (
        <motion.div
          initial={{ y: 40, opacity: 0, scale: 0.95 }}
          animate={{
            y: 0,
            opacity: 1,
            scale: 1,
            transition: {
              type: "spring",
              stiffness: 350,
              damping: 22,
              delay: 0.1,
              duration: 0.7,
            },
          }}
          exit={{
            y: 60,
            opacity: 0,
            transition: {
              ease: "easeIn",
              duration: 0.25,
            },
          }}
          className="fixed inset-x-0 bottom-0 flex justify-center z-50 px-4 pb-4"
        >
          <motion.div
            className="w-full max-w-xl rounded-xl shadow-lg overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #FFFFFF 0%, #F8F8F8 100%)",
              border: "1px solid rgba(0,0,0,0.08)",
            }}
          >
            <div className="relative p-5">
              {/* Enhanced close button */}
              <motion.button
                onClick={handleDismiss}
                initial={{ rotate: -45, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                whileHover={{
                  rotate: 90,
                  scale: 1.1,
                  backgroundColor: "rgba(0,0,0,0.03)",
                }}
                whileTap={{ scale: 0.85 }}
                className="absolute top-3 right-3 p-1 text-gray-500 hover:text-gray-700 rounded-full transition-all"
                aria-label="Close"
              >
                <FiX className="text-lg" />
              </motion.button>

              {/* Content with refined animations */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { staggerChildren: 0.15 },
                }}
                className="text-center space-y-2"
              >
                <motion.h3
                  initial={{ y: -12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="text-xl font-medium text-gray-900"
                >
                  Wedding Planning Overload?
                </motion.h3>

                <motion.p
                  initial={{ y: -8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                  className="text-gray-500 text-normal"
                >
                  We handle the details so you can enjoy the magic
                </motion.p>

                <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
                  <motion.a
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    whileHover={{
                      y: -3,
                      boxShadow: "0 6px 16px rgba(106, 27, 154, 0.2)",
                    }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    href="mailto:info@evagaentertainment.com"
                    className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#6A1B9A] to-[#4A0072] hover:from-[#5A169A] hover:to-[#3A0062] text-white font-medium px-4 py-3 rounded-xl transition-all"
                  >
                    <FiMail className="relative top-[1px]" /> Email Us
                  </motion.a>

                  <motion.a
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    whileHover={{
                      y: -3,
                      boxShadow: "0 6px 16px rgba(249, 215, 3, 0.25)",
                    }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ type: "spring", stiffness: 400, delay: 0.1 }}
                    href="tel:+918050279101"
                    className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#F9D703] to-[#CBAB00] hover:from-[#E9C703] hover:to-[#BB9B00] text-gray-900 font-medium px-4 py-3 rounded-xl transition-all"
                  >
                    <FiPhone className="relative top-[1px]" /> Call Us
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyAd;
