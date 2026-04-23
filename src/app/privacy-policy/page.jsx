export const metadata = {
  title: "Privacy Policy",
  description: "Read Eevagga's privacy policy to understand how we securely protect your data and information.",
  keywords: "privacy policy, Eevagga privacy, data protection",
  alternates: { canonical: '/privacy-policy' },
  openGraph: {
    title: "Privacy Policy | Eevagga",
    description: "Read Eevagga's privacy policy to understand how we securely protect your data and information.",
    url: "https://www.eevagga.com/privacy-policy",
    siteName: "Eevagga",
    type: "website",
    images: ogImages
  }
};


import { Suspense } from 'react';
import { ogImages } from '../_seo';
import PageComponent from '../../pages/PrivacyAndPolicy';

export default function Page() {
  return <Suspense fallback={null}><PageComponent /></Suspense>;
}
