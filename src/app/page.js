"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Banner from "@/components/Banner"; 
export default function Home() {
  const [featuredTutors, setFeaturedTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "MediQueue | Home";
    
    fetch("https://mediqueue-server-mocha.vercel.app/tutors")
      .then((res) => res.json())
      .then((data) => {
        setFeaturedTutors(data.slice(0, 6));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching homepage data:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-base-200 transition-colors duration-300">
      
      <Banner />

      <div className="max-w-7xl mx-auto py-20 px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-blue-500 mb-2">Featured Mentors</h2>
          <p className="text-gray-400 text-sm">Select a premier verified profile block below to map a direct reservation matrix.</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : featuredTutors.length === 0 ? (
          <div className="text-center py-12 bg-base-100 rounded-2xl border border-base-300">
            <p className="text-xl font-bold text-gray-400">No core mentor instances populated inside database indices yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTutors.map((tutor) => (
              <div key={tutor._id} className="card bg-base-100 border border-base-300 shadow-xl rounded-2xl overflow-hidden hover:scale-[1.01] transition-transform duration-300 flex flex-col justify-between">
                <div>
                  <figure className="h-48 bg-base-300 relative">
                    <img src={tutor.image} alt={tutor.name} className="w-full h-full object-cover" />
                    <div className="absolute top-3 right-3 badge badge-primary font-bold p-3 shadow-md">{tutor.subject}</div>
                  </figure>
                  <div className="card-body p-6">
                    <h3 className="card-title text-2xl font-black">{tutor.name}</h3>
                    <p className="text-xs text-gray-400 truncate mt-1">🏢 {tutor.institutionExperience}</p>
                    <div className="divider my-3"></div>
                    <div className="space-y-1 text-sm text-gray-400">
                      <p>📍 <span className="font-semibold text-base-content">Mode:</span> {tutor.teachingMode} Location Vectors</p>
                      <p>🪑 <span className="font-semibold text-base-content">Open Slots:</span> {tutor.totalSlot} Registered Seats</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-bold uppercase text-gray-400">Session Fee</span>
                    <span className="text-2xl font-black text-green-500">${tutor.fee}<span className="text-xs font-normal text-gray-400">/hr</span></span>
                  </div>
                  <Link href={`/tutors/${tutor._id}`} className="btn btn-primary w-full text-white rounded-xl shadow-md">Book Session</Link>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="text-center mt-12">
          <Link href="/tutors" className="btn btn-outline btn-primary px-8 rounded-xl font-bold">View All Listed Tutors</Link>
        </div>
      </div>

      <div className="bg-base-100 border-y border-base-300 py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-black text-blue-500 mb-2">Our Operational Performance Matrix</h2>
          <p className="text-sm text-gray-400 mb-12 max-w-lg mx-auto">Real-time systemic updates monitoring platform parameters and scheduling operations.</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 bg-base-200 rounded-2xl border border-base-300 shadow-md">
              <div className="text-4xl font-black text-primary mb-1">99.4%</div>
              <div className="font-bold text-base-content text-md">Scheduling Accuracy</div>
              <p className="text-xs text-gray-400 mt-2">Automated system filters block double bookings and overlapping timeline allocations entirely.</p>
            </div>
            <div className="p-6 bg-base-200 rounded-2xl border border-base-300 shadow-md">
              <div className="text-4xl font-black text-green-500 mb-1">15,000+</div>
              <div className="font-bold text-base-content text-md">Sessions Completed</div>
              <p className="text-xs text-gray-400 mt-2">Verified academic counseling hours successfully served to undergrad arrays globally.</p>
            </div>
            <div className="p-6 bg-base-200 rounded-2xl border border-base-300 shadow-md">
              <div className="text-4xl font-black text-amber-500 mb-1">4.9 / 5</div>
              <div className="font-bold text-base-content text-md">User Satisfaction Rating</div>
              <p className="text-xs text-gray-400 mt-2">Consistently scored highly by student entities evaluating learning matrix parameters.</p>
            </div>
            <div className="p-6 bg-base-200 rounded-2xl border border-base-300 shadow-md">
              <div className="text-4xl font-black text-purple-500 mb-1">200+</div>
              <div className="font-bold text-base-content text-md">Verified Educators</div>
              <p className="text-xs text-gray-400 mt-2">Professional background matrices verified by administrative clearing nodes.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-20 px-4 text-center">
        <h2 className="text-3xl font-black text-blue-500 mb-2">System Workflows Demystified</h2>
        <p className="text-sm text-gray-400 mb-12">Three intuitive operational deployment steps to secure an engineering or sociology session slot.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="flex flex-col items-center p-4">
            <div className="w-14 h-14 rounded-full bg-blue-500/10 border border-blue-500 text-blue-500 flex items-center justify-center font-black text-xl shadow-lg mb-4">01</div>
            <h4 className="text-xl font-bold mb-1">Authenticate Identity</h4>
            <p className="text-xs text-gray-400 max-w-xs">Register your user credentials or execute quick Google social identity node verification hooks.</p>
          </div>
          <div className="flex flex-col items-center p-4">
            <div className="w-14 h-14 rounded-full bg-blue-500/10 border border-blue-500 text-blue-500 flex items-center justify-center font-black text-xl shadow-lg mb-4">02</div>
            <h4 className="text-xl font-bold mb-1">Filter Metric Criteria</h4>
            <p className="text-xs text-gray-400 max-w-xs">Scan public gallery matrices using search queries matching tutor name or date boundaries.</p>
          </div>
          <div className="flex flex-col items-center p-4">
            <div className="w-14 h-14 rounded-full bg-blue-500/10 border border-blue-500 text-blue-500 flex items-center justify-center font-black text-xl shadow-lg mb-4">03</div>
            <h4 className="text-xl font-bold mb-1">Secure Digital Tokens</h4>
            <p className="text-xs text-gray-400 max-w-xs">Execute slot allocation requests. System handles auto seat reduction values immediately.</p>
          </div>
        </div>
      </div>

    </div>
  );
}