import { Suspense } from 'react';
import { ogImages } from '../_seo';
import ServiceLandingPage from '../../components/ServiceLandingPage/ServiceLandingPage';

export const metadata = {
  title: { absolute: "Birthday Venues Whitefield — Eevagga" },
  description: 'Find the best birthday venues in Whitefield, Bangalore with Eevagga. Banquet halls, garden spaces, clubhouses & premium party venues in Whitefield. Venue + full decoration. Book today.',
  keywords: 'birthday venues Whitefield, birthday party halls Whitefield, birthday venue Whitefield Bangalore, party venues Whitefield, birthday planner Whitefield',
  alternates: { canonical: 'https://www.eevagga.com/birthday-venues-whitefield' },
  openGraph: {
    title: 'Birthday Venues Whitefield | Party Halls & Spaces — Eevagga',
    description: 'Best birthday venues in Whitefield, Bangalore. Banquet halls, garden spaces & clubhouses — venue scouting + full decoration by Eevagga.',
    url: 'https://www.eevagga.com/birthday-venues-whitefield', siteName: 'Eevagga', type: 'website', images: ogImages,
  },
  twitter: { card: 'summary_large_image', title: 'Birthday Venues Whitefield — Eevagga', description: 'Best birthday venues in Whitefield Bangalore. Halls, gardens & full planning.' },
};

const serviceSchema = {
  '@context': 'https://schema.org', '@type': 'Service',
  '@id': 'https://www.eevagga.com/birthday-venues-whitefield#service',
  name: 'Birthday Venues in Whitefield, Bangalore',
  description: 'Venue scouting and full decoration for birthday parties at Whitefield, Bangalore venues. Banquet halls, garden venues, resort spaces and clubhouse bookings with complete event planning.',
  provider: { '@id': 'https://www.eevagga.com/#organization' },
  serviceType: 'Birthday Venue Planning in Whitefield',
  areaServed: { '@type': 'Place', name: 'Whitefield, Bangalore' },
  url: 'https://www.eevagga.com/birthday-venues-whitefield',
  offers: { '@type': 'AggregateOffer', priceCurrency: 'INR', lowPrice: 15000, highPrice: 150000, offerCount: 3 },
};

const localBusinessSchema = {
  '@context': 'https://schema.org', '@type': 'LocalBusiness', name: 'Eevagga — Birthday Venue Planners Whitefield',
  url: 'https://www.eevagga.com', telephone: '+918050279101',
  address: { '@type': 'PostalAddress', addressLocality: 'Whitefield', addressRegion: 'Bangalore', addressCountry: 'IN' },
  areaServed: { '@type': 'Place', name: 'Whitefield, Bangalore' }, priceRange: '₹₹–₹₹₹',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.eevagga.com' },
    { '@type': 'ListItem', position: 2, name: 'Birthday Venues Bangalore', item: 'https://www.eevagga.com/birthday-venues-bangalore' },
    { '@type': 'ListItem', position: 3, name: 'Birthday Venues Whitefield', item: 'https://www.eevagga.com/birthday-venues-whitefield' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What are the best birthday venues in Whitefield, Bangalore?', acceptedAnswer: { '@type': 'Answer', text: 'Whitefield has several excellent birthday venues including clubhouses in premium gated communities, banquet halls near ITPL, garden venues along Sarjapur–Whitefield Road, hotel banquet rooms and resort spaces. Eevagga scouts and recommends the best options for your guest count and budget.' } },
    { '@type': 'Question', name: 'How much do birthday venues in Whitefield cost?', acceptedAnswer: { '@type': 'Answer', text: 'Birthday venues in Whitefield range from ₹8,000 for small clubhouse bookings to ₹1,00,000+ for premium hotel banquet halls. Eevagga helps you find venues within your budget and handles all decoration and planning.' } },
    { '@type': 'Question', name: 'Does Eevagga serve Whitefield for birthday party planning?', acceptedAnswer: { '@type': 'Answer', text: 'Yes! Whitefield is one of Eevagga\'s core service areas. We have planned 100+ birthday parties in Whitefield across ITPL, Marathahalli, Kadugodi and Varthur Road areas.' } },
    { '@type': 'Question', name: 'Can Eevagga decorate birthday venues in Whitefield?', acceptedAnswer: { '@type': 'Answer', text: 'Absolutely! We provide complete venue decoration in Whitefield — from balloon arches and themed backdrops to luxury floral installations and lighting setups. We handle every detail so you can enjoy the celebration.' } },
  ],
};

const pageConfig = {
  relatedLinks: [
    {
      "label": "Birthday Venues",
      "href": "/birthday-venues-bangalore"
    },
    {
      "label": "Indoor Birthday Venues",
      "href": "/indoor-birthday-venues-bangalore"
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
  title: 'Birthday Venues Whitefield',
  badge: 'Whitefield Birthday Specialists',
  h1: 'Birthday Venues in Whitefield, Bangalore — Scouted & Decorated by Eevagga',
  heroSubtitle: 'Celebrate in style across Whitefield. We scout the best banquet halls, garden venues, resort spaces and clubhouses in Whitefield and ITPL — then plan and decorate every detail for you.',
  heroImage: '/service-pages/birthday-hero.png',
  heroImageAlt: 'Birthday venue decoration in Whitefield Bangalore by Eevagga',
  stats: [
    { value: '100+', label: 'Whitefield Events' },
    { value: '4.9★', label: 'Average Rating' },
    { value: '20+', label: 'Venue Partners' },
    { value: '100%', label: 'Area Covered' },
  ],
  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'Birthday Venues Bangalore', href: '/birthday-venues-bangalore' },
    { label: 'Birthday Venues Whitefield' },
  ],
  gallery: [
    { src: '/service-pages/birthday-hero.png', alt: 'Birthday venue decoration Whitefield Bangalore', caption: 'Whitefield Venue' },
    { src: '/service-pages/birthday-gallery-1.png', alt: 'Garden birthday party Whitefield Bangalore', caption: 'Garden Party' },
    { src: '/service-pages/birthday-gallery-2.png', alt: 'Birthday hall setup Whitefield Bangalore', caption: 'Banquet Hall' },
    { src: '/service-pages/birthday-gallery-3.png', alt: 'Clubhouse birthday party Whitefield', caption: 'Clubhouse Setup' },
    { src: '/service-pages/birthday-gallery-4.png', alt: 'Resort birthday party Whitefield', caption: 'Resort Venue' },
  ],
  features: [
    { icon: '🏘️', title: 'Gated Community Clubhouses', description: 'Clubhouse bookings at top Whitefield gated communities — Prestige Shantiniketan, Brigade Metropolis, Vaishnavi Serene and more.' },
    { icon: '🏨', title: 'Hotel Banquet Halls', description: 'Hotel banquet rooms near ITPL and Whitefield Main Road — perfect for corporate-style birthday celebrations.' },
    { icon: '🌿', title: 'Garden & Outdoor Venues', description: 'Beautiful garden and open-air venues along Whitefield–Sarjapur Road for evening birthday celebrations.' },
    { icon: '🎨', title: 'Full Venue Decoration', description: 'Complete theme decoration — balloon arches, backdrops, florals and lighting — for any Whitefield venue you choose.' },
    { icon: '📸', title: 'Local Photography Team', description: 'Our Whitefield-based photography team is always ready for quick deployments across the area.' },
    { icon: '📋', title: 'End-to-End Whitefield Planning', description: 'From venue booking to catering, décor and cleanup — one Eevagga team manages your entire Whitefield birthday.' },
  ],
  pricing: [
    { name: 'Starter', subtitle: 'Basic Whitefield birthday setup', price: 15000, featured: false, includes: ['Venue scouting (Whitefield)', 'Balloon arch & backdrop décor', 'Basic table décor', 'Cleanup support', 'Up to 30 guests'] },
    { name: 'Premium', subtitle: 'Most popular Whitefield package', price: 42000, featured: true, includes: ['Venue booking coordination', 'Full theme decoration', 'Stage & backdrop', 'Photography (2 hours)', 'Catering coordination', 'Entertainment', 'Up to 100 guests'] },
    { name: 'Luxury', subtitle: 'Grand Whitefield celebration', price: 100000, featured: false, includes: ['Premium Whitefield venue sourcing', 'Bespoke luxury décor', 'Full-day photography + video', 'Live entertainment', 'Gourmet catering', 'Dedicated event manager', '120+ guests'] },
  ],
  faqs: [
    { question: 'What are the best birthday venues in Whitefield, Bangalore?', answer: 'Top Whitefield venues include clubhouses in Prestige Shantiniketan, Brigade Metropolis, hotel banquet halls near ITPL, garden venues on Whitefield–Sarjapur Road and resort spaces. Eevagga scouts options matched to your budget.' },
    { question: 'How much do birthday venues in Whitefield cost?', answer: 'Whitefield venues range from ₹8,000 for small clubhouse bookings to ₹1,00,000+ for premium hotel banquet halls. We handle all decoration and planning within your total event budget.' },
    { question: 'Does Eevagga serve Whitefield for birthday planning?', answer: 'Absolutely! Whitefield is one of our core service areas. We have planned 100+ birthdays across ITPL, Marathahalli, Kadugodi and Varthur Road.' },
    { question: 'Can Eevagga decorate birthday venues in Whitefield?', answer: 'Yes! We provide complete venue decoration in Whitefield — balloon arches, themed backdrops, luxury florals and lighting setups. We handle every detail.' },
    { question: 'How far in advance should I book a birthday venue in Whitefield?', answer: 'Whitefield venues — especially clubhouses — book 4–6 weeks in advance for weekends. Contact Eevagga early to secure the best dates.' },
  ],
};

export default function BirthdayVenuesWhitefieldPage() {
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
