import { Suspense } from 'react';
import PageComponent from '../../../pages/Vendor/VendorLoginPage';

export default function Page() {
  return <Suspense fallback={null}><PageComponent /></Suspense>;
}


