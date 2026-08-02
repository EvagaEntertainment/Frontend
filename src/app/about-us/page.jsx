export const metadata = {
  title: "About Eevagga — Birthday & Celebration Planner in Bangalore",
  description: "Eevagga is Bangalore's most trusted birthday, house warming and baby shower planning company. Creative themes and end-to-end planning. Meet our team.",
  keywords: "about Eevagga, birthday planner Bangalore, full-service celebration company, premium event planning Bangalore",
  alternates: { canonical: '/about-us' },
  openGraph: {
    title: "About Eevagga — Premium Birthday & Celebration Planner in Bangalore",
    description: "Learn how Eevagga became Bangalore's most trusted full-service birthday, house warming and baby shower planning company.",
    url: "https://www.eevagga.com/about-us",
    siteName: "Eevagga",
    type: "website",
    images: ogImages
  }
};


import { Suspense } from 'react';
import PageComponent from '../../pages/AboutEvaga';
import { ogImages } from '../_seo';

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": "https://www.eevagga.com/about-us#webpage",
  "url": "https://www.eevagga.com/about-us",
  "name": "About Eevagga — Premium Birthday & Celebration Planner in Bangalore",
  "description": "Bangalore's most trusted full-service birthday, house warming and baby shower planning company.",
  "inLanguage": "en-IN",
  "isPartOf": { "@id": "https://www.eevagga.com/#website" },
  "about": { "@id": "https://www.eevagga.com/#organization" }
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.eevagga.com" },
    { "@type": "ListItem", "position": 2, "name": "About Us", "item": "https://www.eevagga.com/about-us" }
  ]
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c') }} />
      <p style={{ margin: 0, padding: '0.6rem 1.5rem', background: '#f9fafb', textAlign: 'center', fontSize: '0.875rem', color: '#6b7280', borderBottom: '1px solid #e5e7eb' }}>
        Explore our <a href="/services" style={{ color: '#e65c00' }}>celebration planning services</a> or <a href="/viewall" style={{ color: '#e65c00' }}>browse all packages</a>.
      </p>
      <Suspense fallback={null}><PageComponent /></Suspense>
    </>
  );
}
