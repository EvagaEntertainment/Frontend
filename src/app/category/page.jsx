import { Suspense } from 'react';
import PageComponent from '../../pages/CatgeoryPage';

export default function Page() {
  return <Suspense fallback={null}><PageComponent /></Suspense>;
}


