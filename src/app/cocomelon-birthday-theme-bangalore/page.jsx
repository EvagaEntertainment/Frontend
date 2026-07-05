import { Suspense } from 'react';
import { ogImages } from '../_seo';
import ServiceLandingPage from '../../components/ServiceLandingPage/ServiceLandingPage';

/* ─── SEO Metadata ─────────────────────────────────────────────────────── */
export const metadata = {
  title: { absolute: "Cocomelon Birthday Theme Bangalore — Eevagga" },
  description:
    'Plan a vibrant Cocomelon birthday party in Bangalore for your toddler. Bright themed décor, JJ character props, Cocomelon cake & full planning by Eevagga. Book today.',
  keywords:
    'Cocomelon birthday theme Bangalore, Cocomelon birthday party Bangalore, Cocomelon birthday decoration Bangalore, Cocomelon theme birthday planner Bangalore, JJ birthday party Bangalore',
  alternates: {
    canonical: 'https://www.eevagga.com/cocomelon-birthday-theme-bangalore',
  },
  openGraph: {
    title: 'Cocomelon Birthday Theme Bangalore | Kids Party Setup — Eevagga',
    description:
      'Bright Cocomelon décor, JJ character props & custom Cocomelon cakes. Perfect toddler birthday parties in Bangalore — planned by Eevagga.',
    url: 'https://www.eevagga.com/cocomelon-birthday-theme-bangalore',
    siteName: 'Eevagga',
    type: 'website',
    images: ogImages,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cocomelon Birthday Theme Bangalore — Eevagga',
    description: 'Bright Cocomelon birthday parties for toddlers in Bangalore. Full planning & custom décor.',
  },
};

/* ─── JSON-LD Schemas ──────────────────────────────────────────────────── */
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://www.eevagga.com/cocomelon-birthday-theme-bangalore#service',
  name: 'Cocomelon Birthday Theme Party in Bangalore',
  description:
    'Full-service Cocomelon theme birthday planning in Bangalore for toddlers and young children. Includes bright balloon setups, JJ and Cocomelon character props, watermelon backdrop, custom cake and on-ground execution.',
  provider: { '@id': 'https://www.eevagga.com/#organization' },
  serviceType: 'Cocomelon Theme Birthday Party Planning',
  areaServed: { '@type': 'City', name: 'Bangalore', sameAs: 'https://en.wikipedia.org/wiki/Bangalore' },
  url: 'https://www.eevagga.com/cocomelon-birthday-theme-bangalore',
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'INR',
    lowPrice: 15000,
    highPrice: 65000,
    offerCount: 3,
  },
};

const eventSchema = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: 'Cocomelon Birthday Theme Party — Eevagga Bangalore',
  description:
    'A fun and vibrant Cocomelon theme birthday party for toddlers curated by Eevagga in Bangalore with character props, balloon décor and full event management.',
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  location: {
    '@type': 'Place',
    name: 'Bangalore',
    address: { '@type': 'PostalAddress', addressLocality: 'Bangalore', addressCountry: 'IN' },
  },
  organizer: { '@type': 'Organization', name: 'Eevagga', url: 'https://www.eevagga.com' },
  offers: {
    '@type': 'Offer',
    priceCurrency: 'INR',
    price: '15000',
    url: 'https://www.eevagga.com/cocomelon-birthday-theme-bangalore',
    availability: 'https://schema.org/InStock',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.eevagga.com' },
    { '@type': 'ListItem', position: 2, name: 'Kids Birthday Planner Bangalore', item: 'https://www.eevagga.com/kids-birthday-planner-bangalore' },
    { '@type': 'ListItem', position: 3, name: 'Cocomelon Birthday Theme Bangalore', item: 'https://www.eevagga.com/cocomelon-birthday-theme-bangalore' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much does a Cocomelon birthday party cost in Bangalore?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A Cocomelon birthday party in Bangalore starts from ₹15,000 for a basic setup with balloon décor and Cocomelon backdrop, up to ₹65,000 for a full character installation setup with custom Cocomelon cake, photography and entertainment.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is included in a Cocomelon theme birthday package?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our Cocomelon packages include bright red, green and yellow balloon arrangements, JJ and Cocomelon character cutouts, watermelon-themed backdrop, Cocomelon character cake coordination, activity zones for toddlers and themed stationery.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Cocomelon theme ideal for 1st and 2nd birthdays?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! Cocomelon is one of the top choices for 1st, 2nd and 3rd birthday parties since toddlers instantly recognise JJ and the characters. We ensure all décor is child-safe and toddler-friendly.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can you add a Cocomelon smash cake session to the package?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely! A Cocomelon smash cake session is a wonderful add-on for 1st birthdays. We coordinate a custom smash cake in Cocomelon colours and can set up a dedicated smash cake photo zone.',
      },
    },
  ],
};

/* ─── Page Config ──────────────────────────────────────────────────────── */
const pageConfig = {
  relatedLinks: [
    {
      "label": "Unicorn Theme Birthday",
      "href": "/unicorn-theme-birthday-bangalore"
    },
    {
      "label": "Jungle Theme Birthday",
      "href": "/jungle-theme-birthday-bangalore"
    },
    {
      "label": "Barbie Theme Birthday",
      "href": "/barbie-theme-birthday-bangalore"
    },
    {
      "label": "Space Theme Birthday",
      "href": "/space-theme-birthday-bangalore"
    }
  ],
  title: 'Cocomelon Birthday Theme Bangalore',
  badge: 'Kids Theme Party Specialists',
  h1: 'Cocomelon Birthday Theme in Bangalore — Fun Toddler Celebrations by Eevagga',
  heroSubtitle:
    'Make your little one\'s day as bright as Cocomelon! Vibrant character props, JJ balloon setups, watermelon backdrops and a fully planned celebration your toddler will love.',
  heroImage: '/service-pages/birthday-hero.png',
  heroImageAlt: 'Cocomelon theme birthday decoration in Bangalore by Eevagga',

  stats: [
    { value: '300+', label: 'Kids Events Done' },
    { value: '4.9★', label: 'Average Rating' },
    { value: '100%', label: 'Child-Safe Setups' },
    { value: '24hr', label: 'Quick Turnaround' },
  ],

  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'Kids Birthday Planner', href: '/kids-birthday-planner-bangalore' },
    { label: 'Cocomelon Birthday Theme Bangalore' },
  ],

  gallery: [
    { src: '/service-pages/birthday-hero.png', alt: 'Cocomelon theme birthday decoration Bangalore', caption: 'Cocomelon Balloon Setup' },
    { src: '/service-pages/birthday-gallery-1.png', alt: 'JJ character birthday party Bangalore', caption: 'JJ Character Props' },
    { src: '/service-pages/birthday-gallery-2.png', alt: 'Cocomelon cake and dessert table Bangalore', caption: 'Cocomelon Cake Table' },
    { src: '/service-pages/birthday-gallery-3.png', alt: 'Watermelon theme stage decoration Bangalore', caption: 'Watermelon Backdrop' },
    { src: '/service-pages/birthday-gallery-4.png', alt: 'Cocomelon balloon garland birthday Bangalore', caption: 'Bright Balloon Garland' },
  ],

  features: [
    {
      icon: '🍉',
      title: 'Cocomelon Balloon Arch & Garlands',
      description: 'Vibrant red, green, yellow and white balloon arrangements in classic Cocomelon colours that kids instantly love.',
    },
    {
      icon: '👶',
      title: 'JJ & Character Prop Cutouts',
      description: 'Life-size JJ, TomTom, YoYo and Cocomelon character standees and cutouts for magical photo opportunities.',
    },
    {
      icon: '🎂',
      title: 'Cocomelon Cake & Smash Cake',
      description: 'Custom Cocomelon character cakes and smash cake setups coordinated with Bangalore\'s best bakers for toddler birthdays.',
    },
    {
      icon: '🎪',
      title: 'Toddler Activity Zones',
      description: 'We set up toddler-safe activity zones with soft play, bubble machines and Cocomelon-themed games to keep kids engaged.',
    },
    {
      icon: '📸',
      title: 'Smash Cake Photography',
      description: 'Professional photographers who specialise in capturing adorable toddler moments — smash cakes, first bites and pure joy.',
    },
    {
      icon: '🎀',
      title: 'Child-Safe Décor & Setup',
      description: 'All our kids\' theme setups use child-safe, non-toxic materials with no sharp edges — safety is our top priority.',
    },
  ],

  pricing: [
    {
      name: 'Starter',
      subtitle: 'Perfect for small toddler parties',
      price: 15000,
      featured: false,
      includes: [
        'Cocomelon balloon arch',
        'Character backdrop & name banner',
        'JJ cutout prop (1 piece)',
        'Cleanup & post-event support',
        'Up to 25 guests',
      ],
    },
    {
      name: 'Premium',
      subtitle: 'Our most popular Cocomelon package',
      price: 35000,
      featured: true,
      includes: [
        'Full Cocomelon balloon garland',
        'Character prop set (4 pieces)',
        'Cocomelon cake coordination',
        'Smash cake photo zone setup',
        'Photography (2 hours)',
        'Themed stationery & activity corner',
        'Up to 60 guests',
      ],
    },
    {
      name: 'Luxury',
      subtitle: 'Grand Cocomelon celebration',
      price: 65000,
      featured: false,
      includes: [
        'Bespoke Cocomelon theme design',
        'Full character prop installations',
        'Full-day photography + video',
        'Toddler entertainment & activities',
        'Dessert table styling',
        'Dedicated event manager',
        '75+ guests',
      ],
    },
  ],

  faqs: [
    {
      question: 'How much does a Cocomelon birthday party cost in Bangalore?',
      answer:
        'Cocomelon birthday parties in Bangalore start from ₹15,000 for basic setups, up to ₹65,000 for full character installations with smash cake, photography and toddler entertainment.',
    },
    {
      question: 'What is included in a Cocomelon theme package?',
      answer:
        'Packages include bright balloon arrangements, JJ and character cutouts, watermelon backdrop, Cocomelon cake coordination, smash cake photo zone and themed stationery.',
    },
    {
      question: 'Is Cocomelon theme good for 1st and 2nd birthdays?',
      answer:
        'Absolutely! Cocomelon is the top choice for 1st, 2nd and 3rd birthdays. Toddlers instantly recognise JJ. All décor is child-safe and toddler-friendly.',
    },
    {
      question: 'Can you add a smash cake session?',
      answer:
        'Yes! A Cocomelon smash cake session is a popular add-on. We coordinate a custom smash cake and set up a dedicated photo zone to capture that magical first-cake moment.',
    },
    {
      question: 'How far in advance should I book?',
      answer:
        'We recommend 2–3 weeks advance booking. Character props and custom cakes need lead time. Weekend slots fill up fast for kids\' parties — book early!',
    },
  ],
};

/* ─── Page Component ───────────────────────────────────────────────────── */
export default function CocomeloThemeBirthdayBangalorePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema).replace(/</g, '\\u003c') }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema).replace(/</g, '\\u003c') }}
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
