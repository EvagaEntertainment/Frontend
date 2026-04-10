import { Suspense } from 'react';
import PageComponent from '../../pages/OrderSucessPage';

export default function Page() {
  return <Suspense fallback={null}><PageComponent /></Suspense>;
}


