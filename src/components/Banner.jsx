import Link from "next/link";

export default function Banner() {
  return (
    <div className="carousel w-full rounded-xl my-6">
      
      <div id="slide1" className="carousel-item relative w-full h-[400px] md:h-[550px]">
        <div className="hero w-full h-full bg-base-200" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070)'}}>
          <div className="hero-overlay bg-opacity-70 bg-black"></div>
          <div className="hero-content text-neutral-content text-center">
            <div className="max-w-md">
              <h1 className="mb-5 text-4xl md:text-5xl font-bold text-white">Unlock Your Potential</h1>
              <p className="mb-5 text-gray-200">Connect with expert tutors to achieve your academic goals and master new skills today. Learning has never been this easy.</p>
              <Link href="/tutors" className="btn btn-primary text-white">Find Tutors</Link>
            </div>
          </div>
        </div>
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide3" className="btn btn-circle btn-sm md:btn-md border-none bg-white/20 text-white hover:bg-primary">❮</a>
          <a href="#slide2" className="btn btn-circle btn-sm md:btn-md border-none bg-white/20 text-white hover:bg-primary">❯</a>
        </div>
      </div>

      <div id="slide2" className="carousel-item relative w-full h-[400px] md:h-[550px]">
        <div className="hero w-full h-full bg-base-200" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=2070)'}}>
          <div className="hero-overlay bg-opacity-70 bg-black"></div>
          <div className="hero-content text-neutral-content text-center">
            <div className="max-w-md">
              <h1 className="mb-5 text-4xl md:text-5xl font-bold text-white">Learn Anywhere</h1>
              <p className="mb-5 text-gray-200">Book online or offline sessions tailored to your schedule. Our flexible system ensures you never miss a chance to grow.</p>
              <Link href="/tutors" className="btn btn-primary text-white">Explore Subjects</Link>
            </div>
          </div>
        </div>
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide1" className="btn btn-circle btn-sm md:btn-md border-none bg-white/20 text-white hover:bg-primary">❮</a>
          <a href="#slide3" className="btn btn-circle btn-sm md:btn-md border-none bg-white/20 text-white hover:bg-primary">❯</a>
        </div>
      </div>

      <div id="slide3" className="carousel-item relative w-full h-[400px] md:h-[550px]">
        <div className="hero w-full h-full bg-base-200" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070)'}}>
          <div className="hero-overlay bg-opacity-70 bg-black"></div>
          <div className="hero-content text-neutral-content text-center">
            <div className="max-w-md">
              <h1 className="mb-5 text-4xl md:text-5xl font-bold text-white">Top Rated Mentors</h1>
              <p className="mb-5 text-gray-200">Our platform features highly experienced and verified tutors from top institutions. Your success is our priority.</p>
              <Link href="/tutors" className="btn btn-primary text-white">Book a Session</Link>
            </div>
          </div>
        </div>
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide2" className="btn btn-circle btn-sm md:btn-md border-none bg-white/20 text-white hover:bg-primary">❮</a>
          <a href="#slide1" className="btn btn-circle btn-sm md:btn-md border-none bg-white/20 text-white hover:bg-primary">❯</a>
        </div>
      </div>

    </div>
  );
}