"use client";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowUpIcon, DiscordIcon, GitHubIcon, LinkedInIcon, MailIcon } from './Icons';

export default function FloatingButtons() {
const [showDropdown, setShowDropdown] = useState(false);
const [showScrollButton, setShowScrollButton] = useState(false);
const dropdownRef = useRef(null);

useEffect(() => {
    const handleScroll = () => {
    if (window.scrollY > 50) {
        setShowScrollButton(true);
    } else {
        setShowScrollButton(false);
    }
    };

    const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
    }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
    window.removeEventListener('scroll', handleScroll);
    document.removeEventListener('mousedown', handleClickOutside);
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

    <div className="relative" ref={dropdownRef}>
        <button 
        onClick={() => setShowDropdown(!showDropdown)} 
        className="w-12 h-12 bg-[var(--buttons-hover)] text-[var(--br-principal)]  rounded-full flex items-center justify-center shadow-lg hover:bg-opacity-90 transition-all"
        aria-label="Contact options"
        aria-expanded={showDropdown}
        >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        </button>
        
        <div 
        className={`absolute bottom-14 left-0 bg-[var(--background)] rounded-lg shadow-lg p-3 w-48 transition-all ${showDropdown ? 'opacity-100 scale-100' : 'opacity-0 scale-0 pointer-events-none'}`}
        >
        <div className="flex flex-col gap-3">
            <Link 
            href="mailto:aaron.mayoral@example.com"
            className="flex items-center gap-3 text-[var(--text)] transition-colors group"
            >
            {MailIcon}
            <span className="group-hover:text-[var(--accent)]">Email</span>
            </Link>
            
            <Link 
            href="https://github.com/aaronma300604"
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-[var(--text)] transition-colors group"
            >
            {GitHubIcon}
            <span className="group-hover:text-[var(--accent)]">GitHub</span>
            </Link>
            
            <Link 
            href="https://www.linkedin.com/in/aarón-mayoral-ansias-5225b6353/"
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-[var(--text)] transition-colors group"
            >
            {LinkedInIcon}
            <span className="group-hover:text-[var(--accent)]">LinkedIn</span>
            </Link>
            
            <Link 
            href="https://discord.com/users/yourusername"
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-[var(--text)] transition-colors group"
            >
                {DiscordIcon}
            <span className="group-hover:text-[var(--accent)]">Discord</span>
            </Link>
        </div>
        </div>
    </div>
    </div>
);
}
