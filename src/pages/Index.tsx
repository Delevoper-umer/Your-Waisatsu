
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Products from "../components/Products";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-brand-DEFAULT text-white"
    >
      <Navbar />
      <Hero />
      <Products />
      <About />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </motion.div>
  );
};

export default Index;
