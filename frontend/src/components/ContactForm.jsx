import React, { useState, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Phone, Mail, MapPin, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { sendContactEmail } from '../services/emailService';
import Recaptcha from './Recaptcha';

const ContactForm = ({ company }) => {
  const recaptchaRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    service: 'air-duct-cleaning'
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
        setFormData({
          name: '',
          phone: '',
          email: '',
          message: '',
          service: 'air-duct-cleaning'
        });
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
    console.log('✅ reCAPTCHA verified in Contact form');
  };

  const handleRecaptchaExpire = () => {
    setRecaptchaToken(null);
    console.log('⏰ reCAPTCHA expired in Contact form');
  };

  const handleRecaptchaError = (error) => {
    setRecaptchaToken(null);
    console.error('❌ reCAPTCHA error in Contact form:', error);
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Book an Appointment
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to breathe cleaner air? Contact Austin's trusted air duct cleaning experts for your free, no-obligation quote.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="bg-gradient-to-br from-[#009ed7] to-[#0080b3] text-white border-0">
              <CardHeader>
                <CardTitle className="text-2xl">Get In Touch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-white/20 p-3 rounded-lg">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold">Call Now</div>
                    <a href={`tel:${company.phone}`} className="text-lg hover:text-[#8FC73D] transition-colors">
                      {company.phone}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-white/20 p-3 rounded-lg">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold">Email Us</div>
                    <a href={`mailto:${company.email}`} className="text-lg hover:text-[#8FC73D] transition-colors">
                      {company.email}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-white/20 p-3 rounded-lg">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold">Service Area</div>
                    <div className="text-lg">{company.address}</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-white/20 p-3 rounded-lg">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-semibold">Business Hours</div>
                    <div>Mon-Fri: 8AM-6PM</div>
                    <div>Sat-Sun: 9AM-5PM</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Why Contact Us */}
            <Card className="bg-[#8FC73D] text-white border-0">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Why Choose Our Estimate?</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    <span>No obligation consultation</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    <span>Transparent, upfront pricing</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    <span>Professional inspection included</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    <span>Same-day service available</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="shadow-2xl border-0">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900">Request Estimate</CardTitle>
              <p className="text-gray-600">Fill out the form below and we'll get back to you within 2 hours</p>
            </CardHeader>
            <CardContent>
              {submitStatus && submitStatus.success ? (
                <div className="text-center py-8">
                  <div className="bg-[#8FC73D] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h3>
                  <p className="text-gray-600">Your request has been submitted. We'll contact you within 2 hours.</p>
                  <Button 
                    onClick={() => setSubmitStatus(null)}
                    className="mt-4 bg-[#009ed7] text-white px-6 py-2 hover:bg-[#0080b3]"
                  >
                    Send Another Request
                  </Button>
                </div>
              ) : (
                <>
                  {submitStatus && !submitStatus.success && (
                    <div className="mb-6 p-4 rounded-lg flex items-center space-x-3 bg-red-50 text-red-800 border border-red-200">
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      <p className="text-sm font-medium">{submitStatus.message}</p>
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input
                        name="name"
                        placeholder="Your Name*"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        className="py-3"
                      />
                      
                      <Input
                        name="phone"
                        type="tel"
                        placeholder="Phone Number*"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        className="py-3"
                      />
                    </div>
                    
                    <Input
                      name="email"
                      type="email"
                      placeholder="Email Address*"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="py-3"
                    />
                    
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full py-3 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009ed7] disabled:opacity-50"
                    >
                      <option value="air-duct-cleaning">Air Duct Cleaning</option>
                      <option value="attic-insulation">Attic Insulation</option>
                      <option value="both">Both Services</option>
                      <option value="other">Other</option>
                    </select>
                    
                    <Textarea
                      name="message"
                      placeholder="Tell us about your needs, home size, any specific concerns..."
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      disabled={isSubmitting}
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
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;