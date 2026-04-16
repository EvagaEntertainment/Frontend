export const metadata = {
  title: "Press Releases",
  description: "The latest news, media announcements, and press elements from Eevagga.",
  keywords: "Eevagga news, press releases, media",
  openGraph: {
    title: "Press Releases | Eevagga",
    description: "The latest news, media announcements, and press elements from Eevagga.",
    url: "https://www.eevagga.com/press-releases",
    siteName: "Eevagga",
    type: "website"
  }
};


import { Suspense } from 'react';
import PageComponent from '../../pages/PressRelease';

export default function Page() {
  return <Suspense fallback={null}><PageComponent /></Suspense>;
}

