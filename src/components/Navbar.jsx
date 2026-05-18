"use client";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AuthContext } from "@/provider/AuthProvider";

export default function Navbar() {
  const { user, logOut } = useContext(AuthContext);
  const pathname = usePathname();
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("mq-theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("mq-theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const activeLink = (path) => pathname === path ? "text-blue-500 font-bold border-b-2 border-blue-500 rounded-none" : "";

  return (
    <div className="navbar bg-base-100 shadow-md px-4 md:px-8 sticky top-0 z-50 transition-colors duration-300">
      <div className="navbar-start">
        <Link href="/" className="text-2xl font-black tracking-tight text-blue-500 flex items-center gap-2">
          <span>🩺</span> MediQueue
        </Link>
      </div>
      
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-4 font-semibold text-sm">
          <li><Link href="/" className={activeLink("/")}>Home</Link></li>
          <li><Link href="/tutors" className={activeLink("/tutors")}>Tutors</Link></li>
          {user && (
            <>
              <li><Link href="/add-tutor" className={activeLink("/add-tutor")}>Add Tutor</Link></li>
              <li><Link href="/my-tutors" className={activeLink("/my-tutors")}>My Tutors</Link></li>
              <li><Link href="/my-booked-sessions" className={activeLink("/my-booked-sessions")}>My Booked Sessions</Link></li>
            </>
          )}
        </ul>
      </div>

      <div className="navbar-end gap-4">
        <button onClick={toggleTheme} className="btn btn-ghost btn-circle text-xl" title="Change Theme Layout">
          {theme === "dark" ? "☀️" : "🌙"}
        </button>

        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar online">
              <div className="w-10 h-10 rounded-full ring ring-blue-500 ring-offset-base-100 ring-offset-2">
                <img src={user.photoURL || "https://placehold.co/100"} alt="User Avatar" />
              </div>
            </label>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-2xl bg-base-100 rounded-box w-64 border border-base-300">
                <li className="px-4 py-3 border-b border-base-200">
                  <div className="flex flex-col gap-1 items-start text-left">
                    <span className="font-bold text-lg text-base-content truncate">
                      {user?.displayName || "System User"}
                    </span>
                    <span className="text-xs text-gray-400 font-normal truncate">
                      {user?.email}
                    </span>
                  </div>
                </li>

                <li><Link href="/my-tutors" className="py-2.5 mt-1 font-medium">My Dashboard</Link></li>
                <li><button onClick={() => { logOut(); localStorage.removeItem("mediqueue-access-token"); }} className="text-error font-medium py-2.5">Logout</button></li>
              </ul>
          </div>
        ) : (
          <Link href="/login" className="btn btn-primary btn-sm text-white px-5 rounded-lg shadow-md">Login</Link>
        )}
      </div>
    </div>
  );
}