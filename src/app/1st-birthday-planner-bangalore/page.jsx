import { Suspense } from 'react';
import { ogImages } from '../_seo';
import ServiceLandingPage from '../../components/ServiceLandingPage/ServiceLandingPage';

/* ─── SEO Metadata ─────────────────────────────────────────────────────── */
export const metadata = {
  title: { absolute: "1st Birthday Planner Bangalore — Eevagga" },
  description:
    'Plan your baby\'s first birthday in Bangalore with Eevagga. Smash cake setups, milestone balloon décor, half-saree ceremony coordination & full first birthday planning. Book today.',
  keywords:
    '1st birthday planner Bangalore, first birthday planner Bangalore, 1st birthday decoration Bangalore, first birthday party Bangalore, baby first birthday Bangalore, smash cake Bangalore',
  alternates: {
    canonical: 'https://www.eevagga.com/1st-birthday-planner-bangalore',
  },
  openGraph: {
    title: '1st Birthday Planner Bangalore | First Birthday Setup — Eevagga',
    description:
      'Smash cakes, milestone décor & precious first-year memories. Expert 1st birthday planners in Bangalore — fully managed by Eevagga.',
    url: 'https://www.eevagga.com/1st-birthday-planner-bangalore',
    siteName: 'Eevagga',
    type: 'website',
    images: ogImages,
  },
  twitter: {
    card: 'summary_large_image',
    title: '1st Birthday Planner Bangalore — Eevagga',
    description: 'Expert first birthday planning in Bangalore. Smash cakes, milestone décor & full end-to-end management.',
  },
};

/* ─── JSON-LD Schemas ──────────────────────────────────────────────────── */
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://www.eevagga.com/1st-birthday-planner-bangalore#service',
  name: '1st Birthday Planner in Bangalore',
  description:
    'Full-service 1st birthday planning in Bangalore. Milestone balloon arches, smash cake photo zones, theme décor, half-saree ceremony coordination, professional photography and on-ground management.',
  provider: { '@id': 'https://www.eevagga.com/#organization' },
  serviceType: 'First Birthday Party Planning',
  areaServed: { '@type': 'City', name: 'Bangalore', sameAs: 'https://en.wikipedia.org/wiki/Bangalore' },
  url: 'https://www.eevagga.com/1st-birthday-planner-bangalore',
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'INR',
    lowPrice: 15000,
    highPrice: 75000,
    offerCount: 3,
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.eevagga.com' },
    { '@type': 'ListItem', position: 2, name: 'Birthday Planner Bangalore', item: 'https://www.eevagga.com/birthday-planner-bangalore' },
    { '@type': 'ListItem', position: 3, name: '1st Birthday Planner Bangalore', item: 'https://www.eevagga.com/1st-birthday-planner-bangalore' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much does a 1st birthday party cost in Bangalore?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A first birthday party in Bangalore typically costs between ₹15,000 and ₹75,000. Eevagga offers packages from ₹15,000 for a basic smash cake and balloon setup to ₹75,000 for a fully styled theme party with photography, entertainment and catering coordination.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a smash cake and do you coordinate it?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A smash cake is a small individual cake given to the birthday baby to smash and eat during the first birthday photoshoot — creating adorably messy and priceless memories. Yes, Eevagga coordinates custom smash cakes with dedicated photo zones for first birthdays.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can Eevagga coordinate a half-saree or naming ceremony along with the birthday?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! Many South Indian families combine the first birthday with a half-saree ceremony. Eevagga seamlessly coordinates both the ceremony and birthday celebration under one event plan.',
      },
    },
    {
      '@type': 'Question',
      name: 'What themes are popular for 1st birthdays in Bangalore?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Popular 1st birthday themes in Bangalore include Cocomelon, unicorn, jungle safari, floral / garden, princess, Little Mermaid, Boss Baby and milestone "ONE" setups with letter balloons. We offer all of these and more.',
      },
    },
  ],
};

/* ─── Page Config ──────────────────────────────────────────────────────── */
const pageConfig = {
  relatedLinks: [
    {
      "label": "Kids Birthday Party",
      "href": "/kids-birthday-party-bangalore"
    },
    {
      "label": "Teen Birthday Celebration",
      "href": "/teen-birthday-celebration-bangalore"
    },
    {
      "label": "Adult Birthday Planner",
      "href": "/adult-birthday-planner-bangalore"
    }
  ],
  title: '1st Birthday Planner Bangalore',
  badge: 'First Birthday Specialists',
  h1: '1st Birthday Planner in Bangalore — Precious Milestone Celebrations by Eevagga',
  heroSubtitle:
    'Your baby\'s first birthday happens only once. We plan every magical detail — from milestone balloon arches and smash cake photo zones to themed décor and professional photography — across Bangalore.',
  heroImage: '/service-pages/birthday-hero.png',
  heroImageAlt: 'First birthday decoration setup in Bangalore by Eevagga',

  stats: [
    { value: '400+', label: '1st Birthdays Planned' },
    { value: '4.9★', label: 'Average Rating' },
    { value: '100%', label: 'Milestone Magic' },
    { value: '24hr', label: 'Response Time' },
  ],

  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'Birthday Planner Bangalore', href: '/birthday-planner-bangalore' },
    { label: '1st Birthday Planner Bangalore' },
  ],

  gallery: [
    { src: '/service-pages/birthday-hero.png', alt: 'First birthday decoration Bangalore', caption: 'Milestone ONE Setup' },
    { src: '/service-pages/birthday-gallery-1.png', alt: 'Smash cake photo zone Bangalore', caption: 'Smash Cake Zone' },
    { src: '/service-pages/birthday-gallery-2.png', alt: 'First birthday cake table Bangalore', caption: 'Cake & Dessert Table' },
    { src: '/service-pages/birthday-gallery-3.png', alt: 'Baby first birthday stage decoration Bangalore', caption: 'Stage & Backdrop' },
    { src: '/service-pages/birthday-gallery-4.png', alt: 'Balloon arch first birthday Bangalore', caption: 'Balloon Arch' },
  ],

  features: [
    {
      icon: '1️⃣',
      title: 'Milestone "ONE" Décor',
      description: 'Large letter balloons, number arches and milestone banners celebrating your baby\'s incredible first year of life.',
    },
    {
      icon: '🎂',
      title: 'Smash Cake Photo Zone',
      description: 'Custom smash cake in your chosen theme with a dedicated photo backdrop zone for those unforgettable first-cake shots.',
    },
    {
      icon: '📸',
      title: 'First Birthday Photography',
      description: 'Specialist baby photographers experienced in capturing candid toddler moments — smash cakes, first steps and pure joy.',
    },
    {
      icon: '🌸',
      title: 'Theme Design & Décor',
      description: 'From Cocomelon to florals, unicorns to jungle — we execute any theme with premium décor tailored for little ones.',
    },
    {
      icon: '🙏',
      title: 'Half-Saree Ceremony Coordination',
      description: 'Seamlessly combine a half-saree or naming ceremony with the birthday celebration under one fully managed event plan.',
    },
    {
      icon: '🎈',
      title: 'Child-Safe Full Event Setup',
      description: 'All décor is child-safe, non-toxic and thoughtfully designed with toddler safety as the highest priority.',
    },
  ],

};

/* ─── Page Component ───────────────────────────────────────────────────── */
export default function FirstBirthdayPlannerBangalorePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema).replace(/</g, '\\u003c') }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c') }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }}
      />
      <Suspense fallback={null}>
        <ServiceLandingPage config={pageConfig} />
      </Suspense>
    </>
  );
}