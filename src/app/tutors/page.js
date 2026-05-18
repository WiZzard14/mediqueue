"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Tutors() {
  const [tutors, setTutors] = useState([]); // Storage for our tutors
  const [loading, setLoading] = useState(true); // A loading spinner

  // Fetch the data as soon as the page loads!
  useEffect(() => {
    fetch("http://localhost:5000/tutors")
      .then((res) => res.json())
      .then((data) => {
        setTutors(data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-blue-600 mb-10">Available Tutors</h2>
        
        {/* If data is loading, show a spinner */}
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : (
          /* The Grid of Tutors */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tutors.map((tutor) => (
              <div key={tutor._id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all">
                <figure className="px-6 pt-6">
                  <img src={tutor.image} alt={tutor.name} className="rounded-xl h-48 w-full object-cover" />
                </figure>
                <div className="card-body items-center text-center">
                  <h2 className="card-title text-2xl">{tutor.name}</h2>
                  <div className="badge badge-primary badge-outline mb-2">{tutor.subject}</div>
                  <p className="text-gray-500 font-medium">Session Fee: <span className="text-blue-600 font-bold">${tutor.fee}</span></p>
                  
                  <div className="card-actions w-full mt-4">
                    {/* We will build the details page next! */}
                    <Link href={`/tutors/${tutor._id}`} className="btn btn-primary w-full text-white">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* What if there are no tutors yet? */}
        {!loading && tutors.length === 0 && (
          <p className="text-center text-xl text-gray-500 mt-10">No tutors available yet. Be the first to add one!</p>
        )}
      </div>
    </div>
  );
}