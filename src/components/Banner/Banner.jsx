'use client';
import React from "react";
import BannerImg from "../../assets/Temporary Images/Banner.png";
import { useRouter } from "next/navigation";

function Banner({ image, height, category }) {
  const router = useRouter();
  const handleSearch = () => {
    const query = new URLSearchParams({
      q: "",
      category: category,
    }).toString();

    router.push(`/search?${query}`);
  };

  return (
    <div className="w-full">
      <img
        src={
          image ? process.env.NEXT_PUBLIC_API_Aws_Image_BASE_URL + image : BannerImg
        }
        alt="Banner"
        className={
          height
            ? `object-fill w-full w-full sm:h-[14rem] md:h-[18rem]`
            : "object-fill w-full "
        }
        decoding="async"
        onClick={category ? () => handleSearch() : undefined}
      />
    </div>
  );
}

export default Banner;
