'use client';
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import useServices from "../hooks/useServices";
import commonApis from "../services/commonApis";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";

/* ── helpers ─────────────────────────────────────────────────────────── */
function formatDate(str) {
  if (!str) return "";
  return new Date(str).toLocaleDateString("en-IN", {
    day: "numeric", month: "long", year: "numeric",
  });
}

function getReadTime(content = "") {
  const words = content.replace(/<[^>]+>/g, "").split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

/* ── Reading progress ────────────────────────────────────────────────── */
function ProgressBar() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const h = el.scrollHeight - el.clientHeight;
      setPct(h > 0 ? (el.scrollTop / h) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-gray-100 pointer-events-none">
      <div className="h-full bg-primary transition-[width] duration-75" style={{ width: `${pct}%` }} />
    </div>
  );
}

/* ── Skeleton ────────────────────────────────────────────────────────── */
function Skeleton() {
  return (
    <div className="max-w-2xl mx-auto px-4 md:px-0 py-12 animate-pulse space-y-5">
      <div className="h-4 bg-gray-200 rounded w-20" />
      <div className="h-8 bg-gray-200 rounded w-3/4" />
      <div className="h-8 bg-gray-200 rounded w-1/2" />
      <div className="h-3 bg-gray-200 rounded w-40" />
      <div className="h-60 bg-gray-200 rounded-xl w-full" />
      {[...Array(5)].map((_, i) => (
        <div key={i} className={`h-3 bg-gray-200 rounded ${i % 4 === 3 ? "w-2/3" : "w-full"}`} />
      ))}
    </div>
  );
}

/* ── Related card ────────────────────────────────────────────────────── */
function RelatedCard({ blog }) {
  const img = process.env.NEXT_PUBLIC_API_Aws_Image_BASE_URL + (blog?.coverImage || "");
  return (
    <Link href={`/blogs/singleBlog/${blog?._id}`} className="group flex flex-col">
      <div className="overflow-hidden rounded-xl bg-gray-100 mb-3">
        <img
          src={img}
          alt={blog?.title}
          className="w-full h-36 object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          loading="lazy"
        />
      </div>
      <h3 className="text-sm font-semibold text-textPrimary leading-snug line-clamp-2 group-hover:text-primary transition-colors duration-200">
        {blog?.title}
      </h3>
    </Link>
  );
}

/* ── Main ────────────────────────────────────────────────────────────── */
function SingleBlogPage({ initialBlog }) {
  const params = useParams();
  const { blogId } = params || {};
  const [blog, setBlog] = useState(initialBlog);
  const [related, setRelated] = useState([]);
  const router = useRouter();
  const getOneBlogApi = useServices(commonApis.getOneBlog);
  const getAllBlogsApi = useServices(commonApis.getAllBlogs);

  useEffect(() => {
    if (blogId && !initialBlog) {
      getOneBlogApi.callApi(blogId).then(res => {
        setBlog(res?.data || res || null);
      });
    }

    if (blogId) {
      getAllBlogsApi.callApi({ page: 1 }).then(res => {
        const list = (res?.blogs || []).filter(b => b._id !== blogId).slice(0, 3);
        setRelated(list);
      }).catch(() => {});
    }
  }, [blogId]);

  const imageUrl = blog?.coverImage
    ? process.env.NEXT_PUBLIC_API_Aws_Image_BASE_URL + blog.coverImage
    : null;

  if (!blog) return (
    <>
      <Breadcrumbs />
      <Skeleton />
    </>
  );

  const readTime = getReadTime(blog?.content);

  return (
    <>
      <ProgressBar />
      <Breadcrumbs />

      <article className="bg-white min-h-screen">

        {/* ── Cover image ─────────────────────────────────────────── */}
        {imageUrl && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
            className="w-full bg-gray-100 overflow-hidden"
            style={{ maxHeight: 440 }}
          >
            <img src={imageUrl} alt={blog?.title} className="w-full object-cover" style={{ maxHeight: 440 }} />
          </motion.div>
        )}

        {/* ── Article ─────────────────────────────────────────────── */}
        <div className="max-w-2xl mx-auto px-4 md:px-0 pt-10 pb-20">

          {/* back */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="mb-8">
            <button
              onClick={() => router.back()}
              className="inline-flex items-center gap-1.5 text-sm text-textGray hover:text-primary transition-colors group"
            >
              <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M19 12H5M12 6l-7 6 7 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              All articles
            </button>
          </motion.div>

          {/* title */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.5 }}
            className="font-playfair text-3xl md:text-[2.4rem] font-bold text-textPrimary leading-tight mb-5"
          >
            {blog?.title}
          </motion.h1>

          {/* meta */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
            className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-textGray mb-8 pb-7 border-b border-borderPrimary"
          >
            {blog?.authorName && <span className="font-medium text-textPrimary">{blog.authorName}</span>}
            {blog?.authorName && <span className="w-1 h-1 rounded-full bg-borderPrimary" />}
            {blog?.publishedAt && <span>{formatDate(blog.publishedAt)}</span>}
            <span className="w-1 h-1 rounded-full bg-borderPrimary" />
            <span>{readTime} min read</span>
          </motion.div>

          {/* content */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }}
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: blog?.content }}
          />

          {/* footer */}
          <div className="mt-14 pt-7 border-t border-borderPrimary flex items-center justify-between">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-purpleSecondary transition-colors group"
            >
              <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M19 12H5M12 6l-7 6 7 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              All articles
            </Link>
            <span className="text-xs text-textGray/50">© Eevagga</span>
          </div>
        </div>

        {/* ── Related ──────────────────────────────────────────────── */}
        {related.length > 0 && (
          <section className="border-t border-borderPrimary bg-backgroundOffWhite py-12 px-[4%]">
            <div className="max-w-4xl mx-auto">
              <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-1">More to read</p>
              <h2 className="font-playfair text-2xl font-bold text-textPrimary mb-8">You might also like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {related.map(b => <RelatedCard key={b._id} blog={b} />)}
              </div>
            </div>
          </section>
        )}
      </article>
    </>
  );
}

export default SingleBlogPage;
