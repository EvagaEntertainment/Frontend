import { Suspense } from 'react';
import PageComponent from '../../pages/Wishlist';

export default function Page() {
  return <Suspense fallback={null}><PageComponent /></Suspense>;
}


