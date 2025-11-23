
export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  category: string;
  isNew?: boolean;
  isSale?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  email: string;
  name: string;
}

export interface Comment {
  id: number;
  productId: number;
  userName: string;
  text: string;
  rating: number;
  date: string;
}

export enum SortOption {
  POPULAR = 'Popular',
  NEWEST = 'Newest',
  PRICE_LOW_HIGH = 'Price: Low to High',
  PRICE_HIGH_LOW = 'Price: High to Low',
}
