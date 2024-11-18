import { useEffect, useState } from 'react';
import Navbar from '../../components/Header';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Default search change handler
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Add logic if needed, or just leave it empty
    console.log(e.target.value);
  };

  // Load cart data from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const parsedCart: CartItem[] = JSON.parse(savedCart).map((item: CartItem) => ({
          ...item,
          price: isNaN(parseFloat(item.price.toString())) ? 0 : parseFloat(item.price.toString()),
        }));
        setCartItems(parsedCart);
      }
    }
  }, []);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeFromCart = (productId: number) => {
    const updatedCart = cartItems.filter(item => item.id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const calculateTotal = () => {
    const total = cartItems.reduce(
      (acc, item) => acc + (item.price * item.quantity),
      0
    );
    return total.toFixed(2);
  };

  return (
    <div>
      <Navbar
        cartCount={cartItems.length}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        handleSearchChange={handleSearchChange} // Pass the handler
      />
      <div className="cart-container">
        <h1>Your Cart</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>{`Price: $${item.price.toFixed(2)}`}</p>
                  <div className="cart-item-quantity">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="remove-button">Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
        {cartItems.length > 0 && (
          <div className="total-amount">
            <h3>Total Payable: ${calculateTotal()}</h3>
            <button className="checkout-button">Proceed to Checkout</button>
          </div>
        )}
      </div>

      <style jsx>{`
        .cart-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }
        .cart-items {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .cart-item {
          display: flex;
          align-items: center;
          gap: 20px;
          background-color: #fff;
          padding: 15px;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .cart-item-image img {
          width: 100px;
          height: 100px;
          object-fit: cover;
          border-radius: 8px;
        }
        .cart-item-details {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .cart-item-details h3 {
          margin: 0;
          font-size: 18px;
        }
        .cart-item-quantity {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 10px;
        }
        .cart-item-quantity button {
          padding: 5px 10px;
          background-color: #f1f1f1;
          border: 1px solid #ccc;
          border-radius: 4px;
          cursor: pointer;
        }
        .cart-item-quantity button:hover {
          background-color: #e0e0e0;
        }
        .remove-button {
          margin-top: 10px;
          padding: 8px 15px;
          background-color: #ff4040;
          border: none;
          color: white;
          border-radius: 4px;
          cursor: pointer;
        }
        .remove-button:hover {
          background-color: #e53939;
        }
        .total-amount {
          margin-top: 30px;
          text-align: right;
        }
        .total-amount h3 {
          font-size: 20px;
          margin-bottom: 10px;
        }
        .checkout-button {
          padding: 12px 20px;
          background-color: #ffd814;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
        }
        .checkout-button:hover {
          background-color: #ffb900;
        }
      `}</style>
    </div>
  );
};

export default Cart;
