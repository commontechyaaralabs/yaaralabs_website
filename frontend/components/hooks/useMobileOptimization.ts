"use client";

import { useState, useEffect, useCallback, useRef } from 'react';

interface MobileOptimizationState {
  isVisible: boolean;
  isInViewport: boolean;
  isIntersecting: boolean;
  performanceMode: boolean;
  reducedMotion: boolean;
  batterySaver: boolean;
  connectionType: 'slow' | 'fast' | 'unknown';
}

interface MobileOptimizationActions {
  enablePerformanceMode: () => void;
  disablePerformanceMode: () => void;
  handleVisibilityChange: () => void;
  handleIntersection: (entry: IntersectionObserverEntry) => void;
  optimizeForMobile: () => void;
  handleConnectionChange: () => void;
  preloadCriticalResources: () => void;
  lazyLoadImages: () => void;
}

export const useMobileOptimization = (): MobileOptimizationState & MobileOptimizationActions => {
  const [state, setState] = useState<MobileOptimizationState>({
    isVisible: true,
    isInViewport: false,
    isIntersecting: false,
    performanceMode: false,
    reducedMotion: false,
    batterySaver: false,
    connectionType: 'unknown',
  });

  const observerRef = useRef<IntersectionObserver | null>(null);
  const elementRef = useRef<HTMLElement | null>(null);

  // Detect reduced motion preference
  const detectReducedMotion = useCallback(() => {
    if (typeof window !== 'undefined') {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setState(prev => ({ ...prev, reducedMotion: prefersReducedMotion }));
    }
  }, []);

  // Detect battery saver mode
  const detectBatterySaver = useCallback(() => {
    if (typeof window !== 'undefined' && 'getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        setState(prev => ({ ...prev, batterySaver: battery.charging === false && battery.level < 0.2 }));
      });
    }
  }, []);

  // Detect connection type
  const detectConnectionType = useCallback(() => {
    if (typeof window !== 'undefined' && 'connection' in navigator) {
      const connection = (navigator as any).connection;
      const effectiveType = connection?.effectiveType || 'unknown';
      setState(prev => ({ 
        ...prev, 
        connectionType: effectiveType === 'slow-2g' || effectiveType === '2g' ? 'slow' : 'fast'
      }));
    }
  }, []);

  // Handle visibility change
  const handleVisibilityChange = useCallback(() => {
    setState(prev => ({ ...prev, isVisible: !document.hidden }));
  }, []);

  // Handle intersection observer
  const handleIntersection = useCallback((entry: IntersectionObserverEntry) => {
    setState(prev => ({
      ...prev,
      isInViewport: entry.isIntersecting,
      isIntersecting: entry.isIntersecting,
    }));
  }, []);

  // Enable performance mode
  const enablePerformanceMode = useCallback(() => {
    setState(prev => ({ ...prev, performanceMode: true }));
    
    // Disable animations and transitions
    document.body.style.setProperty('--animation-duration', '0s');
    document.body.style.setProperty('--transition-duration', '0s');
    
    // Reduce image quality
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      if (img.dataset.lowRes) {
        img.src = img.dataset.lowRes;
      }
    });
  }, []);

  // Disable performance mode
  const disablePerformanceMode = useCallback(() => {
    setState(prev => ({ ...prev, performanceMode: false }));
    
    // Restore animations and transitions
    document.body.style.removeProperty('--animation-duration');
    document.body.style.removeProperty('--transition-duration');
    
    // Restore image quality
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      if (img.dataset.highRes) {
        img.src = img.dataset.highRes;
      }
    });
  }, []);

  // Optimize for mobile
  const optimizeForMobile = useCallback(() => {
    // Add mobile-specific optimizations
    document.body.classList.add('mobile-optimized');
    
    // Optimize touch events
    document.addEventListener('touchstart', () => {}, { passive: true });
    document.addEventListener('touchmove', () => {}, { passive: true });
    
    // Optimize scrolling
    document.body.style.setProperty('-webkit-overflow-scrolling', 'touch');
    
    // Reduce repaints
    document.body.style.setProperty('will-change', 'transform');
  }, []);

  // Handle connection change
  const handleConnectionChange = useCallback(() => {
    detectConnectionType();
    
    // Adjust performance based on connection
    if (state.connectionType === 'slow') {
      enablePerformanceMode();
    } else {
      disablePerformanceMode();
    }
  }, [state.connectionType, enablePerformanceMode, disablePerformanceMode]);

  // Preload critical resources
  const preloadCriticalResources = useCallback(() => {
    const criticalImages = document.querySelectorAll('[data-critical]');
    criticalImages.forEach(img => {
      const src = img.getAttribute('src') || img.getAttribute('data-src');
      if (src) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
      }
    });
  }, []);

  // Lazy load images
  const lazyLoadImages = useCallback(() => {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            img.src = img.dataset.src || '';
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });

      images.forEach(img => imageObserver.observe(img));
    } else {
      // Fallback for older browsers
      images.forEach(img => {
        const imgElement = img as HTMLImageElement;
        imgElement.src = imgElement.dataset.src || '';
        imgElement.classList.remove('lazy');
      });
    }
  }, []);

  // Set up intersection observer
  useEffect(() => {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach(handleIntersection);
        },
        { threshold: 0.1 }
      );
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleIntersection]);

  // Set up event listeners
  useEffect(() => {
    detectReducedMotion();
    detectBatterySaver();
    detectConnectionType();

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      connection.addEventListener('change', handleConnectionChange);
    }

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      
      if ('connection' in navigator) {
        const connection = (navigator as any).connection;
        connection.removeEventListener('change', handleConnectionChange);
      }
    };
  }, [detectReducedMotion, detectBatterySaver, detectConnectionType, handleVisibilityChange, handleConnectionChange]);

  return {
    ...state,
    enablePerformanceMode,
    disablePerformanceMode,
    handleVisibilityChange,
    handleIntersection,
    optimizeForMobile,
    handleConnectionChange,
    preloadCriticalResources,
    lazyLoadImages,
  };
};
