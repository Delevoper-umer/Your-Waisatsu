
import { motion } from 'framer-motion';
import TShirtModel from './TShirtModel';

const Hero = () => {
  return (
    <div className="relative h-screen overflow-hidden bg-brand-DEFAULT">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-DEFAULT z-10"></div>
      </div>
      
      <div className="container mx-auto h-full flex flex-col justify-center items-center relative z-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl text-white font-bold tracking-tighter mb-4">
            YOUR WAISATSU
          </h1>
          <p className="text-gray-300 text-xl md:text-2xl max-w-2xl mx-auto">
            Premium minimalist streetwear for the modern individual
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="w-full max-w-3xl"
        >
          <TShirtModel />
        </motion.div>
        
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="mt-8 bg-white text-black px-8 py-3 text-lg font-medium rounded-md hover:bg-gray-200 transition-colors"
        >
          Explore Collection
        </motion.button>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-12 left-0 right-0 flex justify-center"
      >
        <a href="#products" className="text-white flex flex-col items-center animate-float">
          <span className="mb-2">Scroll Down</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <polyline points="19 12 12 19 5 12"></polyline>
          </svg>
        </a>
      </motion.div>
    </div>
  );
};

export default Hero;
