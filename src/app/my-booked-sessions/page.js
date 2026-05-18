"use client";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/provider/AuthProvider";
import Swal from "sweetalert2";

export default function MyBookedSessions() {
  const { user, loading: authLoading } = useContext(AuthContext); // Brought in authLoading if available
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. If Firebase confirms the user is definitely logged out, stop the spinner
    if (user === null) {
      setLoading(false);
      return;
    }

    if (user?.email) {
      fetch(`http://localhost:5000/my-booked-sessions?email=${user.email}`)
        .then((res) => {
          if (!res.ok) throw new Error("Network response was not ok");
          return res.json();
        })
        .then((data) => {
          setBookings(data);
          setLoading(false); // Success path
        })
        .catch((error) => {
          console.error("Error fetching bookings:", error);
          setLoading(false); // 🚨 CRITICAL: Stops spinner even if backend breaks!
        });
    }
  }, [user]);

  // ❌ Cancel/Delete Action
  const handleCancelBooking = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to cancel this tutoring session?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#3b82f6",
      confirmButtonText: "Yes, cancel it!"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/cancel-booking/${id}`, {
          method: "DELETE"
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire("Cancelled!", "Your tutoring session has been removed.", "success");
              setBookings(bookings.filter((booking) => booking._id !== id));
            }
          })
          .catch((err) => console.error("Cancellation error:", err));
      }
    });
  };

  // If Firebase authentication itself is still loading, show a quick message
  if (authLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-secondary mb-2"></span>
          <p className="text-gray-400">Verifying authentication status...</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // If user is completely logged out
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center gap-4 bg-base-200">
        <h2 className="text-2xl font-bold text-error">Access Denied</h2>
        <p className="text-gray-400">Please log in to view your booked sessions.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-base-100 shadow-xl rounded-2xl p-6">
        <h2 className="text-3xl font-bold mb-2 text-blue-500">My Booked Sessions</h2>
        <p className="text-gray-400 mb-8">Manage your scheduled sessions and connect with your tutors.</p>
        
        {bookings.length === 0 ? (
          <div className="text-center py-12 bg-base-200 rounded-xl">
            <p className="text-xl text-gray-500">You haven't booked any sessions yet!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bookings.map((booking) => (
              <div key={booking._id} className="flex items-center gap-4 bg-base-200 p-4 rounded-xl shadow-md border border-base-300 relative group">
                <img src={booking.image || "https://placehold.co/150"} alt="" className="w-24 h-24 rounded-lg object-cover" />
                <div className="flex-1">
                  <h3 className="font-bold text-2xl">{booking.tutorName}</h3>
                  <div className="badge badge-sm badge-outline badge-primary mt-1">{booking.subject}</div>
                  <p className="text-blue-500 font-bold mt-2 text-lg">Fee Paid: ${booking.fee}</p>
                  <p className="text-xs text-gray-500 mt-1">Booked on: {booking.bookedAt}</p>
                </div>
                
                <button 
                  onClick={() => handleCancelBooking(booking._id)} 
                  className="btn btn-error btn-sm text-white absolute bottom-4 right-4"
                >
                  Cancel Session
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}