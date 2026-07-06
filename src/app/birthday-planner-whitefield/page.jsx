import { Suspense } from 'react';
import { ogImages } from '../_seo';
import ServiceLandingPage from '../../components/ServiceLandingPage/ServiceLandingPage';

export const metadata = {
  title: { absolute: "Birthday Planner Whitefield — Eevagga" },
  description: 'Looking for a birthday planner in Whitefield, Bangalore? Eevagga offers end-to-end birthday planning in Whitefield — themes, décor, photography, venues & catering. Book today.',
  keywords: 'birthday planner Whitefield, birthday party planner Whitefield Bangalore, birthday decoration Whitefield, birthday planning Whitefield, Whitefield birthday organiser',
  alternates: { canonical: 'https://www.eevagga.com/birthday-planner-whitefield' },
  openGraph: {
    title: 'Birthday Planner Whitefield | Local Party Planners — Eevagga',
    description: 'End-to-end birthday planning in Whitefield, Bangalore. Themes, décor, photography & venue coordination by Eevagga.',
    url: 'https://www.eevagga.com/birthday-planner-whitefield', siteName: 'Eevagga', type: 'website', images: ogImages,
  },
  twitter: { card: 'summary_large_image', title: 'Birthday Planner Whitefield Bangalore — Eevagga', description: 'Expert birthday planners in Whitefield, Bangalore. Full end-to-end planning.' },
};

const serviceSchema = {
  '@context': 'https://schema.org', '@type': 'Service',
  '@id': 'https://www.eevagga.com/birthday-planner-whitefield#service',
  name: 'Birthday Planner in Whitefield, Bangalore',
  description: 'Full-service birthday planning in Whitefield, Bangalore. Covers ITPL, Marathahalli, Kadugodi, Varthur and surrounding areas with theme decoration, venue coordination, photography and on-ground management.',
  provider: { '@id': 'https://www.eevagga.com/#organization' },
  serviceType: 'Birthday Party Planning',
  areaServed: { '@type': 'Place', name: 'Whitefield, Bangalore' },
  url: 'https://www.eevagga.com/birthday-planner-whitefield',
  offers: { '@type': 'AggregateOffer', priceCurrency: 'INR', lowPrice: 15000, highPrice: 150000, offerCount: 3 },
};

const localBusinessSchema = {
  '@context': 'https://schema.org', '@type': 'LocalBusiness', name: 'Eevagga — Birthday Planner Whitefield',
  description: 'Expert birthday planners serving Whitefield, ITPL, Marathahalli and surrounding Bangalore East areas.',
  url: 'https://www.eevagga.com/birthday-planner-whitefield', telephone: '+918050279101',
  address: { '@type': 'PostalAddress', addressLocality: 'Whitefield', addressRegion: 'Bangalore', addressCountry: 'IN' },
  areaServed: { '@type': 'Place', name: 'Whitefield, Bangalore' }, priceRange: '₹₹–₹₹₹',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.eevagga.com' },
    { '@type': 'ListItem', position: 2, name: 'Birthday Planner Bangalore', item: 'https://www.eevagga.com/birthday-planner-bangalore' },
    { '@type': 'ListItem', position: 3, name: 'Birthday Planner Whitefield', item: 'https://www.eevagga.com/birthday-planner-whitefield' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Does Eevagga offer birthday planning services in Whitefield?', acceptedAnswer: { '@type': 'Answer', text: 'Yes! Eevagga is an active birthday planner in Whitefield, Bangalore. We serve Whitefield, ITPL, Marathahalli, Kadugodi and Varthur with full end-to-end birthday planning including themes, décor, venue coordination, photography and entertainment.' } },
    { '@type': 'Question', name: 'Which venues does Eevagga recommend for birthday parties in Whitefield?', acceptedAnswer: { '@type': 'Answer', text: 'We recommend gated community clubhouses (Prestige Shantiniketan, Brigade Metropolis), hotel banquet halls near ITPL, garden venues along Whitefield–Sarjapur Road and private dining rooms for intimate celebrations.' } },
    { '@type': 'Question', name: 'How much does a birthday party cost in Whitefield, Bangalore?', acceptedAnswer: { '@type': 'Answer', text: 'Birthday parties in Whitefield start from ₹15,000 for at-home décor setups and go up to ₹1,50,000+ for luxury celebrations with venue hire, full decoration, photography and catering. Eevagga offers packages for all budgets.' } },
    { '@type': 'Question', name: 'How quickly can Eevagga set up a birthday party in Whitefield?', acceptedAnswer: { '@type': 'Answer', text: 'Our Whitefield-area team can typically set up within 3–4 hours on the day of your event. For custom themes and large installations, we prefer 5–6 hours of setup time. We can also do overnight setups for morning events.' } },
  ],
};

const pageConfig = {
  relatedLinks: [
    {
      "label": "Birthday Planner Hsr Layout",
      "href": "/birthday-planner-hsr-layout"
    },
    {
      "label": "Birthday Planner Koramangala",
      "href": "/birthday-planner-koramangala"
    },
    {
      "label": "Birthday Planner Indiranagar",
      "href": "/birthday-planner-indiranagar"
    },
    {
      "label": "Birthday Planner Sarjapur",
      "href": "/birthday-planner-sarjapur"
    }
  ],
  title: 'Birthday Planner Whitefield',
  badge: 'Serving Whitefield & ITPL',
  h1: 'Birthday Planner in Whitefield, Bangalore — End-to-End Celebrations by Eevagga',
  heroSubtitle: 'Celebrate in style across Whitefield, ITPL, Marathahalli and Kadugodi. Eevagga\'s local team delivers premium themes, venue coordination, décor and photography — fully managed for you.',
  heroImage: '/service-pages/birthday-hero.png',
  heroImageAlt: 'Birthday party decoration in Whitefield Bangalore by Eevagga',
  stats: [
    { value: '100+', label: 'Whitefield Events' },
    { value: '4.9★', label: 'Average Rating' },
    { value: '22+', label: 'Themes Available' },
    { value: '100%', label: 'Local Coverage' },
  ],
  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'Birthday Planner Bangalore', href: '/birthday-planner-bangalore' },
    { label: 'Birthday Planner Whitefield' },
  ],
  gallery: [
    { src: '/service-pages/birthday-hero.png', alt: 'Birthday party decoration Whitefield Bangalore', caption: 'Whitefield Grand Setup' },
    { src: '/service-pages/birthday-gallery-1.png', alt: 'Outdoor birthday party Whitefield Bangalore', caption: 'Garden Party' },
    { src: '/service-pages/birthday-gallery-2.png', alt: 'Birthday cake table Whitefield Bangalore', caption: 'Dessert Table' },
    { src: '/service-pages/birthday-gallery-3.png', alt: 'Stage setup birthday Whitefield Bangalore', caption: 'Stage Setup' },
    { src: '/service-pages/birthday-gallery-4.png', alt: 'Balloon arch birthday Whitefield', caption: 'Balloon Arch' },
  ],
  features: [
    { icon: '📍', title: 'Local Whitefield Coverage', description: 'We serve all of Whitefield including ITPL, Marathahalli, Kadugodi, Varthur Road and surrounding areas with quick deployment.' },
    { icon: '🏘️', title: 'Whitefield Venue Network', description: 'Curated venue partnerships with Whitefield clubhouses, hotel banquet halls and garden venues for seamless booking.' },
    { icon: '🎨', title: 'Theme Design & Décor', description: 'Full theme design from concept to execution — any character, colour or style perfectly brought to life in Whitefield.' },
    { icon: '📸', title: 'Local Photography Team', description: 'Our Whitefield-based photography team is always available for quick deployments across the area.' },
    { icon: '🎤', title: 'Entertainment Coordination', description: 'Magicians, DJs, emcees and performers coordinated for Whitefield birthday events — for kids and adults alike.' },
    { icon: '🚀', title: 'Fast Setup & Teardown', description: 'Our Whitefield team can set up in 3–4 hours and complete teardown within 2 hours post-event.' },
  ],
};

export default function BirthdayPlannerWhitefieldPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }} />
      <Suspense fallback={null}><ServiceLandingPage config={pageConfig} /></Suspense>
    </>
  );
}