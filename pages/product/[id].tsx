import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Navbar from '../../components/Header';
import Product1 from '../../public/images/iphone.jpg';
import Product2 from '../../public/images/headphone.jpg';
import Product3 from '../../public/images/shirt.jpg';
import Product4 from '../../public/images/tshirt.jpg';
import Product5 from '../../public/images/chair.jpg';

// Define types for product and review
interface Review {
  name: string;
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

// Static product data
const staticProducts: Product[] = [
  {
    id: 1,
    name: 'Apple iPhone 16 Pro',
    image: Product1.src,
    price: '$84.76',
    description: 'Apple iPhone 16 Pro (128 GB) - White Titanium',
    creator: 'Creator 1',
    reviews: [
      { name: 'John', comment: 'Great!' },
      { name: 'Alice', comment: 'Loved it!' },
    ],
    category: 'Electronics',
    rating: '4.4',
  },
  {
    id: 2,
    name: 'Headphone',
    image: Product2.src,
    price: '$58.73',
    description: 'Noise 3 Overhead Wireless Headphone',
    creator: 'Creator 2',
    reviews: [
      { name: 'Mike', comment: 'Amazing!' },
      { name: 'Sarah', comment: 'Would buy again!' },
    ],
    category: 'Electronics',
    rating: '4.2',
  },
  {
    id: 3,
    name: 'Allen Solly Shirt',
    image: Product3.src,
    price: '$99.99',
    description: 'Allen Solly Mens Slim Fit Shirt,100% cotton',
    creator: 'Creator 3',
    reviews: [
      { name: 'David', comment: 'Fantastic!' },
      { name: 'Emma', comment: 'Highly recommend!' },
    ],
    category: 'Clothing',
    rating: '3.8',
  },
  {
    id: 4,
    name: 'Van Heusen T-shirt',
    image: Product4.src,
    price: '$42.00',
    description: 'Van Heusen Mens Regular Fit T-Shirt',
    creator: 'Creator 4',
    reviews: [
      { name: 'James', comment: 'Great product!' },
      { name: 'Lily', comment: 'Very useful!' },
    ],
    category: 'Clothing',
    rating: '4.9',
  },
  {
    id: 5,
    name: 'Executive Mesh Office Chair',
    image: Product5.src,
    price: '$120.50',
    description: 'Ergonomic Revolving Chair for Home & Office (Grey)',
    creator: 'Creator 5',
    reviews: [
      { name: 'Paul', comment: 'Superb!' },
      { name: 'Sophia', comment: 'Loved it!' },
    ],
    category: 'Home',
    rating: '5.0',
  },
];

const ProductPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    if (id) {
      const productId = parseInt(id as string, 10);
      const foundProduct = staticProducts.find((p) => p.id === productId);
      setProduct(foundProduct || null);
    }

    // Load cart items from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const cartData: Product[] = JSON.parse(savedCart);
      setCartItems(cartData);
    }
  }, [id]);

  const addToCart = () => {
    if (product) {
      const updatedCart = [...cartItems, product];
      setCartItems(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      alert(`${product.name} added to cart!`);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    console.log(`Search Query: ${query}`);
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <Navbar
        cartCount={cartItems.length}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        handleSearchChange={handleSearchChange}
      />
      <div className="wrapper">
        {/* Product Details Section */}
        <div className="product-details-container">
          {/* Image Section */}
          <div className="product-image">
            <img src={product.image} alt={product.name} />
          </div>
          {/* Product Info Section */}
          <div className="product-info">
            <h1>{product.name}</h1>
            <p><strong>Price:</strong> {product.price}</p>
            <p><strong>Description:</strong> {product.description}</p>
            <p><strong>Category:</strong> {product.category}</p>
            <p><strong>Creator:</strong> {product.creator}</p>
            <p><strong>Rating:</strong> {product.rating} ⭐</p>
            <button onClick={addToCart}>Add to Cart</button>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="product-reviews">
          <h2>Customer Reviews</h2>
          {product.reviews.length > 0 ? (
            product.reviews.map((review, index) => (
              <div key={index} className="review">
                <p><strong>{review.name}:</strong> {review.comment}</p>
              </div>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>
      </div>

      <style jsx>{`
        .wrapper {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }
        .product-details-container {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          margin-bottom: 30px;
        }
        .product-image {
          flex: 1;
          max-width: 400px;
        }
        .product-image img {
          width: 100%;
          height: 350px;
          border-radius: 8px;
          object-fit: cover;
        }
        .product-info {
          flex: 2;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .product-info h1 {
          font-size: 24px;
          margin-bottom: 10px;
        }
        .product-info p {
          margin: 5px 0;
          font-size: 16px;
          line-height: 1.6;
        }
        .product-info button {
          margin-top: 20px;
          padding: 10px 20px;
          background-color: #ffd814;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
        }
        .product-info button:hover {
          background-color: #ffb900;
        }
        .product-reviews {
          margin-top: 30px;
        }
        .product-reviews h2 {
          font-size: 20px;
          margin-bottom: 10px;
        }
        .review {
          background-color: #f9f9f9;
          border: 1px solid #e0e0e0;
          padding: 10px;
          border-radius: 4px;
          margin-bottom: 10px;
        }
        .review p {
          margin: 0;
        }
      `}</style>
    </div>
  );
};

export default ProductPage;
