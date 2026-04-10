import { Suspense } from 'react';
import PageComponent from '../../pages/SearchResultPage';

export default function Page() {
  return (
    <Suspense fallback={null}>
      <PageComponent />
    </Suspense>
  );
}
