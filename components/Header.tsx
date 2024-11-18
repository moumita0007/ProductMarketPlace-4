import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import '@fortawesome/fontawesome-free/css/all.min.css';

interface NavbarProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  cartCount: number;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Header: React.FC<NavbarProps> = ({
  selectedCategory,
  setSelectedCategory,
  cartCount,
  handleSearchChange,
}) => {
  const router = useRouter();
  const isProductPage = router.pathname === '/product';

  return (
    <nav>
      <div className="navbar">
        {/* Logo */}
        <div className="logo">
          <Link href="/" style={{ textDecoration: 'none', color: 'white', fontSize: '1.8rem', fontWeight: '300' }}>MyStore</Link>
        </div>

        {/* Navigation links on the left side */}
        <div className="nav-links">
          <Link href="/" style={{ textDecoration: 'none', color: 'white' }}>
            <i className="fa-solid fa-house" style={{ paddingRight: '5px' }}></i>Home
          </Link>
          <Link href="/product" style={{ textDecoration: 'none', color: 'white' }}>
            <i className="fa-solid fa-box" style={{ paddingRight: '5px' }}></i>Products
          </Link>
          <Link href="/cart" style={{ textDecoration: 'none', color: 'white' }}>
            <i className="fa-solid fa-cart-shopping" style={{ paddingRight: '5px' }}></i>Cart
            {cartCount > 0 && <span className="cart-count">({cartCount})</span>}
          </Link>
        </div>

        {/* Conditionally display search and category filter on the right, only for the product page */}
        {isProductPage && (
          <div className="search-and-filter">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search products..."
                onChange={handleSearchChange} // Use the function passed from ProductDetails
              />
              <button type="button">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
            <div className="category-filter">
              <span style={{ paddingRight: '5px' }}>Category</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Home">Home</option>
              </select>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .navbar {
          display: flex;
          justify-content: space-between; /* Space between the left and right parts */
          align-items: center;
          padding: 10px 20px;
          background-color: #131921;
          color: #fff;
        }

        .logo {
          font-size: 28px;
          font-weight: bold;
          color: #ffd814;
        }

        .nav-links {
          display: flex;
          gap: 30px;
          margin-left: 20px; /* Space between logo and nav links */
          flex-grow: 1; /* Allow this section to take remaining space */
        }

        .nav-links a {
          color: #fff;
          text-decoration: none;
          font-size: 18px;
          font-weight: 500;
          display: flex;
          align-items: center;
        }

        .nav-links a:hover {
          text-decoration: underline;
        }

        .cart-count {
          font-size: 14px;
          color: yellow;
          font-weight: bold;
        }

        /* Right side: search and filter */
        .search-and-filter {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-left: auto; /* Pushes search/filter to the right */
        }

        .search-bar {
          display: flex;
          align-items: center;
          border: 1px solid #ccc;
          border-radius: 4px;
          background-color: #222;
          padding: 5px;
        }

        .search-bar input {
          background-color: transparent;
          border: none;
          outline: none;
          color: #fff;
          padding: 5px;
        }

        .search-bar button {
          background-color: transparent;
          border: none;
          color: #fff;
          cursor: pointer;
        }

        .category-filter select {
          padding: 8px;
          background-color: #222;
          color: #fff;
          border: none;
          border-radius: 4px;
        }

        /* Ensure the left-side navigation does not shift when search/filter appears */
        .nav-links {
          display: flex;
          gap: 30px;
          margin-left: 20px;
        }

        /* Make sure the search-and-filter stays at the right */
        .search-and-filter {
          margin-left: auto; /* Ensures that search/filter stays on the right */
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .navbar {
            flex-direction: column;
            align-items: flex-start;
          }

          .nav-links {
            margin-top: 10px;
            gap: 20px; /* Reduce gap on mobile */
          }

          .search-and-filter {
            margin-top: 10px;
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </nav>
  );
};

export default Header;
