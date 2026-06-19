import { Suspense } from 'react';
import { ogImages } from '../_seo';
import ServiceLandingPage from '../../components/ServiceLandingPage/ServiceLandingPage';

export const metadata = {
  title: 'Birthday Planner Hebbal | Local Party Planners — Eevagga',
  description: 'Looking for a birthday planner in Hebbal, Bangalore? Eevagga offers end-to-end birthday planning in Hebbal — themes, décor, photography, venues & catering. Book today.',
  keywords: 'birthday planner Hebbal, birthday party planner Hebbal Bangalore, birthday decoration Hebbal, birthday planning Hebbal Bangalore',
  alternates: { canonical: 'https://www.eevagga.com/birthday-planner-hebbal' },
  openGraph: { title: 'Birthday Planner Hebbal | Local Party Planners — Eevagga', description: 'End-to-end birthday planning in Hebbal, Bangalore. Themes, décor, photography & venue coordination by Eevagga.', url: 'https://www.eevagga.com/birthday-planner-hebbal', siteName: 'Eevagga', type: 'website', images: ogImages },
  twitter: { card: 'summary_large_image', title: 'Birthday Planner Hebbal Bangalore — Eevagga', description: 'Expert birthday planners in Hebbal, Bangalore. Full end-to-end planning.' },
};

const serviceSchema = { '@context': 'https://schema.org', '@type': 'Service', '@id': 'https://www.eevagga.com/birthday-planner-hebbal#service', name: 'Birthday Planner in Hebbal, Bangalore', description: 'Full-service birthday planning in Hebbal, Bangalore. Covers Hebbal, Thanisandra, Jakkur and surrounding North Bangalore areas.', provider: { '@id': 'https://www.eevagga.com/#organization' }, serviceType: 'Birthday Party Planning', areaServed: { '@type': 'Place', name: 'Hebbal, Bangalore' }, url: 'https://www.eevagga.com/birthday-planner-hebbal', offers: { '@type': 'AggregateOffer', priceCurrency: 'INR', lowPrice: '15000', highPrice: '150000', offerCount: '3' } };
const localBusinessSchema = { '@context': 'https://schema.org', '@type': 'LocalBusiness', name: 'Eevagga — Birthday Planner Hebbal', url: 'https://www.eevagga.com/birthday-planner-hebbal', telephone: '+918050279101', address: { '@type': 'PostalAddress', addressLocality: 'Hebbal', addressRegion: 'Bangalore', addressCountry: 'IN' }, areaServed: { '@type': 'Place', name: 'Hebbal, Bangalore' }, priceRange: '₹₹–₹₹₹' };
const breadcrumbSchema = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.eevagga.com' }, { '@type': 'ListItem', position: 2, name: 'Birthday Planner Bangalore', item: 'https://www.eevagga.com/birthday-planner-bangalore' }, { '@type': 'ListItem', position: 3, name: 'Birthday Planner Hebbal', item: 'https://www.eevagga.com/birthday-planner-hebbal' }] };
const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [{ '@type': 'Question', name: 'Does Eevagga offer birthday planning in Hebbal?', acceptedAnswer: { '@type': 'Answer', text: 'Yes! Eevagga serves Hebbal, Thanisandra, Jakkur and surrounding North Bangalore areas with full end-to-end birthday planning.' } }, { '@type': 'Question', name: 'What birthday venues are available in Hebbal?', acceptedAnswer: { '@type': 'Answer', text: 'Hebbal offers banquet halls near Hebbal flyover, lakeside garden venues near Hebbal Lake, hotel banquet rooms and clubhouse spaces in nearby gated communities. Eevagga coordinates venue booking and full decoration.' } }, { '@type': 'Question', name: 'How much does a birthday party in Hebbal cost?', acceptedAnswer: { '@type': 'Answer', text: 'Birthday parties in Hebbal start from ₹15,000 for home décor setups to ₹1,50,000+ for luxury venue celebrations. Eevagga has packages for all budgets and guest counts.' } }, { '@type': 'Question', name: 'Does Eevagga serve Yelahanka from Hebbal?', acceptedAnswer: { '@type': 'Answer', text: 'Yes! Our North Bangalore team covers Hebbal, Yelahanka, Thanisandra, Hennur and surrounding areas for seamless birthday planning.' } }] };

const pageConfig = {
  title: 'Birthday Planner Hebbal', badge: 'Serving Hebbal & North Bangalore',
  h1: 'Birthday Planner in Hebbal, Bangalore — Premium Celebrations by Eevagga',
  heroSubtitle: 'Celebrate in style across Hebbal, Thanisandra, Jakkur and North Bangalore. Eevagga\'s local team delivers premium themes, venue coordination, décor and photography — fully managed for you.',
  heroImage: '/service-pages/birthday-hero.png', heroImageAlt: 'Birthday party decoration in Hebbal Bangalore by Eevagga',
  stats: [{ value: '75+', label: 'Hebbal Events' }, { value: '4.9★', label: 'Average Rating' }, { value: '22+', label: 'Themes Available' }, { value: '100%', label: 'North BLR Coverage' }],
  breadcrumbs: [{ label: 'Home', href: '/' }, { label: 'Birthday Planner Bangalore', href: '/birthday-planner-bangalore' }, { label: 'Birthday Planner Hebbal' }],
  gallery: [{ src: '/service-pages/birthday-hero.png', alt: 'Birthday party decoration Hebbal Bangalore', caption: 'Hebbal Setup' }, { src: '/service-pages/birthday-gallery-1.png', alt: 'Lakeside birthday party Hebbal', caption: 'Lakeside Party' }, { src: '/service-pages/birthday-gallery-2.png', alt: 'Birthday cake table Hebbal Bangalore', caption: 'Dessert Table' }, { src: '/service-pages/birthday-gallery-3.png', alt: 'Stage setup birthday Hebbal Bangalore', caption: 'Stage Setup' }, { src: '/service-pages/birthday-gallery-4.png', alt: 'Balloon arch birthday Hebbal', caption: 'Balloon Arch' }],
  features: [
    { icon: '📍', title: 'Local Hebbal Coverage', description: 'We serve Hebbal, Thanisandra, Jakkur, Kogilu and all North Bangalore corridors with efficient local deployment.' },
    { icon: '🌊', title: 'Lakeside & Garden Venues', description: 'Hebbal Lake-adjacent garden venues for beautiful outdoor birthday celebrations in North Bangalore.' },
    { icon: '🏨', title: 'Hotel & Banquet Halls', description: 'Hotel banquet rooms near Hebbal flyover and North Bangalore for mid-size to large birthday parties.' },
    { icon: '🎨', title: 'Theme Design & Décor', description: 'Full theme design from concept to execution — any character, colour or style perfectly brought to life.' },
    { icon: '📸', title: 'Photography Team', description: 'Professional photographers experienced with North Bangalore venues.' },
    { icon: '🚀', title: 'Fast Setup & Teardown', description: 'Setup in 3–4 hours, complete teardown within 2 hours post-event.' },
  ],
  pricing: [{ name: 'Starter', subtitle: 'Perfect for intimate Hebbal parties', price: 15000, featured: false, includes: ['Theme consultation', 'Balloon & basic décor setup', 'Birthday backdrop & signage', 'Cleanup & support', 'Up to 30 guests'] }, { name: 'Premium', subtitle: 'Most popular in Hebbal', price: 35000, featured: true, includes: ['Full theme design & execution', 'Premium balloon & floral décor', 'Stage setup & backdrop', 'Photography (2 hours)', 'Entertainment coordination', 'Up to 75 guests'] }, { name: 'Luxury', subtitle: 'Grand Hebbal celebration', price: 65000, featured: false, includes: ['Bespoke theme & full styling', 'Luxury floral & prop installations', 'Full-day photography + video', 'Live entertainment / DJ', 'Catering coordination', '100+ guests'] }],
  faqs: [
    { question: 'Does Eevagga plan birthday parties in Hebbal?', answer: 'Yes! We serve Hebbal, Thanisandra, Jakkur and North Bangalore with full end-to-end birthday planning.' },
    { question: 'What venues are available in Hebbal for birthdays?', answer: 'Banquet halls near Hebbal flyover, lakeside garden venues near Hebbal Lake, hotel banquet rooms and gated community clubhouses — all coordinated by Eevagga.' },
    { question: 'How much does a birthday party in Hebbal cost?', answer: 'Parties start from ₹15,000 for at-home setups to ₹1,50,000+ for luxury venue celebrations. Eevagga has packages for all budgets.' },
    { question: 'Does Eevagga cover Yelahanka and Hennur from Hebbal?', answer: 'Yes! Our North Bangalore team covers Hebbal, Yelahanka, Thanisandra and Hennur for seamless birthday planning.' },
    { question: 'How quickly can Eevagga set up in Hebbal?', answer: 'Our local team can set up in 3–4 hours on event day. Overnight setups are also available for morning celebrations.' },
  ],
};

export default function BirthdayPlannerHebbalPage() {
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
