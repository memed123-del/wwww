
import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ArrowLeft, Lock, CreditCard, Plus, Minus } from 'lucide-react';
import { useCart } from '../services/cartService';

const CartPage: React.FC = () => {
  const { items, cartTotal, removeFromCart, updateQuantity, clearCart } = useCart();
  
  const tax = cartTotal * 0.11; // 11% tax
  const shipping = cartTotal > 500000 ? 0 : 20000;
  const total = cartTotal + tax + shipping;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-md mx-auto">
          <img src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png" alt="Empty Cart" className="w-32 h-32 mx-auto mb-6 opacity-50" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-500 mb-8">Looks like you haven't added any beauty goodies yet.</p>
          <Link to="/shop" className="inline-block bg-primary-600 text-white px-8 py-3 rounded-full font-bold hover:bg-primary-700 transition-colors">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-8 text-center">Your Shopping Bag</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="flex-grow">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-100 text-sm font-semibold text-gray-600">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Total</div>
            </div>

            <div className="divide-y divide-gray-100">
              {items.map(item => (
                <div key={item.id} className="p-4 md:p-6 grid grid-cols-12 gap-4 items-center">
                  {/* Product Info */}
                  <div className="col-span-12 md:col-span-6 flex gap-4">
                    <div className="w-20 h-20 flex-shrink-0 bg-gray-50 rounded-md overflow-hidden border border-gray-200">
                      {item.image ? (
                        <img src={item.image} alt={item.name} onError={(e: any) => { e.currentTarget.src = 'https://via.placeholder.com/160?text=No+Img'; }} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7a2 2 0 012-2h3l2 2h6a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 13l2-2 2 2 3-3 3 3" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-xs text-primary-600 font-bold mb-1">{item.brand}</p>
                      <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">{item.name}</h3>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-xs text-red-500 flex items-center gap-1 hover:underline"
                      >
                        <Trash2 className="w-3 h-3" /> Remove
                      </button>
                    </div>
                  </div>

                  {/* Price (Hidden on mobile) */}
                  <div className="hidden md:block col-span-2 text-center text-sm">
                    Rp {item.price.toLocaleString('id-ID')}
                  </div>

                  {/* Quantity Controls */}
                  <div className="col-span-6 md:col-span-2 flex items-center justify-start md:justify-center">
                    <div className="flex items-center border border-gray-200 rounded-full">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-l-full"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-r-full"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Subtotal */}
                  <div className="col-span-6 md:col-span-2 text-right font-bold text-gray-900">
                    Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex justify-between items-center">
            <Link to="/shop" className="text-gray-600 hover:text-primary-600 flex items-center gap-2 font-medium text-sm">
              <ArrowLeft className="w-4 h-4" /> Continue Shopping
            </Link>
            <button onClick={clearCart} className="text-red-500 text-sm hover:underline">
              Clear Cart
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-96 flex-shrink-0">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
            <h3 className="text-lg font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">Order Summary</h3>
            
            <div className="space-y-3 text-sm mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>Rp {cartTotal.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax (11%)</span>
                <span>Rp {tax.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>{shipping === 0 ? <span className="text-green-600 font-medium">FREE</span> : `Rp ${shipping.toLocaleString('id-ID')}`}</span>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4 mb-6">
              <div className="flex justify-between items-end">
                <span className="text-base font-bold text-gray-900">Total</span>
                <span className="text-xl font-bold text-primary-600">Rp {total.toLocaleString('id-ID')}</span>
              </div>
              <p className="text-xs text-gray-400 mt-2 text-right">Including VAT</p>
            </div>

            <button className="w-full bg-gray-900 text-white py-3.5 rounded-full font-bold hover:bg-primary-600 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform active:scale-95">
              <Lock className="w-4 h-4" /> CHECKOUT NOW
            </button>

            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">
              <CreditCard className="w-4 h-4" />
              <span>Secure Checkout 256-bit SSL</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
