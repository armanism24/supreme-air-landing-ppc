import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { CheckCircle } from 'lucide-react';

const Services = ({ services }) => {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Professional Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expert air duct cleaning and attic insulation services to improve your home's air quality and energy efficiency
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service) => (
            <Card key={service.id} className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-white">
              <div className="relative overflow-hidden rounded-t-lg bg-gray-100">
                <img 
                  src={service.image}
                  alt={service.title}
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <Badge className="absolute top-4 left-4 bg-[#009ed7] text-white">
                  Premium Service
                </Badge>
              </div>
              
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl text-gray-900 mb-2">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-gray-600 text-base leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-[#8FC73D] flex-shrink-0" />
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <button 
                  className="w-full mt-6 bg-[#009ed7] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#0080b3] transition-colors shadow-lg hover:shadow-xl"
                  onClick={() => document.getElementById('hero-form').scrollIntoView({ behavior: 'smooth' })}
                >
                  Book Appointment
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;