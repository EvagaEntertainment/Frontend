import { Suspense } from 'react';
import { ogImages } from '../_seo';
import ServiceLandingPage from '../../components/ServiceLandingPage/ServiceLandingPage';

export const metadata = {
  title: { absolute: "Birthday Planner Yelahanka — Eevagga" },
  description: 'Looking for a birthday planner in Yelahanka, Bangalore? Eevagga offers end-to-end birthday planning in Yelahanka — themes, décor, photography, venues & catering. Book today.',
  keywords: 'birthday planner Yelahanka, birthday party planner Yelahanka Bangalore, birthday decoration Yelahanka, birthday planning Yelahanka Bangalore, birthday planner Yellhanka',
  alternates: { canonical: 'https://www.eevagga.com/birthday-planner-yellhanka' },
  openGraph: { title: 'Birthday Planner Yelahanka | Local Party Planners — Eevagga', description: 'End-to-end birthday planning in Yelahanka, Bangalore. Themes, décor, photography & venue coordination by Eevagga.', url: 'https://www.eevagga.com/birthday-planner-yellhanka', siteName: 'Eevagga', type: 'website', images: ogImages },
  twitter: { card: 'summary_large_image', title: 'Birthday Planner Yelahanka Bangalore — Eevagga', description: 'Expert birthday planners in Yelahanka, Bangalore. Full end-to-end planning.' },
};

const serviceSchema = { '@context': 'https://schema.org', '@type': 'Service', '@id': 'https://www.eevagga.com/birthday-planner-yellhanka#service', name: 'Birthday Planner in Yelahanka, Bangalore', description: 'Full-service birthday planning in Yelahanka, Bangalore. Covers Yelahanka New Town, Yelahanka Old Town, Jakkur, Thanisandra and surrounding North Bangalore areas.', provider: { '@id': 'https://www.eevagga.com/#organization' }, serviceType: 'Birthday Party Planning', areaServed: { '@type': 'Place', name: 'Yelahanka, Bangalore' }, url: 'https://www.eevagga.com/birthday-planner-yellhanka', offers: { '@type': 'AggregateOffer', priceCurrency: 'INR', lowPrice: 15000, highPrice: 150000, offerCount: 3 } };
const localBusinessSchema = { '@context': 'https://schema.org', '@type': 'LocalBusiness', name: 'Eevagga — Birthday Planner Yelahanka', url: 'https://www.eevagga.com/birthday-planner-yellhanka', telephone: '+918050279101', address: { '@type': 'PostalAddress', addressLocality: 'Yelahanka', addressRegion: 'Bangalore', addressCountry: 'IN' }, areaServed: { '@type': 'Place', name: 'Yelahanka, Bangalore' }, priceRange: '₹₹–₹₹₹' };
const breadcrumbSchema = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.eevagga.com' }, { '@type': 'ListItem', position: 2, name: 'Birthday Planner Bangalore', item: 'https://www.eevagga.com/birthday-planner-bangalore' }, { '@type': 'ListItem', position: 3, name: 'Birthday Planner Yelahanka', item: 'https://www.eevagga.com/birthday-planner-yellhanka' }] };
const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [{ '@type': 'Question', name: 'Does Eevagga offer birthday planning in Yelahanka?', acceptedAnswer: { '@type': 'Answer', text: 'Yes! Eevagga serves Yelahanka New Town, Yelahanka Old Town, Jakkur and surrounding North Bangalore areas with full end-to-end birthday planning.' } }, { '@type': 'Question', name: 'What birthday venues are available in Yelahanka?', acceptedAnswer: { '@type': 'Answer', text: 'Yelahanka has community halls, banquet halls near Yelahanka main road, gated community clubhouses in new developments and garden venues near Jakkur Lake. Eevagga coordinates venue bookings and complete decoration.' } }, { '@type': 'Question', name: 'How much does a birthday party in Yelahanka cost?', acceptedAnswer: { '@type': 'Answer', text: 'Birthday parties in Yelahanka start from ₹15,000 for home décor setups to ₹1,50,000+ for luxury celebrations. We have packages for all budgets and guest counts.' } }, { '@type': 'Question', name: 'Does Eevagga serve Jakkur and Thanisandra from Yelahanka?', acceptedAnswer: { '@type': 'Answer', text: 'Yes! Our North Bangalore team covers Yelahanka, Jakkur, Thanisandra, Hebbal and surrounding areas for seamless birthday planning.' } }] };

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
  title: 'Birthday Planner Yelahanka', badge: 'Serving Yelahanka & North Bangalore',
  h1: 'Birthday Planner in Yelahanka, Bangalore — Premium Celebrations by Eevagga',
  heroSubtitle: 'Celebrate in style across Yelahanka New Town, Old Town, Jakkur and North Bangalore. Eevagga\'s local team delivers premium themes, venue coordination, décor and photography — fully managed.',
  heroImage: '/service-pages/birthday-hero.png', heroImageAlt: 'Birthday party decoration in Yelahanka Bangalore by Eevagga',
  stats: [{ value: '60+', label: 'Yelahanka Events' }, { value: '4.9★', label: 'Average Rating' }, { value: '22+', label: 'Themes Available' }, { value: '100%', label: 'North BLR Coverage' }],
  breadcrumbs: [{ label: 'Home', href: '/' }, { label: 'Birthday Planner Bangalore', href: '/birthday-planner-bangalore' }, { label: 'Birthday Planner Yelahanka' }],
  gallery: [{ src: '/service-pages/birthday-hero.png', alt: 'Birthday party decoration Yelahanka Bangalore', caption: 'Yelahanka Setup' }, { src: '/service-pages/birthday-gallery-1.png', alt: 'Garden birthday party Yelahanka', caption: 'Garden Party' }, { src: '/service-pages/birthday-gallery-2.png', alt: 'Birthday cake table Yelahanka Bangalore', caption: 'Dessert Table' }, { src: '/service-pages/birthday-gallery-3.png', alt: 'Stage setup birthday Yelahanka', caption: 'Stage Setup' }, { src: '/service-pages/birthday-gallery-4.png', alt: 'Balloon arch birthday Yelahanka', caption: 'Balloon Arch' }],
  features: [
    { icon: '📍', title: 'Local Yelahanka Coverage', description: 'We serve Yelahanka New Town, Old Town, Jakkur and Thanisandra with efficient local deployment.' },
    { icon: '🌿', title: 'Garden & Outdoor Venues', description: 'Garden venues near Jakkur Lake and outdoor spaces ideal for evening birthday celebrations in North Bangalore.' },
    { icon: '🏘️', title: 'Community & Clubhouse Setups', description: 'Community halls and clubhouses in Yelahanka New Town for affordable and convenient birthday parties.' },
    { icon: '🎨', title: 'Theme Design & Décor', description: 'Full theme design from concept to execution — any character, colour or style perfectly brought to life.' },
    { icon: '📸', title: 'Photography Team', description: 'Professional photographers available across Yelahanka and North Bangalore.' },
    { icon: '🚀', title: 'Fast Setup & Teardown', description: 'Setup in 3–4 hours, complete teardown within 2 hours post-event.' },
  ],
};

export default function BirthdayPlannerYelahankPage() {
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