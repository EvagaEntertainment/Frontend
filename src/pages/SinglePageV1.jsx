import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import ProductGallery from "../components/SinglePageV1/ProductGallery";
import ProductDetails from "../components/SinglePageV1/ProductDetails";
import ProductCardV3 from "../components/Cards/ProductCardV3";
import { internalRoutes } from "../utils/internalRoutes";

const SinglePageV1 = () => {
  const { categoryName, productId } = useParams();
  const navigate = useNavigate();

  // Format category name for display (e.g., LuxuryHampers -> Luxury Hampers)
  const displayCategoryName = categoryName ? categoryName.replace(/([A-Z])/g, ' $1').trim() : "Luxury Hampers";

  // Dummy product data
  const product = {
    id: productId || "1",
    title: "Midnight Velvet Gourmet Luxury Gift Hamper",
    price: 15400,
    originalPrice: 18300,
    reviews: 124,
    description: "Our elegant Signature Reserve collection.",
    badge: "BEST SELLER",
    images: [
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1577234286642-cf6a858b209d?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505935425667-15e7ca61d9be?q=80&w=800&auto=format&fit=crop"
    ],
    videoUrl: "dummy-video",
  };

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

  return (
    <div className="min-h-screen bg-[#f9f9fb] flex flex-col pt-[80px] font-sans pb-16">
      <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Section */}
        <div className="flex items-center space-x-2 text-[13px] text-gray-500 mb-8 mt-2">
          <Link to={internalRoutes.home} className="hover:text-[#7e22ce] transition-colors">Home</Link>
          <span className="text-gray-400">›</span>
          <Link to={internalRoutes.giftStudio} className="hover:text-[#7e22ce] transition-colors">Bakery</Link>
          <span className="text-gray-400">›</span>
          <Link to={`${internalRoutes.giftStudio}/${categoryName}`} className="hover:text-[#7e22ce] transition-colors capitalize">{displayCategoryName}</Link>
          <span className="text-gray-400">›</span>
          <span className="text-gray-900 font-semibold truncate max-w-[200px] sm:max-w-none">{product.title}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 xl:gap-20">
          {/* Left Column - Gallery */}
          <div className="w-full lg:w-[48%] xl:w-[46%] flex-shrink-0">
            <ProductGallery images={product.images} videoUrl={product.videoUrl} badge={product.badge} />
          </div>

          {/* Right Column - Details */}
          <div className="w-full lg:flex-1">
            <ProductDetails product={product} />
          </div>
        </div>

        {/* You May Also Adore Section */}
        <div className="mt-24 pt-12 border-t border-gray-200">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1a1a2e] tracking-tight">You May Also Adore</h2>
            <Link to={`${internalRoutes.giftStudio}/${categoryName}`} className="text-[#7e22ce] text-sm font-bold tracking-widest uppercase hover:underline">
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
                onClickCard={() => navigate(`${internalRoutes.giftStudio}/${categoryName || "Gourmet"}/${rp.id}`)}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default SinglePageV1;
