import { Suspense } from 'react';
import { ogImages } from '../_seo';
import ServiceLandingPage from '../../components/ServiceLandingPage/ServiceLandingPage';

export const metadata = {
  title: { absolute: "Birthday Planner Bellandur — Eevagga" },
  description: 'Looking for a birthday planner in Bellandur, Bangalore? Eevagga offers end-to-end birthday planning in Bellandur — themes, décor, photography, venues & catering. Book today.',
  keywords: 'birthday planner Bellandur, birthday party planner Bellandur Bangalore, birthday decoration Bellandur, birthday planning Bellandur Bangalore',
  alternates: { canonical: 'https://www.eevagga.com/birthday-planner-bellandur' },
  openGraph: { title: 'Birthday Planner Bellandur | Local Party Planners — Eevagga', description: 'End-to-end birthday planning in Bellandur, Bangalore. Themes, décor, photography & venue coordination by Eevagga.', url: 'https://www.eevagga.com/birthday-planner-bellandur', siteName: 'Eevagga', type: 'website', images: ogImages },
  twitter: { card: 'summary_large_image', title: 'Birthday Planner Bellandur Bangalore — Eevagga', description: 'Expert birthday planners in Bellandur, Bangalore. Full end-to-end planning.' },
};

const serviceSchema = { '@context': 'https://schema.org', '@type': 'Service', '@id': 'https://www.eevagga.com/birthday-planner-bellandur#service', name: 'Birthday Planner in Bellandur, Bangalore', description: 'Full-service birthday planning in Bellandur, Bangalore. Covers Bellandur, Outer Ring Road tech corridors, Kadubeesanahalli and surrounding areas.', provider: { '@id': 'https://www.eevagga.com/#organization' }, serviceType: 'Birthday Party Planning', areaServed: { '@type': 'Place', name: 'Bellandur, Bangalore' }, url: 'https://www.eevagga.com/birthday-planner-bellandur', offers: { '@type': 'AggregateOffer', priceCurrency: 'INR', lowPrice: 15000, highPrice: 150000, offerCount: 3 } };
const localBusinessSchema = { '@context': 'https://schema.org', '@type': 'LocalBusiness', name: 'Eevagga — Birthday Planner Bellandur', url: 'https://www.eevagga.com/birthday-planner-bellandur', telephone: '+918050279101', address: { '@type': 'PostalAddress', addressLocality: 'Bellandur', addressRegion: 'Bangalore', addressCountry: 'IN' }, areaServed: { '@type': 'Place', name: 'Bellandur, Bangalore' }, priceRange: '₹₹–₹₹₹' };
const breadcrumbSchema = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.eevagga.com' }, { '@type': 'ListItem', position: 2, name: 'Birthday Planner Bangalore', item: 'https://www.eevagga.com/birthday-planner-bangalore' }, { '@type': 'ListItem', position: 3, name: 'Birthday Planner Bellandur', item: 'https://www.eevagga.com/birthday-planner-bellandur' }] };
const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [{ '@type': 'Question', name: 'Does Eevagga offer birthday planning in Bellandur?', acceptedAnswer: { '@type': 'Answer', text: 'Yes! Eevagga serves Bellandur, Kadubeesanahalli, Outer Ring Road corridors and surrounding areas with full end-to-end birthday planning.' } }, { '@type': 'Question', name: 'What venues are popular for birthday parties in Bellandur?', acceptedAnswer: { '@type': 'Answer', text: 'Popular Bellandur birthday venues include gated community clubhouses in Sobha Daffodil, Mantri Espana and Salarpuria Sattva, hotel banquet halls on Outer Ring Road and home party setups.' } }, { '@type': 'Question', name: 'How much does a birthday party in Bellandur cost?', acceptedAnswer: { '@type': 'Answer', text: 'Birthday parties in Bellandur start from ₹15,000 for home décor setups to ₹1,50,000+ for luxury venue celebrations. Eevagga has packages for all budgets.' } }, { '@type': 'Question', name: 'Does Eevagga plan birthday parties in Bellandur gated communities?', acceptedAnswer: { '@type': 'Answer', text: 'Absolutely! We regularly plan birthday parties in Bellandur gated communities — coordinating clubhouse bookings and full decoration at Sobha Daffodil, Mantri Espana and many more.' } }] };

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
  title: 'Birthday Planner Bellandur', badge: 'Serving Bellandur & Kadubeesanahalli',
  h1: 'Birthday Planner in Bellandur, Bangalore — Premium Celebrations by Eevagga',
  heroSubtitle: 'Celebrate in style across Bellandur, Kadubeesanahalli and Outer Ring Road. From gated community clubhouses to home parties — Eevagga delivers premium themes, décor and photography.',
  heroImage: '/service-pages/birthday-hero.png', heroImageAlt: 'Birthday party decoration in Bellandur Bangalore by Eevagga',
  stats: [{ value: '85+', label: 'Bellandur Events' }, { value: '4.9★', label: 'Average Rating' }, { value: '22+', label: 'Themes Available' }, { value: '100%', label: 'Local Coverage' }],
  breadcrumbs: [{ label: 'Home', href: '/' }, { label: 'Birthday Planner Bangalore', href: '/birthday-planner-bangalore' }, { label: 'Birthday Planner Bellandur' }],
  gallery: [{ src: '/service-pages/birthday-hero.png', alt: 'Birthday party decoration Bellandur Bangalore', caption: 'Bellandur Setup' }, { src: '/service-pages/birthday-gallery-1.png', alt: 'Clubhouse birthday Bellandur', caption: 'Clubhouse Party' }, { src: '/service-pages/birthday-gallery-2.png', alt: 'Birthday cake table Bellandur', caption: 'Dessert Table' }, { src: '/service-pages/birthday-gallery-3.png', alt: 'Stage setup birthday Bellandur', caption: 'Stage Setup' }, { src: '/service-pages/birthday-gallery-4.png', alt: 'Balloon arch birthday Bellandur', caption: 'Balloon Arch' }],
  features: [
    { icon: '📍', title: 'Local Bellandur Coverage', description: 'We serve Bellandur, Kadubeesanahalli, Marathahalli and Outer Ring Road areas with efficient local deployment.' },
    { icon: '🏘️', title: 'Gated Community Expertise', description: 'Experienced with Sobha Daffodil, Mantri Espana, Salarpuria Sattva clubhouses and all major Bellandur communities.' },
    { icon: '🎨', title: 'Theme Design & Décor', description: 'Full theme design from concept to execution — any character, colour or style perfectly brought to life.' },
    { icon: '📸', title: 'Photography Team', description: 'Professional photographers available across Bellandur and East Bangalore.' },
    { icon: '🎤', title: 'Entertainment Coordination', description: 'DJs, magicians and emcees for Bellandur birthday events.' },
    { icon: '🚀', title: 'Fast Setup & Teardown', description: 'Setup in 3–4 hours, complete teardown within 2 hours post-event.' },
  ],
};

export default function BirthdayPlannerBellandurPage() {
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