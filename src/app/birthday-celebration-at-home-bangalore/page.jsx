import { Suspense } from 'react';
import { ogImages } from '../_seo';
import ServiceLandingPage from '../../components/ServiceLandingPage/ServiceLandingPage';

/* ─── SEO Metadata ─────────────────────────────────────────────────────── */
export const metadata = {
  title: { absolute: "Birthday Celebration at Home in Bangalore — Eevagga" },
  description:
    "Planning a birthday party at home in Bangalore? Eevagga offers intimate home birthday packages with beautiful room decors, private catering & home entertainment.",
  keywords:
    "birthday celebration at home Bangalore, home birthday party planner Bangalore, home birthday decoration Bangalore, room birthday decoration Bangalore, Eevagga home birthday",
  alternates: {
    canonical: 'https://www.eevagga.com/birthday-celebration-at-home-bangalore',
  },
  openGraph: {
    title: "Birthday Celebration at Home in Bangalore | Home Planners — Eevagga",
    description:
      "Bring the celebration to your doorstep. Eevagga plans beautiful, stress-free birthday celebrations at home in Bangalore. Decorations, small-scale catering, and activities. Get a free quote.",
    url: 'https://www.eevagga.com/birthday-celebration-at-home-bangalore',
    siteName: 'Eevagga',
    type: 'website',
    images: ogImages,
  },
  twitter: {
    card: 'summary_large_image',
    title: "Birthday Celebration at Home in Bangalore — Eevagga",
    description: "Specialist home birthday party planning and room decoration services in Bangalore.",
  },
};

/* ─── JSON-LD Schemas ──────────────────────────────────────────────────── */
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://www.eevagga.com/birthday-celebration-at-home-bangalore#service',
  name: 'Birthday Celebration at Home in Bangalore',
  description:
    "End-to-end birthday party planning and decoration for homes, apartments, backyards, and terraces in Bangalore. Includes balloon room decors, catering options, and private entertainment.",
  provider: { '@id': 'https://www.eevagga.com/#organization' },
  serviceType: 'Home Party Planning Services',
  areaServed: { '@type': 'City', name: 'Bangalore', sameAs: 'https://en.wikipedia.org/wiki/Bangalore' },
  url: 'https://www.eevagga.com/birthday-celebration-at-home-bangalore',
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'INR',
    lowPrice: '8000',
    highPrice: '45000',
    offerCount: '3',
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
      name: 'Birthday Celebration At Home Bangalore',
      item: 'https://www.eevagga.com/birthday-celebration-at-home-bangalore',
    },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Do you need a large space for home birthday setups?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Not at all! We specialize in designing decorations, backdrops, and entertainment zones that fit beautifully into living rooms, balconies, terraces, backyards, or small apartment clubhouse areas.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you provide catering for home parties?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! We coordinate catering services, customized buffet setups, or mini live food counters (like popcorn, chats, momos, or cotton candy) tailored for small, medium, or large home gatherings.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does the setup take at home?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Typically, home setups take between 1.5 to 3 hours. We schedule our arrival to match your timeline, ensuring minimal disruption to your home routine.',
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
      "label": "Luxury Birthday Planner",
      "href": "/luxury-birthday-planner-bangalore"
    }
  ],
  title: 'Birthday Celebration At Home Bangalore',
  badge: 'Intimate Home Parties',
  h1: "Intimate Birthday Celebration at Home in Bangalore \u2014 Effortless",
  heroSubtitle:
    "Transform your living space, balcony, or backyard into a festive wonderland. Eevagga designs stunning home decorations, arranges catering, and manages entertainment right at your doorstep.",
  heroImage: '/service-pages/birthday-hero.png',
  heroImageAlt: 'Intimate and cozy birthday balloon room decoration setup at home',

  stats: [
    { value: '250+', label: 'Home Events' },
    { value: '2 Hours', label: 'Average Setup' },
    { value: '4.9★', label: 'Client Satisfaction' },
    { value: '100%', label: 'Stress-Free' },
  ],

  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Birthday Celebration At Home Bangalore' },
  ],

  gallery: [
    {
      src: '/service-pages/birthday-hero.png',
      alt: 'Beautiful home birthday balloons Bangalore',
      caption: 'Living Room Setup',
    },
    {
      src: '/service-pages/birthday-gallery-1.png',
      alt: 'Balcony birthday decoration',
      caption: 'Balcony Decor',
    },
    {
      src: '/service-pages/birthday-gallery-2.png',
      alt: 'Intimate birthday dinner layout at home',
      caption: 'Cozy Dining',
    },
    {
      src: '/service-pages/birthday-gallery-3.png',
      alt: 'Small birthday cake and balloon setup',
      caption: 'Cake Table',
    },
    {
      src: '/service-pages/birthday-gallery-4.png',
      alt: 'Terrace birthday canopy decoration Bangalore',
      caption: 'Terrace Canopy',
    },
  ],

  features: [
    {
      icon: '🏠',
      title: 'Custom Room Styling',
      description:
        'We tailor the decor to suit your room size and layout, making the most of your space with stylish details.',
    },
    {
      icon: '🎈',
      title: 'Door & Room Balloons',
      description:
        'Charming balloon arches, ceiling floaters, wall backdrops, and customized welcome signs for your home entrance.',
    },
    {
      icon: '📸',
      title: 'Home Photography',
      description:
        'Capture the cozy, heartfelt moments with family and friends with a professional candid photographer at home.',
    },
    {
      icon: '🍔',
      title: 'Mini Catering & Live Counters',
      description:
        'Enjoy high-quality buffet layouts or live snack stations that keep food piping hot and tasty for your guests.',
    },
    {
      icon: '🎵',
      title: 'Sound & Music Setup',
      description:
        'Compact high-quality speakers, karaoke setups, or acoustic guitar players for a warm musical vibe.',
    },
    {
      icon: '🧹',
      title: 'Post-Party Cleanup Assistance',
      description:
        'We ensure our decoration elements are packed up cleanly after your party so you don\'t have to stress about cleaning.',
    },
  ],

  pricing: [
    {
      name: 'Starter',
      subtitle: 'Simple, cozy room makeover',
      price: 8000,
      featured: false,
      includes: [
        'Wall balloon decoration (150 balloons)',
        'Happy Birthday banner or neon sign',
        'Cake table balloon styling',
        'Fairy lights setup',
        'Setup & dismantling included',
      ],
    },
    {
      name: 'Premium',
      subtitle: 'Complete living room celebration',
      price: 20000,
      featured: true,
      includes: [
        'Organic dual-ring backdrop setup',
        'Entrance arch & welcome stand',
        'Sound system (compact bluetooth speaker)',
        'Candid photographer (2 hours)',
        'Clean, fast setup crew',
      ],
    },
    {
      name: 'Luxury',
      subtitle: 'Terrace or backyard styling',
      price: 45000,
      featured: false,
      includes: [
        'Luxury cabana canopy / marquee styling',
        'Bespoke prop rentals & low seating',
        'Fresh flower and premium lighting',
        'Mini live food counter (2 hours)',
        'Dedicated home event supervisor',
      ],
    },
  ],

  faqs: [
    {
      question: 'Do you need a large space for home birthday setups?',
      answer:
        'Not at all! We specialize in designing decorations, backdrops, and entertainment zones that fit beautifully into living rooms, balconies, terraces, backyards, or small apartment clubhouse areas.',
    },
    {
      question: 'Do you provide catering for home parties?',
      answer:
        'Yes! We coordinate catering services, customized buffet setups, or mini live food counters (like popcorn, chats, momos, or cotton candy) tailored for small, medium, or large home gatherings.',
    },
    {
      question: 'How long does the setup take at home?',
      answer:
        'Typically, home setups take between 1.5 to 3 hours. We schedule our arrival to match your timeline, ensuring minimal disruption to your home routine.',
    },
    {
      question: 'Can we book a package on short notice?',
      answer:
        'Yes, depending on slot availability, we can organize basic and premium home packages within 48 to 72 hours. Contact us on WhatsApp to check availability instantly.',
    },
    {
      question: 'Do you use glue or nails that damage home walls?',
      answer:
        'No. Our decorators use non-damaging painter tape, command hooks, or standalone metal/wood frames to hold the backdrops and balloons, keeping your walls perfectly clean.',
    },
  ],
};

/* ─── Page Component ───────────────────────────────────────────────────── */
export default function BirthdayCelebrationAtHomeBangalorePage() {
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
