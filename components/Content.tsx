// components/Content.tsx
import React from 'react';
import ProductCard from './ProductCard';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
}

const Content: React.FC<{ products: Product[] }> = ({ products }) => {
  return (
    <div className="content">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Content;