"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface QuickRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale';
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  threshold?: number;
  triggerOnce?: boolean;
}

const QuickReveal: React.FC<QuickRevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  distance = 30,
  className = '',
  threshold = 0.1,
  triggerOnce = true
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const { ref, inView } = useInView({
    threshold,
    triggerOnce
  });

  useEffect(() => {
    if (inView) {
      // Immediate visibility with just a small delay for stagger effect
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [inView, delay]);

  const getInitialTransform = () => {
    if (isVisible) return 'translateY(0) translateX(0) scale(1)';
    
    switch (direction) {
      case 'up':
        return `translateY(${distance}px)`;
      case 'down':
        return `translateY(-${distance}px)`;
      case 'left':
        return `translateX(${distance}px)`;
      case 'right':
        return `translateX(-${distance}px)`;
      case 'scale':
        return 'scale(0.95)';
      case 'fade':
        return 'translateY(0)';
      default:
        return `translateY(${distance}px)`;
    }
  };

  const getFinalTransform = () => {
    switch (direction) {
      case 'scale':
        return 'scale(1)';
      default:
        return 'translateY(0) translateX(0)';
    }
  };

  return (
    <div
      ref={ref}
      className={`transition-all ease-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0.3, // Start with partial opacity instead of 0
        transform: isVisible ? getFinalTransform() : getInitialTransform(),
        transitionDuration: `${duration}s`,
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
};

export default QuickReveal;
