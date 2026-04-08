import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { useEffect, useState } from "react";
import useServices from "../../hooks/useServices";
import commonApis from "../../services/commonApis";

const RealStories = () => {
  const [stories, setStories] = useState([]);
  const [hasFetched, setHasFetched] = useState(false);
  const getTestimonialsForUserApi = useServices(commonApis.getAllTestimonialsForUser);

  const fetchStories = async () => {
    if (hasFetched) return;
    setHasFetched(true);
    try {
      const response = await getTestimonialsForUserApi.callApi();
      setStories(response?.testimonials || []);
    } catch (error) {
      console.error("Failed to fetch user testimonials", error);
    }
  };

  const responsive = {
    0: {
      items: 1,
    },
    600: {
      items: 2,
      itemsFit: "contain",
    },
    750: {
      items: 3,
      itemsFit: "contain",
    },
    1024: {
      items: 3,
      itemsFit: "contain",
    },
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#fffbf0]">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          onViewportEnter={fetchStories}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 space-y-4"
        >
          <h2 className="text-primary text-4xl font-normal text-center">
            Real Stories, Unforgettable Memories
          </h2>
          <motion.p
            className="text-gray-600 md:text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            See how Eevagga brought celebrations to life for real people just
            like you.
          </motion.p>
        </motion.div>

        {/* Stories Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2 },
            },
          }}
        >
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
            {getTestimonialsForUserApi.loading ? (
              [1, 2, 3].map((item) => (
                <div key={`skeleton-${item}`} className="mx-4 bg-white rounded-xl shadow-lg h-96 overflow-hidden relative animate-pulse">
                  <div className="h-64 bg-gray-200"></div>
                  <div className="p-6 space-y-4">
                    <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-full"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  </div>
                </div>
              ))
            ) : stories.length > 0 ? (
              stories.map((story, index) => (
                <div
                  key={index}
                  className="group relative mx-4 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all overflow-hidden cursor-pointer"
                >
                  {/* Image Container */}
                  <div className="relative h-64 overflow-hidden">
                    <LazyLoadImage
                      src={
                        process.env.NEXT_PUBLIC_API_Aws_Image_BASE_URL + story.image
                      }
                      alt={story.title}
                      decoding="async"
                      className="w-full h-full object-cover"
                      wrapperClassName="group transition-transform duration-300"
                      effect="blur"
                      placeholderSrc={story.preview}
                      beforeLoad={() => ({ style: { filter: "blur(20px)" } })}
                      afterLoad={() => ({ style: { filter: "blur(0)" } })}
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                      visibleByDefault={false}
                      threshold={200} // Load 200px before entering viewport
                      style={{
                        transition: "transform 0.3s ease-in-out",
                        aspectRatio: "16 / 12",
                      }}
                      // Combine lazy-load transition with hover effect
                      onLoad={() => {
                        const img = document.querySelector(
                          `img[alt="${story.title}"]`
                        );
                        img.classList.add("group-hover:scale-105");
                      }}
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent group-hover:opacity-80 transition-opacity duration-300" />
                  </div>

                  {/* Text Content */}
                  <div className="p-6 space-y-4">
                    {/* Title with Underline */}
                    <h3 className="text-xl font-semibold text-gray-900 relative text-primary">
                      {story.title}
                      <div className="absolute bottom-0 h-[2px] bg-gradient-to-r from-primary to-secondary w-full" />
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600">{story.testimonial}</p>
                    <p className="text-primary">— {story.name}</p>
                  </div>

                  {/* Border Glow */}
                  <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-indigo-200 group-hover:shadow-glow transition-all duration-300" />
                </div>
              ))
            ) : (
              <div className="text-center py-10 text-gray-500 w-full">No stories found.</div>
            )}
          </AliceCarousel>
        </motion.div>
      </div>
    </section>
  );
};

export default RealStories;
