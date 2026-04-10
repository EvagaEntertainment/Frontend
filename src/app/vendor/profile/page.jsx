import { Suspense } from 'react';
import PageComponent from '../../../pages/Vendor/VendorProfilePage';

export default function Page() {
  return <Suspense fallback={null}><PageComponent /></Suspense>;
}


