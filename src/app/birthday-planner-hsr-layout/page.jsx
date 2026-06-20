import { Suspense } from 'react';
import { ogImages } from '../_seo';
import ServiceLandingPage from '../../components/ServiceLandingPage/ServiceLandingPage';

export const metadata = {
  title: { absolute: "Birthday Planner HSR Layout — Eevagga" },
  description: 'Looking for a birthday planner in HSR Layout, Bangalore? Eevagga offers end-to-end birthday planning in HSR Layout — themes, décor, photography, venues & catering. Book today.',
  keywords: 'birthday planner HSR Layout, birthday party planner HSR Layout Bangalore, birthday decoration HSR Layout, birthday planning HSR Layout Bangalore',
  alternates: { canonical: 'https://www.eevagga.com/birthday-planner-hsr-layout' },
  openGraph: {
    title: 'Birthday Planner HSR Layout | Local Party Planners — Eevagga',
    description: 'End-to-end birthday planning in HSR Layout, Bangalore. Themes, décor, photography & venue coordination by Eevagga.',
    url: 'https://www.eevagga.com/birthday-planner-hsr-layout', siteName: 'Eevagga', type: 'website', images: ogImages,
  },
  twitter: { card: 'summary_large_image', title: 'Birthday Planner HSR Layout Bangalore — Eevagga', description: 'Expert birthday planners in HSR Layout, Bangalore. Full end-to-end planning.' },
};

const serviceSchema = {
  '@context': 'https://schema.org', '@type': 'Service',
  '@id': 'https://www.eevagga.com/birthday-planner-hsr-layout#service',
  name: 'Birthday Planner in HSR Layout, Bangalore',
  description: 'Full-service birthday planning in HSR Layout, Bangalore. Covers all sectors of HSR Layout, Agara and surrounding areas with theme decoration, venue coordination, photography and on-ground management.',
  provider: { '@id': 'https://www.eevagga.com/#organization' },
  serviceType: 'Birthday Party Planning',
  areaServed: { '@type': 'Place', name: 'HSR Layout, Bangalore' },
  url: 'https://www.eevagga.com/birthday-planner-hsr-layout',
  offers: { '@type': 'AggregateOffer', priceCurrency: 'INR', lowPrice: '15000', highPrice: '150000', offerCount: '3' },
};

const localBusinessSchema = {
  '@context': 'https://schema.org', '@type': 'LocalBusiness', name: 'Eevagga — Birthday Planner HSR Layout',
  description: 'Expert birthday planners serving HSR Layout and surrounding South Bangalore areas.',
  url: 'https://www.eevagga.com/birthday-planner-hsr-layout', telephone: '+918050279101',
  address: { '@type': 'PostalAddress', addressLocality: 'HSR Layout', addressRegion: 'Bangalore', addressCountry: 'IN' },
  areaServed: { '@type': 'Place', name: 'HSR Layout, Bangalore' }, priceRange: '₹₹–₹₹₹',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.eevagga.com' },
    { '@type': 'ListItem', position: 2, name: 'Birthday Planner Bangalore', item: 'https://www.eevagga.com/birthday-planner-bangalore' },
    { '@type': 'ListItem', position: 3, name: 'Birthday Planner HSR Layout', item: 'https://www.eevagga.com/birthday-planner-hsr-layout' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Does Eevagga offer birthday planning services in HSR Layout?', acceptedAnswer: { '@type': 'Answer', text: 'Yes! Eevagga is a trusted birthday planner in HSR Layout, Bangalore. We serve all sectors of HSR Layout, Agara, Kudlu Gate and surrounding areas with full end-to-end birthday planning.' } },
    { '@type': 'Question', name: 'Which venues does Eevagga recommend in HSR Layout for birthday parties?', acceptedAnswer: { '@type': 'Answer', text: 'Popular venue options in HSR Layout include community halls, banquet halls on 27th Main and Outer Ring Road, restaurant private dining rooms and home birthday setups. Eevagga coordinates all venue bookings and decoration.' } },
    { '@type': 'Question', name: 'How much does a birthday party cost in HSR Layout?', acceptedAnswer: { '@type': 'Answer', text: 'Birthday parties in HSR Layout start from ₹15,000 for home décor setups and go up to ₹1,50,000+ for luxury venue celebrations. Eevagga offers packages for all budgets and guest counts.' } },
    { '@type': 'Question', name: 'How quickly can Eevagga set up a birthday party in HSR Layout?', acceptedAnswer: { '@type': 'Answer', text: 'Our team can typically complete setup in 3–4 hours on event day. For large themed installations we recommend 5–6 hours. We also offer overnight setups for morning celebrations.' } },
  ],
};

const pageConfig = {
  relatedLinks: [
    {
      "label": "Birthday Planner Whitefield",
      "href": "/birthday-planner-whitefield"
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
  title: 'Birthday Planner HSR Layout',
  badge: 'Serving HSR Layout & Agara',
  h1: 'Birthday Planner in HSR Layout, Bangalore — End-to-End Celebrations by Eevagga',
  heroSubtitle: 'Celebrate in style across all sectors of HSR Layout, Agara and Kudlu Gate. Eevagga\'s local team delivers premium themes, venue coordination, décor and photography — fully managed for you.',
  heroImage: '/service-pages/birthday-hero.png',
  heroImageAlt: 'Birthday party decoration in HSR Layout Bangalore by Eevagga',
  stats: [
    { value: '80+', label: 'HSR Layout Events' },
    { value: '4.9★', label: 'Average Rating' },
    { value: '22+', label: 'Themes Available' },
    { value: '100%', label: 'Local Coverage' },
  ],
  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'Birthday Planner Bangalore', href: '/birthday-planner-bangalore' },
    { label: 'Birthday Planner HSR Layout' },
  ],
  gallery: [
    { src: '/service-pages/birthday-hero.png', alt: 'Birthday party decoration HSR Layout Bangalore', caption: 'HSR Layout Setup' },
    { src: '/service-pages/birthday-gallery-1.png', alt: 'Home birthday party HSR Layout Bangalore', caption: 'Home Party' },
    { src: '/service-pages/birthday-gallery-2.png', alt: 'Birthday cake table HSR Layout Bangalore', caption: 'Dessert Table' },
    { src: '/service-pages/birthday-gallery-3.png', alt: 'Stage setup birthday HSR Layout', caption: 'Stage Setup' },
    { src: '/service-pages/birthday-gallery-4.png', alt: 'Balloon arch birthday HSR Layout', caption: 'Balloon Arch' },
  ],
  features: [
    { icon: '📍', title: 'Local HSR Layout Coverage', description: 'We serve all sectors of HSR Layout, Agara, Kudlu Gate and surrounding South Bangalore areas with quick deployment.' },
    { icon: '🏘️', title: 'HSR Layout Venue Network', description: 'Curated venue options in HSR Layout including community halls, banquet spaces and restaurant private rooms.' },
    { icon: '🎨', title: 'Theme Design & Décor', description: 'Full theme design from concept to execution — any character, colour or style perfectly brought to life.' },
    { icon: '📸', title: 'Photography Team', description: 'Professional photographers available for birthday events across HSR Layout and South Bangalore.' },
    { icon: '🎤', title: 'Entertainment Coordination', description: 'Magicians, DJs, emcees and performers coordinated for HSR Layout birthday events.' },
    { icon: '🚀', title: 'Fast Setup & Teardown', description: 'Setup in 3–4 hours, complete teardown within 2 hours — efficient and stress-free for you.' },
  ],
  pricing: [
    { name: 'Starter', subtitle: 'Perfect for intimate HSR parties', price: 15000, featured: false, includes: ['Theme consultation', 'Balloon & basic décor setup', 'Birthday backdrop & signage', 'Cleanup & support', 'Up to 30 guests'] },
    { name: 'Premium', subtitle: 'Most popular in HSR Layout', price: 35000, featured: true, includes: ['Full theme design & execution', 'Premium balloon & floral décor', 'Stage setup & backdrop', 'Photography (2 hours)', 'Entertainment coordination', 'Up to 75 guests'] },
    { name: 'Luxury', subtitle: 'Grand HSR Layout celebration', price: 65000, featured: false, includes: ['Bespoke theme & full styling', 'Luxury floral & prop installations', 'Full-day photography + video', 'Live entertainment / DJ', 'Catering coordination', '100+ guests'] },
  ],
  faqs: [
    { question: 'Does Eevagga plan birthday parties in HSR Layout?', answer: 'Yes! We are active birthday planners in HSR Layout serving all sectors, Agara and Kudlu Gate with full end-to-end birthday planning.' },
    { question: 'What venues does Eevagga recommend in HSR Layout?', answer: 'Popular options include community halls, banquet halls on 27th Main and Outer Ring Road, restaurant private dining rooms and home birthday setups.' },
    { question: 'How much does a birthday party in HSR Layout cost?', answer: 'Parties start from ₹15,000 for at-home setups to ₹1,50,000+ for luxury venue celebrations. Eevagga has packages for all budgets.' },
    { question: 'How quickly can Eevagga set up in HSR Layout?', answer: 'Our team can set up in 3–4 hours on event day. For large custom installations we recommend 5–6 hours. Overnight setups are also available.' },
    { question: 'Does Eevagga serve Koramangala and Bellandur from HSR Layout?', answer: 'Yes! Our HSR Layout team also covers neighbouring areas including Koramangala, Bellandur, Sarjapur Road and Bommanahalli.' },
  ],
};

export default function BirthdayPlannerHSRLayoutPage() {
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
