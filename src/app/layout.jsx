if (typeof Promise.withResolvers === 'undefined') {
  Promise.withResolvers = function () {
    let resolve, reject;
    const promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    return { promise, resolve, reject };
  };
}
import '../index.css';
import '../components/Errors/globalErrorHandler';
import { Suspense } from 'react';
import Providers from './Providers';
import ClientLayout from './ClientLayout';
import Script from 'next/script';
import { Outfit, Inter, Playfair_Display } from 'next/font/google';

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit', display: 'swap' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', display: 'swap' });

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata = {
  metadataBase: new URL('https://www.eevagga.com'),
  title: {
    default: 'Eevagga Entertainment',
    template: '%s | Eevagga',
  },
  description: "India's Premium Event Celebration Platform — curated birthday, wedding & corporate event packages in Bangalore.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // No root canonical — each page sets its own via alternates.canonical
  openGraph: {
    siteName: 'Eevagga Entertainment',
    type: 'website',
    locale: 'en_IN',
    // og:image is auto-applied from src/app/opengraph-image.jpg by Next.js
  },
  twitter: {
    card: 'summary_large_image',
    site: '@eevagga',
  },
  other: {
    'p:domain_verify': '4ffff8fe28fdfc5268597c4a91669fb1',
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "EntertainmentBusiness"],
      "@id": "https://www.eevagga.com/#organization",
      "name": "Eevagga Entertainment",
      "url": "https://www.eevagga.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.eevagga.com/logo.webp"
      },
      "image": "https://www.eevagga.com/og-image.jpg",
      "description": "India's premium birthday and event celebration platform in Bangalore.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "No10/12, Prestige Atlanta, 80 Feet Rd, Koramangala, 1 A Block Koramangala",
        "addressLocality": "Bengaluru",
        "addressRegion": "Karnataka",
        "postalCode": "560034",
        "addressCountry": "IN"
      },
      "priceRange": "₹₹₹",
      "areaServed": {
        "@type": "City",
        "name": "Bangalore"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer support",
        "areaServed": "IN",
        "availableLanguage": "English"
      },
      "sameAs": [
        "https://www.instagram.com/eevaggaofficial",
        "https://www.facebook.com/share/15UhbdRWh8/",
        "https://www.linkedin.com/company/evaga-entertainment",
        "https://x.com/eevagga"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://www.eevagga.com/#website",
      "url": "https://www.eevagga.com",
      "name": "Eevagga Entertainment",
      "publisher": { "@id": "https://www.eevagga.com/#organization" },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://www.eevagga.com/search?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    }
  ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://accounts.google.com" />
        <link rel="preconnect" href="https://d3a9w2e6vszgj1.cloudfront.net" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://connect.facebook.net" />
        <link rel="dns-prefetch" href="https://api.eevagga.com" />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema).replace(/</g, '\\u003c') }}
        />
        <Suspense fallback={null}>
          <Providers>
            <ClientLayout>{children}</ClientLayout>
          </Providers>
        </Suspense>

        {/* Google Analytics & Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-PQLCBFK5');
          `}
        </Script>

        {/* Meta Pixel Code */}
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            (function () {
              window._fbq = window._fbq || [];
              window.fbq = function () { window._fbq.push(arguments); };
              window.fbq.push = window._fbq.push;
              window.fbq.loaded = true;
              window.fbq.version = "2.0";
              window.fbq.queue = [];
              var script = document.createElement("script");
              script.src = "https://connect.facebook.net/en_US/fbevents";
              script.async = true;
              script.defer = true;
              script.onload = function () {
                fbq("init", "1539348276629405");
                fbq("track", "PageView");
              };
              document.head.appendChild(script);
            })();
          `}
        </Script>

        {/* Google Sign-In */}
        <Script
          src="https://accounts.google.com/gsi/client"
          strategy="afterInteractive"
        />

        {/* noscript Fallbacks */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PQLCBFK5"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1539348276629405&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </body>
    </html>
  );
}
