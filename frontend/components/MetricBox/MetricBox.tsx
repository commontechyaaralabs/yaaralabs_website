"use client";

import React, { useState, useRef, useEffect } from 'react';

interface MetricBoxProps {
  value: string;
  label: string;
  delay: number;
}

const MetricBox: React.FC<MetricBoxProps> = ({ value, label, delay }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedValue, setAnimatedValue] = useState("0");
  const [hasAnimated, setHasAnimated] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setTimeout(() => {
              setIsVisible(true);
              setHasAnimated(true);
            }, delay);
          }
        });
      },
      { threshold: 0.3 } // Trigger when 30% of the element is visible
    );

    if (boxRef.current) {
      observer.observe(boxRef.current);
    }

    return () => {
      if (boxRef.current) {
        observer.unobserve(boxRef.current);
      }
    };
  }, [delay, hasAnimated]);

  useEffect(() => {
    if (!isVisible) return;

    // Check if value contains only text (no numbers)
    const hasNumbers = /\d/.test(value);
    
    if (!hasNumbers) {
      // For text-only values like "Enterprise", show immediately without animation
      setAnimatedValue(value);
      return;
    }

    // For numeric values, perform animation
    const numericValue = parseFloat(value.replace(/[+$%]/g, ''));
    const suffix = value.replace(/[\d.]/g, '');
    const duration = 1000; // 1 second
    const steps = 60; // 60 steps for smooth animation
    const stepDuration = duration / steps;
    const increment = numericValue / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const currentValue = Math.min(increment * currentStep, numericValue);
      setAnimatedValue(Math.floor(currentValue) + suffix);

      if (currentStep >= steps) {
        clearInterval(interval);
        setAnimatedValue(value); // Ensure final value is exact
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [isVisible, value]);

  return (
    <div 
      ref={boxRef}
      className={`bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 text-center border border-gray-700 hover:border-purple-500 transition-all duration-500 hover:scale-105 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="flex items-center justify-center h-16 mb-1">
        <div 
          className={`font-bold font-mono text-center leading-none ${
            /\d/.test(value) ? 'text-4xl md:text-5xl' : 'text-3xl md:text-4xl'
          }`}
          style={{ color: '#b90abd' }}
        >
          {animatedValue}
        </div>
      </div>
      <div className="text-sm font-medium text-center leading-tight px-2" style={{ color: '#ffffff' }}>
        {label}
      </div>
    </div>
  );
};

export { MetricBox };
