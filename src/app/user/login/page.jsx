import { Suspense } from 'react';
import PageComponent from '../../../pages/User/UserLoginPage';

export default function Page() {
  return <Suspense fallback={null}><PageComponent /></Suspense>;
}


