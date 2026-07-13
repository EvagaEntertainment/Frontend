import { Suspense } from 'react';
import { ogImages } from '../_seo';
import ServiceLandingPage from '../../components/ServiceLandingPage/ServiceLandingPage';

/* â”€â”€â”€ SEO Metadata â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
export const metadata = {
  title: "Premium Baby Shower Planner | Godh Bharani Planners â€” Eevagga",
  description:
    "Host a gorgeous baby shower (Godh Bharani) with Eevagga. We offer custom themes, cute decorations, photography, fun guest activities & complete event management.",
  keywords:
    "premium baby shower planner, Godh Bharani event planner, baby shower decoration Bangalore, baby shower themes, Eevagga baby shower",
  alternates: {
    canonical: 'https://www.eevagga.com/premium-baby-shower-planner',
  },
  openGraph: {
    title: "Premium Baby Shower Planner | Godh Bharani Planners â€” Eevagga",
    description:
      "Celebrate new beginnings with warmth and beauty. Eevagga plans delightful baby shower and Godh Bharani events. Charming theme decors, photography, and interactive games. Get a free quote.",
    url: 'https://www.eevagga.com/premium-baby-shower-planner',
    siteName: 'Eevagga',
    type: 'website',
    images: ogImages,
  },
  twitter: {
    card: 'summary_large_image',
    title: "Premium Baby Shower Planner â€” Eevagga",
    description: "Delightful baby shower & Godh Bharani planning. Custom themes, sweet treats & fun activities.",
  },
};

/* â”€â”€â”€ JSON-LD Schemas â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://www.eevagga.com/premium-baby-shower-planner#service',
  name: 'Premium Baby Shower Planner',
  description:
    "Delightful, full-service baby shower and traditional Godh Bharani planning in Bangalore. Includes pastel theme decors, customized cake and dessert stations, fun parlor games, and custom photo zones.",
  provider: { '@id': 'https://www.eevagga.com/#organization' },
  serviceType: 'Baby Shower Event Planning',
  areaServed: { '@type': 'City', name: 'Bangalore', sameAs: 'https://en.wikipedia.org/wiki/Bangalore' },
  url: 'https://www.eevagga.com/premium-baby-shower-planner',
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'INR',
    lowPrice: 15000,
    highPrice: 60000,
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
      name: 'Premium Baby Shower Planner',
      item: 'https://www.eevagga.com/premium-baby-shower-planner',
    },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What are some popular themes for a baby shower?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Popular modern themes include Pastel Rainbow, Baby Safari, Little Prince/Princess, Teddy Bear Picnic, and Twinkle Twinkle Little Star. We also specialize in traditional fresh floral setups for Godh Bharani and Seemantham ceremonies.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you organize baby shower games and activities?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, absolutely! We coordinate fun, heartwarming parlor games (like "guess the baby food", "diaper raffle", or quiz boards), print game sheets, and provide a lively anchor to facilitate the activities.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you offer traditional styling for Godh Bharani / Seemantham ceremonies?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! We design gorgeous traditional setups featuring marigold and jasmine backdrops, elegant seating arrangements, and custom decorated swings (jhoola) for the mom-to-be.',
      },
    },
  ],
};

/* â”€â”€â”€ Page Config â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const pageConfig = {
  title: 'Premium Baby Shower Planner',
  badge: 'Joyful Beginnings',
  h1: "Premium Baby Shower Planner \u2014 Sweet & Memorable",
  heroSubtitle:
    "Celebrate the upcoming arrival of your little one. Eevagga designs beautiful, heartwarming baby shower (Godh Bharani) events with creative themes, charming pastel decors, and fun guest activities.",
  heroImage: '/service-pages/birthday-hero.png',
  heroImageAlt: 'Charming pastel pink and blue baby shower theme balloon decoration setup',

  stats: [
    { value: '140+', label: 'Showers Planned' },
    { value: 'Pastel & Floral', label: 'Decor options' },
    { value: 'Fun Games', label: 'Coordinated' },
    { value: '4.9â˜…', label: 'Average Review' },
  ],

  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Premium Baby Shower Planner' },
  ],

  gallery: [
    {
      src: '/service-pages/birthday-hero.png',
      alt: 'Delightful baby shower balloon backdrop',
      caption: 'Main Theme Stage',
    },
    {
      src: '/service-pages/birthday-gallery-1.png',
      alt: 'Traditional Godh Bharani swing decoration',
      caption: 'Traditional Swing',
    },
    {
      src: '/service-pages/birthday-gallery-2.png',
      alt: 'Cupcakes and macarons station for baby shower',
      caption: 'Sweet Dessert Table',
    },
    {
      src: '/service-pages/birthday-gallery-3.png',
      alt: 'Baby shower guest wish board and prop',
      caption: 'Activity Stand',
    },
    {
      src: '/service-pages/birthday-gallery-4.png',
      alt: 'Cute teddy bear theme photo booth setup',
      caption: 'Cute Photo Booth',
    },
  ],

  features: [
    {
      icon: 'ðŸ§¸',
      title: 'Charming Theme Concepts',
      description:
        'Select from adorable themes like Winnie the Pooh, Baby Elephant, Floral Meadow, or customized color stories.',
    },
    {
      icon: 'ðŸŽˆ',
      title: 'Soft Pastel Ballon & Floral styling',
      description:
        'Organic pastel pink, blue, cream, and peach balloon arches, custom word cutouts (e.g., "Oh Baby"), and fresh flower accents.',
    },
    {
      icon: 'ðŸ§',
      title: 'Themed Dessert Curation',
      description:
        'Delicious matching dessert setups with themed cupcakes, cake pops, cookies, and custom cakes.',
    },
    {
      icon: 'ðŸŽ¤',
      title: 'Fun Host & Interactive Games',
      description:
        'Lively emcees who lead baby shower games, baby trivia, guessing challenges, and distribute fun prizes.',
    },
    {
      icon: 'ðŸ“¸',
      title: 'Candid Baby Shower Photo shoot',
      description:
        'Professional coverage of key ceremony rituals, emotional moments, fun games, and cute group portraits.',
    },
    {
      icon: 'ðŸ‘¶',
      title: 'Comfortable Mom-to-Be Seating',
      description:
        'We set up comfortable, decorated chairs or traditional swings (jhoola) adorned with fresh flowers for the guest of honor.',
    },
  ],

  pricing: [
    {
      name: 'Starter',
      subtitle: 'Cute, cozy living room decor',
      price: 15000,
      featured: false,
      includes: [
        'Charming pastel balloon arch (200 balloons)',
        'Fabric/flex backdrop with theme graphic',
        'Cake table styling & cupcake stands',
        'Welcome board with easel',
        'Setup & dismantling',
      ],
    },
    {
      name: 'Premium',
      subtitle: 'Complete party hall theme & games',
      price: 30000,
      featured: true,
      includes: [
        'Premium dual-backdrop with neon "Oh Baby" sign',
        'Floral accents & teddy bear/prop rentals',
        'Professional candid photography (2 hours)',
        'Interactive baby shower games host (1 hour)',
        'Printed game cards for guests',
      ],
    },
    {
      name: 'Luxury',
      subtitle: 'Grand custom designer shower',
      price: 60000,
      featured: false,
      includes: [
        'Bespoke custom theme backdrop production',
        'Grand floral panels or organic balloon installations',
        'Candid photography + cinematic video highlight',
        'Complete dessert table (1.5kg custom cake + 20 cupcakes)',
        'Traditional floral swing / luxury armchair',
        'Dedicated senior event supervisor',
      ],
    },
  ],

  faqs: [
    {
      question: 'What are some popular themes for a baby shower?',
      answer:
        'Popular modern themes include Pastel Rainbow, Baby Safari, Little Prince/Princess, Teddy Bear Picnic, and Twinkle Twinkle Little Star. We also specialize in traditional fresh floral setups for Godh Bharani and Seemantham ceremonies.',
    },
    {
      question: 'Do you organize baby shower games and activities?',
      answer:
        'Yes, absolutely! We coordinate fun, heartwarming parlor games (like "guess the baby food", "diaper raffle", or quiz boards), print game sheets, and provide a lively anchor to facilitate the activities.',
    },
    {
      question: 'Do you offer traditional styling for Godh Bharani / Seemantham ceremonies?',
      answer:
        'Yes! We design gorgeous traditional setups featuring marigold and jasmine backdrops, elegant seating arrangements, and custom decorated swings (jhoola) for the mom-to-be.',
    },
    {
      question: 'Can you help with customized baby shower return gifts?',
      answer:
        'Yes, we coordinate customized theme-based return gifts, customized favors bags, chocolate boxes, or traditional potli bags with dry fruits and sweets.',
    },
    {
      question: 'How early should we start setting up on the day?',
      answer:
        'Typically, our team requires 2 to 3 hours for setup. For afternoon events, we generally start setting up around 9:00 AM to ensure everything is perfect and clean before guests arrive.',
    },
  ],
};

/* â”€â”€â”€ Page Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
export default function PremiumBabyShowerPlannerPage() {
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
