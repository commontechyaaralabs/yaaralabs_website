"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface EnhancedHeaderProps {
  className?: string;
  transparent?: boolean;
  isLoggedIn?: boolean;
  onLoginClick?: () => void;
}

const EnhancedHeader: React.FC<EnhancedHeaderProps> = ({
  className = "",
  transparent = true,
  isLoggedIn = false,
  onLoginClick
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsSolutionsOpen(false);
      }
    };

    const handleMobileMenuClickOutside = (event: MouseEvent) => {
      const mobileMenuButton = document.querySelector('[data-mobile-menu-button]');
      const mobileMenu = document.querySelector('[data-mobile-menu]');
      
      if (mobileMenuButton && mobileMenu && 
          !mobileMenuButton.contains(event.target as Node) && 
          !mobileMenu.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
        setIsSolutionsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('mousedown', handleMobileMenuClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('mousedown', handleMobileMenuClickOutside);
    };
  }, []);

  const navigationItems = [
    {
      label: 'Solutions',
      hasDropdown: true,
      dropdownItems: [
        { label: 'AI Training & Enablement', href: '/AI_Training' },
        { label: 'AI Strategy Consulting', href: '/contact' },
        { label: 'AI Development Services', href: '/product_development' },
        { label: 'Data Annotation Services', href: '/Data_Annotation' }
      ]
    },
    {
      label: 'Our Expertise',
      href: '#expertise-section',
      onClick: () => {
        if (window.location.pathname === '/') {
          const expertiseSection = document.getElementById('expertise-section');
          if (expertiseSection) {
            expertiseSection.scrollIntoView({ behavior: 'smooth' });
          }
        } else {
          router.push('/#expertise-section');
        }
      }
    },
    {
      label: 'Contact Us',
      href: '/contact'
    }
  ];

  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      height: 0
    },
    visible: {
      opacity: 1,
      height: "auto"
    }
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0
    })
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/95 backdrop-blur-md shadow-lg border-b border-gray-800' 
          : transparent 
            ? 'bg-transparent' 
            : 'bg-black'
      } ${className}`}
      style={{ pointerEvents: 'auto' }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4" style={{ pointerEvents: 'auto' }}>
        <div className="flex items-center justify-between" style={{ pointerEvents: 'auto' }}>
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => router.push('/')}
          >
            <div className="w-12 h-12 relative">
              <Image
                src="/yaaralogo-circle.png"
                alt="YAARALABS Logo"
                fill
                className="object-contain"
                priority
                sizes="48px"
              />
            </div>
            <span className="text-white font-bold text-xl">YAARALABS</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item, index) => (
              <div key={item.label} className="relative">
                {item.hasDropdown ? (
                  <div ref={dropdownRef} className="relative">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-1 text-white hover:text-purple-400 transition-colors duration-300 py-2"
                      onClick={() => setIsSolutionsOpen(!isSolutionsOpen)}
                    >
                      <span>{item.label}</span>
                      <motion.div
                        animate={{ rotate: isSolutionsOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </motion.div>
                    </motion.button>
                    
                    <AnimatePresence>
                      {isSolutionsOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-64 bg-gray-800/95 backdrop-blur-md rounded-lg shadow-xl border border-gray-700 py-2 z-50"
                        >
                          {item.dropdownItems?.map((dropdownItem, idx) => (
                            <motion.button
                              key={dropdownItem.label}
                              whileHover={{ x: 5, backgroundColor: 'rgba(147, 51, 234, 0.1)' }}
                              className="block w-full text-left px-4 py-3 text-white hover:text-purple-400 transition-all duration-200"
                              onClick={() => {
                                router.push(dropdownItem.href);
                                setIsSolutionsOpen(false);
                              }}
                            >
                              {dropdownItem.label}
                            </motion.button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-white hover:text-purple-400 transition-colors duration-300 py-2 relative group"
                    onClick={item.onClick || (() => router.push(item.href || '/'))}
                  >
                    {item.label}
                    <motion.div
                      className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300"
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                    />
                  </motion.button>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="lg:hidden text-white p-3 relative z-50 cursor-pointer touch-manipulation bg-gray-800 bg-opacity-20 rounded-md hover:bg-gray-700 hover:bg-opacity-30 transition-all duration-200 active:scale-95"
            data-mobile-menu-button
            style={{ pointerEvents: 'auto', minHeight: '44px', minWidth: '44px' }}
            onTouchStart={() => {
              console.log('Hamburger touch start');
            }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log('Hamburger clicked, current state:', isMobileMenuOpen);
              setIsMobileMenuOpen(!isMobileMenuOpen);
              if (isMobileMenuOpen) {
                setIsSolutionsOpen(false);
              }
            }}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="lg:hidden mt-4 overflow-hidden"
              data-mobile-menu
            >
              <div className="bg-gray-800/95 backdrop-blur-md rounded-lg p-4 space-y-4 border border-gray-700 relative z-50" style={{pointerEvents: 'auto'}}>
                {navigationItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    variants={navItemVariants}
                    initial="hidden"
                    animate="visible"
                    custom={index}
                    className="relative z-50"
                  >
                    {item.hasDropdown ? (
                      <div>
                        <button
                          className="flex items-center justify-between w-full text-white py-2"
                          onClick={() => {
                            console.log('Mobile Solutions button clicked, current state:', isSolutionsOpen);
                            setIsSolutionsOpen(!isSolutionsOpen);
                          }}
                        >
                          <span>{item.label}</span>
                          <ChevronDown className={`w-4 h-4 transition-transform ${isSolutionsOpen ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                          {isSolutionsOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="ml-4 mt-2 space-y-2 relative z-50 overflow-hidden"
                              style={{pointerEvents: 'auto'}}
                            >
                              {item.dropdownItems?.map((dropdownItem, idx) => (
                                <motion.div
                                  key={dropdownItem.label}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.1 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <button
                                    type="button"
                                    className="block w-full text-left text-gray-300 hover:text-purple-400 hover:bg-gray-700 py-2 px-2 rounded transition-colors relative z-50 cursor-pointer touch-manipulation"
                                    onTouchStart={() => console.log('Touch start:', dropdownItem.label)}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      console.log('Mobile dropdown clicked:', dropdownItem.label, dropdownItem.href);
                                      
                                      // Close menus first
                                      setIsSolutionsOpen(false);
                                      setIsMobileMenuOpen(false);
                                      
                                      // Navigate immediately
                                      router.push(dropdownItem.href);
                                    }}
                                  >
                                    {dropdownItem.label}
                                  </button>
                                </motion.div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <button
                        className="block w-full text-left text-white hover:text-purple-400 py-2"
                        onClick={() => {
                          item.onClick?.();
                          setIsMobileMenuOpen(false);
                          setIsSolutionsOpen(false);
                        }}
                      >
                        {item.label}
                      </button>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export { EnhancedHeader };
