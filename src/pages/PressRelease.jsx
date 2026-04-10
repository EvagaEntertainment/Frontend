'use client';
import React, { useEffect, useState } from "react";
import PressReleaseCard from "../components/Cards/PressReleaseCard";
import useServices from "../hooks/useServices";
import commonApis from "../services/commonApis";
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
  }, []);

  return (
    <>
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
