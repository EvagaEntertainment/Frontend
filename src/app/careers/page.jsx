export const metadata = {
  title: "Careers",
  description: "Join the Eevagga team and help us build memorable, premium birthday celebrations across India.",
  keywords: "Eevagga jobs, event planning careers, hiring",
  openGraph: {
    title: "Careers | Eevagga",
    description: "Join the Eevagga team and help us build memorable, premium birthday celebrations across India.",
    url: "https://www.eevagga.com/careers",
    siteName: "Eevagga",
    type: "website"
  }
};


import { Suspense } from 'react';
import PageComponent from '../../pages/Careers';

export default function Page() {
  return <Suspense fallback={null}><PageComponent /></Suspense>;
}

