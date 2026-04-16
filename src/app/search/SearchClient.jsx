'use client';
import dynamic from 'next/dynamic';

const PageComponent = dynamic(() => import('../../pages/SearchResultPage'), { ssr: false });

export default function SearchClient() {
    return <PageComponent />;
}