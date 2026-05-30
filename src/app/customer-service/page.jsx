export const metadata = {
  title: "Customer Support — Birthday Planning Help & Booking Queries | Eevagga",
  description: "Need help with your Eevagga birthday, house warming or baby shower booking? Contact our support team for booking queries, cancellations, order tracking and celebration planning assistance.",
  alternates: { canonical: '/customer-service' },
  openGraph: {
    title: "Customer Support | Eevagga",
    description: "Contact Eevagga support for booking queries, cancellations and celebration planning help in Bangalore.",
    url: "https://www.eevagga.com/customer-service",
    siteName: "Eevagga",
    type: "website",
  }
};

import { Suspense } from 'react';
import PageComponent from '../../pages/CustomerService';

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": "https://www.eevagga.com/customer-service#contact",
  "url": "https://www.eevagga.com/customer-service",
  "name": "Eevagga Customer Support",
  "description": "Contact Eevagga for birthday, house warming and baby shower booking help in Bangalore.",
  "inLanguage": "en-IN",
  "isPartOf": { "@id": "https://www.eevagga.com/#website" }
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.eevagga.com" },
    { "@type": "ListItem", "position": 2, "name": "Customer Service", "item": "https://www.eevagga.com/customer-service" }
  ]
};

const srOnly = { position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <h1 style={srOnly}>Customer Service — Eevagga Support &amp; Help</h1>
      <Suspense fallback={null}><PageComponent /></Suspense>
    </>
  );
}
