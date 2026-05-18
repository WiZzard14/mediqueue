"use client";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { useContext } from "react";
import { AuthContext } from "@/provider/AuthProvider";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function Register() {
  const { createUser, updateUserProfile, loginWithGoogle } = useContext(AuthContext);
  const router = useRouter();

  const handleRegister = (e) => {
    e.preventDefault(); 
    
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    if (!/[A-Z]/.test(password)) {
      return Swal.fire({ icon: "error", title: "Invalid Password", text: "Must have at least one Uppercase letter." });
    }
    if (!/[a-z]/.test(password)) {
      return Swal.fire({ icon: "error", title: "Invalid Password", text: "Must have at least one Lowercase letter." });
    }
    if (password.length < 6) {
      return Swal.fire({ icon: "error", title: "Invalid Password", text: "Length must be at least 6 characters." });
    }

    createUser(email, password)
      .then((result) => {
        updateUserProfile(name, photo)
          .then(() => {
            Swal.fire({
              title: "Success!",
              text: "Account created successfully!",
              icon: "success",
              confirmButtonText: "Awesome",
            });
            router.push("/");
          });
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

  const handleGoogleSignIn = () => {
    loginWithGoogle()
      .then((result) => {
        Swal.fire({
          title: "Success!",
          text: "Registered successfully with Google.",
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
    <div className="flex justify-center items-center min-h-[80vh] bg-base-200 py-10">
      <div className="card w-full max-w-sm shadow-2xl bg-base-100">
        
        <form onSubmit={handleRegister} className="card-body">
          <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">Register</h1>
          
          <div className="form-control">
            <label className="label"><span className="label-text">Name</span></label>
            <input type="text" name="name" placeholder="Your name" className="input input-bordered" required />
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text">Photo URL</span></label>
            <input type="url" name="photo" placeholder="https://link-to-photo.jpg" className="input input-bordered" required />
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text">Email</span></label>
            <input type="email" name="email" placeholder="Your email" className="input input-bordered" required />
          </div>
          
          <div className="form-control">
            <label className="label"><span className="label-text">Password</span></label>
            <input type="password" name="password" placeholder="Create a password" className="input input-bordered" required />
            <label className="label">
              <span className="label-text-alt text-gray-500">Must have 1 uppercase, 1 lowercase, and 6+ characters.</span>
            </label>
          </div>
          
          <div className="form-control mt-4">
            <button className="btn btn-primary text-white">Register</button>
          </div>

          <div className="divider">OR</div>

          <button type="button" onClick={handleGoogleSignIn} className="btn btn-outline flex items-center gap-2">
            <FcGoogle className="text-2xl" /> Register with Google
          </button>

          <p className="text-center mt-4 text-sm">
            Already have an account? <Link href="/login" className="text-blue-600 font-bold hover:underline">Login here</Link>
          </p>
        </form>

      </div>
    </div>
  );
}