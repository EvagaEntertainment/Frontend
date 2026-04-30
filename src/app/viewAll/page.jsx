export const metadata = {
  title: "All Event Packages in Bangalore",
  description: "Browse all birthday, wedding and corporate event packages in Bangalore. Curated packages from Eevagga's verified vendors.",
  alternates: { canonical: '/viewAll' },
  openGraph: {
    title: "All Event Packages in Bangalore | Eevagga",
    description: "Browse all birthday, wedding and corporate event packages in Bangalore. Curated packages from Eevagga's verified vendors.",
    url: "https://www.eevagga.com/viewAll",
    type: "website",
    images: ogImages
  }
};

import { Suspense } from 'react';
import { ogImages } from '../_seo';
import PageComponent from '../../pages/ViewAllPage';

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.eevagga.com" },
    { "@type": "ListItem", "position": 2, "name": "All Event Packages", "item": "https://www.eevagga.com/viewAll" }
  ]
};

const srOnly = { position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <h1 style={srOnly}>All Event Packages in Bangalore — Browse &amp; Book</h1>
      <Suspense fallback={null}><PageComponent /></Suspense>
    </>
  );
}

