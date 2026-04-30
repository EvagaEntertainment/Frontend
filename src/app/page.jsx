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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Eevagga?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Eevagga is a premium birthday celebration platform designed to make planning birthdays simple, beautiful, and stress-free. From curated birthday decorations and full-service event planning to thoughtfully designed celebration products and gifts, Eevagga brings everything needed for a memorable birthday into one place."
      }
    },
    {
      "@type": "Question",
      "name": "What types of birthday celebrations does Eevagga organize?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Eevagga specializes in a wide range of birthday celebrations, including kids birthday parties, milestone birthdays, surprise birthday setups, home birthday decorations, venue birthday celebrations, and themed birthday parties."
      }
    },
    {
      "@type": "Question",
      "name": "Do you only operate in Bangalore?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Currently, most of our event services are available in Bangalore, while our celebration products can be delivered across India through online platforms. As Eevagga grows, we plan to expand our celebration services to more cities."
      }
    },
    {
      "@type": "Question",
      "name": "How far in advance should I book a birthday celebration?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We recommend booking your celebration at least 22 days in advance to ensure the best availability for themes, venues, and services. For larger or customized birthday events, earlier booking is always beneficial."
      }
    },
    {
      "@type": "Question",
      "name": "Can I book a complete birthday celebration through Eevagga?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. With Eevagga Birthdays, you can book end-to-end birthday planning, including décor and theme setup, photography and videography, entertainment and activities, stage and event setup, catering coordination, and on-ground event management."
      }
    },
    {
      "@type": "Question",
      "name": "How can I book a birthday celebration with Eevagga?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can book through the Eevagga website or by contacting our team directly. Our team will guide you through themes, packages, and customization options to help you plan the perfect birthday celebration."
      }
    }
  ]
};

export default function Home() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Suspense fallback={null}>
        <HomePage />
      </Suspense>
    </main>
  );
}
