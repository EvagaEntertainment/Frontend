export const metadata = { robots: { index: false, follow: false } };

import SearchClient from './SearchClient';

export default function Page() {
  return <SearchClient />;
}