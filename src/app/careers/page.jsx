export const metadata = {
  title: "Careers",
  description: "Join the Eevagga team and help us build memorable, premium birthday celebrations across India.",
  keywords: "Eevagga jobs, event planning careers, hiring",
  alternates: { canonical: '/careers' },
  openGraph: {
    title: "Careers | Eevagga",
    description: "Join the Eevagga team and help us build memorable, premium birthday celebrations across India.",
    url: "https://www.eevagga.com/careers",
    siteName: "Eevagga",
    type: "website",
    images: ogImages
  }
};


import { Suspense } from 'react';
import { ogImages } from '../_seo';
import PageComponent from '../../components/Careers/CareersPage';

export default function Page() {
  return <Suspense fallback={null}><PageComponent /></Suspense>;
}
