import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-base-200 text-base-content mt-12 border-t border-base-300">
      <div className="footer p-10 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        
        <aside className="flex flex-col gap-3">
          <Link href="/" className="flex items-center gap-2 text-2xl font-black tracking-tight text-blue-500">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
            MediQueue
          </Link>
          <p className="text-sm opacity-80 leading-relaxed mt-2 max-w-xs">
            Eliminating manual scheduling friction since 2024 through enterprise-grade automated tutor slot tracking engines. Professional learning served efficiently.
          </p>
        </aside>

        <nav className="flex flex-col gap-2">
          <h6 className="footer-title text-blue-500 opacity-100 uppercase tracking-widest mb-2">Learning Services</h6>
          <a className="link link-hover text-sm opacity-80 hover:text-blue-500">Premium Medical Mentorship</a>
          <a className="link link-hover text-sm opacity-80 hover:text-blue-500">Advanced Physics Masterclass</a>
          <a className="link link-hover text-sm opacity-80 hover:text-blue-500">Structural Sociology Matrix</a>
          <a className="link link-hover text-sm opacity-80 hover:text-blue-500">Computer Science Practicums</a>
        </nav>

        <nav className="flex flex-col gap-3">
          <h6 className="footer-title text-blue-500 opacity-100 uppercase tracking-widest mb-2">Contact Information</h6>
          <div className="flex items-center gap-2 text-sm opacity-80">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            support@mediqueue.com
          </div>
          <div className="flex items-center gap-2 text-sm opacity-80">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-pink-500" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            +880 123 456 789 (Support)
          </div>
          <div className="flex items-center gap-2 text-sm opacity-80">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            Level 5, Academic Vector, Dhaka, Bangladesh
          </div>
        </nav>

        <nav className="flex flex-col gap-2">
          <h6 className="footer-title text-blue-500 opacity-100 uppercase tracking-widest mb-2">Operational Support</h6>
          <a className="link link-hover text-sm opacity-80 hover:text-blue-500">Submit Tutor Slot</a>
          <a className="link link-hover text-sm opacity-80 hover:text-blue-500">Active Listing Matrices</a>
          <a className="link link-hover text-sm opacity-80 hover:text-blue-500">Authenticate Account</a>
          <a className="link link-hover text-sm opacity-80 hover:text-blue-500">Report Diagnostic Error</a>
        </nav>

      </div>

      <div className="border-t border-base-300">
        <div className="footer px-10 py-6 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <aside className="text-sm opacity-80 text-center md:text-left">
            <p>© 2026 <span className="text-blue-500 font-bold">MediQueue Engine Vector</span>. All rights reserved matching CAT_02.</p>
          </aside>
          
          <nav className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-blue-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.007 3.692H5.078z"/>
              </svg>
            </a>
            <a href="#" className="hover:text-blue-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
              </svg>
            </a>
            <a href="#" className="hover:text-blue-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}