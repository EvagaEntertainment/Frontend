import { Suspense } from 'react';
import { ogImages } from '../_seo';
import ServiceLandingPage from '../../components/ServiceLandingPage/ServiceLandingPage';

/* ─── SEO Metadata ─────────────────────────────────────────────────────── */
export const metadata = {
  title: { absolute: "Luxury Birthday Party Planner in Bangalore — Eevagga" },
  description:
    "Eevagga is the leading luxury birthday planner in Bangalore. We create exquisite, high-end birthday celebrations with premium production, designer styling & VIP management.",
  keywords:
    "luxury birthday planner Bangalore, premium birthday planner Bangalore, high end birthday decorators Bangalore, luxury birthday party organizers Bangalore, Eevagga luxury birthday",
  alternates: {
    canonical: 'https://www.eevagga.com/luxury-birthday-planner-bangalore',
  },
  openGraph: {
    title: "Luxury Birthday Planner in Bangalore | High-End Event Designers — Eevagga",
    description:
      "Milestone celebrations engineered to perfection. Eevagga designs magnificent high-end birthday events with designer styling, custom productions, and VIP coordination in Bangalore. Get in touch.",
    url: 'https://www.eevagga.com/luxury-birthday-planner-bangalore',
    siteName: 'Eevagga',
    type: 'website',
    images: ogImages,
  },
  twitter: {
    card: 'summary_large_image',
    title: "Luxury Birthday Planner in Bangalore — Eevagga",
    description: "Bespoke event production, premium florals, lighting & VIP management for birthdays in Bangalore.",
  },
};

/* ─── JSON-LD Schemas ──────────────────────────────────────────────────── */
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://www.eevagga.com/luxury-birthday-planner-bangalore#service',
  name: 'Luxury Birthday Planner in Bangalore',
  description:
    "Bespoke high-end birthday party design, planning, and execution in Bangalore. Features imported floral installations, custom staging, premium AV and lighting, high-end entertainment, and VIP hosting.",
  provider: { '@id': 'https://www.eevagga.com/#organization' },
  serviceType: 'Luxury Birthday Event Planning',
  areaServed: { '@type': 'City', name: 'Bangalore', sameAs: 'https://en.wikipedia.org/wiki/Bangalore' },
  url: 'https://www.eevagga.com/luxury-birthday-planner-bangalore',
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'INR',
    lowPrice: 50000,
    highPrice: 250000,
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
      name: 'Luxury Birthday Planner Bangalore',
      item: 'https://www.eevagga.com/luxury-birthday-planner-bangalore',
    },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What distinguishes a birthday planning service as "luxury"?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Luxury birthday planning features custom visual conceptualisation, bespoke prop manufacturing, premium floral imports, designer furniture hire, concert-level AV and lighting, celebrity/artist coordination, and a dedicated VIP guest relations team.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you work with luxury 5-star hotels and resorts in Bangalore?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Eevagga regularly coordinates with Bangalore\'s premier 5-star hotels, luxury resorts, private villas, and high-end banquet facilities. We manage all logistics, vendor guidelines, and security requirements.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you offer custom theme and layout design beforehand?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! For all premium and luxury bookings, we provide detailed mood boards, custom theme illustrations, color palettes, and 2D/3D floor layouts so you can visualize the event space before execution.',
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
  title: 'Luxury Birthday Planner Bangalore',
  badge: 'Elite Event Designers',
  h1: "Bangalore's Leading Luxury Birthday Event Planner & Designer",
  heroSubtitle:
    "Elevate your milestone birthday celebration. We design and produce magnificent high-end birthday events with designer styling, massive production setups, and impeccable on-ground execution.",
  heroImage: '/service-pages/birthday-hero.png',
  heroImageAlt: 'Grand luxury birthday stage and floral setup in Bangalore by Eevagga',

  stats: [
    { value: '120+', label: 'Luxury Events' },
    { value: 'Bespoke', label: 'Theme Design' },
    { value: 'VIP', label: 'Guest Service' },
    { value: '5★ Rated', label: 'Execution' },
  ],

  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Luxury Birthday Planner Bangalore' },
  ],

  gallery: [
    {
      src: '/service-pages/birthday-hero.png',
      alt: 'Bespoke luxury birthday stage Bangalore',
      caption: 'Bespoke Stage Design',
    },
    {
      src: '/service-pages/birthday-gallery-1.png',
      alt: 'Luxury table layout and imported florals',
      caption: 'VIP Table Setting',
    },
    {
      src: '/service-pages/birthday-gallery-2.png',
      alt: 'Milestone birthday neon and flower display',
      caption: 'Photo Booth Display',
    },
    {
      src: '/service-pages/birthday-gallery-3.png',
      alt: 'Concert lighting and sound birthday party',
      caption: 'Ambient Lighting',
    },
    {
      src: '/service-pages/birthday-gallery-4.png',
      alt: 'Elegant entry styling for guest reception',
      caption: 'Grand Entrance',
    },
  ],

  features: [
    {
      icon: '🏛️',
      title: 'Bespoke Theme Design & 3D Layouts',
      description:
        'Our elite designers create customized concepts, providing detailed mood boards and 3D space layouts for approval.',
    },
    {
      icon: '🌸',
      title: 'Luxury Floral & Prop Styling',
      description:
        'Exquisite, custom-sourced flowers, grand metallic arches, themed statues, and designer backdrops manufactured in-house.',
    },
    {
      icon: '💡',
      title: 'Concert-Grade AV & Intelligent Lights',
      description:
        'Professional sound systems, LED screen walls, laser shows, moving heads, and custom ambient uplighting.',
    },
    {
      icon: '👑',
      title: 'VIP Guest & RSVP Coordination',
      description:
        'Dedicated guest relationship officers, digitized invitation flows, hostess management, and valet coordination.',
    },
    {
      icon: '🎭',
      title: 'High-End Artist Booking',
      description:
        'Coordinate top-tier DJs, celebrity emcees, live acoustic/jazz bands, dancers, and international performers.',
    },
    {
      icon: '📋',
      title: 'Dedicated Senior Event Director',
      description:
        'A senior director leads our operations team on-site, ensuring absolute execution precision and schedule adherence.',
    },
  ],

  pricing: [
    {
      name: 'Starter',
      subtitle: 'Premium bespoke design styling',
      price: 50000,
      featured: false,
      includes: [
        'Bespoke visual theme & design layout',
        'Upscale panel backdrops & props',
        'Imported flower/balloon hybrid styling',
        'Professional candid photographer',
        'Senior coordinator on site',
      ],
    },
    {
      name: 'Premium',
      subtitle: 'Luxury hall transformation',
      price: 120000,
      featured: true,
      includes: [
        'Grand 3D stage production & props',
        'Premium lighting (moving heads & LED wash)',
        'Professional photo & cinematic video highlight',
        'Thematic entrance arch & carpet path',
        'Event coordination team (3 members)',
        'Up to 150 guests',
      ],
    },
    {
      name: 'Luxury',
      subtitle: 'Bespoke high-end celebration production',
      price: 250000,
      featured: false,
      includes: [
        'Complete customized event production',
        'Large LED wall & concert-grade sound/DJ',
        'VIP seating & luxury furniture rentals',
        'Premium entertainment (live band/dancer bookings)',
        'Dedicated VIP hostess & coordinator squad',
        'Full digital event management',
      ],
    },
  ],

  faqs: [
    {
      question: 'What distinguishes a birthday planning service as "luxury"?',
      answer:
        'Luxury birthday planning features custom visual conceptualisation, bespoke prop manufacturing, premium floral imports, designer furniture hire, concert-level AV and lighting, celebrity/artist coordination, and a dedicated VIP guest relations team.',
    },
    {
      question: 'Do you work with luxury 5-star hotels and resorts in Bangalore?',
      answer:
        'Yes. Eevagga regularly coordinates with Bangalore\'s premier 5-star hotels, luxury resorts, private villas, and high-end banquet facilities. We manage all logistics, vendor guidelines, and security requirements.',
    },
    {
      question: 'Do you offer custom theme and layout design beforehand?',
      answer:
        'Yes! For all premium and luxury bookings, we provide detailed mood boards, custom theme illustrations, color palettes, and 2D/3D floor layouts so you can visualize the event space before execution.',
    },
    {
      question: 'Do you arrange custom dining and bar setups?',
      answer:
        'Yes, we coordinate elegant theme-based table designs, customized cutlery, premium linens, glassware, and specialize in styling custom mocktail/cocktail bars and theme food tables.',
    },
    {
      question: 'What is the booking timeline for luxury events?',
      answer:
        'For high-end events requiring custom prop fabrication or artist bookings, we recommend booking 4 to 8 weeks in advance to allow sufficient time for designing, production, and sourcing.',
    },
  ],
};

/* ─── Page Component ───────────────────────────────────────────────────── */
export default function LuxuryBirthdayPlannerBangalorePage() {
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
