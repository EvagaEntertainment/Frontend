import { Suspense } from 'react';
import PageComponent from '../../../pages/Admin/AdminDashboard';

export default function Page() {
  return <Suspense fallback={null}><PageComponent /></Suspense>;
}


