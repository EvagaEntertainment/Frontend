export const metadata = {
  title: "Birthday & Celebration Blog — Ideas, Themes & Planning Guides | Eevagga",
  description: "Read Eevagga's blog for birthday decoration ideas, theme inspiration, house warming tips, baby shower guides and event planning advice in Bangalore.",
  keywords: "birthday ideas Bangalore, birthday decoration ideas, birthday theme ideas, house warming ideas, baby shower ideas, birthday planning tips Bangalore",
  alternates: { canonical: '/blogs' },
  openGraph: {
    title: "Birthday & Celebration Blog — Ideas, Themes & Planning Guides | Eevagga",
    description: "Birthday decoration ideas, theme inspiration, house warming tips and baby shower guides for celebrations in Bangalore.",
    url: "https://www.eevagga.com/blogs",
    siteName: "Eevagga",
    type: "website",
    images: ogImages
  }
};


import { Suspense } from 'react';
import { ogImages } from '../_seo';
import PageComponent from '../../pages/Blog';

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": "https://www.eevagga.com/blogs#blog",
  "url": "https://www.eevagga.com/blogs",
  "name": "Eevagga Blog — Birthday & Celebration Ideas in Bangalore",
  "description": "Birthday decoration ideas, theme inspiration, house warming tips, baby shower guides and event planning advice for Bangalore celebrations.",
  "publisher": { "@id": "https://www.eevagga.com/#organization" },
  "inLanguage": "en-IN"
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.eevagga.com" },
    { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.eevagga.com/blogs" }
  ]
};

const srOnly = { position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <h1 style={srOnly}>Eevagga Blog — Birthday &amp; Celebration Ideas, Themes &amp; Planning Guides</h1>
      <Suspense fallback={null}><PageComponent /></Suspense>
    </>
  );
}
