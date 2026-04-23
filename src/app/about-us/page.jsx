export const metadata = {
  title: "About Us",
  description: "Learn about Eevagga, India's premium birthday celebration brand. We make premium birthday celebrations effortless, memorable, and accessible.",
  keywords: "Eevagga story, premium birthdays, party planning India",
  alternates: { canonical: '/about-us' },
  openGraph: {
    title: "About Us | Eevagga",
    description: "Learn about Eevagga, India's premium birthday celebration brand. We make premium birthday celebrations effortless, memorable, and accessible.",
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
  "name": "About Us — Eevagga Entertainment",
  "description": "Learn about Eevagga, India's premium birthday celebration brand.",
  "isPartOf": { "@id": "https://www.eevagga.com/#website" },
  "about": { "@id": "https://www.eevagga.com/#organization" }
};

const srOnly = { position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }} />
      <h1 style={srOnly}>About Eevagga — India&apos;s Premium Event Celebration Brand</h1>
      <Suspense fallback={null}><PageComponent /></Suspense>
    </>
  );
}
