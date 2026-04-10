import { Suspense } from 'react';
import PageComponent from '../../pages/AdvertisewithUs';

export default function Page() {
  return <Suspense fallback={null}><PageComponent /></Suspense>;
}


