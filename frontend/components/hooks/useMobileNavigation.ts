"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface MobileNavigationState {
  isMenuOpen: boolean;
  isDropdownOpen: boolean;
  activeDropdown: string | null;
  isScrolling: boolean;
  scrollDirection: 'up' | 'down';
  lastScrollY: number;
}

interface MobileNavigationActions {
  toggleMenu: () => void;
  closeMenu: () => void;
  toggleDropdown: (dropdownId: string) => void;
  closeDropdown: () => void;
  handleNavigation: (href: string, options?: { closeMenu?: boolean; closeDropdown?: boolean }) => void;
  handleScrollToSection: (sectionId: string) => void;
  handleBackToTop: () => void;
}

export const useMobileNavigation = (): MobileNavigationState & MobileNavigationActions => {
  const router = useRouter();
  const [state, setState] = useState<MobileNavigationState>({
    isMenuOpen: false,
    isDropdownOpen: false,
    activeDropdown: null,
    isScrolling: false,
    scrollDirection: 'down',
    lastScrollY: 0,
  });

  const scrollTimeoutRef = useRef<NodeJS.Timeout>();

  // Handle scroll detection
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const scrollDirection = currentScrollY > state.lastScrollY ? 'down' : 'up';
    
    setState(prev => ({
      ...prev,
      isScrolling: true,
      scrollDirection,
      lastScrollY: currentScrollY,
    }));

    // Clear existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // Set timeout to stop scrolling state
    scrollTimeoutRef.current = setTimeout(() => {
      setState(prev => ({
        ...prev,
        isScrolling: false,
      }));
    }, 150);
  }, [state.lastScrollY]);

  // Menu controls
  const toggleMenu = useCallback(() => {
    setState(prev => ({
      ...prev,
      isMenuOpen: !prev.isMenuOpen,
      isDropdownOpen: false,
      activeDropdown: null,
    }));
  }, []);

  const closeMenu = useCallback(() => {
    setState(prev => ({
      ...prev,
      isMenuOpen: false,
      isDropdownOpen: false,
      activeDropdown: null,
    }));
  }, []);

  // Dropdown controls
  const toggleDropdown = useCallback((dropdownId: string) => {
    setState(prev => ({
      ...prev,
      isDropdownOpen: !prev.isDropdownOpen || prev.activeDropdown !== dropdownId,
      activeDropdown: prev.activeDropdown === dropdownId ? null : dropdownId,
    }));
  }, []);

  const closeDropdown = useCallback(() => {
    setState(prev => ({
      ...prev,
      isDropdownOpen: false,
      activeDropdown: null,
    }));
  }, []);

  // Navigation handler
  const handleNavigation = useCallback((
    href: string, 
    options: { closeMenu?: boolean; closeDropdown?: boolean } = {}
  ) => {
    const { closeMenu: shouldCloseMenu = true, closeDropdown: shouldCloseDropdown = true } = options;

    // Close menus if specified
    if (shouldCloseMenu) {
      closeMenu();
    }
    if (shouldCloseDropdown) {
      closeDropdown();
    }

    // Handle navigation
    if (href.startsWith('#')) {
      // Internal anchor link
      const sectionId = href.substring(1);
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (href.startsWith('http')) {
      // External link
      window.open(href, '_blank', 'noopener,noreferrer');
    } else {
      // Internal route
      router.push(href);
    }
  }, [router, closeMenu, closeDropdown]);

  // Scroll to section handler
  const handleScrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80; // Adjust based on your header height
      const elementTop = element.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementTop,
        behavior: 'smooth'
      });
    }
    closeMenu();
  }, [closeMenu]);

  // Back to top handler
  const handleBackToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  // Click outside handler
  const handleClickOutside = useCallback((event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const isMenuButton = target.closest('[data-mobile-menu-button]');
    const isMenu = target.closest('[data-mobile-menu]');
    const isDropdown = target.closest('[data-dropdown]');

    if (!isMenuButton && !isMenu && !isDropdown) {
      closeMenu();
      closeDropdown();
    }
  }, [closeMenu, closeDropdown]);

  // Set up event listeners
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [handleScroll, handleClickOutside]);

  return {
    ...state,
    toggleMenu,
    closeMenu,
    toggleDropdown,
    closeDropdown,
    handleNavigation,
    handleScrollToSection,
    handleBackToTop,
  };
};
