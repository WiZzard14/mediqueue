"use client";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/provider/AuthProvider";

export default function MyTutors() {
  const { user } = useContext(AuthContext);
  const [myApplications, setMyApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/my-tutors?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setMyApplications(data);
          setLoading(false);
        });
    }
  }, [user]);

  // Set your personal email here to act as the Admin for testing
  const isAdmin = user?.email === "your-email@gmail.com"; 

  const handleApprove = (id) => {
    fetch(`http://localhost:5000/tutors/approve/${id}`, { method: "PATCH" })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          // Instantly refresh local state UI
          setMyApplications(myApplications.map(app => app._id === id ? {...app, status: 'approved'} : app));
        }
      });
  };

  if (loading) return <div className="text-center py-20"><span className="loading loading-spinner loading-lg"></span></div>;

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-base-100 shadow-xl rounded-2xl p-6">
        <h2 className="text-3xl font-bold mb-6">My Tutor Profiles</h2>
        
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Tutor</th>
                <th>Subject</th>
                <th>Fee</th>
                <th>Status</th>
                {isAdmin && <th>Admin Actions</th>}
              </tr>
            </thead>
            <tbody>
              {myApplications.map((tutor) => (
                <tr key={tutor._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar"><div className="w-12 h-12 rounded-xl"><img src={tutor.image} alt="" /></div></div>
                      <div><div className="font-bold">{tutor.name}</div></div>
                    </div>
                  </td>
                  <td>{tutor.subject}</td>
                  <td>${tutor.fee}/hr</td>
                  <td>
                    <span className={`badge font-semibold ${tutor.status === 'approved' ? 'badge-success text-white' : 'badge-warning'}`}>
                      {tutor.status}
                    </span>
                  </td>
                  {isAdmin && (
                    <td>
                      {tutor.status === "pending" && (
                        <button onClick={() => handleApprove(tutor._id)} className="btn btn-xs btn-success text-white">
                          Approve
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}