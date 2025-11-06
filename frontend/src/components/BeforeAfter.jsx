import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const BeforeAfter = ({ beforeAfter }) => {
  const [showAfter, setShowAfter] = useState(false);

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">See the Difference</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our professional cleaning process delivers dramatic results. See the shocking difference our service makes to your air ducts.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative bg-white rounded-2xl p-8 shadow-2xl">
            <div className="flex justify-center mb-8">
              <div className="bg-gray-100 p-1 rounded-lg flex">
                <button
                  onClick={() => setShowAfter(false)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                    !showAfter 
                      ? 'bg-red-500 text-white shadow-lg' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Before Cleaning
                </button>
                <button
                  onClick={() => setShowAfter(true)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                    showAfter 
                      ? 'bg-[#8FC73D] text-white shadow-lg' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  After Cleaning
                </button>
              </div>
            </div>

            <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
              <img
                src={showAfter ? beforeAfter.after : beforeAfter.before}
                alt={showAfter ? "Clean air duct after professional cleaning" : "Dirty air duct before cleaning"}
                className="w-full h-full object-cover transition-opacity duration-500"
              />
              
              {/* Status overlay */}
              <div className="absolute top-4 left-4">
                <span className={`px-4 py-2 rounded-full text-white font-semibold ${
                  showAfter ? 'bg-[#8FC73D]' : 'bg-red-500'
                }`}>
                  {showAfter ? 'AFTER: Clean & Healthy' : 'BEFORE: Dirty & Contaminated'}
                </span>
              </div>
              
              {/* Navigation arrows */}
              <button
                onClick={() => setShowAfter(false)}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                aria-label="Show before image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <button
                onClick={() => setShowAfter(true)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                aria-label="Show after image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Description */}
            <div className="mt-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {showAfter 
                  ? "Professional Results You Can See" 
                  : "This Could Be Your Air Ducts Right Now"
                }
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
                {showAfter
                  ? "Our advanced cleaning equipment and certified technicians remove years of accumulated dust, debris, and contaminants, leaving your ducts spotless and your air cleaner."
                  : "Dirty air ducts harbor dust, allergens, mold, and bacteria that circulate throughout your home every time your HVAC system runs. Don't let your family breathe contaminated air."
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;