import { useEffect, useRef, useState, useCallback } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  mobileOptimized?: boolean;
  reducedMotion?: boolean;
  performanceMode?: boolean;
}

export const useIntersectionObserver = (
  options: UseIntersectionObserverOptions = {}
) => {
  const { 
    threshold = 0.2, 
    rootMargin = '0px', 
    triggerOnce = true,
    mobileOptimized = true,
    reducedMotion = false,
    performanceMode = false
  } = options;
  
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isInViewport, setIsInViewport] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Mobile-optimized threshold based on screen size
  const getMobileThreshold = useCallback(() => {
    if (!mobileOptimized || typeof window === 'undefined') return threshold;
    
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
    
    if (isMobile) return 0.1; // Lower threshold for mobile
    if (isTablet) return 0.15; // Medium threshold for tablet
    return threshold; // Default for desktop
  }, [threshold, mobileOptimized]);

  // Mobile-optimized root margin
  const getMobileRootMargin = useCallback(() => {
    if (!mobileOptimized || typeof window === 'undefined') return rootMargin;
    
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
    
    if (isMobile) return '-10% 0px -10% 0px'; // Smaller margin for mobile
    if (isTablet) return '-5% 0px -5% 0px'; // Medium margin for tablet
    return rootMargin; // Default for desktop
  }, [rootMargin, mobileOptimized]);

  // Handle intersection with performance optimizations
  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      const isIntersecting = entry.isIntersecting;
      setIsInViewport(isIntersecting);
      
      if (isIntersecting && (!triggerOnce || !hasAnimated)) {
        // Use requestAnimationFrame for better performance
        requestAnimationFrame(() => {
          setIsVisible(true);
          if (triggerOnce) {
            setHasAnimated(true);
          }
        });
      } else if (!triggerOnce) {
        // Only update if not in performance mode
        if (!performanceMode) {
          requestAnimationFrame(() => {
            setIsVisible(false);
          });
        }
      }
    });
  }, [triggerOnce, hasAnimated, performanceMode]);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof window === 'undefined') return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const shouldAnimate = !reducedMotion && !prefersReducedMotion;

    if (!shouldAnimate) {
      // If reduced motion, show immediately
      setIsVisible(true);
      setHasAnimated(true);
      return;
    }

    // Create observer with mobile-optimized settings
    const mobileThreshold = getMobileThreshold();
    const mobileRootMargin = getMobileRootMargin();

    observerRef.current = new IntersectionObserver(
      handleIntersection,
      { 
        threshold: mobileThreshold, 
        rootMargin: mobileRootMargin 
      }
    );

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current) {
        observerRef.current.unobserve(element);
        observerRef.current.disconnect();
      }
    };
  }, [getMobileThreshold, getMobileRootMargin, handleIntersection, reducedMotion]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return { 
    ref, 
    isVisible, 
    hasAnimated, 
    isInViewport,
    reset: () => {
      setIsVisible(false);
      setHasAnimated(false);
      setIsInViewport(false);
    }
  };
};
