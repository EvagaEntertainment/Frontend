import { Suspense } from 'react';
import PageComponent from '../../pages/ViewAllPage';

export default function Page() {
  return <Suspense fallback={null}><PageComponent /></Suspense>;
}


