"use client";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/provider/AuthProvider";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";

export default function Register() {
  const { createUser, signInWithGoogle, updateUserProfile, user, loading } = useContext(AuthContext);
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    document.title = "MediQueue | Register";
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  const handleJWTGeneration = (emailAddress) => {
    return fetch("http://localhost:5000/jwt", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: emailAddress })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem("mediqueue-access-token", data.token);
          return true;
        }
        return false;
      });
  };

  const handleRegisterForm = (e) => {
    e.preventDefault();
    setErrorMessage("");

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photoURL = form.photoURL.value;
    const password = form.password.value;

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setErrorMessage("Password must contain at least one uppercase letter.");
      return;
    }
    if (!/[a-z]/.test(password)) {
      setErrorMessage("Password must contain at least one lowercase letter.");
      return;
    }

    createUser(email, password)
      .then((result) => {
        updateUserProfile(name, photoURL)
          .then(() => {
            Swal.fire({
              title: "Registration Complete!",
              text: "Account created successfully. Please login.",
              icon: "success",
              confirmButtonColor: "#3b82f6"
            }).then(() => {
              router.push("/login");
            });
          });
      })
      .catch((error) => {
        console.error(error);
        if (error.code === "auth/email-already-in-use") {
          setErrorMessage("This email address is already registered.");
        } else {
          setErrorMessage(error.message);
        }
      });
  };

  const handleGoogleRegister = () => {
    setErrorMessage("");
    signInWithGoogle()
      .then((result) => {
        const loggedUser = result.user;
        
        handleJWTGeneration(loggedUser.email).then((success) => {
          if (success) {
            Swal.fire({
              title: "Welcome!",
              text: "Successfully authenticated with Google.",
              icon: "success",
              timer: 2000,
              showConfirmButton: false
            });
            router.push("/"); 
          }
        });
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage(error.message);
      });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-base-200">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-md w-full bg-base-100 p-8 rounded-3xl shadow-2xl border border-base-300 transform transition-all duration-300">
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black tracking-tight text-blue-500">Create Account</h2>
          <p className="text-sm text-gray-400 mt-2">Join MediQueue to start scheduling your learning matrix.</p>
        </div>

        {errorMessage && (
          <div className="alert alert-error bg-red-500/10 border-red-500 text-red-500 rounded-xl mb-6 py-3 font-semibold text-sm flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-5 w-5" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleRegisterForm} className="space-y-4">
          <div className="form-control">
            <label className="label"><span className="label-text font-bold text-sm">Full Name</span></label>
            <input type="text" name="name" placeholder="Riadul Islam" className="input input-bordered w-full rounded-xl focus:outline-none focus:border-blue-500" required />
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text font-bold text-sm">Email Address</span></label>
            <input type="email" name="email" placeholder="riad@example.com" className="input input-bordered w-full rounded-xl focus:outline-none focus:border-blue-500" required />
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text font-bold text-sm">Photo URL</span></label>
            <input type="url" name="photoURL" placeholder="https://postimg.cc/..." className="input input-bordered w-full rounded-xl focus:outline-none focus:border-blue-500" required />
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text font-bold text-sm">Secure Password</span></label>
            <input type="password" name="password" placeholder="••••••••" className="input input-bordered w-full rounded-xl focus:outline-none focus:border-blue-500" required />
          </div>

          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary w-full text-white text-md font-bold rounded-xl shadow-lg hover:shadow-xl transition-all">
              Register Account
            </button>
          </div>
        </form>

        <div className="divider my-6 text-xs text-gray-500 font-bold uppercase tracking-wider">or register with</div>

        <div className="form-control">
          <button onClick={handleGoogleRegister} type="button" className="btn btn-outline border-base-300 w-full rounded-xl flex items-center justify-center gap-3 font-semibold shadow-sm hover:bg-base-200 transition-colors">
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path fill="#AM3" d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l3.227-3.227C18.23 1.83 15.49 1 12.24 1 6.033 1 1 6.033 1 12.24s5.033 11.24 11.24 11.24c6.478 0 10.793-4.537 10.793-10.986 0-.743-.08-1.31-.178-1.709H12.24z" fill="#4285F4"/>
              <path fill="#34A853" d="M22.855 10.285H12.24V14.4h6.887c-.648 1.832-2.316 3.104-4.604 3.104-3.1 0-5.617-2.517-5.617-5.617s2.517-5.617 5.617-5.617c1.436 0 2.743.543 3.738 1.433l3.227-3.227C19.53 2.613 16.14 1 12.24 1 6.033 1 1 6.033 1 12.24s5.033 11.24 11.24 11.24c6.478 0 11.753-5.275 11.753-11.753 0-.49-.04-.972-.118-1.442z" />
            </svg>
            Continue with Google
          </button>
        </div>

        <div className="text-center mt-6 pt-4 border-t border-base-200">
          <p className="text-sm text-gray-400 font-medium">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500 font-bold hover:underline">
              Sign In Here
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}