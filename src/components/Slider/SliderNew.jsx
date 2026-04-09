'use client';
import "react-alice-carousel/lib/alice-carousel.css";
import BannerNew from "../Banner/BannerNew";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserBanner } from "../../context/redux/slices/bannerSlice.js";
import dynamic from 'next/dynamic';

const AliceCarousel = dynamic(() => import('react-alice-carousel'), { ssr: false });

function SliderNew() {
  const dispatch = useDispatch();
  const { userBanner, status } = useSelector((state) => state.banner);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!userBanner || userBanner.length === 0) {
      dispatch(fetchUserBanner());
    }
  }, [dispatch, userBanner]);

  const responsive = {
    0: { items: 1 },
    1024: { items: 1, itemsFit: "contain" },
  };

  const skeletonItem = (
    <div className="relative w-full h-[50dvh] md:h-[85dvh] overflow-hidden">
      <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
      <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-end pb-[10%] pt-20">
        <div className="text-center space-y-8">
          <div className="h-16 w-3/4 mx-auto bg-gray-300 rounded animate-pulse"></div>
          <div className="h-12 w-48 mx-auto bg-gray-300 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );

  if (!mounted) return <div className="flex flex-col">{skeletonItem}</div>;

  return (
    <>
      <style jsx global>{`
        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
        }
        .animate-pulse {
          animation: pulse 1.5s infinite;
        }
      `}</style>

      {status === "loading" || !userBanner || userBanner.length === 0 ? (
        <AliceCarousel
          mouseTracking
          responsive={responsive}
          disableButtonsControls
          infinite
        >
          {[1, 2, 3].map((item) => (
            <div key={`skeleton-${item}`}>{skeletonItem}</div>
          ))}
        </AliceCarousel>
      ) : (
        <AliceCarousel
          mouseTracking
          responsive={responsive}
          disableButtonsControls
          autoPlay
          infinite
          autoPlayInterval={3000}
          paddingRight={0}
          paddingLeft={0}
        >
          {userBanner?.map((item) => (
            <BannerNew
              key={item.id}
              image={item?.BannerUrl}
              preview={item?.bannerPreview}
            />
          ))}
        </AliceCarousel>
      )}
    </>
  );
}

export default SliderNew;
