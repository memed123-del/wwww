
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Comment } from '../types';

interface CommentContextType {
  comments: Comment[];
  addComment: (productId: number, text: string, rating: number, userName: string) => void;
  getCommentsByProductId: (productId: number) => Comment[];
}

const CommentContext = createContext<CommentContextType | undefined>(undefined);

export const CommentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [comments, setComments] = useState<Comment[]>([]);

  // Load comments from local storage
  useEffect(() => {
    const savedComments = localStorage.getItem('glow_comments');
    if (savedComments) {
      try {
        setComments(JSON.parse(savedComments));
      } catch (e) {
        console.error("Failed to parse comments", e);
      }
    } else {
      // Add some dummy comments for demo purposes
      setComments([
        { id: 1, productId: 1, userName: "Sarah J.", text: "Absolutely love this product! It made my skin so soft.", rating: 5, date: new Date().toLocaleDateString() },
        { id: 2, productId: 1, userName: "Mike T.", text: "Good value for money, but shipping was a bit slow.", rating: 4, date: new Date().toLocaleDateString() },
        { id: 3, productId: 2, userName: "Emily R.", text: "Very gentle on the skin. Highly recommend.", rating: 5, date: new Date().toLocaleDateString() },
      ]);
    }
  }, []);

  // Save to local storage
  useEffect(() => {
    if (comments.length > 0) {
      localStorage.setItem('glow_comments', JSON.stringify(comments));
    }
  }, [comments]);

  const addComment = (productId: number, text: string, rating: number, userName: string) => {
    const newComment: Comment = {
      id: Date.now(),
      productId,
      userName,
      text,
      rating,
      date: new Date().toLocaleDateString()
    };
    setComments(prev => [newComment, ...prev]);
  };

  const getCommentsByProductId = (productId: number) => {
    return comments.filter(c => c.productId === productId);
  };

  return React.createElement(CommentContext.Provider, {
    value: { comments, addComment, getCommentsByProductId }
  }, children);
};

export const useComments = () => {
  const context = useContext(CommentContext);
  if (!context) throw new Error("useComments must be used within a CommentProvider");
  return context;
};
