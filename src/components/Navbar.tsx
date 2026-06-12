import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Logo from "./Logo";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", to: "/" },
  { name: "Stories", to: "/stories" },
  { name: "Stumbled Upon", to: "/stumbled-upon" },
  { name: "Gallery", to: "/gallery" },
  { name: "The Real Guides", to: "/the-real-guides" },
  { name: "Resources", to: "/resources" },
  { name: "My Story", to: "/about" },
];


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0D2B1A]/95 backdrop-blur-md border-b border-white/5">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <Logo tone="ivory" size="md" />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "font-label text-sm font-medium uppercase tracking-[0.18em] transition-colors duration-300",
                    isActive ? "text-gold" : "text-ivory/85 hover:text-gold",
                  )
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Mobile button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-ivory hover:text-gold transition-colors"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile nav */}
        {isOpen && (
          <div id="mobile-nav" className="md:hidden pt-4 pb-2 animate-fade-in">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "block py-3 font-label text-base uppercase tracking-[0.18em] transition-colors",
                    isActive ? "text-gold" : "text-ivory/85 hover:text-gold",
                  )
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
