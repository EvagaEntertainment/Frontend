export const metadata = {
  title: "About Us | Eevagga",
  description: "Learn about Eevagga, India's premium birthday celebration brand. We make premium birthday celebrations effortless, memorable, and accessible.",
  keywords: "Eevagga story, premium birthdays, party planning India",
  openGraph: {
    title: "About Us | Eevagga",
    description: "Learn about Eevagga, India's premium birthday celebration brand. We make premium birthday celebrations effortless, memorable, and accessible.",
    url: "https://www.eevagga.com/about-us",
    siteName: "Eevagga",
    type: "website"
  }
};


import { Suspense } from 'react';
import PageComponent from '../../pages/AboutEvaga';

export default function Page() {
  return <Suspense fallback={null}><PageComponent /></Suspense>;
}

