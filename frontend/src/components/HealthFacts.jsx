import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { AlertTriangle, TrendingUp, Shield } from 'lucide-react';
import { mockData } from '../mock';

const HealthFacts = ({ healthFacts }) => {
  return (
    <section className="py-20 bg-gradient-to-br from-red-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="bg-red-100 text-red-700 px-4 py-2 text-sm font-semibold mb-4">
            Health Warning
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {healthFacts.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {healthFacts.subtitle}
          </p>
        </div>

        {/* Government Statistics */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {healthFacts.facts.map((fact, index) => (
            <Card key={index} className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="text-3xl font-bold text-[#009ed7] mb-2">
                  {fact.stat}
                </div>
                <p className="text-gray-700 font-medium mb-3 leading-relaxed">
                  {fact.description}
                </p>
                <Badge variant="outline" className="text-xs">
                  Source: {fact.source}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Health Consequences */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <AlertTriangle className="w-8 h-8 text-red-500 mr-3" />
                <h3 className="text-3xl font-bold text-gray-900">
                  Health Risks of Dirty Air Ducts
                </h3>
              </div>
              
              <p className="text-gray-600 mb-8 text-lg">
                When air ducts aren't properly cleaned, they become breeding grounds for harmful contaminants that directly impact your family's health:
              </p>
              
              <div className="space-y-4">
                {healthFacts.consequences.map((consequence, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="bg-red-100 p-1 rounded-full mt-1">
                      <AlertTriangle className="w-4 h-4 text-red-500" />
                    </div>
                    <span className="text-gray-700 font-medium">{consequence}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <img 
                src={mockData.stockImages.healthyFamily}
                alt="Healthy family enjoying clean air"
                className="rounded-xl shadow-lg"
              />
              <div className="absolute -bottom-4 -right-4 bg-[#8FC73D] text-white p-4 rounded-lg shadow-lg">
                <Shield className="w-6 h-6 mb-2" />
                <div className="font-bold text-sm">Protected Family</div>
                <div className="text-xs opacity-90">Clean Air Ducts</div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-[#009ed7] to-[#0080b3] text-white py-12 px-8 rounded-2xl shadow-2xl">
            <h3 className="text-3xl font-bold mb-4">Don't Risk Your Family's Health</h3>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Professional air duct cleaning is an investment in your family's health and well-being. 
              Schedule your inspection today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                className="bg-[#8FC73D] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#7AB62D] transition-colors shadow-lg"
              >
                Schedule Inspection
              </button>
              <button 
                onClick={() => window.open('tel:+15122779782')}
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-[#009ed7] transition-colors"
              >
                Call (512) 277-9782
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HealthFacts;