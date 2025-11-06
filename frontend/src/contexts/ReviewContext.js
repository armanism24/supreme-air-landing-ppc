import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchGoogleReviews } from '../services/googleReviewsService';

const ReviewContext = createContext();

export const useReviews = () => {
  const context = useContext(ReviewContext);
  if (!context) {
    throw new Error('useReviews must be used within a ReviewProvider');
  }
  return context;
};

export const ReviewProvider = ({ children }) => {
  // Default fallback values - will be updated from API
  const [totalReviews, setTotalReviews] = useState(773);
  const [totalRating, setTotalRating] = useState(5.0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadReviewData = async () => {
      try {
        setLoading(true);
        console.log('🔄 ReviewContext: Loading review data...');
        const result = await fetchGoogleReviews();
        
        console.log('📊 ReviewContext: API Result:', {
          success: result.success,
          totalReviews: result.totalReviews,
          totalRating: result.totalRating,
          source: result.source
        });
        
        // Always update with the fetched values (even if success is false, we still got review count)
        if (result.totalReviews) {
          setTotalReviews(result.totalReviews);
        }
        if (result.totalRating) {
          setTotalRating(result.totalRating);
        }
        
        if (result.success) {
          console.log('✅ ReviewContext: Updated with real data:', {
            totalReviews: result.totalReviews,
            totalRating: result.totalRating
          });
        } else {
          // Keep default values if API fails
          console.warn('⚠️ ReviewContext: Failed to fetch review data, using defaults');
          console.warn('Error:', result.error);
        }
      } catch (err) {
        console.error('❌ ReviewContext: Error loading review data:', err);
        setError(err.message);
        // Keep default values on error
      } finally {
        setLoading(false);
      }
    };

    loadReviewData();
  }, []);

  const value = {
    totalReviews,
    totalRating,
    loading,
    error
  };

  return (
    <ReviewContext.Provider value={value}>
      {children}
    </ReviewContext.Provider>
  );
};
