"use client";
import { useEffect, useState, useContext } from "react";
import { useParams, useRouter } from "next/navigation";
import { AuthContext } from "@/provider/AuthProvider"; 
import Swal from "sweetalert2";
import Link from "next/link";

export default function TutorDetails() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useContext(AuthContext); 
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/tutors/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTutor(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleBooking = () => {
    if (!user?.email) {
      return Swal.fire("Access Denied", "Please log in to book a session!", "warning");
    }

    const bookingInfo = {
      tutorId: tutor._id,
      tutorName: tutor.name,
      subject: tutor.subject,
      fee: tutor.fee,
      image: tutor.image,
      studentEmail: user.email, 
      bookedAt: new Date().toLocaleDateString()
    };

    fetch("http://localhost:5000/book-session", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(bookingInfo)
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            title: "Session Booked!",
            text: `Successfully registered for a session with ${tutor.name}`,
            icon: "success",
            confirmButtonText: "Go to Dashboard"
          }).then(() => {
            router.push("/my-booked-sessions"); 
          });
        }
      });
  };

  if (loading) return <div className="min-h-screen flex justify-center items-center"><span className="loading loading-spinner loading-lg text-primary"></span></div>;
  if (!tutor) return <div className="min-h-screen flex flex-col justify-center items-center gap-4"><h2 className="text-2xl font-bold text-error">Tutor not found!</h2><button onClick={() => router.push("/tutors")} className="btn btn-primary">Back to Tutors</button></div>;

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-base-100 shadow-2xl rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <div className="h-64 md:h-full relative bg-gray-200">
          <img src={tutor.image} alt={tutor.name} className="w-full h-full object-cover" />
        </div>
        <div className="p-8 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-4xl font-bold text-blue-500">{tutor.name}</h2>
              <div className="badge badge-primary p-3 font-semibold">{tutor.subject}</div>
            </div>
            <div className="divider"></div>
            <div className="space-y-4 my-6">
              <p className="text-lg"><span className="font-bold text-gray-400">Expertise:</span> Professional {tutor.subject} Coach</p>
              <p className="text-lg"><span className="font-bold text-gray-400">Contact:</span> {tutor.email || "Not Provided"}</p>
              <p className="text-2xl font-semibold mt-4">Rate: <span className="text-green-500 font-bold">${tutor.fee}</span> / hr</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button onClick={handleBooking} className="btn btn-primary flex-1 text-white text-lg">
              Book a Session
            </button>
            <Link href="/tutors" className="btn btn-outline flex-1 text-lg">Back to Gallery</Link>
          </div>
        </div>
      </div>
    </div>
  );
}