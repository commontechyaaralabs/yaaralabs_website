"use client";

import { useState, useEffect, useCallback } from 'react';

interface MobileViewState {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  screenWidth: number;
  screenHeight: number;
  orientation: 'portrait' | 'landscape';
  touchDevice: boolean;
  isIOS: boolean;
  isAndroid: boolean;
}

interface MobileViewActions {
  handleTouchStart: (e: React.TouchEvent) => void;
  handleTouchEnd: (e: React.TouchEvent) => void;
  handleTouchMove: (e: React.TouchEvent) => void;
  handleOrientationChange: () => void;
  handleResize: () => void;
  scrollToElement: (elementId: string, offset?: number) => void;
  smoothScrollTo: (y: number) => void;
}

export const useMobileView = (): MobileViewState & MobileViewActions => {
  const [state, setState] = useState<MobileViewState>({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    screenWidth: 0,
    screenHeight: 0,
    orientation: 'portrait',
    touchDevice: false,
    isIOS: false,
    isAndroid: false,
  });

  // Detect device and screen properties
  const detectDevice = useCallback(() => {
    if (typeof window === 'undefined') return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    const userAgent = navigator.userAgent.toLowerCase();
    
    const isMobile = width <= 768;
    const isTablet = width > 768 && width <= 1024;
    const isDesktop = width > 1024;
    const touchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isIOS = /iphone|ipad|ipod/.test(userAgent);
    const isAndroid = /android/.test(userAgent);
    const orientation = height > width ? 'portrait' : 'landscape';

    setState({
      isMobile,
      isTablet,
      isDesktop,
      screenWidth: width,
      screenHeight: height,
      orientation,
      touchDevice,
      isIOS,
      isAndroid,
    });
  }, []);

  // Touch event handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    // Add touch feedback
    const target = e.currentTarget as HTMLElement;
    target.style.transform = 'scale(0.98)';
    target.style.transition = 'transform 0.1s ease';
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    // Remove touch feedback
    const target = e.currentTarget as HTMLElement;
    target.style.transform = 'scale(1)';
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    // Prevent default touch behaviors that might interfere with scrolling
    if (e.touches.length > 1) {
      e.preventDefault();
    }
  }, []);

  // Orientation change handler
  const handleOrientationChange = useCallback(() => {
    // Delay to ensure screen dimensions are updated
    setTimeout(detectDevice, 100);
  }, [detectDevice]);

  // Resize handler
  const handleResize = useCallback(() => {
    detectDevice();
  }, [detectDevice]);

  // Smooth scroll to element
  const scrollToElement = useCallback((elementId: string, offset: number = 0) => {
    const element = document.getElementById(elementId);
    if (element) {
      const elementTop = element.offsetTop - offset;
      window.scrollTo({
        top: elementTop,
        behavior: 'smooth'
      });
    }
  }, []);

  // Smooth scroll to position
  const smoothScrollTo = useCallback((y: number) => {
    window.scrollTo({
      top: y,
      behavior: 'smooth'
    });
  }, []);

  // Set up event listeners
  useEffect(() => {
    detectDevice();

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, [detectDevice, handleResize, handleOrientationChange]);

  return {
    ...state,
    handleTouchStart,
    handleTouchEnd,
    handleTouchMove,
    handleOrientationChange,
    handleResize,
    scrollToElement,
    smoothScrollTo,
  };
};
