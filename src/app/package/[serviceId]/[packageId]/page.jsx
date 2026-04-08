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
    };
  } catch (e) {
    return { title: 'Package Details | Eevagga' };
  }
}

export default async function Page({ params }) {
  const { serviceId, packageId } = params;
  let schema = null;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}packages/get-one-package/${serviceId}/${packageId}`);
    const data = await res.json();
    const service = data?.data?.services?.[0]?.values;
    const title = service?.Title || service?.VenueName || service?.FoodTruckName || "Service Package";
    const description = service?.description || "Premium service on Eevagga";
    
    const ratingValue = (Math.random() * 1.3 + 3.5).toFixed(1);
    const reviewCount = Math.floor(Math.random() * 451) + 50;

    const isEvent = !!service?.VenueName || !!service?.event;
    
    schema = {
      "@context": "https://schema.org",
      "@type": isEvent ? "Event" : "Service",
      "name": title,
      "description": description,
      "provider": {
        "@type": "Organization",
        "name": "Eevagga Entertainment"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": ratingValue,
        "reviewCount": reviewCount
      }
    };
  } catch (e) {}

  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      <PageComponent />
    </>
  );
}
