"use client";

import { useState, useCallback, useRef, useEffect } from 'react';

interface GestureState {
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  deltaX: number;
  deltaY: number;
  isDragging: boolean;
  direction: 'left' | 'right' | 'up' | 'down' | null;
  velocity: number;
}

interface GestureActions {
  handleTouchStart: (e: React.TouchEvent) => void;
  handleTouchMove: (e: React.TouchEvent) => void;
  handleTouchEnd: (e: React.TouchEvent) => void;
  handleSwipeLeft: () => void;
  handleSwipeRight: () => void;
  handleSwipeUp: () => void;
  handleSwipeDown: () => void;
  resetGesture: () => void;
}

interface UseMobileGesturesOptions {
  swipeThreshold?: number;
  velocityThreshold?: number;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  preventDefault?: boolean;
}

export const useMobileGestures = (options: UseMobileGesturesOptions = {}): GestureState & GestureActions => {
  const {
    swipeThreshold = 50,
    velocityThreshold = 0.3,
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    preventDefault = true,
  } = options;

  const [gestureState, setGestureState] = useState<GestureState>({
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
    deltaX: 0,
    deltaY: 0,
    isDragging: false,
    direction: null,
    velocity: 0,
  });

  const startTimeRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const lastXRef = useRef<number>(0);
  const lastYRef = useRef<number>(0);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (preventDefault && e.cancelable) {
      try {
        e.preventDefault();
      } catch (error) {
        console.warn('Unable to preventDefault in touch event:', error);
      }
    }

    const touch = e.touches[0];
    const now = Date.now();

    setGestureState(prev => ({
      ...prev,
      startX: touch.clientX,
      startY: touch.clientY,
      currentX: touch.clientX,
      currentY: touch.clientY,
      deltaX: 0,
      deltaY: 0,
      isDragging: true,
      direction: null,
      velocity: 0,
    }));

    startTimeRef.current = now;
    lastTimeRef.current = now;
    lastXRef.current = touch.clientX;
    lastYRef.current = touch.clientY;
  }, [preventDefault]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!gestureState.isDragging) return;

    if (preventDefault && e.cancelable) {
      try {
        e.preventDefault();
      } catch (error) {
        console.warn('Unable to preventDefault in touch move event:', error);
      }
    }

    const touch = e.touches[0];
    const now = Date.now();
    const deltaTime = now - lastTimeRef.current;

    const deltaX = touch.clientX - lastXRef.current;
    const deltaY = touch.clientY - lastYRef.current;
    const velocity = deltaTime > 0 ? Math.sqrt(deltaX * deltaX + deltaY * deltaY) / deltaTime : 0;

    let direction: 'left' | 'right' | 'up' | 'down' | null = null;
    const absDeltaX = Math.abs(touch.clientX - gestureState.startX);
    const absDeltaY = Math.abs(touch.clientY - gestureState.startY);

    if (absDeltaX > absDeltaY) {
      direction = touch.clientX > gestureState.startX ? 'right' : 'left';
    } else if (absDeltaY > absDeltaX) {
      direction = touch.clientY > gestureState.startY ? 'down' : 'up';
    }

    setGestureState(prev => ({
      ...prev,
      currentX: touch.clientX,
      currentY: touch.clientY,
      deltaX: touch.clientX - prev.startX,
      deltaY: touch.clientY - prev.startY,
      direction,
      velocity,
    }));

    lastTimeRef.current = now;
    lastXRef.current = touch.clientX;
    lastYRef.current = touch.clientY;
  }, [gestureState.isDragging, gestureState.startX, gestureState.startY, preventDefault]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!gestureState.isDragging) return;

    if (preventDefault && e.cancelable) {
      try {
        e.preventDefault();
      } catch (error) {
        console.warn('Unable to preventDefault in touch end event:', error);
      }
    }

    const { deltaX, deltaY, direction, velocity } = gestureState;
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);

    // Check if it's a valid swipe
    if (velocity > velocityThreshold && (absDeltaX > swipeThreshold || absDeltaY > swipeThreshold)) {
      switch (direction) {
        case 'left':
          handleSwipeLeft();
          break;
        case 'right':
          handleSwipeRight();
          break;
        case 'up':
          handleSwipeUp();
          break;
        case 'down':
          handleSwipeDown();
          break;
      }
    }

    // Reset gesture state
    setGestureState(prev => ({
      ...prev,
      isDragging: false,
    }));
  }, [gestureState, velocityThreshold, swipeThreshold, preventDefault]);

  const handleSwipeLeft = useCallback(() => {
    onSwipeLeft?.();
  }, [onSwipeLeft]);

  const handleSwipeRight = useCallback(() => {
    onSwipeRight?.();
  }, [onSwipeRight]);

  const handleSwipeUp = useCallback(() => {
    onSwipeUp?.();
  }, [onSwipeUp]);

  const handleSwipeDown = useCallback(() => {
    onSwipeDown?.();
  }, [onSwipeDown]);

  const resetGesture = useCallback(() => {
    setGestureState({
      startX: 0,
      startY: 0,
      currentX: 0,
      currentY: 0,
      deltaX: 0,
      deltaY: 0,
      isDragging: false,
      direction: null,
      velocity: 0,
    });
  }, []);

  return {
    ...gestureState,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleSwipeLeft,
    handleSwipeRight,
    handleSwipeUp,
    handleSwipeDown,
    resetGesture,
  };
};
