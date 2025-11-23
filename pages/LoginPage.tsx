import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, AlertCircle, ShieldCheck } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Admin Login Check
    if (email === 'admin@glowbeauty.com' && password === 'glowadmin323') {
      localStorage.setItem('glow_admin_auth', 'true');
      // also set user auth for convenience
      localStorage.setItem('glow_user_auth', 'true');
      navigate('/admin');
      return;
    }

    // Regular User Login Simulation
    if (email && password) {
      // persist regular user session in localStorage so login survives refresh
      localStorage.setItem('glow_user_auth', 'true');
      localStorage.setItem('glow_user_email', email);
      navigate('/');
    } else {
      setError('Please enter valid credentials.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 bg-gradient-to-b from-primary-50/50 to-white">
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl shadow-primary-100/50 max-w-md w-full border border-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary-400 to-primary-600"></div>
        
        <div className="text-center mb-10">
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2 tracking-tight">GlowBeauty</h1>
          <p className="text-gray-500 text-sm font-medium">Your journey to radiance starts here</p>
        </div>

        <div className="flex p-1.5 bg-gray-100 rounded-xl mb-8 relative">
          <div 
            className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-white rounded-lg shadow-sm transition-all duration-300 ease-out ${isLogin ? 'left-1.5' : 'left-[calc(50%+4.5px)]'}`}
          ></div>
          <button 
            className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-colors relative z-10 ${isLogin ? 'text-primary-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button 
            className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-colors relative z-10 ${!isLogin ? 'text-primary-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-xl text-xs flex items-center gap-2 font-medium">
              <AlertCircle className="w-4 h-4" /> {error}
            </div>
          )}

          {!isLogin && (
            <div className="relative group">
              <User className="w-5 h-5 text-gray-400 absolute left-3.5 top-3.5 group-focus-within:text-primary-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Full Name" 
                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary-100 focus:border-primary-400 transition-all outline-none text-sm font-medium"
                required={!isLogin}
              />
            </div>
          )}
          
          <div className="relative group">
            <Mail className="w-5 h-5 text-gray-400 absolute left-3.5 top-3.5 group-focus-within:text-primary-500 transition-colors" />
            <input 
              type="email" 
              placeholder="Email Address" 
              className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary-100 focus:border-primary-400 transition-all outline-none text-sm font-medium"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative group">
            <Lock className="w-5 h-5 text-gray-400 absolute left-3.5 top-3.5 group-focus-within:text-primary-500 transition-colors" />
            <input 
              type="password" 
              placeholder="Password" 
              className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary-100 focus:border-primary-400 transition-all outline-none text-sm font-medium"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {isLogin && (
            <div className="flex justify-between items-center text-xs">
              <label className="flex items-center gap-2 text-gray-500 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-200" />
                Remember me
              </label>
              <a href="#" className="text-primary-600 font-bold hover:underline">Forgot Password?</a>
            </div>
          )}

          <button type="submit" className="w-full bg-gray-900 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-gray-200 hover:bg-primary-600 hover:shadow-primary-200 transition-all flex items-center justify-center gap-2 mt-2 group">
            {isLogin ? 'LOGIN' : 'CREATE ACCOUNT'} 
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-8 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-100"></div>
          </div>
          <div className="relative flex justify-center text-xs font-bold uppercase tracking-wider">
            <span className="bg-white px-3 text-gray-400">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <button className="flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all text-sm font-bold text-gray-600">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
            Google
          </button>
          <button className="flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all text-sm font-bold text-gray-600">
            <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" className="w-5 h-5" alt="Facebook" />
            Facebook
          </button>
        </div>

        <div className="mt-8 text-center">
           <p className="text-xs text-gray-400">By signing in, you agree to our <a href="#" className="text-primary-600 hover:underline"> Term of Use </a> <span className="text-gray-600 font-mono bg-gray-100 px-1 rounded"></span> and <a href="#" className="text-primary-600 hover:underline">Privacy Policy</a> <span className="text-gray-600 font-mono bg-gray-100 px-1 rounded"></span></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;