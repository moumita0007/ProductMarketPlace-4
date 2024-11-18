import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Header';
import Product1 from '../../public/images/iphone.jpg';
import Product2 from '../../public/images/headphone.jpg';
import Product3 from '../../public/images/shirt.jpg';
import Product4 from '../../public/images/tshirt.jpg';
import Product5 from '../../public/images/chair.jpg';

interface Review {
  comment: string;
}

interface Product {
  id: number;
  name: string;
  image: string;
  price: string;
  description: string;
  creator: string;
  reviews: Review[];
  category: string;
  rating: string;
}

const staticProducts: Product[] = [
  { id: 1, name: 'Apple iPhone 16 Pro', image: Product1.src, price: '$84.76', description: 'Apple iPhone 16 Pro (128 GB) - White Titanium', creator: 'Creator 1', reviews: [{ comment: 'Great!' }, { comment: 'Loved it!' }], category: 'Electronics', rating: '4.4' },
  { id: 2, name: 'Headphone', image: Product2.src, price: '$58.73', description: 'Noise 3 Overhead Wireless Headphone', creator: 'Creator 2', reviews: [{ comment: 'Amazing!' }, { comment: 'Would buy again!' }], category: 'Electronics', rating: '4.2' },
  { id: 3, name: 'Allen Solly Shirt', image: Product3.src, price: '$99.99', description: 'Allen Solly Mens Slim Fit Shirt,100% cotton', creator: 'Creator 3', reviews: [{ comment: 'Fantastic!' }, { comment: 'Highly recommend!' }], category: 'Clothing', rating: '3.8' },
  { id: 4, name: 'Van Heusen T-shirt', image: Product4.src, price: '$42.00', description: 'Van Heusen Mens Regular Fit T-Shirt', creator: 'Creator 4', reviews: [{ comment: 'Great product!' }, { comment: 'Very useful!' }], category: 'Clothing', rating: '4.9' },
  { id: 5, name: 'Executive Office Chair', image: Product5.src, price: '$120.50', description: 'Ergonomic Revolving Chair for Home & Office (Grey)', creator: 'Creator 5', reviews: [{ comment: 'Superb!' }, { comment: 'Loved it!' }], category: 'Home', rating: '5.0' },
];

const ProductDetails: React.FC = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(savedCart);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredProducts = staticProducts.filter((product) => {
    const isCategoryMatch = selectedCategory === 'All' || product.category === selectedCategory;
    const isSearchMatch =
      product.name.toLowerCase().includes(searchQuery) ||
      product.description.toLowerCase().includes(searchQuery);
    return isCategoryMatch && isSearchMatch;
  });

  const addToCart = (product: Product) => {
    const updatedCart = [...cartItems, product];
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    alert(`${product.name} added to cart!`);
  };

  return (
    <div>
      <Navbar
        cartCount={cartItems.length}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        handleSearchChange={handleSearchChange}
      />
      <div className="products-container">
        <div className="products-section">
          {filteredProducts.length === 0 ? (
            <div className="no-products">No products found.</div>
          ) : (
            filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <img src={product.image || '/placeholder.jpg'} alt={product.name} />
                <h2>{product.name}</h2>
                <p>{product.price}</p>
                <p>{product.description}</p>
                <p>Ratings: <span className="product-rating">{product.rating}</span></p>
                <div className="button-container">
                  <Link href={`/product/${product.id}`}>
                    <button>Details</button>
                  </Link>
                  <button onClick={() => addToCart(product)}>Add to Cart</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <style jsx>{`
        .products-container {
          display: flex;
          justify-content: center;
          padding: 20px;
        }
        .products-section {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 5px;
          width: 100%;
          max-width: 1440px;
          justify-items: center;
          align-items: start;
        }
        .product-card {
          background-color: #fff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s;
          width: 100%;
          max-width: 250px;
        }
        .product-card img {
          width: 100%;
          height: 250px;
          border-radius: 4px;
        }
        .product-card:hover {
          transform: scale(1.05);
        }
        .product-card h2 {
          font-size: 20px;
          color: #333;
        }
        .product-card p {
          color: #555;
          font-size: 16px;
          line-height: 1.6;
        }
        .button-container {
          display: flex;
          gap: 10px;
          margin-top: 15px;
        }
        .product-card button {
          padding: 10px 15px;
          background-color: #ffd814;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
          flex: 1;
        }
        .product-card button:hover {
          background-color: #ffb900;
        }

        .product-rating {
          font-weight:bold;
        }

        .no-products {
          font-size: 18px;
          color: #555;
        }

        @media (max-width: 768px) {
          .products-section {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          }
        }
      `}</style>
    </div>
  );
};

export default ProductDetails;
