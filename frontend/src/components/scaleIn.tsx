'use client'

import { useRef, useEffect, useState, ReactNode } from 'react';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
}

const ScaleIn = ({ children, delay = 0 }: FadeInProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    });

    if (domRef.current) {
      observer.observe(domRef.current);
    }

    return () => {
      if (domRef.current) {
        observer.unobserve(domRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={domRef}
      style={{ transitionDelay: `${delay}ms` }}
      className={`
        transform transition-all duration-1000 ease-out origin-center
        ${isVisible ? 'opacity-100 scale-[100%]' : 'opacity-0 scale-0'}
      `}
    >
      {children}
    </div>
  );
};

export default ScaleIn;