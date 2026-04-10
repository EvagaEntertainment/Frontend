export const metadata = {
  title: "Blogs | Eevagga",
  description: "Read our latest articles on premium birthday celebrations, decoration ideas, and event planning.",
  keywords: "birthday blog, celebration ideas, party planning tips",
  openGraph: {
    title: "Blogs | Eevagga",
    description: "Read our latest articles on premium birthday celebrations, decoration ideas, and event planning.",
    url: "https://www.eevagga.com/blogs",
    siteName: "Eevagga",
    type: "website"
  }
};


import { Suspense } from 'react';
import PageComponent from '../../pages/Blog';

export default function Page() {
  return <Suspense fallback={null}><PageComponent /></Suspense>;
}

