"use client";
import Link from "next/link";

export default function Banner() {
  return (
    <div className="max-w-7xl mx-auto px-4 pt-6">
      <div className="carousel w-full h-[650px] rounded-3xl shadow-2xl relative overflow-hidden">
        
        <div id="slide1" className="carousel-item relative w-full h-full">
          <div 
            className="hero w-full h-full bg-cover bg-center" 
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070)' }}
          >
            <div className="hero-overlay bg-black/60"></div>
            <div className="hero-content text-neutral-content text-center">
              <div className="max-w-xl">
                <h1 className="mb-5 text-4xl md:text-6xl font-black text-white leading-tight drop-shadow-2xl">
                  Unlock Your Potential
                </h1>
                <p className="mb-8 text-blue-50 font-medium opacity-95 drop-shadow-md text-sm md:text-base">
                  Connect with expert tutors to achieve your academic goals and master new skills today. Learning has never been this easy.
                </p>
                <Link href="/tutors" className="btn btn-primary text-white px-8 rounded-xl shadow-lg border-none hover:scale-105 transition-all">
                  Find Tutors
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between z-10">
            <a href="#slide3" className="btn btn-circle btn-sm md:btn-md border-none bg-white/20 text-white hover:bg-primary">❮</a>
            <a href="#slide2" className="btn btn-circle btn-sm md:btn-md border-none bg-white/20 text-white hover:bg-primary">❯</a>
          </div>
        </div>

        <div id="slide2" className="carousel-item relative w-full h-full">
          <div 
            className="hero w-full h-full bg-cover bg-center" 
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=2070)' }}
          >
            <div className="hero-overlay bg-black/60"></div>
            <div className="hero-content text-neutral-content text-center">
              <div className="max-w-xl">
                <h1 className="mb-5 text-4xl md:text-6xl font-black text-white leading-tight drop-shadow-2xl">
                  Learn Anywhere
                </h1>
                <p className="mb-8 text-blue-50 font-medium opacity-95 drop-shadow-md text-sm md:text-base">
                  Book online or offline sessions tailored to your schedule. Our flexible system ensures you never miss a chance to grow.
                </p>
                <Link href="/tutors" className="btn btn-primary text-white px-8 rounded-xl shadow-lg border-none hover:scale-105 transition-all">
                  Explore Subjects
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between z-10">
            <a href="#slide1" className="btn btn-circle btn-sm md:btn-md border-none bg-white/20 text-white hover:bg-primary">❮</a>
            <a href="#slide3" className="btn btn-circle btn-sm md:btn-md border-none bg-white/20 text-white hover:bg-primary">❯</a>
          </div>
        </div>

        <div id="slide3" className="carousel-item relative w-full h-full">
          <div 
            className="hero w-full h-full bg-cover bg-center" 
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070)' }}
          >
            <div className="hero-overlay bg-black/60"></div>
            <div className="hero-content text-neutral-content text-center">
              <div className="max-w-xl">
                <h1 className="mb-5 text-4xl md:text-6xl font-black text-white leading-tight drop-shadow-2xl">
                  Top Rated Mentors
                </h1>
                <p className="mb-8 text-blue-50 font-medium opacity-95 drop-shadow-md text-sm md:text-base">
                  Our platform features highly experienced and verified tutors from top institutions. Your success is our priority.
                </p>
                <Link href="/tutors" className="btn btn-primary text-white px-8 rounded-xl shadow-lg border-none hover:scale-105 transition-all">
                  Book a Session
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between z-10">
            <a href="#slide2" className="btn btn-circle btn-sm md:btn-md border-none bg-white/20 text-white hover:bg-primary">❮</a>
            <a href="#slide1" className="btn btn-circle btn-sm md:btn-md border-none bg-white/20 text-white hover:bg-primary">❯</a>
          </div>
        </div>

      </div>
    </div>
  );
}