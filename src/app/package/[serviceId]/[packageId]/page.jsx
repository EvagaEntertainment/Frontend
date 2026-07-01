import { Suspense } from 'react';
import PageComponent from '../../../../pages/SinglePackageNew.jsx';

export async function generateMetadata({ params }) {
  const { serviceId, packageId } = params;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}packages/get-one-package/${serviceId}/${packageId}`);
    const data = await res.json();
    const service = data?.data?.services?.[0]?.values;
    const title = service?.Title || service?.VenueName || service?.FoodTruckName || "Perfect Package";
    const description = service?.description || "Explore this premium package on Eevagga.";
    return {
      title,
      description,
      alternates: { canonical: `https://www.eevagga.com/package/${serviceId}/${packageId}` },
    };
  } catch (e) {
    return { title: 'Package Details' };
  }
}

export default async function Page({ params }) {
  const { serviceId, packageId } = params;
  let schema = null;
  let breadcrumbSchema = null;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}packages/get-one-package/${serviceId}/${packageId}`);
    const data = await res.json();
    const service = data?.data?.services?.[0]?.values;
    const title = service?.Title || service?.VenueName || service?.FoodTruckName || "Service Package";
    const description = service?.description || "Premium service on Eevagga";

    schema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `https://www.eevagga.com/package/${serviceId}/${packageId}#service`,
      "url": `https://www.eevagga.com/package/${serviceId}/${packageId}`,
      "name": title,
      "description": description,
      "provider": { "@id": "https://www.eevagga.com/#organization" },
      "areaServed": { "@type": "City", "name": "Bangalore", "sameAs": "https://en.wikipedia.org/wiki/Bangalore" }
    };

    breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.eevagga.com" },
        { "@type": "ListItem", "position": 2, "name": "Packages", "item": "https://www.eevagga.com/viewall" },
        { "@type": "ListItem", "position": 3, "name": title, "item": `https://www.eevagga.com/package/${serviceId}/${packageId}` }
      ]
    };
  } catch (e) { }

  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}
        />
      )}
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c') }}
        />
      )}
      <Suspense fallback={null}>
        <PageComponent />
      </Suspense>
    </>
  );
}
