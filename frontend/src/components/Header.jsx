import React, { useState } from 'react';
import { Phone, Mail, Menu, X } from 'lucide-react';
import { useReviews } from '../contexts/ReviewContext';

const Header = ({ company }) => {
  const { totalReviews } = useReviews();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-[#009ed7] text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <a href={`tel:${company.phone}`} className="hover:text-[#8FC73D] transition-colors">
                  {company.phone}
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <a href={`mailto:${company.email}`} className="hover:text-[#8FC73D] transition-colors">
                  {company.email}
                </a>
              </div>
            </div>
            <div className="hidden sm:flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <img 
                  src="/award batch.png" 
                  alt="Consumer Choice Award Winner"
                  className="w-10 h-12 object-contain"
                />
                <span className="font-semibold">Consumer Choice Award Winner</span>
              </div>
              <div className="flex items-center space-x-1">
                <span>⭐</span>
                <span>{totalReviews}+ Five-Star Google Reviews</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src={company.logo} 
              alt={company.name}
              className="h-12 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('services')}
              className="text-gray-700 hover:text-[#009ed7] font-medium transition-colors"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-gray-700 hover:text-[#009ed7] font-medium transition-colors"
            >
              Why Choose Us
            </button>
            <button 
              onClick={() => scrollToSection('testimonials')}
              className="text-gray-700 hover:text-[#009ed7] font-medium transition-colors"
            >
              Reviews
            </button>
            <button 
              onClick={() => scrollToSection('faq')}
              className="text-gray-700 hover:text-[#009ed7] font-medium transition-colors"
            >
              FAQ
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-gray-700 hover:text-[#009ed7] font-medium transition-colors"
            >
              Contact
            </button>
            <a
              href={`tel:${company.phone}`}
              className="bg-[#8FC73D] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#7AB62D] transition-colors shadow-lg"
            >
              Call Now
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-[#009ed7] p-2"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            {/* Mobile Award Display */}
            <div className="flex items-center justify-center space-x-2 mb-4 p-3 bg-gray-50 rounded-lg">
              <img 
                src="/award batch.png" 
                alt="Consumer Choice Award Winner"
                className="w-10 h-12 object-contain"
              />
              <div className="text-center">
                <div className="font-semibold text-gray-900">Consumer Choice Award Winner</div>
                <div className="text-sm text-gray-600">Best in Austin</div>
              </div>
            </div>
            <div className="flex flex-col space-y-3">
              <button 
                onClick={() => scrollToSection('services')}
                className="text-gray-700 hover:text-[#009ed7] font-medium py-2 text-left"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-gray-700 hover:text-[#009ed7] font-medium py-2 text-left"
              >
                Why Choose Us
              </button>
              <button 
                onClick={() => scrollToSection('testimonials')}
                className="text-gray-700 hover:text-[#009ed7] font-medium py-2 text-left"
              >
                Reviews
              </button>
              <button 
                onClick={() => scrollToSection('faq')}
                className="text-gray-700 hover:text-[#009ed7] font-medium py-2 text-left"
              >
                FAQ
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-gray-700 hover:text-[#009ed7] font-medium py-2 text-left"
              >
                Contact
              </button>
              <a
                href={`tel:${company.phone}`}
                className="bg-[#8FC73D] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#7AB62D] transition-colors text-center"
              >
                Call Now
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;