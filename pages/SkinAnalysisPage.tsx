
import React, { useState, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Upload, ScanFace, CheckCircle, AlertCircle, Sparkles, ChevronRight, RefreshCw, Camera } from 'lucide-react';
import { useProducts } from '../services/productService';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';

const SkinAnalysisPage: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { products } = useProducts();
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResult(null); // Reset previous results
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeSkin = async () => {
    if (!image) return;
    setIsAnalyzing(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const base64Data = image.split(',')[1];

      const prompt = `
        Analyze this face image for skincare purposes. 
        Identify: 1. Skin Type (Oily, Dry, Combination, Normal) 2. Key Concerns (Acne, Wrinkles, Dark Spots, Pores, etc.).
        Provide a JSON response WITHOUT markdown formatting like this:
        {
          "skinType": "Type",
          "concerns": ["Concern1", "Concern2"],
          "summary": "A brief, friendly analysis of the skin condition in 2 sentences.",
          "recommendedKeywords": ["keyword1", "keyword2"]
        }
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          {
            role: 'user',
            parts: [
              { text: prompt },
              { inlineData: { mimeType: 'image/jpeg', data: base64Data } }
            ]
          }
        ]
      });

      const text = response.text || "{}";
      // Clean up markdown if present
      const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
      const analysis = JSON.parse(jsonStr);
      
      setResult(analysis);

      // Find products based on keywords
      const recs = products.filter(p => {
        const searchStr = (p.name + p.description + p.category).toLowerCase();
        return analysis.recommendedKeywords.some((kw: string) => searchStr.includes(kw.toLowerCase()));
      }).slice(0, 4);
      
      // If no direct matches, show some best sellers
      setRecommendedProducts(recs.length > 0 ? recs : products.slice(0, 3));

    } catch (error) {
      console.error("Analysis failed", error);
      alert("Could not analyze image. Please try a clearer photo.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50/50 to-white pb-20">
      {/* Header */}
      <div className="bg-gray-900 text-white py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="container mx-auto text-center relative z-10">
          <span className="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur text-xs font-bold mb-4 border border-white/20 text-primary-200">
            POWERED BY GEMINI AI
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">AI Skin Analyzer</h1>
          <p className="text-gray-300 max-w-xl mx-auto text-lg">
            Upload a selfie and let our advanced AI analyze your skin condition to build your perfect personalized routine.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-10">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden max-w-4xl mx-auto">
          <div className="p-8 md:p-12">
            {!image ? (
              <div 
                className="border-4 border-dashed border-gray-200 rounded-3xl h-96 flex flex-col items-center justify-center bg-gray-50 hover:bg-primary-50/30 hover:border-primary-300 transition-all cursor-pointer group"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="w-24 h-24 bg-white rounded-full shadow-md flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Camera className="w-10 h-10 text-primary-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Upload Your Selfie</h3>
                <p className="text-gray-500 text-center max-w-xs mb-6">
                  Ensure good lighting and no makeup for the best results.
                </p>
                <button className="bg-gray-900 text-white px-8 py-3 rounded-full font-bold text-sm shadow-lg group-hover:bg-primary-600 transition-colors">
                  Select Photo
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleImageUpload}
                />
              </div>
            ) : (
              <div className="flex flex-col md:flex-row gap-10 items-start">
                {/* Image Preview */}
                <div className="w-full md:w-1/3 flex-shrink-0">
                  <div className="relative rounded-2xl overflow-hidden shadow-lg border-4 border-white aspect-[3/4]">
                    <img src={image} alt="Analysis" className="w-full h-full object-cover" />
                    {isAnalyzing && (
                      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center text-white">
                        <div className="w-16 h-16 border-4 border-primary-400 border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p className="font-bold tracking-widest animate-pulse">SCANNING...</p>
                      </div>
                    )}
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                       <button 
                        onClick={() => { setImage(null); setResult(null); }}
                        className="bg-white/90 backdrop-blur text-gray-900 px-4 py-2 rounded-full text-xs font-bold shadow-lg hover:bg-white flex items-center gap-2"
                       >
                         <RefreshCw className="w-3 h-3" /> Retake
                       </button>
                    </div>
                  </div>
                </div>

                {/* Results Area */}
                <div className="flex-grow w-full">
                  {!result && !isAnalyzing && (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-10">
                      <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                        <ScanFace className="w-8 h-8 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">Ready to Analyze</h3>
                        <p className="text-gray-500 mt-2">We will detect your skin type and concerns.</p>
                      </div>
                      <button 
                        onClick={analyzeSkin}
                        className="bg-gradient-to-r from-primary-600 to-primary-500 text-white px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-primary-200 hover:-translate-y-1 transition-all flex items-center gap-3"
                      >
                        <Sparkles className="w-5 h-5" /> Start Analysis
                      </button>
                    </div>
                  )}

                  {result && (
                    <div className="animate-fade-in-up">
                      <div className="mb-8">
                        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-1">Analysis Results</h2>
                        <div className="h-1 w-20 bg-primary-500 rounded-full"></div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                        <div className="bg-primary-50 p-6 rounded-2xl border border-primary-100">
                          <p className="text-xs text-primary-600 font-bold uppercase tracking-wider mb-2">Skin Type</p>
                          <p className="text-2xl font-bold text-gray-900">{result.skinType}</p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                          <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-2">Key Concerns</p>
                          <div className="flex flex-wrap gap-2">
                            {result.concerns.map((c: string, i: number) => (
                              <span key={i} className="bg-white px-3 py-1 rounded-lg text-sm font-medium text-gray-700 shadow-sm border border-gray-100">
                                {c}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mb-10 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-primary-500"></div>
                        <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-primary-500" /> AI Summary
                        </h3>
                        <p className="text-gray-600 leading-relaxed">{result.summary}</p>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Recommended Routine</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          {recommendedProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkinAnalysisPage;
