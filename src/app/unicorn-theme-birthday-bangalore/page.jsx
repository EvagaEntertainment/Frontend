import { Suspense } from 'react';
import { ogImages } from '../_seo';
import ServiceLandingPage from '../../components/ServiceLandingPage/ServiceLandingPage';

/* ─── SEO Metadata ─────────────────────────────────────────────────────── */
export const metadata = {
  title: 'Unicorn Theme Birthday Bangalore | Magical Party Setup — Eevagga',
  description:
    'Create a magical unicorn theme birthday party in Bangalore with Eevagga. Pastel balloon arches, unicorn cakes, rainbow décor & full planning. Book your free consultation today.',
  keywords:
    'unicorn theme birthday Bangalore, unicorn birthday party Bangalore, unicorn birthday decoration Bangalore, unicorn theme birthday planner Bangalore',
  alternates: {
    canonical: 'https://www.eevagga.com/unicorn-theme-birthday-bangalore',
  },
  openGraph: {
    title: 'Unicorn Theme Birthday Bangalore | Magical Party Setup — Eevagga',
    description:
      'Pastel balloon arches, unicorn cakes & rainbow décor. Magical unicorn theme birthdays in Bangalore — fully planned by Eevagga.',
    url: 'https://www.eevagga.com/unicorn-theme-birthday-bangalore',
    siteName: 'Eevagga',
    type: 'website',
    images: ogImages,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Unicorn Theme Birthday Bangalore — Eevagga',
    description: 'Magical unicorn theme birthday parties in Bangalore. Pastel décor, rainbow setups & full planning.',
  },
};

/* ─── JSON-LD Schemas ──────────────────────────────────────────────────── */
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://www.eevagga.com/unicorn-theme-birthday-bangalore#service',
  name: 'Unicorn Theme Birthday Party in Bangalore',
  description:
    'Full-service unicorn theme birthday planning in Bangalore. Includes pastel balloon arches, unicorn cake coordination, rainbow floral décor, themed invitations, photography and on-ground execution.',
  provider: { '@id': 'https://www.eevagga.com/#organization' },
  serviceType: 'Unicorn Theme Birthday Party Planning',
  areaServed: { '@type': 'City', name: 'Bangalore', sameAs: 'https://en.wikipedia.org/wiki/Bangalore' },
  url: 'https://www.eevagga.com/unicorn-theme-birthday-bangalore',
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'INR',
    lowPrice: '20000',
    highPrice: '80000',
    offerCount: '3',
  },
};

const eventSchema = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: 'Unicorn Theme Birthday Party — Eevagga Bangalore',
  description:
    'A magical unicorn theme birthday celebration curated by Eevagga in Bangalore with pastel décor, rainbow balloons, unicorn cakes and full event management.',
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  location: {
    '@type': 'Place',
    name: 'Bangalore',
    address: { '@type': 'PostalAddress', addressLocality: 'Bangalore', addressCountry: 'IN' },
  },
  organizer: { '@type': 'Organization', name: 'Eevagga', url: 'https://www.eevagga.com' },
  offers: {
    '@type': 'Offer',
    priceCurrency: 'INR',
    price: '20000',
    url: 'https://www.eevagga.com/unicorn-theme-birthday-bangalore',
    availability: 'https://schema.org/InStock',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.eevagga.com' },
    { '@type': 'ListItem', position: 2, name: 'Birthday Planner Bangalore', item: 'https://www.eevagga.com/birthday-planner-bangalore' },
    { '@type': 'ListItem', position: 3, name: 'Unicorn Theme Birthday Bangalore', item: 'https://www.eevagga.com/unicorn-theme-birthday-bangalore' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much does a unicorn theme birthday party cost in Bangalore?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A unicorn theme birthday party in Bangalore starts from ₹20,000 for an intimate setup with balloon décor and backdrop, up to ₹80,000 for a luxury setup with full floral installations, photography and custom unicorn cake.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is included in a unicorn theme birthday package?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our unicorn theme packages include pastel balloon arches, rainbow floral décor, unicorn backdrop and signage, horn & ear props, themed dessert table styling, custom unicorn cake coordination, and photography coverage.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is unicorn theme suitable for adults too?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely! Unicorn themes are popular for all ages. For adults, we elevate the aesthetic with gold foil accents, floral installations and a more sophisticated pastel palette. It is perfect for milestone birthdays.',
      },
    },
    {
      '@type': 'Question',
      name: 'How far in advance should I book a unicorn theme birthday in Bangalore?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We recommend booking 2–3 weeks ahead to secure your preferred date and allow time for custom props. For weekend events or large guest counts, 4 weeks is ideal.',
      },
    },
  ],
};

/* ─── Page Config ──────────────────────────────────────────────────────── */
const pageConfig = {
  title: 'Unicorn Theme Birthday Bangalore',
  badge: 'Magical Theme Specialists',
  h1: 'Unicorn Theme Birthday Party in Bangalore — Magical Setups by Eevagga',
  heroSubtitle:
    'Transform your celebration into a whimsical wonderland. Pastel balloon arches, rainbow floral décor, custom unicorn cakes and full end-to-end planning — exclusively by Eevagga in Bangalore.',
  heroImage: '/service-pages/birthday-hero.png',
  heroImageAlt: 'Unicorn theme birthday decoration in Bangalore by Eevagga',

  stats: [
    { value: '200+', label: 'Theme Events Done' },
    { value: '4.9★', label: 'Average Rating' },
    { value: '100%', label: 'Custom Designs' },
    { value: '48hr', label: 'Setup Turnaround' },
  ],

  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'Birthday Planner Bangalore', href: '/birthday-planner-bangalore' },
    { label: 'Unicorn Theme Birthday Bangalore' },
  ],

  gallery: [
    { src: '/service-pages/birthday-hero.png', alt: 'Unicorn theme birthday decoration Bangalore', caption: 'Unicorn Balloon Arch' },
    { src: '/service-pages/birthday-gallery-1.png', alt: 'Pastel rainbow birthday setup Bangalore', caption: 'Rainbow Backdrop' },
    { src: '/service-pages/birthday-gallery-2.png', alt: 'Unicorn cake and dessert table Bangalore', caption: 'Unicorn Dessert Table' },
    { src: '/service-pages/birthday-gallery-3.png', alt: 'Unicorn theme stage decoration Bangalore', caption: 'Themed Stage' },
    { src: '/service-pages/birthday-gallery-4.png', alt: 'Pastel balloon garland birthday party Bangalore', caption: 'Pastel Garland' },
  ],

  features: [
    {
      icon: '🦄',
      title: 'Unicorn Balloon Arch & Garlands',
      description: 'Stunning organic balloon arches in blush, lavender, mint and gold — the centrepiece of every unicorn celebration.',
    },
    {
      icon: '🌈',
      title: 'Rainbow Floral & Prop Installations',
      description: 'Custom rainbow floral walls, cloud props and glitter stars creating an immersive magical environment.',
    },
    {
      icon: '🎂',
      title: 'Custom Unicorn Cake Coordination',
      description: 'We coordinate with Bangalore\'s top bakers to deliver multi-tier unicorn cakes with fondant horns and edible flowers.',
    },
    {
      icon: '📸',
      title: 'Themed Photography & Reels',
      description: 'Professional photographers capture every magical moment — perfect for Instagram-worthy reels and memories.',
    },
    {
      icon: '✨',
      title: 'Themed Stationery & Invitations',
      description: 'Matching digital invitations, name banners and favour tags to tie the entire unicorn theme together beautifully.',
    },
    {
      icon: '🎪',
      title: 'Full Event Setup & Teardown',
      description: 'Our team handles everything — arrival, setup, on-ground management and complete post-event cleanup.',
    },
  ],

  pricing: [
    {
      name: 'Starter',
      subtitle: 'Perfect for intimate unicorn parties',
      price: 20000,
      featured: false,
      includes: [
        'Unicorn balloon arch (4–5 ft)',
        'Themed backdrop & name banner',
        'Basic table & floor décor',
        'Cleanup & post-event support',
        'Up to 30 guests',
      ],
    },
    {
      name: 'Premium',
      subtitle: 'Our most popular unicorn package',
      price: 40000,
      featured: true,
      includes: [
        'Full organic balloon garland',
        'Rainbow floral installations',
        'Unicorn cake coordination',
        'Themed stage & backdrop',
        'Photography (2 hours)',
        'Themed stationery & props',
        'Up to 75 guests',
      ],
    },
    {
      name: 'Luxury',
      subtitle: 'Grand magical celebration',
      price: 80000,
      featured: false,
      includes: [
        'Bespoke unicorn theme design',
        'Luxury floral & prop installations',
        'Full-day photography + video',
        'Live entertainment / performers',
        'Dessert table styling',
        'Dedicated event manager',
        '100+ guests',
      ],
    },
  ],

  faqs: [
    {
      question: 'How much does a unicorn theme birthday party cost in Bangalore?',
      answer:
        'Unicorn theme birthday parties in Bangalore start from ₹20,000 for intimate setups with balloon décor and a backdrop, up to ₹80,000 for luxury full-floral installations with photography and a custom unicorn cake.',
    },
    {
      question: 'What is included in a unicorn theme birthday package by Eevagga?',
      answer:
        'Our packages include pastel balloon arches, rainbow floral décor, unicorn backdrop, themed stationery, custom cake coordination and photography. The exact inclusions depend on the package tier you choose.',
    },
    {
      question: 'Is unicorn theme suitable for adults as well?',
      answer:
        'Yes! We create sophisticated unicorn setups for adults using gold foil accents, elegant floral arrangements and a curated pastel palette — perfect for milestone 18th, 21st or 30th birthdays.',
    },
    {
      question: 'How far in advance should I book?',
      answer:
        'We recommend booking 2–3 weeks in advance, or 4 weeks for weekend events and larger gatherings. Custom props and cakes require lead time for the best results.',
    },
    {
      question: 'Can I customise colours and props?',
      answer:
        'Absolutely! Every unicorn setup by Eevagga is fully customised. You choose your preferred colour palette, prop style and cake design. We make your vision a reality.',
    },
  ],
};

/* ─── Page Component ───────────────────────────────────────────────────── */
export default function UnicornThemeBirthdayBangalorePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema).replace(/</g, '\\u003c') }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema).replace(/</g, '\\u003c') }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c') }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }}
      />
      <Suspense fallback={null}>
        <ServiceLandingPage config={pageConfig} />
      </Suspense>
    </>
  );
}
