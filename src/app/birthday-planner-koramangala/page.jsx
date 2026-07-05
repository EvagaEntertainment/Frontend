import { Suspense } from 'react';
import { ogImages } from '../_seo';
import ServiceLandingPage from '../../components/ServiceLandingPage/ServiceLandingPage';

export const metadata = {
  title: { absolute: "Birthday Planner Koramangala — Eevagga" },
  description: 'Looking for a birthday planner in Koramangala, Bangalore? Eevagga offers end-to-end birthday planning in Koramangala — themes, décor, photography, venues & catering. Book today.',
  keywords: 'birthday planner Koramangala, birthday party planner Koramangala Bangalore, birthday decoration Koramangala, birthday planning Koramangala Bangalore',
  alternates: { canonical: 'https://www.eevagga.com/birthday-planner-koramangala' },
  openGraph: {
    title: 'Birthday Planner Koramangala | Local Party Planners — Eevagga',
    description: 'End-to-end birthday planning in Koramangala, Bangalore. Themes, décor, photography & venue coordination by Eevagga.',
    url: 'https://www.eevagga.com/birthday-planner-koramangala', siteName: 'Eevagga', type: 'website', images: ogImages,
  },
  twitter: { card: 'summary_large_image', title: 'Birthday Planner Koramangala Bangalore — Eevagga', description: 'Expert birthday planners in Koramangala, Bangalore. Full end-to-end planning.' },
};

const serviceSchema = {
  '@context': 'https://schema.org', '@type': 'Service',
  '@id': 'https://www.eevagga.com/birthday-planner-koramangala#service',
  name: 'Birthday Planner in Koramangala, Bangalore',
  description: 'Full-service birthday planning in Koramangala, Bangalore. Covers all blocks of Koramangala, BTM Layout, Ejipura and surrounding areas with premium theme decoration, venue coordination, photography and on-ground management.',
  provider: { '@id': 'https://www.eevagga.com/#organization' },
  serviceType: 'Birthday Party Planning',
  areaServed: { '@type': 'Place', name: 'Koramangala, Bangalore' },
  url: 'https://www.eevagga.com/birthday-planner-koramangala',
  offers: { '@type': 'AggregateOffer', priceCurrency: 'INR', lowPrice: 15000, highPrice: 150000, offerCount: 3 },
};

const localBusinessSchema = {
  '@context': 'https://schema.org', '@type': 'LocalBusiness', name: 'Eevagga — Birthday Planner Koramangala',
  description: 'Expert birthday planners serving Koramangala and surrounding South Bangalore areas.',
  url: 'https://www.eevagga.com/birthday-planner-koramangala', telephone: '+918050279101',
  address: { '@type': 'PostalAddress', addressLocality: 'Koramangala', addressRegion: 'Bangalore', addressCountry: 'IN' },
  areaServed: { '@type': 'Place', name: 'Koramangala, Bangalore' }, priceRange: '₹₹–₹₹₹',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.eevagga.com' },
    { '@type': 'ListItem', position: 2, name: 'Birthday Planner Bangalore', item: 'https://www.eevagga.com/birthday-planner-bangalore' },
    { '@type': 'ListItem', position: 3, name: 'Birthday Planner Koramangala', item: 'https://www.eevagga.com/birthday-planner-koramangala' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Does Eevagga offer birthday planning in Koramangala?', acceptedAnswer: { '@type': 'Answer', text: 'Yes! Eevagga is a trusted birthday planner in Koramangala, Bangalore. We serve all blocks of Koramangala, BTM Layout, Ejipura and surrounding areas with full end-to-end birthday planning.' } },
    { '@type': 'Question', name: 'Which venues does Eevagga recommend in Koramangala?', acceptedAnswer: { '@type': 'Answer', text: 'Koramangala has excellent birthday venues including restaurant private dining rooms on 80 Feet Road, banquet halls on Koramangala 5th Block, rooftop venues and home party options. Eevagga coordinates venue booking and full decoration.' } },
    { '@type': 'Question', name: 'How much does a birthday party in Koramangala cost?', acceptedAnswer: { '@type': 'Answer', text: 'Birthday parties in Koramangala start from ₹15,000 for at-home setups to ₹1,50,000+ for luxury venue celebrations. We offer packages for all budgets and guest counts.' } },
    { '@type': 'Question', name: 'Can Eevagga plan a rooftop birthday party in Koramangala?', acceptedAnswer: { '@type': 'Answer', text: 'Yes! Koramangala has some of Bangalore\'s best rooftop venues. Eevagga coordinates rooftop birthday setups with evening lighting, theme décor and entertainment — a premium experience for adult celebrations.' } },
  ],
};

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
      "label": "Birthday Planner Indiranagar",
      "href": "/birthday-planner-indiranagar"
    },
    {
      "label": "Birthday Planner Sarjapur",
      "href": "/birthday-planner-sarjapur"
    }
  ],
  title: 'Birthday Planner Koramangala',
  badge: 'Serving Koramangala & BTM Layout',
  h1: 'Birthday Planner in Koramangala, Bangalore — Premium Celebrations by Eevagga',
  heroSubtitle: 'Celebrate in style across Koramangala, BTM Layout and Ejipura. From rooftop parties to home celebrations — Eevagga\'s local team delivers premium themes, décor and photography, fully managed.',
  heroImage: '/service-pages/birthday-hero.png',
  heroImageAlt: 'Birthday party decoration in Koramangala Bangalore by Eevagga',
  stats: [
    { value: '120+', label: 'Koramangala Events' },
    { value: '4.9★', label: 'Average Rating' },
    { value: '22+', label: 'Themes Available' },
    { value: '100%', label: 'Local Coverage' },
  ],
  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'Birthday Planner Bangalore', href: '/birthday-planner-bangalore' },
    { label: 'Birthday Planner Koramangala' },
  ],
  gallery: [
    { src: '/service-pages/birthday-hero.png', alt: 'Birthday party decoration Koramangala Bangalore', caption: 'Koramangala Setup' },
    { src: '/service-pages/birthday-gallery-1.png', alt: 'Rooftop birthday party Koramangala', caption: 'Rooftop Party' },
    { src: '/service-pages/birthday-gallery-2.png', alt: 'Birthday cake table Koramangala Bangalore', caption: 'Dessert Table' },
    { src: '/service-pages/birthday-gallery-3.png', alt: 'Stage setup birthday Koramangala Bangalore', caption: 'Stage Setup' },
    { src: '/service-pages/birthday-gallery-4.png', alt: 'Balloon arch birthday Koramangala', caption: 'Balloon Arch' },
  ],
  features: [
    { icon: '📍', title: 'Local Koramangala Coverage', description: 'We serve all blocks of Koramangala, BTM Layout, Ejipura and surrounding areas with efficient local deployment.' },
    { icon: '🏙️', title: 'Rooftop & Restaurant Venues', description: 'Koramangala-specific rooftop venues and restaurant private rooms — perfect for sophisticated adult birthday events.' },
    { icon: '🎨', title: 'Theme Design & Décor', description: 'Full theme design from concept to execution — any character, colour or style perfectly brought to life in Koramangala.' },
    { icon: '📸', title: 'Photography Team', description: 'Professional photographers experienced with Koramangala venues and lighting conditions.' },
    { icon: '🎤', title: 'Entertainment Coordination', description: 'DJs, live performers and emcees coordinated for Koramangala birthday events — for all age groups.' },
    { icon: '🚀', title: 'Fast Setup & Teardown', description: 'Setup in 3–4 hours, complete teardown within 2 hours — stress-free for you and your guests.' },
  ],
  pricing: [
    { name: 'Starter', subtitle: 'Perfect for intimate Koramangala parties', price: 15000, featured: false, includes: ['Theme consultation', 'Balloon & basic décor setup', 'Birthday backdrop & signage', 'Cleanup & support', 'Up to 30 guests'] },
    { name: 'Premium', subtitle: 'Most popular in Koramangala', price: 35000, featured: true, includes: ['Full theme design & execution', 'Premium balloon & floral décor', 'Stage setup & backdrop', 'Photography (2 hours)', 'Entertainment coordination', 'Up to 75 guests'] },
    { name: 'Luxury', subtitle: 'Grand Koramangala celebration', price: 65000, featured: false, includes: ['Bespoke theme & full styling', 'Luxury floral & prop installations', 'Full-day photography + video', 'Live entertainment / DJ', 'Catering coordination', '100+ guests'] },
  ],
  faqs: [
    { question: 'Does Eevagga plan birthday parties in Koramangala?', answer: 'Yes! We are active birthday planners in Koramangala serving all blocks, BTM Layout and Ejipura with full end-to-end birthday planning.' },
    { question: 'What venues does Eevagga recommend in Koramangala?', answer: 'Options include restaurant private dining rooms on 80 Feet Road, banquet halls on 5th Block, rooftop venues and home party setups — all coordinated by Eevagga.' },
    { question: 'How much does a birthday party in Koramangala cost?', answer: 'Parties start from ₹15,000 for at-home setups to ₹1,50,000+ for luxury venue celebrations. Eevagga has packages for all budgets.' },
    { question: 'Can Eevagga plan a rooftop birthday in Koramangala?', answer: 'Yes! Koramangala has some of Bangalore\'s best rooftop venues. We set up evening lighting, theme décor and entertainment for a premium rooftop experience.' },
    { question: 'Does Eevagga also serve Indiranagar from Koramangala?', answer: 'Yes! Our South Bangalore team covers Koramangala, Indiranagar, HSR Layout and surrounding areas for seamless birthday planning.' },
  ],
};

export default function BirthdayPlannerKoramangalaPage() {
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
