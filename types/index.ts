// types/index.ts
export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
    rating: number;
    reviews: Review[];
    stock: number;
  }
  
  export interface Review {
    id: string;
    userId: string;
    rating: number;
    comment: string;
    createdAt: Date;
  }
  
  export interface FilterOptions {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: 'price-asc' | 'price-desc' | 'rating';
  }