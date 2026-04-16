export const metadata = {
  title: "Provide Feedback | Eevagga",
  description: "Share your experience with Eevagga services. We value your thoughts on our premium celebrations.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Provide Feedback | Eevagga",
    description: "Share your experience with Eevagga services. We value your thoughts on our premium celebrations.",
    url: "https://www.eevagga.com/feedback-form",
    siteName: "Eevagga",
    type: "website"
  }
};


import { Suspense } from 'react';
import PageComponent from '../../pages/FeedBack';

export default function Page() {
  return <Suspense fallback={null}><PageComponent /></Suspense>;
}

