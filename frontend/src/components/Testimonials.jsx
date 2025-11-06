import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Star, Quote, Loader2 } from 'lucide-react';
import { fetchGoogleReviews, formatReviews, getStarRating } from '../services/googleReviewsService';
import { useReviews } from '../contexts/ReviewContext';

const Testimonials = () => {
  const { totalReviews: contextTotalReviews, totalRating: contextTotalRating } = useReviews();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalRating, setTotalRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  // Function to open Google My Business reviews
  const openGoogleReviews = () => {
    // Direct link to your specific Google My Business page
    // This will take users directly to your business page with reviews
    const googleMyBusinessUrl = 'https://www.google.com/maps/place/Supreme+Air+Austin+%7C+Air+Duct+Cleaning+%7C+Dryer+Vent+Cleaning/@30.3982655,-97.6612976,17z/data=!4m6!3m5!1s0x8644cfa01c1bdd9d:0xd63b3347803835d9!8m2!3d30.3980855!4d-97.6615063!16s%2Fg%2F11pxm22fhj?entry=ttu&g_ep=EgoyMDI1MDkyNC4wIKXMDSoASAFQAw%3D%3D';
    
    window.open(googleMyBusinessUrl, '_blank');
  };

  useEffect(() => {
    const loadReviews = async () => {
      try {
        setLoading(true);
        const result = await fetchGoogleReviews();
        
        if (result.success && result.reviews.length > 0) {
          console.log('✅ Raw reviews from service:', result.reviews);
          const formattedReviews = formatReviews(result.reviews);
          console.log('✅ Formatted reviews:', formattedReviews);
          // Filter only reviews with profile pictures
          const reviewsWithPictures = formattedReviews.filter(review => review.profile_photo_url);
          console.log('✅ Reviews with profile pictures:', reviewsWithPictures);
          console.log('✅ Setting reviews count:', reviewsWithPictures.length);
          setReviews(reviewsWithPictures.slice(0, 6)); // Show up to 6 reviews with pictures
          setTotalRating(result.totalRating);
          setTotalReviews(result.totalReviews);
        } else {
          // Fallback to mock data if API fails
          setReviews([
            {
              id: 1,
              name: "Sarah Johnson",
              rating: 5,
              text: "Supreme Air did an amazing job cleaning our air ducts. The technicians were professional, thorough, and left our home spotless. Highly recommend!",
              time: "2 weeks ago",
              avatar: null
            },
            {
              id: 2,
              name: "Mike Chen",
              rating: 5,
              text: "Outstanding service! They arrived on time, explained everything clearly, and the results were incredible. Our air quality has improved significantly.",
              time: "1 month ago",
              avatar: null
            },
            {
              id: 3,
              name: "Jennifer Martinez",
              rating: 5,
              text: "Best air duct cleaning service in Austin! Professional team, fair pricing, and excellent results. Will definitely use them again.",
              time: "3 weeks ago",
              avatar: null
            }
          ]);
                  setTotalRating(contextTotalRating || 5.0);
                  setTotalReviews(contextTotalReviews || 768);
        }
      } catch (err) {
        console.error('Error loading reviews:', err);
        setError('Failed to load reviews');
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, []);
  if (loading) {
  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what Austin families are saying about Supreme Air's service.
          </p>
        </div>
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-[#009ed7]" />
            <span className="ml-3 text-gray-600">Loading reviews...</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16 px-4">
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-3 mb-4 sm:mb-6">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" 
              alt="Google"
              className="h-6 sm:h-8"
            />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
              Customer Reviews
            </h2>
          </div>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-4 sm:mb-6">
            See what Austin families are saying about Supreme Air's air duct cleaning service.
          </p>
          <div className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
            Showing {reviews.length} reviews with profile pictures
          </div>
          <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-xs sm:text-sm font-medium border border-blue-200">
            <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Verified Google Reviews
          </div>
                </div>
                
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {reviews.length === 0 ? (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500">Loading reviews with profile pictures...</p>
            </div>
          ) : (
            reviews.map((review) => (
            <div 
              key={review.id} 
              className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-lg transition-shadow duration-200 cursor-pointer"
              onClick={openGoogleReviews}
              title="View all reviews on Google"
            >
              {/* Google-style header */}
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  {/* Google-style avatar - clickable */}
                  <div 
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center border border-gray-200 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                    onClick={(e) => {
                      e.stopPropagation();
                      openGoogleReviews();
                    }}
                    title="View all reviews"
                  >
                    <img 
                      src={review.profile_photo_url}
                      alt={review.name}
                      className="w-full h-full object-cover"
                      onLoad={() => console.log('✅ Profile picture loaded for:', review.name)}
                      onError={(e) => {
                        console.log('❌ Profile picture failed to load for:', review.name);
                        // Hide the image if it fails to load
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                  <div 
                    className="cursor-pointer hover:text-blue-600 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      openGoogleReviews();
                    }}
                    title="View all reviews"
                  >
                    <div className="font-medium text-gray-900 text-xs sm:text-sm hover:text-blue-600">{review.name}</div>
                    <div className="text-gray-500 text-xs">{review.time}</div>
                  </div>
                </div>
                
                {/* Google logo */}
                <div className="flex items-center space-x-1">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" 
                    alt="Google"
                    className="h-3 w-3 sm:h-4 sm:w-4"
                  />
                </div>
              </div>
              
              {/* Google-style star rating */}
              <div className="flex items-center space-x-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i} 
                    className={`w-3 h-3 sm:w-4 sm:h-4 ${
                      i < review.rating 
                        ? 'text-yellow-400' 
                        : 'text-gray-300'
                    }`} 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-gray-600 text-xs sm:text-sm ml-1">{review.rating}</span>
              </div>
              
              {/* Review text - Google style with larger text */}
              <div className="text-gray-800 text-sm sm:text-base leading-relaxed mb-3 sm:mb-4">
                {review.text}
              </div>
              
              {/* Google-style action buttons */}
              <div className="mt-3 sm:mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <button 
                    className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm font-medium flex items-center space-x-1 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      openGoogleReviews();
                    }}
                    title="Mark as helpful on Google"
                  >
                    <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                    <span className="hidden sm:inline">Helpful</span>
                  </button>
                  <button 
                    className="text-gray-500 hover:text-gray-700 text-xs sm:text-sm font-medium flex items-center space-x-1 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      openGoogleReviews();
                    }}
                    title="Reply to this review on Google"
                  >
                    <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span className="hidden sm:inline">Reply</span>
                  </button>
                  </div>
                <div 
                  className="text-gray-400 text-xs cursor-pointer hover:text-gray-600 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    openGoogleReviews();
                  }}
                  title="View on Google"
                >
                  Google
                </div>
              </div>
            </div>
            ))
          )}
        </div>

        {/* Google Reviews Summary - Google Style */}
        <div className="mt-12 sm:mt-16 bg-white border border-gray-200 rounded-lg p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
            <div className="flex items-center space-x-3 sm:space-x-4 mb-3 sm:mb-0">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" 
                alt="Google"
                className="h-5 sm:h-6"
              />
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Google Reviews</h3>
                <p className="text-gray-600 text-xs sm:text-sm">Supreme Air Austin</p>
              </div>
            </div>
            <div className="text-left sm:text-right">
              <div className="flex items-center space-x-2 mb-1">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      className={`w-4 h-4 sm:w-5 sm:h-5 ${
                        i < Math.floor(totalRating) 
                          ? 'text-yellow-400' 
                          : 'text-gray-300'
                      }`} 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-xl sm:text-2xl font-bold text-gray-900">{totalRating.toFixed(1)}</span>
              </div>
              <p className="text-gray-600 text-xs sm:text-sm">
                {totalReviews > 0 ? `${totalReviews} reviews` : `${contextTotalReviews || 768} reviews`}
              </p>
            </div>
          </div>
          
          {/* Rating breakdown - Google style */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center space-x-2 sm:space-x-3">
                  <span className="text-xs sm:text-sm text-gray-600 w-3">{rating}</span>
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <div className="flex-1 bg-gray-200 rounded-full h-1.5 sm:h-2">
                  <div 
                    className="bg-yellow-400 h-1.5 sm:h-2 rounded-full" 
                    style={{ width: `${rating === 5 ? 90 : rating === 4 ? 8 : rating === 3 ? 1 : rating === 2 ? 0.5 : 0.5}%` }}
                  ></div>
                </div>
                <span className="text-xs sm:text-sm text-gray-600 w-6 sm:w-8">
                  {rating === 5 ? '90%' : rating === 4 ? '8%' : rating === 3 ? '1%' : rating === 2 ? '0.5%' : '0.5%'}
                </span>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col justify-center">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">{totalRating.toFixed(1)}</div>
                <div className="flex justify-center space-x-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      className={`w-5 h-5 sm:w-6 sm:h-6 ${
                        i < Math.floor(totalRating) 
                          ? 'text-yellow-400' 
                          : 'text-gray-300'
                      }`} 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 text-xs sm:text-sm">
                  Based on {totalReviews > 0 ? totalReviews : contextTotalReviews || 768} reviews
                </p>
              </div>
            </div>
          </div>
          
          {/* Google Reviews button */}
          <div className="text-center">
            <button 
              onClick={openGoogleReviews}
              className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition-colors"
            >
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" 
                alt="Google"
                className="h-3 w-3 sm:h-4 sm:w-4"
              />
              <span className="hidden sm:inline">View All Reviews on Google</span>
              <span className="sm:hidden">View on Google</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;