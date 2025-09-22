import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface NavigationLinksProps {
  className?: string;
}

const NavigationLinks: React.FC<NavigationLinksProps> = ({ className = "" }) => {
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsSolutionsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`flex items-center gap-8 ${className}`}>
      <div className="relative" ref={dropdownRef}>
        <button
          className="text-white hover:text-pink-400 transition-colors flex items-center gap-1"
          onClick={() => setIsSolutionsOpen(!isSolutionsOpen)}
        >
          Solutions
          <ChevronDown className={`w-4 h-4 transition-transform ${isSolutionsOpen ? 'rotate-180' : ''}`} />
        </button>
        {isSolutionsOpen && (
          <div 
            className="absolute top-full left-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-lg py-2 z-50"
          >
            <button 
              onClick={() => {
                router.push('/AI_Training');
                setIsSolutionsOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-white hover:bg-gray-700 transition-colors"
            >
              AI Training & Enablement
            </button>
            <button 
              onClick={() => {
                router.push('/contact');
                setIsSolutionsOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-white hover:bg-gray-700 transition-colors"
            >
              AI Strategy Consulting
            </button>
            <button 
              onClick={() => {
                router.push('/product_development');
                setIsSolutionsOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-white hover:bg-gray-700 transition-colors"
            >
              AI Development Services
            </button>
          </div>
        )}
      </div>
      <button
        onClick={() => {
          // Check if we're on the home page
          if (window.location.pathname === '/') {
            // Scroll to the expertise section on home page
            const expertiseSection = document.getElementById('expertise-section');
            if (expertiseSection) {
              expertiseSection.scrollIntoView({ behavior: 'smooth' });
            }
          } else {
            // Navigate to home page and scroll to expertise section
            router.push('/#expertise-section');
          }
        }}
        className="text-white hover:text-pink-400 transition-colors"
      >
        Our Expertise
      </button>
      <button
        onClick={() => router.push('/contact')}
        className="text-white hover:text-pink-400 transition-colors"
      >
        Contact Us
      </button>
      <button
        onClick={() => router.push('/contact')}
        className="px-4 py-2 rounded-lg font-semibold transition-all duration-300"
        style={{ backgroundColor: '#b90abd', color: '#ffffff' }}
      >
        Get AI Assessment
      </button>
    </div>
  );
};

export { NavigationLinks };
