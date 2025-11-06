import React from 'react';
import { Card, CardContent } from './ui/card';
import { Award, Star, Users, Settings } from 'lucide-react';
import { useReviews } from '../contexts/ReviewContext';

const iconMap = {
  award: Award,
  star: Star,
  users: Users,
  settings: Settings
};

const WhyChooseUs = ({ reasons }) => {
  const { totalReviews } = useReviews();
  
  // Update the reasons array to use dynamic review count
  const updatedReasons = reasons.map(reason => {
    if (reason.title.includes('768+ Five-Star Reviews')) {
      return {
        ...reason,
        title: `${totalReviews}+ Five-Star Reviews`,
        description: `Trusted by hundreds of satisfied customers across Austin`
      };
    }
    return reason;
  });

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose Supreme Air Austin?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're not just another air duct cleaning company. Here's what sets us apart from the competition.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {updatedReasons.map((reason, index) => {
            const Icon = iconMap[reason.icon];
            return (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-gradient-to-br from-gray-50 to-white">
                <CardContent className="p-8 text-center">
                  {reason.icon === 'award' ? (
                    <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                      <img 
                        src="/footer-ribbon-consumer-choice-01-249x300.webp" 
                        alt="Consumer Choice Award Winner"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="bg-[#009ed7] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#8FC73D] transition-colors duration-300">
                      <Icon className="w-8 h-8" />
                    </div>
                  )}
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {reason.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {reason.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-[#009ed7] to-[#8FC73D] text-white py-8 px-8 rounded-2xl shadow-xl">
            <h3 className="text-2xl font-bold mb-4">Ready to Experience the Supreme Air Difference?</h3>
            <p className="text-lg mb-6 opacity-90">Join hundreds of satisfied customers who trust us with their indoor air quality</p>
            <button 
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-[#009ed7] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
            >
              Get Your Estimate Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;