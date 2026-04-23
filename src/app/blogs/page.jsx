export const metadata = {
  title: "Blogs",
  description: "Read our latest articles on premium birthday celebrations, decoration ideas, and event planning.",
  keywords: "birthday blog, celebration ideas, party planning tips",
  alternates: { canonical: '/blogs' },
  openGraph: {
    title: "Blogs | Eevagga",
    description: "Read our latest articles on premium birthday celebrations, decoration ideas, and event planning.",
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
  "name": "Eevagga Blog",
  "description": "Articles on birthday celebrations, decoration ideas, and event planning in India.",
  "publisher": { "@id": "https://www.eevagga.com/#organization" },
  "inLanguage": "en-IN"
};

const srOnly = { position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
      <h1 style={srOnly}>Eevagga Blog — Birthday &amp; Event Celebration Ideas</h1>
      <Suspense fallback={null}><PageComponent /></Suspense>
    </>
  );
}
