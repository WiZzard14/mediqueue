"use client";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/provider/AuthProvider";
import Swal from "sweetalert2";
import Link from "next/link";

export default function MyTutors() {
  const { user } = useContext(AuthContext);
  const [myTutors, setMyTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch only the tutor profiles created by this logged-in user
  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/my-tutors?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setMyTutors(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [user]);

  // 🗑️ Delete/Remove Tutor Profile Action
  const handleDeleteTutor = (id) => {
    Swal.fire({
      title: "Remove this tutor?",
      text: "This will permanently delete this profile from the public marketplace!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#3b82f6",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/delete-tutor/${id}`, {
          method: "DELETE"
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Tutor profile has been removed.", "success");
              // Instantly update UI state to drop the row
              setMyTutors(myTutors.filter((tutor) => tutor._id !== id));
            }
          });
      }
    });
  };

  if (loading) return <div className="min-h-screen flex justify-center items-center"><span className="loading loading-spinner loading-lg text-primary"></span></div>;

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center gap-4 bg-base-200">
        <h2 className="text-2xl font-bold text-error">Access Denied</h2>
        <p className="text-gray-400">Please log in to manage your tutor profiles.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-base-100 shadow-xl rounded-2xl p-6">
        <h2 className="text-3xl font-bold mb-2 text-blue-500">My Tutor Profiles</h2>
        <p className="text-gray-400 mb-8">Manage the tutoring slots you have created and listed publicly.</p>

        {myTutors.length === 0 ? (
          <div className="text-center py-12 bg-base-200 rounded-xl">
            <p className="text-xl text-gray-500">You haven't listed any tutor profiles yet!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full bg-base-100">
              {/* Table Head */}
              <thead>
                <tr className="text-lg border-b border-base-300">
                  <th>Tutor Info</th>
                  <th>Subject</th>
                  <th>Hourly Rate</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              {/* Table Body */}
              <tbody>
                {myTutors.map((tutor) => (
                  <tr key={tutor._id} className="hover:bg-base-200 border-b border-base-300 transition-colors">
                    <td>
                      <div className="flex items-center gap-4">
                        <div className="avatar">
                          <div className="w-14 h-14 rounded-xl shadow-inner">
                            <img src={tutor.image} alt={tutor.name} className="object-cover" />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold text-xl">{tutor.name}</div>
                          <div className="text-sm text-gray-400">{tutor.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-primary badge-md p-3 font-medium">{tutor.subject}</span>
                    </td>
                    <td className="text-lg font-semibold text-green-500">
                      ${tutor.fee}/hr
                    </td>
                    <td className="text-right space-x-2">
                        <Link 
                            href={`/my-tutors/edit/${tutor._id}`} 
                            className="btn btn-warning btn-sm text-slate-900 px-4 hover:bg-yellow-500"
                        >
                            Edit
                        </Link>
                        
                        <button 
                            onClick={() => handleDeleteTutor(tutor._id)} 
                            className="btn btn-error btn-sm text-white px-4 hover:bg-red-600"
                        >
                            Delete Listing
                        </button>
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