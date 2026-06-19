import { Suspense } from 'react';
import { ogImages } from '../_seo';
import ServiceLandingPage from '../../components/ServiceLandingPage/ServiceLandingPage';

export const metadata = {
  title: 'Birthday Venues Under 50K Bangalore | Budget Party Halls — Eevagga',
  description: 'Find the best birthday venues under ₹50,000 in Bangalore with Eevagga. Affordable banquet halls, home parties, budget-friendly venues + full decoration. Book your free consultation today.',
  keywords: 'birthday venues under 50000 Bangalore, budget birthday venues Bangalore, affordable birthday halls Bangalore, birthday party under 50k Bangalore, cheap birthday venues Bangalore',
  alternates: { canonical: 'https://www.eevagga.com/birthday-venues-under-50k-bangalore' },
  openGraph: {
    title: 'Birthday Venues Under 50K Bangalore | Budget Party Halls — Eevagga',
    description: 'Affordable birthday venues under ₹50,000 in Bangalore. Banquet halls, home parties & budget venues — full decoration by Eevagga.',
    url: 'https://www.eevagga.com/birthday-venues-under-50k-bangalore', siteName: 'Eevagga', type: 'website', images: ogImages,
  },
  twitter: { card: 'summary_large_image', title: 'Birthday Venues Under 50K Bangalore — Eevagga', description: 'Affordable birthday venues under ₹50K in Bangalore. Best value + full planning.' },
};

const serviceSchema = {
  '@context': 'https://schema.org', '@type': 'Service',
  '@id': 'https://www.eevagga.com/birthday-venues-under-50k-bangalore#service',
  name: 'Budget Birthday Venues Under ₹50,000 in Bangalore',
  description: 'Affordable birthday party venue scouting and planning in Bangalore within a total budget of ₹50,000. Includes venue coordination, theme decoration, photography and basic catering support.',
  provider: { '@id': 'https://www.eevagga.com/#organization' },
  serviceType: 'Budget Birthday Venue Planning',
  areaServed: { '@type': 'City', name: 'Bangalore', sameAs: 'https://en.wikipedia.org/wiki/Bangalore' },
  url: 'https://www.eevagga.com/birthday-venues-under-50k-bangalore',
  offers: { '@type': 'AggregateOffer', priceCurrency: 'INR', lowPrice: '15000', highPrice: '50000', offerCount: '3' },
};

const localBusinessSchema = {
  '@context': 'https://schema.org', '@type': 'LocalBusiness', name: 'Eevagga — Budget Birthday Venue Planners Bangalore',
  url: 'https://www.eevagga.com', telephone: '+918050279101',
  address: { '@type': 'PostalAddress', addressLocality: 'Bangalore', addressRegion: 'Karnataka', addressCountry: 'IN' },
  areaServed: { '@type': 'City', name: 'Bangalore' }, priceRange: '₹–₹₹',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.eevagga.com' },
    { '@type': 'ListItem', position: 2, name: 'Birthday Venues Bangalore', item: 'https://www.eevagga.com/birthday-venues-bangalore' },
    { '@type': 'ListItem', position: 3, name: 'Birthday Venues Under 50K Bangalore', item: 'https://www.eevagga.com/birthday-venues-under-50k-bangalore' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What birthday venues are available under ₹50,000 in Bangalore?', acceptedAnswer: { '@type': 'Answer', text: 'Within a ₹50,000 total budget in Bangalore, great options include community hall and clubhouse bookings (₹5,000–₹15,000), home birthday party setups, small banquet halls, restaurant private dining rooms and outdoor garden spaces. Eevagga optimises your budget to get maximum value.' } },
    { '@type': 'Question', name: 'Can I have a nice birthday party in Bangalore under ₹50,000?', acceptedAnswer: { '@type': 'Answer', text: 'Absolutely! Eevagga specialises in delivering beautiful, themed birthday parties within tight budgets. A typical ₹35,000–₹50,000 package from Eevagga includes venue coordination, full theme décor, basic photography and decoration — giving you a premium experience at an affordable price.' } },
    { '@type': 'Question', name: 'What is the cheapest birthday venue option in Bangalore?', acceptedAnswer: { '@type': 'Answer', text: 'The most affordable option is an at-home birthday party. Eevagga can transform your home into a beautiful themed party space starting from ₹15,000 — with balloon setups, backdrop, cake table and basic décor included.' } },
    { '@type': 'Question', name: 'How does Eevagga maximise value for a budget birthday in Bangalore?', acceptedAnswer: { '@type': 'Answer', text: 'Eevagga strategically allocates your budget across venue, décor, photography and entertainment to maximise impact. We recommend home parties or clubhouses for venues, focus premium spend on décor that photographs well, and optimise catering to stay within budget.' } },
  ],
};

const pageConfig = {
  title: 'Birthday Venues Under 50K Bangalore',
  badge: 'Budget-Smart Birthday Planning',
  h1: 'Birthday Venues Under ₹50,000 in Bangalore — Best Value Celebrations by Eevagga',
  heroSubtitle: 'Great birthdays don\'t have to break the bank. Eevagga helps you find and book the best birthday venues in Bangalore within a ₹50,000 budget — and decorates them beautifully for a premium feel.',
  heroImage: '/service-pages/birthday-hero.png',
  heroImageAlt: 'Budget birthday party decoration in Bangalore by Eevagga',
  stats: [
    { value: '300+', label: 'Budget Events Delivered' },
    { value: '4.9★', label: 'Average Rating' },
    { value: '₹15K', label: 'Starting Budget' },
    { value: '100%', label: 'Value Maximised' },
  ],
  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'Birthday Venues Bangalore', href: '/birthday-venues-bangalore' },
    { label: 'Birthday Venues Under 50K Bangalore' },
  ],
  gallery: [
    { src: '/service-pages/birthday-hero.png', alt: 'Budget birthday decoration Bangalore', caption: 'Premium Look, Smart Budget' },
    { src: '/service-pages/birthday-gallery-1.png', alt: 'Home birthday party Bangalore', caption: 'Home Birthday Setup' },
    { src: '/service-pages/birthday-gallery-2.png', alt: 'Community hall birthday party Bangalore', caption: 'Community Hall' },
    { src: '/service-pages/birthday-gallery-3.png', alt: 'Budget birthday cake table Bangalore', caption: 'Styled Cake Table' },
    { src: '/service-pages/birthday-gallery-4.png', alt: 'Affordable balloon arch birthday Bangalore', caption: 'Balloon Arch' },
  ],
  features: [
    { icon: '🏠', title: 'At-Home Birthday Parties', description: 'The most budget-friendly option — we transform your home into a beautifully themed party space starting from ₹15,000.' },
    { icon: '🏘️', title: 'Community Hall & Clubhouses', description: 'Affordable community hall and clubhouse bookings across Bangalore starting from ₹5,000 with full decoration by Eevagga.' },
    { icon: '🎈', title: 'Smart Balloon & Décor Design', description: 'Premium-looking balloon arches and backdrops designed to maximise visual impact within a tight budget.' },
    { icon: '📸', title: 'Budget Photography Options', description: 'Affordable 2-hour photography packages that capture all the key moments without blowing your budget.' },
    { icon: '🎂', title: 'Cake Coordination', description: 'We coordinate beautiful themed birthday cakes within budget — single-tier, two-tier and cupcake towers all available.' },
    { icon: '💡', title: 'Budget Maximisation Strategy', description: 'We strategically allocate your ₹50K across venue, décor and photography to deliver maximum wow-factor within budget.' },
  ],
  pricing: [
    { name: 'Starter', subtitle: 'Smart budget birthday', price: 15000, featured: false, includes: ['Balloon arch & backdrop décor', 'Birthday name banner', 'Basic table décor', 'Cleanup support', 'Up to 25 guests'] },
    { name: 'Premium', subtitle: 'Best value — most popular', price: 35000, featured: true, includes: ['Community hall / home setup', 'Full theme decoration', 'Backdrop & stage setup', 'Photography (2 hours)', 'Cake coordination', 'Themed stationery', 'Up to 60 guests'] },
    { name: 'Value Max', subtitle: 'Maximum impact under ₹50K', price: 50000, featured: false, includes: ['Venue booking coordination', 'Full theme décor + florals', 'Photography (3 hours)', 'Entertainment (1 act)', 'Catering coordination', 'Cleanup & support', 'Up to 75 guests'] },
  ],
  faqs: [
    { question: 'What birthday venues are available under ₹50,000 in Bangalore?', answer: 'Great options under ₹50K include community halls (₹5K–₹15K hire), home birthday setups, small banquet halls, restaurant private rooms and garden spaces. Eevagga optimises your budget for maximum value.' },
    { question: 'Can I have a nice birthday party in Bangalore under ₹50,000?', answer: 'Absolutely! A ₹35K–₹50K Eevagga package includes venue coordination, full theme décor, photography and decoration — delivering a premium experience at a smart price point.' },
    { question: 'What is the cheapest birthday option in Bangalore?', answer: 'At-home birthday parties are the most affordable. Eevagga transforms your home into a beautiful themed space starting from ₹15,000 — with balloon setups, backdrop and cake table included.' },
    { question: 'How does Eevagga maximise a ₹50K birthday budget?', answer: 'We strategically split your budget — venue, décor, photography and entertainment — to maximise wow-factor. Home parties or clubhouses keep venue costs low while premium décor creates a stunning visual impact.' },
    { question: 'How do I book a budget birthday party with Eevagga in Bangalore?', answer: 'Just click the WhatsApp button or fill in our consultation form. Tell us your budget and guest count — we will design the best possible celebration within your ₹50K.' },
  ],
};

export default function BirthdayVenuesUnder50KBangalorePage() {
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
