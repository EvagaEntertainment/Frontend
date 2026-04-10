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

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata = {
  metadataBase: new URL('https://www.eevagga.com'),
  title: {
    default: 'Eevagga Entertainment',
    template: '%s | Eevagga'
  },
  description: 'India\'s Premium Birthday Celebration Platform',
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
  alternates: {
    canonical: './',
  },
  other: {
    'p:domain_verify': '4ffff8fe28fdfc5268597c4a91669fb1',
    'facebook-domain-verification': 'your_verification_id'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
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
          strategy="lazyOnload"
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
          />
        </noscript>
      </body>
    </html>
  );
}
