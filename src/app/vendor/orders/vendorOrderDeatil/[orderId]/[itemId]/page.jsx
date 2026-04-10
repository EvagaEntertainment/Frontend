import { Suspense } from 'react';
import PageComponent from '../../../../../../pages/Vendor/VendorOrderDetailPage';

export default function Page() {
  return (
    <Suspense fallback={null}>
      <PageComponent />
    </Suspense>
  );
}
