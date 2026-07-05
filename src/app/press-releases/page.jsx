export const metadata = {
  title: { absolute: "Press Releases & Media — Eevagga" },
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c') }} />
      <div className="bg-[#6A1B9A] text-white py-12 px-6 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Press Releases &amp; Media</h1>
        <p className="max-w-2xl mx-auto text-white/85 text-lg">
          Stay up to date with the latest news, announcements, and media coverage from Eevagga — Bangalore&#39;s
          premium birthday, house warming, and baby shower celebration company. Our press releases cover
          new service launches, city expansions, industry milestones, and partnerships.
        </p>
        <p className="mt-4 text-white/70 text-sm">
          For media enquiries, contact us at{' '}
          <a href="mailto:info@eevagga.com" className="underline hover:text-[#FFE500]">info@eevagga.com</a>
        </p>
      </div>
      <Suspense fallback={null}><PageComponent /></Suspense>
    </>
  );
}
