import { Suspense } from 'react';
import { ogImages } from '../_seo';
import ServiceLandingPage from '../../components/ServiceLandingPage/ServiceLandingPage';

/* ─── SEO Metadata ─────────────────────────────────────────────────────── */
export const metadata = {
  title: { absolute: "Kids Birthday Party Bangalore — Eevagga" },
  description:
    'Plan the perfect kids birthday party in Bangalore with Eevagga. Theme décor, magicians, games, entertainers & end-to-end kids party planning. Book your free consultation today.',
  keywords:
    'kids birthday party Bangalore, children birthday party Bangalore, kids party planner Bangalore, kids birthday decoration Bangalore, kids birthday entertainment Bangalore',
  alternates: {
    canonical: 'https://www.eevagga.com/kids-birthday-party-bangalore',
  },
  openGraph: {
    title: 'Kids Birthday Party Bangalore | Children\'s Party Planners — Eevagga',
    description:
      'Theme décor, magicians, games & entertainment. Expert kids birthday party planners in Bangalore — fully managed by Eevagga.',
    url: 'https://www.eevagga.com/kids-birthday-party-bangalore',
    siteName: 'Eevagga',
    type: 'website',
    images: ogImages,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kids Birthday Party Bangalore — Eevagga',
    description: 'Expert kids birthday party planners in Bangalore. Themes, entertainment & full management.',
  },
};

/* ─── JSON-LD Schemas ──────────────────────────────────────────────────── */
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://www.eevagga.com/kids-birthday-party-bangalore#service',
  name: 'Kids Birthday Party Planning in Bangalore',
  description:
    'Full-service kids birthday party planning in Bangalore. Character themes, balloon décor, magicians, game hosts, bounce houses, themed cake coordination, photography and complete on-ground management.',
  provider: { '@id': 'https://www.eevagga.com/#organization' },
  serviceType: 'Kids Birthday Party Planning',
  areaServed: { '@type': 'City', name: 'Bangalore', sameAs: 'https://en.wikipedia.org/wiki/Bangalore' },
  url: 'https://www.eevagga.com/kids-birthday-party-bangalore',
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'INR',
    lowPrice: 15000,
    highPrice: 80000,
    offerCount: 3,
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.eevagga.com' },
    { '@type': 'ListItem', position: 2, name: 'Birthday Planner Bangalore', item: 'https://www.eevagga.com/birthday-planner-bangalore' },
    { '@type': 'ListItem', position: 3, name: 'Kids Birthday Party Bangalore', item: 'https://www.eevagga.com/kids-birthday-party-bangalore' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much does a kids birthday party cost in Bangalore?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Kids birthday parties in Bangalore start from ₹15,000 for basic themed décor and balloon setups, up to ₹80,000 for full entertainment packages with magicians, game hosts, theme décor, photography and catering coordination.',
      },
    },
    {
      '@type': 'Question',
      name: 'What entertainment can Eevagga arrange for a kids birthday party?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We coordinate a wide range of entertainment for kids including magicians, clowns, face painters, balloon artists, puppet shows, game hosts, bubble machines, bounce houses and character performers.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which kids birthday themes are most popular in Bangalore?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The most popular kids birthday themes in Bangalore are Cocomelon, unicorn, jungle safari, Barbie, superhero, princess, space, Paw Patrol, Mickey Mouse and Boss Baby. We specialise in all of them.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Eevagga plan kids birthday parties at home?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! We specialise in home birthday parties for kids across Bangalore. Our team handles all setup and teardown, so parents can focus entirely on enjoying the celebration.',
      },
    },
  ],
};

/* ─── Page Config ──────────────────────────────────────────────────────── */
const pageConfig = {
  relatedLinks: [
    {
      "label": "1st Birthday Planner",
      "href": "/1st-birthday-planner-bangalore"
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
  title: 'Kids Birthday Party Bangalore',
  badge: 'Children\'s Party Specialists',
  h1: 'Kids Birthday Party Planning in Bangalore — Fun-Filled Celebrations by Eevagga',
  heroSubtitle:
    'Create memories that last a lifetime. Character themes, vibrant balloon setups, magicians, game hosts and a completely stress-free, end-to-end kids birthday party planned by Eevagga across Bangalore.',
  heroImage: '/service-pages/birthday-hero.png',
  heroImageAlt: 'Kids birthday party decoration in Bangalore by Eevagga',

  stats: [
    { value: '500+', label: 'Kids Parties Planned' },
    { value: '4.9★', label: 'Average Rating' },
    { value: '20+', label: 'Themes Available' },
    { value: '100%', label: 'Stress-Free' },
  ],

  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'Birthday Planner Bangalore', href: '/birthday-planner-bangalore' },
    { label: 'Kids Birthday Party Bangalore' },
  ],

  gallery: [
    { src: '/service-pages/birthday-hero.png', alt: 'Kids birthday party decoration Bangalore', caption: 'Kids Theme Setup' },
    { src: '/service-pages/birthday-gallery-1.png', alt: 'Children birthday party entertainment Bangalore', caption: 'Magic Show' },
    { src: '/service-pages/birthday-gallery-2.png', alt: 'Kids birthday cake and games Bangalore', caption: 'Cake & Games' },
    { src: '/service-pages/birthday-gallery-3.png', alt: 'Character theme birthday Bangalore', caption: 'Character Theme' },
    { src: '/service-pages/birthday-gallery-4.png', alt: 'Balloon arch kids party Bangalore', caption: 'Balloon Wonderland' },
  ],

  features: [
    {
      icon: '🎨',
      title: 'Character Theme Design',
      description: 'From Cocomelon to superheroes — we design immersive character themes with matching décor, props and backdrops.',
    },
    {
      icon: '🪄',
      title: 'Magicians & Entertainment',
      description: 'Magicians, clowns, balloon artists, face painters and game hosts to keep every child entertained and laughing.',
    },
    {
      icon: '🎈',
      title: 'Vibrant Balloon Installations',
      description: 'Bright, colourful organic balloon arches, garlands and columns that children absolutely adore.',
    },
    {
      icon: '🎂',
      title: 'Themed Cake Coordination',
      description: 'Custom character cakes, smash cakes and cupcake towers coordinated with Bangalore\'s best bakers.',
    },
    {
      icon: '🏠',
      title: 'Home Party Specialists',
      description: 'We transform your home into a magical party venue — handling all setup, management and complete cleanup.',
    },
    {
      icon: '📸',
      title: 'Kids Party Photography',
      description: 'Expert photographers who capture genuine kids\' reactions — the laughter, surprise and pure birthday joy.',
    },
  ],

};

/* ─── Page Component ───────────────────────────────────────────────────── */
export default function KidsBirthdayPartyBangalorePage() {
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