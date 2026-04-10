import { Suspense } from 'react';
import PageComponent from '../../pages/TrackOrder';

export default function Page() {
  return <Suspense fallback={null}><PageComponent /></Suspense>;
}


