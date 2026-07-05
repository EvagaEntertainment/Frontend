import { Suspense } from 'react';
import { ogImages } from '../_seo';
import ServiceLandingPage from '../../components/ServiceLandingPage/ServiceLandingPage';

export const metadata = {
  title: { absolute: "Birthday Planner Sarjapur — Eevagga" },
  description: 'Looking for a birthday planner in Sarjapur, Bangalore? Eevagga offers end-to-end birthday planning in Sarjapur Road — themes, décor, photography, venues & catering. Book today.',
  keywords: 'birthday planner Sarjapur, birthday party planner Sarjapur Road Bangalore, birthday decoration Sarjapur, birthday planning Sarjapur Bangalore',
  alternates: { canonical: 'https://www.eevagga.com/birthday-planner-sarjapur' },
  openGraph: { title: 'Birthday Planner Sarjapur | Local Party Planners — Eevagga', description: 'End-to-end birthday planning in Sarjapur, Bangalore. Themes, décor, photography & venue coordination by Eevagga.', url: 'https://www.eevagga.com/birthday-planner-sarjapur', siteName: 'Eevagga', type: 'website', images: ogImages },
  twitter: { card: 'summary_large_image', title: 'Birthday Planner Sarjapur Bangalore — Eevagga', description: 'Expert birthday planners in Sarjapur, Bangalore. Full end-to-end planning.' },
};

const serviceSchema = { '@context': 'https://schema.org', '@type': 'Service', '@id': 'https://www.eevagga.com/birthday-planner-sarjapur#service', name: 'Birthday Planner in Sarjapur, Bangalore', description: 'Full-service birthday planning in Sarjapur, Bangalore. Covers Sarjapur Road, Carmelaram, Attibele and surrounding areas with theme decoration, venue coordination, photography and on-ground management.', provider: { '@id': 'https://www.eevagga.com/#organization' }, serviceType: 'Birthday Party Planning', areaServed: { '@type': 'Place', name: 'Sarjapur, Bangalore' }, url: 'https://www.eevagga.com/birthday-planner-sarjapur', offers: { '@type': 'AggregateOffer', priceCurrency: 'INR', lowPrice: 15000, highPrice: 150000, offerCount: 3 } };
const localBusinessSchema = { '@context': 'https://schema.org', '@type': 'LocalBusiness', name: 'Eevagga — Birthday Planner Sarjapur', url: 'https://www.eevagga.com/birthday-planner-sarjapur', telephone: '+918050279101', address: { '@type': 'PostalAddress', addressLocality: 'Sarjapur', addressRegion: 'Bangalore', addressCountry: 'IN' }, areaServed: { '@type': 'Place', name: 'Sarjapur, Bangalore' }, priceRange: '₹₹–₹₹₹' };
const breadcrumbSchema = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.eevagga.com' }, { '@type': 'ListItem', position: 2, name: 'Birthday Planner Bangalore', item: 'https://www.eevagga.com/birthday-planner-bangalore' }, { '@type': 'ListItem', position: 3, name: 'Birthday Planner Sarjapur', item: 'https://www.eevagga.com/birthday-planner-sarjapur' }] };
const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [{ '@type': 'Question', name: 'Does Eevagga offer birthday planning in Sarjapur?', acceptedAnswer: { '@type': 'Answer', text: 'Yes! Eevagga is a trusted birthday planner in Sarjapur, Bangalore. We serve Sarjapur Road, Carmelaram, Attibele and surrounding areas with full end-to-end birthday planning.' } }, { '@type': 'Question', name: 'Which venues does Eevagga recommend in Sarjapur?', acceptedAnswer: { '@type': 'Answer', text: 'Sarjapur has great birthday venue options including gated community clubhouses in Brigade Meadows, Sobha City and Prestige Oaks, farmhouse venues on Sarjapur Road and garden spaces. Eevagga coordinates all bookings and decoration.' } }, { '@type': 'Question', name: 'How much does a birthday party cost in Sarjapur?', acceptedAnswer: { '@type': 'Answer', text: 'Birthday parties in Sarjapur start from ₹15,000 for home décor setups to ₹1,50,000+ for luxury venue celebrations. We offer packages for all budgets and guest counts.' } }, { '@type': 'Question', name: 'Does Eevagga plan birthday parties in gated communities in Sarjapur?', acceptedAnswer: { '@type': 'Answer', text: 'Absolutely! We regularly plan birthday parties in gated communities across Sarjapur Road — including clubhouse setups in Brigade Meadows, Sobha City and Prestige Oaks. We coordinate venue booking and complete decoration.' } }] };

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
  title: 'Birthday Planner Sarjapur',
  badge: 'Serving Sarjapur Road & Carmelaram',
  h1: 'Birthday Planner in Sarjapur, Bangalore — Premium Celebrations by Eevagga',
  heroSubtitle: 'Celebrate in style across Sarjapur Road, Carmelaram and Attibele. From gated community clubhouses to garden venues — Eevagga\'s local team delivers premium themes, décor and photography.',
  heroImage: '/service-pages/birthday-hero.png',
  heroImageAlt: 'Birthday party decoration in Sarjapur Bangalore by Eevagga',
  stats: [{ value: '90+', label: 'Sarjapur Events' }, { value: '4.9★', label: 'Average Rating' }, { value: '22+', label: 'Themes Available' }, { value: '100%', label: 'Local Coverage' }],
  breadcrumbs: [{ label: 'Home', href: '/' }, { label: 'Birthday Planner Bangalore', href: '/birthday-planner-bangalore' }, { label: 'Birthday Planner Sarjapur' }],
  gallery: [
    { src: '/service-pages/birthday-hero.png', alt: 'Birthday party decoration Sarjapur Bangalore', caption: 'Sarjapur Setup' },
    { src: '/service-pages/birthday-gallery-1.png', alt: 'Clubhouse birthday party Sarjapur', caption: 'Clubhouse Party' },
    { src: '/service-pages/birthday-gallery-2.png', alt: 'Birthday cake table Sarjapur Bangalore', caption: 'Dessert Table' },
    { src: '/service-pages/birthday-gallery-3.png', alt: 'Stage setup birthday Sarjapur', caption: 'Stage Setup' },
    { src: '/service-pages/birthday-gallery-4.png', alt: 'Garden birthday party Sarjapur', caption: 'Garden Party' },
  ],
  features: [
    { icon: '📍', title: 'Local Sarjapur Coverage', description: 'We serve Sarjapur Road, Carmelaram, Attibele and surrounding areas with efficient local deployment.' },
    { icon: '🏘️', title: 'Gated Community Clubhouses', description: 'Experienced with clubhouse setups in Brigade Meadows, Sobha City, Prestige Oaks and all major Sarjapur Road communities.' },
    { icon: '🌿', title: 'Garden & Farmhouse Venues', description: 'Sarjapur Road\'s spacious garden and farmhouse venues decorated for beautiful outdoor birthday celebrations.' },
    { icon: '🎨', title: 'Theme Design & Décor', description: 'Full theme design from concept to execution — any character, colour or style perfectly brought to life.' },
    { icon: '📸', title: 'Photography Team', description: 'Professional photographers experienced with Sarjapur Road venues and settings.' },
    { icon: '🚀', title: 'Fast Setup & Teardown', description: 'Setup in 3–4 hours, complete teardown within 2 hours post-event.' },
  ],
  pricing: [
    { name: 'Starter', subtitle: 'Perfect for intimate Sarjapur parties', price: 15000, featured: false, includes: ['Theme consultation', 'Balloon & basic décor setup', 'Birthday backdrop & signage', 'Cleanup & support', 'Up to 30 guests'] },
    { name: 'Premium', subtitle: 'Most popular in Sarjapur', price: 35000, featured: true, includes: ['Full theme design & execution', 'Premium balloon & floral décor', 'Stage setup & backdrop', 'Photography (2 hours)', 'Entertainment coordination', 'Up to 75 guests'] },
    { name: 'Luxury', subtitle: 'Grand Sarjapur celebration', price: 65000, featured: false, includes: ['Bespoke theme & full styling', 'Luxury floral & prop installations', 'Full-day photography + video', 'Live entertainment / DJ', 'Catering coordination', '100+ guests'] },
  ],
  faqs: [
    { question: 'Does Eevagga plan birthday parties in Sarjapur?', answer: 'Yes! We serve Sarjapur Road, Carmelaram and Attibele with full end-to-end birthday planning.' },
    { question: 'What venues does Eevagga recommend in Sarjapur?', answer: 'Gated community clubhouses in Brigade Meadows, Sobha City, Prestige Oaks, farmhouse venues and garden spaces on Sarjapur Road.' },
    { question: 'How much does a birthday party in Sarjapur cost?', answer: 'Parties start from ₹15,000 for at-home setups to ₹1,50,000+ for luxury venue celebrations. Eevagga has packages for all budgets.' },
    { question: 'Does Eevagga plan gated community birthday parties in Sarjapur?', answer: 'Yes! We regularly plan birthdays in Brigade Meadows, Sobha City and Prestige Oaks clubhouses — coordinating venue booking and full decoration.' },
    { question: 'Does Eevagga cover Bellandur and HSR from Sarjapur?', answer: 'Yes! Our South-East Bangalore team covers Sarjapur, Bellandur, HSR Layout and Carmelaram for seamless birthday planning.' },
  ],
};

export default function BirthdayPlannerSarpurPage() {
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
