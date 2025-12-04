'use client';

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { ReactNode } from 'react';

interface AnimateOnScrollProps {
  children: ReactNode;
  animation?: 'fade-in-up' | 'fade-in' | 'fade-in-left' | 'fade-in-right' | 'scale-in';
  delay?: number;
  duration?: number;
  className?: string;
  /** Set to true for above-the-fold content to improve FCP - content starts visible */
  initiallyVisible?: boolean;
}

export function AnimateOnScroll({
  children,
  animation = 'fade-in-up',
  delay = 0,
  duration = 600,
  className = '',
  initiallyVisible = false,
}: AnimateOnScrollProps) {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '0px',
    triggerOnce: true,
  });

  // For above-the-fold content (initiallyVisible=true), start visible to improve FCP
  // Content is visible immediately, animation plays when IntersectionObserver fires
  const animationClass = initiallyVisible 
    ? (isIntersecting ? `animate-visible ${animation}` : '') 
    : (isIntersecting ? 'animate-visible' : 'animate-hidden');

  return (
    <div
      ref={ref}
      className={`${animationClass} ${!initiallyVisible ? animation : ''} ${className}`}
      style={{
        animationDelay: `${delay}ms`,
        animationDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  );
}
