export const metadata = {
  title: "Our Services",
  description: "Explore Eevagga's premium birthday celebration and decoration services tailor-fit for you.",
  keywords: "birthday services, decorators, premium event planning",
  alternates: { canonical: '/services' },
  openGraph: {
    title: "Our Services | Eevagga",
    description: "Explore Eevagga's premium birthday celebration and decoration services tailor-fit for you.",
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
  "name": "Premium Event Celebration Services",
  "description": "Curated birthday, wedding and corporate event packages in Bangalore including decoration, photography, catering and entertainment.",
  "provider": { "@id": "https://www.eevagga.com/#organization" },
  "serviceType": "Event Planning and Celebration",
  "areaServed": { "@type": "City", "name": "Bangalore", "sameAs": "https://en.wikipedia.org/wiki/Bangalore" },
  "url": "https://www.eevagga.com/services"
};

const srOnly = { position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }} />
      <h1 style={srOnly}>Our Services — Premium Event Packages in Bangalore</h1>
      <Suspense fallback={null}><PageComponent /></Suspense>
    </>
  );
}
