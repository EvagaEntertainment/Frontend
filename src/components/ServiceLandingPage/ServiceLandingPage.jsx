'use client';
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaCheckCircle, FaStar, FaArrowRight, FaCalendarAlt, FaTools, FaHome, FaPhone } from 'react-icons/fa';
import FAQSection from '../FAQSection/FAQSection';
import eventServicesApi from '../../services/eventServicesApi';

// BookingForm uses useSearchParams + browser APIs — must be client-only
const BookingForm = dynamic(() => import('../../pages/BookingForm'), {
  ssr: false, loading: () => (
    <div className="flex items-center justify-center py-16">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  )
});


const WHATSAPP = '918050279101';

/* ─── animation ─────────────────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' },
  }),
};

/* ─── BREADCRUMB ─────────────────────────────────────────────────────────── */
function Breadcrumb({ items }) {
  return (
    <nav className="bg-white border-b border-borderPrimary" aria-label="Breadcrumb">
      <div className="max-w-7xl mx-auto px-6 py-2.5">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-textGray">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-center gap-1.5">
              {idx > 0 && <span className="text-textGray">/</span>}
              {item.href ? (
                <Link href={item.href} className="hover:text-primary transition-colors duration-200">
                  {item.label}
                </Link>
              ) : (
                <span className="text-primary font-medium">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}

/* ─── HERO ───────────────────────────────────────────────────────────────── */
function Hero({ config }) {
  const waLink = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
    `Hi! I'm interested in ${config.title}. Can you help me plan my event?`
  )}`;

  return (
    <section className="bg-white py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Left — text */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          >
            {/* Badge */}
            <motion.div variants={fadeUp} custom={0} className="mb-4">
              <span className="inline-block bg-background text-primary text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full">
                {config.badge}
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-primary text-4xl md:text-5xl font-normal leading-tight mb-4"
            >
              {config.h1}
            </motion.h1>

            {/* Yellow underline — matching WhyChooseUs style */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="h-1 w-20 bg-highlightYellow mb-5 rounded-full origin-left"
            />

            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-textGray text-base leading-relaxed mb-6 max-w-lg"
            >
              {config.heroSubtitle}
            </motion.p>

            {/* Stats */}
            <motion.div
              variants={fadeUp}
              custom={3}
              className="flex flex-wrap gap-8 mb-8 pb-8 border-b border-borderPrimary"
            >
              {config.stats.map((s, i) => (
                <div key={i}>
                  <p className="text-primary text-2xl font-bold">{s.value}</p>
                  <p className="text-textGray text-sm mt-0.5">{s.label}</p>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div variants={fadeUp} custom={4} className="flex flex-wrap gap-3">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                id="hero-whatsapp-btn"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20b85a] text-white font-semibold text-sm px-5 py-3 rounded-xl transition-all duration-200 hover:-translate-y-0.5 shadow-md"
              >
                <FaWhatsapp size={16} />
                Chat on WhatsApp
              </a>
              <a
                href="#consultation"
                id="hero-consult-btn"
                className="bg-primary text-white hover:bg-accent hover:border-2 hover:border-[#CBAB00] inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold w-fit transition-all duration-200"
              >
                Get Free Consultation
                <FaArrowRight size={12} />
              </a>
            </motion.div>
          </motion.div>

          {/* Right — hero image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut', delay: 0.15 }}
            className="relative"
          >
            <div className="absolute -top-6 -right-6 w-40 h-40 bg-highlightYellow/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
              <Image
                src={config.heroImage}
                alt={config.heroImageAlt}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── GALLERY ────────────────────────────────────────────────────────────── */
function Gallery({ gallery }) {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ type: 'spring', stiffness: 120 }}
          className="flex flex-col items-center mb-12"
        >
          <h2 className="text-primary text-3xl md:text-4xl font-normal text-center mb-4">
            A Glimpse of Our Work
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="h-1 w-24 bg-highlightYellow"
          />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {gallery.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: idx * 0.07, duration: 0.45 }}
              className={`relative rounded-2xl overflow-hidden group ${idx === 0
                ? 'col-span-2 md:col-span-1 md:row-span-2'
                : ''
                }`}
              style={{ minHeight: idx === 0 ? '300px' : '180px' }}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 400px, 800px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {item.caption && (
                <div className="absolute bottom-0 inset-x-0 p-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <span className="text-white text-sm font-medium">{item.caption}</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── FEATURES ───────────────────────────────────────────────────────────── */
function Features({ features }) {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ type: 'spring', stiffness: 120 }}
          className="flex flex-col items-center mb-12"
        >
          <h2 className="text-primary text-3xl md:text-4xl font-normal text-center mb-4">
            Everything Taken Care Of
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="h-1 w-24 bg-highlightYellow"
          />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: idx * 0.08 }}
              whileHover={{ x: 6 }}
              className="flex items-start gap-4 p-5 rounded-2xl border border-borderPrimary hover:border-primary/30 hover:shadow-md transition-all duration-300"
            >
              <div className="shrink-0 w-11 h-11 rounded-xl bg-background flex items-center justify-center text-xl">
                {f.icon}
              </div>
              <div>
                <h3 className="text-primary font-semibold text-sm mb-1">{f.title}</h3>
                <p className="text-textGray text-sm leading-relaxed">{f.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── WHY EEVAGGA ────────────────────────────────────────────────────────── */
function WhyEevagga({ customPoints }) {
  const defaultPoints = [
    { icon: '🎯', title: 'End-to-End Planning', desc: 'From concept to cleanup — every detail handled by us.' },
    { icon: '✨', title: 'Bespoke Themes', desc: 'Every celebration is designed uniquely for you, no templates.' },
    { icon: '📸', title: 'Flawless Execution', desc: 'Dedicated on-ground team, zero stress for you on the day.' },
    { icon: '💛', title: 'Premium Quality', desc: 'Top-tier décor, vendors and materials at every price point.' },
    { icon: '🏆', title: '500+ Events Done', desc: 'Trusted by hundreds of families across Bangalore.' },
    { icon: '⚡', title: 'Always-On Support', desc: 'From start to finish we are with you — 24/7 availability.' },
  ];
  const points = customPoints && customPoints.length > 0 ? customPoints : defaultPoints;

  return (
    <motion.section
      className="py-16 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="flex flex-col items-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 120 }}
        >
          <h2 className="text-primary text-3xl md:text-4xl font-normal text-center mb-4">
            Why Choose Eevagga?
          </h2>
          <motion.div
            className="h-1 w-24 bg-highlightYellow mt-4 mx-auto"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          />
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Left */}
          <div className="lg:w-1/2 space-y-8">
            <p className="text-textGray text-lg leading-8">
              With a passion for unforgettable experiences, Eevagga is built to simplify and elevate every step of event planning. Our commitment is rooted in innovation, reliability, and a deep understanding of what makes celebrations truly special.
            </p>
            <div>
              <h3 className="text-primary text-2xl md:text-3xl font-normal mb-4">
                Our Commitment
                <div className="h-[3px] w-16 bg-primary mt-3" />
              </h3>
              <div className="space-y-6">
                {points.slice(0, 4).map((p, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ x: 10 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="flex items-start gap-4"
                  >
                    <div>
                      <h4 className="text-primary font-semibold text-base">{p.title}</h4>
                      <p className="text-textGray text-sm mt-1">{p.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — extra points + visual */}
          <div className="lg:w-1/2 space-y-5">
            {points.slice(4).map((p, idx) => (
              <motion.div
                key={idx}
                whileHover={{ x: 10 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="flex items-start gap-4 p-5 rounded-2xl bg-background border border-borderPrimary"
              >
                <span className="text-2xl shrink-0">{p.icon}</span>
                <div>
                  <h4 className="text-primary font-semibold text-base">{p.title}</h4>
                  <p className="text-textGray text-sm mt-1">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

/* ─── PRICING ────────────────────────────────────────────────────────────── */
// function Pricing({ pricing, config }) {
//   const waLink = (plan) =>
//     `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
//       `Hi! I'm interested in the ${plan.name} package for ${config.title}. Please share more details.`
//     )}`;

//   return (
//     <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
//       <div className="max-w-7xl mx-auto">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, margin: '-80px' }}
//           transition={{ type: 'spring', stiffness: 120 }}
//           className="flex flex-col items-center mb-12"
//         >
//           <h2 className="text-primary text-3xl md:text-4xl font-normal text-center mb-4">
//             Simplified Pricing
//           </h2>
//           <motion.div
//             initial={{ scaleX: 0 }}
//             whileInView={{ scaleX: 1 }}
//             viewport={{ once: true }}
//             transition={{ delay: 0.3, duration: 0.6 }}
//             className="h-1 w-24 bg-highlightYellow mb-4"
//           />
//           <p className="text-textGray text-sm text-center max-w-md">
//             Select the perfect level of luxury for your celebration with our flexible options.
//           </p>
//         </motion.div>

//         <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
//           {pricing.map((plan, idx) => (
//             <motion.div
//               key={idx}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true, margin: '-60px' }}
//               transition={{ delay: idx * 0.1, duration: 0.45 }}
//               className={`relative rounded-2xl overflow-hidden border bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${plan.featured
//                 ? 'border-primary shadow-lg'
//                 : 'border-borderPrimary shadow-sm hover:border-primary/30'
//                 }`}
//             >
//               {plan.featured && (
//                 <div className="bg-primary text-white text-center text-xs font-bold tracking-widest uppercase py-2">
//                   Most Popular
//                 </div>
//               )}
//               <div className="p-6">
//                 <h3 className="text-textPrimary font-bold text-lg mb-0.5">{plan.name}</h3>
//                 <p className="text-textGray text-xs mb-4">{plan.subtitle}</p>

//                 <div className="flex items-baseline gap-2 mb-5">
//                   <span className="text-textGray text-xs">Starting from</span>
//                   <span className={`font-bold text-2xl ${plan.featured ? 'text-primary' : 'text-textPrimary'}`}>
//                     ₹{plan.price.toLocaleString('en-IN')}
//                   </span>
//                 </div>

//                 <ul className="space-y-2.5 mb-6">
//                   {plan.includes.map((item, i) => (
//                     <li key={i} className="flex items-start gap-2 text-sm text-textGray">
//                       <FaCheckCircle
//                         size={13}
//                         className={`mt-0.5 shrink-0 ${plan.featured ? 'text-primary' : 'text-borderSecondary'}`}
//                       />
//                       {item}
//                     </li>
//                   ))}
//                 </ul>

//                 <a
//                   href={waLink(plan)}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   id={`pricing-${plan.name.toLowerCase()}-btn`}
//                   className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${
//                     plan.featured
//                       ? 'bg-primary text-white hover:bg-accent hover:border-2 hover:border-[#CBAB00]'
//                       : 'bg-transparent text-primary border-2 border-primary hover:bg-[#6A1B9A33]'
//                   }`}
//                 >
//                   <FaWhatsapp size={14} />
//                   Get a Custom Quote
//                 </a>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* Custom nudge */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.45 }}
//           className="bg-white border border-borderPrimary rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
//         >
//           <div>
//             <p className="text-textPrimary font-semibold mb-1">Need a fully customised package?</p>
//             <p className="text-textGray text-sm">
//               Tell us your vision and we will craft a bespoke plan just for you. No obligation.
//             </p>
//           </div>
//           <a
//             href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent('Hi! I need a custom quote for my event.')}`}
//             target="_blank"
//             rel="noopener noreferrer"
//             id="custom-quote-btn"
//             className="shrink-0 bg-primary text-white hover:bg-accent hover:border-2 hover:border-[#CBAB00] inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold w-fit transition-all duration-200"
//           >
//             <FaWhatsapp size={14} />
//             Get a Custom Quote
//           </a>
//         </motion.div>
//       </div>
//     </section>
//   );
// }

/* ─── BOOKING FORM SECTION ───────────────────────────────────────────────── */
function BookingFormSection({ config }) {
  return (
    <section id="consultation" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-background">
      <div className="max-w-3xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ type: 'spring', stiffness: 120 }}
          className="flex flex-col items-center mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
            <FaCalendarAlt size={10} />
            Free Consultation
          </div>
          <h2 className="text-primary text-3xl md:text-4xl font-normal text-center mb-4">
            Book Your {config.title}
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="h-1 w-24 bg-highlightYellow mb-4"
          />
          <p className="text-textGray text-sm text-center max-w-sm">
            Fill in the details below and our event specialist will reach out within 24 hours.
          </p>
        </motion.div>

        {/* Real BookingForm — pre-fills event type from page config */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.45 }}
          className="relative"
        >
          {/* Decorative blobs */}
          <div className="absolute -top-8 -left-8 w-32 h-32 bg-highlightYellow/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <BookingForm
            inline={true}
            defaultEventType={config.defaultEventType || 'Birthdays'}
            defaultLocation="Bangalore"
          />
        </motion.div>

        <p className="text-center text-sm text-textGray mt-5">
          Prefer to call?{' '}
          <a href="tel:+918050279101" className="text-primary font-semibold hover:underline">
            +91 80502 79101
          </a>
        </p>
      </div>
    </section>
  );
}

/* ─── RELATED LINKS ──────────────────────────────────────────────────────── */
function RelatedServices({ links }) {
  if (!links || links.length === 0) return null;
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-t border-borderPrimary">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-primary text-2xl md:text-3xl font-normal mb-8 text-center sm:text-left">
          Explore Related Celebration Services
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {links.map((link, idx) => (
            <Link
              key={idx}
              href={link.href}
              className="flex items-center justify-between p-4 rounded-xl border border-borderPrimary bg-background hover:border-primary/40 hover:shadow-sm transition-all duration-300 group"
            >
              <span className="text-textPrimary text-sm font-medium group-hover:text-primary transition-colors">
                {link.label}
              </span>
              <FaArrowRight size={10} className="text-borderSecondary group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── TESTIMONIALS / REVIEWS ────────────────────────────────────────────── */
function ReviewsSection({ reviews, pageTitle }) {
  if (!reviews || reviews.length === 0) return null;

  const totalRating = reviews.reduce((acc, curr) => acc + curr.rating, 0);
  const avgRating = (totalRating / reviews.length).toFixed(1);

  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": pageTitle,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": avgRating,
      "reviewCount": reviews.length.toString(),
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": reviews.map(r => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": r.author
      },
      "datePublished": r.date || "2026-06-20",
      "reviewBody": r.text,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": r.rating.toString(),
        "bestRating": "5",
        "worstRating": "1"
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema).replace(/</g, '\\u003c') }}
      />
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background border-t border-borderPrimary">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-primary text-3xl md:text-4xl font-normal text-center mb-4">
              What Our Clients Say
            </h2>
            <div className="h-1 w-24 bg-highlightYellow mb-4" />
            <p className="text-textGray text-sm text-center">
              Rated <span className="font-semibold text-primary">{avgRating}/5</span> based on {reviews.length} customer reviews.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((r, idx) => (
              <div key={idx} className="bg-white border border-borderPrimary rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300">
                <div>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} size={14} className={i < r.rating ? 'text-[#6A1B9A]' : 'text-borderSecondary'} />
                    ))}
                  </div>
                  <p className="text-textGray text-sm italic leading-relaxed mb-4">
                    "{r.text}"
                  </p>
                </div>
                <div className="border-t border-borderPrimary pt-3 mt-3 flex items-center justify-between">
                  <span className="text-primary font-semibold text-xs">{r.author}</span>
                  {r.date && <span className="text-textGray/60 text-xs">{r.date}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* ─── SKELETON LOADER ────────────────────────────────────────────────────── */
function SkeletonLoader() {
  return (
    <div className="w-full bg-white min-h-screen animate-pulse space-y-12 pb-20">
      {/* Breadcrumb Skeleton */}
      <div className="border-b border-borderPrimary py-3 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-4 w-48 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Hero Skeleton */}
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="h-6 w-32 bg-gray-200 rounded-full"></div>
          <div className="space-y-3">
            <div className="h-10 w-full bg-gray-200 rounded-xl"></div>
            <div className="h-10 w-5/6 bg-gray-200 rounded-xl"></div>
          </div>
          <div className="h-1 w-20 bg-gray-200 rounded-full"></div>
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-200 rounded"></div>
            <div className="h-4 w-11/12 bg-gray-200 rounded"></div>
            <div className="h-4 w-4/5 bg-gray-200 rounded"></div>
          </div>
          <div className="flex gap-4 pt-2">
            <div className="h-12 w-40 bg-gray-200 rounded-xl"></div>
            <div className="h-12 w-44 bg-gray-200 rounded-xl"></div>
          </div>
        </div>
        <div className="aspect-[4/3] bg-gray-200 rounded-2xl"></div>
      </div>

      {/* Stats Bar Skeleton */}
      <div className="max-w-7xl mx-auto px-6 border-y border-gray-100 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-2 flex flex-col items-center">
              <div className="h-8 w-20 bg-gray-200 rounded"></div>
              <div className="h-4 w-28 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Gallery Skeleton */}
      <div className="max-w-7xl mx-auto px-6 space-y-8">
        <div className="flex flex-col items-center space-y-3">
          <div className="h-8 w-64 bg-gray-200 rounded"></div>
          <div className="h-1 w-24 bg-gray-200 rounded-full"></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="col-span-2 md:col-span-1 md:row-span-2 h-[320px] bg-gray-200 rounded-2xl"></div>
          <div className="h-[150px] bg-gray-200 rounded-2xl"></div>
          <div className="h-[150px] bg-gray-200 rounded-2xl"></div>
          <div className="h-[150px] bg-gray-200 rounded-2xl"></div>
          <div className="h-[150px] bg-gray-200 rounded-2xl"></div>
        </div>
      </div>
    </div>
  );
}

/* ─── PAGE EXPORT ────────────────────────────────────────────────────────── */
export default function ServiceLandingPage({ config }) {
  const [dynamicConfig, setDynamicConfig] = useState(null);
  const [isMaintenance, setIsMaintenance] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const fetchConfig = async () => {
      try {
        const path = window.location.pathname;
        const response = await eventServicesApi.getEventServicePageByPath(path);
        if (!active) return;
        
        if (response && response.data) {
          const resData = response.data;
          if (resData.isMaintenance) {
            setIsMaintenance(true);
          } else if (resData.success && resData.data) {
            setDynamicConfig(resData.data);
          }
        }
      } catch (err) {
        console.error("Error loading dynamic configuration:", err);
      } finally {
        if (active) setLoading(false);
      }
    };
    
    fetchConfig();
    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return <SkeletonLoader />;
  }

  if (isMaintenance) {
    return (
      <div className="relative min-h-screen bg-[#6A1B9A] overflow-hidden flex flex-col items-center justify-center px-6 py-16">
        {/* Decorative blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#F5C518]/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none" />
        <div className="absolute top-1/2 right-0 w-64 h-64 bg-purple-300/10 rounded-full blur-2xl translate-x-1/2 pointer-events-none" />

        {/* Floating sparkles */}
        <div className="absolute inset-0 pointer-events-none select-none">
          {['✨','🎉','🎊','⭐','✨','🌟','🎈','✨'].map((emoji, i) => (
            <span
              key={i}
              className="absolute text-xl opacity-20 animate-bounce"
              style={{
                left: `${10 + i * 11}%`,
                top: `${15 + (i % 3) * 25}%`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: `${2 + (i % 3)}s`
              }}
            >{emoji}</span>
          ))}
        </div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative z-10 w-full max-w-xl"
        >
          {/* Gold top accent bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-[#F5C518] via-yellow-300 to-[#F5C518] rounded-t-2xl" />

          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-b-2xl px-8 py-12 md:px-14 md:py-16 text-center space-y-8 shadow-2xl">

            {/* Icon with ring animation */}
            <div className="relative w-24 h-24 mx-auto">
              <div className="absolute inset-0 rounded-full bg-[#F5C518]/20 animate-ping" />
              <div className="absolute inset-2 rounded-full bg-[#F5C518]/10" />
              <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-[#F5C518] to-yellow-400 flex items-center justify-center shadow-lg shadow-yellow-500/30">
                <FaTools size={34} className="text-[#6A1B9A]" />
              </div>
            </div>

            {/* Eyebrow label */}
            <div className="inline-flex items-center gap-2 bg-white/10 text-yellow-300 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full border border-yellow-400/30">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse inline-block" />
              Coming Back Soon
            </div>

            {/* Heading */}
            <div className="space-y-3">
              <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
                Under <span className="text-[#F5C518]">Maintenance</span>
              </h1>
              <p className="text-white/70 text-base leading-relaxed max-w-sm mx-auto">
                We're sprucing up this page to deliver you an even more magical celebration experience. We'll be back shortly!
              </p>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-yellow-400 text-lg">✦</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Feature pills */}
            <div className="flex flex-wrap justify-center gap-2">
              {['Premium Decor', 'Expert Planners', 'Seamless Execution'].map(tag => (
                <span key={tag} className="flex items-center gap-1.5 bg-white/10 text-white/80 text-xs px-3 py-1.5 rounded-full border border-white/10">
                  <FaCheckCircle size={10} className="text-[#F5C518]" />
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 bg-[#F5C518] hover:bg-yellow-400 text-[#6A1B9A] font-bold text-sm px-7 py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-yellow-500/30 hover:shadow-yellow-400/40 hover:-translate-y-0.5"
              >
                <FaHome size={14} />
                Back to Home
              </Link>
              <Link
                href="/contact-us"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm px-7 py-3.5 rounded-xl border border-white/20 transition-all duration-200 hover:-translate-y-0.5"
              >
                <FaPhone size={12} />
                Contact Us
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Bottom brand tag */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="relative z-10 mt-10 text-white/40 text-xs tracking-widest uppercase"
        >
          Eevagga Entertainment © {new Date().getFullYear()}
        </motion.p>
      </div>
    );
  }

  // Resolve S3 relative key path to full S3 URLs
  const resolveImageUrl = (src) => {
    if (!src) return "";
    if (src.startsWith("http://") || src.startsWith("https://") || src.startsWith("data:") || src.startsWith("blob:")) {
      return src;
    }
    return (process.env.NEXT_PUBLIC_API_Aws_Image_BASE_URL || "") + src;
  };

  // 1. Resolve dynamic Hero Image or fall back to static image
  const resolvedHeroImage = dynamicConfig && dynamicConfig.heroImage && dynamicConfig.heroImage.trim() !== ""
    ? resolveImageUrl(dynamicConfig.heroImage)
    : config.heroImage;

  // 2. Resolve dynamic Gallery, fallback to static gallery images if empty slots
  const resolvedGallery = () => {
    const staticGallery = config.gallery || [];
    if (!dynamicConfig) return staticGallery;
    
    const dynamicGallery = dynamicConfig.gallery || [];
    
    // Filter dynamic gallery to find items that actually have an uploaded image path
    const validDynamicItems = dynamicGallery.filter(item => item.src && item.src.trim() !== "");
    
    if (validDynamicItems.length > 0) {
      // Return ONLY the dynamic images (with resolved S3 base URLs)
      return validDynamicItems.map(item => ({
        src: resolveImageUrl(item.src),
        alt: item.alt || "Event decoration setup",
        caption: item.caption || "Portfolio Gallery"
      }));
    }
    
    // Fall back to static gallery if no database images are uploaded
    return staticGallery;
  };

  // Merge static default props config with fetched dynamic database values
  const activeConfig = dynamicConfig ? {
    ...config,
    ...dynamicConfig,
    title: (dynamicConfig.title && dynamicConfig.title.trim()) ? dynamicConfig.title : config.title,
    badge: (dynamicConfig.badge && dynamicConfig.badge.trim()) ? dynamicConfig.badge : config.badge,
    h1: (dynamicConfig.h1 && dynamicConfig.h1.trim()) ? dynamicConfig.h1 : config.h1,
    heroSubtitle: (dynamicConfig.heroSubtitle && dynamicConfig.heroSubtitle.trim()) ? dynamicConfig.heroSubtitle : config.heroSubtitle,
    heroImageAlt: (dynamicConfig.heroImageAlt && dynamicConfig.heroImageAlt.trim()) ? dynamicConfig.heroImageAlt : config.heroImageAlt,
    heroImage: resolvedHeroImage,
    gallery: resolvedGallery(),
    stats: (dynamicConfig.stats && dynamicConfig.stats.length > 0) ? dynamicConfig.stats : config.stats,
    features: (dynamicConfig.features && dynamicConfig.features.length > 0) ? dynamicConfig.features : config.features,
    relatedLinks: (dynamicConfig.relatedLinks && dynamicConfig.relatedLinks.length > 0) ? dynamicConfig.relatedLinks : config.relatedLinks,
  } : config;

  return (
    <main>
      <Breadcrumb items={config.breadcrumbs} />
      <Hero config={activeConfig} />
      <Gallery gallery={activeConfig.gallery} />
      <Features features={activeConfig.features} />
      <WhyEevagga customPoints={config.whyPoints} />
      {/* <Pricing pricing={config.pricing} config={config} /> */}
      <BookingFormSection config={activeConfig} />
      <RelatedServices links={activeConfig.relatedLinks} />
      <ReviewsSection reviews={config.reviews} pageTitle={activeConfig.title} />
      <FAQSection customFaqs={config.faqs} />
    </main>
  );
}
