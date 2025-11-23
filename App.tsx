import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import SkinAnalysisPage from './pages/SkinAnalysisPage';
import AIChat from './components/AIChat';
import { CartProvider } from './services/cartService';
import { ProductProvider } from './services/productService';
import { CommentProvider } from './services/commentService';

// Layout wrapper to conditionally render Header/Footer
const Layout: React.FC<{children?: React.ReactNode}> = ({ children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800 relative">
      {!isAdminRoute && <Header />}
      {children}
      {!isAdminRoute && <Footer />}
      <AIChat />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <ProductProvider>
        <CartProvider>
          <CommentProvider>
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/product/:id" element={<ProductDetailsPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/skin-analysis" element={<SkinAnalysisPage />} />
              </Routes>
            </Layout>
          </CommentProvider>
        </CartProvider>
      </ProductProvider>
    </Router>
  );
};

export default App;
