'use client';

import { useEffect, useState } from 'react';

export default function ProgressScrollBar() {
  const [scrollWidth, setScrollWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

      const scrolled = (scrollTop / docHeight) * 100;
      setScrollWidth(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-1/2 right-[2%] transform -translate-y-1/2 w-1.5 h-[100px] bg-[var(--scroll-bar-progressing)] rounded-full overflow-hidden z-50 shadow-md">
      <div
        className="w-full bg-[var(--br-principal)] rounded-full transition-all duration-500 ease-out"
        style={{ height: `${scrollWidth}%` }}
      />
    </div>
  );
}