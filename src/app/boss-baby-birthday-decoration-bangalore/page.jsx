import { Suspense } from 'react';
import { ogImages } from '../_seo';
import ServiceLandingPage from '../../components/ServiceLandingPage/ServiceLandingPage';

/* ─── SEO Metadata ─────────────────────────────────────────────────────── */
export const metadata = {
  title: 'Boss Baby Birthday Decoration Bangalore | Corporate Kids Theme — Eevagga',
  description:
    'Plan a fun Boss Baby theme birthday in Bangalore. Suit & tie décor, baby boss props, boardroom table setups & full planning by Eevagga. Book your free consultation today.',
  keywords:
    'Boss Baby birthday decoration Bangalore, Boss Baby birthday party Bangalore, Boss Baby theme birthday Bangalore, boss baby birthday planner Bangalore',
  alternates: {
    canonical: 'https://www.eevagga.com/boss-baby-birthday-decoration-bangalore',
  },
  openGraph: {
    title: 'Boss Baby Birthday Decoration Bangalore | Corporate Kids Theme — Eevagga',
    description:
      'Suit & tie décor, Boss Baby character props & boardroom table setups. Hilarious Boss Baby birthdays in Bangalore — planned by Eevagga.',
    url: 'https://www.eevagga.com/boss-baby-birthday-decoration-bangalore',
    siteName: 'Eevagga',
    type: 'website',
    images: ogImages,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Boss Baby Birthday Decoration Bangalore — Eevagga',
    description: 'Boss Baby theme birthday parties in Bangalore. Suit & tie kids décor & full planning.',
  },
};

/* ─── JSON-LD Schemas ──────────────────────────────────────────────────── */
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://www.eevagga.com/boss-baby-birthday-decoration-bangalore#service',
  name: 'Boss Baby Birthday Decoration in Bangalore',
  description:
    'Full-service Boss Baby theme birthday decoration and planning in Bangalore. Includes suit and tie balloon setups, Boss Baby character props, boardroom-style table settings, themed cake coordination and on-ground execution.',
  provider: { '@id': 'https://www.eevagga.com/#organization' },
  serviceType: 'Boss Baby Theme Birthday Decoration',
  areaServed: { '@type': 'City', name: 'Bangalore', sameAs: 'https://en.wikipedia.org/wiki/Bangalore' },
  url: 'https://www.eevagga.com/boss-baby-birthday-decoration-bangalore',
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'INR',
    lowPrice: '15000',
    highPrice: '65000',
    offerCount: '3',
  },
};

const eventSchema = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: 'Boss Baby Birthday Decoration — Eevagga Bangalore',
  description:
    'A fun Boss Baby theme birthday celebration curated by Eevagga in Bangalore with suit-and-tie props, character cutouts, boardroom table settings and full event management.',
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
    url: 'https://www.eevagga.com/boss-baby-birthday-decoration-bangalore',
    availability: 'https://schema.org/InStock',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.eevagga.com' },
    { '@type': 'ListItem', position: 2, name: 'Kids Birthday Planner Bangalore', item: 'https://www.eevagga.com/kids-birthday-planner-bangalore' },
    { '@type': 'ListItem', position: 3, name: 'Boss Baby Birthday Decoration Bangalore', item: 'https://www.eevagga.com/boss-baby-birthday-decoration-bangalore' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much does a Boss Baby birthday decoration cost in Bangalore?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Boss Baby birthday decoration in Bangalore starts from ₹15,000 for a basic setup with balloon arch and character props, up to ₹65,000 for a luxury setup with full boardroom-style table settings, character installations, custom cake and photography.',
      },
    },
    {
      '@type': 'Question',
      name: 'What props are included in a Boss Baby theme birthday?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our Boss Baby packages include black, white and gold balloon arrangements, Boss Baby character cutouts, suit-and-tie prop frames, briefcase décor pieces, boardroom-style table settings and a custom Boss Baby cake.',
      },
    },
    {
      '@type': 'Question',
      name: 'What age group is the Boss Baby theme best for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Boss Baby theme is most popular for 1st, 2nd and 3rd birthdays. The cute contrast of babies in business suits is universally loved by parents and guests. It also works brilliantly for baby shower reveals.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I add a boardroom-style table setup for the Boss Baby theme?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! A mini boardroom-style table setup with briefcases, gold trimmings and "CEO" banners is one of our most beloved Boss Baby add-ons and makes for hilarious party photos.',
      },
    },
  ],
};

/* ─── Page Config ──────────────────────────────────────────────────────── */
const pageConfig = {
  title: 'Boss Baby Birthday Decoration Bangalore',
  badge: 'Corporate Kids Theme Experts',
  h1: 'Boss Baby Birthday Decoration in Bangalore — Little CEO Celebrations by Eevagga',
  heroSubtitle:
    'Running the boardroom since Day 1! Suit-and-tie balloon setups, Boss Baby character props, CEO banners and a fully managed birthday experience for your little boss in Bangalore.',
  heroImage: '/service-pages/birthday-hero.png',
  heroImageAlt: 'Boss Baby theme birthday decoration in Bangalore by Eevagga',

  stats: [
    { value: '200+', label: 'Kids Events Done' },
    { value: '4.9★', label: 'Average Rating' },
    { value: '100%', label: 'Custom Setups' },
    { value: '24hr', label: 'Quick Turnaround' },
  ],

  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'Kids Birthday Planner', href: '/kids-birthday-planner-bangalore' },
    { label: 'Boss Baby Birthday Decoration Bangalore' },
  ],

  gallery: [
    { src: '/service-pages/birthday-hero.png', alt: 'Boss Baby theme birthday decoration Bangalore', caption: 'CEO Balloon Setup' },
    { src: '/service-pages/birthday-gallery-1.png', alt: 'Boss Baby character props birthday Bangalore', caption: 'Character Props' },
    { src: '/service-pages/birthday-gallery-2.png', alt: 'Boss Baby cake and table setting Bangalore', caption: 'CEO Dessert Table' },
    { src: '/service-pages/birthday-gallery-3.png', alt: 'Boardroom theme stage decoration Bangalore', caption: 'Boardroom Stage' },
    { src: '/service-pages/birthday-gallery-4.png', alt: 'Black gold balloon birthday décor Bangalore', caption: 'Black & Gold Décor' },
  ],

  features: [
    {
      icon: '👔',
      title: 'Suit & Tie Balloon Installations',
      description: 'Black, white and gold balloon arches styled to match the iconic Boss Baby business aesthetic — elegant and fun.',
    },
    {
      icon: '👶',
      title: 'Boss Baby Character Cutouts',
      description: 'Life-size Boss Baby cutouts and prop frames perfect for hilarious photo opportunities with the birthday star.',
    },
    {
      icon: '💼',
      title: 'Briefcase & CEO Prop Décor',
      description: 'Mini briefcases, "CEO" name boards, gold star badges and boardroom-style table accents for the full executive look.',
    },
    {
      icon: '🎂',
      title: 'Custom Boss Baby Cake',
      description: 'We coordinate Boss Baby character cakes, suit-patterned fondant cakes and smash cakes styled in boardroom theme.',
    },
    {
      icon: '📸',
      title: 'Themed Photography',
      description: 'Professional photographers to capture every precious "board meeting" moment of your little CEO\'s big day.',
    },
    {
      icon: '🏆',
      title: 'Child-Safe & Fun Setup',
      description: 'All materials are child-safe and non-toxic. Our setup team ensures a fun, safe environment for toddlers and kids.',
    },
  ],

  pricing: [
    {
      name: 'Starter',
      subtitle: 'Perfect for small CEO parties',
      price: 15000,
      featured: false,
      includes: [
        'Black & gold balloon arch',
        'Boss Baby backdrop & name banner',
        'Character cutout (1 piece)',
        'Cleanup & post-event support',
        'Up to 25 guests',
      ],
    },
    {
      name: 'Premium',
      subtitle: 'Our most popular Boss Baby package',
      price: 35000,
      featured: true,
      includes: [
        'Full balloon garland in theme colours',
        'Boss Baby character prop set',
        'Briefcase & CEO décor pieces',
        'Custom Boss Baby cake coordination',
        'Photography (2 hours)',
        'Themed stationery & name board',
        'Up to 60 guests',
      ],
    },
    {
      name: 'Luxury',
      subtitle: 'Grand CEO birthday experience',
      price: 65000,
      featured: false,
      includes: [
        'Bespoke Boss Baby theme design',
        'Full character & prop installations',
        'Boardroom-style table setup',
        'Full-day photography + video',
        'Dessert table styling',
        'Dedicated event manager',
        '75+ guests',
      ],
    },
  ],

  faqs: [
    {
      question: 'How much does Boss Baby birthday decoration cost in Bangalore?',
      answer:
        'Boss Baby birthday decoration in Bangalore starts from ₹15,000 for basic setups, up to ₹65,000 for full character installations with boardroom table setup, photography and a custom Boss Baby cake.',
    },
    {
      question: 'What props are included in a Boss Baby theme package?',
      answer:
        'Packages include black and gold balloon arches, Boss Baby character cutouts, briefcase décor, CEO name boards, custom cake coordination and themed stationery.',
    },
    {
      question: 'What age is Boss Baby theme best for?',
      answer:
        'Most popular for 1st, 2nd and 3rd birthdays. The adorable contrast of babies in suits is universally loved. It also works for baby shower gender reveals.',
    },
    {
      question: 'Can you add a boardroom table setup?',
      answer:
        'Yes! A mini boardroom-style table with briefcases, gold trimmings and CEO banners is a much-loved add-on and creates hilarious photos.',
    },
    {
      question: 'How do I book a Boss Baby birthday in Bangalore?',
      answer:
        'Click the WhatsApp button or fill in our consultation form. Our team will respond within a few hours to plan your little CEO\'s big day.',
    },
  ],
};

/* ─── Page Component ───────────────────────────────────────────────────── */
export default function BossBabyBirthdayDecorationBangalorePage() {
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
