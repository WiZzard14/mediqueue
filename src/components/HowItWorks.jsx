export default function HowItWorks() {
  return (
    <div className="py-12 my-10">
      <h2 className="text-3xl font-bold mb-10 text-center text-blue-600">How It Works</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="card bg-base-100 shadow-xl border-t-4 border-blue-500">
          <div className="card-body items-center text-center">
            <h2 className="card-title text-2xl font-black text-gray-300">01</h2>
            <h3 className="text-xl font-bold">Find a Tutor</h3>
            <p>Browse our list of verified expert tutors by subject, location, and teaching mode.</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl border-t-4 border-blue-500">
          <div className="card-body items-center text-center">
            <h2 className="card-title text-2xl font-black text-gray-300">02</h2>
            <h3 className="text-xl font-bold">Book a Session</h3>
            <p>Check their available slots and book a time that perfectly fits your schedule.</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl border-t-4 border-blue-500">
          <div className="card-body items-center text-center">
            <h2 className="card-title text-2xl font-black text-gray-300">03</h2>
            <h3 className="text-xl font-bold">Start Learning</h3>
            <p>Join the session online or offline and start achieving your academic goals!</p>
          </div>
        </div>
      </div>
    </div>
  );
}