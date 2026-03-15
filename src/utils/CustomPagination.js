import { Pagination, Stack } from "@mui/material";
import React from "react";

function CustomPagination({ totalPage, currentPage, onChange }) {
  const style = {
    "& .MuiPaginationItem-root": {
      color: "#4B5563", // Tailwind gray-600
      fontWeight: "600",
      fontSize: "0.95rem",
      backgroundColor: "transparent",
      border: "1px solid transparent",
      transition: "all 0.3s ease",
      margin: "0 4px",
      fontFamily: "inherit",
    },
    "& .MuiPaginationItem-root:hover": {
      backgroundColor: "#f3e8ff", // Tailwind purple-100
      color: "#7e22ce", // Tailwind purple-700
      border: "1px solid #e9d5ff", // Tailwind purple-200
    },
    "& .Mui-selected": {
      backgroundColor: "#7e22ce !important",
      color: "white !important",
      border: "1px solid #7e22ce",
      boxShadow: "0 4px 14px rgba(126, 34, 206, 0.35)",
    },
    "& .Mui-selected:hover": {
      backgroundColor: "#6b1eaf !important", // Slightly darker purple
    },
    "& .MuiPaginationItem-ellipsis": {
      color: "#9CA3AF", // Tailwind gray-400
      border: "none",
      backgroundColor: "transparent",
    },
    "& .MuiPaginationItem-previousNext": {
      backgroundColor: "white",
      border: "1px solid #E5E7EB", // Tailwind gray-200
      color: "#6B7280", // Tailwind gray-500
      boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
    },
    "& .MuiPaginationItem-previousNext:hover": {
      backgroundColor: "#f8f5fd",
      color: "#7e22ce",
      borderColor: "#e9d5ff",
    },
  };

  return (
    <div className="flex items-center justify-center w-full py-4">
      <Stack spacing={2} alignItems="center">
        <Pagination
          count={totalPage > 0 ? totalPage : 1}
          page={currentPage}
          onChange={onChange}
          sx={style}
          size="large"
          shape="rounded"
        />
      </Stack>
    </div>
  );
}

export default CustomPagination;
