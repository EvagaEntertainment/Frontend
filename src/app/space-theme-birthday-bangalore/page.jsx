import { Suspense } from 'react';
import { ogImages } from '../_seo';
import ServiceLandingPage from '../../components/ServiceLandingPage/ServiceLandingPage';

/* ─── SEO Metadata ─────────────────────────────────────────────────────── */
export const metadata = {
  title: 'Space Theme Birthday Bangalore | Galaxy Party Setup — Eevagga',
  description:
    'Launch your celebration into orbit with a space theme birthday in Bangalore. Galaxy balloon arches, neon planet props, astronaut décor & full planning by Eevagga. Book today.',
  keywords:
    'space theme birthday Bangalore, galaxy birthday party Bangalore, space birthday decoration Bangalore, astronaut theme birthday Bangalore, space theme birthday planner Bangalore',
  alternates: {
    canonical: 'https://www.eevagga.com/space-theme-birthday-bangalore',
  },
  openGraph: {
    title: 'Space Theme Birthday Bangalore | Galaxy Party Setup — Eevagga',
    description:
      'Galaxy balloon arches, neon planet props & astronaut décor. Out-of-this-world space theme birthdays in Bangalore — planned by Eevagga.',
    url: 'https://www.eevagga.com/space-theme-birthday-bangalore',
    siteName: 'Eevagga',
    type: 'website',
    images: ogImages,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Space Theme Birthday Bangalore — Eevagga',
    description: 'Galaxy & space theme birthday parties in Bangalore. Neon décor & full planning.',
  },
};

/* ─── JSON-LD Schemas ──────────────────────────────────────────────────── */
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://www.eevagga.com/space-theme-birthday-bangalore#service',
  name: 'Space Theme Birthday Party in Bangalore',
  description:
    'Full-service space and galaxy theme birthday planning in Bangalore. Includes dark galaxy balloon arches, neon planet prop installations, astronaut cutouts, glow-in-the-dark décor, themed cake coordination and on-ground execution.',
  provider: { '@id': 'https://www.eevagga.com/#organization' },
  serviceType: 'Space Theme Birthday Party Planning',
  areaServed: { '@type': 'City', name: 'Bangalore', sameAs: 'https://en.wikipedia.org/wiki/Bangalore' },
  url: 'https://www.eevagga.com/space-theme-birthday-bangalore',
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'INR',
    lowPrice: '18000',
    highPrice: '75000',
    offerCount: '3',
  },
};

const eventSchema = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: 'Space Theme Birthday Party — Eevagga Bangalore',
  description:
    'A galaxy space theme birthday celebration curated by Eevagga in Bangalore with dark neon décor, planet props, astronaut installations and full event management.',
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
    price: '18000',
    url: 'https://www.eevagga.com/space-theme-birthday-bangalore',
    availability: 'https://schema.org/InStock',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.eevagga.com' },
    { '@type': 'ListItem', position: 2, name: 'Birthday Planner Bangalore', item: 'https://www.eevagga.com/birthday-planner-bangalore' },
    { '@type': 'ListItem', position: 3, name: 'Space Theme Birthday Bangalore', item: 'https://www.eevagga.com/space-theme-birthday-bangalore' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much does a space theme birthday party cost in Bangalore?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A space theme birthday party in Bangalore starts from ₹18,000 for a basic setup with galaxy balloon arch and planet props, up to ₹75,000 for a luxury immersive setup with neon glow décor, star projectors, custom astronaut cake and photography.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is included in a space theme birthday package?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our space theme packages include dark navy/black balloon galaxy arches, neon planet and star props, astronaut cutouts, glow-in-the-dark elements, rocket and UFO decorations, space-themed cake coordination and themed stationery.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can we add a galaxy projector or star ceiling to the setup?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! We can add galaxy projectors and LED star string lighting to create a full immersive galaxy ceiling experience. This is a popular add-on for indoor venues in Bangalore.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is the space theme popular for both kids and adults?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely! Space themes are hugely popular for kids who love rockets and planets, and equally loved by adults for milestone birthdays with a sophisticated dark galaxy aesthetic featuring neon accents and metallic décor.',
      },
    },
  ],
};

/* ─── Page Config ──────────────────────────────────────────────────────── */
const pageConfig = {
  title: 'Space Theme Birthday Bangalore',
  badge: 'Galaxy & Space Theme Experts',
  h1: 'Space Theme Birthday Party in Bangalore — Out-of-This-World by Eevagga',
  heroSubtitle:
    'Blast off into a galaxy of wonder. Dark neon balloon arches, planet props, star projections and a fully immersive space experience — all planned end-to-end by Eevagga across Bangalore.',
  heroImage: '/service-pages/birthday-hero.png',
  heroImageAlt: 'Space and galaxy theme birthday decoration in Bangalore by Eevagga',

  stats: [
    { value: '120+', label: 'Theme Events Done' },
    { value: '4.9★', label: 'Average Rating' },
    { value: '100%', label: 'Custom Setups' },
    { value: '48hr', label: 'Setup Turnaround' },
  ],

  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'Birthday Planner Bangalore', href: '/birthday-planner-bangalore' },
    { label: 'Space Theme Birthday Bangalore' },
  ],

  gallery: [
    { src: '/service-pages/birthday-hero.png', alt: 'Space theme birthday decoration Bangalore', caption: 'Galaxy Balloon Arch' },
    { src: '/service-pages/birthday-gallery-1.png', alt: 'Neon galaxy birthday setup Bangalore', caption: 'Neon Galaxy Setup' },
    { src: '/service-pages/birthday-gallery-2.png', alt: 'Space cake and dessert table Bangalore', caption: 'Space Dessert Table' },
    { src: '/service-pages/birthday-gallery-3.png', alt: 'Rocket theme stage decoration Bangalore', caption: 'Rocket Stage' },
    { src: '/service-pages/birthday-gallery-4.png', alt: 'Star neon birthday balloon décor Bangalore', caption: 'Star Balloon Wall' },
  ],

  features: [
    {
      icon: '🚀',
      title: 'Galaxy Balloon Arch & Installations',
      description: 'Dark navy, black, silver and neon purple organic balloon arrangements that create a stunning galaxy atmosphere.',
    },
    {
      icon: '🪐',
      title: 'Planet & Star Prop Installations',
      description: 'Hanging planet props, 3D star cutouts, rocket standees and moon photo-op props for an immersive space world.',
    },
    {
      icon: '✨',
      title: 'Glow-in-the-Dark Décor & LED Lighting',
      description: 'Neon glow elements, LED star strings and galaxy projectors that transform any venue into a night sky experience.',
    },
    {
      icon: '🎂',
      title: 'Custom Space Cake Coordination',
      description: 'We coordinate galaxy drip cakes, astronaut figurine cakes and edible constellation toppers from Bangalore\'s top bakers.',
    },
    {
      icon: '👨‍🚀',
      title: 'Astronaut Props & Cutouts',
      description: 'Life-size astronaut cutouts and space suit photo-op props for unforgettable photos at your space party.',
    },
    {
      icon: '📸',
      title: 'Galaxy Photography & Reels',
      description: 'Professional photographers experienced in low-light and neon environments to capture stunning space party shots.',
    },
  ],

  pricing: [
    {
      name: 'Starter',
      subtitle: 'Perfect for intimate space parties',
      price: 18000,
      featured: false,
      includes: [
        'Galaxy balloon arch (4–5 ft)',
        'Space backdrop & name banner',
        'Planet prop set (3 pieces)',
        'Cleanup & post-event support',
        'Up to 30 guests',
      ],
    },
    {
      name: 'Premium',
      subtitle: 'Our most popular space package',
      price: 40000,
      featured: true,
      includes: [
        'Full galaxy balloon garland',
        'Planet & star prop installations',
        'Space cake coordination',
        'LED star string lighting',
        'Photography (2 hours)',
        'Themed stationery & props',
        'Up to 75 guests',
      ],
    },
    {
      name: 'Luxury',
      subtitle: 'Full immersive galaxy experience',
      price: 75000,
      featured: false,
      includes: [
        'Bespoke galaxy theme design',
        'Galaxy projector + star ceiling',
        'Full-day photography + video',
        'Glow-in-the-dark entertainment',
        'Dessert table styling',
        'Dedicated event manager',
        '100+ guests',
      ],
    },
  ],

  faqs: [
    {
      question: 'How much does a space theme birthday party cost in Bangalore?',
      answer:
        'Space theme birthday parties in Bangalore start from ₹18,000 for basic galaxy balloon and planet prop setups, up to ₹75,000 for full immersive galaxy experiences with projectors and neon lighting.',
    },
    {
      question: 'What is included in a space theme birthday package?',
      answer:
        'Our packages include galaxy balloon arches, planet and star props, astronaut cutouts, LED star lighting, space cake coordination and themed stationery. Inclusions vary by package tier.',
    },
    {
      question: 'Can you add a galaxy projector to the space party setup?',
      answer:
        'Yes! Galaxy projectors and LED star ceilings are available as add-ons or included in Luxury packages. They transform indoor venues into stunning immersive space environments.',
    },
    {
      question: 'Is space theme suitable for both kids and adults?',
      answer:
        'Absolutely! Kids love the rockets and planets while adults love the dark, sophisticated galaxy aesthetic. We customise the vibe based on your age group and preference.',
    },
    {
      question: 'How do I book a space theme birthday party in Bangalore?',
      answer:
        'Simply click the WhatsApp button or fill in the consultation form. Our team will reach out within a few hours to discuss your theme, date, venue and package options.',
    },
  ],
};

/* ─── Page Component ───────────────────────────────────────────────────── */
export default function SpaceThemeBirthdayBangalorePage() {
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
