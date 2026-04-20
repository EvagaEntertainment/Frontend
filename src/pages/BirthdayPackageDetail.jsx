import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import ProductGallery from "../components/SinglePageV1/ProductGallery";
import EventDetails from "../components/SinglePageV1/EventDetails";
import ProductCardV3 from "../components/Cards/ProductCardV3";
import { internalRoutes } from "../utils/internalRoutes";
import customEventsApi from "../services/customEventsApi";
import useServices from "../hooks/useServices";
import Loader from "../components/Loaders/Loader";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";

const BirthdayPackageDetail = () => {
  const { title, productId } = useParams();
  const navigate = useNavigate();

  // Format category name for display
  const displayCategoryName = title ? decodeURIComponent(title).replace(/-/g, ' ') : "Package";

  const [productData, setProductData] = React.useState(null);
  const { callApi, loading } = useServices(customEventsApi.getPublicCustomEventById);

  useEffect(() => {
    if (productId) {
      callApi(productId).then(res => {
        if (res && res.success) {
          setProductData(res.data);
        }
      }).catch(err => console.error(err));
    }
  }, [productId]);

  // Map the API data or fall back to dummy while loading
  const product = productData ? {
    id: productData._id,
    title: productData.title || "Custom Event",
    price: productData.budget || 0,
    originalPrice: productData.budget || 0,
    reviews: 124,
    description: productData.description || "",
    badge: productData.badge || "",
    images: (() => {
      let imgs = productData.images?.length > 0 ? productData.images : (productData.image ? [productData.image] : ["https://placehold.co/800x800"]);
      return imgs.map(img => img.startsWith("http") ? img : `${process.env.REACT_APP_API_Aws_Image_BASE_URL}${img}`);
    })(),
    videoUrl: productData.video ? (productData.video.startsWith("http") ? productData.video : `${process.env.REACT_APP_API_Aws_Image_BASE_URL}${productData.video}`) : "",
    detail: productData.detail || "",
    venueType: productData.venueType || "",
    delivery: productData.delivery || "",
    contents: productData.contents || "",
    addons: productData.addons || [],
    age: productData.age || "",
    gender: productData.gender || "",
    peopleCapacity: productData.peopleCapacity || "",
    eventType: productData.eventType || "",
    tierType: productData.tierType || "",
  } : null;

  // Dummy related products
  const relatedProducts = [
    {
      id: "101",
      title: "Golden Celebration Set",
      price: 10400,
      image: "https://images.unsplash.com/photo-1620063234971-ce4aeb8fd5a4?q=80&w=600&auto=format&fit=crop",
      category: "LUXURY DECOR",
      rating: 4.9,
      reviews: 89,
    },
    {
      id: "102",
      title: "Artisan Tea Discovery",
      price: 5600,
      image: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?q=80&w=600&auto=format&fit=crop",
      category: "BEVERAGES",
      rating: 4.7,
      reviews: 150,
    },
    {
      id: "103",
      title: "Champagne & Caviar Duo",
      price: 24500,
      image: "https://images.unsplash.com/photo-1588693892305-b04068c87ab0?q=80&w=600&auto=format&fit=crop",
      category: "GOURMET",
      rating: 5.0,
      reviews: 42,
    },
    {
      id: "104",
      title: "Sweet Symphony Box",
      price: 7600,
      image: "https://images.unsplash.com/photo-1534432586043-ead5b99229fb?q=80&w=600&auto=format&fit=crop",
      category: "DESSERTS",
      rating: 4.8,
      reviews: 210,
    }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  if (loading || !product) {
    return <div className="min-h-screen flex items-center justify-center bg-[#f9f9fb]"><Loader /></div>;
  }

  return (
    <div className="min-h-screen bg-[#f9f9fb] flex flex-col pt-[80px] font-sans pb-16">
      <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Section */}
        <div className="mb-8 mt-2 -ml-2">
          <Breadcrumbs />
        </div>

        <div className="flex flex-col lg:flex-row gap-12 xl:gap-20">
          {/* Left Column - Gallery */}
          <div className="w-full lg:w-[48%] xl:w-[46%] flex-shrink-0">
            <ProductGallery images={product.images} videoUrl={product.videoUrl} badge={product.badge} />
          </div>

          {/* Right Column - Details */}
          <div className="w-full lg:flex-1">
            <EventDetails product={product} />
          </div>
        </div>

        {/* You May Also Adore Section */}
        <div className="mt-24 pt-12 border-t border-gray-200">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1a1a2e] tracking-tight">Explore More Packages</h2>
            <Link to={internalRoutes.birthdayPackages} className="text-[#7e22ce] text-sm font-bold tracking-widest uppercase hover:underline">
              View Entire Collection +
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
            {relatedProducts.map((rp) => (
              <ProductCardV3
                key={rp.id}
                image={rp.image}
                title={rp.title}
                price={rp.price}
                category={rp.category}
                rating={rp.rating}
                reviewsCount={rp.reviews}
                onClickCard={() => navigate(`${internalRoutes.birthdayPackages}/${title || "Package"}/${rp.id}`)}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default BirthdayPackageDetail;
