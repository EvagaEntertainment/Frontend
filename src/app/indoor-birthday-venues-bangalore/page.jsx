import { Suspense } from 'react';
import { ogImages } from '../_seo';
import ServiceLandingPage from '../../components/ServiceLandingPage/ServiceLandingPage';

export const metadata = {
  title: { absolute: "Indoor Birthday Venues Bangalore — Eevagga" },
  description:
    'Find the best indoor birthday venues in Bangalore with Eevagga. Air-conditioned banquet halls, private dining rooms, AV-ready spaces & full decoration. Book your free consultation today.',
  keywords:
    'indoor birthday venues Bangalore, AC birthday halls Bangalore, indoor birthday party Bangalore, birthday banquet hall Bangalore, indoor party venue Bangalore',
  alternates: { canonical: 'https://www.eevagga.com/indoor-birthday-venues-bangalore' },
  openGraph: {
    title: 'Indoor Birthday Venues Bangalore | AC Halls & Private Spaces — Eevagga',
    description: 'AC banquet halls, private dining rooms & AV-ready indoor birthday venues in Bangalore — scouted and decorated by Eevagga.',
    url: 'https://www.eevagga.com/indoor-birthday-venues-bangalore',
    siteName: 'Eevagga',
    type: 'website',
    images: ogImages,
  },
  twitter: { card: 'summary_large_image', title: 'Indoor Birthday Venues Bangalore — Eevagga', description: 'Best indoor birthday venues in Bangalore. AC halls, private spaces & full planning.' },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://www.eevagga.com/indoor-birthday-venues-bangalore#service',
  name: 'Indoor Birthday Venues in Bangalore',
  description: 'Venue scouting and decoration for indoor birthday parties in Bangalore. Climate-controlled banquet halls, private dining rooms, clubhouses and AV-equipped event spaces.',
  provider: { '@id': 'https://www.eevagga.com/#organization' },
  serviceType: 'Indoor Birthday Venue Planning',
  areaServed: { '@type': 'City', name: 'Bangalore', sameAs: 'https://en.wikipedia.org/wiki/Bangalore' },
  url: 'https://www.eevagga.com/indoor-birthday-venues-bangalore',
  offers: { '@type': 'AggregateOffer', priceCurrency: 'INR', lowPrice: '12000', highPrice: '150000', offerCount: '3' },
};

const localBusinessSchema = {
  '@context': 'https://schema.org', '@type': 'LocalBusiness', name: 'Eevagga — Indoor Birthday Venue Planners Bangalore',
  url: 'https://www.eevagga.com', telephone: '+918050279101',
  address: { '@type': 'PostalAddress', addressLocality: 'Bangalore', addressRegion: 'Karnataka', addressCountry: 'IN' },
  areaServed: { '@type': 'City', name: 'Bangalore' }, priceRange: '₹₹–₹₹₹',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.eevagga.com' },
    { '@type': 'ListItem', position: 2, name: 'Birthday Venues Bangalore', item: 'https://www.eevagga.com/birthday-venues-bangalore' },
    { '@type': 'ListItem', position: 3, name: 'Indoor Birthday Venues Bangalore', item: 'https://www.eevagga.com/indoor-birthday-venues-bangalore' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What are the best indoor birthday venues in Bangalore?', acceptedAnswer: { '@type': 'Answer', text: 'Bangalore has excellent indoor birthday venues including AC banquet halls in Koramangala, Indiranagar and HSR Layout, private dining rooms at premium restaurants, clubhouses in gated communities and dedicated event studios. Eevagga scouts the best options for your guest count and budget.' } },
    { '@type': 'Question', name: 'What is the cost of hiring an indoor birthday venue in Bangalore?', acceptedAnswer: { '@type': 'Answer', text: 'Indoor birthday venue hire in Bangalore starts from ₹5,000 for small private rooms (15–20 guests) to ₹80,000+ for large AC banquet halls (200+ guests). Eevagga helps you find the right venue and decorates it completely within your total event budget.' } },
    { '@type': 'Question', name: 'Are indoor venues better than outdoor venues for birthdays in Bangalore?', acceptedAnswer: { '@type': 'Answer', text: 'Indoor venues offer year-round comfort, climate control, AV facilities and no weather dependency — making them ideal for Bangalore\'s monsoon season (June–September) and hot summer months. Outdoor venues are great for evening events during cooler months.' } },
    { '@type': 'Question', name: 'Can Eevagga decorate any indoor birthday venue in Bangalore?', acceptedAnswer: { '@type': 'Answer', text: 'Yes! Eevagga\'s decoration team works with any indoor venue across Bangalore. We bring all materials, props and lighting — transforming any plain hall into a stunning themed birthday space.' } },
  ],
};

const pageConfig = {
  relatedLinks: [
    {
      "label": "Birthday Venues",
      "href": "/birthday-venues-bangalore"
    },
    {
      "label": "Birthday Venues Whitefield",
      "href": "/birthday-venues-whitefield"
    },
    {
      "label": "Birthday Party Resorts",
      "href": "/birthday-party-resorts-bangalore"
    },
    {
      "label": "Birthday Venues Under 50k",
      "href": "/birthday-venues-under-50k-bangalore"
    }
  ],
  title: 'Indoor Birthday Venues Bangalore',
  badge: 'Indoor Venue Specialists',
  h1: 'Indoor Birthday Venues in Bangalore — Climate-Controlled Celebrations by Eevagga',
  heroSubtitle: 'Beat the heat and the rain with a stunning indoor birthday party. We scout the best AC banquet halls, private dining rooms and event studios across Bangalore — then decorate them beautifully.',
  heroImage: '/service-pages/birthday-hero.png',
  heroImageAlt: 'Indoor birthday venue decoration in Bangalore by Eevagga',
  stats: [
    { value: '35+', label: 'Indoor Venues Curated' },
    { value: '500+', label: 'Events Delivered' },
    { value: '4.9★', label: 'Average Rating' },
    { value: '100%', label: 'Climate Controlled' },
  ],
  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'Birthday Venues Bangalore', href: '/birthday-venues-bangalore' },
    { label: 'Indoor Birthday Venues Bangalore' },
  ],
  gallery: [
    { src: '/service-pages/birthday-hero.png', alt: 'Indoor birthday venue decoration Bangalore', caption: 'AC Banquet Hall' },
    { src: '/service-pages/birthday-gallery-1.png', alt: 'Private dining room birthday Bangalore', caption: 'Private Dining Room' },
    { src: '/service-pages/birthday-gallery-2.png', alt: 'Indoor birthday party table setup Bangalore', caption: 'Table Styling' },
    { src: '/service-pages/birthday-gallery-3.png', alt: 'AC birthday hall stage Bangalore', caption: 'Hall Stage' },
    { src: '/service-pages/birthday-gallery-4.png', alt: 'Indoor balloon arch birthday Bangalore', caption: 'Indoor Balloon Arch' },
  ],
  features: [
    { icon: '❄️', title: 'Fully Air-Conditioned Spaces', description: 'Climate-controlled banquet halls and event spaces ensuring comfort for all guests regardless of Bangalore\'s weather.' },
    { icon: '🎙️', title: 'AV-Ready & Sound Systems', description: 'Venues pre-equipped with PA systems, projectors, screens and microphones — perfect for speeches, slideshows and entertainment.' },
    { icon: '🍽️', title: 'Private Dining Rooms', description: 'Exclusive private dining rooms at top Bangalore restaurants for intimate milestone birthday dinners.' },
    { icon: '🏘️', title: 'Clubhouse & Community Halls', description: 'Curated clubhouse and community hall options in Whitefield, Sarjapur and HSR Layout — great value for mid-size parties.' },
    { icon: '🎨', title: 'Full Indoor Decoration', description: 'Our team transforms any indoor space with theme décor, balloon installations, lighting setups and floral arrangements.' },
    { icon: '📋', title: 'Complete Event Management', description: 'From venue booking to decoration, catering and cleanup — we manage every detail inside your chosen indoor venue.' },
  ],
  pricing: [
    { name: 'Starter', subtitle: 'Small indoor birthday setup', price: 12000, featured: false, includes: ['Indoor venue scouting', 'Balloon arch & backdrop décor', 'Basic table décor', 'Cleanup support', 'Up to 25 guests'] },
    { name: 'Premium', subtitle: 'Most popular indoor package', price: 40000, featured: true, includes: ['Indoor venue booking coordination', 'Full theme decoration', 'Stage & backdrop setup', 'Photography (2 hours)', 'Catering coordination', 'Entertainment', 'Up to 80 guests'] },
    { name: 'Luxury', subtitle: 'Grand indoor celebration', price: 100000, featured: false, includes: ['Premium indoor venue sourcing', 'Bespoke luxury décor', 'Full-day photography + video', 'Live entertainment', 'Gourmet catering', 'Dedicated event manager', '120+ guests'] },
  ],
  faqs: [
    { question: 'What are the best indoor birthday venues in Bangalore?', answer: 'Excellent indoor venues include AC banquet halls in Koramangala and Indiranagar, private dining rooms at premium restaurants, clubhouses in gated communities and dedicated event studios. Eevagga scouts the best for your budget and guest count.' },
    { question: 'What does an indoor birthday venue cost in Bangalore?', answer: 'Indoor venue hire ranges from ₹5,000 for small private rooms to ₹80,000+ for large AC halls. Eevagga helps you find the right venue and decorates it fully within your total event budget.' },
    { question: 'Are indoor venues better for Bangalore birthdays?', answer: 'Indoor venues offer year-round comfort and no weather dependency — ideal during Bangalore\'s monsoon (June–September) and hot summer months. They also come with AV facilities and controlled ambience.' },
    { question: 'Can Eevagga decorate any indoor venue in Bangalore?', answer: 'Yes! Our decoration team works with any indoor venue. We bring all materials, props and lighting to transform any plain hall into a stunning themed birthday space.' },
    { question: 'How far in advance should I book an indoor birthday venue?', answer: 'Popular indoor venues book 4–6 weeks in advance for weekends. Contact Eevagga early to secure the best options and dates.' },
  ],
};

export default function IndoorBirthdayVenuesBangalorePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }} />
      <Suspense fallback={null}><ServiceLandingPage config={pageConfig} /></Suspense>
    </>
  );
}
