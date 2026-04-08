'use client';
import React from "react";
import { IoArrowBack } from "react-icons/io5";
import { useRouter } from "next/navigation";


const BackButton = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.push(-1);
  };

  return (
    <button
      onClick={handleGoBack}
      style={styles.button}
      className="flex items-center justify-center gap-1 text-textGray font-medium"
    >
      <IoArrowBack className="text-xl font-medium"/> Back
    </button>
  );
};

const styles = {
  button: {
    fontSize: "16px",
    border: "none",
    cursor: "pointer",
  },
};

export default BackButton;
