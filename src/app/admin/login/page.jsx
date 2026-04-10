import { Suspense } from 'react';
import PageComponent from '../../../pages/Admin/AdminLoginPage';

export default function Page() {
  return <Suspense fallback={null}><PageComponent /></Suspense>;
}


