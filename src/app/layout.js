import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/provider/AuthProvider"; 
import "./globals.css";

export const metadata = {
  title: "MediQueue | Tutor Booking System",
  description: "Find and book the best tutors online.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body>
        <AuthProvider>
          <Navbar />
          <main className="min-h-[calc(100vh-288px)]">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}