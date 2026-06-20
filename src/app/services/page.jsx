export const metadata = {
  title: { absolute: "Birthday & Celebration Services in Bangalore — Eevagga" },
  description: "Explore Eevagga's full-service birthday, house warming and baby shower planning services in Bangalore. Themes, decor, photography, venues and end-to-end execution.",
  keywords: "birthday decoration services Bangalore, birthday planning services Bangalore, house warming services Bangalore, baby shower planning Bangalore, premium celebration services",
  alternates: { canonical: '/services' },
  openGraph: {
    title: "Birthday & Celebration Services in Bangalore | Eevagga",
    description: "Full-service birthday, house warming and baby shower planning in Bangalore. Themes, decor, photography and end-to-end execution.",
    url: "https://www.eevagga.com/services",
    siteName: "Eevagga",
    type: "website",
    images: ogImages
  }
};


import { Suspense } from 'react';
import { ogImages } from '../_seo';
import PageComponent from '../../pages/OurService';

const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.eevagga.com/services#service",
  "name": "Birthday, House Warming & Baby Shower Planning Services in Bangalore",
  "description": "Full-service birthday, house warming and baby shower planning in Bangalore. Includes theme decoration, photography, venue coordination, entertainment and on-ground execution.",
  "provider": { "@id": "https://www.eevagga.com/#organization" },
  "serviceType": "Birthday and Celebration Planning",
  "areaServed": { "@type": "City", "name": "Bangalore", "sameAs": "https://en.wikipedia.org/wiki/Bangalore" },
  "url": "https://www.eevagga.com/services"
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.eevagga.com" },
    { "@type": "ListItem", "position": 2, "name": "Our Services", "item": "https://www.eevagga.com/services" }
  ]
};

const srOnly = { position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <h1 style={srOnly}>Birthday &amp; Celebration Services in Bangalore — Eevagga</h1>
      
      {/* SSR Content Boost Section for SEO Crawlers */}
      <div style={srOnly}>
        <h2>Premium Celebration and Event Planning Services in Bangalore</h2>
        <p>
          Eevagga Entertainment is Bangalore's leading full-service event management and decoration company, specializing in creating magical, stress-free milestone celebrations. Our expertise covers end-to-end planning, unique custom themes, premium balloon and floral decorations, catering coordination, professional photography, and live entertainment. Whether you are hosting an intimate home gathering or a grand luxury celebration at a premier banquet venue, our dedicated event supervisors ensure flawless execution from setup to cleanup.
        </p>
        
        <h3>Bespoke Birthday Party Planning in Bangalore</h3>
        <p>
          As the premier birthday planners in Bangalore, Eevagga offers tailored packages for all ages. We design creative birthday celebrations for kids, milestone 1st birthdays, teen birthdays, and adult celebrations. Our services include designing custom theme backdrops (such as Unicorn, Jungle, Barbie, Space, Cocomelon, and Boss Baby), stage setups, organic balloon arches, and coordinating with the finest bakers in Bangalore for custom birthday cakes. We provide full entertainment including professional emcees, magicians, live DJs, and interactive games, coupled with professional candid photography to capture every smile.
        </p>

        <h3>Traditional and Modern House Warming (Griha Pravesh) Planners</h3>
        <p>
          Transitioning to a new home is a sacred milestone. Eevagga provides comprehensive Griha Pravesh ceremony planning across Bangalore, ensuring your house warming ceremony is aligned with traditions yet modern in execution. We specialize in traditional fresh floral styling using marigold, jasmine, and mango leaves for entryways and balconies. Our team coordinates homa and puja mandap setups, traditional South and North Indian catering, dining table layouts, Nadaswaram musicians, and floor Rangoli designs. We also handle overnight setups to prepare your home before the early morning auspicious Muhurtam.
        </p>

        <h3>Delightful Baby Shower and Godh Bharani Events</h3>
        <p>
          Celebrate the upcoming arrival of your baby with a charming, heartwarming baby shower event. Eevagga crafts delightful experiences featuring soft pastel balloon decors, custom "Oh Baby" backdrops, and theme-appropriate props. For traditional Godh Bharani and Seemantham ceremonies, we design fresh floral backdrops and decorate comfortable swings (jhoolas) for the mom-to-be. Our event coordinators curate sweet dessert tables with customized theme cakes and coordinates engaging parlor games led by a lively anchor, ensuring all your friends and family are entertained.
        </p>

        <h3>Serving All Major Areas of Bangalore</h3>
        <p>
          With local teams deployed across Bangalore, Eevagga serves Koramangala, Indiranagar, Whitefield, HSR Layout, Sarjapur, Bellandur, Hebbal, Electronic City, Hennur, Yelahanka, JP Nagar, and surrounding tech corridors. We have extensive experience planning events in independent homes, gated-community clubhouses, luxury hotel banquet halls, and private outdoor lawns.
        </p>
      </div>

      <Suspense fallback={null}><PageComponent /></Suspense>
    </>
  );
}
