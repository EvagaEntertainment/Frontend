'use client';
import dynamic from 'next/dynamic';

const PageComponent = dynamic(() => import('../../pages/OrderSucessPage'), { ssr: false });

export default function OrderStatusClient() {
    return <PageComponent />;
}