import { Suspense } from 'react';
import { ogImages } from '../_seo';
import ServiceLandingPage from '../../components/ServiceLandingPage/ServiceLandingPage';

export const metadata = {
  title: { absolute: "Birthday Planner Indiranagar — Eevagga" },
  description: 'Looking for a birthday planner in Indiranagar, Bangalore? Eevagga offers end-to-end birthday planning in Indiranagar — themes, décor, photography, venues & catering. Book today.',
  keywords: 'birthday planner Indiranagar, birthday party planner Indiranagar Bangalore, birthday decoration Indiranagar, birthday planning Indiranagar Bangalore',
  alternates: { canonical: 'https://www.eevagga.com/birthday-planner-indiranagar' },
  openGraph: {
    title: 'Birthday Planner Indiranagar | Local Party Planners — Eevagga',
    description: 'End-to-end birthday planning in Indiranagar, Bangalore. Themes, décor, photography & venue coordination by Eevagga.',
    url: 'https://www.eevagga.com/birthday-planner-indiranagar', siteName: 'Eevagga', type: 'website', images: ogImages,
  },
  twitter: { card: 'summary_large_image', title: 'Birthday Planner Indiranagar Bangalore — Eevagga', description: 'Expert birthday planners in Indiranagar, Bangalore. Full end-to-end planning.' },
};

const serviceSchema = { '@context': 'https://schema.org', '@type': 'Service', '@id': 'https://www.eevagga.com/birthday-planner-indiranagar#service', name: 'Birthday Planner in Indiranagar, Bangalore', description: 'Full-service birthday planning in Indiranagar, Bangalore. Covers 100 Feet Road, CMH Road, Domlur and surrounding areas with theme decoration, venue coordination, photography and on-ground management.', provider: { '@id': 'https://www.eevagga.com/#organization' }, serviceType: 'Birthday Party Planning', areaServed: { '@type': 'Place', name: 'Indiranagar, Bangalore' }, url: 'https://www.eevagga.com/birthday-planner-indiranagar', offers: { '@type': 'AggregateOffer', priceCurrency: 'INR', lowPrice: 15000, highPrice: 150000, offerCount: 3 } };
const localBusinessSchema = { '@context': 'https://schema.org', '@type': 'LocalBusiness', name: 'Eevagga — Birthday Planner Indiranagar', url: 'https://www.eevagga.com/birthday-planner-indiranagar', telephone: '+918050279101', address: { '@type': 'PostalAddress', addressLocality: 'Indiranagar', addressRegion: 'Bangalore', addressCountry: 'IN' }, areaServed: { '@type': 'Place', name: 'Indiranagar, Bangalore' }, priceRange: '₹₹–₹₹₹' };
const breadcrumbSchema = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.eevagga.com' }, { '@type': 'ListItem', position: 2, name: 'Birthday Planner Bangalore', item: 'https://www.eevagga.com/birthday-planner-bangalore' }, { '@type': 'ListItem', position: 3, name: 'Birthday Planner Indiranagar', item: 'https://www.eevagga.com/birthday-planner-indiranagar' }] };
const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [{ '@type': 'Question', name: 'Does Eevagga offer birthday planning in Indiranagar?', acceptedAnswer: { '@type': 'Answer', text: 'Yes! Eevagga is a trusted birthday planner in Indiranagar serving 100 Feet Road, CMH Road, Domlur and surrounding areas with full end-to-end birthday planning.' } }, { '@type': 'Question', name: 'Which venues does Eevagga recommend in Indiranagar?', acceptedAnswer: { '@type': 'Answer', text: 'Indiranagar has vibrant birthday venue options including restaurant private dining rooms on 100 Feet Road, rooftop venues on CMH Road, banquet halls and home party setups. Eevagga coordinates all venue bookings and full decoration.' } }, { '@type': 'Question', name: 'How much does a birthday party in Indiranagar cost?', acceptedAnswer: { '@type': 'Answer', text: 'Birthday parties in Indiranagar start from ₹15,000 for home décor setups to ₹1,50,000+ for luxury venue celebrations. We offer packages for all budgets.' } }, { '@type': 'Question', name: 'Can Eevagga plan restaurant birthday parties in Indiranagar?', acceptedAnswer: { '@type': 'Answer', text: 'Absolutely! Indiranagar has some of Bangalore\'s finest restaurants with private dining rooms. Eevagga coordinates restaurant venue bookings and adds custom birthday decorations for a truly special dining celebration.' } }] };

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
      "label": "Birthday Planner Sarjapur",
      "href": "/birthday-planner-sarjapur"
    }
  ],
  title: 'Birthday Planner Indiranagar',
  badge: 'Serving Indiranagar & CMH Road',
  h1: 'Birthday Planner in Indiranagar, Bangalore — Stylish Celebrations by Eevagga',
  heroSubtitle: 'Celebrate in style across 100 Feet Road, CMH Road, Domlur and Indiranagar. From restaurant dinners to home parties — Eevagga\'s local team delivers premium themes, décor and photography.',
  heroImage: '/service-pages/birthday-hero.png',
  heroImageAlt: 'Birthday party decoration in Indiranagar Bangalore by Eevagga',
  stats: [{ value: '110+', label: 'Indiranagar Events' }, { value: '4.9★', label: 'Average Rating' }, { value: '22+', label: 'Themes Available' }, { value: '100%', label: 'Local Coverage' }],
  breadcrumbs: [{ label: 'Home', href: '/' }, { label: 'Birthday Planner Bangalore', href: '/birthday-planner-bangalore' }, { label: 'Birthday Planner Indiranagar' }],
  gallery: [
    { src: '/service-pages/birthday-hero.png', alt: 'Birthday party decoration Indiranagar Bangalore', caption: 'Indiranagar Setup' },
    { src: '/service-pages/birthday-gallery-1.png', alt: 'Restaurant birthday party Indiranagar', caption: 'Restaurant Party' },
    { src: '/service-pages/birthday-gallery-2.png', alt: 'Birthday cake table Indiranagar Bangalore', caption: 'Dessert Table' },
    { src: '/service-pages/birthday-gallery-3.png', alt: 'Stage setup birthday Indiranagar', caption: 'Stage Setup' },
    { src: '/service-pages/birthday-gallery-4.png', alt: 'Balloon arch birthday Indiranagar', caption: 'Balloon Arch' },
  ],
  features: [
    { icon: '📍', title: 'Local Indiranagar Coverage', description: 'We serve 100 Feet Road, CMH Road, Domlur and surrounding areas with efficient local deployment.' },
    { icon: '🍽️', title: 'Restaurant Private Dining', description: 'Coordinate restaurant birthday dinners on Indiranagar\'s vibrant 100 Feet Road with custom décor.' },
    { icon: '🏙️', title: 'Rooftop & Lounge Setups', description: 'Indiranagar\'s trendy rooftop venues and lounges transformed for stylish birthday celebrations.' },
    { icon: '🎨', title: 'Theme Design & Décor', description: 'Full theme design from concept to execution — any character, colour or style perfectly executed.' },
    { icon: '📸', title: 'Photography Team', description: 'Professional photographers experienced with Indiranagar venues and vibrant settings.' },
    { icon: '🎤', title: 'Entertainment Coordination', description: 'DJs, live performers and emcees for Indiranagar birthday events — for all age groups.' },
  ],
};

export default function BirthdayPlannerIndirangarPage() {
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