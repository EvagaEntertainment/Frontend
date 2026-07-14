import { Suspense } from 'react';
import { ogImages } from '../_seo';
import ServiceLandingPage from '../../components/ServiceLandingPage/ServiceLandingPage';

export const metadata = {
  title: { absolute: "Birthday Planner Hennur — Eevagga" },
  description: 'Looking for a birthday planner in Hennur, Bangalore? Eevagga offers end-to-end birthday planning in Hennur Road — themes, décor, photography, venues & catering. Book today.',
  keywords: 'birthday planner Hennur, birthday party planner Hennur Bangalore, birthday decoration Hennur Road, birthday planning Hennur Bangalore',
  alternates: { canonical: 'https://www.eevagga.com/birthday-planner-hennur' },
  openGraph: { title: 'Birthday Planner Hennur | Local Party Planners — Eevagga', description: 'End-to-end birthday planning in Hennur, Bangalore. Themes, décor, photography & venue coordination by Eevagga.', url: 'https://www.eevagga.com/birthday-planner-hennur', siteName: 'Eevagga', type: 'website', images: ogImages },
  twitter: { card: 'summary_large_image', title: 'Birthday Planner Hennur Bangalore — Eevagga', description: 'Expert birthday planners in Hennur, Bangalore. Full end-to-end planning.' },
};

const serviceSchema = { '@context': 'https://schema.org', '@type': 'Service', '@id': 'https://www.eevagga.com/birthday-planner-hennur#service', name: 'Birthday Planner in Hennur, Bangalore', description: 'Full-service birthday planning in Hennur, Bangalore. Covers Hennur Road, Kalyan Nagar, Banaswadi and surrounding North-East Bangalore areas.', provider: { '@id': 'https://www.eevagga.com/#organization' }, serviceType: 'Birthday Party Planning', areaServed: { '@type': 'Place', name: 'Hennur, Bangalore' }, url: 'https://www.eevagga.com/birthday-planner-hennur', offers: { '@type': 'AggregateOffer', priceCurrency: 'INR', lowPrice: 15000, highPrice: 150000, offerCount: 3 } };
const localBusinessSchema = { '@context': 'https://schema.org', '@type': 'LocalBusiness', name: 'Eevagga — Birthday Planner Hennur', url: 'https://www.eevagga.com/birthday-planner-hennur', telephone: '+918050279101', address: { '@type': 'PostalAddress', addressLocality: 'Hennur', addressRegion: 'Bangalore', addressCountry: 'IN' }, areaServed: { '@type': 'Place', name: 'Hennur, Bangalore' }, priceRange: '₹₹–₹₹₹' };
const breadcrumbSchema = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.eevagga.com' }, { '@type': 'ListItem', position: 2, name: 'Birthday Planner Bangalore', item: 'https://www.eevagga.com/birthday-planner-bangalore' }, { '@type': 'ListItem', position: 3, name: 'Birthday Planner Hennur', item: 'https://www.eevagga.com/birthday-planner-hennur' }] };
const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [{ '@type': 'Question', name: 'Does Eevagga offer birthday planning in Hennur?', acceptedAnswer: { '@type': 'Answer', text: 'Yes! Eevagga serves Hennur Road, Kalyan Nagar, Banaswadi and surrounding North-East Bangalore areas with full end-to-end birthday planning.' } }, { '@type': 'Question', name: 'What birthday venues are available in Hennur?', acceptedAnswer: { '@type': 'Answer', text: 'Hennur Road has banquet halls, community halls, gated community clubhouses on Hennur Road and home birthday party options. Eevagga coordinates venue bookings and complete decoration.' } }, { '@type': 'Question', name: 'How much does a birthday party in Hennur cost?', acceptedAnswer: { '@type': 'Answer', text: 'Birthday parties in Hennur start from ₹15,000 for home décor setups to ₹1,50,000+ for luxury celebrations. Eevagga has packages for all budgets.' } }, { '@type': 'Question', name: 'Does Eevagga cover Kalyan Nagar and Banaswadi from Hennur?', acceptedAnswer: { '@type': 'Answer', text: 'Yes! Our North-East Bangalore team covers Hennur Road, Kalyan Nagar, Banaswadi and Ramamurthy Nagar for seamless birthday planning.' } }] };

const pageConfig = {
  relatedLinks: [
    {
      "label": "Birthday Planner Whitefield",
      "href": "/birthday-planner-whitefield"
    },
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
    }
  ],
  title: 'Birthday Planner Hennur', badge: 'Serving Hennur Road & Kalyan Nagar',
  h1: 'Birthday Planner in Hennur, Bangalore — Premium Celebrations by Eevagga',
  heroSubtitle: 'Celebrate in style across Hennur Road, Kalyan Nagar, Banaswadi and North-East Bangalore. Eevagga\'s local team delivers premium themes, venue coordination, décor and photography.',
  heroImage: '/service-pages/birthday-hero.png', heroImageAlt: 'Birthday party decoration in Hennur Bangalore by Eevagga',
  stats: [{ value: '65+', label: 'Hennur Events' }, { value: '4.9★', label: 'Average Rating' }, { value: '22+', label: 'Themes Available' }, { value: '100%', label: 'NE BLR Coverage' }],
  breadcrumbs: [{ label: 'Home', href: '/' }, { label: 'Birthday Planner Bangalore', href: '/birthday-planner-bangalore' }, { label: 'Birthday Planner Hennur' }],
  gallery: [{ src: '/service-pages/birthday-hero.png', alt: 'Birthday party decoration Hennur Bangalore', caption: 'Hennur Setup' }, { src: '/service-pages/birthday-gallery-1.png', alt: 'Home birthday party Hennur Bangalore', caption: 'Home Party' }, { src: '/service-pages/birthday-gallery-2.png', alt: 'Birthday cake table Hennur Bangalore', caption: 'Dessert Table' }, { src: '/service-pages/birthday-gallery-3.png', alt: 'Stage setup birthday Hennur Bangalore', caption: 'Stage Setup' }, { src: '/service-pages/birthday-gallery-4.png', alt: 'Balloon arch birthday Hennur', caption: 'Balloon Arch' }],
  features: [
    { icon: '📍', title: 'Local Hennur Coverage', description: 'We serve Hennur Road, Kalyan Nagar, Banaswadi and Ramamurthy Nagar with efficient local deployment.' },
    { icon: '🏘️', title: 'Community Hall Network', description: 'Access to community halls and clubhouses across Hennur Road for affordable and convenient birthday setups.' },
    { icon: '🎨', title: 'Theme Design & Décor', description: 'Full theme design from concept to execution — any character, colour or style perfectly brought to life.' },
    { icon: '📸', title: 'Photography Team', description: 'Professional photographers available across Hennur and North-East Bangalore.' },
    { icon: '🎤', title: 'Entertainment Coordination', description: 'Magicians, DJs and emcees for Hennur birthday events — for all age groups.' },
    { icon: '🚀', title: 'Fast Setup & Teardown', description: 'Setup in 3–4 hours, complete teardown within 2 hours post-event.' },
  ],
};

export default function BirthdayPlannerHennurPage() {
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