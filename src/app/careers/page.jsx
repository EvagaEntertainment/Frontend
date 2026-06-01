export const metadata = {
  title: "Careers at Eevagga — Join Our Birthday Celebration Team in Bangalore",
  description: "Join Eevagga and help build Bangalore's most trusted birthday, house warming and baby shower planning company. We are hiring event planners, coordinators and creative professionals.",
  keywords: "Eevagga careers, event planner jobs Bangalore, birthday planner jobs Bangalore, celebration company hiring Bangalore",
  alternates: { canonical: '/careers' },
  openGraph: {
    title: "Careers at Eevagga — Join Our Celebration Team in Bangalore",
    description: "Join Eevagga and help build Bangalore's most trusted birthday and celebration planning company.",
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
