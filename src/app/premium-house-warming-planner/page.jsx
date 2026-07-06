import { Suspense } from 'react';
import { ogImages } from '../_seo';
import ServiceLandingPage from '../../components/ServiceLandingPage/ServiceLandingPage';

/* ─── SEO Metadata ─────────────────────────────────────────────────────── */
export const metadata = {
  title: { absolute: "Premium House Warming Planner in Bangalore — Eevagga" },
  description:
    "Planning a house warming (Griha Pravesh) ceremony? Eevagga provides premium house warming planning in Bangalore — traditional and modern decorations, catering, puja setup & logistics.",
  keywords:
    "premium house warming ceremony planner, Griha Pravesh planner Bangalore, house warming decoration Bangalore, house warming catering, Eevagga Griha Pravesh",
  alternates: {
    canonical: 'https://www.eevagga.com/premium-house-warming-planner',
  },
  openGraph: {
    title: "Premium House Warming Ceremony Planner | Griha Pravesh Planners — Eevagga",
    description:
      "Step into your new home with joy. Eevagga plans beautiful, traditional or contemporary house warming ceremonies in Bangalore. Floral decors, puja setup, and catering logistics. Get a free quote.",
    url: 'https://www.eevagga.com/premium-house-warming-planner',
    siteName: 'Eevagga',
    type: 'website',
    images: ogImages,
  },
  twitter: {
    card: 'summary_large_image',
    title: "Premium House Warming Planner — Eevagga",
    description: "Traditional and modern Griha Pravesh planning in Bangalore. Decors, puja support & catering.",
  },
};

/* ─── JSON-LD Schemas ──────────────────────────────────────────────────── */
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://www.eevagga.com/premium-house-warming-planner#service',
  name: 'Premium House Warming Planner',
  description:
    "End-to-end event planning and decoration for House Warming (Griha Pravesh) ceremonies. Traditional fresh floral decorations, entrance styling, puja mandap backdrops, catering arrangements, and guest dining management.",
  provider: { '@id': 'https://www.eevagga.com/#organization' },
  serviceType: 'House Warming Ceremony Planning',
  areaServed: { '@type': 'City', name: 'Bangalore', sameAs: 'https://en.wikipedia.org/wiki/Bangalore' },
  url: 'https://www.eevagga.com/premium-house-warming-planner',
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'INR',
    lowPrice: 15000,
    highPrice: 75000,
    offerCount: 3,
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
      name: 'Premium House Warming Planner',
      item: 'https://www.eevagga.com/premium-house-warming-planner',
    },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What kind of decorations do you provide for Griha Pravesh?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We specialize in traditional marigold, jasmine, and mango leaf floral decorations, as well as contemporary setups including fresh flower arches, elegant indoor lighting, and beautiful mandap backdrops.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you assist with puja arrangements and catering setups?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! We coordinate high-quality traditional catering (served on banana leaves or buffet), set up dining tables, and can arrange priests, puja supplies, and homa kunda setups.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can you handle setups for both apartments and villas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, we plan house warming ceremonies for apartments, gated-community villas, independent bungalows, and clubhouses across all major areas of Bangalore.',
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
  title: 'Premium House Warming Planner',
  badge: 'Blessings & Joy',
  h1: "Premium House Warming (Griha Pravesh) Ceremony Planner",
  heroSubtitle:
    "Step into your new home with positive energy and joy. Eevagga designs and organizes beautiful house warming events, handling fresh floral decorations, puja setups, and premium catering coordination.",
  heroImage: '/service-pages/house-warming-hero.png',
  heroImageAlt: 'Traditional marigold floral decoration at home entrance for Griha Pravesh',

  stats: [
    { value: '180+', label: 'Ceremonies Planned' },
    { value: 'Fresh', label: 'Flower Decor' },
    { value: 'Tradition', label: 'Aligned' },
    { value: '4.8★', label: 'Client Rating' },
  ],

  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Premium House Warming Planner' },
  ],

  gallery: [
    {
      src: '/service-pages/house-warming-hero.png',
      alt: 'Traditional Griha Pravesh flower entrance',
      caption: 'Entrance Floral Decor',
    },
    {
      src: '/service-pages/house-warming-gallery-1.png',
      alt: 'Homa/Puja mandap setup with marigold garland',
      caption: 'Puja Mandap Setup',
    },
    {
      src: '/service-pages/house-warming-gallery-2.png',
      alt: 'Traditional dining arrangements for house warming',
      caption: 'Traditional Dining',
    },
    {
      src: '/service-pages/house-warming-gallery-3.png',
      alt: 'Traditional welcome items and floor design (Rangoli)',
      caption: 'Rangoli & Welcome',
    },
    {
      src: '/service-pages/house-warming-gallery-4.png',
      alt: 'Elegant lounge seating for house warming guests',
      caption: 'Guest Lounge Area',
    },
  ],

  features: [
    {
      icon: '🌸',
      title: 'Traditional Floral Curation',
      description:
        'Beautiful fresh flower arrangements using marigold, jasmine, orchids, and mango leaves for main entrances and puja areas.',
    },
    {
      icon: '🕌',
      title: 'Homa & Puja Stage Design',
      description:
        'Specially designed mandaps and backdrops keeping religious customs, homa kunda placement, and priest requirements in mind.',
    },
    {
      icon: '🍽️',
      title: 'Catering & Dining setups',
      description:
        'Coordinate premium traditional catering (South/North Indian), providing full table setup, servers, and water systems.',
    },
    {
      icon: '🪔',
      title: 'Aura & Ambient Lighting',
      description:
        'Fairy lights across the balcony/terrace, traditional brass lamps (diyas), and focused spotlights for the puja space.',
    },
    {
      icon: '📸',
      title: 'Puja Candid Photography',
      description:
        'Professional coverage of the early-morning rituals, homa, family interactions, and group guests.',
    },
    {
      icon: '🪑',
      title: 'Seating & Mattress Rentals',
      description:
        'Logistics coordination for chairs, traditional floor mattresses, tables, and umbrella shades for outdoor/terrace seating.',
    },
  ],

};

/* ─── Page Component ───────────────────────────────────────────────────── */
export default function PremiumHouseWarmingPlannerPage() {
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