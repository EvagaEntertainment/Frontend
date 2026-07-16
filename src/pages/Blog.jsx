'use client';
import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import useServices from "../hooks/useServices";
import commonApis from "../services/commonApis";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";

/* ── helpers ──────────────────────────────────────────────────────────── */
function formatDate(str) {
  if (!str) return "";
  return new Date(str).toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric",
  });
}

function getReadTime(content = "") {
  const words = content.replace(/<[^>]+>/g, "").split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

function getCategory(blog) {
  const text = ((blog?.title || "") + " " + (blog?.content || "")).toLowerCase();
  if (text.includes("baby shower") || text.includes("babyshower")) return "Baby Shower";
  if (text.includes("house warming") || text.includes("housewarming")) return "House Warming";
  if (text.includes("decor") || text.includes("decoration")) return "Decoration";
  if (text.includes("theme")) return "Theme";
  if (text.includes("venue") || text.includes("resort")) return "Venue";
  if (text.includes("birthday")) return "Birthday";
  return "Planning";
}

/* ── animations ──────────────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.45, ease: "easeOut" } }),
};

/* ── Skeleton ─────────────────────────────────────────────────────────── */
function SkeletonCard() {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-200 rounded-xl h-48 mb-4" />
      <div className="h-3 bg-gray-200 rounded w-1/4 mb-2.5" />
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-1.5" />
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-3" />
      <div className="h-3 bg-gray-200 rounded w-full mb-1" />
      <div className="h-3 bg-gray-200 rounded w-5/6" />
    </div>
  );
}

/* ── Blog Card ────────────────────────────────────────────────────────── */
function BlogCard({ blog, index }) {
  const img = process.env.NEXT_PUBLIC_API_Aws_Image_BASE_URL + (blog?.coverImage || "");
  const excerpt = (blog?.content || "").replace(/<[^>]+>/g, "").slice(0, 100).trim() + "…";
  const category = getCategory(blog);
  const readTime = getReadTime(blog?.content);

  return (
    <motion.article
      variants={fadeUp}
      custom={index}
      className="group bg-white rounded-2xl border border-borderPrimary overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-300"
    >
      {/* image */}
      <Link href={`/blogs/singleBlog/${blog?._id}`} className="block overflow-hidden flex-shrink-0 bg-gray-100">
        <img
          src={img}
          alt={blog?.title || "Blog"}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          loading="lazy"
        />
      </Link>

      {/* body */}
      <div className="flex flex-col flex-grow p-5">
        {/* category */}
        <span className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2">
          {category}
        </span>

        {/* title */}
        <Link href={`/blogs/singleBlog/${blog?._id}`}>
          <h2 className="font-semibold text-[0.93rem] text-textPrimary leading-snug mb-2 group-hover:text-primary transition-colors duration-200 line-clamp-2">
            {blog?.title}
          </h2>
        </Link>

        {/* excerpt */}
        <p className="text-xs text-textGray leading-relaxed line-clamp-3 mb-4 flex-grow">
          {excerpt}
        </p>

        {/* divider */}
        <div className="border-t border-borderPrimary/60 pt-4 flex items-center justify-between gap-3">
          {/* meta */}
          <div className="flex items-center gap-1.5 text-[11px] text-textGray min-w-0">
            <span className="truncate">{blog?.authorName || "Eevagga"}</span>
            <span className="w-0.5 h-0.5 rounded-full bg-borderPrimary flex-shrink-0" />
            <span className="flex-shrink-0">{readTime} min read</span>
          </div>

          {/* CTA */}
          <Link
            href={`/blogs/singleBlog/${blog?._id}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-primary whitespace-nowrap flex-shrink-0 group/btn"
          >
            Read article
            <svg
              className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform duration-200"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path d="M5 12h14M13 6l6 6-6 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

/* ── Pagination ───────────────────────────────────────────────────────── */
function Pagination({ page, totalPages, onChange }) {
  const pages = [];
  const start = Math.max(1, page - 2);
  const end = Math.min(totalPages, page + 2);
  for (let i = start; i <= end; i++) pages.push(i);

  return (
    <div className="flex items-center justify-center gap-1 mt-12">
      <button
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        className="w-8 h-8 flex items-center justify-center rounded-lg text-textGray hover:text-primary hover:bg-background disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M15 18l-6-6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {pages.map(n => (
        <button
          key={n}
          onClick={() => onChange(n)}
          className={`w-8 h-8 rounded-lg text-sm font-medium transition-all duration-150 ${
            n === page
              ? "bg-primary text-white"
              : "text-textGray hover:bg-background hover:text-primary"
          }`}
        >
          {n}
        </button>
      ))}

      <button
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        className="w-8 h-8 flex items-center justify-center rounded-lg text-textGray hover:text-primary hover:bg-background disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M9 18l6-6-6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}

/* ── Main ─────────────────────────────────────────────────────────────── */
function Blog({ initialBlogs, initialPage, initialTotalPages }) {
  const [allBlog, setAllBlog] = useState(initialBlogs || []);
  const [page, setPage] = useState(initialPage || 1);
  const [totalPages, setTotalPages] = useState(initialTotalPages || 1);
  const [loading, setLoading] = useState(false);
  const getAllBlogsApi = useServices(commonApis.getAllBlogs);
  const isFirstRender = useRef(true);

  const fetchBlogs = async (p) => {
    setLoading(true);
    try {
      const res = await getAllBlogsApi.callApi({ page: p });
      setAllBlog(res?.blogs || []);
      setTotalPages(res?.totalPages || 1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      if (initialBlogs?.length > 0) return;
    }
    fetchBlogs(page);
  }, [page]);

  const handlePageChange = (n) => {
    if (n < 1 || n > totalPages || n === page) return;
    setPage(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Breadcrumbs />

      {/* ── Page header ─────────────────────────────────────────── */}
      <header className="border-b border-borderPrimary bg-white px-[4%] py-10">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">Eevagga Blog</p>
          <h1 className="font-playfair text-3xl md:text-4xl font-bold text-textPrimary mb-2">
            Ideas &amp; Inspiration
          </h1>
          <p className="text-textGray text-sm max-w-md">
            Birthday themes, decoration tips and celebration guides for Bangalore.
          </p>
        </motion.div>
      </header>

      {/* ── Grid ────────────────────────────────────────────────── */}
      <main className="px-[4%] py-10 min-h-[60vh] bg-backgroundOffWhite">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="skeletons"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
            </motion.div>
          ) : allBlog.length > 0 ? (
            <motion.div
              key={`page-${page}`}
              initial="hidden" animate="show"
              variants={{ show: { transition: { staggerChildren: 0.06 } } }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              {allBlog.map((item, i) => (
                <BlogCard key={item?._id || i} blog={item} index={i} />
              ))}
            </motion.div>
          ) : (
            <motion.p
              key="empty"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-center text-textGray py-24 text-sm"
            >
              No articles yet — check back soon.
            </motion.p>
          )}
        </AnimatePresence>

        {totalPages > 1 && !loading && (
          <Pagination page={page} totalPages={totalPages} onChange={handlePageChange} />
        )}
      </main>
    </>
  );
}

export default Blog;
