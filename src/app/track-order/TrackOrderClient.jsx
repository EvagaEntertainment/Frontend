'use client';
import dynamic from 'next/dynamic';

const PageComponent = dynamic(() => import('../../pages/TrackOrder'), { ssr: false });

export default function TrackOrderClient() {
    return <PageComponent />;
}