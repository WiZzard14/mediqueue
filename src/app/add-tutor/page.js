"use client";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/provider/AuthProvider";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function AddTutor() {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    document.title = "MediQueue | Add Tutor Slot";
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  const handleAddTutor = (e) => {
    e.preventDefault();
    const form = e.target;

    const newTutorDoc = {
      name: form.name.value,
      email: user?.email,
      image: form.image.value,
      subject: form.subject.value,
      daysTime: form.daysTime.value, 
      fee: parseInt(form.fee.value),
      totalSlot: parseInt(form.totalSlot.value),
      sessionDate: form.sessionDate.value,
      institutionExperience: form.institutionExperience.value,
      location: form.location.value,
      teachingMode: form.teachingMode.value
    };

    fetch("http://localhost:5000/add-tutor", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("mediqueue-access-token")}`
      },
      body: JSON.stringify(newTutorDoc),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({ title: "Created!", text: "Tutor entry listed successfully into index database.", icon: "success" });
          form.reset();
        }
      })
      .catch((err) => Swal.fire("Failure", err.message, "error"));
  };

  if (loading) return <div className="min-h-screen flex justify-center items-center"><span className="loading loading-spinner loading-lg text-primary"></span></div>;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4 transition-colors duration-300">
      <div className="max-w-4xl mx-auto bg-base-100 shadow-2xl rounded-3xl p-8 border border-base-300">
        <h2 className="text-3xl font-black text-center text-blue-500 mb-2">Create Tutoring Profile</h2>
        <p className="text-center text-gray-400 mb-8 text-sm">Provide your structural schedules, rates, and criteria details below.</p>
        
        <form onSubmit={handleAddTutor} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-control"><label className="label font-bold text-sm">Tutor Display Name</label>
            <input type="text" name="name" placeholder="John Doe" className="input input-bordered" required /></div>
          
          <div className="form-control"><label className="label font-bold text-sm">Display Photo Avatar URL</label>
            <input type="url" name="image" placeholder="https://postimg.cc/..." className="input input-bordered" required /></div>
          
          <div className="form-control"><label className="label font-bold text-sm">Subject Category</label>
            <select name="subject" className="select select-bordered" required defaultValue="">
              <option value="" disabled>Select Core Subject Focus</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Biology">Biology</option>
              <option value="English">English</option>
              <option value="Computer Science">Computer Science</option>
            </select></div>

          <div className="form-control"><label className="label font-bold text-sm">Available Days & Time Window</label>
            <input type="text" name="daysTime" placeholder="Sun - Thu 5:00 PM - 8:00 PM" className="input input-bordered" required /></div>

          <div className="form-control"><label className="label font-bold text-sm">Hourly Premium Fee ($)</label>
            <input type="number" name="fee" placeholder="45" className="input input-bordered" required min="1" /></div>

          <div className="form-control"><label className="label font-bold text-sm">Total Seats / Slots Allotted</label>
            <input type="number" name="totalSlot" placeholder="12" className="input input-bordered" required min="1" /></div>

          <div className="form-control"><label className="label font-bold text-sm">Session Commencement Date</label>
            <input type="date" name="sessionDate" className="input input-bordered" required /></div>

          <div className="form-control"><label className="label font-bold text-sm">Teaching Structural Mode</label>
            <select name="teachingMode" className="select select-bordered" required defaultValue="Online">
              <option value="Online">Online Sessions Only</option>
              <option value="Offline">Offline Physical Coaching</option>
              <option value="Both">Hybrid Matrix (Both)</option>
            </select></div>

          <div className="form-control md:col-span-2"><label className="label font-bold text-sm">Institution & Professional Background Experience</label>
            <input type="text" name="institutionExperience" placeholder="B.Sc. in Sociology - University of Dhaka (3 Years Experience)" className="input input-bordered" required /></div>

          <div className="form-control md:col-span-2"><label className="label font-bold text-sm">Operation Location Vector (Area/City)</label>
            <input type="text" name="location" placeholder="Banani, Dhaka" className="input input-bordered" required /></div>

          <div className="form-control md:col-span-2 mt-4">
            <button type="submit" className="btn btn-primary w-full text-white text-lg rounded-xl shadow-lg">Publish Tutor Listing</button>
          </div>
        </form>
      </div>
    </div>
  );
}