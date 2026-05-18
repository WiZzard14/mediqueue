"use client"; 
import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "@/provider/AuthProvider";

export default function Navbar() {
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then(() => console.log("User logged out successfully"))
      .catch((error) => console.log(error));
  };

  const navLinks = (
    <>
      <li><Link href="/">Home</Link></li>
      <li><Link href="/tutors">Tutors</Link></li>
      
      {user && (
        <>
          <li><Link href="/add-tutor">Add Tutor</Link></li>
          <li><Link href="/my-tutors">My Tutors</Link></li>
          <li><Link href="/my-booked-sessions">My Booked Sessions</Link></li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm px-4 lg:px-10">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {navLinks}
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost text-xl font-bold text-blue-600">
          MediQueue
        </Link>
      </div>
      
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navLinks}
        </ul>
      </div>

      <div className="navbar-end gap-2">
        {user ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border-2 border-blue-500">
              <div className="w-10 rounded-full" title={user?.displayName || "User"}>
                {}
                <img 
                  alt="User Profile" 
                  src={user?.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} 
                />
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li className="pl-3 py-2 font-bold text-gray-500">{user?.displayName || "User"}</li>
              <li><button onClick={handleLogOut} className="text-red-500 font-bold hover:bg-red-50">Logout</button></li>
            </ul>
          </div>
        ) : (
          <>
            <Link href="/login" className="btn btn-outline btn-primary btn-sm">Login</Link>
            <Link href="/register" className="btn btn-primary btn-sm">Register</Link>
          </>
        )}
      </div>
    </div>
  );
}