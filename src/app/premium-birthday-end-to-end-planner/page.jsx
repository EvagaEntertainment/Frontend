import { Suspense } from 'react';
import { ogImages } from '../_seo';
import ServiceLandingPage from '../../components/ServiceLandingPage/ServiceLandingPage';

/* â”€â”€â”€ SEO Metadata â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
export const metadata = {
  title: "Premium Birthday End-to-End Event Planner â€” Eevagga",
  description:
    "Complete end-to-end birthday event planning. Eevagga manages your entire birthday celebration from invitations, venue booking, dÃ©cor, catering, entertainment to cleanup.",
  keywords:
    "premium birthday end to end planner, full service birthday planner, end to end birthday organizer Bangalore, Eevagga full service birthday, birthday event management",
  alternates: {
    canonical: 'https://www.eevagga.com/premium-birthday-end-to-end-planner',
  },
  openGraph: {
    title: "Premium Birthday End-to-End Event Planner â€” Eevagga",
    description:
      "Sit back and celebrate. Eevagga manages every detail of your birthday: custom invitations, venue booking, premium decors, catering coordination, and entertainment. Book a free consultation.",
    url: 'https://www.eevagga.com/premium-birthday-end-to-end-planner',
    siteName: 'Eevagga',
    type: 'website',
    images: ogImages,
  },
  twitter: {
    card: 'summary_large_image',
    title: "Premium Birthday End-to-End Event Planner â€” Eevagga",
    description: "Complete full-service birthday event management in Bangalore. Stress-free execution.",
  },
};

/* â”€â”€â”€ JSON-LD Schemas â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://www.eevagga.com/premium-birthday-end-to-end-planner#service',
  name: 'Premium Birthday End-to-End Event Planner',
  description:
    "Full-service end-to-end birthday event planning, management, and coordination in Bangalore. Covers venue selection, custom digital invitations, premium dÃ©cor design, catering, custom cake styling, live entertainment, and on-site support.",
  provider: { '@id': 'https://www.eevagga.com/#organization' },
  serviceType: 'End-to-End Birthday Event Management',
  areaServed: { '@type': 'City', name: 'Bangalore', sameAs: 'https://en.wikipedia.org/wiki/Bangalore' },
  url: 'https://www.eevagga.com/premium-birthday-end-to-end-planner',
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'INR',
    lowPrice: 25000,
    highPrice: 100000,
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
      name: 'Premium Birthday End-to-End Planner',
      item: 'https://www.eevagga.com/premium-birthday-end-to-end-planner',
    },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What does "end-to-end" birthday planning include?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'End-to-end planning means we handle every single detail: concept design, invitation cards, venue management, catering coordination, custom cakes, photography, entertainment, and final post-event cleaning. You simply show up as a guest!',
      },
    },
    {
      '@type': 'Question',
      name: 'Can you help us find and book a venue in Bangalore?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! We maintain partnerships with banquet halls, resorts, rooftop spaces, and restaurants across Bangalore and will help you shortlist and book the perfect venue based on your budget.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is there a dedicated manager on the day of the event?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. A dedicated event coordinator and operations manager will be on-site from start to finish to ensure everything runs exactly as planned, vendors deliver on time, and schedules are followed.',
      },
    },
  ],
};

/* â”€â”€â”€ Page Config â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const pageConfig = {
  title: 'Premium Birthday End-to-End Planner',
  badge: 'Total Event Management',
  h1: "Full Service End-to-End Premium Birthday Planner",
  heroSubtitle:
    "Sit back, relax, and enjoy the party. Eevagga handles the entire journey: from theme design and custom invitations to venue sourcing, premium catering, photography, and post-event cleanup.",
  heroImage: '/service-pages/birthday-hero.png',
  heroImageAlt: 'Premium fully managed birthday celebration and banquet hall decoration',

  stats: [
    { value: '200+', label: 'Managed Events' },
    { value: '100%', label: 'Stress-Free' },
    { value: 'All-Inclusive', label: 'Packages' },
    { value: '4.9â˜…', label: 'Client Reviews' },
  ],

  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Premium Birthday End-to-End Planner' },
  ],

  gallery: [
    {
      src: '/service-pages/birthday-hero.png',
      alt: 'Fully managed premium birthday event Bangalore',
      caption: 'Full Venue Makeover',
    },
    {
      src: '/service-pages/birthday-gallery-1.png',
      alt: 'Event registration and welcoming area',
      caption: 'Guest Reception',
    },
    {
      src: '/service-pages/birthday-gallery-2.png',
      alt: 'Luxury catering food station styling',
      caption: 'Food Station Styling',
    },
    {
      src: '/service-pages/birthday-gallery-3.png',
      alt: 'Birthday entertainment stage and host',
      caption: 'Entertainment Stage',
    },
    {
      src: '/service-pages/birthday-gallery-4.png',
      alt: 'Custom themed cake cutting table',
      caption: 'Cake Table Setup',
    },
  ],

  features: [
    {
      icon: 'ðŸ›ï¸',
      title: 'Venue Sourcing & Curation',
      description:
        'We help you find, negotiate, and book the perfect banquet hall, lawn, or rooftop venue in Bangalore.',
    },
    {
      icon: 'ðŸŽ«',
      title: 'Digital Invites & RSVP flows',
      description:
        'Custom design of digital invitations, managing guest list responses, and sending reminder notifications.',
    },
    {
      icon: 'ðŸ½ï¸',
      title: 'Premium Catering management',
      description:
        'Coordinate food menus, live station setups, high-quality tableware, and professional service staffs.',
    },
    {
      icon: 'ðŸŽª',
      title: 'Complete DÃ©cor & Lighting',
      description:
        'Thematic stage production, photobooths, entrance decors, ambient lighting, and floral accents.',
    },
    {
      icon: 'ðŸŽ¬',
      title: 'Full Entertainment & AV',
      description:
        'Game hosts, professional DJs, custom music playlists, sound speakers, projectors, and performance bookings.',
    },
    {
      icon: 'ðŸ§¹',
      title: 'On-Site Operations & Cleanup',
      description:
        'A dedicated on-site manager coordinates all vendors, timings, and manages final cleanup of the venue.',
    },
  ],

  pricing: [
    {
      name: 'Starter',
      subtitle: 'Complete event execution package',
      price: 25000,
      featured: false,
      includes: [
        'Complete theme decoration setup',
        'Basic sound setup + host',
        'Candid photography (2 hours)',
        'Event coordination supervisor',
        'Post-event dismantling & cleaning',
      ],
    },
    {
      name: 'Premium',
      subtitle: 'All-inclusive full service planning',
      price: 50000,
      featured: true,
      includes: [
        'Custom theme visual creation',
        'Professional photo & video highlight reel',
        'Premium sound, lighting & DJ booking',
        'Kids emcee & party games coordinator',
        'Custom themed cake coordination (2kg included)',
        '2 operations managers on site',
      ],
    },
    {
      name: 'Luxury',
      subtitle: 'Elite VIP event production',
      price: 100000,
      featured: false,
      includes: [
        'Grand bespoke stage & entry production',
        'Full digital invitation & RSVP manager',
        'Multi-cuisine catering coordination support',
        'Live entertainment (mascots + magician)',
        'Thematic candy/dessert bar setup',
        'Full operations squad (3-4 members) on-site',
      ],
    },
  ],

  faqs: [
    {
      question: 'What does "end-to-end" birthday planning include?',
      answer:
        'End-to-end planning means we handle every single detail: concept design, invitation cards, venue management, catering coordination, custom cakes, photography, entertainment, and final post-event cleaning. You simply show up as a guest!',
    },
    {
      question: 'Can you help us find and book a venue in Bangalore?',
      answer:
        'Yes! We maintain partnerships with banquet halls, resorts, rooftop spaces, and restaurants across Bangalore and will help you shortlist and book the perfect venue based on your budget.',
    },
    {
      question: 'Is there a dedicated manager on the day of the event?',
      answer:
        'Yes. A dedicated event coordinator and operations manager will be on-site from start to finish to ensure everything runs exactly as planned, vendors deliver on time, and schedules are followed.',
    },
    {
      question: 'How do you coordinate catering and cakes?',
      answer:
        'We work with leading caterers and bakers in Bangalore. We handle the design brief for the cake, tasting sessions for the menu (if needed), table setups, live counter logistics, and buffet layouts.',
    },
    {
      question: 'Can we change elements in the packages?',
      answer:
        'Absolutely. All our packages are customisable. We will tailor the services, decor elements, and catering options specifically to match your exact budget and preference.',
    },
  ],
};

/* â”€â”€â”€ Page Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
export default function PremiumBirthdayEndToEndPlannerPage() {
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
