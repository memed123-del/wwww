
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { Search, ShoppingBag, User, Menu, X, Heart, ShieldCheck, Sparkles, ScanFace } from 'lucide-react';
import { useCart } from '../services/cartService';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const adminAuth = localStorage.getItem('glow_admin_auth');
    setIsAdmin(adminAuth === 'true');
  }, []);

  // Helper to determine if a category link is active
  const isActive = (path: string, paramName?: string, paramValue?: string) => {
    if (location.pathname !== path) return false;
    if (!paramName) return true;
    return searchParams.get(paramName) === paramValue;
  };

  const navLinkClass = (active: boolean) => 
    `text-sm font-medium transition-all duration-200 ${
      active 
        ? 'text-primary-600 font-bold border-b-2 border-primary-500 pb-1' 
        : 'text-gray-600 hover:text-primary-500 hover:pb-1'
    }`;

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gray-900 text-white text-xs md:text-sm py-2.5 text-center font-medium px-4 tracking-wide">
        <span className="flex items-center justify-center gap-2">
          <Sparkles className="w-3 h-3 text-primary-400" /> 
          COSRX Up to 50% OFF + FREE MINI SERUM! 
          <Link to="/shop?type=sale" className="underline hover:text-primary-300 decoration-primary-500 decoration-2 underline-offset-2">Shop Now</Link>
        </span>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-1"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6 text-gray-600" /> : <Menu className="w-6 h-6 text-gray-600" />}
            </button>

            {/* Logo */}
            <Link to="/" className="flex-shrink-0 group">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tighter text-gray-900 font-serif flex items-center gap-1">
                Glow<span className="text-primary-600 group-hover:scale-110 transition-transform inline-block">Beauty</span>
                <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-3 ml-0.5"></span>
              </h1>
            </Link>

            {/* Desktop Search */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8 relative group">
              <input 
                type="text" 
                placeholder="Search for brands, products..." 
                className="w-full py-2.5 pl-11 pr-4 rounded-full bg-gray-100/50 border border-transparent focus:bg-white focus:border-primary-200 focus:ring-4 focus:ring-primary-50 transition-all text-sm outline-none"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    navigate(`/shop?q=${e.currentTarget.value}`);
                  }
                }}
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-4 top-3 group-focus-within:text-primary-500 transition-colors" />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 md:gap-6">
              <Link 
                to="/skin-analysis" 
                className="hidden lg:flex items-center gap-2 bg-gradient-to-r from-primary-50 to-white border border-primary-200 text-primary-700 px-4 py-2 rounded-full text-xs font-bold hover:shadow-md hover:shadow-primary-100 transition-all group"
              >
                <ScanFace className="w-4 h-4 group-hover:animate-pulse" />
                AI Skin Test
              </Link>

              {isAdmin ? (
                <button 
                  className="hidden md:flex items-center gap-1 text-xs font-bold text-white bg-gray-900 hover:bg-gray-800 transition-colors px-4 py-2 rounded-full shadow-md" 
                  onClick={() => navigate('/admin')}
                >
                  <ShieldCheck className="w-3 h-3" /> Admin
                </button>
              ) : (
                <button className="hidden md:block text-sm font-bold text-gray-600 hover:text-primary-600 transition-colors" onClick={() => navigate('/login')}>
                  Login
                </button>
              )}
              
              <Link to="/" className="hidden sm:block text-gray-600 hover:text-red-500 transition-colors hover:scale-110 transform duration-200">
                <Heart className="w-6 h-6" />
              </Link>

              <Link to="/cart" className="text-gray-600 hover:text-primary-600 transition-colors relative group hover:scale-110 transform duration-200">
                <ShoppingBag className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-primary-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Mobile Search (Visible only on mobile) */}
          <div className="md:hidden mt-3 relative">
             <input 
                type="text" 
                placeholder="Search..." 
                className="w-full py-2 pl-10 pr-4 rounded-xl bg-gray-100 border-none focus:ring-2 focus:ring-primary-100 text-sm"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    navigate(`/shop?q=${e.currentTarget.value}`);
                  }
                }}
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block border-t border-gray-100">
          <div className="container mx-auto px-4">
            <ul className="flex justify-center gap-8 py-3">
              <li><Link to="/shop" className={navLinkClass(isActive('/shop') && !searchParams.toString())}>Shop All</Link></li>
              <li><Link to="/shop?type=new" className={navLinkClass(isActive('/shop', 'type', 'new'))}>New Arrivals</Link></li>
              <li><Link to="/shop?category=Skincare" className={navLinkClass(isActive('/shop', 'category', 'Skincare'))}>Skincare</Link></li>
              <li><Link to="/shop?category=Makeup" className={navLinkClass(isActive('/shop', 'category', 'Makeup'))}>Makeup</Link></li>
              <li><Link to="/shop?category=Hair Care" className={navLinkClass(isActive('/shop', 'category', 'Hair Care'))}>Hair & Body</Link></li>
              <li><Link to="/shop?type=sale" className={`text-sm font-bold transition-all duration-200 flex items-center gap-1 ${isActive('/shop', 'type', 'sale') ? 'text-red-600 border-b-2 border-red-600 pb-1' : 'text-red-500 hover:text-red-700 hover:pb-1'}`}>
                <Sparkles className="w-3 h-3" /> Flash Sale
              </Link></li>
            </ul>
          </div>
        </nav>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-xl py-4 px-4 flex flex-col gap-4 z-40 animate-fade-in-up">
            <Link to="/skin-analysis" className="flex items-center gap-2 bg-primary-50 text-primary-700 p-3 rounded-xl font-bold" onClick={() => setIsMenuOpen(false)}>
              <ScanFace className="w-5 h-5" /> AI Skin Analyzer
            </Link>
            <div className="grid grid-cols-2 gap-4">
              <Link to="/shop" className="text-gray-700 font-medium p-2 hover:bg-gray-50 rounded-lg" onClick={() => setIsMenuOpen(false)}>Shop All</Link>
              <Link to="/shop?category=Skincare" className="text-gray-700 font-medium p-2 hover:bg-gray-50 rounded-lg" onClick={() => setIsMenuOpen(false)}>Skincare</Link>
              <Link to="/shop?category=Makeup" className="text-gray-700 font-medium p-2 hover:bg-gray-50 rounded-lg" onClick={() => setIsMenuOpen(false)}>Makeup</Link>
              <Link to="/shop?type=sale" className="text-red-600 font-bold p-2 hover:bg-red-50 rounded-lg" onClick={() => setIsMenuOpen(false)}>Flash Sale</Link>
            </div>
            <div className="h-px bg-gray-100 my-1"></div>
            {isAdmin ? (
              <Link to="/admin" className="text-center w-full bg-gray-900 text-white py-3 rounded-xl font-bold" onClick={() => setIsMenuOpen(false)}>Admin Dashboard</Link>
            ) : (
              <Link to="/login" className="text-center w-full border border-gray-200 text-gray-700 py-3 rounded-xl font-bold" onClick={() => setIsMenuOpen(false)}>Login / Register</Link>
            )}
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
