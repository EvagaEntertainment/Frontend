import { Suspense } from 'react';
import HomePage from '../pages/HomePage';

export const metadata = {
  title: { absolute: "Eevagga | India's Premier Event Celebration Platform" },
  description: "Discover India's first premium birthday celebration platform. We offer curated birthday experiences, products, and services to make your birthday special.",
  keywords: "birthday party planning, birthday decorators, birthday gifts, premium birthday experiences, Eevagga, birthday packages",
  alternates: {
    canonical: 'https://www.eevagga.com',
  },
  openGraph: {
    title: "Eevagga | India's Premier Event Celebration Platform",
    description: "Discover India's first premium birthday celebration platform. We offer curated birthday experiences, products, and services to make your birthday special.",
    type: 'website'
  }
};

export default function Home() {
  return (
    <main>
      <Suspense fallback={null}>
        <HomePage />
      </Suspense>
    </main>
  );
}