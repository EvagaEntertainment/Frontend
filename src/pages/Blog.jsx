'use client';
import React, { useEffect, useState } from "react";
import BlogCard from "../components/Cards/BlogCard";
import useServices from "../hooks/useServices";
import commonApis from "../services/commonApis";
import { Pagination, Stack } from "@mui/material";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";

function Blog() {
  const [allBlog, setAllBlog] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const getAllBlogsApi = useServices(commonApis.getAllBlogs);

  const style = {
    "& .Mui-selected": {
      backgroundColor: "#6A1B9A !important",
      color: "white",
    },
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const getAllBlogsApiHandle = async () => {
    const queryParams = {
      page: page || 1,
    };
    const response = await getAllBlogsApi.callApi(queryParams);
    setAllBlog(response ? response?.blogs : []);
    setTotalPages(response ? response?.totalPages : 1);
  };

  useEffect(() => {
    getAllBlogsApiHandle();
  }, [page]);

  return (
    <>
      <Breadcrumbs />
      <div className="min-h-[50vh] px-[3%] py-[3%] ">
      <h2 className="text-primary font-semibold text-2xl">All Blogs</h2>
      <div className="my-4 flex items-center justify-start flex-wrap gap-4 w-full">
        {allBlog?.length > 0 ? (
          allBlog.map((item) => <BlogCard key={item?.title} blog={item} />)
        ) : (
          <p className="text-gray-500 w-full text-center py-10">
            No blogs found.
          </p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center w-full py-6">
          <Stack spacing={2}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              sx={style}
            />
          </Stack>
        </div>
      )}
    </div>
    </>
  );
}

export default Blog;
