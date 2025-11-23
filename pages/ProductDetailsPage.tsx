
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Heart, Minus, Plus, Truck, ShieldCheck, Share2, User, MessageSquare } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useCart } from '../services/cartService';
import { useProducts } from '../services/productService';
import { useComments } from '../services/commentService';

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('reviews');
  const { addToCart } = useCart();
  const { products, getProductById } = useProducts();
  const { addComment, getCommentsByProductId } = useComments();
  
  // Comment form state
  const [newCommentText, setNewCommentText] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [userName, setUserName] = useState('');

  // Find product or use default
  const product = getProductById(Number(id));
  
  // Get comments
  const comments = product ? getCommentsByProductId(product.id) : [];
  
  // Mock related products
  const relatedProducts = product 
    ? products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)
    : [];

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) return <div>Loading...</div>;

  const handleAddToCart = () => {
    // Add product quantity times
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCommentText.trim() && userName.trim()) {
      addComment(product.id, newCommentText, newRating, userName);
      setNewCommentText('');
      setUserName('');
      setNewRating(5);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-8">
        <Link to="/" className="hover:text-primary-600">Home</Link> 
        <span className="mx-2">/</span>
        <Link to="/shop" className="hover:text-primary-600">Shop</Link>
        <span className="mx-2">/</span>
        <Link to="/shop" className="hover:text-primary-600">{product.category}</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800 font-medium">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
        {/* Gallery */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
            {product.image ? (
              <img src={product.image} alt={product.name} onError={(e: any) => { e.currentTarget.src = 'https://via.placeholder.com/800x800?text=No+Image'; }} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-24 h-24 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7a2 2 0 012-2h3l2 2h6a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 13l2-2 2 2 3-3 3 3" />
                </svg>
              </div>
            )}
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className={`aspect-square rounded-lg overflow-hidden cursor-pointer border-2 ${i === 0 ? 'border-primary-500' : 'border-transparent hover:border-gray-200'}`}>
                {product.image ? (
                  <img src={product.image} alt={`Thumbnail ${i + 1}`} onError={(e: any) => { e.currentTarget.src = 'https://via.placeholder.com/200?text=No+Image'; }} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7a2 2 0 012-2h3l2 2h6a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 13l2-2 2 2 3-3 3 3" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <div className="mb-6">
            <Link to="/shop" className="text-primary-600 font-bold text-sm uppercase tracking-wider mb-2 block">{product.brand}</Link>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-3">{product.name}</h1>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'}`} />
                ))}
              </div>
              <span className="text-sm text-gray-500 border-l border-gray-300 pl-4">{comments.length > 0 ? comments.length : product.reviews} Reviews</span>
              <span className="text-sm text-green-600 bg-green-50 px-2 py-0.5 rounded-full font-medium">In Stock</span>
            </div>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold text-gray-900">Rp {product.price.toLocaleString('id-ID')}</span>
              {product.originalPrice && (
                <span className="text-lg text-gray-400 line-through">Rp {product.originalPrice.toLocaleString('id-ID')}</span>
              )}
              {product.isSale && (
                <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded">SAVE 25%</span>
              )}
            </div>
            <p className="text-gray-600 leading-relaxed mb-8">
              {product.description} Formulated with premium ingredients to ensure the best results for your skin. Dermatologically tested and suitable for all skin types.
            </p>
          </div>

          <div className="border-t border-b border-gray-100 py-6 mb-8 space-y-6">
            {/* Quantity & Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center border border-gray-300 rounded-full w-max">
                <button 
                  className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-primary-600 disabled:opacity-50"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center font-medium text-gray-900">{quantity}</span>
                <button 
                  className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-primary-600"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-primary-600 text-white py-3 rounded-full font-bold hover:bg-primary-700 transition-all shadow-md hover:shadow-lg active:transform active:scale-95 flex items-center justify-center gap-2"
              >
                ADD TO BAG - Rp {(product.price * quantity).toLocaleString('id-ID')}
              </button>
              <button className="w-12 h-12 flex items-center justify-center border border-gray-300 rounded-full text-gray-400 hover:text-red-500 hover:border-red-200 transition-colors flex-shrink-0">
                <Heart className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-8">
            <div className="flex items-center gap-3">
              <Truck className="w-5 h-5 text-primary-500" />
              <span>Free shipping over Rp 500k</span>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-primary-500" />
              <span>100% Authentic Guarantee</span>
            </div>
            <div className="flex items-center gap-3">
              <Share2 className="w-5 h-5 text-primary-500" />
              <span>Share with friends</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <div className="mb-16">
        <div className="border-b border-gray-200 flex justify-center gap-8 mb-8 overflow-x-auto">
          {['Description', 'Ingredients', 'Reviews'].map((tab) => (
            <button
              key={tab}
              className={`pb-4 px-2 text-sm font-bold tracking-wide uppercase transition-colors whitespace-nowrap ${
                activeTab === tab.toLowerCase().replace(/\s/g, '') 
                  ? 'text-primary-600 border-b-2 border-primary-600' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
              onClick={() => setActiveTab(tab.toLowerCase().replace(/\s/g, ''))}
            >
              {tab}
            </button>
          ))}
        </div>
        
        <div className="max-w-4xl mx-auto">
          {activeTab === 'description' && (
            <div className="text-gray-600 leading-relaxed bg-gray-50 p-8 rounded-2xl">
              <p>
                {product.description}
                <br/><br/>
                This innovative formula combines the power of nature and science to deliver visible results. 
                Infused with active botanical extracts and scientifically proven compounds, it targets specific skin concerns while maintaining the skin's natural balance.
                <br/><br/>
                The lightweight texture absorbs instantly without leaving any sticky residue, making it perfect for layering in your skincare routine.
                Regular use improves skin texture, boosts radiance, and provides long-lasting hydration.
              </p>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-10">
              {/* Add Comment Form */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-primary-600" /> Write a Review
                </h3>
                <form onSubmit={handleSubmitComment} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                    <input 
                      type="text" 
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="Jane Doe"
                      required
                      className="w-full px-4 py-2 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-primary-100 focus:border-primary-400 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewRating(star)}
                          className="focus:outline-none"
                        >
                          <Star 
                            className={`w-6 h-6 ${star <= newRating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Review</label>
                    <textarea 
                      value={newCommentText}
                      onChange={(e) => setNewCommentText(e.target.value)}
                      placeholder="Tell us what you think about this product..."
                      required
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-primary-100 focus:border-primary-400 outline-none transition-all h-24 resize-none"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="bg-gray-900 text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-primary-600 transition-colors"
                  >
                    Post Review
                  </button>
                </form>
              </div>

              {/* Comments List */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900">Customer Reviews ({comments.length})</h3>
                {comments.length > 0 ? (
                  comments.map((comment) => (
                    <div key={comment.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold">
                            {comment.userName.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 text-sm">{comment.userName}</h4>
                            <span className="text-xs text-gray-400">{comment.date}</span>
                          </div>
                        </div>
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < comment.rating ? 'fill-current' : 'text-gray-200'}`} />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {comment.text}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 text-gray-400 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                    <MessageSquare className="w-10 h-10 mx-auto mb-2 opacity-50" />
                    <p>No reviews yet. Be the first to review!</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center font-serif">You May Also Like</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {relatedProducts.map(item => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductDetailsPage;
