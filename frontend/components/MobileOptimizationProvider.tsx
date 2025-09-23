"use client";

import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { useMobileView } from './hooks/useMobileView';
import { useMobileOptimization } from './hooks/useMobileOptimization';

interface MobileOptimizationContextType {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  screenWidth: number;
  screenHeight: number;
  orientation: 'portrait' | 'landscape';
  touchDevice: boolean;
  isIOS: boolean;
  isAndroid: boolean;
  performanceMode: boolean;
  reducedMotion: boolean;
  batterySaver: boolean;
  connectionType: 'slow' | 'fast' | 'unknown';
  optimizeForMobile: () => void;
  preloadCriticalResources: () => void;
  lazyLoadImages: () => void;
}

const MobileOptimizationContext = createContext<MobileOptimizationContextType | undefined>(undefined);

interface MobileOptimizationProviderProps {
  children: ReactNode;
}

export const MobileOptimizationProvider: React.FC<MobileOptimizationProviderProps> = ({ children }) => {
  const mobileView = useMobileView();
  const mobileOptimization = useMobileOptimization();

  // Auto-optimize on mobile devices
  useEffect(() => {
    if (mobileView.isMobile || mobileView.isTablet) {
      mobileOptimization.optimizeForMobile();
      mobileOptimization.preloadCriticalResources();
      mobileOptimization.lazyLoadImages();
    }
  }, [mobileView.isMobile, mobileView.isTablet, mobileOptimization]);

  const contextValue: MobileOptimizationContextType = {
    ...mobileView,
    ...mobileOptimization,
  };

  return (
    <MobileOptimizationContext.Provider value={contextValue}>
      {children}
    </MobileOptimizationContext.Provider>
  );
};

export const useMobileOptimizationContext = (): MobileOptimizationContextType => {
  const context = useContext(MobileOptimizationContext);
  if (context === undefined) {
    throw new Error('useMobileOptimizationContext must be used within a MobileOptimizationProvider');
  }
  return context;
};
