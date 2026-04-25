import { Suspense } from 'react';
import PageComponent from '../../../pages/Admin/AdminDashboard';

export default function Layout({ children }) {
  return (
    <>
      <Suspense fallback={null}>
        <PageComponent />
      </Suspense>
      {children}
    </>
  );
}
