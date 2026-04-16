import { Suspense } from 'react';
import PageComponent from '../../../pages/CatgeoryPage';

export async function generateMetadata({ params }) {
  const { slug } = params;
  const title = slug
    ? slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
    : 'Event Packages';
  return {
    title: `${title} Packages`,
    description: `Browse premium ${title.toLowerCase()} event packages in Bangalore. Book curated vendors and services on Eevagga.`,
    alternates: { canonical: `https://www.eevagga.com/category/${slug}` },
    openGraph: {
      title: `${title} Packages | Eevagga`,
      description: `Browse premium ${title.toLowerCase()} event packages in Bangalore.`,
      url: `https://www.eevagga.com/category/${slug}`,
    },
  };
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <PageComponent />
    </Suspense>
  );
}