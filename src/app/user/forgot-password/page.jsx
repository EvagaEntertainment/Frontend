import { Suspense } from 'react';
import PageComponent from '../../../pages/User/UserForgotPassword';

export default function Page() {
  return <Suspense fallback={null}><PageComponent /></Suspense>;
}


