"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Banner from "@/components/Banner";
import Stats from "@/components/Stats";
import HowItWorks from "@/components/HowItWorks";

export default function Home() {
  const [previewTutors, setPreviewTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/tutors")
      .then((res) => res.json())
      .then((data) => {
        setPreviewTutors(data.slice(0, 6)); 
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="w-11/12 max-w-7xl mx-auto">
      <Banner />

      <div className="py-20">
        <h2 className="text-4xl font-bold text-center mb-4">Featured Tutors</h2>
        <p className="text-gray-500 text-center mb-12">Learn from our top-rated industry experts</p>
        
        {loading ? (
          <div className="flex justify-center h-40 items-center">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {previewTutors.map((tutor) => (
                <div key={tutor._id} className="card bg-base-100 shadow-xl border border-base-300 hover:-translate-y-2 transition-transform duration-300">
                  <figure className="px-6 pt-6">
                    <img src={tutor.image} alt={tutor.name} className="rounded-xl h-48 w-full object-cover" />
                  </figure>
                  <div className="card-body items-center text-center">
                    <h2 className="card-title text-2xl">{tutor.name}</h2>
                    <div className="badge badge-primary badge-outline mb-2">{tutor.subject}</div>
                    <p className="text-gray-400 font-medium">Fee: <span className="text-blue-500 font-bold">${tutor.fee}</span></p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-12">
              <Link href="/tutors" className="btn btn-outline btn-primary btn-wide text-lg">
                View All Tutors
              </Link>
            </div>
          </>
        )}

        {!loading && previewTutors.length === 0 && (
          <p className="text-center text-xl text-gray-500">No tutors found in the database. Add some via the admin panel!</p>
        )}
      </div>
      
      <Stats />
      <HowItWorks />
      
    </div>
  );
}