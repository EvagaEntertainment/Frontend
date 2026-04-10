export const metadata = {
  title: "Privacy Policy | Eevagga",
  description: "Read Eevagga's privacy policy to understand how we securely protect your data and information.",
  keywords: "privacy policy, Eevagga privacy, data protection",
  openGraph: {
    title: "Privacy Policy | Eevagga",
    description: "Read Eevagga's privacy policy to understand how we securely protect your data and information.",
    url: "https://www.eevagga.com/privacy-policy",
    siteName: "Eevagga",
    type: "website"
  }
};


import { Suspense } from 'react';
import PageComponent from '../../pages/PrivacyAndPolicy';

export default function Page() {
  return <Suspense fallback={null}><PageComponent /></Suspense>;
}

