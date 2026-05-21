"use client";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/provider/AuthProvider";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function MyTutors() {
  const { user, loading: authLoading } = useContext(AuthContext);
  const router = useRouter();
  const [myTutors, setMyTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTutor, setEditingTutor] = useState(null);

  useEffect(() => {
    document.title = "MediQueue | My Created Listings";
    if (!authLoading && !user) router.push("/login");
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user?.email) {
      fetch(`https://mediqueue-server-mocha.vercel.app/my-tutors?email=${user.email}`, {
        headers: { authorization: `Bearer ${localStorage.getItem("mediqueue-access-token")}` }
      })
        .then((res) => res.json())
        .then((data) => {
          // 🛡️ সেফটি ফিল্টার: ডাটাবেজে কোনো null বা broken ডেটা থাকলে তা এখানেই বাদ পড়ে যাবে
          const safeData = Array.isArray(data) ? data.filter(item => item && item._id) : [];
          setMyTutors(safeData);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [user]);

  const handleDelete = (id) => {
    if (!id) return;
    Swal.fire({
      title: "Confirm Deletion Entry?",
      text: "This removes the tutor instance permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://mediqueue-server-mocha.vercel.app/delete-tutor/${id}`, {
          method: "DELETE",
          headers: { authorization: `Bearer ${localStorage.getItem("mediqueue-access-token")}` }
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire("Purged!", "Entry removed.", "success");
              setMyTutors(myTutors.filter(t => t && t._id !== id));
            }
          });
      }
    });
  };

  const handleUpdateSave = (e) => {
    e.preventDefault();
    if (!editingTutor?._id) return; // 🛡️ এডিটিং টিউটর না থাকলে ফাংশনটি এখানেই থেমে যাবে

    const form = e.target;
    const updatedFields = {
      name: form.name.value,
      image: form.image.value,
      subject: form.subject.value,
      daysTime: form.daysTime.value,
      fee: parseInt(form.fee.value) || 0,
      totalSlot: parseInt(form.totalSlot.value) || 0,
      sessionDate: form.sessionDate.value,
      institutionExperience: form.institutionExperience.value,
      location: form.location.value,
      teachingMode: form.teachingMode.value
    };

    fetch(`https://mediqueue-server-mocha.vercel.app/update-tutor/${editingTutor._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("mediqueue-access-token")}`
      },
      body: JSON.stringify(updatedFields)
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire("Saved", "Tutor metrics sync complete.", "success");
          // 🛡️ অপশনাল চেইনিং (?. ) ব্যবহার করে সেফলি ম্যাপ করা হয়েছে
          setMyTutors(myTutors.map(t => (t && t._id === editingTutor?._id) ? { ...t, ...updatedFields } : t));
          setEditingTutor(null);
        }
      });
  };

  if (authLoading || loading) return <div className="min-h-screen flex justify-center items-center"><span className="loading loading-spinner loading-lg text-primary"></span></div>;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4 transition-colors duration-300">
      <div className="max-w-6xl mx-auto bg-base-100 shadow-xl rounded-2xl p-6 border border-base-300">
        <h2 className="text-3xl font-black mb-2 text-blue-500">My Registered Tutor Panels</h2>
        <p className="text-sm text-gray-400 mb-6">Manage data arrays matching your administrative user vector.</p>

        {myTutors.length === 0 ? (
          <div className="text-center py-12 bg-base-200 rounded-xl"><p className="text-xl text-gray-500">No records matching your account profile were found.</p></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead><tr className="border-b border-base-300 text-sm"><th>Tutor</th><th>Subject</th><th>Hourly Cost</th><th>Remaining Slots</th><th className="text-right">Actions</th></tr></thead>
              <tbody>
                {myTutors.map((tutor) => {
                  // 🛡️ কোনো কারণে টিউটর অবজেক্ট ডাটাবেজ থেকে করাপ্টেড আসলে রো-টি স্কিপ করবে
                  if (!tutor || !tutor._id) return null;
                  
                  return (
                    <tr key={tutor._id} className="hover:bg-base-200 border-b border-base-200 transition-colors">
                      <td><div className="flex items-center gap-3"><div className="avatar"><div className="w-12 h-12 rounded-xl"><img src={tutor.image} alt="" /></div></div><div><div className="font-bold text-lg">{tutor.name}</div><div className="text-xs text-gray-400">{tutor.location}</div></div></div></td>
                      <td><span className="badge badge-neutral font-medium">{tutor.subject}</span></td>
                      <td className="font-bold text-green-500">${tutor.fee}/hr</td>
                      <td className="font-semibold text-blue-500">{tutor.totalSlot} Slots</td>
                      <td className="text-right space-x-2">
                        <button onClick={() => setEditingTutor(tutor)} className="btn btn-warning btn-sm text-slate-900 shadow-md">Modify</button>
                        <button onClick={() => handleDelete(tutor._id)} className="btn btn-error btn-sm text-white shadow-md">Purge</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* FULL FIELD UPDATE MODAL GATE */}
      {editingTutor && (
        <div className="modal modal-open" role="dialog">
          <div className="modal-box max-w-2xl bg-base-100 border border-base-300 p-6 rounded-2xl shadow-2xl relative">
            <button onClick={() => setEditingTutor(null)} className="btn btn-sm btn-circle absolute right-4 top-4">✕</button>
            <h3 className="text-2xl font-black text-blue-500 mb-4">Edit Tutor Properties</h3>
            <form onSubmit={handleUpdateSave} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control"><label className="label font-bold text-xs">Name</label><input type="text" name="name" defaultValue={editingTutor?.name || ""} className="input input-bordered" required /></div>
              <div className="form-control"><label className="label font-bold text-xs">Photo URL</label><input type="url" name="image" defaultValue={editingTutor?.image || ""} className="input input-bordered" required /></div>
              <div className="form-control"><label className="label font-bold text-xs">Subject</label>
                <select name="subject" className="select select-bordered" defaultValue={editingTutor?.subject || "Mathematics"}>
                  <option value="Mathematics">Mathematics</option><option value="Physics">Physics</option><option value="Chemistry">Chemistry</option><option value="Biology">Biology</option><option value="English">English</option><option value="Computer Science">Computer Science</option>
                </select></div>
              <div className="form-control"><label className="label font-bold text-xs">Days & Time Window</label><input type="text" name="daysTime" defaultValue={editingTutor?.daysTime || ""} className="input input-bordered" required /></div>
              <div className="input-group grid grid-cols-2 gap-2">
                <div className="form-control"><label className="label font-bold text-xs">Fee ($)</label><input type="number" name="fee" defaultValue={editingTutor?.fee || 0} className="input input-bordered w-full" required min="1" /></div>
                <div className="form-control"><label className="label font-bold text-xs">Total Slots</label><input type="number" name="totalSlot" defaultValue={editingTutor?.totalSlot || 0} className="input input-bordered w-full" required min="0" /></div>
              </div>
              <div className="form-control"><label className="label font-bold text-xs">Commencement Date</label><input type="date" name="sessionDate" defaultValue={editingTutor?.sessionDate || ""} className="input input-bordered" required /></div>
              <div className="form-control"><label className="label font-bold text-xs">Teaching Mode</label>
                <select name="teachingMode" className="select select-bordered" defaultValue={editingTutor?.teachingMode || "Online"}>
                  <option value="Online">Online</option><option value="Offline">Offline</option><option value="Both">Both</option>
                </select></div>
              <div className="form-control md:col-span-2"><label className="label font-bold text-xs">Institution Background</label><input type="text" name="institutionExperience" defaultValue={editingTutor?.institutionExperience || ""} className="input input-bordered" required /></div>
              <div className="form-control md:col-span-2"><label className="label font-bold text-xs">Location Matrix</label><input type="text" name="location" defaultValue={editingTutor?.location || ""} className="input input-bordered" required /></div>
              <button type="submit" className="btn btn-primary w-full md:col-span-2 mt-4 text-white rounded-xl shadow-lg">Commit System Modifications</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}