
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, Sparkles, Star, Droplets, Palette, Wind, Heart, Scissors, Leaf, Zap } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { CATEGORIES } from '../constants';
import { useProducts } from '../services/productService';

const HomePage: React.FC = () => {
  const { products } = useProducts();
  
  // Use dynamic products
  const flashSaleProducts = products.filter(p => p.isSale).slice(0, 4);
  const newArrivals = products.filter(p => p.isNew).slice(0, 5);
  const bestSellers = products.slice(0, 8).sort((a, b) => b.reviews - a.reviews).slice(0, 4);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Skincare": return <Droplets className="w-5 h-5 text-primary-500" />;
      case "Makeup": return <Palette className="w-5 h-5 text-primary-500" />;
      case "Hair Care": return <Wind className="w-5 h-5 text-primary-500" />;
      case "Body": return <Heart className="w-5 h-5 text-primary-500" />;
      case "Fragrance": return <Sparkles className="w-5 h-5 text-primary-500" />;
      case "Tools": return <Scissors className="w-5 h-5 text-primary-500" />;
      case "Natural": return <Leaf className="w-5 h-5 text-primary-500" />;
      case "New Arrivals": return <Zap className="w-5 h-5 text-primary-500" />;
      default: return <Star className="w-5 h-5 text-primary-500" />;
    }
  };

  return (
    <main className="pb-12 relative">
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] bg-[#fff0f5] overflow-hidden">
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="md:w-1/2 z-20 pt-10 md:pt-0 animate-fade-in-up">
            <div className="flex items-center gap-2 mb-6">
              <span className="inline-flex items-center gap-1 bg-white/80 backdrop-blur text-gray-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm border border-white">
                <Sparkles className="w-3 h-3 text-primary-500" /> NEW SEASON
              </span>
              <span className="inline-flex bg-primary-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                UP TO 50% OFF
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-gray-900 mb-6 leading-[1.1]">
              Radiate <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-purple-600">Confidence</span> <br/>
              Glow Within
            </h1>
            <p className="text-gray-600 mb-10 max-w-md text-lg leading-relaxed">
              Discover premium Korean skincare and makeup essentials curated by experts to enhance your natural beauty.
            </p>
            <div className="flex gap-4">
              <Link 
                to="/shop" 
                className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-full font-bold hover:bg-primary-600 transition-all shadow-lg hover:shadow-primary-200 hover:-translate-y-1"
              >
                Shop Collection <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                to="/shop" 
                className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-full font-bold hover:bg-gray-50 transition-all shadow-md border border-gray-100"
              >
                View Brands
              </Link>
            </div>
          </div>
          <div className="absolute right-0 bottom-0 w-full h-2/3 md:w-3/5 md:h-full z-10">
             {/* Placeholder for Hero Image */}
             <div className="w-full h-full bg-gradient-to-tr from-[#fff0f5] via-primary-100 to-primary-200 opacity-50 mask-image-gradient-horizontal flex items-end justify-center">
                <div className="text-primary-300 font-serif text-9xl opacity-20 transform translate-y-20">Glow</div>
             </div>
          </div>
        </div>
      </section>

      {/* Categories Strip */}
      <section className="py-8 bg-white border-b border-gray-100 sticky top-[72px] z-30 shadow-sm bg-opacity-95 backdrop-blur">
        <div className="container mx-auto px-4 overflow-x-auto no-scrollbar">
          <div className="flex gap-4 md:justify-center min-w-max px-2">
            {CATEGORIES.map((cat, idx) => (
              <Link 
                key={idx} 
                to={`/shop?category=${cat === 'New Arrivals' ? '' : cat}&type=${cat === 'New Arrivals' ? 'new' : ''}`}
                className="flex items-center gap-3 px-2 py-2 pr-5 rounded-full bg-gray-50 hover:bg-primary-50 border border-gray-100 hover:border-primary-200 transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform group-hover:border-primary-100">
                  {getCategoryIcon(cat)}
                </div>
                <span className="text-sm font-bold text-gray-700 group-hover:text-primary-700 whitespace-nowrap">{cat}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Flash Sale Section */}
      <section className="py-16 container mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
                <span className="w-1 h-6 bg-primary-500 rounded-full"></span>
                <span className="text-primary-600 font-bold tracking-wider text-xs uppercase">Limited Time Offer</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 flex items-center gap-3">
              Flash Sale <span className="text-3xl animate-pulse">⚡</span>
            </h2>
            <div className="flex items-center gap-2 mt-3 text-sm font-medium text-gray-500">
              <span>Ending in:</span>
              <div className="flex gap-1">
                <span className="bg-gray-900 text-white w-8 h-8 flex items-center justify-center rounded-lg font-mono font-bold">02</span>
                <span className="py-1">:</span>
                <span className="bg-gray-900 text-white w-8 h-8 flex items-center justify-center rounded-lg font-mono font-bold">45</span>
                <span className="py-1">:</span>
                <span className="bg-gray-900 text-white w-8 h-8 flex items-center justify-center rounded-lg font-mono font-bold">12</span>
              </div>
            </div>
          </div>
          <Link to="/shop" className="hidden md:flex items-center gap-2 text-sm font-bold text-gray-900 hover:text-primary-600 transition-colors group">
            View All Products <div className="bg-gray-100 rounded-full p-1 group-hover:bg-primary-100 transition-colors"><ChevronRight className="w-4 h-4" /></div>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {flashSaleProducts.length > 0 ? flashSaleProducts.map(product => (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          )) : (
             <div className="col-span-4 text-center py-10 text-gray-400 italic">No flash sale items at the moment. Check back later!</div>
          )}
        </div>
        
        <div className="mt-8 text-center md:hidden">
            <Link to="/shop" className="inline-block border border-gray-300 px-6 py-3 rounded-full text-sm font-bold text-gray-900">View All Flash Sales</Link>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="py-8 container mx-auto px-4">
        <div className="rounded-3xl overflow-hidden h-[250px] md:h-[400px] relative group bg-gradient-to-r from-gray-800 to-gray-900">
          {/* Placeholder for Promo Banner Image */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
            <div className="text-white p-8 md:p-16 max-w-2xl relative z-10">
              <span className="bg-white/20 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded-full mb-4 inline-block border border-white/30">SUMMER COLLECTION</span>
              <h3 className="text-4xl md:text-5xl font-serif font-bold mb-4 leading-tight">Sun-Kissed Glow <br/> Essentials</h3>
              <p className="mb-8 text-white/90 text-lg max-w-md">Protect and hydrate your skin with our premium SPF range. Non-sticky, no white cast.</p>
              <Link to="/shop" className="bg-white text-gray-900 px-8 py-3.5 rounded-full font-bold text-sm hover:bg-primary-50 transition-colors inline-flex items-center gap-2">
                Discover Now <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals Grid */}
      <section className="py-16 container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-primary-600 font-bold text-xs tracking-widest uppercase mb-2 block">Just Landed</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">New Arrivals</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {newArrivals.map((product, i) => (
            <div key={i}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* Best Sellers / Editor's Choice */}
      <section className="py-20 bg-primary-50/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
             {/* Left Header */}
             <div className="lg:col-span-1 pr-8">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">Editor's Choice</h2>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Our beauty editors have hand-picked these products for their outstanding performance and rave reviews. See what everyone is talking about.
                </p>
                <div className="space-y-6">
                   <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                      <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600">
                        <Star className="w-6 h-6 fill-current" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">Top Rated</h4>
                        <p className="text-xs text-gray-500">Products with 4.8+ stars</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                        <Sparkles className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">Clean Beauty</h4>
                        <p className="text-xs text-gray-500">Safe ingredients only</p>
                      </div>
                   </div>
                </div>
                <Link to="/shop" className="mt-8 inline-flex items-center gap-2 text-primary-600 font-bold hover:underline">
                  View All Best Sellers <ArrowRight className="w-4 h-4" />
                </Link>
             </div>

             {/* Right Grid */}
             <div className="lg:col-span-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                   {bestSellers.map(product => (
                     <div key={product.id} className="flex bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                        <div className="w-32 h-32 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden mr-4 relative">
                           {/* Placeholder Image */}
                           <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-300 font-serif text-4xl font-bold opacity-50">
                             {product.brand.charAt(0)}
                           </div>
                        </div>
                        <div className="flex flex-col justify-center">
                           <span className="text-xs text-gray-400 font-bold mb-1">{product.brand}</span>
                           <h4 className="font-bold text-gray-900 leading-tight mb-2 line-clamp-2">{product.name}</h4>
                           <div className="flex items-center gap-1 mb-3">
                              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                              <span className="text-xs font-bold text-gray-700">{product.rating}</span>
                           </div>
                           <span className="text-primary-600 font-bold">Rp {product.price.toLocaleString()}</span>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
