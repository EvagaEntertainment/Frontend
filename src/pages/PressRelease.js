import React, { useEffect, useState } from "react";
import PressReleaseCard from "../components/Cards/PressReleaseCard";
import useServices from "../hooks/useServices";
import commonApis from "../services/commonApis";
import { Helmet } from "react-helmet-async";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";

function PressRelease() {
  const [links, setLinks] = useState([]);
  const getAllPublishedUrlsApi = useServices(commonApis.getAllPublishedUrls);
  const getAllPublishedUrlsHandle = async () => {
    const response = await getAllPublishedUrlsApi.callApi();
    setLinks(response ? response : []);
  };
  useEffect(() => {
    getAllPublishedUrlsHandle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Helmet>
        <title>Press Releases | Eevagga in the News</title>
        <meta
          name="description"
          content="Stay updated with the latest news, awards, and press releases from Eevagga."
        />
        <meta name="keywords" content="press releases, Eevagga news, media coverage" />
        <link rel="canonical" href={window.location.origin + window.location.pathname} />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <Breadcrumbs />
      <div className="w-full flex items-center justify-start gap-3 flex-wrap  px-[2%] py-[3%]">
        {links?.map((item, index) => (
          <PressReleaseCard key={index} articleUrl={item?.url} />
        ))}
      </div>
    </>
  );
}

export default PressRelease;
