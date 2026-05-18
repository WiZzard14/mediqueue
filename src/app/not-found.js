"use client";
import { useEffect } from "react";
import Link from "next/link";

export default function NotFound() {
  useEffect(() => {
    document.title = "MediQueue | 404 Not Found";
  }, []);

  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-base-100 border border-base-300 p-10 rounded-3xl shadow-2xl">
        
        <div className="w-24 h-24 rounded-full bg-red-500/10 border border-red-500 text-red-500 flex items-center justify-center text-5xl mx-auto mb-6 shadow-lg">
          ⚠️
        </div>

        <h1 className="text-7xl font-black text-error tracking-tighter mb-2">404</h1>
        <h2 className="text-2xl font-bold text-base-content mb-4">Page Vector Not Found</h2>
        
        <p className="text-sm text-gray-400 mb-8 leading-relaxed">
          The structural path layout or network routing parameters you are attempting to trace do not exist inside our active systems database.
        </p>

        <div className="form-control">
          <Link href="/" className="btn btn-primary text-white text-md font-bold rounded-xl shadow-lg">
            Return to Safety Matrix
          </Link>
        </div>

        <div className="mt-6 text-xs text-gray-500 font-medium">
          MediQueue Core Diagnostics &bull; CAT_02 System Check
        </div>

      </div>
    </div>
  );
}