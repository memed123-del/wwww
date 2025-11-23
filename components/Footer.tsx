import React from 'react';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, CreditCard } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 pt-12 pb-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold text-primary-600 mb-4 font-serif">GlowBeauty</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              Your #1 destination for premium beauty products. We provide authentic, high-quality cosmetics and skincare to help you glow from within.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors"><Youtube className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors"><Twitter className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Information */}
          <div>
            <h4 className="text-gray-800 font-bold mb-4">Information</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-primary-500 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary-500 transition-colors">Delivery Information</a></li>
              <li><a href="#" className="hover:text-primary-500 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary-500 transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-primary-500 transition-colors">Customer Service</a></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-gray-800 font-bold mb-4">Customer Care</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-primary-500 transition-colors">My Account</a></li>
              <li><a href="#" className="hover:text-primary-500 transition-colors">Order History</a></li>
              <li><a href="#" className="hover:text-primary-500 transition-colors">Wish List</a></li>
              <li><a href="#" className="hover:text-primary-500 transition-colors">Newsletter</a></li>
              <li><a href="#" className="hover:text-primary-500 transition-colors">Returns</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-gray-800 font-bold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary-500 flex-shrink-0" />
                <span>123 Beauty Lane, Cosmetics City, Jakarta 12930</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary-500 flex-shrink-0" />
                <span>+62 21 555 0199</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary-500 flex-shrink-0" />
                <span>support@glowbeauty.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">© 2024 GlowBeauty. All Rights Reserved.</p>
          <div className="flex gap-3 items-center">
            <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-white border border-gray-100 shadow-sm">
              <CreditCard className="w-5 h-5 text-gray-600" />
              <span className="text-xs font-medium text-gray-600">Visa</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-white border border-gray-100 shadow-sm">
              <CreditCard className="w-5 h-5 text-gray-600" />
              <span className="text-xs font-medium text-gray-600">Mastercard</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-white border border-gray-100 shadow-sm">
              <CreditCard className="w-5 h-5 text-gray-600" />
              <span className="text-xs font-medium text-gray-600">BCA</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;