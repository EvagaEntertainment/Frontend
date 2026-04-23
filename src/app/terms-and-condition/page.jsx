export const metadata = {
  title: "Terms and Conditions",
  description: "Review the comprehensive terms and conditions of using the Eevagga premium platform.",
  keywords: "terms of service, Eevagga terms, platform rules",
  alternates: { canonical: '/terms-and-condition' },
  openGraph: {
    title: "Terms and Conditions | Eevagga",
    description: "Review the comprehensive terms and conditions of using the Eevagga premium platform.",
    url: "https://www.eevagga.com/terms-and-condition",
    siteName: "Eevagga",
    type: "website",
    images: ogImages
  }
};


import { Suspense } from 'react';
import { ogImages } from '../_seo';
import PageComponent from '../../pages/TermsAndConditions';

export default function Page() {
  return <Suspense fallback={null}><PageComponent /></Suspense>;
}
