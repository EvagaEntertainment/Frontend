import { Suspense } from 'react';
import PageComponent from '../../../pages/Vendor/VendorSignUpPage';

export const metadata = { robots: { index: false, follow: false } };

export default function Page() {
  return <Suspense fallback={null}><PageComponent /></Suspense>;
}


