# GlowBeauty - Premium Cosmetics Store

## Overview
GlowBeauty is a modern e-commerce platform for premium Korean skincare and makeup products. The application features AI-powered skin analysis using Google's Gemini AI, product recommendations, shopping cart functionality, and an admin panel for product management.

**Current State**: Fully functional and running on Replit with AI-powered features.

## Recent Changes (November 23, 2025)
- Imported project from GitHub and configured for Replit environment
- Updated Vite configuration to use port 5000 with allowedHosts enabled for Replit proxy
- Configured GEMINI_API_KEY environment variable for AI features
- Set up workflow for development server
- Installed all dependencies and verified app functionality

## Project Architecture

### Tech Stack
- **Frontend Framework**: React 19.2 with TypeScript
- **Build Tool**: Vite 6.2
- **Routing**: React Router DOM v6
- **UI Icons**: Lucide React
- **AI Integration**: Google Gemini AI (@google/genai)
- **Styling**: Tailwind CSS (via CDN in index.html)

### Project Structure
```
/
├── api/              # API endpoints (Vercel functions)
├── components/       # React components (Header, Footer, ProductCard, AIChat)
├── pages/            # Page components (Home, Shop, ProductDetails, Cart, Login, Admin, SkinAnalysis)
├── services/         # Service modules (cart, product, comment)
├── image-product/    # Product images storage
├── public/           # Static assets
├── src/              # Global type definitions
├── App.tsx           # Main application component
├── constants.ts      # Product data and constants
├── types.ts          # TypeScript type definitions
└── vite.config.ts    # Vite configuration
```

### Key Features
1. **AI Skin Analysis**: Upload face images for AI-powered skin type analysis and product recommendations
2. **Product Catalog**: Browse cosmetics with filtering, search, and categories
3. **Shopping Cart**: Add/remove products with persistent cart state
4. **Admin Panel**: Manage products (add, edit, delete)
5. **AI Chat Assistant**: Interactive chatbot for product recommendations and queries
6. **Responsive Design**: Mobile-first, fully responsive UI

### Environment Configuration
- **GEMINI_API_KEY**: Required for AI skin analysis and chat features
- Development server runs on port 5000
- Vite configured with `allowedHosts: true` for Replit proxy compatibility

### Data Storage
- Products stored in `constants.ts` (in-memory)
- Cart state managed via React Context
- Comments managed via React Context

## Development

### Commands
- `npm install` - Install dependencies
- `npm run dev` - Start development server (port 5000)
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Workflow
The "Start application" workflow runs `npm run dev` and serves the app on port 5000 with webview output.

## User Preferences
- No specific preferences documented yet

## Notes
- The app uses Tailwind CSS via CDN (see index.html) - suitable for prototyping but should be installed as PostCSS plugin for production
- Product images are stored locally in the `image-product/` directory
- The app was originally designed for Vercel deployment (see vercel.json)
