import { Suspense } from 'react';
import { ogImages } from '../_seo';
import ServiceLandingPage from '../../components/ServiceLandingPage/ServiceLandingPage';

/* ─── SEO Metadata ─────────────────────────────────────────────────────── */
export const metadata = {
  title: { absolute: "Best Birthday Party Planner in Bangalore — Eevagga" },
  description:
    'Looking for a birthday planner in Bangalore? Eevagga offers end-to-end birthday planning — themes, decorations, photography, catering & venue coordination. Book your free consultation today.',
  keywords:
    'birthday planner Bangalore, birthday planning Bangalore, birthday event planner Bangalore, birthday party planner Bangalore, Eevagga birthday planner',
  alternates: {
    canonical: 'https://www.eevagga.com/birthday-planner-bangalore',
  },
  openGraph: {
    title: 'Birthday Planner in Bangalore | Premium Birthday Planning — Eevagga',
    description:
      'End-to-end birthday planning in Bangalore — themes, décor, photography & full execution. 500+ events delivered. Get your free consultation.',
    url: 'https://www.eevagga.com/birthday-planner-bangalore',
    siteName: 'Eevagga',
    type: 'website',
    images: ogImages,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Birthday Planner in Bangalore — Eevagga',
    description: 'Premium birthday planning in Bangalore. End-to-end themes, décor & execution.',
  },
};

/* ─── JSON-LD Schemas ──────────────────────────────────────────────────── */
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://www.eevagga.com/birthday-planner-bangalore#service',
  name: 'Birthday Planner in Bangalore',
  description:
    'Full-service birthday planning in Bangalore. Includes theme design, balloon and floral decoration, venue coordination, photography, entertainment and on-ground execution.',
  provider: { '@id': 'https://www.eevagga.com/#organization' },
  serviceType: 'Birthday Party Planning',
  areaServed: { '@type': 'City', name: 'Bangalore', sameAs: 'https://en.wikipedia.org/wiki/Bangalore' },
  url: 'https://www.eevagga.com/birthday-planner-bangalore',
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'INR',
    lowPrice: '15000',
    highPrice: '150000',
    offerCount: '3',
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
      name: 'Birthday Planner Bangalore',
      item: 'https://www.eevagga.com/birthday-planner-bangalore',
    },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What does a birthday planner in Bangalore do?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A birthday planner handles all aspects of your birthday celebration — from theme selection and décor setup to photography, catering coordination, entertainment and on-ground management. Eevagga provides full end-to-end birthday planning in Bangalore so you can celebrate stress-free.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does a birthday planner cost in Bangalore?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Birthday planning costs in Bangalore typically start from ₹15,000 for intimate setups and can go up to ₹1,50,000+ for large luxury celebrations. Eevagga offers three packages — Starter (₹15,000), Premium (₹35,000) and Luxury (₹65,000) — all fully customisable.',
      },
    },
    {
      '@type': 'Question',
      name: 'How far in advance should I book a birthday planner in Bangalore?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We recommend booking at least 2–3 weeks in advance to secure your preferred date, theme and venue. For milestone birthdays or large events (100+ guests), booking 4–6 weeks ahead ensures the best options.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Eevagga serve all areas of Bangalore?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! Eevagga serves all major areas of Bangalore including Koramangala, Indiranagar, Whitefield, HSR Layout, Sarjapur, Bellandur, Hebbal, Electronic City, JP Nagar and Yelahanka.',
      },
    },
  ],
};

/* ─── Page Config ──────────────────────────────────────────────────────── */
const pageConfig = {
  relatedLinks: [
    {
      "label": "Kids Birthday Planner",
      "href": "/kids-birthday-planner-bangalore"
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
  title: 'Birthday Planner Bangalore',
  badge: 'Premium Birthday Planning',
  h1: "Bangalore's Premier Birthday Planner \u2014 Stress-Free Celebrations",
  heroSubtitle:
    "From intimate gatherings to grand celebrations, Eevagga crafts unforgettable birthday experiences with bespoke themes, flawless d\u00e9cor and end-to-end planning across Bangalore.",
  heroImage: '/service-pages/birthday-hero.png',
  heroImageAlt: 'Premium birthday decoration setup in Bangalore by Eevagga',

  stats: [
    { value: '500+', label: 'Events Delivered' },
    { value: '4.9★', label: 'Average Rating' },
    { value: '22+', label: 'Themes Available' },
    { value: '100%', label: 'Stress-Free' },
  ],

  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Birthday Planner Bangalore' },
  ],

  gallery: [
    {
      src: '/service-pages/birthday-hero.png',
      alt: 'Luxury birthday decoration Bangalore',
      caption: 'Grand Hall Setup',
    },
    {
      src: '/service-pages/birthday-gallery-1.png',
      alt: 'Elegant outdoor birthday celebration Bangalore',
      caption: 'Garden Party',
    },
    {
      src: '/service-pages/birthday-gallery-2.png',
      alt: 'Birthday cake and dessert table decoration',
      caption: 'Dessert Table',
    },
    {
      src: '/service-pages/birthday-gallery-3.png',
      alt: 'Stage decoration birthday party Bangalore',
      caption: 'Stage Setup',
    },
    {
      src: '/service-pages/birthday-gallery-4.png',
      alt: 'Balloon arch birthday party Bangalore',
      caption: 'Balloon Arch',
    },
  ],

  features: [
    {
      icon: '🎨',
      title: 'Theme Design & Conceptualisation',
      description:
        'Our designers create a cohesive, personalised theme — from colour palettes and mood boards to every last decoration detail.',
    },
    {
      icon: '🎈',
      title: 'Balloon & Floral Décor',
      description:
        'Premium organic balloon arrangements, floral arches and centrepieces crafted by our specialist décor team.',
    },
    {
      icon: '📸',
      title: 'Photography & Videography',
      description:
        'Professional photographers and videographers to capture every magical moment of your celebration.',
    },
    {
      icon: '🎂',
      title: 'Custom Cake Coordination',
      description:
        "We coordinate with Bangalore's top bakers to deliver themed custom cakes that wow your guests.",
    },
    {
      icon: '🎤',
      title: 'Entertainment & Emcee',
      description:
        'Games, live music, DJs, emcees and performers — we curate entertainment to keep your guests engaged.',
    },
    {
      icon: '🏠',
      title: 'Venue Coordination',
      description:
        "Whether it's your home, a banquet hall or an outdoor space, we coordinate every logistics detail.",
    },
  ],

  pricing: [
    {
      name: 'Starter',
      subtitle: 'Perfect for intimate celebrations',
      price: 15000,
      featured: false,
      includes: [
        'Theme consultation',
        'Balloon & basic décor setup',
        'Birthday backdrop & signage',
        'Cleanup & post-event support',
        'Up to 30 guests',
      ],
    },
    {
      name: 'Premium',
      subtitle: 'Our most popular package',
      price: 35000,
      featured: true,
      includes: [
        'Full theme design & execution',
        'Premium balloon & floral décor',
        'Stage setup & backdrop',
        'Photography (2 hours)',
        'Custom cake coordination',
        'Entertainment coordination',
        'Up to 75 guests',
      ],
    },
    {
      name: 'Luxury',
      subtitle: 'Grand, unforgettable celebrations',
      price: 65000,
      featured: false,
      includes: [
        'Bespoke theme & full styling',
        'Luxury floral & prop installations',
        'Full-day photography + video',
        'Live entertainment / DJ',
        'Catering coordination',
        'Dedicated event manager',
        '100+ guests',
      ],
    },
  ],

  faqs: [
    {
      question: 'What does a birthday planner in Bangalore do?',
      answer:
        'A birthday planner handles all aspects of your birthday celebration — from theme selection and décor setup to photography, catering coordination, entertainment and on-ground management. Eevagga provides full end-to-end birthday planning in Bangalore so you can celebrate stress-free.',
    },
    {
      question: 'How much does a birthday planner cost in Bangalore?',
      answer:
        'Birthday planning costs in Bangalore typically start from ₹15,000 for intimate setups and can go up to ₹1,50,000+ for large luxury celebrations. Our packages are fully customisable based on your requirements.',
    },
    {
      question: 'How far in advance should I book a birthday planner?',
      answer:
        'We recommend booking at least 2–3 weeks in advance to secure your preferred date, theme and venue. For large or milestone birthday events, 4–6 weeks ahead is ideal.',
    },
    {
      question: 'Which areas of Bangalore does Eevagga serve?',
      answer:
        'Eevagga serves all major areas of Bangalore including Koramangala, Indiranagar, Whitefield, HSR Layout, Sarjapur, Bellandur, Hebbal, Electronic City, JP Nagar and Yelahanka.',
    },
    {
      question: "Can I customise a package beyond what's listed?",
      answer:
        "Absolutely! All our packages are a starting point. We work closely with every client to build a fully bespoke experience. Just reach us on WhatsApp and we'll craft a custom quote.",
    },
  ],
  reviews: [
    {
      author: "Priya Sharma",
      rating: 5,
      text: "Eevagga made our son's 1st birthday party absolutely spectacular! The jungle theme decor was stunning, and the emcee kept the kids engaged the whole time. High-quality photography too!",
      date: "2026-05-15"
    },
    {
      author: "Rahul Nair",
      rating: 5,
      text: "Extremely professional birthday planners in Bangalore. They handled everything from theme setup to cleanup, allowing us to enjoy the party stress-free. Highly recommended!",
      date: "2026-06-01"
    },
    {
      author: "Anjali Gupta",
      rating: 5,
      text: "Beautiful balloon arches and floral decorations. Eevagga's package options are transparent and they customized everything to our budget. Excellent service!",
      date: "2026-06-10"
    }
  ],
};

/* ─── Page Component ───────────────────────────────────────────────────── */
export default function BirthdayPlannerBangalorePage() {
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
