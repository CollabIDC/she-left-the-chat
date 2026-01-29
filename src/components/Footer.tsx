import { Instagram, Youtube, Mail, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 bg-foreground text-primary-foreground">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="text-center md:text-left">
            <h3 className="font-display text-2xl font-semibold mb-2">
              shelefthechat
            </h3>
            <p className="font-body text-sm text-primary-foreground/70">
              Adventures from Madrid & beyond
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-primary-foreground/70 hover:text-primary transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-primary-foreground/70 hover:text-primary transition-colors"
              aria-label="YouTube"
            >
              <Youtube className="w-5 h-5" />
            </a>
            <a
              href="mailto:hello@shelefthechat.com"
              className="p-2 text-primary-foreground/70 hover:text-primary transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>

          {/* Copyright */}
          <div className="font-body text-sm text-primary-foreground/70 flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-primary" fill="currentColor" /> in Madrid
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
