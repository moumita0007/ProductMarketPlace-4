// components/ProductCard.tsx
import React from 'react';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className="product-card">
      <Link href={`/product/${product.id}`}>
        <img src={product.image} alt={product.name} />
        <h3>{product.name}</h3>
        <p>{product.price}</p>
      </Link>
    </div>
  );
};

export default ProductCard;