
export const metadata = {
  title: "Customer Service",
  description: "Get support and help for your Eevagga bookings.",
  alternates: { canonical: '/customer-service' },
};

import { Suspense } from 'react';
import PageComponent from '../../pages/CustomerService';

const srOnly = { position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 };

export default function Page() {
  return (
    <>
      <h1 style={srOnly}>Customer Service — Eevagga Support &amp; Help</h1>
      <Suspense fallback={null}><PageComponent /></Suspense>
    </>
  );
}
