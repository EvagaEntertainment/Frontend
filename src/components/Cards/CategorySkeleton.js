import React from "react";

const CategorySkeleton = React.memo(() => {
  return (
    <div className="w-[130px] h-[120px] flex flex-col items-center gap-2">
    <div className="w-[70%] h-[80px] bg-gray-200 animate-pulse rounded-lg"></div>
    <div className="w-[80%] h-4 bg-gray-200 animate-pulse rounded"></div>
  </div>
  );
});

export default CategorySkeleton;
