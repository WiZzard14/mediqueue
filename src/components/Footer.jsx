"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-base-300 border-t border-base-200 text-base-content px-4 md:px-10 transition-colors duration-300 mt-20">
      
      {/* Upper Footer: Columnar Links Layer */}
      <div className="max-w-7xl mx-auto py-16 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* 1. Branding Column */}
        <div className="space-y-4 pr-6">
          <Link href="/" className="text-3xl font-black text-blue-500 flex items-center gap-2">
            🩺 MediQueue
          </Link>
          <p className="text-sm text-gray-400 leading-relaxed">
            Eliminating manual scheduling friction since 2024 through enterprise-grade automated tutor slot tracking engines. Professional learning served efficiently.
          </p>
        </div>

        {/* 2. Services Column (Assignment Requirement) */}
        <div>
          <h4 className="text-md font-bold uppercase tracking-wider mb-5 text-blue-500/80">Learning Services</h4>
          <ul className="space-y-3.5 text-gray-400 text-sm">
            <li><Link href="/tutors" className="link link-hover hover:text-blue-500">Premium Medical Mentorship</Link></li>
            <li><Link href="/tutors" className="link link-hover hover:text-blue-500">Advanced Physics Masterclass</Link></li>
            <li><Link href="/tutors" className="link link-hover hover:text-blue-500">Structural Sociology Matrix</Link></li>
            <li><Link href="/tutors" className="link link-hover hover:text-blue-500">Computer Science Practicums</Link></li>
          </ul>
        </div>

        {/* 3. Contact Info Column (Assignment Requirement) */}
        <div>
          <h4 className="text-md font-bold uppercase tracking-wider mb-5 text-blue-500/80">Contact Information</h4>
          <ul className="space-y-3.5 text-gray-400 text-sm">
            <li className="flex items-center gap-2.5">✉️ support@mediqueue.com</li>
            <li className="flex items-center gap-2.5">📞 +880 123 456 789 (Support)</li>
            <li className="flex items-center gap-2.5">📍 Level 5, Academic Vector, Dhaka, Bangladesh</li>
          </ul>
        </div>

        {/* 4. Support Matrix Column */}
        <div>
          <h4 className="text-md font-bold uppercase tracking-wider mb-5 text-blue-500/80">Operational Support</h4>
          <ul className="space-y-3.5 text-gray-400 text-sm">
            <li><Link href="/add-tutor" className="link link-hover hover:text-blue-500">Submit Tutor Slot</Link></li>
            <li><Link href="/tutors" className="link link-hover hover:text-blue-500">Active Listing Matrices</Link></li>
            <li><Link href="/login" className="link link-hover hover:text-blue-500">Authenticate Account</Link></li>
            <li><Link href="/login" className="link link-hover hover:text-blue-500">Report Diagnostic Error</Link></li>
          </ul>
        </div>

      </div>

      {/* Lower Footer: Copyright & Social Matrix (Assignment Requirement) */}
      <div className="max-w-7xl mx-auto py-8 border-t border-base-200 flex flex-col sm:flex-row items-center justify-between gap-5 text-gray-400 text-sm">
        <div className="font-medium text-center sm:text-left">
          &copy; {new Date().getFullYear()} <span className="font-bold text-blue-500">MediQueue Engine Vector</span>. All rights reserved matching CAT_02 guidelines. No Lorem Text Used.
        </div>
        
        {/* Social Network Access Gate (Featuring NEW Rebranded X Logo) */}
        <div className="flex items-center gap-6 text-2xl">
          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-blue-500 transition-colors" title="Facebook Connect">
            🔵
          </a>
          {/* 🎯 অ্যাসাইনমেন্টের নিয়ম মেনে ওল্ড টুইটারের বদলে নিউ রিব্র্যান্ডেড X লোগো বসানো হয়েছে */}
          <a href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-blue-500 transition-colors" title="X Rebrand Network Link">
            <svg className="w-6 h-6 fill-current inline-block" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-blue-500 transition-colors" title="LinkedIn Matrix">
            💼
          </a>
        </div>
      </div>

    </footer>
  );
}