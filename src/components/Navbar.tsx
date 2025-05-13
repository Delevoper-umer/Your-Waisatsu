
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/80 backdrop-blur-md py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-white text-2xl font-bold">
          YOUR WAISATSU
        </a>
        
        <div className="hidden md:flex space-x-8">
          <a href="#products" className="text-white hover:text-gray-300 transition-colors">
            Products
          </a>
          <a href="#about" className="text-white hover:text-gray-300 transition-colors">
            About
          </a>
          <a href="#contact" className="text-white hover:text-gray-300 transition-colors">
            Contact
          </a>
        </div>
        
        <button className="md:hidden text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
