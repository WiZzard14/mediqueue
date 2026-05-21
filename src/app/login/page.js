"use client";
import { useContext, useEffect, useState, Suspense } from "react";
import { AuthContext } from "@/provider/AuthProvider";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";

function LoginForm() {
  const { signIn, signInWithGoogle, loading, user } = useContext(AuthContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [errorMessage, setErrorMessage] = useState("");

  const from = searchParams.get("redirect") || "/";

  useEffect(() => {
    document.title = "MediQueue | Login";
    if (user) {
      router.push(from);
    }
  }, [user, router, from]);

  const handleJWTGeneration = (emailAddress) => {
    return fetch("https://mediqueue-server-mocha.vercel.app/jwt", {
      method: "POST",
      headers: { 
        "content-type": "application/json" 
      },
      body: JSON.stringify({ email: emailAddress }) 
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem("mediqueue-access-token", data.token);
          return true;
        }
        return false;
      })
      .catch((err) => {
        console.error("JWT Fetch Error:", err);
        return false;
      });
  };

  const handleFormLogin = (e) => {
    e.preventDefault();
    setErrorMessage("");
    
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((result) => {
        const loggedUser = result.user;
        handleJWTGeneration(loggedUser.email).then((success) => {
          if (success) {
            Swal.fire({
              title: "Welcome Back!",
              text: "Login authentication verified successfully.",
              icon: "success",
              timer: 2000,
              showConfirmButton: false
            });
            router.push(from);
          } else {
            setErrorMessage("Failed to generate secure user token. Server rejected payload.");
          }
        });
      })
      .catch((error) => {
        console.error(error);
        if (error.code === "auth/invalid-credential" || error.code === "auth/wrong-password") {
          setErrorMessage("Invalid email or password combination. Please try again.");
        } else {
          setErrorMessage(error.message);
        }
      });
  };

  const handleGoogleLogin = () => {
    setErrorMessage("");
    signInWithGoogle()
      .then((result) => {
        const loggedUser = result.user;
        handleJWTGeneration(loggedUser.email).then((success) => {
          if (success) {
            Swal.fire({
              title: "Authorized!",
              text: "Successfully logged in via Google.",
              icon: "success",
              timer: 2000,
              showConfirmButton: false
            });
            router.push(from);
          } else {
            setErrorMessage("Google OAuth verified, but server rejected secure token handshake.");
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
      <div className="flex justify-center items-center h-48">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="max-w-md w-full bg-base-100 p-8 rounded-3xl shadow-2xl border border-base-300">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-black tracking-tight text-blue-500">Account Sign In</h2>
        <p className="text-sm text-gray-400 mt-2">Access your personalized tutor schedule management system.</p>
      </div>

      {errorMessage && (
        <div className="alert alert-error bg-red-500/10 border-red-500 text-red-500 rounded-xl mb-6 py-3 font-semibold text-sm flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/xl" className="stroke-current shrink-0 h-5 w-5" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleFormLogin} className="space-y-5">
        <div className="form-control">
          <label className="label"><span className="label-text font-bold text-sm">Account Email</span></label>
          <input type="email" name="email" placeholder="example@mediqueue.com" className="input input-bordered w-full rounded-xl focus:outline-none focus:border-blue-500" required />
        </div>

        <div className="form-control">
          <label className="label"><span className="label-text font-bold text-sm">Secret Password</span></label>
          <input type="password" name="password" placeholder="••••••••" className="input input-bordered w-full rounded-xl focus:outline-none focus:border-blue-500" required />
          <label className="label mt-1">
            <span onClick={() => Swal.fire("Information", "Password reset features are locked until completion of academic tracking reviews.", "info")} className="label-text-alt link link-hover text-gray-400 font-medium cursor-pointer hover:text-blue-500">Forget Password?</span>
          </label>
        </div>

        <div className="form-control mt-6">
          <button type="submit" className="btn btn-primary w-full text-white text-md font-bold rounded-xl shadow-lg">Sign In to Account</button>
        </div>
      </form>

      <div className="divider my-6 text-xs text-gray-500 font-bold uppercase tracking-wider">or sign in with</div>

      <div className="form-control">
        <button onClick={handleGoogleLogin} type="button" className="btn btn-outline border-base-300 w-full rounded-xl flex items-center justify-center gap-3 font-semibold shadow-sm hover:bg-base-200 transition-colors">
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l3.227-3.227C18.23 1.83 15.49 1 12.24 1 6.033 1 1 6.033 1 12.24s5.033 11.24 11.24 11.24c6.478 0 10.793-4.537 10.793-10.986 0-.743-.08-1.31-.178-1.709H12.24z"/>
          </svg>
          Continue with Google
        </button>
      </div>

      <div className="text-center mt-8 pt-4 border-t border-base-200">
        <p className="text-sm text-gray-400 font-medium">New to our system network? <Link href="/register" className="text-blue-500 font-bold hover:underline">Create an Account</Link></p>
      </div>
    </div>
  );
}

export default function Login() {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center py-12 px-4">
      <Suspense fallback={<div>Loading login form...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}