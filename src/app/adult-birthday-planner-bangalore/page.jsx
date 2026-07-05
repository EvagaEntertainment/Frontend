import { Suspense } from 'react';
import { ogImages } from '../_seo';
import ServiceLandingPage from '../../components/ServiceLandingPage/ServiceLandingPage';

/* ─── SEO Metadata ─────────────────────────────────────────────────────── */
export const metadata = {
  title: { absolute: "Adult Birthday Planner Bangalore — Eevagga" },
  description:
    'Plan a sophisticated adult birthday in Bangalore with Eevagga. Milestone 30th, 40th, 50th celebrations, cocktail setups, luxury themes & full end-to-end planning. Book today.',
  keywords:
    'adult birthday planner Bangalore, adult birthday party Bangalore, milestone birthday Bangalore, 30th birthday Bangalore, 40th birthday Bangalore, 50th birthday party Bangalore',
  alternates: {
    canonical: 'https://www.eevagga.com/adult-birthday-planner-bangalore',
  },
  openGraph: {
    title: 'Adult Birthday Planner Bangalore | Milestone Celebrations — Eevagga',
    description:
      'Sophisticated milestone celebrations for 30th, 40th, 50th birthdays. Luxury adult birthday planning in Bangalore — by Eevagga.',
    url: 'https://www.eevagga.com/adult-birthday-planner-bangalore',
    siteName: 'Eevagga',
    type: 'website',
    images: ogImages,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Adult Birthday Planner Bangalore — Eevagga',
    description: 'Milestone adult birthdays in Bangalore. Luxury themes, cocktail setups & full planning.',
  },
};

/* ─── JSON-LD Schemas ──────────────────────────────────────────────────── */
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://www.eevagga.com/adult-birthday-planner-bangalore#service',
  name: 'Adult Birthday Planner in Bangalore',
  description:
    'Full-service adult birthday planning in Bangalore for milestone 30th, 40th, 50th and beyond. Includes sophisticated theme design, luxury floral installations, cocktail bar setup, live music, gourmet cake coordination, photography and on-ground management.',
  provider: { '@id': 'https://www.eevagga.com/#organization' },
  serviceType: 'Adult Birthday Party Planning',
  areaServed: { '@type': 'City', name: 'Bangalore', sameAs: 'https://en.wikipedia.org/wiki/Bangalore' },
  url: 'https://www.eevagga.com/adult-birthday-planner-bangalore',
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'INR',
    lowPrice: 25000,
    highPrice: 150000,
    offerCount: 3,
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.eevagga.com' },
    { '@type': 'ListItem', position: 2, name: 'Birthday Planner Bangalore', item: 'https://www.eevagga.com/birthday-planner-bangalore' },
    { '@type': 'ListItem', position: 3, name: 'Adult Birthday Planner Bangalore', item: 'https://www.eevagga.com/adult-birthday-planner-bangalore' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much does an adult birthday party cost in Bangalore?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Adult birthday parties in Bangalore start from ₹25,000 for elegant intimate gatherings with premium décor, up to ₹1,50,000+ for grand milestone celebrations with live music, gourmet catering and luxury floral installations.',
      },
    },
    {
      '@type': 'Question',
      name: 'What themes are popular for adult birthdays in Bangalore?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Popular adult birthday themes in Bangalore include black & gold elegance, Gatsby/roaring 20s, garden soirée, Bollywood night, masquerade, tropical chic, minimalist luxury, wine & dine, and personalised decade themes like "Fabulous at 40".',
      },
    },
    {
      '@type': 'Question',
      name: 'Can Eevagga arrange a cocktail bar setup for an adult birthday?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! We coordinate premium cocktail bar setups including bar styling, garnish displays and mocktail bars. We partner with licensed beverage caterers across Bangalore for adult celebrations.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Eevagga plan surprise birthday parties for adults?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely! Surprise birthday parties are one of our specialties. We coordinate entirely with the planning family or friends, manage all logistics and ensure the birthday person is completely surprised.',
      },
    },
  ],
};

/* ─── Page Config ──────────────────────────────────────────────────────── */
const pageConfig = {
  relatedLinks: [
    {
      "label": "1st Birthday Planner",
      "href": "/1st-birthday-planner-bangalore"
    },
    {
      "label": "Kids Birthday Party",
      "href": "/kids-birthday-party-bangalore"
    },
    {
      "label": "Teen Birthday Celebration",
      "href": "/teen-birthday-celebration-bangalore"
    }
  ],
  title: 'Adult Birthday Planner Bangalore',
  badge: 'Milestone Birthday Specialists',
  h1: 'Adult Birthday Planner in Bangalore — Sophisticated Celebrations by Eevagga',
  heroSubtitle:
    'Milestone birthdays deserve a milestone celebration. Elegant luxury themes, cocktail bar setups, live music, gourmet cake coordination and flawless end-to-end planning for adults across Bangalore.',
  heroImage: '/service-pages/birthday-hero.png',
  heroImageAlt: 'Adult milestone birthday decoration in Bangalore by Eevagga',

  stats: [
    { value: '300+', label: 'Adult Birthdays Planned' },
    { value: '4.9★', label: 'Average Rating' },
    { value: '12+', label: 'Luxury Themes' },
    { value: '100%', label: 'Bespoke Events' },
  ],

  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'Birthday Planner Bangalore', href: '/birthday-planner-bangalore' },
    { label: 'Adult Birthday Planner Bangalore' },
  ],

  gallery: [
    { src: '/service-pages/birthday-hero.png', alt: 'Adult birthday decoration Bangalore', caption: 'Luxury Milestone Setup' },
    { src: '/service-pages/birthday-gallery-1.png', alt: 'Elegant adult birthday party Bangalore', caption: 'Black & Gold Elegance' },
    { src: '/service-pages/birthday-gallery-2.png', alt: 'Adult birthday cake and cocktail bar Bangalore', caption: 'Cocktail & Cake Setup' },
    { src: '/service-pages/birthday-gallery-3.png', alt: 'Milestone birthday stage decoration Bangalore', caption: 'Milestone Stage' },
    { src: '/service-pages/birthday-gallery-4.png', alt: 'Luxury floral adult birthday Bangalore', caption: 'Floral Installation' },
  ],

  features: [
    {
      icon: '✨',
      title: 'Luxury Theme Design',
      description: 'Black & gold, garden soirée, Gatsby roaring 20s, masquerade — sophisticated adult themes designed with premium materials.',
    },
    {
      icon: '🍸',
      title: 'Cocktail Bar Setup',
      description: 'Styled cocktail and mocktail bar setups with garnish displays, neon signage and coordinated beverage caterers.',
    },
    {
      icon: '🌸',
      title: 'Luxury Floral Installations',
      description: 'Statement floral arches, ceiling installations and table centrepieces using premium blooms from Bangalore\'s top florists.',
    },
    {
      icon: '🎵',
      title: 'Live Music & Entertainment',
      description: 'Live singers, bands, jazz ensembles, saxophonists and acoustic performers for an elevated adult celebration experience.',
    },
    {
      icon: '🎂',
      title: 'Gourmet Cake Coordination',
      description: 'Custom milestone cakes — gold-drip three-tiers, floral semisweet designs and personalised fondant masterpieces.',
    },
    {
      icon: '📸',
      title: 'Professional Photography & Film',
      description: 'Cinematic videography and elegant photography capturing the sophistication and emotion of your milestone birthday.',
    },
  ],

  pricing: [
    {
      name: 'Starter',
      subtitle: 'Elegant intimate celebration',
      price: 25000,
      featured: false,
      includes: [
        'Premium balloon arch & floral',
        'Elegant backdrop & name display',
        'Milestone number props',
        'Cleanup & support',
        'Up to 30 guests',
      ],
    },
    {
      name: 'Premium',
      subtitle: 'Our most popular adult package',
      price: 55000,
      featured: true,
      includes: [
        'Full luxury theme design',
        'Cocktail bar setup & styling',
        'Gourmet birthday cake coordination',
        'Live music (2 hours)',
        'Photography (3 hours)',
        'Floral centrepieces & décor',
        'Up to 80 guests',
      ],
    },
    {
      name: 'Luxury',
      subtitle: 'Grand milestone celebration',
      price: 150000,
      featured: false,
      includes: [
        'Bespoke luxury theme design',
        'Full floral & prop installations',
        'Live band or DJ',
        'Full-day photography + video',
        'Gourmet catering coordination',
        'Dedicated event manager',
        '100+ guests',
      ],
    },
  ],

  faqs: [
    {
      question: 'How much does an adult birthday party cost in Bangalore?',
      answer:
        'Adult birthday parties in Bangalore start from ₹25,000 for elegant intimate gatherings, up to ₹1,50,000+ for grand milestone celebrations with live music, luxury florals and catering.',
    },
    {
      question: 'What themes are popular for adult birthdays in Bangalore?',
      answer:
        'Popular themes include black & gold elegance, Gatsby roaring 20s, garden soirée, Bollywood night, masquerade, tropical chic and personalised decade themes like "Fabulous at 40".',
    },
    {
      question: 'Can Eevagga arrange a cocktail bar for an adult birthday?',
      answer:
        'Yes! We coordinate styled cocktail and mocktail bar setups with premium caterers. Bar styling, garnish displays and neon signage are all included in our adult packages.',
    },
    {
      question: 'Can Eevagga plan a surprise birthday party for adults?',
      answer:
        'Absolutely! Surprise parties are one of our specialties. We coordinate directly with family or friends and manage all logistics without the birthday person finding out.',
    },
    {
      question: 'How far in advance should I book an adult milestone birthday?',
      answer:
        'For milestone birthdays (30th, 40th, 50th), we recommend 4–6 weeks in advance. Large events with catering and live music require longer lead times to secure the best vendors.',
    },
  ],
};

/* ─── Page Component ───────────────────────────────────────────────────── */
export default function AdultBirthdayPlannerBangalorePage() {
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
