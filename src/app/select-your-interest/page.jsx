export const metadata = { robots: { index: false, follow: false } };
import { Suspense } from 'react';
import PageComponent from '../../pages/InterestSelection';

export default function Page() {
  return <Suspense fallback={null}><PageComponent /></Suspense>;
}


