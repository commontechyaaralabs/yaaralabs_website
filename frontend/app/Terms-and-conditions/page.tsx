"use client";

import React, { useEffect } from 'react';
import { Header } from '@/components/Header/Header';
import { useRouter } from 'next/navigation';

const TermsAndConditionsPage: React.FC = () => {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation Bar */}
      <Header transparent={true} isLoggedIn={false} onLoginClick={handleLoginClick} />

      {/* Main Content */}
      <div className="pt-32 pb-16 px-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-8" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
              Terms & Conditions
            </h1>
          </div>

          {/* Content Block */}
          <div className="bg-gray-800 rounded-2xl p-12 border border-gray-700">
            <div className="space-y-8 text-white">
              {/* A LEGAL DISCLAIMER Section */}
              <div>
                <h2 className="text-2xl font-bold mb-4">A LEGAL DISCLAIMER</h2>
                <p className="text-gray-300 leading-relaxed">
                  The information provided here is general guidance for writing Terms & Conditions and is not legal advice. 
                  You should not rely on this information as legal advice. We recommend seeking professional legal counsel 
                  for creating your own Terms & Conditions that are appropriate for your specific business and jurisdiction.
                </p>
              </div>

              {/* TERMS & CONDITIONS - THE BASICS Section */}
              <div>
                <h2 className="text-2xl font-bold mb-4">TERMS & CONDITIONS - THE BASICS</h2>
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p>
                    Terms and Conditions (T&C) are legally binding terms that are set by the website owner. 
                    These terms establish the legal relationship between website visitors/customers and the website owner.
                  </p>
                  <p>
                    The specific terms and conditions should be tailored to the needs and nature of each website. 
                    For example, an e-commerce website will have different terms and conditions compared to an 
                    informational website (such as a blog or landing page).
                  </p>
                  <p>
                    Terms and conditions protect the website owner from potential legal exposure, but it's important 
                    to seek local legal advice as regulations may vary by jurisdiction.
                  </p>
                </div>
              </div>

              {/* WHAT TO INCLUDE IN THE T&C DOCUMENT Section */}
              <div>
                <h2 className="text-2xl font-bold mb-4">WHAT TO INCLUDE IN THE T&C DOCUMENT</h2>
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p>
                    Common issues addressed in T&C documents include user eligibility, payment methods, declarations 
                    about future offering changes, warranties, intellectual property/copyrights, and the website owner's 
                    right to suspend or cancel accounts.
                  </p>
                  <p>
                    To learn more about this, check out our article "Creating a Terms and Conditions Policy".
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-16 px-4 bg-black border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 items-start">
            {/* Left Column - Logo and Company Name */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                <div className="w-full h-full bg-gradient-to-br from-purple-500 to-blue-500"></div>
              </div>
              <span className="text-white text-lg font-semibold">YaaraLabs</span>
            </div>
            
            {/* Solutions Column */}
            <div>
              <h4 className="text-white font-semibold text-lg mb-6">Solutions</h4>
              <div className="space-y-3">
                <a href="/product_development" className="block text-blue-400 hover:text-blue-300 underline text-sm transition-colors">AI Product Development</a>
                <a href="/AI_Training" className="block text-blue-400 hover:text-blue-300 underline text-sm transition-colors">Workforce AI Enablement</a>
                <a href="#" className="block text-blue-400 hover:text-blue-300 underline text-sm transition-colors">AI Strategy Consulting</a>
                <a href="/Data_Annotation" className="block text-blue-400 hover:text-blue-300 underline text-sm transition-colors">Data Annotation Services</a>
              </div>
            </div>
            
            {/* Company Column */}
            <div>
              <h4 className="text-white font-semibold text-lg mb-6">Company</h4>
              <div className="space-y-3">
                <a href="#" className="block text-blue-400 hover:text-blue-300 underline text-sm transition-colors">Our Expertise</a>
                <a href="#" className="block text-blue-400 hover:text-blue-300 underline text-sm transition-colors">Contact Us</a>
                <a href="#" className="block text-blue-400 hover:text-blue-300 underline text-sm transition-colors">Accessibility Statement</a>
              </div>
            </div>
            
            {/* Contact & Legal Column */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <a href="mailto:hello@yaaralabs.ai" className="text-blue-400 hover:text-blue-300 underline text-sm transition-colors">hello@yaaralabs.ai</a>
                <a href="https://www.linkedin.com/company/yaaralabs-ai/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
              
              <div className="space-y-3">
                <a href="#" className="block text-blue-400 hover:text-blue-300 underline text-sm transition-colors">Terms & Conditions</a>
                <a href="#" className="block text-blue-400 hover:text-blue-300 underline text-sm transition-colors">Privacy Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TermsAndConditionsPage;
