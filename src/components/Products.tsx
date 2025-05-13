
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';

const products = [
  {
    id: 'tshirt-1',
    name: 'Minimalist Black Tee',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80',
    colors: ['#000000', '#FFFFFF', '#555555']
  },
  {
    id: 'tshirt-2',
    name: 'Essential White Tee',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80',
    colors: ['#FFFFFF', '#000000', '#CCCCCC']
  },
  {
    id: 'tshirt-3',
    name: 'Signature Logo Tee',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1523381294911-8d3cead13475?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80',
    colors: ['#333333', '#FFFFFF', '#000000']
  },
  {
    id: 'tshirt-4',
    name: 'Oversized Premium Tee',
    price: 69.99,
    image: 'https://images.unsplash.com/photo-1606335543042-57c525922933?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1622445275463-afa2ab738c34?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80',
    colors: ['#000000', '#555555', '#FFFFFF']
  }
];

const Products = () => {
  return (
    <section id="products" className="py-24 bg-brand-DEFAULT">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-2">Our Products</h2>
          <div className="w-16 h-1 bg-white mx-auto"></div>
          <p className="text-gray-300 mt-6 max-w-2xl mx-auto">
            Discover our collection of premium, minimalist t-shirts designed for the modern individual.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              hoverImage={product.hoverImage}
              colors={product.colors}
            />
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a href="#" className="inline-block border border-white text-white px-8 py-3 text-lg font-medium hover:bg-white hover:text-black transition-colors">
            View All Products
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Products;
