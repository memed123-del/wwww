import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../types';
import { MOCK_PRODUCTS } from '../constants';

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'rating' | 'reviews'>) => void;
  deleteProduct: (id: number) => void;
  getProductById: (id: number) => Product | undefined;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  // Load initial products
  useEffect(() => {
    const savedProducts = localStorage.getItem('glow_products');
    if (savedProducts) {
      try {
        const parsed = JSON.parse(savedProducts);
        // If saved data looks stale (missing images), replace with fresh MOCK_PRODUCTS
        const looksValid = Array.isArray(parsed) && parsed.length > 0 && parsed.every((p: any) => typeof p.image === 'string' && p.image.length > 0);
        if (looksValid) {
          setProducts(parsed);
        } else {
          // overwrite stale data with current mock products
          setProducts(MOCK_PRODUCTS);
          localStorage.setItem('glow_products', JSON.stringify(MOCK_PRODUCTS));
        }
      } catch (e) {
        setProducts(MOCK_PRODUCTS);
      }
    } else {
      setProducts(MOCK_PRODUCTS);
    }
  }, []);

  // Persist products whenever they change
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem('glow_products', JSON.stringify(products));
    }
  }, [products]);

  const addProduct = (newProduct: Omit<Product, 'id' | 'rating' | 'reviews'>) => {
    const product: Product = {
      ...newProduct,
      id: Date.now(), // Use timestamp for unique ID
      rating: 5.0, // Default rating for new products
      reviews: 0,
      isNew: true
    };
    setProducts(prev => [product, ...prev]);
  };

  const deleteProduct = (id: number) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const getProductById = (id: number) => {
    return products.find(p => p.id === id);
  };

  return React.createElement(ProductContext.Provider, {
    value: { products, addProduct, deleteProduct, getProductById }
  }, children);
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error("useProducts must be used within a ProductProvider");
  return context;
};