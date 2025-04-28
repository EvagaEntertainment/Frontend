import React from "react";
import BannerImg from "../../assets/Temporary Images/Banner.png";
import { useNavigate } from "react-router-dom";
function Banner({ image, height, category }) {
  const navigate = useNavigate();
  const handleSearch = React.useCallback(() => {
    const query = new URLSearchParams({ q: "", category }).toString();
    navigate(`/search?${query}`);
  }, [category, navigate]);

  return (
    <div className="w-full">
      <img
        src={
          image ? process.env.REACT_APP_API_Aws_Image_BASE_URL + image : BannerImg
        }
        alt="Banner"
        className={
          height
            ? `object-fill w-full w-full sm:h-[14rem] md:h-[18rem]`
            : "object-fill w-full "
        }
        decoding="async"
        loading="lazy"
        width={1200}  // Add intrinsic dimensions
        height={400} // Add intrinsic dimensions
        onClick={category ? () => handleSearch() : undefined}
      />
    </div>
  );
}

export default Banner;
