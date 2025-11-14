import React, { useState, useRef } from 'react';
import { Phone, Star, Award, Users, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { sendContactEmail } from '../services/emailService';
import { useReviews } from '../contexts/ReviewContext';
import Recaptcha from './Recaptcha';

const Hero = ({ hero }) => {
  const { totalReviews } = useReviews();
  const recaptchaRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [recaptchaToken, setRecaptchaToken] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Check if reCAPTCHA is completed
    if (!recaptchaToken) {
      setSubmitStatus({ 
        success: false, 
        message: 'Please complete the reCAPTCHA verification.' 
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await sendContactEmail(formData, recaptchaToken);
      setSubmitStatus(result);
      
      if (result.success) {
        setFormData({ name: '', phone: '', email: '', message: '' });
        setRecaptchaToken(null);
        if (recaptchaRef.current) {
          recaptchaRef.current.reset();
        }
      }
    } catch (error) {
      setSubmitStatus({ 
        success: false, 
        message: 'Something went wrong. Please call us directly at (512) 277-9782' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRecaptchaVerify = (token) => {
    setRecaptchaToken(token);
    console.log('✅ reCAPTCHA verified in Hero form');
  };

  const handleRecaptchaExpire = () => {
    setRecaptchaToken(null);
    console.log('⏰ reCAPTCHA expired in Hero form');
  };

  const handleRecaptchaError = (error) => {
    setRecaptchaToken(null);
    console.error('❌ reCAPTCHA error in Hero form:', error);
  };

  return (
    <section className="relative min-h-screen flex items-center">
      {/* Background with overlay */}
      <div className="absolute inset-0">
        <img 
          src={hero.backgroundImage}
          alt="Air Duct Cleaning Service"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="text-white">
            {/* Mobile: Award batch image on the left, text on the right (same line) */}
            <div className="flex items-center space-x-3 sm:hidden mb-4">
              <img 
                src={`${process.env.PUBLIC_URL}/award batch.png`} 
                alt="Consumer Choice Award Winner"
                className="w-16 h-20 object-contain flex-shrink-0"
              />
              <span className="text-[#8FC73D] font-semibold text-base leading-tight">{hero.subtitle}</span>
            </div>
            {/* Desktop: Original layout with icon and text */}
            <div className="hidden sm:flex items-center space-x-2 mb-4">
              <Award className="w-6 h-6 text-[#8FC73D]" />
              <span className="text-[#8FC73D] font-semibold text-lg">{hero.subtitle}</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
              {hero.title}
            </h1>
            
            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              {hero.description}
            </p>

            {/* Trust indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center space-x-3">
                <div className="bg-[#8FC73D]/20 p-3 rounded-lg">
                  <Star className="w-6 h-6 text-[#8FC73D]" />
                </div>
                <div>
                  <div className="font-bold text-lg">{totalReviews}+</div>
                  <div className="flex items-center space-x-1 text-gray-300 text-sm">
                    <span>5 </span>
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span>Real Reviews</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <img 
                  src={`${process.env.PUBLIC_URL}/award batch.png`} 
                  alt="Consumer Choice Award Winner"
                  className="w-20 h-24 object-contain"
                />
                <div>
                  <div className="font-bold text-lg">Consumer Choice Award Winner</div>
                  <div className="text-gray-300 text-sm">Best in Austin</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="bg-[#8FC73D]/20 p-3 rounded-lg">
                  <Users className="w-6 h-6 text-[#8FC73D]" />
                </div>
                <div>
                  <div className="font-bold text-lg">Family Owned</div>
                  <div className="text-gray-300 text-sm">Local Business</div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button 
                size="lg"
                className="bg-[#8FC73D] text-white px-8 py-4 text-lg font-semibold hover:bg-[#7AB62D] transition-all duration-300 shadow-lg hover:shadow-xl"
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
              >
                {hero.cta.primary}
              </Button>
              
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-white text-white px-8 py-4 text-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300"
                onClick={() => window.open('tel:+15122779782')}
              >
                <Phone className="w-5 h-5 mr-2" />
                {hero.cta.secondary}
              </Button>
            </div>
          </div>

          {/* Right form */}
          <div id="hero-form" className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Book an Appointment</h3>
            <p className="text-gray-600 mb-6">No obligation estimate for your air duct cleaning service</p>
            
            {submitStatus && (
              <div className={`mb-6 p-4 rounded-lg flex items-center space-x-3 ${
                submitStatus.success 
                  ? 'bg-green-50 text-green-800 border border-green-200' 
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}>
                {submitStatus.success ? (
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                )}
                <p className="text-sm font-medium">{submitStatus.message}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className="py-3 text-base"
              />
              
              <Input
                name="phone"
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className="py-3 text-base"
              />
              
              <Input
                name="email"
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className="py-3 text-base"
              />
              
              <Textarea
                name="message"
                placeholder="Tell us about your air duct cleaning needs..."
                value={formData.message}
                onChange={handleChange}
                rows={4}
                disabled={isSubmitting}
                className="text-base"
              />
              
              <Recaptcha
                ref={recaptchaRef}
                onVerify={handleRecaptchaVerify}
                onExpire={handleRecaptchaExpire}
                onError={handleRecaptchaError}
              />
              
              <Button 
                type="submit"
                disabled={isSubmitting || !recaptchaToken}
                className="w-full bg-[#009ed7] text-white py-3 text-lg font-semibold hover:bg-[#0080b3] transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Book Appointment'}
              </Button>
            </form>
            
            <p className="text-xs text-gray-500 mt-4 text-center">
              We respect your privacy. Your information is never shared.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;