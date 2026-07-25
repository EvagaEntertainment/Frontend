export const metadata = {
  title: "Birthday & Celebration Packages in Bangalore",
  description: "Browse Eevagga's birthday, house warming and baby shower packages in Bangalore. Curated themes, decor and full-service celebration experiences.",
  alternates: { canonical: '/viewall' },
  openGraph: {
    title: "Birthday & Celebration Packages in Bangalore | Eevagga",
    description: "Browse birthday, house warming and baby shower packages in Bangalore. Curated themes, decor and full-service celebration experiences by Eevagga.",
    url: "https://www.eevagga.com/viewall",
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
    { "@type": "ListItem", "position": 2, "name": "Celebration Packages", "item": "https://www.eevagga.com/viewall" }
  ]
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Birthday & Celebration Packages in Bangalore",
  "description": "Curated birthday, house warming and baby shower packages in Bangalore by Eevagga.",
  "url": "https://www.eevagga.com/viewall",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Birthday Decoration Packages" },
    { "@type": "ListItem", "position": 2, "name": "Kids Birthday Party Packages" },
    { "@type": "ListItem", "position": 3, "name": "Luxury Birthday Celebration Packages" },
    { "@type": "ListItem", "position": 4, "name": "House Warming Ceremony Packages" },
    { "@type": "ListItem", "position": 5, "name": "Baby Shower Packages" }
  ]
};

const srOnly = { position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema).replace(/</g, '\\u003c') }} />
      <h1 style={srOnly}>Birthday &amp; Celebration Packages in Bangalore — Browse &amp; Book | Eevagga</h1>
      <section style={{ padding: '1.25rem 1.5rem 0', maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
        <p style={{ color: '#374151', lineHeight: 1.7, margin: 0, fontSize: '0.95rem' }}>
          {"Browse Eevagga's curated birthday, house warming and baby shower packages in Bangalore — themes, décor and end-to-end execution. Explore "}
          <a href="/birthday-planner-bangalore" style={{ color: '#e65c00' }}>birthday planning</a>
          {", "}
          <a href="/kids-birthday-planner-bangalore" style={{ color: '#e65c00' }}>kids birthday parties</a>
          {", "}
          <a href="/premium-house-warming-planner" style={{ color: '#e65c00' }}>house warming ceremonies</a>
          {" and "}
          <a href="/premium-baby-shower-planner" style={{ color: '#e65c00' }}>baby shower planning</a>
          {" in Bangalore."}
        </p>
      </section>
      <Suspense fallback={null}><PageComponent /></Suspense>
    </>
  );
}
