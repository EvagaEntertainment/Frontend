import { Suspense } from 'react';
import { ogImages } from '../_seo';
import ServiceLandingPage from '../../components/ServiceLandingPage/ServiceLandingPage';

/* â”€â”€â”€ SEO Metadata â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
export const metadata = {
  title: "Premium House Warming Ceremony Planner | Griha Pravesh Planners â€” Eevagga",
  description:
    "Planning a house warming (Griha Pravesh) ceremony? Eevagga provides premium house warming planning in Bangalore â€” traditional and modern decorations, catering, puja setup & logistics.",
  keywords:
    "premium house warming ceremony planner, Griha Pravesh planner Bangalore, house warming decoration Bangalore, house warming catering, Eevagga Griha Pravesh",
  alternates: {
    canonical: 'https://www.eevagga.com/premium-house-warming-planner',
  },
  openGraph: {
    title: "Premium House Warming Ceremony Planner | Griha Pravesh Planners â€” Eevagga",
    description:
      "Step into your new home with joy. Eevagga plans beautiful, traditional or contemporary house warming ceremonies in Bangalore. Floral decors, puja setup, and catering logistics. Get a free quote.",
    url: 'https://www.eevagga.com/premium-house-warming-planner',
    siteName: 'Eevagga',
    type: 'website',
    images: ogImages,
  },
  twitter: {
    card: 'summary_large_image',
    title: "Premium House Warming Planner â€” Eevagga",
    description: "Traditional and modern Griha Pravesh planning in Bangalore. Decors, puja support & catering.",
  },
};

/* â”€â”€â”€ JSON-LD Schemas â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
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

/* â”€â”€â”€ Page Config â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const pageConfig = {
  title: 'Premium House Warming Planner',
  badge: 'Blessings & Joy',
  h1: "Premium House Warming (Griha Pravesh) Ceremony Planner",
  heroSubtitle:
    "Step into your new home with positive energy and joy. Eevagga designs and organizes beautiful house warming events, handling fresh floral decorations, puja setups, and premium catering coordination.",
  heroImage: '/service-pages/birthday-hero.png',
  heroImageAlt: 'Traditional marigold floral decoration at home entrance for Griha Pravesh',

  stats: [
    { value: '180+', label: 'Ceremonies Planned' },
    { value: 'Fresh', label: 'Flower Decor' },
    { value: 'Tradition', label: 'Aligned' },
    { value: '4.8â˜…', label: 'Client Rating' },
  ],

  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Premium House Warming Planner' },
  ],

  gallery: [
    {
      src: '/service-pages/birthday-hero.png',
      alt: 'Traditional Griha Pravesh flower entrance',
      caption: 'Entrance Floral Decor',
    },
    {
      src: '/service-pages/birthday-gallery-1.png',
      alt: 'Homa/Puja mandap setup with marigold garland',
      caption: 'Puja Mandap Setup',
    },
    {
      src: '/service-pages/birthday-gallery-2.png',
      alt: 'Traditional dining arrangements for house warming',
      caption: 'Traditional Dining',
    },
    {
      src: '/service-pages/birthday-gallery-3.png',
      alt: 'Traditional welcome items and floor design (Rangoli)',
      caption: 'Rangoli & Welcome',
    },
    {
      src: '/service-pages/birthday-gallery-4.png',
      alt: 'Elegant lounge seating for house warming guests',
      caption: 'Guest Lounge Area',
    },
  ],

  features: [
    {
      icon: 'ðŸŒ¸',
      title: 'Traditional Floral Curation',
      description:
        'Beautiful fresh flower arrangements using marigold, jasmine, orchids, and mango leaves for main entrances and puja areas.',
    },
    {
      icon: 'ðŸ•Œ',
      title: 'Homa & Puja Stage Design',
      description:
        'Specially designed mandaps and backdrops keeping religious customs, homa kunda placement, and priest requirements in mind.',
    },
    {
      icon: 'ðŸ½ï¸',
      title: 'Catering & Dining setups',
      description:
        'Coordinate premium traditional catering (South/North Indian), providing full table setup, servers, and water systems.',
    },
    {
      icon: 'ðŸª”',
      title: 'Aura & Ambient Lighting',
      description:
        'Fairy lights across the balcony/terrace, traditional brass lamps (diyas), and focused spotlights for the puja space.',
    },
    {
      icon: 'ðŸ“¸',
      title: 'Puja Candid Photography',
      description:
        'Professional coverage of the early-morning rituals, homa, family interactions, and group guests.',
    },
    {
      icon: 'ðŸª‘',
      title: 'Seating & Mattress Rentals',
      description:
        'Logistics coordination for chairs, traditional floor mattresses, tables, and umbrella shades for outdoor/terrace seating.',
    },
  ],

  pricing: [
    {
      name: 'Starter',
      subtitle: 'Essential traditional styling',
      price: 15000,
      featured: false,
      includes: [
        'Main door fresh floral arch (marigold/jasmine)',
        'Traditional puja backdrop (fabric + flower garlands)',
        'Welcome banner with stand',
        'Traditional background music system',
        'Setup before sunrise',
      ],
    },
    {
      name: 'Premium',
      subtitle: 'Complete home styling & photography',
      price: 35000,
      featured: true,
      includes: [
        'Premium entryway floral arch & side pillars',
        'Elegant indoor floral installations',
        'Homa mandap backdrop & brass lamp setups',
        'Professional photography (3 hours)',
        'Sound system for devotional chants',
        'On-site event supervisor',
      ],
    },
    {
      name: 'Luxury',
      subtitle: 'Bespoke grand Griha Pravesh',
      price: 75000,
      featured: false,
      includes: [
        'Bespoke fresh floral makeover (interior + exterior)',
        'Luxury canopy/mandap with designer props',
        'Candid photo + video highlight reel',
        'Traditional musical welcome (Nadaswaram group)',
        'VIP dining table styling & tableware',
        'Complete guest management team',
      ],
    },
  ],

  faqs: [
    {
      question: 'What kind of decorations do you provide for Griha Pravesh?',
      answer:
        'We specialize in traditional marigold, jasmine, and mango leaf floral decorations, as well as contemporary setups including fresh flower arches, elegant indoor lighting, and beautiful mandap backdrops.',
    },
    {
      question: 'Do you assist with puja arrangements and catering setups?',
      answer:
        'Yes! We coordinate high-quality traditional catering (served on banana leaves or buffet), set up dining tables, and can arrange priests, puja supplies, and homa kunda setups.',
    },
    {
      question: 'Can you handle setups for both apartments and villas?',
      answer:
        'Yes, we plan house warming ceremonies for apartments, gated-community villas, independent bungalows, and clubhouses across all major areas of Bangalore.',
    },
    {
      question: 'Do you set up decorations late at night or early in the morning?',
      answer:
        'Since Griha Pravesh pujas often start early in the morning (brahma muhurtam), we frequently perform decoration setups overnight to ensure everything is perfect before the family arrives.',
    },
    {
      question: 'Can we hire traditional musicians through Eevagga?',
      answer:
        'Yes! We can arrange professional traditional Nadaswaram, Shehnai, or flute players to welcome your guests and create a serene, sacred atmosphere.',
    },
  ],
};

/* â”€â”€â”€ Page Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
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
