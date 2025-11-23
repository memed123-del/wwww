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
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full border border-gray-100">
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        {product.isSale && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full z-10 shadow-sm tracking-wide">
            SALE
          </span>
        )}
        {product.isNew && (
          <span className="absolute top-3 left-3 bg-primary-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full z-10 shadow-sm tracking-wide">
            NEW
          </span>
        )}
        <Link to={`/product/${product.id}`}>
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              onError={(e: any) => { e.currentTarget.src = 'https://via.placeholder.com/400?text=No+Image'; }}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out mix-blend-multiply"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7a2 2 0 012-2h3l2 2h6a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 13l2-2 2 2 3-3 3 3" />
              </svg>
            </div>
          )}
        </Link>
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-white/90 backdrop-blur-md border-t border-gray-100">
          <button 
            onClick={() => addToCart(product)}
            className="w-full bg-gray-900 text-white text-xs font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-primary-600 transition-colors shadow-md"
          >
            <ShoppingCart className="w-3.5 h-3.5" /> ADD TO BAG
          </button>
        </div>
        <button className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-white transition-all opacity-0 group-hover:opacity-100 shadow-sm">
            <Heart className="w-4 h-4" />
        </button>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <Link to={`/product/${product.id}`} className="flex-grow block">
          <div className="text-xs font-bold text-primary-500 mb-1.5 uppercase tracking-wider flex items-center gap-1">
             <HighlightedText text={product.brand} query={searchQuery} />
          </div>
          <h3 className="text-[15px] font-semibold text-gray-800 line-clamp-2 mb-2 group-hover:text-primary-600 transition-colors leading-snug h-10">
            <HighlightedText text={product.name} query={searchQuery} />
          </h3>
          
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-base font-bold text-gray-900">Rp {product.price.toLocaleString('id-ID')}</span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through decoration-gray-300">Rp {product.originalPrice.toLocaleString('id-ID')}</span>
            )}
          </div>
        </Link>

        <div className="flex items-center justify-between mt-auto border-t border-gray-50 pt-3">
          <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs text-gray-700 font-bold">{product.rating}</span>
            <span className="text-[10px] text-gray-400 font-medium">({product.reviews})</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

