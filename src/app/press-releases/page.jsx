export const metadata = {
  title: "Press Releases",
  description: "The latest news, media announcements, and press elements from Eevagga.",
  keywords: "Eevagga news, press releases, media",
  alternates: { canonical: '/press-releases' },
  openGraph: {
    title: "Press Releases | Eevagga",
    description: "The latest news, media announcements, and press elements from Eevagga.",
    url: "https://www.eevagga.com/press-releases",
    siteName: "Eevagga",
    type: "website",
    images: ogImages
  }
};


import { Suspense } from 'react';
import { ogImages } from '../_seo';
import PageComponent from '../../pages/PressRelease';

const srOnly = { position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 };

export default function Page() {
  return (
    <>
      <h1 style={srOnly}>Press Releases — Eevagga News &amp; Announcements</h1>
      <Suspense fallback={null}><PageComponent /></Suspense>
    </>
  );
}
