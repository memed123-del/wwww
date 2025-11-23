
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Filter, ChevronDown, X, Search, ArrowRight, SlidersHorizontal, Check } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { CATEGORIES } from '../constants';
import { SortOption } from '../types';
import { Link, useSearchParams } from 'react-router-dom';
import { useProducts } from '../services/productService';

const ShopPage: React.FC = () => {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Read state from URL or default
  const urlCategory = searchParams.get('category');
  const urlType = searchParams.get('type'); // 'new' or 'sale'
  const urlQuery = searchParams.get('q') || '';

  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>(SortOption.POPULAR);
  const [searchQuery, setSearchQuery] = useState(urlQuery);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(urlCategory ? [urlCategory] : []);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Sync URL changes to state
  useEffect(() => {
    if (urlCategory) {
      setSelectedCategories([urlCategory]);
    } else {
      setSelectedCategories([]);
    }
    if (urlQuery) {
      setSearchQuery(urlQuery);
    }
  }, [urlCategory, urlQuery]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCategoryChange = (category: string) => {
    const updated = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    
    setSelectedCategories(updated);
    
    // Update URL params optionally if needed, or just keep local state override
    if (updated.length === 1) {
      setSearchParams({ ...Object.fromEntries(searchParams), category: updated[0] });
    } else {
      const newParams = Object.fromEntries(searchParams);
      delete newParams.category;
      setSearchParams(newParams);
    }
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by URL Type (Sale / New)
    if (urlType === 'sale') {
      result = result.filter(p => p.isSale);
    } else if (urlType === 'new') {
      result = result.filter(p => p.isNew);
    }

    // Filter by Search
    if (searchQuery) {
      const term = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(term) || 
        product.brand.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term)
      );
    }

    // Filter by Category
    if (selectedCategories.length > 0) {
      result = result.filter(p => selectedCategories.includes(p.category));
    }

    // Sorting
    switch (sortBy) {
      case SortOption.PRICE_LOW_HIGH:
        result.sort((a, b) => a.price - b.price);
        break;
      case SortOption.PRICE_HIGH_LOW:
        result.sort((a, b) => b.price - a.price);
        break;
      case SortOption.NEWEST:
        result.sort((a, b) => b.id - a.id);
        break;
      case SortOption.POPULAR:
      default:
        result.sort((a, b) => b.reviews - a.reviews);
        break;
    }

    return result;
  }, [products, searchQuery, sortBy, selectedCategories, urlType]);

  const suggestions = useMemo(() => {
    if (searchQuery.length < 2) return [];
    const term = searchQuery.toLowerCase();
    const matches = products.filter(p => 
      p.name.toLowerCase().includes(term) || p.brand.toLowerCase().includes(term)
    );
    return matches.slice(0, 5);
  }, [products, searchQuery]);

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    setShowSuggestions(true);
    // Optionally update URL immediately or debounce it
  };

  const handleSearchSubmit = () => {
    setSearchParams({ q: searchQuery });
    setShowSuggestions(false);
  };

  return (
    <div className="bg-gray-50/30 min-h-screen">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)]">
        <div className="container mx-auto px-4 py-6">
          {/* Breadcrumbs */}
          <div className="text-xs text-gray-500 mb-4 flex items-center gap-2 font-medium">
            <Link to="/" className="hover:text-primary-600 transition-colors">Home</Link> 
            <span className="text-gray-300">/</span> 
            <span className="text-gray-900">Shop</span>
            {urlType && (
              <>
                <span className="text-gray-300">/</span>
                <span className="text-primary-600 capitalize">{urlType === 'sale' ? 'Flash Sale' : 'New Arrivals'}</span>
              </>
            )}
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-2">
                {urlType === 'sale' ? 'Flash Sale ⚡' : urlType === 'new' ? 'Just Arrived ✨' : 'Shop All'}
              </h1>
              <p className="text-gray-500 text-sm">
                Showing {filteredProducts.length} results
              </p>
            </div>

            {/* Advanced Search Bar */}
            <div className="w-full md:w-[400px] relative" ref={searchContainerRef}>
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Search essentials..."
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-400 transition-all shadow-sm group-hover:bg-white group-hover:shadow-md"
                  value={searchQuery}
                  onChange={handleSearchInput}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
                  onFocus={() => setShowSuggestions(true)}
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-4 top-3.5 group-hover:text-primary-500 transition-colors" />
                {searchQuery && (
                  <button 
                    onClick={() => { setSearchQuery(''); setSearchParams({}); }}
                    className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Suggestions Dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-fade-in-up">
                  <ul>
                    {suggestions.map(product => (
                      <li key={product.id}>
                        <button
                          onClick={() => {
                            setSearchQuery(product.name);
                            setSearchParams({ q: product.name });
                            setShowSuggestions(false);
                          }}
                          className="w-full text-left px-4 py-3 hover:bg-primary-50 transition-colors flex items-center gap-4 group border-b border-gray-50 last:border-0"
                        >
                          {product.image ? (
                            <img src={product.image} alt={product.name} onError={(e: any) => { e.currentTarget.src = 'https://via.placeholder.com/80?text=No+Img'; }} className="w-10 h-10 rounded-lg object-cover bg-gray-100" />
                          ) : (
                            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7a2 2 0 012-2h3l2 2h6a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 13l2-2 2 2 3-3 3 3" />
                              </svg>
                            </div>
                          )}
                          <div className="flex-grow">
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-0.5">{product.brand}</p>
                            <p className="text-sm text-gray-800 font-medium group-hover:text-primary-700 line-clamp-1">{product.name}</p>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row gap-10">
          
          {/* Filters Sidebar */}
          <aside className={`md:w-64 flex-shrink-0 ${showFilters ? 'fixed inset-0 z-50 bg-white p-6 overflow-y-auto' : 'hidden md:block'}`}>
            <div className="md:sticky md:top-32 space-y-8">
              <div className="flex items-center justify-between md:hidden mb-6">
                <h3 className="text-xl font-bold">Filters</h3>
                <button onClick={() => setShowFilters(false)}><X className="w-6 h-6" /></button>
              </div>

              {/* Category Group */}
              <div>
                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                  Category
                  {selectedCategories.length > 0 && <span className="bg-primary-100 text-primary-700 text-[10px] px-2 py-0.5 rounded-full">{selectedCategories.length}</span>}
                </h4>
                <div className="space-y-2">
                  {CATEGORIES.map((cat, i) => {
                    const isSelected = selectedCategories.includes(cat);
                    return (
                      <label key={i} className="flex items-center gap-3 cursor-pointer group py-1">
                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isSelected ? 'bg-primary-600 border-primary-600' : 'border-gray-300 bg-white group-hover:border-primary-400'}`}>
                          {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                        </div>
                        <input 
                          type="checkbox" 
                          className="hidden"
                          checked={isSelected}
                          onChange={() => handleCategoryChange(cat)}
                        />
                        <span className={`text-sm transition-colors ${isSelected ? 'text-gray-900 font-medium' : 'text-gray-600 group-hover:text-primary-600'}`}>{cat}</span>
                      </label>
                    )
                  })}
                </div>
              </div>

              {/* Apply Filters Button (Mobile) */}
              {showFilters && (
                <button 
                  onClick={() => setShowFilters(false)}
                  className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold mt-8 md:hidden"
                >
                  View Results
                </button>
              )}
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-grow">
            {/* Toolbar */}
            <div className="flex justify-between items-center mb-6">
              <button 
                onClick={() => setShowFilters(true)}
                className="md:hidden flex items-center gap-2 bg-white border border-gray-200 px-4 py-2.5 rounded-xl text-sm font-bold shadow-sm"
              >
                <SlidersHorizontal className="w-4 h-4" /> Filters
              </button>

              <div className="ml-auto flex items-center gap-3">
                <span className="text-sm text-gray-500 hidden sm:inline">Sort by:</span>
                <div className="relative group">
                  <select 
                    className="appearance-none bg-white border border-gray-200 pl-4 pr-10 py-2.5 rounded-xl text-sm focus:outline-none cursor-pointer hover:border-primary-300 transition-all font-medium text-gray-700 shadow-sm"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                  >
                    {Object.values(SortOption).map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-3 top-3 pointer-events-none text-gray-400 group-hover:text-primary-500 transition-colors" />
                </div>
              </div>
            </div>

            {/* Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                {filteredProducts.map((product, index) => (
                  <ProductCard key={`${product.id}-${index}`} product={product} searchQuery={searchQuery} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                <div className="w-24 h-24 bg-primary-50 rounded-full flex items-center justify-center mb-6 animate-pulse">
                  <Search className="w-10 h-10 text-primary-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No matches found</h3>
                <p className="text-gray-500 mb-8 max-w-md text-center">
                  Try adjusting your filters or search for something else like "Serum" or "Lipstick".
                </p>
                <button 
                  onClick={() => {
                    setSearchParams({});
                    setSearchQuery('');
                    setSelectedCategories([]);
                  }}
                  className="px-8 py-3 bg-gray-900 text-white rounded-full font-bold hover:bg-primary-600 transition-colors shadow-lg"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
