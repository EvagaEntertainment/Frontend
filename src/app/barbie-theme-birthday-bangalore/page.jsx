import { Suspense } from 'react';
import { ogImages } from '../_seo';
import ServiceLandingPage from '../../components/ServiceLandingPage/ServiceLandingPage';

/* ─── SEO Metadata ─────────────────────────────────────────────────────── */
export const metadata = {
  title: { absolute: "Barbie Theme Birthday Bangalore — Eevagga" },
  description:
    'Create a stunning Barbie theme birthday party in Bangalore with Eevagga. Hot pink décor, glam balloon installations, Barbie cake & full planning. Book your free consultation today.',
  keywords:
    'Barbie theme birthday Bangalore, Barbie birthday party Bangalore, Barbie birthday decoration Bangalore, pink theme birthday Bangalore, Barbie theme birthday planner Bangalore',
  alternates: {
    canonical: 'https://www.eevagga.com/barbie-theme-birthday-bangalore',
  },
  openGraph: {
    title: 'Barbie Theme Birthday Bangalore | Glam Pink Party Setup — Eevagga',
    description:
      'Hot pink décor, glam balloon arches & custom Barbie cakes. Stunning Barbie theme birthday parties in Bangalore — fully planned by Eevagga.',
    url: 'https://www.eevagga.com/barbie-theme-birthday-bangalore',
    siteName: 'Eevagga',
    type: 'website',
    images: ogImages,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Barbie Theme Birthday Bangalore — Eevagga',
    description: 'Glamorous Barbie theme birthday parties in Bangalore. Pink décor & full planning.',
  },
};

/* ─── JSON-LD Schemas ──────────────────────────────────────────────────── */
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://www.eevagga.com/barbie-theme-birthday-bangalore#service',
  name: 'Barbie Theme Birthday Party in Bangalore',
  description:
    'Full-service Barbie theme birthday planning in Bangalore. Hot pink balloon arches, glam floral installations, Barbie doll props, custom cake coordination, photography and on-ground execution.',
  provider: { '@id': 'https://www.eevagga.com/#organization' },
  serviceType: 'Barbie Theme Birthday Party Planning',
  areaServed: { '@type': 'City', name: 'Bangalore', sameAs: 'https://en.wikipedia.org/wiki/Bangalore' },
  url: 'https://www.eevagga.com/barbie-theme-birthday-bangalore',
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'INR',
    lowPrice: 20000,
    highPrice: 85000,
    offerCount: 3,
  },
};

const eventSchema = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: 'Barbie Theme Birthday Party — Eevagga Bangalore',
  description:
    'A glamorous Barbie theme birthday celebration curated by Eevagga in Bangalore with hot pink décor, glam balloon arches, Barbie props and full event management.',
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
    url: 'https://www.eevagga.com/barbie-theme-birthday-bangalore',
    availability: 'https://schema.org/InStock',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.eevagga.com' },
    { '@type': 'ListItem', position: 2, name: 'Birthday Planner Bangalore', item: 'https://www.eevagga.com/birthday-planner-bangalore' },
    { '@type': 'ListItem', position: 3, name: 'Barbie Theme Birthday Bangalore', item: 'https://www.eevagga.com/barbie-theme-birthday-bangalore' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much does a Barbie theme birthday party cost in Bangalore?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A Barbie theme birthday party in Bangalore starts from ₹20,000 for a basic pink balloon and backdrop setup, up to ₹85,000 for a luxury glam installation with full floral décor, custom Barbie cake, photo booth and photography.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is included in a Barbie theme birthday package?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our Barbie packages include hot pink and fuchsia balloon arches, Barbie doll prop installations, glam backdrop, sparkle table settings, Barbie doll cake coordination, photo booth setup and themed stationery.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is a Barbie theme suitable for adults?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely! The Barbie trend is huge for adult birthdays too — especially 18th and 21st milestone celebrations. We create chic, elevated Barbie setups with gold accents and floral drama for adult parties.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I combine Barbie theme with a photo booth?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! A Barbie-style photo booth with pink balloon walls, flower arches and Barbie frame props is one of the most requested add-ons. It makes for incredible Instagram-worthy memories.',
      },
    },
  ],
};

/* ─── Page Config ──────────────────────────────────────────────────────── */
const pageConfig = {
  relatedLinks: [
    {
      "label": "Unicorn Theme Birthday",
      "href": "/unicorn-theme-birthday-bangalore"
    },
    {
      "label": "Jungle Theme Birthday",
      "href": "/jungle-theme-birthday-bangalore"
    },
    {
      "label": "Space Theme Birthday",
      "href": "/space-theme-birthday-bangalore"
    },
    {
      "label": "Cocomelon Birthday Theme",
      "href": "/cocomelon-birthday-theme-bangalore"
    }
  ],
  title: 'Barbie Theme Birthday Bangalore',
  badge: 'Glam Pink Theme Specialists',
  h1: 'Barbie Theme Birthday Party in Bangalore — Glam Celebrations by Eevagga',
  heroSubtitle:
    'Life in pink! Hot pink balloon arches, glam floral walls, Barbie doll installations and a fully styled celebration — all planned end-to-end by Eevagga across Bangalore.',
  heroImage: '/service-pages/birthday-hero.png',
  heroImageAlt: 'Barbie theme birthday decoration in Bangalore by Eevagga',

  stats: [
    { value: '180+', label: 'Theme Events Done' },
    { value: '4.9★', label: 'Average Rating' },
    { value: '100%', label: 'Custom Designs' },
    { value: '48hr', label: 'Setup Turnaround' },
  ],

  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'Birthday Planner Bangalore', href: '/birthday-planner-bangalore' },
    { label: 'Barbie Theme Birthday Bangalore' },
  ],

  gallery: [
    { src: '/service-pages/birthday-hero.png', alt: 'Barbie theme birthday decoration Bangalore', caption: 'Pink Balloon Arch' },
    { src: '/service-pages/birthday-gallery-1.png', alt: 'Glam pink birthday setup Bangalore', caption: 'Glam Backdrop' },
    { src: '/service-pages/birthday-gallery-2.png', alt: 'Barbie cake and dessert table Bangalore', caption: 'Barbie Dessert Table' },
    { src: '/service-pages/birthday-gallery-3.png', alt: 'Barbie theme stage decoration Bangalore', caption: 'Pink Stage Setup' },
    { src: '/service-pages/birthday-gallery-4.png', alt: 'Barbie photo booth birthday party Bangalore', caption: 'Barbie Photo Booth' },
  ],

  features: [
    {
      icon: '💗',
      title: 'Hot Pink Balloon Arch & Installations',
      description: 'Stunning fuchsia, pink and white organic balloon garlands that create the iconic Barbie aesthetic in any space.',
    },
    {
      icon: '✨',
      title: 'Glam Floral Wall Backdrop',
      description: 'Premium floral walls in pink roses, peonies and blooms — perfect for photos and the ultimate Barbie moment.',
    },
    {
      icon: '👛',
      title: 'Barbie Doll Props & Installations',
      description: 'Life-size Barbie frames, doll display cases and branded prop pieces for an authentic Barbie world experience.',
    },
    {
      icon: '🎂',
      title: 'Custom Barbie Cake Coordination',
      description: 'We coordinate iconic Barbie doll cakes, tiered pink cakes with edible glitter and Barbie figurine toppers.',
    },
    {
      icon: '📸',
      title: 'Photo Booth & Instagram Setup',
      description: 'Dedicated Barbie-style photo booth with balloon walls, floral frames and themed props for Instagram-perfect shots.',
    },
    {
      icon: '🎀',
      title: 'Themed Stationery & Invitations',
      description: 'Digital and printed invitations, name banners, favour tags and table stationery in full Barbie theme styling.',
    },
  ],

  pricing: [
    {
      name: 'Starter',
      subtitle: 'Perfect for intimate Barbie parties',
      price: 20000,
      featured: false,
      includes: [
        'Pink balloon arch (4–5 ft)',
        'Barbie backdrop & name banner',
        'Basic table & floor décor',
        'Cleanup & post-event support',
        'Up to 30 guests',
      ],
    },
    {
      name: 'Premium',
      subtitle: 'Our most popular Barbie package',
      price: 42000,
      featured: true,
      includes: [
        'Full pink balloon garland',
        'Glam floral wall backdrop',
        'Barbie cake coordination',
        'Photo booth setup',
        'Photography (2 hours)',
        'Themed stationery & props',
        'Up to 75 guests',
      ],
    },
    {
      name: 'Luxury',
      subtitle: 'Grand glamorous Barbie celebration',
      price: 85000,
      featured: false,
      includes: [
        'Bespoke Barbie theme design',
        'Full floral & prop installations',
        'Full-day photography + video',
        'Live entertainment / DJ',
        'Dessert table styling',
        'Dedicated event manager',
        '100+ guests',
      ],
    },
  ],

  faqs: [
    {
      question: 'How much does a Barbie theme birthday party cost in Bangalore?',
      answer:
        'Barbie theme birthday parties in Bangalore start from ₹20,000 for basic pink balloon and backdrop setups, up to ₹85,000 for luxury glam installations with floral walls, photography and a custom Barbie cake.',
    },
    {
      question: 'What is included in a Barbie theme birthday package?',
      answer:
        'Our packages include pink balloon arches, glam floral backdrop, Barbie prop installations, themed cake coordination, photo booth setup and matching stationery. Inclusions vary by package tier.',
    },
    {
      question: 'Is Barbie theme suitable for adults?',
      answer:
        'Yes! The Barbie trend is massive for adult milestone birthdays (18th, 21st, 30th). We create sophisticated Barbie setups with gold accents, premium florals and elegant styling for adults.',
    },
    {
      question: 'Can I add a Barbie photo booth to my package?',
      answer:
        'Absolutely! A Barbie photo booth with pink balloon walls, flower arches and themed props is a popular add-on. It is included in our Premium and Luxury packages.',
    },
    {
      question: 'How far in advance should I book a Barbie theme party in Bangalore?',
      answer:
        'We recommend 2–3 weeks in advance. Barbie doll props and custom cakes need lead time for the best quality. Weekend slots book up fast — book early!',
    },
  ],
};

/* ─── Page Component ───────────────────────────────────────────────────── */
export default function BarbieThemeBirthdayBangalorePage() {
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
