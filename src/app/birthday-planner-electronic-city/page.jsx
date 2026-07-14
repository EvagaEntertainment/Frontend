import { Suspense } from 'react';
import { ogImages } from '../_seo';
import ServiceLandingPage from '../../components/ServiceLandingPage/ServiceLandingPage';

export const metadata = {
  title: { absolute: "Birthday Planner Electronic City — Eevagga" },
  description: 'Looking for a birthday planner in Electronic City, Bangalore? Eevagga offers end-to-end birthday planning in Electronic City — themes, décor, photography, venues & catering. Book today.',
  keywords: 'birthday planner Electronic City, birthday party planner Electronic City Bangalore, birthday decoration Electronic City, birthday planning Electronic City Bangalore',
  alternates: { canonical: 'https://www.eevagga.com/birthday-planner-electronic-city' },
  openGraph: { title: 'Birthday Planner Electronic City | Local Party Planners — Eevagga', description: 'End-to-end birthday planning in Electronic City, Bangalore. Themes, décor, photography & venue coordination by Eevagga.', url: 'https://www.eevagga.com/birthday-planner-electronic-city', siteName: 'Eevagga', type: 'website', images: ogImages },
  twitter: { card: 'summary_large_image', title: 'Birthday Planner Electronic City Bangalore — Eevagga', description: 'Expert birthday planners in Electronic City, Bangalore. Full end-to-end planning.' },
};

const serviceSchema = { '@context': 'https://schema.org', '@type': 'Service', '@id': 'https://www.eevagga.com/birthday-planner-electronic-city#service', name: 'Birthday Planner in Electronic City, Bangalore', description: 'Full-service birthday planning in Electronic City, Bangalore. Covers EC Phase 1 & 2, Neeladri Road, Hebbagodi and surrounding areas with theme decoration, venue coordination and photography.', provider: { '@id': 'https://www.eevagga.com/#organization' }, serviceType: 'Birthday Party Planning', areaServed: { '@type': 'Place', name: 'Electronic City, Bangalore' }, url: 'https://www.eevagga.com/birthday-planner-electronic-city', offers: { '@type': 'AggregateOffer', priceCurrency: 'INR', lowPrice: 15000, highPrice: 150000, offerCount: 3 } };
const localBusinessSchema = { '@context': 'https://schema.org', '@type': 'LocalBusiness', name: 'Eevagga — Birthday Planner Electronic City', url: 'https://www.eevagga.com/birthday-planner-electronic-city', telephone: '+918050279101', address: { '@type': 'PostalAddress', addressLocality: 'Electronic City', addressRegion: 'Bangalore', addressCountry: 'IN' }, areaServed: { '@type': 'Place', name: 'Electronic City, Bangalore' }, priceRange: '₹₹–₹₹₹' };
const breadcrumbSchema = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.eevagga.com' }, { '@type': 'ListItem', position: 2, name: 'Birthday Planner Bangalore', item: 'https://www.eevagga.com/birthday-planner-bangalore' }, { '@type': 'ListItem', position: 3, name: 'Birthday Planner Electronic City', item: 'https://www.eevagga.com/birthday-planner-electronic-city' }] };
const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [{ '@type': 'Question', name: 'Does Eevagga offer birthday planning in Electronic City?', acceptedAnswer: { '@type': 'Answer', text: 'Yes! Eevagga serves Electronic City Phase 1 & 2, Neeladri Road, Hebbagodi and surrounding areas with full end-to-end birthday planning.' } }, { '@type': 'Question', name: 'What birthday venues are available in Electronic City?', acceptedAnswer: { '@type': 'Answer', text: 'Electronic City has gated community clubhouses in Neeladri Road and EC Phase 2 residential complexes, banquet halls on Hosur Road, garden resorts nearby and hotel venues. Eevagga coordinates all bookings and decoration.' } }, { '@type': 'Question', name: 'How much does a birthday party in Electronic City cost?', acceptedAnswer: { '@type': 'Answer', text: 'Birthday parties in Electronic City start from ₹15,000 for home décor setups to ₹1,50,000+ for luxury venue celebrations. Eevagga has packages for all budgets.' } }, { '@type': 'Question', name: 'Does Eevagga serve Bommasandra and Hebbagodi from Electronic City?', acceptedAnswer: { '@type': 'Answer', text: 'Yes! Our South Bangalore team covers Electronic City, Bommasandra, Hebbagodi and surrounding areas for seamless birthday planning.' } }] };

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
  title: 'Birthday Planner Electronic City', badge: 'Serving Electronic City & Hosur Road',
  h1: 'Birthday Planner in Electronic City, Bangalore — Premium Celebrations by Eevagga',
  heroSubtitle: 'Celebrate in style across Electronic City, Neeladri Road and Hosur Road. Eevagga\'s local team delivers premium themes, venue coordination, décor and photography — fully managed for you.',
  heroImage: '/service-pages/birthday-hero.png', heroImageAlt: 'Birthday party decoration in Electronic City Bangalore by Eevagga',
  stats: [{ value: '70+', label: 'EC Events Planned' }, { value: '4.9★', label: 'Average Rating' }, { value: '22+', label: 'Themes Available' }, { value: '100%', label: 'South BLR Coverage' }],
  breadcrumbs: [{ label: 'Home', href: '/' }, { label: 'Birthday Planner Bangalore', href: '/birthday-planner-bangalore' }, { label: 'Birthday Planner Electronic City' }],
  gallery: [{ src: '/service-pages/birthday-hero.png', alt: 'Birthday party decoration Electronic City Bangalore', caption: 'EC Setup' }, { src: '/service-pages/birthday-gallery-1.png', alt: 'Clubhouse birthday party Electronic City', caption: 'Clubhouse Party' }, { src: '/service-pages/birthday-gallery-2.png', alt: 'Birthday cake table Electronic City', caption: 'Dessert Table' }, { src: '/service-pages/birthday-gallery-3.png', alt: 'Stage setup birthday Electronic City', caption: 'Stage Setup' }, { src: '/service-pages/birthday-gallery-4.png', alt: 'Balloon arch birthday Electronic City', caption: 'Balloon Arch' }],
  features: [
    { icon: '📍', title: 'Local Electronic City Coverage', description: 'We serve EC Phase 1 & 2, Neeladri Road, Hebbagodi and Hosur Road areas with efficient local deployment.' },
    { icon: '🏘️', title: 'Residential Complex Setups', description: 'Experienced with clubhouse and open-air setups in Electronic City\'s large residential complexes.' },
    { icon: '🏨', title: 'Hosur Road Hotel Venues', description: 'Hotel banquet halls along Hosur Road for larger birthday celebrations with catering and full service.' },
    { icon: '🎨', title: 'Theme Design & Décor', description: 'Full theme design from concept to execution — any character, colour or style perfectly brought to life.' },
    { icon: '📸', title: 'Photography Team', description: 'Professional photographers available across Electronic City and South Bangalore.' },
    { icon: '🚀', title: 'Fast Setup & Teardown', description: 'Setup in 3–4 hours, complete teardown within 2 hours post-event.' },
  ],
};

export default function BirthdayPlannerElectronicCityPage() {
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