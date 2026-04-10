import { Suspense } from 'react';
import PageComponent from '../../../pages/Vendor/VendorCreateService';

export default function Page() {
  return <Suspense fallback={null}><PageComponent /></Suspense>;
}


