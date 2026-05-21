"use client";
import { useEffect, useState, useContext } from "react";
import { useParams, useRouter } from "next/navigation";
import { AuthContext } from "@/provider/AuthProvider";
import Swal from "sweetalert2";

export default function TutorDetails() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "MediQueue | Tutor Registration Hub";
    fetch(`https://mediqueue-server-mocha.vercel.app/tutors/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTutor(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleBookingExecution = (e) => {
    e.preventDefault();
    
    // --- TARGET CRITERIA STATE VALIDATIONS ---
    if (parseInt(tutor.totalSlot) <= 0) {
      return Swal.fire("Blocked", "No available slots left.", "error");
    }

    const todayStr = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
    if (todayStr < tutor.sessionDate) {
      return Swal.fire("Unavailable", "Booking is not available yet for this tutor", "error");
    }

    const form = e.target;
    const bookingPayload = {
      tutorId: tutor._id,
      tutorName: tutor.name,
      subject: tutor.subject,
      fee: tutor.fee,
      image: tutor.image,
      studentName: form.studentName.value,
      studentPhone: form.studentPhone.value,
      studentEmail: user?.email,
      bookedAt: new Date().toLocaleDateString()
    };

    fetch("https://mediqueue-server-mocha.vercel.app/book-session", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("mediqueue-access-token")}`
      },
      body: JSON.stringify(bookingPayload)
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire("Success", `Registered with ${tutor.name}. Seat saved.`, "success");
          // Re-sync local state down to match structural shifts
          setTutor({ ...tutor, totalSlot: tutor.totalSlot - 1 });
          document.getElementById("booking-modal-control").checked = false; // Close modal window overlay
          router.push("/my-booked-sessions");
        }
      })
      .catch((err) => Swal.fire("Transaction Error", err.message, "error"));
  };

  if (loading) return <div className="min-h-screen flex justify-center items-center"><span className="loading loading-spinner loading-lg text-primary"></span></div>;
  if (!tutor) return <p className="text-center font-bold text-error mt-20">No matching tutor trace detected.</p>;

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4 transition-colors duration-300">
      <div className="max-w-5xl mx-auto bg-base-100 rounded-3xl shadow-2xl border border-base-300 overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <div className="h-full relative bg-base-300">
          <img src={tutor.image} alt={tutor.name} className="w-full h-full object-cover min-h-[350px]" />
        </div>
        <div className="p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-4xl font-black text-blue-500 mb-2">{tutor.name}</h2>
            <div className="badge badge-primary p-3 mb-4 font-bold">{tutor.subject}</div>
            <div className="space-y-3 text-md border-t border-base-200 pt-4 text-gray-400">
              <p><span className="font-bold text-base-content">🏢 Background:</span> {tutor.institutionExperience}</p>
              <p><span className="font-bold text-base-content">🗓️ Schedule Window:</span> {tutor.daysTime}</p>
              <p><span className="font-bold text-base-content">📍 Operational Range:</span> {tutor.location} ({tutor.teachingMode})</p>
              <p><span className="font-bold text-base-content">🚀 Launch Target:</span> {tutor.sessionDate}</p>
              <p><span className="font-bold text-base-content">🪑 Remaining Availability:</span> 
                <span className={`ml-2 badge ${tutor.totalSlot === 0 ? 'badge-error' : 'badge-neutral'} font-bold`}>{tutor.totalSlot} Slots Open</span>
              </p>
            </div>
          </div>

          <div className="mt-8 border-t border-base-200 pt-4">
            <div className="flex justify-between items-center mb-6">
              <span className="font-black text-sm uppercase tracking-wider text-gray-400">Calculated Premium</span>
              <span className="text-3xl font-black text-green-500">${tutor.fee}<span className="text-xs font-normal text-gray-400"> / hour</span></span>
            </div>

            {tutor.totalSlot === 0 ? (
              <button disabled className="btn btn-error btn-block text-white text-lg rounded-xl shadow-lg">This session is fully booked. You can’t join at the moment.</button>
            ) : (
              <label htmlFor="booking-modal-control" className="btn btn-primary btn-block text-white text-lg rounded-xl shadow-lg">Reserve Session Spot</label>
            )}
          </div>
        </div>
      </div>

      {/* COMPLIANT OVERLAY FORM WINDOW LAYER MODAL */}
      <input type="checkbox" id="booking-modal-control" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box bg-base-100 border border-base-300 shadow-2xl p-6 rounded-2xl relative">
          <label htmlFor="booking-modal-control" className="btn btn-sm btn-circle absolute right-4 top-4">✕</label>
          <h3 className="text-2xl font-black text-blue-500 mb-4">Confirm Appointment Profile</h3>
          <form onSubmit={handleBookingExecution} className="space-y-4">
            <div className="form-control"><label className="label font-bold text-xs">Student Complete Name</label>
              <input type="text" name="studentName" placeholder="Riadul Islam" className="input input-bordered" required /></div>
            <div className="form-control"><label className="label font-bold text-xs">Primary Contact Phone</label>
              <input type="tel" name="studentPhone" placeholder="+88017XXXXXXXX" className="input input-bordered" required /></div>
            <div className="form-control"><label className="label font-bold text-xs">Targeted Tutor ID Reference</label>
              <input type="text" value={tutor._id} readOnly className="input input-bordered bg-base-200 cursor-not-allowed text-xs text-gray-500" /></div>
            <div className="form-control"><label className="label font-bold text-xs">Tutor Name Reference</label>
              <input type="text" value={tutor.name} readOnly className="input input-bordered bg-base-200 cursor-not-allowed font-medium text-gray-500" /></div>
            <div className="form-control"><label className="label font-bold text-xs">Student Profile Authentication Identity</label>
              <input type="email" value={user?.email || ""} readOnly className="input input-bordered bg-base-200 cursor-not-allowed text-gray-500" /></div>
            <button type="submit" className="btn btn-primary w-full text-white mt-4 shadow-lg rounded-xl">Execute Booking Matrix</button>
          </form>
        </div>
      </div>
    </div>
  );
}