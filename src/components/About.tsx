
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-24 bg-brand-DEFAULT">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-2">About Us</h2>
          <div className="w-16 h-1 bg-white mx-auto"></div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <div className="absolute inset-0 border border-white/20 -m-4 translate-x-4 translate-y-4"></div>
              <div className="bg-brand-accent h-full w-full">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1562157873-818bc0726f68?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=654&q=80" 
                    alt="Premium T-shirt fabric" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-white"
          >
            <h3 className="text-3xl font-semibold mb-6">Premium Quality Minimalist Designs</h3>
            <p className="text-gray-300 mb-6 text-lg">
              YOUR WAISATSU represents the fusion of minimalist aesthetics with premium craftsmanship. 
              Founded in 2023, we've made it our mission to create t-shirts that embody understated 
              luxury and timeless design.
            </p>
            <p className="text-gray-300 mb-8 text-lg">
              Each garment is meticulously crafted using only the finest cotton, ensuring unmatched 
              comfort and durability. Our commitment to ethical manufacturing and sustainable practices 
              makes us a conscious choice for the modern individual.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </div>
                <span>Premium Materials</span>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <span>Sustainable Production</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
