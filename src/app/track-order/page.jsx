export const metadata = { robots: { index: false, follow: false } };

import { Suspense } from 'react';
import TrackOrderClient from './TrackOrderClient';

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading tracker...</div>}>
      <TrackOrderClient />
    </Suspense>
  );
}