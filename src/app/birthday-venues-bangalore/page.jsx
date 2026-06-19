import { Suspense } from 'react';
import { ogImages } from '../_seo';
import ServiceLandingPage from '../../components/ServiceLandingPage/ServiceLandingPage';

/* ─── SEO Metadata ─────────────────────────────────────────────────────── */
export const metadata = {
  title: 'Birthday Venues Bangalore | Best Party Halls & Spaces — Eevagga',
  description:
    'Find the best birthday venues in Bangalore with Eevagga. Banquet halls, garden spaces, rooftops & premium party venues for all budgets. Venue scouting + full planning included. Book today.',
  keywords:
    'birthday venues Bangalore, birthday party halls Bangalore, birthday venue booking Bangalore, best birthday venues Bangalore, party venues Bangalore',
  alternates: {
    canonical: 'https://www.eevagga.com/birthday-venues-bangalore',
  },
  openGraph: {
    title: 'Birthday Venues Bangalore | Best Party Halls & Spaces — Eevagga',
    description:
      'Banquet halls, garden spaces, rooftops & premium party venues in Bangalore. Venue scouting + full birthday planning by Eevagga.',
    url: 'https://www.eevagga.com/birthday-venues-bangalore',
    siteName: 'Eevagga',
    type: 'website',
    images: ogImages,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Birthday Venues Bangalore — Eevagga',
    description: 'Best birthday venues in Bangalore. Banquet halls, gardens & rooftops — venue scouting + full planning.',
  },
};

/* ─── JSON-LD Schemas ──────────────────────────────────────────────────── */
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://www.eevagga.com/birthday-venues-bangalore#service',
  name: 'Birthday Venue Scouting & Planning in Bangalore',
  description:
    'Professional birthday venue scouting and planning service in Bangalore. We identify the perfect venue across banquet halls, garden spaces, rooftops, farmhouses and private dining rooms — then handle full event execution.',
  provider: { '@id': 'https://www.eevagga.com/#organization' },
  serviceType: 'Birthday Venue Planning',
  areaServed: { '@type': 'City', name: 'Bangalore', sameAs: 'https://en.wikipedia.org/wiki/Bangalore' },
  url: 'https://www.eevagga.com/birthday-venues-bangalore',
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'INR',
    lowPrice: '15000',
    highPrice: '200000',
    offerCount: '3',
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://www.eevagga.com/#organization',
  name: 'Eevagga — Birthday Venue Planners Bangalore',
  description: 'Birthday venue scouting, decoration and full event planning across Bangalore.',
  url: 'https://www.eevagga.com',
  telephone: '+918050279101',
  address: { '@type': 'PostalAddress', addressLocality: 'Bangalore', addressRegion: 'Karnataka', addressCountry: 'IN' },
  areaServed: { '@type': 'City', name: 'Bangalore' },
  priceRange: '₹₹–₹₹₹',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.eevagga.com' },
    { '@type': 'ListItem', position: 2, name: 'Birthday Planner Bangalore', item: 'https://www.eevagga.com/birthday-planner-bangalore' },
    { '@type': 'ListItem', position: 3, name: 'Birthday Venues Bangalore', item: 'https://www.eevagga.com/birthday-venues-bangalore' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What are the best birthday venues in Bangalore?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Bangalore offers a wide range of birthday venues including banquet halls in Indiranagar and Koramangala, garden venues in Sarjapur, resort spaces near Electronic City, rooftop venues in Whitefield and private dining rooms across the city. Eevagga helps you scout and book the perfect venue for your guest count and budget.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much do birthday venues cost in Bangalore?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Birthday venue costs in Bangalore vary widely — from ₹10,000 for small private dining rooms to ₹2,00,000+ for premium resort and banquet hall spaces. Eevagga helps you find venues within your budget and handles full decoration and planning.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Eevagga help with venue booking and decoration?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! Eevagga provides a complete service — from venue scouting and booking coordination to full theme decoration, entertainment, catering coordination and on-ground management. You deal with just one team for everything.',
      },
    },
    {
      '@type': 'Question',
      name: 'What types of birthday venues are available in Bangalore?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Bangalore has banquet halls, garden venues, terrace and rooftop spaces, farmhouses, resort lawns, private restaurant dining rooms, club houses and community halls. Eevagga has a curated list of vetted venues across all price points.',
      },
    },
  ],
};

/* ─── Page Config ──────────────────────────────────────────────────────── */
const pageConfig = {
  title: 'Birthday Venues Bangalore',
  badge: 'Venue Scouting & Full Planning',
  h1: 'Best Birthday Venues in Bangalore — Scouted & Decorated by Eevagga',
  heroSubtitle:
    'Finding the perfect birthday venue in Bangalore is now effortless. We scout banquet halls, garden spaces, rooftops, farmhouses and resort venues across the city — then handle every decoration and planning detail.',
  heroImage: '/service-pages/birthday-hero.png',
  heroImageAlt: 'Premium birthday venue decoration in Bangalore by Eevagga',

  stats: [
    { value: '50+', label: 'Curated Venues' },
    { value: '500+', label: 'Events Delivered' },
    { value: '4.9★', label: 'Average Rating' },
    { value: '100%', label: 'Venue + Décor' },
  ],

  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'Birthday Planner Bangalore', href: '/birthday-planner-bangalore' },
    { label: 'Birthday Venues Bangalore' },
  ],

  gallery: [
    { src: '/service-pages/birthday-hero.png', alt: 'Birthday venue decoration Bangalore', caption: 'Banquet Hall Setup' },
    { src: '/service-pages/birthday-gallery-1.png', alt: 'Garden birthday venue Bangalore', caption: 'Garden Venue' },
    { src: '/service-pages/birthday-gallery-2.png', alt: 'Birthday venue table setup Bangalore', caption: 'Venue Table Styling' },
    { src: '/service-pages/birthday-gallery-3.png', alt: 'Rooftop birthday venue Bangalore', caption: 'Rooftop Venue' },
    { src: '/service-pages/birthday-gallery-4.png', alt: 'Premium birthday hall decoration Bangalore', caption: 'Premium Hall' },
  ],

  features: [
    {
      icon: '🏛️',
      title: 'Banquet Hall Venues',
      description: 'Curated banquet halls across Indiranagar, Koramangala, Whitefield and HSR Layout for 30–500 guests — all with AV support.',
    },
    {
      icon: '🌿',
      title: 'Garden & Outdoor Spaces',
      description: 'Beautiful garden venues, farmhouse lawns and resort grounds across Bangalore for open-air birthday celebrations.',
    },
    {
      icon: '🏙️',
      title: 'Rooftop & Terrace Venues',
      description: 'Stylish rooftop and terrace venues with city views — perfect for evening adult birthdays and cocktail events.',
    },
    {
      icon: '🍽️',
      title: 'Private Dining Rooms',
      description: 'Exclusive private dining room bookings at top Bangalore restaurants for intimate birthday dinners and gatherings.',
    },
    {
      icon: '🎨',
      title: 'Complete Venue Decoration',
      description: 'Once the venue is booked, we transform it with theme décor, balloon installations, florals and lighting — all in one.',
    },
    {
      icon: '📋',
      title: 'End-to-End Coordination',
      description: 'From venue booking to catering, décor, entertainment and cleanup — one team handles everything for you.',
    },
  ],

  pricing: [
    {
      name: 'Starter',
      subtitle: 'Venue + basic decoration',
      price: 15000,
      featured: false,
      includes: [
        'Venue scouting (2–3 options)',
        'Basic balloon & backdrop décor',
        'Venue coordination support',
        'Cleanup & support',
        'Up to 30 guests',
      ],
    },
    {
      name: 'Premium',
      subtitle: 'Venue + full decoration',
      price: 45000,
      featured: true,
      includes: [
        'Venue scouting & booking coordination',
        'Full theme decoration',
        'Stage & backdrop setup',
        'Photography (2 hours)',
        'Catering coordination',
        'Entertainment coordination',
        'Up to 100 guests',
      ],
    },
    {
      name: 'Luxury',
      subtitle: 'Premium venue + full event management',
      price: 120000,
      featured: false,
      includes: [
        'Premium venue sourcing',
        'Bespoke luxury decoration',
        'Full-day photography + video',
        'Live entertainment',
        'Gourmet catering management',
        'Dedicated event manager',
        '150+ guests',
      ],
    },
  ],

  faqs: [
    {
      question: 'What are the best birthday venues in Bangalore?',
      answer:
        'Bangalore has excellent birthday venues including banquet halls in Indiranagar and Koramangala, garden venues in Sarjapur, resort spaces near Electronic City and rooftop venues in Whitefield. Eevagga scouts and recommends venues matched to your budget and guest count.',
    },
    {
      question: 'How much do birthday venues cost in Bangalore?',
      answer:
        'Venue costs range from ₹10,000 for small private dining rooms to ₹2,00,000+ for premium resort halls. Eevagga helps you find the right venue within budget and handles full decoration and planning.',
    },
    {
      question: 'Does Eevagga handle both venue booking and decoration?',
      answer:
        'Yes! We offer a complete end-to-end service — venue scouting, booking coordination, full theme decoration, entertainment and catering — handled by one seamless team.',
    },
    {
      question: 'What types of birthday venues are available in Bangalore?',
      answer:
        'Options include banquet halls, garden venues, terraces, farmhouses, resort lawns, private restaurant dining rooms and clubhouses — across all price points and areas in Bangalore.',
    },
    {
      question: 'How far in advance should I book a birthday venue in Bangalore?',
      answer:
        'Popular venues in Bangalore book 4–8 weeks in advance for weekends. We recommend reaching out to Eevagga 4–6 weeks before your event to secure the best options.',
    },
  ],
};

/* ─── Page Component ───────────────────────────────────────────────────── */
export default function BirthdayVenuesBangalorePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema).replace(/</g, '\\u003c') }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema).replace(/</g, '\\u003c') }}
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
