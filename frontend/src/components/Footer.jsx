import React from 'react';
import { Phone, Mail, MapPin, Star } from 'lucide-react';
import { useReviews } from '../contexts/ReviewContext';

const Footer = ({ company }) => {
  const { totalReviews } = useReviews();
  
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <img 
              src={company.logo}
              alt={company.name}
              className="h-16 w-auto mb-6"
            />
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Austin's premier air duct cleaning and attic insulation specialists. 
              Family-owned business committed to improving your indoor air quality and energy efficiency.
            </p>
            
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="/footer-ribbon-consumer-choice-01-249x300.webp" 
                alt="Consumer Choice Award Winner"
                className="w-12 h-14 object-contain"
              />
              <div>
                <div className="font-semibold text-[#8FC73D]">CCA Award Winner</div>
                <div className="text-gray-400 text-sm">Best Air Duct Cleaning in Austin</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-gray-300">{totalReviews}+ Google Reviews</span>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-[#009ed7] mt-1 flex-shrink-0" />
                <div>
                  <div className="font-semibold">Call Now</div>
                  <a href={`tel:${company.phone}`} className="text-gray-300 hover:text-[#8FC73D] transition-colors">
                    {company.phone}
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-[#009ed7] mt-1 flex-shrink-0" />
                <div>
                  <div className="font-semibold">Email</div>
                  <a href={`mailto:${company.email}`} className="text-gray-300 hover:text-[#8FC73D] transition-colors">
                    {company.email}
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#009ed7] mt-1 flex-shrink-0" />
                <div>
                  <div className="font-semibold">Service Area</div>
                  <div className="text-gray-300">{company.address}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Services & Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">Our Services</h3>
            <div className="space-y-3">
              <div className="text-gray-300 hover:text-[#8FC73D] transition-colors cursor-pointer">
                Air Duct Cleaning
              </div>
              <div className="text-gray-300 hover:text-[#8FC73D] transition-colors cursor-pointer">
                Attic Insulation
              </div>
              <div className="text-gray-300 hover:text-[#8FC73D] transition-colors cursor-pointer">
                HVAC System Cleaning
              </div>
              <div className="text-gray-300 hover:text-[#8FC73D] transition-colors cursor-pointer">
                Indoor Air Quality
              </div>
            </div>
            
            <h4 className="text-lg font-semibold mt-6 mb-3">Business Hours</h4>
            <div className="text-gray-300 space-y-1">
              <div>Monday - Friday: 8AM - 6PM</div>
              <div>Saturday - Sunday: 9AM - 5PM</div>
              <div className="text-[#8FC73D] font-semibold">Emergency Service Available</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 Supreme Air Austin. All rights reserved. | Licensed & Insured
            </div>
            <div className="flex items-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-[#8FC73D] text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-[#8FC73D] text-sm transition-colors">
                Terms of Service
              </a>
              <a 
                href={`https://${company.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#009ed7] hover:text-[#8FC73D] text-sm font-semibold transition-colors"
              >
                {company.website}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;