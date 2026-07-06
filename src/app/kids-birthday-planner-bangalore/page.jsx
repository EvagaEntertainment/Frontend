import { Suspense } from 'react';
import { ogImages } from '../_seo';
import ServiceLandingPage from '../../components/ServiceLandingPage/ServiceLandingPage';

/* ─── SEO Metadata ─────────────────────────────────────────────────────── */
export const metadata = {
  title: { absolute: "Kids Birthday Party Planner in Bangalore — Eevagga" },
  description:
    "Planning a kids birthday party in Bangalore? Eevagga designs magical children's birthday celebrations with creative themes, fun decors, games & entertainment. Book a free consultation.",
  keywords:
    "kids birthday planner Bangalore, kids birthday party planner Bangalore, children birthday party planners Bangalore, kids birthday event organizer Bangalore",
  alternates: {
    canonical: 'https://www.eevagga.com/kids-birthday-planner-bangalore',
  },
  openGraph: {
    title: "Kids Birthday Party Planner in Bangalore | Theme Planners — Eevagga",
    description:
      "Designs magical children's birthday celebrations in Bangalore. Creative themes, balloon decors, games, emcees, and entertainment. Get your free consultation.",
    url: 'https://www.eevagga.com/kids-birthday-planner-bangalore',
    siteName: 'Eevagga',
    type: 'website',
    images: ogImages,
  },
  twitter: {
    card: 'summary_large_image',
    title: "Kids Birthday Party Planner in Bangalore — Eevagga",
    description: "Creative kids birthday planning in Bangalore. Fun themes, amazing décor & entertainment.",
  },
};

/* ─── JSON-LD Schemas ──────────────────────────────────────────────────── */
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://www.eevagga.com/kids-birthday-planner-bangalore#service',
  name: 'Kids Birthday Planner in Bangalore',
  description:
    "Creative children's birthday planning and coordination in Bangalore. Includes customized theme design, cartoon character decors, game stalls, emcee, mascot entertainment, and party rentals.",
  provider: { '@id': 'https://www.eevagga.com/#organization' },
  serviceType: 'Kids Birthday Party Planning',
  areaServed: { '@type': 'City', name: 'Bangalore', sameAs: 'https://en.wikipedia.org/wiki/Bangalore' },
  url: 'https://www.eevagga.com/kids-birthday-planner-bangalore',
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'INR',
    lowPrice: 15000,
    highPrice: 65000,
    offerCount: 3,
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.eevagga.com' },
    { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://www.eevagga.com/services' },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Kids Birthday Planner Bangalore',
      item: 'https://www.eevagga.com/kids-birthday-planner-bangalore',
    },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What popular themes do you offer for kids birthdays?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We offer a wide variety of popular themes including Jungle Safari, Disney Princess, Outer Space, Superhero, Cocomelon, Unicorn, Carnival, and custom bespoke themes based on your child\'s favorite characters.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you provide game hosts/emcees and entertainment activities?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! We coordinate professional children\'s emcees, game hosts, magicians, puppet shows, tattoo artists, face painters, balloon sculptors, and mascot performers to keep the kids engaged and entertained.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can you arrange a custom themed cake?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, we work with top-tier cake designers and home bakers in Bangalore to design and deliver beautiful, delicious custom themed cakes matching your exact party colors and concept.',
      },
    },
  ],
};

/* ─── Page Config ──────────────────────────────────────────────────────── */
const pageConfig = {
  relatedLinks: [
    {
      "label": "Birthday Planner",
      "href": "/birthday-planner-bangalore"
    },
    {
      "label": "Birthday Decoration",
      "href": "/birthday-decoration-bangalore"
    },
    {
      "label": "Birthday Celebration At Home",
      "href": "/birthday-celebration-at-home-bangalore"
    },
    {
      "label": "Luxury Birthday Planner",
      "href": "/luxury-birthday-planner-bangalore"
    }
  ],
  title: 'Kids Birthday Planner Bangalore',
  badge: 'Magical Kids Celebrations',
  h1: "Kids Birthday Party Planner in Bangalore \u2014 Pure Joy & Fun",
  heroSubtitle:
    "Eevagga makes kids' birthdays magical and stress-free. From whimsical fairytale setups to action-packed superhero parties, we handle themes, decorations, games, and entertainment across Bangalore.",
  heroImage: '/service-pages/birthday-hero.png',
  heroImageAlt: 'Colorful kids birthday party theme decoration setup in Bangalore',

  stats: [
    { value: '300+', label: 'Kids Parties Planned' },
    { value: '15+', label: 'Mascots & Characters' },
    { value: '10+', label: 'Live Game Stalls' },
    { value: '100%', label: 'Kid-Approved' },
  ],

  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Kids Birthday Planner Bangalore' },
  ],

  gallery: [
    {
      src: '/service-pages/birthday-hero.png',
      alt: 'Magical kids birthday setup Bangalore',
      caption: 'Main Backdrop',
    },
    {
      src: '/service-pages/birthday-gallery-1.png',
      alt: 'Kids themed birthday decoration',
      caption: 'Theme Layout',
    },
    {
      src: '/service-pages/birthday-gallery-2.png',
      alt: 'Themed cupcakes and dessert station for kids party',
      caption: 'Dessert Corner',
    },
    {
      src: '/service-pages/birthday-gallery-3.png',
      alt: 'Kids game show and entertainment area',
      caption: 'Activity Zone',
    },
    {
      src: '/service-pages/birthday-gallery-4.png',
      alt: 'Balloon arches and cartoon characters',
      caption: 'Welcome Arch',
    },
  ],

  features: [
    {
      icon: '🦄',
      title: 'Exciting Kid-Friendly Themes',
      description:
        'From Cocomelon and Peppa Pig to Space Explorer and Barbie, we bring your child\'s favorite world to life.',
    },
    {
      icon: '🎈',
      title: 'Whimsical Balloon & Prop Décor',
      description:
        'Stunning balloon backdrops, 3D character cutouts, themed table centerpieces, and decorative photo booths.',
    },
    {
      icon: '🎤',
      title: 'Interactive Emcees & Games',
      description:
        'Professional kid-friendly hosts who conduct engaging games, distribute prizes, and keep the energy high.',
    },
    {
      icon: '🎪',
      title: 'Fun Food & Activity Stalls',
      description:
        'Add popcorn, cotton candy, chocolate fountains, tattoo artists, face painters, or caricature artists.',
    },
    {
      icon: '🦁',
      title: 'Mascot & Character Entries',
      description:
        'Delight the kids with surprise visits from Mickey Mouse, Elsa, Spider-Man, or a custom mascot.',
    },
    {
      icon: '📸',
      title: 'Photography & Videography',
      description:
        'Candid photographers to capture the genuine smiles, laughter, and fun moments of your child and guests.',
    },
  ],

};

/* ─── Page Component ───────────────────────────────────────────────────── */
export default function KidsBirthdayPlannerBangalorePage() {
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