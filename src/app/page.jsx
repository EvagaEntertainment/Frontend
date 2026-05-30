import { Suspense } from 'react';
import HomePage from '../pages/HomePage';

export const metadata = {
  title: { absolute: "Eevagga | Premium Birthday Planner in Bangalore — House Warming & Baby Showers" },
  description: "Eevagga is Bangalore's premium full-service birthday, house warming and baby shower planning company. We handle everything — themes, decor, venues, photography and execution.",
  keywords: "birthday planner Bangalore, birthday decoration Bangalore, house warming planner Bangalore, baby shower planner Bangalore, kids birthday planner Bangalore, premium birthday celebration Bangalore, birthday party planning Bangalore",
  alternates: {
    canonical: 'https://www.eevagga.com',
  },
  openGraph: {
    title: "Eevagga | Premium Birthday Planner in Bangalore",
    description: "Bangalore's premium full-service birthday, house warming and baby shower planning company. End-to-end themes, decor, venues and execution.",
    type: 'website'
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Eevagga?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Eevagga is Bangalore's premium full-service birthday, house warming and baby shower planning company. We handle everything — themes, decorations, venue coordination, photography, entertainment and on-ground execution — so you can celebrate without the stress."
      }
    },
    {
      "@type": "Question",
      "name": "What types of celebrations does Eevagga plan in Bangalore?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Eevagga specializes in birthday celebrations (kids, adults, milestone birthdays), house warming ceremonies and baby shower celebrations in Bangalore. We offer themed setups, home decorations, venue celebrations and end-to-end planning for all these occasions."
      }
    },
    {
      "@type": "Question",
      "name": "Which areas of Bangalore does Eevagga serve?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Eevagga serves all major areas of Bangalore including Whitefield, HSR Layout, Koramangala, Indiranagar, Sarjapur, Bellandur, Hebbal, Electronic City, Hennur, Yellhanka and JP Nagar. We are Bangalore's most trusted birthday and celebration planner."
      }
    },
    {
      "@type": "Question",
      "name": "How far in advance should I book a birthday celebration with Eevagga?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We recommend booking at least 22 days in advance to ensure availability of your preferred theme, venue and services. For luxury or highly customized celebrations, earlier booking is always better."
      }
    },
    {
      "@type": "Question",
      "name": "Does Eevagga handle everything end-to-end?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Eevagga is a full-service planning company — not a marketplace or vendor aggregator. We own the entire execution including décor and theme setup, photography and videography, entertainment, stage and event setup, catering coordination and on-ground event management."
      }
    },
    {
      "@type": "Question",
      "name": "How can I book a celebration with Eevagga?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can book through the Eevagga website or reach us directly via WhatsApp. Our team will guide you through themes, packages and customization options to plan the perfect birthday, house warming or baby shower celebration."
      }
    }
  ]
};

const srOnly = { position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 };

export default function Home() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <h1 style={srOnly}>Birthday Planner in Bangalore — House Warming &amp; Baby Shower Celebrations | Eevagga</h1>
      <Suspense fallback={null}>
        <HomePage />
      </Suspense>
    </main>
  );
}
