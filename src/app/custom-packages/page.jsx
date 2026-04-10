import { Suspense } from 'react';
import PageComponent from '../../pages/CustomPackages';

export default function Page() {
  return <Suspense fallback={null}><PageComponent /></Suspense>;
}


