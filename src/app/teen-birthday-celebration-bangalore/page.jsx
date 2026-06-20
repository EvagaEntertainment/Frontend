import { Suspense } from 'react';
import { ogImages } from '../_seo';
import ServiceLandingPage from '../../components/ServiceLandingPage/ServiceLandingPage';

/* ─── SEO Metadata ─────────────────────────────────────────────────────── */
export const metadata = {
  title: { absolute: "Teen Birthday Celebration Bangalore — Eevagga" },
  description:
    'Plan an epic teen birthday celebration in Bangalore with Eevagga. DJ nights, neon themes, photo booths, live performers & full teen party planning. Book your free consultation today.',
  keywords:
    'teen birthday celebration Bangalore, teenage birthday party Bangalore, teen birthday planner Bangalore, DJ birthday party Bangalore, teen birthday decoration Bangalore',
  alternates: {
    canonical: 'https://www.eevagga.com/teen-birthday-celebration-bangalore',
  },
  openGraph: {
    title: 'Teen Birthday Celebration Bangalore | DJ & Photo Booth — Eevagga',
    description:
      'DJ nights, neon themes & Instagram-ready photo booths. Epic teen birthday celebrations in Bangalore — fully planned by Eevagga.',
    url: 'https://www.eevagga.com/teen-birthday-celebration-bangalore',
    siteName: 'Eevagga',
    type: 'website',
    images: ogImages,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Teen Birthday Celebration Bangalore — Eevagga',
    description: 'Epic teen birthday parties in Bangalore. DJ, neon themes & photo booths — full planning.',
  },
};

/* ─── JSON-LD Schemas ──────────────────────────────────────────────────── */
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://www.eevagga.com/teen-birthday-celebration-bangalore#service',
  name: 'Teen Birthday Celebration Planning in Bangalore',
  description:
    'Full-service teen birthday party planning in Bangalore. DJ setups, neon glow themes, Instagram-ready photo booths, live performers, modern décor and complete on-ground event management.',
  provider: { '@id': 'https://www.eevagga.com/#organization' },
  serviceType: 'Teen Birthday Party Planning',
  areaServed: { '@type': 'City', name: 'Bangalore', sameAs: 'https://en.wikipedia.org/wiki/Bangalore' },
  url: 'https://www.eevagga.com/teen-birthday-celebration-bangalore',
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'INR',
    lowPrice: '20000',
    highPrice: '90000',
    offerCount: '3',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.eevagga.com' },
    { '@type': 'ListItem', position: 2, name: 'Birthday Planner Bangalore', item: 'https://www.eevagga.com/birthday-planner-bangalore' },
    { '@type': 'ListItem', position: 3, name: 'Teen Birthday Celebration Bangalore', item: 'https://www.eevagga.com/teen-birthday-celebration-bangalore' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much does a teen birthday party cost in Bangalore?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Teen birthday parties in Bangalore start from ₹20,000 for stylish décor and a photo booth, up to ₹90,000 for full DJ night setups with neon lighting, live performers, photography and catering coordination.',
      },
    },
    {
      '@type': 'Question',
      name: 'What themes are popular for teen birthdays in Bangalore?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Popular teen birthday themes in Bangalore include neon glow parties, disco/retro setups, Hollywood glamour, black and gold luxury, Bollywood night, sports themes and minimalist modern aesthetics — all of which Eevagga specialises in.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can Eevagga arrange a DJ for a teen birthday party in Bangalore?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! We coordinate professional DJ setups with sound systems, DJ consoles, LED lighting and fog machines for teen birthday parties across Bangalore — in banquet halls, gardens and open rooftops.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I have a photo booth at a teen birthday party in Bangalore?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely! Photo booths are one of the most popular teen party add-ons. We set up Instagram-ready photo booths with neon signs, balloon walls, ring lights and personalised props that teens love.',
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
      "label": "Kids Birthday Party",
      "href": "/kids-birthday-party-bangalore"
    },
    {
      "label": "Adult Birthday Planner",
      "href": "/adult-birthday-planner-bangalore"
    }
  ],
  title: 'Teen Birthday Celebration Bangalore',
  badge: 'Teen & Tween Party Experts',
  h1: 'Teen Birthday Celebration in Bangalore — Epic Parties by Eevagga',
  heroSubtitle:
    'Make 13, 16, 18 or any teen birthday absolutely unforgettable. DJ nights, neon glow setups, Instagram photo booths and full end-to-end party planning crafted for teenagers across Bangalore.',
  heroImage: '/service-pages/birthday-hero.png',
  heroImageAlt: 'Teen birthday celebration decoration in Bangalore by Eevagga',

  stats: [
    { value: '200+', label: 'Teen Parties Planned' },
    { value: '4.9★', label: 'Average Rating' },
    { value: '15+', label: 'Cool Themes' },
    { value: '100%', label: 'Instagram-Worthy' },
  ],

  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'Birthday Planner Bangalore', href: '/birthday-planner-bangalore' },
    { label: 'Teen Birthday Celebration Bangalore' },
  ],

  gallery: [
    { src: '/service-pages/birthday-hero.png', alt: 'Teen birthday party decoration Bangalore', caption: 'Neon Glow Setup' },
    { src: '/service-pages/birthday-gallery-1.png', alt: 'DJ setup teen birthday Bangalore', caption: 'DJ Night Setup' },
    { src: '/service-pages/birthday-gallery-2.png', alt: 'Teen photo booth birthday Bangalore', caption: 'Photo Booth' },
    { src: '/service-pages/birthday-gallery-3.png', alt: 'Modern teen birthday stage Bangalore', caption: 'LED Stage Setup' },
    { src: '/service-pages/birthday-gallery-4.png', alt: 'Neon balloon arch teen party Bangalore', caption: 'Neon Balloon Wall' },
  ],

  features: [
    {
      icon: '🎧',
      title: 'DJ Setup & Sound System',
      description: 'Professional DJ consoles, high-quality sound systems, LED lighting and fog machines for the ultimate teen dance party.',
    },
    {
      icon: '💡',
      title: 'Neon Glow & LED Décor',
      description: 'Neon signs, LED balloon walls, glow-in-the-dark elements and strip lighting creating a stunning modern party atmosphere.',
    },
    {
      icon: '📸',
      title: 'Instagram-Ready Photo Booth',
      description: 'Neon sign backdrops, balloon walls, ring lights and personalised props — the ultimate Insta-worthy photo booth teens love.',
    },
    {
      icon: '🎤',
      title: 'Live Performers & Emcee',
      description: 'Live singers, dancers, beatboxers, emcees and interactive game hosts to keep the energy high all night.',
    },
    {
      icon: '🎨',
      title: 'Trendy Theme Design',
      description: 'Neon glow, retro disco, Bollywood night, Hollywood glam — we design themes that feel current, cool and uniquely personal.',
    },
    {
      icon: '🎂',
      title: 'Statement Birthday Cake',
      description: 'Trendy drip cakes, LED-lit cakes and custom fondant designs coordinated with Bangalore\'s top cake artists.',
    },
  ],

  pricing: [
    {
      name: 'Starter',
      subtitle: 'Cool intimate teen party',
      price: 20000,
      featured: false,
      includes: [
        'Modern balloon arch & backdrop',
        'Neon signs & LED accents',
        'Birthday photo frame prop',
        'Cleanup & support',
        'Up to 30 guests',
      ],
    },
    {
      name: 'Premium',
      subtitle: 'Our most popular teen package',
      price: 45000,
      featured: true,
      includes: [
        'Full neon theme décor',
        'Instagram photo booth setup',
        'DJ setup (3 hours)',
        'Photography (2 hours)',
        'Statement birthday cake',
        'Themed stationery & props',
        'Up to 80 guests',
      ],
    },
    {
      name: 'Luxury',
      subtitle: 'Epic milestone teen celebration',
      price: 90000,
      featured: false,
      includes: [
        'Bespoke neon/glow theme design',
        'Full DJ + live performer',
        'Premium photo booth',
        'Full-day photography + video',
        'Catering coordination',
        'Dedicated event manager',
        '100+ guests',
      ],
    },
  ],

  faqs: [
    {
      question: 'How much does a teen birthday party cost in Bangalore?',
      answer:
        'Teen birthday parties in Bangalore start from ₹20,000 for stylish décor and photo booth setups, up to ₹90,000 for full DJ nights with live performers, neon lighting and catering coordination.',
    },
    {
      question: 'What themes work best for teen birthdays in Bangalore?',
      answer:
        'Popular teen themes include neon glow parties, retro disco, Bollywood night, Hollywood glam, sports themes, black and gold luxury, and minimalist modern aesthetics.',
    },
    {
      question: 'Can Eevagga arrange a DJ for a teen birthday in Bangalore?',
      answer:
        'Yes! We coordinate professional DJs with full sound systems, LED lighting and fog machines for teen parties in banquet halls, gardens and rooftops across Bangalore.',
    },
    {
      question: 'Can I have a photo booth at a teen birthday party?',
      answer:
        'Absolutely! Photo booths are our most popular teen party add-on. Neon signs, balloon walls, ring lights and custom props — the perfect Instagram setup for teens.',
    },
    {
      question: 'How far in advance should I book a teen birthday celebration?',
      answer:
        'We recommend 2–3 weeks in advance. DJ slots and photo booth equipment need advance booking, especially for weekend events.',
    },
  ],
};

/* ─── Page Component ───────────────────────────────────────────────────── */
export default function TeenBirthdayCelebrationBangalorePage() {
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
