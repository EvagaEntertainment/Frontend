'use client';
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { internalRoutes } from "../../utils/internalRoutes";

/* ── standalone blog card ─────────────────────────────────────────── */
function BlogCard({ blog, index = 0 }) {
  const imageUrl = process.env.NEXT_PUBLIC_API_Aws_Image_BASE_URL + (blog?.coverImage || "");
  const plainText = blog?.content ? blog.content.replace(/<[^>]+>/g, "") : "";
  const excerpt = plainText.length > 110 ? plainText.slice(0, 110) + "…" : plainText;
  const dateStr = blog?.publishedAt
    ? new Date(blog.publishedAt).toLocaleDateString("en-IN", {
        day: "numeric", month: "short", year: "numeric",
      })
    : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="group bg-white rounded-2xl overflow-hidden border border-borderPrimary shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col"
    >
      {/* image */}
      <div className="relative overflow-hidden h-52 flex-shrink-0 bg-gray-100">
        <img
          src={imageUrl}
          alt={blog?.title || "Blog cover"}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* content */}
      <div className="p-5 flex flex-col flex-grow">
        {/* meta */}
        <div className="flex items-center gap-2 text-xs text-textGray mb-3">
          {dateStr && (
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="18" rx="2" strokeWidth="2" />
                <path d="M16 2v4M8 2v4M3 10h18" strokeWidth="2" strokeLinecap="round" />
              </svg>
              {dateStr}
            </span>
          )}
          {blog?.authorName && (
            <>
              <span className="text-borderPrimary">·</span>
              <span>{blog.authorName}</span>
            </>
          )}
        </div>

        {/* title */}
        <h2 className="font-semibold text-base text-textPrimary leading-snug mb-2 group-hover:text-primary transition-colors duration-200 line-clamp-2">
          {blog?.title}
        </Typography>
        <Typography
          variant="subtitle2"
          color="text.secondary"
          gutterBottom
          sx={{
            fontWeight: 500,
            color: "text.secondary",
            opacity: 0.8,
          }}
        >
          By {blog?.authorName} |{" "}
          {new Date(blog?.publishedAt).toLocaleDateString()}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            lineHeight: 1.5,
          }}
        >
          {blog?.content.replace(/<[^>]+>/g, "")}
        </Typography>
        <Button
          variant="contained"
          size="small"
          sx={{
            mt: 2,
            fontWeight: 600,
            background: "linear-gradient(45deg, #6A1B9A 30%, #4A0072 90%)",
            color: "#fff",
            "&:hover": {
              background: "linear-gradient(45deg, #1565c0 30%, #1e88e5 90%)",
            },
          }}
          onClick={() =>
            blog?._id && router.push(`${internalRoutes?.singleBlog}/${blog._id}`)
          }
        >
          Read article
          <svg
            className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path d="M5 12h14M13 6l6 6-6 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </motion.div>
  );
}

export default BlogCard;
