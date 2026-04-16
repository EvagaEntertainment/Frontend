'use client';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function UTMTracker() {
    const searchParams = useSearchParams();
    useEffect(() => {
        if (searchParams?.toString()?.includes("utm_")) {
            const utmParams = {
                utm_source: searchParams.get("utm_source"),
                utm_medium: searchParams.get("utm_medium"),
                utm_campaign: searchParams.get("utm_campaign"),
                utm_term: searchParams.get("utm_term"),
                utm_content: searchParams.get("utm_content"),
            };
            sessionStorage.setItem("utmParams", JSON.stringify(utmParams));
        }
    }, [searchParams]);
    return null;
}