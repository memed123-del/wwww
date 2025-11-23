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

  useEffect(() => {
    const CURRENT_VERSION = '2.0';
    const savedVersion = localStorage.getItem('glow_products_version');
    
    if (savedVersion !== CURRENT_VERSION) {
      setProducts(MOCK_PRODUCTS);
      localStorage.setItem('glow_products', JSON.stringify(MOCK_PRODUCTS));
      localStorage.setItem('glow_products_version', CURRENT_VERSION);
    } else {
      const savedProducts = localStorage.getItem('glow_products');
      if (savedProducts) {
        try {
          const parsed = JSON.parse(savedProducts);
          const isValid = Array.isArray(parsed) && parsed.length === 30;
          if (isValid) {
            setProducts(parsed);
          } else {
            setProducts(MOCK_PRODUCTS);
            localStorage.setItem('glow_products', JSON.stringify(MOCK_PRODUCTS));
          }
        } catch (e) {
          setProducts(MOCK_PRODUCTS);
          localStorage.setItem('glow_products', JSON.stringify(MOCK_PRODUCTS));
        }
      } else {
        setProducts(MOCK_PRODUCTS);
        localStorage.setItem('glow_products', JSON.stringify(MOCK_PRODUCTS));
      }
    }
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem('glow_products', JSON.stringify(products));
    }
  }, [products]);

  const addProduct = (newProduct: Omit<Product, 'id' | 'rating' | 'reviews'>) => {
    const product: Product = {
      ...newProduct,
      id: Date.now(),
      rating: 5.0,
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
