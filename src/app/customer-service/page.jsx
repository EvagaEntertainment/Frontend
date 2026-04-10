
export const metadata = {
  title: "Customer Service | Eevagga",
  description: "Get support and help for your Eevagga bookings."
};

import { Suspense } from 'react';
import PageComponent from '../../pages/CustomerService';

export default function Page() {
  return <Suspense fallback={null}><PageComponent /></Suspense>;
}

