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

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }} />
      <Suspense fallback={null}><PageComponent /></Suspense>
    </>
  );
}
