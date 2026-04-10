import { Suspense } from 'react';
import PageComponent from '../../../pages/Vendor/VendorService';

export default function Page() {
  return <Suspense fallback={null}><PageComponent /></Suspense>;
}


