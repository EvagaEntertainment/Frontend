export const metadata = {
  title: "Customer Support — Birthday Planning Help & Booking Queries",
  description: "Need help with your Eevagga booking? Contact our support team for booking queries, cancellations, order tracking and birthday planning assistance.",
  alternates: { canonical: '/customer-service' },
  openGraph: {
    title: "Customer Support | Eevagga",
    description: "Contact Eevagga support for booking queries, cancellations and celebration planning help in Bangalore.",
    url: "https://www.eevagga.com/customer-service",
    siteName: "Eevagga",
    type: "website",
  }
};

import { Suspense } from 'react';
import PageComponent from '../../pages/CustomerService';

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": "https://www.eevagga.com/customer-service#contact",
  "url": "https://www.eevagga.com/customer-service",
  "name": "Eevagga Customer Support",
  "description": "Contact Eevagga for birthday, house warming and baby shower booking help in Bangalore.",
  "inLanguage": "en-IN",
  "isPartOf": { "@id": "https://www.eevagga.com/#website" },
  "about": { "@id": "https://www.eevagga.com/#organization" }
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.eevagga.com" },
    { "@type": "ListItem", "position": 2, "name": "Customer Service", "item": "https://www.eevagga.com/customer-service" }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I book a birthday celebration with Eevagga?",
      "acceptedAnswer": { "@type": "Answer", "text": "You can explore our website and submit a booking request, or connect with our team directly. We'll guide you through themes, customization, and final planning." }
    },
    {
      "@type": "Question",
      "name": "Can I modify my booking after confirmation?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes, certain changes can be accommodated based on timelines and availability. We recommend informing our team as early as possible for smooth coordination." }
    },
    {
      "@type": "Question",
      "name": "Do you take last-minute bookings?",
      "acceptedAnswer": { "@type": "Answer", "text": "We try our best to accommodate urgent requests. Availability depends on the type of setup and resources required." }
    },
    {
      "@type": "Question",
      "name": "Can I cancel or reschedule my booking?",
      "acceptedAnswer": { "@type": "Answer", "text": "Cancellations and rescheduling are subject to timelines and booking terms. Our team will guide you based on your specific case." }
    },
    {
      "@type": "Question",
      "name": "Can I request a fully customized birthday theme?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes. We specialize in creating custom birthday experiences tailored to your preferences, theme, and budget." }
    }
  ]
};

const srOnly = { position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 };

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }} />
      <h1 style={srOnly}>Customer Service — Eevagga Support &amp; Help</h1>
      <Suspense fallback={null}><PageComponent /></Suspense>
    </>
  );
}
