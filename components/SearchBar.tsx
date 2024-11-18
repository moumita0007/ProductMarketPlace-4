// components/SearchBar.tsx
import React from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search products..."
      onChange={(e) => onSearch(e.target.value)}
      className="search-bar"
    />
  );
};

export default SearchBar;