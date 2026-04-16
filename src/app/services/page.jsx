export const metadata = {
  title: "Our Services",
  description: "Explore Eevagga's premium birthday celebration and decoration services tailor-fit for you.",
  keywords: "birthday services, decorators, premium event planning",
  openGraph: {
    title: "Our Services | Eevagga",
    description: "Explore Eevagga's premium birthday celebration and decoration services tailor-fit for you.",
    url: "https://www.eevagga.com/services",
    siteName: "Eevagga",
    type: "website"
  }
};


import { Suspense } from 'react';
import PageComponent from '../../pages/OurService';

export default function Page() {
  return <Suspense fallback={null}><PageComponent /></Suspense>;
}

