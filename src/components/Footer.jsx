import { Facebook, Instagram, Twitter  } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-6">
      <div className="flex justify-center space-x-4 mb-4">
        <SocialIcon icon={<Facebook size={20} />} />
        <SocialIcon icon={<Instagram size={20} />} />
        <SocialIcon icon={<Twitter size={20} />} />
      </div>

      <nav className="flex justify-center space-x-6 text-gray-300">
        <Link to="/home">Home</Link>
        <Link to="/mesas">Mesas disponibles</Link>
        <Link to="/Login">Log in</Link>
        
      </nav>

      <p className="text-center text-gray-400 text-sm mt-4">
        Copyright &copy;2025, Designed by <span className="text-white font-semibold">A&F Games</span>
      </p>
    </footer>
  );
}

function SocialIcon({ icon }) {
  return (
    <div className="w-10 h-10 flex items-center justify-center bg-white text-black rounded-full cursor-pointer hover:bg-gray-300 transition">
      {icon}
    </div>
  );
}
