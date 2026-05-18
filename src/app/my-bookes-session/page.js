"use client";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/provider/AuthProvider";

export default function MyBookedSessions() {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/my-booked-sessions?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setBookings(data);
          setLoading(false);
        });
    }
  }, [user]);

  if (loading) return <div className="text-center py-20"><span className="loading loading-spinner loading-lg"></span></div>;

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-base-100 shadow-xl rounded-2xl p-6">
        <h2 className="text-3xl font-bold mb-6">My Booked Sessions</h2>
        
        {bookings.length === 0 ? (
          <p className="text-gray-400 text-center py-10">You haven't booked any tutoring sessions yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bookings.map((booking) => (
              <div key={booking._id} className="flex items-center gap-4 bg-base-200 p-4 rounded-xl shadow-sm">
                <img src={booking.image} alt="" className="w-20 h-20 rounded-lg object-cover" />
                <div>
                  <h3 className="font-bold text-xl">{booking.tutorName}</h3>
                  <p className="text-sm text-gray-400">{booking.subject}</p>
                  <p className="text-blue-500 font-semibold mt-1">Cost: ${booking.fee}</p>
                  <span className="badge badge-success badge-sm mt-2 text-white">Confirmed</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}