import { Instagram, Youtube, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="bg-[#0D2B1A] text-ivory">
      <div className="container mx-auto px-6 pt-16 pb-8">
        {/* Logo + tagline */}
        <div className="text-center mb-12">
          <Link to="/" aria-label="Home" className="inline-block">
            <Logo tone="ivory" size="lg" />
          </Link>
          <p className="font-body italic text-sm text-ivory/70 mt-3">
            Choosing myself, one country at a time.
          </p>

        </div>

        {/* Three columns */}
        <div className="grid md:grid-cols-3 gap-10 pb-10">
          {/* Brand description */}
          <div className="text-center md:text-left">
            <p className="font-body text-sm text-ivory/70 leading-relaxed max-w-xs mx-auto md:mx-0">
              Stories of wanderlust, bold choices, and the beautiful chaos of
              starting a brand new chapter abroad. From Atlanta to Madrid.
            </p>
          </div>

          {/* Quick nav */}
          <div className="text-center">
            <h4 className="font-label text-xs uppercase tracking-[0.22em] text-ivory/50 mb-4">
              Explore
            </h4>
            <ul className="space-y-2 font-body text-sm">
              {[
                { label: "Home", to: "/" },
                { label: "Stories", to: "/stories" },
                { label: "Stumbled Upon", to: "/stumbled-upon" },
                { label: "Gallery", to: "/gallery" },
                { label: "The Real Guides", to: "/the-real-guides" },
                { label: "Resources", to: "/resources" },
                { label: "My Story", to: "/about" },

              ].map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="text-ivory/85 hover:text-gold transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="text-center md:text-right">
            <h4 className="font-label text-xs uppercase tracking-[0.22em] text-ivory/50 mb-4">
              Follow Along
            </h4>
            <div className="flex items-center justify-center md:justify-end gap-5">
              <a
                href="https://instagram.com/shelefthechat"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-gold hover:text-gold-soft transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com/@shelefthechat"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="text-gold hover:text-gold-soft transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="mailto:hello@shelefthechat.com"
                aria-label="Email"
                className="text-gold hover:text-gold-soft transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-gold/30">
          <p className="text-center font-body text-xs text-ivory/60">
            © 2026 She Left the Chat. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
