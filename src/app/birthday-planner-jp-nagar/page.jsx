import { Suspense } from 'react';
import { ogImages } from '../_seo';
import ServiceLandingPage from '../../components/ServiceLandingPage/ServiceLandingPage';

export const metadata = {
  title: 'Birthday Planner JP Nagar | Local Party Planners — Eevagga',
  description: 'Looking for a birthday planner in JP Nagar, Bangalore? Eevagga offers end-to-end birthday planning in JP Nagar — themes, décor, photography, venues & catering. Book today.',
  keywords: 'birthday planner JP Nagar, birthday party planner JP Nagar Bangalore, birthday decoration JP Nagar, birthday planning JP Nagar Bangalore, birthday organiser JP Nagar',
  alternates: { canonical: 'https://www.eevagga.com/birthday-planner-jp-nagar' },
  openGraph: { title: 'Birthday Planner JP Nagar | Local Party Planners — Eevagga', description: 'End-to-end birthday planning in JP Nagar, Bangalore. Themes, décor, photography & venue coordination by Eevagga.', url: 'https://www.eevagga.com/birthday-planner-jp-nagar', siteName: 'Eevagga', type: 'website', images: ogImages },
  twitter: { card: 'summary_large_image', title: 'Birthday Planner JP Nagar Bangalore — Eevagga', description: 'Expert birthday planners in JP Nagar, Bangalore. Full end-to-end planning.' },
};

const serviceSchema = { '@context': 'https://schema.org', '@type': 'Service', '@id': 'https://www.eevagga.com/birthday-planner-jp-nagar#service', name: 'Birthday Planner in JP Nagar, Bangalore', description: 'Full-service birthday planning in JP Nagar, Bangalore. Covers all phases of JP Nagar, Jayanagar, BTM Layout and surrounding South Bangalore areas with theme decoration, venue coordination and photography.', provider: { '@id': 'https://www.eevagga.com/#organization' }, serviceType: 'Birthday Party Planning', areaServed: { '@type': 'Place', name: 'JP Nagar, Bangalore' }, url: 'https://www.eevagga.com/birthday-planner-jp-nagar', offers: { '@type': 'AggregateOffer', priceCurrency: 'INR', lowPrice: '15000', highPrice: '150000', offerCount: '3' } };
const localBusinessSchema = { '@context': 'https://schema.org', '@type': 'LocalBusiness', name: 'Eevagga — Birthday Planner JP Nagar', url: 'https://www.eevagga.com/birthday-planner-jp-nagar', telephone: '+918050279101', address: { '@type': 'PostalAddress', addressLocality: 'JP Nagar', addressRegion: 'Bangalore', addressCountry: 'IN' }, areaServed: { '@type': 'Place', name: 'JP Nagar, Bangalore' }, priceRange: '₹₹–₹₹₹' };
const breadcrumbSchema = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.eevagga.com' }, { '@type': 'ListItem', position: 2, name: 'Birthday Planner Bangalore', item: 'https://www.eevagga.com/birthday-planner-bangalore' }, { '@type': 'ListItem', position: 3, name: 'Birthday Planner JP Nagar', item: 'https://www.eevagga.com/birthday-planner-jp-nagar' }] };
const faqSchema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [{ '@type': 'Question', name: 'Does Eevagga offer birthday planning in JP Nagar?', acceptedAnswer: { '@type': 'Answer', text: 'Yes! Eevagga is a trusted birthday planner in JP Nagar, Bangalore. We serve all phases of JP Nagar, Jayanagar, BTM Layout and surrounding South Bangalore areas with full end-to-end birthday planning.' } }, { '@type': 'Question', name: 'Which venues does Eevagga recommend in JP Nagar for birthday parties?', acceptedAnswer: { '@type': 'Answer', text: 'JP Nagar has excellent birthday venues including banquet halls on JP Nagar 7th Phase, community halls, restaurant private dining rooms near Jayanagar Shopping Complex and garden spaces. Eevagga coordinates all bookings and decoration.' } }, { '@type': 'Question', name: 'How much does a birthday party cost in JP Nagar?', acceptedAnswer: { '@type': 'Answer', text: 'Birthday parties in JP Nagar start from ₹15,000 for home décor setups to ₹1,50,000+ for luxury venue celebrations. Eevagga has packages for all budgets and guest counts.' } }, { '@type': 'Question', name: 'Does Eevagga also serve Jayanagar and BTM Layout from JP Nagar?', acceptedAnswer: { '@type': 'Answer', text: 'Yes! Our South Bangalore team covers JP Nagar all phases, Jayanagar, BTM Layout and Banashankari for seamless birthday planning.' } }] };

const pageConfig = {
  title: 'Birthday Planner JP Nagar', badge: 'Serving JP Nagar & Jayanagar',
  h1: 'Birthday Planner in JP Nagar, Bangalore — Premium Celebrations by Eevagga',
  heroSubtitle: 'Celebrate in style across all phases of JP Nagar, Jayanagar, BTM Layout and South Bangalore. Eevagga\'s local team delivers premium themes, venue coordination, décor and photography.',
  heroImage: '/service-pages/birthday-hero.png', heroImageAlt: 'Birthday party decoration in JP Nagar Bangalore by Eevagga',
  stats: [{ value: '95+', label: 'JP Nagar Events' }, { value: '4.9★', label: 'Average Rating' }, { value: '22+', label: 'Themes Available' }, { value: '100%', label: 'South BLR Coverage' }],
  breadcrumbs: [{ label: 'Home', href: '/' }, { label: 'Birthday Planner Bangalore', href: '/birthday-planner-bangalore' }, { label: 'Birthday Planner JP Nagar' }],
  gallery: [{ src: '/service-pages/birthday-hero.png', alt: 'Birthday party decoration JP Nagar Bangalore', caption: 'JP Nagar Setup' }, { src: '/service-pages/birthday-gallery-1.png', alt: 'Home birthday party JP Nagar Bangalore', caption: 'Home Party' }, { src: '/service-pages/birthday-gallery-2.png', alt: 'Birthday cake table JP Nagar Bangalore', caption: 'Dessert Table' }, { src: '/service-pages/birthday-gallery-3.png', alt: 'Stage setup birthday JP Nagar Bangalore', caption: 'Stage Setup' }, { src: '/service-pages/birthday-gallery-4.png', alt: 'Balloon arch birthday JP Nagar', caption: 'Balloon Arch' }],
  features: [
    { icon: '📍', title: 'Local JP Nagar Coverage', description: 'We serve all phases of JP Nagar, Jayanagar, BTM Layout and Banashankari with efficient local deployment.' },
    { icon: '🏛️', title: 'Banquet Halls & Venues', description: 'Banquet halls across JP Nagar phases, community halls and restaurant private dining rooms coordinated by Eevagga.' },
    { icon: '🎨', title: 'Theme Design & Décor', description: 'Full theme design from concept to execution — any character, colour or style perfectly brought to life.' },
    { icon: '📸', title: 'Photography Team', description: 'Professional photographers available across JP Nagar and South Bangalore areas.' },
    { icon: '🎤', title: 'Entertainment Coordination', description: 'Magicians, DJs, emcees and performers for JP Nagar birthday events.' },
    { icon: '🚀', title: 'Fast Setup & Teardown', description: 'Setup in 3–4 hours, complete teardown within 2 hours post-event.' },
  ],
  pricing: [{ name: 'Starter', subtitle: 'Perfect for intimate JP Nagar parties', price: 15000, featured: false, includes: ['Theme consultation', 'Balloon & basic décor setup', 'Birthday backdrop & signage', 'Cleanup & support', 'Up to 30 guests'] }, { name: 'Premium', subtitle: 'Most popular in JP Nagar', price: 35000, featured: true, includes: ['Full theme design & execution', 'Premium balloon & floral décor', 'Stage setup & backdrop', 'Photography (2 hours)', 'Entertainment coordination', 'Up to 75 guests'] }, { name: 'Luxury', subtitle: 'Grand JP Nagar celebration', price: 65000, featured: false, includes: ['Bespoke theme & full styling', 'Luxury floral & prop installations', 'Full-day photography + video', 'Live entertainment / DJ', 'Catering coordination', '100+ guests'] }],
  faqs: [
    { question: 'Does Eevagga plan birthday parties in JP Nagar?', answer: 'Yes! We are active birthday planners in JP Nagar serving all phases, Jayanagar, BTM Layout and Banashankari with full end-to-end birthday planning.' },
    { question: 'What venues does Eevagga recommend in JP Nagar?', answer: 'Banquet halls on JP Nagar 7th Phase, community halls, restaurant private dining rooms near Jayanagar and garden spaces — all coordinated by Eevagga.' },
    { question: 'How much does a birthday party in JP Nagar cost?', answer: 'Parties start from ₹15,000 for at-home setups to ₹1,50,000+ for luxury venue celebrations. Eevagga has packages for all budgets.' },
    { question: 'Does Eevagga serve Jayanagar and BTM Layout from JP Nagar?', answer: 'Yes! Our South Bangalore team covers JP Nagar all phases, Jayanagar, BTM Layout and Banashankari for seamless birthday planning.' },
    { question: 'How quickly can Eevagga set up in JP Nagar?', answer: 'Our local team can set up in 3–4 hours on event day. Overnight setups are also available for early morning events.' },
  ],
};

export default function BirthdayPlannerJPNagarPage() {
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
