import { Suspense } from 'react';
import { ogImages } from '../_seo';
import ServiceLandingPage from '../../components/ServiceLandingPage/ServiceLandingPage';

export const metadata = {
  title: 'Birthday Party Resorts Bangalore | Resort Celebrations — Eevagga',
  description: 'Plan a stunning birthday party at a resort in Bangalore with Eevagga. Pool-side parties, resort lawns, garden venues & luxury resort birthday planning. Book today.',
  keywords: 'birthday party resorts Bangalore, resort birthday party Bangalore, birthday resort Bangalore, pool party birthday Bangalore, resort birthday planning Bangalore',
  alternates: { canonical: 'https://www.eevagga.com/birthday-party-resorts-bangalore' },
  openGraph: {
    title: 'Birthday Party Resorts Bangalore | Resort Celebrations — Eevagga',
    description: 'Pool-side parties, resort lawns & garden venues for birthdays in Bangalore. Resort birthday planning + full decoration by Eevagga.',
    url: 'https://www.eevagga.com/birthday-party-resorts-bangalore', siteName: 'Eevagga', type: 'website', images: ogImages,
  },
  twitter: { card: 'summary_large_image', title: 'Birthday Party Resorts Bangalore — Eevagga', description: 'Resort birthday parties in Bangalore. Pool-side & garden venues + full planning.' },
};

const serviceSchema = {
  '@context': 'https://schema.org', '@type': 'Service',
  '@id': 'https://www.eevagga.com/birthday-party-resorts-bangalore#service',
  name: 'Birthday Party at Resorts in Bangalore',
  description: 'Full-service birthday party planning at resorts and outdoor venues near Bangalore. Pool-side setups, resort lawn decorations, farmhouse garden parties and luxury outdoor birthday experiences.',
  provider: { '@id': 'https://www.eevagga.com/#organization' },
  serviceType: 'Resort Birthday Party Planning',
  areaServed: { '@type': 'City', name: 'Bangalore', sameAs: 'https://en.wikipedia.org/wiki/Bangalore' },
  url: 'https://www.eevagga.com/birthday-party-resorts-bangalore',
  offers: { '@type': 'AggregateOffer', priceCurrency: 'INR', lowPrice: '35000', highPrice: '250000', offerCount: '3' },
};

const localBusinessSchema = {
  '@context': 'https://schema.org', '@type': 'LocalBusiness', name: 'Eevagga — Resort Birthday Party Planners Bangalore',
  url: 'https://www.eevagga.com', telephone: '+918050279101',
  address: { '@type': 'PostalAddress', addressLocality: 'Bangalore', addressRegion: 'Karnataka', addressCountry: 'IN' },
  areaServed: { '@type': 'City', name: 'Bangalore' }, priceRange: '₹₹₹',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.eevagga.com' },
    { '@type': 'ListItem', position: 2, name: 'Birthday Venues Bangalore', item: 'https://www.eevagga.com/birthday-venues-bangalore' },
    { '@type': 'ListItem', position: 3, name: 'Birthday Party Resorts Bangalore', item: 'https://www.eevagga.com/birthday-party-resorts-bangalore' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Which resorts near Bangalore are good for birthday parties?', acceptedAnswer: { '@type': 'Answer', text: 'Great resorts near Bangalore for birthday parties include venues near Nandi Hills, Kanakapura Road resorts, Sarjapur farmhouses, Electronic City garden resorts and Bannerghatta Road properties. Eevagga has curated resort partnerships across all these zones for seamless planning.' } },
    { '@type': 'Question', name: 'How much does a resort birthday party cost near Bangalore?', acceptedAnswer: { '@type': 'Answer', text: 'Resort birthday parties near Bangalore typically start from ₹35,000 for basic setup with venue hire and décor, up to ₹2,50,000+ for fully managed luxury resort experiences with pool-side setups, catering, live entertainment and photography.' } },
    { '@type': 'Question', name: 'Can Eevagga plan a pool-side birthday party at a resort in Bangalore?', acceptedAnswer: { '@type': 'Answer', text: 'Yes! Pool-side birthday parties are one of our specialties. We create stunning pool-side setups with floating décor, tropical themes, LED lighting and full party management at resort venues near Bangalore.' } },
    { '@type': 'Question', name: 'How far are the birthday party resorts from Bangalore city?', acceptedAnswer: { '@type': 'Answer', text: 'Most resort venues we recommend are 20–60 km from Bangalore city — typically 45–90 minutes depending on traffic. We recommend resorts on Kanakapura Road, Sarjapur or Bannerghatta Road for convenient access from central Bangalore.' } },
  ],
};

const pageConfig = {
  title: 'Birthday Party Resorts Bangalore',
  badge: 'Resort Birthday Specialists',
  h1: 'Birthday Party Resorts near Bangalore — Pool-Side & Garden Celebrations by Eevagga',
  heroSubtitle: 'Escape the city for an extraordinary birthday. Pool-side setups, resort lawn celebrations and garden party experiences — Eevagga scouts and plans premium resort birthday parties near Bangalore.',
  heroImage: '/service-pages/birthday-hero.png',
  heroImageAlt: 'Resort birthday party decoration near Bangalore by Eevagga',
  stats: [
    { value: '80+', label: 'Resort Events Done' },
    { value: '4.9★', label: 'Average Rating' },
    { value: '15+', label: 'Resort Partners' },
    { value: '100%', label: 'Outdoor Specialists' },
  ],
  breadcrumbs: [
    { label: 'Home', href: '/' },
    { label: 'Birthday Venues Bangalore', href: '/birthday-venues-bangalore' },
    { label: 'Birthday Party Resorts Bangalore' },
  ],
  gallery: [
    { src: '/service-pages/birthday-hero.png', alt: 'Resort birthday party decoration Bangalore', caption: 'Resort Lawn Setup' },
    { src: '/service-pages/birthday-gallery-1.png', alt: 'Pool side birthday party Bangalore resort', caption: 'Pool-Side Party' },
    { src: '/service-pages/birthday-gallery-2.png', alt: 'Garden birthday party resort Bangalore', caption: 'Garden Celebration' },
    { src: '/service-pages/birthday-gallery-3.png', alt: 'Outdoor stage birthday resort Bangalore', caption: 'Outdoor Stage' },
    { src: '/service-pages/birthday-gallery-4.png', alt: 'Evening resort birthday party Bangalore', caption: 'Evening Resort Party' },
  ],
  features: [
    { icon: '🏊', title: 'Pool-Side Birthday Setups', description: 'Stunning pool-side birthday setups with floating décor, tropical themes, LED lighting and a resort poolscape.' },
    { icon: '🌿', title: 'Resort Lawn & Garden Parties', description: 'Lush resort lawns and garden venues decorated with florals, fairy lights and themed installations for memorable outdoor birthdays.' },
    { icon: '🌅', title: 'Farmhouse & Outdoor Venues', description: 'Curated farmhouse and outdoor resort venues on Kanakapura Road, Sarjapur and Bannerghatta Road with natural backdrops.' },
    { icon: '🎵', title: 'Live Entertainment Setup', description: 'Live bands, acoustic performers, DJs and barbecue setups coordinated for the perfect resort birthday atmosphere.' },
    { icon: '🎨', title: 'Full Outdoor Decoration', description: 'Weather-resistant outdoor décor including balloon arches, floral installations and themed prop setups tailored for resort venues.' },
    { icon: '🍽️', title: 'Catering & BBQ Coordination', description: 'We coordinate resort catering teams and independent BBQ caterers to create the perfect alfresco dining experience.' },
  ],
  pricing: [
    { name: 'Starter', subtitle: 'Basic resort birthday setup', price: 35000, featured: false, includes: ['Resort scouting & coordination', 'Outdoor balloon & backdrop décor', 'Basic catering coordination', 'Cleanup support', 'Up to 40 guests'] },
    { name: 'Premium', subtitle: 'Most popular resort package', price: 75000, featured: true, includes: ['Premium resort sourcing', 'Full outdoor theme decoration', 'Pool-side or garden setup', 'Photography (3 hours)', 'Live entertainment (2 hours)', 'Catering coordination', 'Up to 80 guests'] },
    { name: 'Luxury', subtitle: 'Grand resort celebration', price: 200000, featured: false, includes: ['Exclusive luxury resort venue', 'Bespoke outdoor décor', 'Full-day photography + video', 'Live band + DJ', 'Gourmet BBQ & catering', 'Dedicated event manager', '100+ guests'] },
  ],
  faqs: [
    { question: 'Which resorts near Bangalore are good for birthday parties?', answer: 'Great resort options include venues on Kanakapura Road, Sarjapur farmhouses, Electronic City garden resorts and Bannerghatta Road properties. Eevagga has resort partnerships across all these zones.' },
    { question: 'How much does a resort birthday party cost near Bangalore?', answer: 'Resort birthday parties start from ₹35,000 for basic venue + décor, up to ₹2,50,000+ for fully managed luxury pool-side experiences with catering, live entertainment and photography.' },
    { question: 'Can Eevagga plan pool-side birthday parties at resorts?', answer: 'Yes! Pool-side parties are our specialty. We create floating décor, tropical themes, LED lighting and full party management at resort venues near Bangalore.' },
    { question: 'How far are birthday party resorts from Bangalore?', answer: 'Most resort venues are 20–60 km from Bangalore city — 45–90 minutes drive. We recommend resorts on Kanakapura Road, Sarjapur or Bannerghatta Road for convenient access.' },
    { question: 'How far in advance should I book a resort birthday?', answer: 'Resort venues require 4–6 weeks advance booking for weekends. Popular resorts fill up especially during summer months (March–May). Book early!' },
  ],
};

export default function BirthdayPartyResortsBangalorePage() {
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
