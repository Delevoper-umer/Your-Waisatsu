
import { motion } from 'framer-motion';
import { useState } from 'react';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  hoverImage?: string;
  colors: string[];
}

const ProductCard = ({ id, name, price, image, hoverImage, colors }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };
  
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(`Hello, I'm interested in purchasing the ${name} t-shirt in ${selectedColor} color. Could you provide more details about availability and shipping?`);
    window.open(`https://wa.me/1234567890?text=${message}`, '_blank');
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="group"
    >
      <div 
        className="relative overflow-hidden bg-brand-accent"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="aspect-[4/5] w-full overflow-hidden">
          <img 
            src={isHovered && hoverImage ? hoverImage : image} 
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button 
            onClick={handleWhatsAppClick}
            className="w-full bg-white text-black py-2 font-medium hover:bg-gray-200 transition-colors"
          >
            Purchase via WhatsApp
          </button>
        </div>
      </div>
      
      <div className="pt-4 pb-2">
        <h3 className="text-white font-medium text-lg">{name}</h3>
        <p className="text-gray-400 text-sm mt-1">{formatPrice(price)}</p>
      </div>
      
      <div className="flex gap-2 mt-2">
        {colors.map((color) => (
          <button
            key={color}
            className={`w-5 h-5 rounded-full border ${selectedColor === color ? 'border-white' : 'border-transparent'}`}
            style={{ backgroundColor: color }}
            onClick={() => setSelectedColor(color)}
            aria-label={`Select ${color} color`}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default ProductCard;
