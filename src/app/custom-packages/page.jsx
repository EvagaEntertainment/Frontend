export const metadata = {
  title: "Custom Event Packages",
  description: "Request a fully customised birthday, wedding or corporate event package tailored to your budget, guest count and vision.",
  alternates: { canonical: '/custom-packages' },
  robots: { index: false, follow: false },
  openGraph: {
    title: "Custom Event Packages | Eevagga",
    description: "Request a fully customised birthday, wedding or corporate event package tailored to your budget, guest count and vision.",
    url: "https://www.eevagga.com/custom-packages",
    type: "website"
  }
};


import { Suspense } from 'react';
import PageComponent from '../../pages/CustomPackages';

export default function Page() {
  return <Suspense fallback={null}><PageComponent /></Suspense>;
}


