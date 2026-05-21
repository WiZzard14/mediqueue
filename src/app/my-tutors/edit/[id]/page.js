"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function EditTutor() {
  const { id } = useParams();
  const router = useRouter();
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://mediqueue-server-mocha.vercel.app/tutors/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTutor(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleUpdateTutor = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const image = form.image.value;
    const subject = form.subject.value;
    const fee = form.fee.value;

    const updatedTutor = { name, image, subject, fee: parseInt(fee) };

    fetch(`https://mediqueue-server-mocha.vercel.app/update-tutor/${id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(updatedTutor),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire({
            title: "Success!",
            text: "Tutor details updated perfectly!",
            icon: "success",
            confirmButtonText: "Back to Dashboard",
          }).then(() => {
            router.push("/my-tutors"); 
          });
        } else {
          Swal.fire("No Changes", "You didn't alter any data fields.", "info");
        }
      });
  };

  if (loading) return <div className="min-h-screen flex justify-center items-center"><span className="loading loading-spinner loading-lg text-primary"></span></div>;
  if (!tutor) return <p className="text-center text-error mt-20 font-bold">Tutor profile data could not be found.</p>;

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-base-100 shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-amber-500 mb-2">Modify Tutor Profile</h2>
        <p className="text-gray-400 text-center mb-8">Update your listing details below to instantly sync across the application.</p>
        
        <form onSubmit={handleUpdateTutor} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-control w-full">
            <label className="label"><span className="label-text font-bold">Tutor Name</span></label>
            <input type="text" name="name" defaultValue={tutor.name} className="input input-bordered w-full" required />
          </div>

          <div className="form-control w-full">
            <label className="label"><span className="label-text font-bold">Image URL</span></label>
            <input type="url" name="image" defaultValue={tutor.image} className="input input-bordered w-full" required />
          </div>

          <div className="form-control w-full">
            <label className="label"><span className="label-text font-bold">Subject Specialty</span></label>
            <select name="subject" className="select select-bordered w-full" required defaultValue={tutor.subject}>
              <option value="Mathematics">Mathematics</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Biology">Biology</option>
              <option value="English">English</option>
              <option value="Computer Science">Computer Science</option>
            </select>
          </div>

          <div className="form-control w-full">
            <label className="label"><span className="label-text font-bold">Hourly Rate ($)</span></label>
            <input type="number" name="fee" defaultValue={tutor.fee} className="input input-bordered w-full" required min="1" />
          </div>

          <div className="form-control w-full md:col-span-2 mt-6 flex gap-4">
            <button type="submit" className="btn btn-warning flex-1 text-slate-900 text-lg">Save Modifications</button>
            <button type="button" onClick={() => router.push("/my-tutors")} className="btn btn-outline flex-1 text-lg">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}