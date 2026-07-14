import { Suspense } from 'react';
import { ogImages } from '../_seo';
import ServiceLandingPage from '../../components/ServiceLandingPage/ServiceLandingPage';

/* ─── SEO Metadata ─────────────────────────────────────────────────────── */
export const metadata = {
  title: { absolute: "Jungle Theme Birthday Bangalore — Eevagga" },
  description:
    'Plan a wild jungle theme birthday party in Bangalore with Eevagga. Safari décor, tropical florals, animal props & end-to-end planning. Book your free consultation today.',
  keywords:
    'jungle theme birthday Bangalore, safari birthday party Bangalore, jungle birthday decoration Bangalore, jungle theme birthday planner Bangalore',
  alternates: {
    canonical: 'https://www.eevagga.com/jungle-theme-birthday-bangalore',
  },
  openGraph: {
    title: 'Jungle Theme Birthday Bangalore | Safari Party Planners — Eevagga',
    description:
      'Safari props, tropical florals & wild animal décor. Jungle theme birthday parties in Bangalore — fully planned by Eevagga.',
    url: 'https://www.eevagga.com/jungle-theme-birthday-bangalore',
    siteName: 'Eevagga',
    type: 'website',
    images: ogImages,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jungle Theme Birthday Bangalore — Eevagga',
    description: 'Wild jungle & safari theme birthday parties in Bangalore. Tropical décor & full planning.',
  },
};

/* ─── JSON-LD Schemas ──────────────────────────────────────────────────── */
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://www.eevagga.com/jungle-theme-birthday-bangalore#service',
  name: 'Jungle Theme Birthday Party in Bangalore',
  description:
    'Full-service jungle and safari theme birthday planning in Bangalore. Includes tropical balloon arrangements, animal prop installations, jungle foliage walls, themed cake coordination and on-ground execution.',
  provider: { '@id': 'https://www.eevagga.com/#organization' },
  serviceType: 'Jungle Theme Birthday Party Planning',
  areaServed: { '@type': 'City', name: 'Bangalore', sameAs: 'https://en.wikipedia.org/wiki/Bangalore' },
  url: 'https://www.eevagga.com/jungle-theme-birthday-bangalore',
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'INR',
    lowPrice: 18000,
    highPrice: 70000,
    offerCount: 3,
  },
};

const eventSchema = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: 'Jungle Theme Birthday Party — Eevagga Bangalore',
  description:
    'A wild jungle and safari theme birthday celebration curated by Eevagga in Bangalore with tropical décor, animal props, foliage walls and full event management.',
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
    price: '18000',
    url: 'https://www.eevagga.com/jungle-theme-birthday-bangalore',
    availability: 'https://schema.org/InStock',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.eevagga.com' },
    { '@type': 'ListItem', position: 2, name: 'Birthday Planner Bangalore', item: 'https://www.eevagga.com/birthday-planner-bangalore' },
    { '@type': 'ListItem', position: 3, name: 'Jungle Theme Birthday Bangalore', item: 'https://www.eevagga.com/jungle-theme-birthday-bangalore' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much does a jungle theme birthday party cost in Bangalore?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A jungle theme birthday party in Bangalore starts from ₹18,000 for a basic setup with green balloon décor and animal props, up to ₹70,000 for a luxury setup with a full foliage wall installation, live entertainment and photography.',
      },
    },
    {
      '@type': 'Question',
      name: 'What props are included in a jungle theme birthday?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our jungle theme includes green and earthy balloon arrangements, tropical leaf backdrops, animal cut-out props (lions, elephants, giraffes), foliage walls, safari-themed cake coordination and matching stationery.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is a jungle theme good for outdoor birthday parties?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! Jungle themes work beautifully for outdoor garden parties in Bangalore. We add natural foliage installations, hanging lanterns and earthy colour palettes that complement outdoor settings perfectly.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which age groups are jungle theme birthdays best for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Jungle themes are incredibly popular for 1st to 5th birthdays where animal characters captivate young children. We also create sophisticated safari-inspired setups for adult milestone birthdays.',
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
      "label": "Barbie Theme Birthday",
      "href": "/barbie-theme-birthday-bangalore"
    },
    {
      "label": "Space Theme Birthday",
      "href": "/space-theme-birthday-bangalore"
    },
    {
      "label": "Cocomelon Birthday Theme",
      "href": "/cocomelon-birthday-theme-bangalore"
    }
  ],
  title: 'Jungle Theme Birthday Bangalore',
  badge: 'Safari & Jungle Theme Experts',
  h1: 'Jungle Theme Birthday Party in Bangalore — Wild Celebrations by Eevagga',
  heroSubtitle:
    'Bring the wilderness to your celebration. Tropical balloon arrangements, lush foliage walls, animal props and a full safari experience — all planned end-to-end by Eevagga in Bangalore.',
  heroImage: '/service-pages/birthday-hero.png',
  heroImageAlt: 'Jungle theme birthday decoration in Bangalore by Eevagga',

  stats: [
    { value: '150+', label: 'Theme Events Done' },
    { value: '4.9★', label: 'Average Rating' },
    { value: '100%', label: 'Custom Setups' },
    { value: '48hr', label: 'Setup Turnaround' },
  ],

  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'Birthday Planner Bangalore', href: '/birthday-planner-bangalore' },
    { label: 'Jungle Theme Birthday Bangalore' },
  ],

  gallery: [
    { src: '/service-pages/birthday-hero.png', alt: 'Jungle theme birthday decoration Bangalore', caption: 'Jungle Foliage Wall' },
    { src: '/service-pages/birthday-gallery-1.png', alt: 'Safari birthday party setup Bangalore', caption: 'Safari Props' },
    { src: '/service-pages/birthday-gallery-2.png', alt: 'Jungle cake and dessert table Bangalore', caption: 'Jungle Dessert Table' },
    { src: '/service-pages/birthday-gallery-3.png', alt: 'Animal theme stage decoration Bangalore', caption: 'Animal Stage' },
    { src: '/service-pages/birthday-gallery-4.png', alt: 'Tropical birthday balloon décor Bangalore', caption: 'Tropical Balloons' },
  ],

  features: [
    {
      icon: '🌿',
      title: 'Lush Foliage Walls & Backdrops',
      description: 'Real and artificial tropical leaf arrangements create an immersive jungle canopy for your celebration space.',
    },
    {
      icon: '🦁',
      title: 'Animal Props & Character Cutouts',
      description: 'Lions, elephants, giraffes, zebras — our 3D animal props and character standees add authentic jungle charm.',
    },
    {
      icon: '🎈',
      title: 'Earthy Balloon Installations',
      description: 'Organic balloon arrangements in green, brown, gold and cream tones complement the wild jungle aesthetic perfectly.',
    },
    {
      icon: '🎂',
      title: 'Safari Cake Coordination',
      description: 'We coordinate custom jungle and safari themed cakes featuring fondant animals, edible trees and earthy textures.',
    },
    {
      icon: '📸',
      title: 'Professional Photography',
      description: 'Capture every wild moment with our professional photography team, experienced in themed birthday setups.',
    },
    {
      icon: '🏕️',
      title: 'Indoor & Outdoor Setups',
      description: 'Whether at home, a banquet hall or a garden space, our jungle theme adapts beautifully to any venue.',
    },
  ],

};

/* ─── Page Component ───────────────────────────────────────────────────── */
export default function JungleThemeBirthdayBangalorePage() {
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