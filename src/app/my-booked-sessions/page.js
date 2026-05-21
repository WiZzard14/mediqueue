"use client";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/provider/AuthProvider";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function MyBookedSessions() {
  const { user, loading: authLoading } = useContext(AuthContext);
  const router = useRouter();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "MediQueue | My Scheduled Slots";
    if (!authLoading && !user) router.push("/login");
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user?.email) {
      fetch(`https://mediqueue-server-mocha.vercel.app/my-booked-sessions?email=${user.email}`, {
        headers: { authorization: `Bearer ${localStorage.getItem("mediqueue-access-token")}` }
      })
        .then((res) => {
          if (!res.ok) throw new Error("Verification check dropped status failure.");
          return res.json();
        })
        .then((data) => { setBookings(data); setLoading(false); })
        .catch(() => setLoading(false));
    }
  }, [user]);

  const handleCancelReservation = (id) => {
    Swal.fire({
      title: "Cancel this tuning session?",
      text: "This flips entry values over into cancelled states.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://mediqueue-server-mocha.vercel.app/cancel-booking/${id}`, {
          method: "PATCH", 
          headers: { authorization: `Bearer ${localStorage.getItem("mediqueue-access-token")}` }
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.modifiedCount > 0) {
              Swal.fire("Updated Status!", "Session allocation has been set to cancelled.", "success");
              // Update state matrix mapping to switch visual indicators instantly
              setBookings(bookings.map(b => b._id === id ? { ...b, status: "cancelled" } : b));
            }
          });
      }
    });
  };

  if (authLoading || loading) return <div className="min-h-screen flex justify-center items-center"><span className="loading loading-spinner loading-lg text-primary"></span></div>;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4 transition-colors duration-300">
      <div className="max-w-5xl mx-auto bg-base-100 shadow-xl rounded-2xl p-6 border border-base-300">
        <h2 className="text-3xl font-black mb-2 text-blue-500">My Scheduled Classes</h2>
        <p className="text-sm text-gray-400 mb-8">Review verification metrics and manage your live tutoring tokens.</p>

        {bookings.length === 0 ? (
          <div className="text-center py-12 bg-base-200 rounded-xl"><p className="text-xl text-gray-500">No scheduled sessions found under your profile.</p></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead><tr className="border-b border-base-300 text-sm"><th>Tutor Subject</th><th>Student Details</th><th>Registered Email</th><th>System Status Token</th><th className="text-right">Action Gate</th></tr></thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking._id} className="hover:bg-base-200 border-b border-base-200 transition-colors">
                    <td><div className="flex items-center gap-3"><div className="avatar"><div className="w-12 h-12 rounded-xl"><img src={booking.image} alt="" /></div></div><div><div className="font-bold text-lg">{booking.tutorName}</div><div className="text-xs text-gray-400">{booking.subject}</div></div></div></td>
                    <td className="font-medium text-base-content">{booking.studentName}</td>
                    <td className="text-sm text-gray-400">{booking.studentEmail}</td>
                    <td>
                      <span className={`badge font-bold px-3 py-2 text-xs uppercase tracking-wider ${booking.status === 'cancelled' ? 'badge-error text-white' : 'badge-success text-white'}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="text-right">
                      {booking.status !== "cancelled" ? (
                        <button onClick={() => handleCancelReservation(booking._id)} className="btn btn-outline btn-error btn-sm shadow-sm hover:text-white">Cancel Class</button>
                      ) : (
                        <span className="text-xs text-gray-500 italic font-medium pr-4">Slot Revoked</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}