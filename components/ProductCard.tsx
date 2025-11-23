import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../services/cartService';

interface ProductCardProps {
  product: Product;
  searchQuery?: string;
}

const HighlightedText: React.FC<{ text: string; query?: string; className?: string }> = ({ text, query, className }) => {
  if (!query || query.length < 2) return <span className={className}>{text}</span>;

  const parts = text.split(new RegExp(`(${query})`, 'gi'));
  return (
    <span className={className}>
      {parts.map((part, i) => 
        part.toLowerCase() === query.toLowerCase() ? (
          <span key={i} className="bg-primary-100 text-primary-700 font-bold px-0.5 rounded">{part}</span>
        ) : (
          part
        )
      )}
    </span>
  );
};

const ProductCard: React.FC<ProductCardProps> = ({ product, searchQuery }) => {
  const { addToCart } = useCart();

  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col h-full border border-gray-100 hover:border-primary-200 relative">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-400 via-pink-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-primary-50/30">
        {product.isSale && (
          <span className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white text-[11px] font-bold px-3 py-1.5 rounded-full z-10 shadow-lg tracking-wide animate-pulse">
            SALE
          </span>
        )}
        {product.isNew && !product.isSale && (
          <span className="absolute top-4 left-4 bg-gradient-to-r from-primary-500 to-purple-500 text-white text-[11px] font-bold px-3 py-1.5 rounded-full z-10 shadow-lg tracking-wide">
            NEW
          </span>
        )}
        
        <Link to={`/product/${product.id}`}>
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              onError={(e: any) => { e.currentTarget.src = 'https://via.placeholder.com/400?text=No+Image'; }}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7a2 2 0 012-2h3l2 2h6a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 13l2-2 2 2 3-3 3 3" />
              </svg>
            </div>
          )}
        </Link>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-white via-white to-transparent backdrop-blur-sm">
          <button 
            onClick={() => addToCart(product)}
            className="w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white text-sm font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:from-primary-600 hover:to-primary-500 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            <ShoppingCart className="w-4 h-4" /> ADD TO BAG
          </button>
        </div>
        
        <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-white hover:scale-110 transition-all opacity-0 group-hover:opacity-100 shadow-lg">
          <Heart className="w-4.5 h-4.5" />
        </button>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <Link to={`/product/${product.id}`} className="flex-grow block">
          <div className="text-xs font-bold text-primary-600 mb-2 uppercase tracking-wider flex items-center gap-1">
             <HighlightedText text={product.brand} query={searchQuery} />
          </div>
          
          <h3 className="text-[15px] font-semibold text-gray-900 line-clamp-2 mb-3 group-hover:text-primary-600 transition-colors leading-tight h-10">
            <HighlightedText text={product.name} query={searchQuery} />
          </h3>
          
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-lg font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
              Rp {product.price.toLocaleString('id-ID')}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                Rp {product.originalPrice.toLocaleString('id-ID')}
              </span>
            )}
          </div>
        </Link>

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2 bg-gradient-to-r from-amber-50 to-yellow-50 px-3 py-1.5 rounded-lg">
            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-gray-800 font-bold">{product.rating}</span>
            <span className="text-xs text-gray-500 font-medium">({product.reviews})</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
