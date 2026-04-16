
export const metadata = { robots: { index: false, follow: false } };

import OrderStatusClient from './OrderStatusClient';

export default function Page() {
  return <OrderStatusClient />;
}