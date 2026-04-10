'use client';
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useError } from "../../context/ErrorContext";
import ErrorModal from "./ErrorModal";
import { useRouter } from "next/navigation";

const ErrorHandler = () => {
  const { error, clearError } = useError();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleRedirectHome = () => {
    clearError();
    router.push("/");
  };

  if (!mounted || !error) return null;

  return ReactDOM.createPortal(
    <ErrorModal
      errorMessage={error}
      onClose={clearError}
      onRedirectHome={handleRedirectHome}
    />,
    document.getElementById("error-modal") || document.body
  );
};

export default ErrorHandler;
