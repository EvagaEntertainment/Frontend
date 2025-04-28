import React from "react";
import "./Banner.css";
// BannerSkeleton with better shimmer effect
const BannerSkeleton = ({ height = "16rem" }) => {
  return (
    <div className={`w-full aspect-[3/1] relative overflow-hidden`}>
      <div
        className={`w-full h-full bg-gray-200`}
        style={{
          background:
            "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
          backgroundSize: "200% 100%",
          animation: "shimmer 1.5s infinite",
        }}
      />
    </div>
  );
};

export default BannerSkeleton;
