import React from 'react';
import { mockData } from '../mock';
import Header from './Header';
import Hero from './Hero';
import VideoSection from './VideoSection';
import Services from './Services';
import WhyChooseUs from './WhyChooseUs';
import BeforeAfter from './BeforeAfter';
import HealthFacts from './HealthFacts';
import Testimonials from './Testimonials';
import FAQ from './FAQ';
import ContactForm from './ContactForm';
import Footer from './Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header company={mockData.company} />
      <Hero hero={mockData.hero} />
      <VideoSection />
      <Services services={mockData.services} />
      <WhyChooseUs reasons={mockData.whyChooseUs} />
      <BeforeAfter beforeAfter={mockData.beforeAfter} />
      <HealthFacts healthFacts={mockData.healthFacts} />
      <Testimonials />
      <FAQ faqs={mockData.faqs} />
      <ContactForm company={mockData.company} />
      <Footer company={mockData.company} />
    </div>
  );
};

export default LandingPage;