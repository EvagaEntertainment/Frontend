import { Suspense } from 'react';
import PageComponent from '../../../pages/Vendor/VendorDashboard';

export default function Page() {
  return <Suspense fallback={null}><PageComponent /></Suspense>;
}


