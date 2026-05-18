import Banner from "@/components/Banner";
import Stats from "@/components/Stats";
import HowItWorks from "@/components/HowItWorks";

export default function Home() {
  return (
    <div className="w-11/12 max-w-7xl mx-auto">
      <Banner />

      <div className="py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Available Tutors</h2>
        <p className="text-gray-500">Tutors will appear here once our database is connected!</p>
      </div>
      
      <Stats />
      <HowItWorks />
      
    </div>
  );
}