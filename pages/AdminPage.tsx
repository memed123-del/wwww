
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Note: Server-side GenAI SDK should not be imported in client bundle.
// We'll call a serverless endpoint `/api/generate-image` instead.
import { 
  LayoutDashboard, 
  Package, 
  LogOut, 
  Upload, 
  Plus, 
  DollarSign, 
  Tag, 
  Image as ImageIcon,
  Type,
  Trash2,
  ShoppingBag,
  ArrowLeft,
  Sparkles,
  Loader2
} from 'lucide-react';
import { CATEGORIES } from '../constants';
import { useProducts } from '../services/productService';
import ProductCard from '../components/ProductCard';

const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  const { products, addProduct, deleteProduct } = useProducts();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products'>('products');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Image Generation State
  const [imageUploadMode, setImageUploadMode] = useState<'upload' | 'generate'>('upload');
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    price: '',
    originalPrice: '',
    category: CATEGORIES[0],
    description: '',
    image: ''
  });

  // Auth Check
  useEffect(() => {
    const isAdmin = localStorage.getItem('glow_admin_auth') === 'true';
    if (!isAdmin) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('glow_admin_auth');
    navigate('/login');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateImage = async () => {
    if (!aiPrompt.trim()) return;
    setIsGeneratingImage(true);

    try {
      const res = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: aiPrompt })
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ message: 'Unknown error' }));
        alert(`Image generation failed: ${err.message || res.statusText}`);
        return;
      }

      const data = await res.json();
      // Expecting { imageUrl: 'data:image/jpeg;base64,...' }
      if (data?.imageUrl) {
        setFormData({ ...formData, image: data.imageUrl });
      } else {
        alert('No image returned from generator');
      }
    } catch (error) {
      console.error('Image generation failed:', error);
      alert('Error generating image. Please try again later.');
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.image) return;
    
    setIsSubmitting(true);

    // Simulate network delay for effect
    setTimeout(() => {
      addProduct({
        name: formData.name,
        brand: formData.brand || 'Generic',
        price: Number(formData.price),
        originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
        category: formData.category,
        description: formData.description || 'No description provided.',
        image: formData.image,
        isSale: !!formData.originalPrice
      });

      // Reset form
      setFormData({
        name: '',
        brand: '',
        price: '',
        originalPrice: '',
        category: CATEGORIES[0],
        description: '',
        image: ''
      });
      setAiPrompt('');
      if (fileInputRef.current) fileInputRef.current.value = '';
      setIsSubmitting(false);
    }, 600);
  };

  // Create preview product object
  const previewProduct = {
    id: 0,
    name: formData.name || "Product Name",
    brand: formData.brand || "BRAND",
    price: Number(formData.price) || 0,
    originalPrice: Number(formData.originalPrice) || undefined,
    rating: 5.0,
    reviews: 0,
    image: formData.image || "https://via.placeholder.com/400x400?text=Product+Image",
    description: formData.description,
    category: formData.category,
    isSale: !!formData.originalPrice,
    isNew: true
  };

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex-shrink-0 hidden md:flex flex-col sticky top-0 h-screen">
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-2xl font-serif font-bold text-primary-400 flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <span className="bg-white text-gray-900 w-8 h-8 flex items-center justify-center rounded-lg text-sm">GB</span>
            Admin
          </h2>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'dashboard' ? 'bg-primary-600 text-white shadow-lg shadow-primary-900/50' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
          >
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'products' ? 'bg-primary-600 text-white shadow-lg shadow-primary-900/50' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
          >
            <Package className="w-5 h-5" /> Products
          </button>
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-gray-800 rounded-xl transition-colors"
          >
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 w-full bg-gray-900 text-white z-50 flex items-center justify-between p-4">
        <span className="font-bold">Admin Dashboard</span>
        <button onClick={handleLogout}><LogOut className="w-5 h-5" /></button>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pt-16 md:pt-0">
        <header className="bg-white shadow-sm border-b border-gray-200 p-4 md:p-6 flex justify-between items-center sticky top-0 z-10">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 capitalize">{activeTab} Overview</h1>
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/')} className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary-600">
                <ArrowLeft className="w-4 h-4" /> Back to Shop
            </button>
            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold border-2 border-white shadow-sm">
              AD
            </div>
          </div>
        </header>

        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-500 text-sm font-medium">Total Products</h3>
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <Package className="w-5 h-5" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-gray-900">{products.length}</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-500 text-sm font-medium">Total Revenue</h3>
                  <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                    <DollarSign className="w-5 h-5" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-gray-900">Rp 12.5M</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-500 text-sm font-medium">Orders</h3>
                  <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-gray-900">142</p>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Add Product Form */}
              <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                  <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <Plus className="w-5 h-5 text-primary-600" /> Add New Product
                  </h2>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Product Name</label>
                      <div className="relative">
                        <Type className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <input 
                          type="text" 
                          required
                          className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-100 focus:border-primary-400 outline-none transition-all"
                          placeholder="e.g. Hydrating Toner"
                          value={formData.name}
                          onChange={e => setFormData({...formData, name: e.target.value})}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Brand</label>
                      <div className="relative">
                        <Tag className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <input 
                          type="text" 
                          required
                          className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-100 focus:border-primary-400 outline-none transition-all"
                          placeholder="e.g. COSRX"
                          value={formData.brand}
                          onChange={e => setFormData({...formData, brand: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Price (Rp)</label>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-sm text-gray-400 font-bold">Rp</span>
                        <input 
                          type="number" 
                          required
                          className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-100 focus:border-primary-400 outline-none transition-all"
                          placeholder="0"
                          value={formData.price}
                          onChange={e => setFormData({...formData, price: e.target.value})}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Original Price (Opt)</label>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-sm text-gray-400 font-bold">Rp</span>
                        <input 
                          type="number" 
                          className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-100 focus:border-primary-400 outline-none transition-all"
                          placeholder="0"
                          value={formData.originalPrice}
                          onChange={e => setFormData({...formData, originalPrice: e.target.value})}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                      <select 
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-100 focus:border-primary-400 outline-none transition-all appearance-none cursor-pointer"
                        value={formData.category}
                        onChange={e => setFormData({...formData, category: e.target.value})}
                      >
                        {CATEGORIES.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Image Upload / Generate Section */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <label className="block text-sm font-bold text-gray-700">Product Image</label>
                      <div className="flex bg-gray-100 p-1 rounded-lg">
                        <button 
                          type="button"
                          onClick={() => setImageUploadMode('upload')}
                          className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${imageUploadMode === 'upload' ? 'bg-white text-primary-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                          Upload File
                        </button>
                        <button 
                          type="button"
                          onClick={() => setImageUploadMode('generate')}
                          className={`px-3 py-1 text-xs font-bold rounded-md transition-all flex items-center gap-1 ${imageUploadMode === 'generate' ? 'bg-white text-primary-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                          <Sparkles className="w-3 h-3" /> Generate with AI
                        </button>
                      </div>
                    </div>

                    {imageUploadMode === 'upload' ? (
                      <div 
                        className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-primary-400 hover:bg-primary-50 transition-all cursor-pointer bg-gray-50 group"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        {formData.image ? (
                          <div className="relative h-48 w-full">
                            <img src={formData.image} alt="Preview" className="h-full w-full object-contain mx-auto rounded-lg shadow-sm" />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg backdrop-blur-sm">
                              <span className="bg-white px-4 py-2 rounded-full text-sm font-bold shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">Change Image</span>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-3 text-gray-500">
                            <div className="w-12 h-12 bg-white shadow-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                              <ImageIcon className="w-6 h-6 text-primary-400" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">Click to upload image</p>
                              <p className="text-xs">SVG, PNG, JPG or GIF (max. 800x800px)</p>
                            </div>
                          </div>
                        )}
                        <input 
                          type="file" 
                          ref={fileInputRef} 
                          className="hidden" 
                          accept="image/*"
                          onChange={handleImageUpload}
                        />
                      </div>
                    ) : (
                      <div className="bg-gradient-to-br from-primary-50 to-white border border-primary-100 rounded-2xl p-6">
                        <div className="mb-4">
                          <label className="block text-xs font-bold text-primary-800 mb-2 flex items-center gap-1">
                            <Sparkles className="w-3 h-3" /> Describe the product image
                          </label>
                          <textarea 
                            className="w-full px-4 py-3 bg-white border border-primary-200 rounded-xl focus:ring-2 focus:ring-primary-100 focus:border-primary-400 outline-none transition-all h-24 resize-none text-sm"
                            placeholder="e.g. A luxurious pink serum bottle with rose petals on a marble table, studio lighting..."
                            value={aiPrompt}
                            onChange={(e) => setAiPrompt(e.target.value)}
                          />
                        </div>
                        <button 
                          type="button"
                          onClick={handleGenerateImage}
                          disabled={isGeneratingImage || !aiPrompt.trim()}
                          className="w-full bg-primary-600 text-white py-3 rounded-xl font-bold hover:bg-primary-700 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          {isGeneratingImage ? (
                            <><Loader2 className="w-4 h-4 animate-spin" /> Generating...</>
                          ) : (
                            <><Sparkles className="w-4 h-4" /> Generate Image</>
                          )}
                        </button>
                        {formData.image && imageUploadMode === 'generate' && (
                           <div className="mt-4 p-2 bg-white rounded-xl border border-gray-100 shadow-sm">
                              <p className="text-xs font-bold text-gray-500 mb-2 px-1">Generated Result:</p>
                              <img src={formData.image} alt="Generated" className="w-full h-48 object-contain rounded-lg bg-gray-50" />
                           </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                    <textarea 
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-100 focus:border-primary-400 outline-none transition-all h-32 resize-none"
                      placeholder="Product description..."
                      value={formData.description}
                      onChange={e => setFormData({...formData, description: e.target.value})}
                    />
                  </div>

                  <div className="flex justify-end pt-4">
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-gray-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-600 transition-all shadow-lg flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Saving...' : <><Upload className="w-4 h-4" /> Save Product</>}
                    </button>
                  </div>
                </form>
              </div>

              {/* Product List / Preview */}
              <div className="space-y-6">
                {/* Live Preview Card */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                   <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                     <Package className="w-4 h-4 text-primary-500" /> Live Preview
                   </h3>
                   <div className="pointer-events-none opacity-90 transform scale-95 origin-top">
                      <ProductCard product={previewProduct} />
                   </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-4">Recent Products</h3>
                  <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    {products.map(product => (
                      <div key={product.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl group hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-gray-100">
                        {product.image ? (
                          <img src={product.image} alt={product.name} onError={(e: any) => { e.currentTarget.src = 'https://via.placeholder.com/48?text=No'; }} className="w-12 h-12 rounded-lg object-cover bg-white border border-gray-100" />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 border border-gray-100">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7a2 2 0 012-2h3l2 2h6a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 13l2-2 2 2 3-3 3 3" />
                            </svg>
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-gray-900 truncate">{product.name}</p>
                          <p className="text-xs text-gray-500">{product.brand} • Rp {product.price.toLocaleString()}</p>
                        </div>
                        <button 
                          onClick={() => deleteProduct(product.id)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
