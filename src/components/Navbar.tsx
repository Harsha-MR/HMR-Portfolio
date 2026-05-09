import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['Home','About','Projects', 'Gallery', 'Skills', 'Resume', 'Certificates', 'Contact'];

  const scrollToSection = (item: string) => {
    const id = item.toLowerCase();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-3 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/90 dark:bg-black/80 backdrop-blur-xl border-b border-gray-200 dark:border-white/10'
            : 'bg-transparent'
        }`}
      >
        <div className="relative w-full px-6 py-2 flex items-center justify-between">
          {/* LEFT: Logo + Name + Subtitle */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            {/* Logo (smaller circle) */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shrink-0 relative overflow-hidden border-2 border-transparent transition-all duration-300 hover:shadow-[0_0_0_4px_rgba(59,130,246,0.5)] hover:border-blue-500">
              
              <img
                src="/HMR_logo.png"
                alt="HMR Logo"
                className="w-12 h-12 rounded-full object-cover pointer-events-none select-none"
                style={{ display: 'block' }}
              />
            </div>
            {/* Name + Subtitle */}
            <div className="flex flex-col">
              <span className="text-gray-900 dark:text-white font-semibold text-base md:text-lg">
                Harsha Kumar M R
              </span>
              <span className="text-blue-500 dark:text-purple-100 font-medium text-sm md:text-base">
                Software Developer
              </span>
            </div>
          </motion.div>

          {/* CENTER: Nav Links */}
          <div className="hidden md:flex justify-center gap-12 flex-1">
            {navItems.map((item, idx) => (
              <motion.button
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => scrollToSection(item)}
                className="text-gray-900 dark:text-white/80 hover:text-blue-500 dark:hover:text-purple-400 transition-colors text-lg md:text-xl font-semibold relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:w-full transition-all duration-300"></span>
              </motion.button>
            ))}
          </div>

          {/* RIGHT: Mobile menu button */}
          <button
            className="md:hidden text-gray-900 dark:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          className="fixed inset-0 z-40 bg-white dark:bg-black/95 backdrop-blur-xl md:hidden flex flex-col items-center justify-center gap-8"
        >
          {navItems.map((item, idx) => (
            <motion.button
              key={item}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => scrollToSection(item)}
              className="text-gray-900 dark:text-white text-2xl md:text-3xl hover:text-blue-500 dark:hover:text-purple-400 transition-colors font-semibold"
            >
              {item}
            </motion.button>
          ))}
        </motion.div>
      )}
    </>
  );
}
