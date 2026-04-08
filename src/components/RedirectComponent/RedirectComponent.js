'use client';
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";


const RedirectComponent = ({url, children }) => {
  const router = useRouter();

  useEffect(() => {
    if (url) {
      router.push(url);
    }
  }, [url, navigate]); 
  return<>{children}</>;
};

export default RedirectComponent;
