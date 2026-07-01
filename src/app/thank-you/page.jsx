export const metadata = {
  title: "Thank You",
  robots: { index: false, follow: false },
};

import { Suspense } from 'react';
import PageComponent from '../../pages/ThankYou';

export default function Page() {
  return <Suspense fallback={null}><PageComponent /></Suspense>;
}

