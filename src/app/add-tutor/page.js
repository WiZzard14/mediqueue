"use client";
import { useContext } from "react";
import { AuthContext } from "@/provider/AuthProvider";
import Swal from "sweetalert2";

export default function AddTutor() {
  const { user } = useContext(AuthContext);

  const handleAddTutor = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const image = form.image.value;
    const subject = form.subject.value;
    const fee = form.fee.value;
    const email = user?.email;

    const newTutor = { name, email, image, subject, fee: parseInt(fee) };

    fetch("http://localhost:5000/add-tutor", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newTutor),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "Tutor has been added to the database!",
            icon: "success",
            confirmButtonText: "Awesome",
          });
          form.reset();
        }
      })
      .catch((error) => {
        Swal.fire({ icon: "error", title: "Oops...", text: error.message });
      });
  };

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-base-100 shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">Add a New Tutor</h2>
        
        <form onSubmit={handleAddTutor} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-control w-full">
            <label className="label"><span className="label-text font-bold">Tutor Name</span></label>
            <input type="text" name="name" placeholder="E.g. John Doe" className="input input-bordered w-full" required />
          </div>

          <div className="form-control w-full">
            <label className="label"><span className="label-text font-bold">Image URL</span></label>
            <input type="url" name="image" placeholder="https://..." className="input input-bordered w-full" required />
          </div>

          <div className="form-control w-full">
            <label className="label"><span className="label-text font-bold">Subject</span></label>
            <select name="subject" className="select select-bordered w-full" required defaultValue="">
              <option value="" disabled>Pick a subject</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Biology">Biology</option>
              <option value="English">English</option>
              <option value="Computer Science">Computer Science</option>
            </select>
          </div>

          <div className="form-control w-full">
            <label className="label"><span className="label-text font-bold">Session Fee ($)</span></label>
            <input type="number" name="fee" placeholder="E.g. 50" className="input input-bordered w-full" required min="1" />
          </div>

          <div className="form-control w-full md:col-span-2">
            <label className="label"><span className="label-text font-bold">Added By (Your Email)</span></label>
            <input type="email" defaultValue={user?.email} readOnly className="input input-bordered w-full bg-gray-100 cursor-not-allowed" />
          </div>

          <div className="form-control w-full md:col-span-2 mt-4">
            <button type="submit" className="btn btn-primary w-full text-white text-lg">Add Tutor to Database</button>
          </div>
        </form>
      </div>
    </div>
  );
}