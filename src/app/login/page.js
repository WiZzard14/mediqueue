"use client";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { useContext } from "react";
import { AuthContext } from "@/provider/AuthProvider";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function Login() {
  const { loginWithGoogle } = useContext(AuthContext);
  const router = useRouter(); 

  const handleGoogleSignIn = () => {
    loginWithGoogle()
      .then((result) => {
        Swal.fire({
          title: "Success!",
          text: "Logged in successfully with Google.",
          icon: "success",
          confirmButtonText: "Awesome",
        });
        router.push("/");
      })
      .catch((error) => {
        Swal.fire({
          title: "Error!",
          text: error.message,
          icon: "error",
          confirmButtonText: "Try Again",
        });
      });
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh] bg-base-200 py-10">
      <div className="card w-full max-w-sm shadow-2xl bg-base-100">
        <form className="card-body">
          <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">Login</h1>
          
          <div className="form-control">
            <label className="label"><span className="label-text">Email</span></label>
            <input type="email" placeholder="email" className="input input-bordered" required />
          </div>
          
          <div className="form-control">
            <label className="label"><span className="label-text">Password</span></label>
            <input type="password" placeholder="password" className="input input-bordered" required />
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
            </label>
          </div>
          
          <div className="form-control mt-4">
            <button className="btn btn-primary text-white">Login</button>
          </div>

          <div className="divider">OR</div>

          <button 
            type="button" 
            onClick={handleGoogleSignIn}
            className="btn btn-outline flex items-center gap-2"
          >
            <FcGoogle className="text-2xl" /> Login with Google
          </button>

          <p className="text-center mt-4 text-sm">
            Don't have an account? <Link href="/register" className="text-blue-600 font-bold hover:underline">Register here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}