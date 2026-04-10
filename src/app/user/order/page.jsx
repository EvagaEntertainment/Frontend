import { Suspense } from 'react';
import PageComponent from '../../../pages/OrderPage';

export default function Page() {
  return <Suspense fallback={null}><PageComponent /></Suspense>;
}


