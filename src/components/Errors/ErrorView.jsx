'use client';

import React from "react";
import { useRouter } from "next/navigation";


export default function ErrorView({ error }) {
  const router = useRouter();

  if (!error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-highlight"></div>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-primary text-secondaryWhite">
      <h1 className="text-6xl mb-4">Oops! Something went wrong.</h1>
      <p className="text-xl mb-8">{error}</p>
      <button
        onClick={() => router.push(-1)}
        className="px-6 py-3 text-white bg-accent hover:bg-purpleSecondary transition duration-300 rounded-lg"
      >
        Go Back
      </button>
    </div>
  );
}
