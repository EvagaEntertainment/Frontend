export const metadata = {
  title: "Press Releases & Media — Eevagga Entertainment Bangalore",
  description: "Latest news, media announcements and press coverage from Eevagga — Bangalore's premium birthday, house warming and baby shower celebration company.",
  keywords: "Eevagga press releases, Eevagga news, Eevagga media, birthday planner Bangalore news",
  alternates: { canonical: '/press-releases' },
  openGraph: {
    title: "Press Releases & Media — Eevagga Entertainment",
    description: "Latest news and media announcements from Eevagga — Bangalore's premium birthday and celebration planning company.",
    url: "https://www.eevagga.com/press-releases",
    siteName: "Eevagga",
    type: "website",
    images: ogImages
  }
};


import { Suspense } from 'react';
import { ogImages } from '../_seo';
import PageComponent from '../../pages/PressRelease';

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.eevagga.com" },
    { "@type": "ListItem", "position": 2, "name": "Press Releases", "item": "https://www.eevagga.com/press-releases" }
  ]
};

const srOnly = { position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <h1 style={srOnly}>Press Releases — Eevagga News &amp; Announcements</h1>
      <Suspense fallback={null}><PageComponent /></Suspense>
    </>
  );
}
