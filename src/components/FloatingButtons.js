"use client";
import { useState, useEffect } from 'react';
import { ArrowUpIcon } from './Icons';
import ContactDropdown from './ContactDropdown';

export default function FloatingButtons() {
const [showScrollButton, setShowScrollButton] = useState(false);

useEffect(() => {
    const handleScroll = () => {
    if (window.scrollY > 50) {
        setShowScrollButton(true);
    } else {
        setShowScrollButton(false);
    }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
    window.removeEventListener('scroll', handleScroll);
    };
}, []);

const scrollToTop = () => {
    window.scrollTo({
    top: 0,
    behavior: 'smooth'
    });
};

return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-3">
    <button 
        onClick={scrollToTop} 
        className={`w-12 h-12 bg-[var(--buttons-hover)] text-[var(--br-principal)] rounded-full flex items-center justify-center shadow-lg hover:bg-opacity-90 transition-all transform ${showScrollButton ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
        aria-label="Scroll to top"
    >
        {ArrowUpIcon}
    </button>

    <div className="w-12 h-12 rounded-full bg-[var(--buttons-hover)] shadow-lg flex items-center justify-center overflow-visible">
        <ContactDropdown floating={true} />
    </div>
    </div>
);
}
