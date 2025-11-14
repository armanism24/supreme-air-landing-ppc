import React from 'react';
import { Award, Star } from 'lucide-react';

const AwardCertificate = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-[#009ed7] to-[#0080b3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left side - Certificate Image */}
            <div className="p-8 lg:p-12 bg-gradient-to-br from-gray-50 to-white">
              <div className="relative">
                <img 
                  src={`${process.env.PUBLIC_URL}/supreme air_page-0001.jpg`} 
                  alt="2026 Consumer Choice Award Certificate - Supreme Air Duct Cleaning"
                  className="w-full h-auto rounded-lg shadow-xl object-contain"
                />
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 bg-[#8FC73D] text-white rounded-full p-3 shadow-lg">
                  <Award className="w-8 h-8" />
                </div>
              </div>
            </div>

            {/* Right side - Award Details */}
            <div className="p-8 lg:p-12">
              <div className="flex items-center space-x-2 mb-4">
                <Award className="w-8 h-8 text-[#009ed7]" />
                <h2 className="text-4xl font-bold text-gray-900">
                  Award Winner 2026
                </h2>
              </div>
              
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-[#009ed7] mb-2">
                  Consumer Choice Award Recipient
                </h3>
                <p className="text-xl text-gray-700 font-semibold mb-4">
                  San Antonio Region
                </p>
                <p className="text-lg text-gray-600 mb-4">
                  Supreme Air Duct Cleaning has been selected by consumers and businesses in the San Antonio region as the <span className="font-bold text-[#009ed7]">2026 Consumer Choice Award recipient</span> in the category of:
                </p>
                <div className="bg-[#8FC73D] text-white px-6 py-4 rounded-lg mb-6">
                  <p className="text-xl font-bold uppercase tracking-wide">
                    Duct and Furnace Cleaning
                  </p>
                </div>
              </div>

              {/* Trust indicators */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="bg-[#8FC73D]/20 p-2 rounded-lg">
                    <Star className="w-5 h-5 text-[#8FC73D]" />
                  </div>
                  <span className="text-gray-700 font-medium">Recognized by local consumers and businesses</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-[#009ed7]/20 p-2 rounded-lg">
                    <Award className="w-5 h-5 text-[#009ed7]" />
                  </div>
                  <span className="text-gray-700 font-medium">2026 Consumer Choice Award for Excellence</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-[#8FC73D]/20 p-2 rounded-lg">
                    <Star className="w-5 h-5 text-[#8FC73D]" />
                  </div>
                  <span className="text-gray-700 font-medium">Best in San Antonio region</span>
                </div>
              </div>

              {/* CTA Button */}
              <div className="mt-8">
                <button
                  onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                  className="w-full bg-[#009ed7] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#0080b3] transition-colors shadow-lg hover:shadow-xl"
                >
                  Book Your Service with an Award Winner
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AwardCertificate;

