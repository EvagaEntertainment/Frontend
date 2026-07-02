import { Suspense } from 'react';
import HomePage from '../pages/HomePage';

export const metadata = {
  title: { absolute: "Eevagga | Premium Birthday Planner in Bangalore — House Warming & Baby Showers" },
  description: "Bangalore's premium birthday, house warming & baby shower planning company. End-to-end themes, decor, photography and full execution. Book your celebration today.",
  keywords: "birthday planner Bangalore, birthday decoration Bangalore, house warming planner Bangalore, baby shower planner Bangalore, kids birthday planner Bangalore, premium birthday celebration Bangalore, birthday party planning Bangalore",
  alternates: {
    canonical: 'https://www.eevagga.com',
  },
  openGraph: {
    title: "Eevagga | Premium Birthday Planner in Bangalore",
    description: "Bangalore's premium full-service birthday, house warming and baby shower planning company. End-to-end themes, decor, venues and execution.",
    url: 'https://www.eevagga.com',
    type: 'website',
    images: [{ url: 'https://www.eevagga.com/og-image.jpg', width: 1200, height: 630 }]
  }
};

const srOnly = { position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 };

export default function Home() {
  return (
    <main>
      <h1 style={srOnly}>Birthday Planner in Bangalore — House Warming &amp; Baby Shower Celebrations | Eevagga</h1>
      <Suspense fallback={null}>
        <HomePage />
      </Suspense>
    </main>
  );
}
