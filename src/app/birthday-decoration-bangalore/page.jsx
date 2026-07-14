import { Suspense } from 'react';
import { ogImages } from '../_seo';
import ServiceLandingPage from '../../components/ServiceLandingPage/ServiceLandingPage';

/* ─── SEO Metadata ─────────────────────────────────────────────────────── */
export const metadata = {
  title: { absolute: "Premium Birthday Decoration in Bangalore — Eevagga" },
  description:
    "Premium birthday decoration in Bangalore. We specialize in organic balloon arches, stunning backdrops, floral themes, neon light setups & stage decoration. Customise your décor today.",
  keywords:
    "birthday decoration Bangalore, birthday decorators Bangalore, balloon decoration Bangalore, birthday stage decoration Bangalore, Eevagga birthday decorators",
  alternates: {
    canonical: 'https://www.eevagga.com/birthday-decoration-bangalore',
  },
  openGraph: {
    title: "Birthday Decoration in Bangalore | Balloon & Theme Decors — Eevagga",
    description:
      "Transform your space with stunning birthday decorations in Bangalore. Organic balloon setups, neon light backdrops, floral styling, and custom theme designs. Get a free quote.",
    url: 'https://www.eevagga.com/birthday-decoration-bangalore',
    siteName: 'Eevagga',
    type: 'website',
    images: ogImages,
  },
  twitter: {
    card: 'summary_large_image',
    title: "Birthday Decoration in Bangalore — Eevagga",
    description: "Premium balloon decoration and custom stage setups for birthdays in Bangalore.",
  },
};

/* ─── JSON-LD Schemas ──────────────────────────────────────────────────── */
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://www.eevagga.com/birthday-decoration-bangalore#service',
  name: 'Birthday Decoration in Bangalore',
  description:
    "High-quality, customizable birthday decorations in Bangalore. Balloon arches, customized backdrops, stage designs, theme props, flower styling, and lighting installations.",
  provider: { '@id': 'https://www.eevagga.com/#organization' },
  serviceType: 'Birthday Decorating Services',
  areaServed: { '@type': 'City', name: 'Bangalore', sameAs: 'https://en.wikipedia.org/wiki/Bangalore' },
  url: 'https://www.eevagga.com/birthday-decoration-bangalore',
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'INR',
    lowPrice: 10000,
    highPrice: 50000,
    offerCount: 3,
    availability: 'https://schema.org/InStock',
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
      name: 'Birthday Decoration Bangalore',
      item: 'https://www.eevagga.com/birthday-decoration-bangalore',
    },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How long does it take to set up the birthday decorations?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Depending on the package and design complexity, setup takes between 2 to 5 hours. Our experienced decorators make sure everything is completely finished and cleaned before your guests start arriving.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you decorate for home birthday parties as well as halls?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, absolutely! We do decorations for intimate home setups (living rooms, bedrooms, terraces, gardens) as well as larger party halls, hotels, and clubhouses across Bangalore.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can we customize the balloon colors and theme props?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! All our decoration packages are fully customisable. You can select your color palette, backdrop shape, prop styles, neon signs, and add individual elements as needed.',
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
      "label": "Kids Birthday Planner",
      "href": "/kids-birthday-planner-bangalore"
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
  title: 'Birthday Decoration Bangalore',
  badge: 'Premium Decorators',
  h1: "Stunning Birthday Decoration in Bangalore \u2014 Balloon & Theme Decors",
  heroSubtitle:
    "Elevate your celebration with beautiful, premium birthday backdrops, organic balloon setups, floral arrangements, and custom theme designs created by Eevagga's specialist decorators.",
  heroImage: '/service-pages/birthday-hero.png',
  heroImageAlt: 'Premium birthday balloon backdrop and stage decoration setup in Bangalore',

  stats: [
    { value: '450+', label: 'Decorations Setup' },
    { value: '30+', label: 'Color Schemes' },
    { value: '4.8★', label: 'Decor Rating' },
    { value: '100%', label: 'On-Time Setup' },
  ],

  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Birthday Decoration Bangalore' },
  ],

  gallery: [
    {
      src: '/service-pages/birthday-hero.png',
      alt: 'Luxury birthday balloon setup Bangalore',
      caption: 'Backdrop Setup',
    },
    {
      src: '/service-pages/birthday-gallery-1.png',
      alt: 'Elegant birthday stage decoration',
      caption: 'Stage Decor',
    },
    {
      src: '/service-pages/birthday-gallery-2.png',
      alt: 'Table setting decoration and flowers',
      caption: 'Table Setting',
    },
    {
      src: '/service-pages/birthday-gallery-3.png',
      alt: 'Neon sign backdrop for birthday party',
      caption: 'Photo Booth',
    },
    {
      src: '/service-pages/birthday-gallery-4.png',
      alt: 'Pastel balloon arch birthday decoration',
      caption: 'Balloon Arch',
    },
  ],

  features: [
    {
      icon: '🎈',
      title: 'Organic Balloon Installations',
      description:
        'Stunning balloon arches, columns, ceilings, and customized layouts using premium metallic, pastel, and chrome balloons.',
    },
    {
      icon: '🎨',
      title: 'Custom Themed Backdrops',
      description:
        'Arch panels, round frames, LED light curtains, wood cutouts, and printed themes tailored to your celebration concept.',
    },
    {
      icon: '✨',
      title: 'Neon Signs & LED Lighting',
      description:
        'Add neon lettering (e.g., "Happy Birthday", "Wild One", "Fifty") and ambient pixel/LED spotlights for a premium glow.',
    },
    {
      icon: '🌸',
      title: 'Floral Accents & Styling',
      description:
        'Elegant integration of fresh or high-quality artificial flowers, pampas grass, and green foliage for luxury aesthetics.',
    },
    {
      icon: '🎪',
      title: 'Premium Theme Props',
      description:
        'Pedestal cake stands, birthday chairs, thematic character cutouts, carpet pathways, and welcome boards.',
    },
    {
      icon: '🧹',
      title: 'Hassle-Free Dismantling',
      description:
        'Our team comes back after the event to systematically pack up and dismantle the setup, leaving the venue clean.',
    },
  ],

};

/* ─── Page Component ───────────────────────────────────────────────────── */
export default function BirthdayDecorationBangalorePage() {
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