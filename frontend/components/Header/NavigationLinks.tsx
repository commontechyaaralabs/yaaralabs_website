import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface NavigationLinksProps {
  className?: string;
}

const NavigationLinks: React.FC<NavigationLinksProps> = ({ className = "" }) => {
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);

  return (
    <div className={`flex items-center gap-8 ${className}`}>
      <div className="relative">
        <button
          className="text-white hover:text-pink-400 transition-colors flex items-center gap-1"
          onMouseEnter={() => setIsSolutionsOpen(true)}
          onMouseLeave={() => setIsSolutionsOpen(false)}
        >
          Solutions
          <ChevronDown className="w-4 h-4" />
        </button>
        {isSolutionsOpen && (
          <div 
            className="absolute top-full left-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg py-2 z-50"
            onMouseEnter={() => setIsSolutionsOpen(true)}
            onMouseLeave={() => setIsSolutionsOpen(false)}
          >
            <a href="#ai-solutions" className="block px-4 py-2 text-white hover:bg-gray-700 transition-colors">
              AI Solutions
            </a>
            <a href="#consulting" className="block px-4 py-2 text-white hover:bg-gray-700 transition-colors">
              Consulting
            </a>
            <a href="#implementation" className="block px-4 py-2 text-white hover:bg-gray-700 transition-colors">
              Implementation
            </a>
          </div>
        )}
      </div>
      <a
        href="#expertise"
        className="text-white hover:text-pink-400 transition-colors"
      >
        Our Expertise
      </a>
      <a
        href="#contact"
        className="text-white hover:text-pink-400 transition-colors"
      >
        Contact Us
      </a>
    </div>
  );
};

export { NavigationLinks };
