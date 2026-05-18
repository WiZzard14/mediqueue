"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Tutors() {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/tutors")
      .then((res) => res.json())
      .then((data) => {
        setTutors(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching tutors:", error);
        setLoading(false);
      });
  }, []);


  const filteredAndSortedTutors = tutors
    .filter((tutor) => {
      const matchesSearch = tutor.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchesSubject = selectedSubject 
        ? tutor.subject === selectedSubject 
        : true;

      return matchesSearch && matchesSubject;
    })
    .sort((a, b) => {
      // 3. Sort by Session Fee
      if (sortOrder === "lowToHigh") {
        return a.fee - b.fee;
      } else if (sortOrder === "highToLow") {
        return b.fee - a.fee;
      }
      return 0; 
    });

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        
        <h2 className="text-4xl font-bold text-center text-blue-500 mb-2">Available Tutors</h2>
        <p className="text-gray-400 text-center mb-10">Find and connect with the perfect mentor for your needs.</p>

        <div className="bg-base-100 p-6 rounded-2xl shadow-md mb-10 grid grid-cols-1 md:grid-cols-3 gap-4 border border-base-300">
          
          {/* 1. Search Field */}
          <div className="form-control w-full">
            <label className="label"><span className="label-text font-semibold">Search by Name</span></label>
            <input 
              type="text" 
              placeholder="Type tutor's name..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control w-full">
            <label className="label"><span className="label-text font-semibold">Filter by Subject</span></label>
            <select 
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="">All Subjects</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Biology">Biology</option>
              <option value="English">English</option>
              <option value="Computer Science">Computer Science</option>
            </select>
          </div>

          <div className="form-control w-full">
            <label className="label"><span className="label-text font-semibold">Sort by Fee</span></label>
            <select 
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="">Default (Newest)</option>
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
            </select>
          </div>

        </div>

        {filteredAndSortedTutors.length === 0 ? (
          <div className="text-center py-20 bg-base-100 rounded-3xl shadow-md border border-base-300">
            <p className="text-2xl font-semibold text-gray-500">No tutors match your search criteria.</p>
            <button 
              onClick={() => { setSearchQuery(""); setSelectedSubject(""); setSortOrder(""); }} 
              className="btn btn-primary mt-4 text-white"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAndSortedTutors.map((tutor) => (
              <div key={tutor._id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-300">
                <figure className="px-6 pt-6">
                  <img src={tutor.image} alt={tutor.name} className="rounded-xl h-48 w-full object-cover" />
                </figure>
                <div className="card-body items-center text-center">
                  <h2 className="card-title text-2xl">{tutor.name}</h2>
                  <div className="badge badge-primary badge-outline mb-2">{tutor.subject}</div>
                  <p className="text-gray-400 font-medium">Session Fee: <span className="text-blue-500 font-bold">${tutor.fee}/hr</span></p>
                  
                  <div className="card-actions w-full mt-4">
                    <Link href={`/tutors/${tutor._id}`} className="btn btn-primary w-full text-white text-md">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}