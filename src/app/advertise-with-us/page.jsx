export const metadata = {
  title: "Advertise With Us",
  description: "Partner with Eevagga to reach thousands of celebration-ready customers in Bangalore and across India.",
  robots: { index: false, follow: false },
  alternates: { canonical: '/advertise-with-us' },
  openGraph: {
    title: "Advertise With Us | Eevagga",
    description: "Partner with Eevagga to reach thousands of celebration-ready customers in Bangalore and across India.",
    url: "https://www.eevagga.com/advertise-with-us",
    type: "website",
    images: ogImages
  }
};

import { Suspense } from 'react';
import { ogImages } from '../_seo';
import PageComponent from '../../pages/AdvertisewithUs';

export default function Page() {
  return <Suspense fallback={null}><PageComponent /></Suspense>;
}

