// components/SortOptions.tsx
import React from 'react';

interface SortOptionsProps {
  onSort: (sortBy: string) => void;
}

const SortOptions: React.FC<SortOptionsProps> = ({ onSort }) => {
  return (
    <select onChange={(e) => onSort(e.target.value)}>
      <option value="default">Sort by</option>
      <option value="price-asc">Price: Low to High</option>
      <option value="price-desc">Price: High to Low</option>
      <option value="popular">Most Popular</option>
    </select>
  );
};

export default SortOptions;