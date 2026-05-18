import { FaXTwitter, FaFacebook, FaInstagram } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="footer p-10 bg-base-200 text-base-content mt-10">
      <aside>
        <h2 className="text-2xl font-bold text-blue-600">MediQueue</h2>
        <p>Premium Tutor Booking System<br/>Simplifying learning since 2024</p>
      </aside> 
      <nav>
        <h6 className="footer-title">Learning Services</h6> 
        <a className="link link-hover">Online Sessions</a>
        <a className="link link-hover">Offline Classes</a>
        <a className="link link-hover">Subject Specialists</a>
      </nav> 
      <nav>
        <h6 className="footer-title">Contact Info</h6> 
        <a className="link link-hover">Email: support@mediqueue.com</a>
        <a className="link link-hover">Phone: +880 123 456 789</a>
        <a className="link link-hover">Location: Dhaka, Bangladesh</a>
      </nav> 
      <nav>
        <h6 className="footer-title">Social Links</h6> 
        <div className="grid grid-flow-col gap-4">
          {/* The new X logo */}
          <a className="text-2xl cursor-pointer hover:text-blue-600"><FaXTwitter /></a>
          <a className="text-2xl cursor-pointer hover:text-blue-600"><FaFacebook /></a>
          <a className="text-2xl cursor-pointer hover:text-blue-600"><FaInstagram /></a>
        </div>
      </nav>
    </footer>
  );
}