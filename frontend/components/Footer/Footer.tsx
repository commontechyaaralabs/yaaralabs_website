import React from 'react';
import Image from 'next/image';

const Footer: React.FC = () => {
  return (
    <footer className="py-16 px-4 bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 items-start">
          {/* Left Column - Logo and Company Name */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
              <Image 
                src="/yaaralogo-circle.png" 
                alt="YaaraLabs Logo" 
                width={40} 
                height={40} 
                className="w-full h-full object-cover"
              />
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
              <a href="/contact" className="block text-blue-400 hover:text-blue-300 underline text-sm transition-colors">Contact Us</a>
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
              <a href="/Terms-and-conditions" className="block text-blue-400 hover:text-blue-300 underline text-sm transition-colors">Terms & Conditions</a>
              <a href="#" className="block text-blue-400 hover:text-blue-300 underline text-sm transition-colors">Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
