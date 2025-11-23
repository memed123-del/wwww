
import React from 'react';
import { MessageCircle, X, Send, Sparkles, Heart, User as UserIcon, Loader2 } from 'lucide-react';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [messages, setMessages] = React.useState([
    { role: 'model', text: "Hello beautiful! ✨ I'm your GlowBeauty AI Assistant. Looking for a skincare routine or makeup tips today?" }
  ]);
  const [inputText, setInputText] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const messagesEndRef = React.useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const userMessage = inputText;
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInputText('');
    setIsLoading(true);

    try {
      // The actual AI call is handled server-side. For now we simulate a response.
      await new Promise(r => setTimeout(r, 700));
      const reply = `Thanks for asking — try our Hydrating Serum for that glow ✨`;
      setMessages(prev => [...prev, { role: 'model', text: reply }]);
    } catch (error) {
      console.error('Chat Error:', error);
      setMessages(prev => [...prev, { role: 'model', text: "Oops! My beauty connection is a bit weak right now. Please try again in a moment! 🌸" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 ${isOpen ? 'bg-gray-900 rotate-90' : 'bg-primary-500 hover:bg-primary-600 animate-bounce-slow'}`}
      >
        {isOpen ? <X className="w-6 h-6 text-white" /> : <MessageCircle className="w-7 h-7 text-white" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 md:right-6 z-50 w-[350px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-fade-in-up flex flex-col h-[500px]">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-4 flex items-center gap-3 text-white shadow-md">
            <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm">Glow Assistant</h3>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-xs text-primary-100">Online & Ready</span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${msg.role === 'user' ? 'bg-gray-200' : 'bg-primary-100'}`}>
                  {msg.role === 'user' ? <UserIcon className="w-4 h-4 text-gray-600" /> : <Heart className="w-4 h-4 text-primary-600 fill-current" />}
                </div>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-gray-800 text-white rounded-tr-none' 
                    : 'bg-white text-gray-700 border border-gray-100 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-4 h-4 text-primary-600 fill-current" />
                </div>
                <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm flex items-center gap-2">
                  <Loader2 className="w-4 h-4 text-primary-400 animate-spin" />
                  <span className="text-xs text-gray-400">Typing...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-100">
            <form onSubmit={handleSendMessage} className="relative">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask about skincare..."
                className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-primary-300 focus:ring-2 focus:ring-primary-100 transition-all"
              />
              <button 
                type="submit"
                disabled={!inputText.trim() || isLoading}
                className="absolute right-2 top-2 p-1.5 bg-primary-500 text-white rounded-full hover:bg-primary-600 disabled:opacity-50 disabled:hover:bg-primary-500 transition-colors shadow-sm"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <div className="text-center mt-2">
              <span className="text-[10px] text-gray-400 flex items-center justify-center gap-1">
                 <Sparkles className="w-2 h-2 text-primary-400" />
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChat;
