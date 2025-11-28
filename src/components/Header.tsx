import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export function Header() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    // Prevent body scroll when mobile menu is open
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "How it works" },
    { path: "/guide", label: "Guide" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-slate-950/80 shadow-lg shadow-slate-900/20"
          : "bg-transparent"
      }`}
      style={{ 
        outline: 'none !important',
        borderBottom: scrolled ? '1px solid rgba(51, 65, 85, 0.5)' : 'none',
        boxShadow: scrolled ? '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' : 'none'
      }}
      onFocus={(e) => e.currentTarget.blur()}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group relative z-50">
            <div className="relative">
              {/* Glow effect on hover */}
              <div className="absolute -inset-2 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              {/* Logo container */}
              <div className="relative group-hover:scale-105 transition-transform duration-300">
                <img
                  src="/assets/clinexalogo.webp"
                  alt="Clinexa Logo"
                  className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto object-contain drop-shadow-lg"
                  loading="eager"
                  width="150"
                  height="60"
                />
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 lg:px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  isActive(link.path)
                    ? "text-red-400"
                    : "text-white hover:text-slate-200"
                }`}
              >
                {isActive(link.path) && (
                  <>
                    {/* Active indicator background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-red-600/10 to-red-500/10 rounded-lg" />
                    {/* Bottom border indicator */}
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-500 to-red-600 rounded-full" />
                  </>
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-white hover:bg-slate-800/50 transition-colors z-50"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/95 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Mobile Menu */}
          <nav className="fixed top-16 left-0 right-0 bg-slate-900/95 backdrop-blur-xl border-b border-slate-800 z-40 md:hidden animate-slideInRight">
            <div className="max-w-7xl mx-auto px-4 py-4">
              <div className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`relative px-4 py-3 rounded-lg text-base font-semibold transition-all duration-300 ${
                      isActive(link.path)
                        ? "text-red-400 bg-red-500/10"
                        : "text-white hover:text-red-400 hover:bg-slate-800/50"
                    }`}
                  >
                    {isActive(link.path) && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-red-500 to-red-600 rounded-r" />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </>
      )}
    </header>
  );
}
