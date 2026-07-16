import { Suspense } from 'react';
import { ogImages } from '../_seo';
import ServiceLandingPage from '../../components/ServiceLandingPage/ServiceLandingPage';

/* ─── SEO Metadata ─────────────────────────────────────────────────────── */
export const metadata = {
  title: { absolute: "Premium End-to-End Birthday Party Planner — Eevagga" },
  description:
    "Choose Eevagga, the premier birthday planner for elegant and stylish birthday events. We handle everything from concept to execution. Contact us on WhatsApp.",
  keywords:
    "premium birthday planner, elegant birthday planning, premium birthday event organizer, Eevagga premium birthday, birthday party planners",
  alternates: {
    canonical: 'https://www.eevagga.com/premium-birthday-planner',
  },
  openGraph: {
    title: "Premium Birthday Party Planner | End-to-End Planning — Eevagga",
    description:
      "Celebrate life's special milestones with elegance and style. Eevagga offers complete premium birthday party planning, decor, coordination, and entertainment. Book a free consultation.",
    url: 'https://www.eevagga.com/premium-birthday-planner',
    siteName: 'Eevagga',
    type: 'website',
    images: ogImages,
  },
  twitter: {
    card: 'summary_large_image',
    title: "Premium Birthday Party Planner — Eevagga",
    description: "Elegant and seamless premium birthday planning services. Styling, coordination & entertainment.",
  },
};

/* ─── JSON-LD Schemas ──────────────────────────────────────────────────── */
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://www.eevagga.com/premium-birthday-planner#service',
  name: 'Premium Birthday Planner',
  description:
    "Stylish and elegant birthday planning services. Covers creative theme formulation, premium balloon and prop decorations, stage setup, vendor sourcing, event timeline coordination, and entertainment management.",
  provider: { '@id': 'https://www.eevagga.com/#organization' },
  serviceType: 'Premium Birthday Planning',
  areaServed: { '@type': 'City', name: 'Bangalore', sameAs: 'https://en.wikipedia.org/wiki/Bangalore' },
  url: 'https://www.eevagga.com/premium-birthday-planner',
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'INR',
    lowPrice: 20000,
    highPrice: 80000,
    offerCount: 3,
    availability: 'https://schema.org/InStock',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.eevagga.com' },
    { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://www.eevagga.com/services' },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Premium Birthday Planner',
      item: 'https://www.eevagga.com/premium-birthday-planner',
    },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is included in a premium birthday planning package?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our premium birthday planning covers initial theme conceptualisation, premium decor setup, professional vendor bookings (like sound, lighting, cake bakers), game host/anchor coordination, candid photography, and a dedicated on-site supervisor.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can you set up birthday parties in both indoor and outdoor venues?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! We style and coordinate events in indoor banquet halls, hotel rooms, rooftop venues, restaurant party spaces, and outdoor lawns or terrace gardens.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you manage the actual timeline of the birthday event?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, we draft a complete event flow (welcome of guests, kids activities, cake cutting, dinner timings) and our coordinator manages it on the ground so everything runs smoothly.',
      },
    },
  ],
};

/* ─── Page Config ──────────────────────────────────────────────────────── */
const pageConfig = {
  relatedLinks: [
    {
      "label": "Birthday Planner",
      "href": "/birthday-planner-bangalore"
    },
    {
      "label": "Kids Birthday Planner",
      "href": "/kids-birthday-planner-bangalore"
    },
    {
      "label": "Birthday Decoration",
      "href": "/birthday-decoration-bangalore"
    },
    {
      "label": "Birthday Celebration At Home",
      "href": "/birthday-celebration-at-home-bangalore"
    }
  ],
  title: 'Premium Birthday Planner',
  badge: 'Elegant Celebrations',
  h1: "Premium Birthday Party Planner \u2014 Seamless & Stylish",
  heroSubtitle:
    "Celebrate life's big milestones with absolute style. Eevagga designs and executes elegant birthday parties tailored to your unique preferences, complete with premium décor and end-to-end management.",
  heroImage: '/service-pages/birthday-hero.png',
  heroImageAlt: 'Premium themed birthday stage setup with customized lighting and styling',

  stats: [
    { value: '380+', label: 'Premium Events' },
    { value: 'Custom', label: 'Theme Styling' },
    { value: 'End-to-End', label: 'Execution' },
    { value: '4.9★', label: 'Average Review' },
  ],

  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Premium Birthday Planner' },
  ],

  gallery: [
    {
      src: '/service-pages/birthday-hero.png',
      alt: 'Elegant premium birthday setup Bangalore',
      caption: 'Main Stage Setup',
    },
    {
      src: '/service-pages/birthday-gallery-1.png',
      alt: 'Adult milestone birthday theme decoration',
      caption: 'Thematic Decor',
    },
    {
      src: '/service-pages/birthday-gallery-2.png',
      alt: 'Themed custom treats and cupcakes station',
      caption: 'Dessert Buffet',
    },
    {
      src: '/service-pages/birthday-gallery-3.png',
      alt: 'Chic photo backdrop and organic balloons',
      caption: 'Photo Booth arch',
    },
    {
      src: '/service-pages/birthday-gallery-4.png',
      alt: 'Dinner party table decoration with lights',
      caption: 'Banquet Seating',
    },
  ],

  features: [
    {
      icon: '🎨',
      title: 'Elegant Concept Curation',
      description:
        'We design sophisticated theme options, focusing on elegant color palettes, stylish backdrops, and modern aesthetics.',
    },
    {
      icon: '🎈',
      title: 'Premium Materials & Decors',
      description:
        'We use high-quality balloon clusters, custom cutouts, floral integrations, and stylish fabrics for a premium feel.',
    },
    {
      icon: '🎤',
      title: 'Professional Hosts & Anchors',
      description:
        'Coordinate witty, engaging emcees or game anchors who keep the event lively and interactive for all age groups.',
    },
    {
      icon: '🎵',
      title: 'Audio & Lighting Layouts',
      description:
        'Complete sound setup (mics, mixers, speakers) and professional stage focus lights for high visual appeal.',
    },
    {
      icon: '📸',
      title: 'Candid Photography Coverage',
      description:
        'Professional photographers to capture high-definition candid moments of your family, friends, and guests.',
    },
    {
      icon: '📋',
      title: 'On-Site Coordination supervisor',
      description:
        'A dedicated coordinator manages event timings, vendor coordination, and resolves on-ground details on the day.',
    },
  ],

};

/* ─── Page Component ───────────────────────────────────────────────────── */
export default function PremiumBirthdayPlannerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema).replace(/</g, '\\u003c') }}
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