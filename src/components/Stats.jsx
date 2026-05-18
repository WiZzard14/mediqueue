export default function Stats() {
  return (
    <div className="py-12 my-10 bg-base-200 rounded-2xl text-center">
      <h2 className="text-3xl font-bold mb-8 text-blue-600">Why Choose MediQueue?</h2>
      
      <div className="stats stats-vertical lg:stats-horizontal shadow w-11/12 max-w-4xl mx-auto">
        <div className="stat place-items-center">
          <div className="stat-title">Active Tutors</div>
          <div className="stat-value">1,200+</div>
          <div className="stat-desc">From top universities</div>
        </div>
        
        <div className="stat place-items-center">
          <div className="stat-title">Successful Sessions</div>
          <div className="stat-value text-blue-600">45K+</div>
          <div className="stat-desc">↗︎ 400 (30 days)</div>
        </div>
        
        <div className="stat place-items-center">
          <div className="stat-title">Happy Students</div>
          <div className="stat-value">10,000+</div>
          <div className="stat-desc">Average rating 4.9/5</div>
        </div>
      </div>
    </div>
  );
}