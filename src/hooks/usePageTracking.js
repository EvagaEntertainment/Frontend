'use client';
import { useEffect } from "react";
import { usePathname } from "next/navigation";

import ReactGA from "react-ga4";

const usePageTracking = () => {
  const location = usePathname();

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname });
  }, [location]);
};

export default usePageTracking;
