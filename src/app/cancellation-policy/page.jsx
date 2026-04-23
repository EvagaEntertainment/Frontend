export const metadata = {
  title: "Cancellation Policy",
  description: "Review our transparent cancellation and refund policies for birthday packages and services.",
  keywords: "cancellation policy, Eevagga refunds",
  alternates: { canonical: '/cancellation-policy' },
  openGraph: {
    title: "Cancellation Policy | Eevagga",
    description: "Review our transparent cancellation and refund policies for birthday packages and services.",
    url: "https://www.eevagga.com/cancellation-policy",
    siteName: "Eevagga",
    type: "website",
    images: ogImages
  }
};


import { Suspense } from 'react';
import { ogImages } from '../_seo';
import PageComponent from '../../pages/RefundAndCancellation';

export default function Page() {
  return <Suspense fallback={null}><PageComponent /></Suspense>;
}
