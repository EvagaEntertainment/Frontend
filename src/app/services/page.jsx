export const metadata = {
  title: "Birthday & Celebration Services in Bangalore | Eevagga",
  description: "Explore Eevagga's full-service birthday, house warming and baby shower planning services in Bangalore. Themes, decor, photography, venues and end-to-end execution.",
  keywords: "birthday decoration services Bangalore, birthday planning services Bangalore, house warming services Bangalore, baby shower planning Bangalore, premium celebration services",
  alternates: { canonical: '/services' },
  openGraph: {
    title: "Birthday & Celebration Services in Bangalore | Eevagga",
    description: "Full-service birthday, house warming and baby shower planning in Bangalore. Themes, decor, photography and end-to-end execution.",
    url: "https://www.eevagga.com/services",
    siteName: "Eevagga",
    type: "website",
    images: ogImages
  }
};


import { Suspense } from 'react';
import { ogImages } from '../_seo';
import PageComponent from '../../pages/OurService';

const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.eevagga.com/services#service",
  "name": "Birthday, House Warming & Baby Shower Planning Services in Bangalore",
  "description": "Full-service birthday, house warming and baby shower planning in Bangalore. Includes theme decoration, photography, venue coordination, entertainment and on-ground execution.",
  "provider": { "@id": "https://www.eevagga.com/#organization" },
  "serviceType": "Birthday and Celebration Planning",
  "areaServed": { "@type": "City", "name": "Bangalore", "sameAs": "https://en.wikipedia.org/wiki/Bangalore" },
  "url": "https://www.eevagga.com/services"
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.eevagga.com" },
    { "@type": "ListItem", "position": 2, "name": "Our Services", "item": "https://www.eevagga.com/services" }
  ]
};

const srOnly = { position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <h1 style={srOnly}>Birthday &amp; Celebration Services in Bangalore — Eevagga</h1>
      <Suspense fallback={null}><PageComponent /></Suspense>
    </>
  );
}
