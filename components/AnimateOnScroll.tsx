'use client';

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { ReactNode } from 'react';

interface AnimateOnScrollProps {
  children: ReactNode;
  animation?: 'fade-in-up' | 'fade-in' | 'fade-in-left' | 'fade-in-right' | 'scale-in';
  delay?: number;
  duration?: number;
  className?: string;
}

export function AnimateOnScroll({
  children,
  animation = 'fade-in-up',
  delay = 0,
  duration = 600,
  className = '',
}: AnimateOnScrollProps) {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '0px',
    triggerOnce: true,
  });

  const animationClass = isIntersecting ? 'animate-visible' : 'animate-hidden';

  return (
    <div
      ref={ref}
      className={`${animationClass} ${animation} ${className}`}
      style={{
        animationDelay: `${delay}ms`,
        animationDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  );
}
