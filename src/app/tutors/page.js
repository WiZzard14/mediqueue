"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Tutors() {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [startRange, setStartRange] = useState("");
  const [endRange, setEndRange] = useState("");

  useEffect(() => {
    document.title = "MediQueue | Explore Mentors";
    fetchTutors();
  }, []);

  const fetchTutors = (searchStr = "", start = "", end = "") => {
    setLoading(true);
    const params = new URLSearchParams();
    if (searchStr) params.append("search", searchStr);
    if (start) params.append("startDate", start);
    if (end) params.append("endDate", end);

    fetch(`http://localhost:5000/tutors?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setTutors(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const handleQuerySearch = (e) => {
    e.preventDefault();
    fetchTutors(search, startRange, endRange);
  };

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-black text-center text-blue-500 mb-2">Browse Expert Tutors</h2>
        <p className="text-center text-gray-400 mb-10 text-sm">Refine listings instantly using backend query evaluation pipelines.</p>

        <form onSubmit={handleQuerySearch} className="bg-base-100 p-6 rounded-2xl shadow-md border border-base-300 mb-12 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div className="form-control">
            <label className="label font-semibold text-xs text-gray-400">Search by Name</label>
            <input type="text" placeholder="Search tutors..." value={search} onChange={(e) => setSearch(e.target.value)} className="input input-bordered w-full" />
          </div>
          <div className="form-control">
            <label className="label font-semibold text-xs text-gray-400">Commencement From</label>
            <input type="date" value={startRange} onChange={(e) => setStartRange(e.target.value)} className="input input-bordered w-full" />
          </div>
          <div className="form-control">
            <label className="label font-semibold text-xs text-gray-400">Commencement Until</label>
            <input type="date" value={endRange} onChange={(e) => setEndRange(e.target.value)} className="input input-bordered w-full" />
          </div>
          <button type="submit" className="btn btn-primary text-white w-full shadow-md">Apply Filters</button>
        </form>

        {loading ? (
          <div className="flex justify-center items-center h-40"><span className="loading loading-spinner loading-lg text-primary"></span></div>
        ) : tutors.length === 0 ? (
          <div className="text-center py-16 bg-base-100 border border-base-300 rounded-2xl">
            <p className="text-xl font-bold text-gray-400">No matching tutor profiles are currently registered.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tutors.map((tutor) => (
              <div key={tutor._id} className="card bg-base-100 border border-base-300 shadow-xl rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform duration-300 flex flex-col justify-between">
                <div>
                  <figure className="h-48 relative bg-base-300">
                    <img src={tutor.image} alt={tutor.name} className="w-full h-full object-cover" />
                    <div className="absolute top-3 right-3 badge badge-primary p-3 font-bold shadow-md">{tutor.subject}</div>
                  </figure>
                  <div className="card-body p-6">
                    <h2 className="card-title text-2xl font-black mb-1">{tutor.name}</h2>
                    <p className="text-sm text-gray-400 mb-2 truncate">🏢 {tutor.institutionExperience}</p>
                    <div className="space-y-1 text-sm border-t border-base-200 pt-3 mt-2">
                      <p>🗓️ <span className="font-semibold">Schedule:</span> {tutor.daysTime}</p>
                      <p>📍 <span className="font-semibold">Location:</span> {tutor.location} ({tutor.teachingMode})</p>
                      <p>🪑 <span className="font-semibold">Available Slots:</span> <span className={`font-bold ${tutor.totalSlot === 0 ? 'text-red-500' : 'text-blue-500'}`}>{tutor.totalSlot} Seats left</span></p>
                    </div>
                  </div>
                </div>
                <div className="px-6 pb-6">
                  <div className="divider my-2"></div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Hourly Rate</span>
                    <span className="text-2xl font-black text-green-500">${tutor.fee}<span className="text-xs text-gray-400 font-normal">/hr</span></span>
                  </div>
                  <Link href={`/tutors/${tutor._id}`} className="btn btn-primary w-full text-white rounded-xl shadow-lg">Book Session</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}