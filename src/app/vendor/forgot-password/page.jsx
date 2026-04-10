import { Suspense } from 'react';
import PageComponent from '../../../pages/Vendor/VendorForgotPasswordPage';

export default function Page() {
  return <Suspense fallback={null}><PageComponent /></Suspense>;
}


