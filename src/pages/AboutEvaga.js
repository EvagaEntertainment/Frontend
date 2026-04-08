'use client';
import { Helmet } from "react-helmet-async";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "../utils/motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { getAboutUsBanners } from "../context/redux/slices/bannerSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
const AboutUs = () => {
  const dispatch = useDispatch();
  const {
    banner: { aboutBanner },
  } = useSelector((state) => ({
    banner: state.banner,
  }));
  useEffect(() => {
    if (!aboutBanner || aboutBanner.length === 0) {
      dispatch(getAboutUsBanners());
    }
  }, [dispatch, aboutBanner]);

  const sections = [
    {
      type: "image",
      src: aboutBanner?.topBanner?.BannerUrl,
      preview: aboutBanner?.topBanner?.bannerPreview,
      alt: "About Eevagga",
    },
    {
      content:
        "At Eevagga, we believe birthdays deserve more than decorations and cakes — they deserve beautifully crafted experiences.",
      subcontent:
        "Birthdays mark some of life’s most meaningful moments: a child’s first celebration, milestone years, surprise parties for loved ones, and gatherings that bring people together. These occasions deserve thoughtful planning, elegant aesthetics, and seamless execution.",
    },
    {
      content:
        "Eevagga was created to make premium birthday celebrations effortless, memorable, and accessible.",
      subcontent:
        "We are building a modern celebration platform where families can discover ideas, plan meaningful birthday experiences, explore thoughtful gifts, and find premium celebration products — all designed to make every birthday truly special.",
    },
    {
      content:
        "Because when birthdays are celebrated well, they become memories that last a lifetime.",
    },
    {
      type: "image",
      src: aboutBanner?.bottomBanner?.BannerUrl, // Second image after the paragraph
      preview: aboutBanner?.bottomBanner?.bannerPreview,
      alt: "Premium Birthday Celebrations",
    },
    {
      title: "Our Story",
      content:
        "Eevagga began with a simple observation. Planning birthdays in India is often fragmented and stressful. Families typically juggle multiple vendors — decorators, photographers, entertainers, cake shops, and gift stores — with little clarity on quality, pricing, or reliability.",
      subcontent:
        "We saw an opportunity to change this. By bringing together event expertise, curated experiences, and thoughtfully designed celebration products, Eevagga simplifies the entire birthday planning journey. Our goal is simple: to help people celebrate life’s most meaningful moments without the chaos of traditional event planning.",
    },
    {
      title: "Built by Event Professionals",
      content:
        "Eevagga is not just another marketplace or listing platform. It is built by professionals who actively design and execute birthday celebrations.",
      subcontent:
        "Our real-world experience in décor, event logistics, and celebration design allows us to curate solutions that truly work — from elegant birthday setups to thoughtfully designed celebration kits that make at-home celebrations just as special. Every service and product offered by Eevagga is shaped by the insights we gain from real celebrations and real customer experiences.",
    },
    {
      title: "Our Philosophy",
      content:
        "At Eevagga, every celebration is guided by three core principles:",
      list: [
        "Thoughtful Design: Beautiful aesthetics and curated details that elevate every birthday celebration.",
        "Seamless Execution: Reliable planning and professional coordination that ensures everything runs effortlessly.",
        "Meaningful Memories: Celebrations designed not just for the day, but for the memories they create long after.",
      ],
    },
    {
      title: "Our Mission",
      content:
        "To make premium birthday celebrations effortless, inspiring, and unforgettable for families across India.",
      subcontent:
        "By combining curated experiences, celebration products, and trusted event expertise, we aim to transform how birthdays are planned and celebrated.",
    },
    {
      title: "Our Vision",
      content:
        "We are building Eevagga to become India’s most trusted birthday celebration brand — a platform where people can discover ideas, plan celebrations, and find everything they need to create memorable birthday experiences.",
      subcontent:
        "Because every birthday deserves to be celebrated beautifully.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>About Eevagga | India's Premium Birthday Celebration Brand</title>
        <meta
          name="description"
          content="Learn about Eevagga, India's premium birthday celebration brand. We make premium birthday celebrations effortless, memorable, and accessible."
        />
        <meta
          name="keywords"
          content="birthday celebrations, premium birthdays, party planning, Eevagga story, birthday experiences India, birthday planners"
        />
        <link rel="canonical" href={window.location.origin + window.location.pathname} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="About Eevagga | India's Premium Birthday Celebration Brand" />
        <meta
          property="og:description"
          content="Learn about Eevagga, India's premium birthday celebration brand. We make premium birthday celebrations effortless, memorable, and accessible."
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <Breadcrumbs />
      <motion.div
        initial="hidden"
        animate="show"
        variants={staggerContainer()}
        className="max-w-4xl mx-auto px-4 py-12"
      >
      {/* Hero Section */}
      <motion.div
        variants={fadeIn("up", "tween", 0.1, 0.6)}
        className="text-center mb-16"
      >
        <h1
          className="text-3xl md:text-4xl font-bold mb-4"
          style={{ color: "#6A1B9A" }}
        >
          About Eevagga
        </h1>
        <p className="text-xl md:text-2xl text-gray-600">
          India’s Premium Birthday Celebration Brand
        </p>
      </motion.div>

      {/* Content Sections */}
      <div className="space-y-8">
        {sections.map((section, index) => (
          <motion.section
            key={section.title || section.type || index}
            variants={fadeIn("up", "tween", 0.2 + index * 0.1, 0.6)}
            className="space-y-6"
            viewport={{ once: true }}
          >
            {section.type === "image" ? (
              <motion.div
                className="relative group overflow-hidden rounded-xl shadow-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <LazyLoadImage
                  src={
                    process.env.NEXT_PUBLIC_API_Aws_Image_BASE_URL + section.src
                  }
                  alt={section.alt}
                  className="w-full h-auto object-cover aspect-video"
                  effect="blur"
                  placeholderSrc={section.preview} // Add small placeholder image in your data
                  wrapperProps={{
                    style: {
                      display: "block", // Ensures proper layout
                      transition: "filter 0.5s ease-out", // Custom blur transition
                    },
                  }}
                  beforeLoad={() => ({
                    style: {
                      filter: "blur(20px)",
                    },
                  })}
                  afterLoad={() => ({
                    style: {
                      filter: "blur(0)",
                    },
                  })}
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />

                {/* Optional Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />

                {/* Optional Loading Skeleton */}
                {!section.src && (
                  <div className="absolute inset-0 bg-gray-100 animate-pulse" />
                )}
              </motion.div>
            ) : (
              <>
                {section.title && (
                  <h2
                    className="text-2xl font-semibold"
                    style={{ color: "#6A1B9A" }}
                  >
                    {section.title}
                  </h2>
                )}

                {section.content && (
                  <p className="text-gray-600 leading-relaxed">
                    {section.content}
                  </p>
                )}

                {section.subcontent && (
                  <p className="text-gray-600 leading-relaxed">
                    {section.subcontent}
                  </p>
                )}

                {section.list && (
                  <ul className="list-disc pl-6 space-y-2">
                    {section.list.map((item, i) => (
                      <li key={i} className="text-gray-600">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                {section.numberedList && (
                  <ol className="list-decimal pl-6 space-y-3">
                    {section.numberedList.map((item, i) => (
                      <li key={i} className="text-gray-600">
                        {item}
                      </li>
                    ))}
                  </ol>
                )}

                {section.ending && (
                  <p className="text-gray-600 mt-6 leading-relaxed italic">
                    {section.ending}
                  </p>
                )}
              </>
            )}
          </motion.section>
        ))}
      </div>

      {/* Closing Section */}
      <motion.div
        variants={fadeIn("up", "tween", 1, 0.6)}
        className="text-center mt-16"
      >
        <div className=" pt-8">
          <p
            className="text-xl md:text-2xl font-semibold mb-4"
            style={{ color: "#6A1B9A" }}
          >
            Celebrate Better. Celebrate with Eevagga.
          </p>
        </div>
      </motion.div>
    </motion.div>
    </>
  );
};

export default AboutUs;
