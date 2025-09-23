"use client";

import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useMobileView } from '../hooks/useMobileView';
import { useMobileNavigation } from '../hooks/useMobileNavigation';
import { useMobileGestures } from '../hooks/useMobileGestures';

interface MobileOptimizedHeaderProps {
  className?: string;
  transparent?: boolean;
  isLoggedIn?: boolean;
  onLoginClick?: () => void;
}

const MobileOptimizedHeader: React.FC<MobileOptimizedHeaderProps> = ({
  className = "",
  transparent = true,
  isLoggedIn = false,
  onLoginClick
}) => {
  const router = useRouter();
  const { isMobile, isTablet, touchDevice, screenWidth } = useMobileView();
  const {
    isMenuOpen,
    isDropdownOpen,
    activeDropdown,
    isScrolling,
    scrollDirection,
    toggleMenu,
    closeMenu,
    toggleDropdown,
    closeDropdown,
    handleNavigation,
    handleScrollToSection,
    handleBackToTop,
  } = useMobileNavigation();

  // Gesture handling for swipe to close menu
  const { handleTouchStart, handleTouchMove, handleTouchEnd } = useMobileGestures({
    onSwipeLeft: () => {
      if (isMenuOpen) closeMenu();
    },
    onSwipeRight: () => {
      if (!isMenuOpen) toggleMenu();
    },
    swipeThreshold: 50,
  });

  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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
      onClick: () => handleScrollToSection('expertise-section')
    },
    {
      label: 'Contact Us',
      href: '/contact'
    }
  ];

  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      y: -20
    },
    visible: {
      opacity: 1,
      height: "auto",
      y: 0
    }
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3
      }
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
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 sm:space-x-3 cursor-pointer"
            onClick={() => router.push('/')}
          >
            <div className="w-8 h-8 sm:w-12 sm:h-12 relative">
              <Image
                src="/yaaralogo-circle.png"
                alt="YAARALABS Logo"
                fill
                className="object-contain"
                priority
                sizes="(max-width: 640px) 32px, 48px"
              />
            </div>
            <span className="text-white font-bold text-lg sm:text-xl">YAARALABS</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item, index) => (
              <div key={item.label} className="relative">
                {item.hasDropdown ? (
                  <div className="relative">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-1 text-white hover:text-purple-400 transition-colors duration-300 py-2"
                      onClick={() => toggleDropdown(item.label)}
                    >
                      <span>{item.label}</span>
                      <motion.div
                        animate={{ rotate: activeDropdown === item.label ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </motion.div>
                    </motion.button>
                    
                    <AnimatePresence>
                      {activeDropdown === item.label && (
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
                              onClick={() => handleNavigation(dropdownItem.href)}
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
                    onClick={() => item.onClick ? item.onClick() : handleNavigation(item.href || '/')}
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


          {/* Mobile Menu Button */}
          <button
            type="button"
            className="lg:hidden text-white p-3 relative z-50 cursor-pointer touch-manipulation bg-gray-800 bg-opacity-20 rounded-md hover:bg-gray-700 hover:bg-opacity-30 transition-all duration-200 active:scale-95"
            data-mobile-menu-button
            style={{ pointerEvents: 'auto', minHeight: '44px', minWidth: '44px' }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log('MobileOptimized hamburger clicked, current state:', isMenuOpen);
              toggleMenu();
            }}
            onTouchStart={() => {
              console.log('MobileOptimized hamburger touch start');
            }}
            aria-label="Toggle mobile menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="lg:hidden mt-4 overflow-hidden"
              data-mobile-menu
              style={{ pointerEvents: 'auto' }}
            >
              <div className="bg-gray-800/95 backdrop-blur-md rounded-lg p-4 space-y-4 border border-gray-700" style={{ pointerEvents: 'auto' }}>
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
                          type="button"
                          className="flex items-center justify-between w-full text-white py-3 px-2 rounded transition-colors hover:bg-gray-700 cursor-pointer touch-manipulation"
                          style={{ pointerEvents: 'auto', minHeight: '44px' }}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            console.log('Mobile Solutions dropdown clicked:', item.label);
                            toggleDropdown(item.label);
                          }}
                          onTouchStart={() => {
                            console.log('Mobile Solutions touch start:', item.label);
                          }}
                        >
                          <span>{item.label}</span>
                          <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                        </button>
                        {activeDropdown === item.label && (
                          <div className="ml-4 mt-2 space-y-2 relative z-50 bg-gray-900 bg-opacity-50 rounded-md p-2" style={{ pointerEvents: 'auto' }}>
                            {item.dropdownItems?.map((dropdownItem) => (
                              <button
                                key={dropdownItem.label}
                                type="button"
                                className="block w-full text-left text-gray-300 hover:text-purple-400 hover:bg-gray-700 py-2 px-2 rounded transition-colors cursor-pointer touch-manipulation relative z-50"
                                style={{ pointerEvents: 'auto', minHeight: '40px' }}
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  console.log('Mobile dropdown item clicked:', dropdownItem.label, dropdownItem.href);
                                  handleNavigation(dropdownItem.href);
                                }}
                                onTouchStart={() => {
                                  console.log('Mobile dropdown item touch start:', dropdownItem.label);
                                }}
                              >
                                {dropdownItem.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <button
                        type="button"
                        className="block w-full text-left text-white hover:text-purple-400 hover:bg-gray-700 py-3 px-2 rounded transition-colors cursor-pointer touch-manipulation"
                        style={{ pointerEvents: 'auto', minHeight: '44px' }}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          console.log('Mobile nav item clicked:', item.label, 'href:', item.href, 'hasOnClick:', !!item.onClick);
                          if (item.onClick) {
                            item.onClick();
                          } else {
                            handleNavigation(item.href || '/');
                          }
                        }}
                        onTouchStart={() => {
                          console.log('Mobile nav item touch start:', item.label);
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

export { MobileOptimizedHeader };
