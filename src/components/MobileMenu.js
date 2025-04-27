"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { GitHubIcon, LinkedInIcon, DiscordIcon } from './Icons';
import ThemeSwitch from './ThemeSwitch';

const MobileMenu = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    // Close mobile menu when window is resized to desktop size
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768 && mobileMenuOpen) {
                setMobileMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [mobileMenuOpen]);

    // Close mobile menu when scrolling
    useEffect(() => {
        const handleScroll = () => {
            if (mobileMenuOpen) {
                setMobileMenuOpen(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [mobileMenuOpen]);

    const handleNavLinkClick = () => {
        setMobileMenuOpen(false);
    };

    return (
        <>
            {/* Mobile Navbar */}
            <nav className="md:hidden fixed top-0 left-0 w-full z-50 bg-[var(--background)] text-[var(--navbar-options-text)] py-4 px-6 flex justify-between items-center shadow-md">
                <Link href="/" className="flex items-center">
                    <Image 
                        src="/favicon.ico" 
                        alt="Website Logo" 
                        width={25} 
                        height={25} 
                        className="rounded-sm filter brightness-0 invert opacity-75 text-[var(--navbar-options-text)]"
                        style={{ filter: 'var(--navbar-icon-filter)' }}
                    />
                    <span className="ml-2 font-medium">Roth</span>
                </Link>

                <div className="flex items-center">
                    <ThemeSwitch />
                    <button 
                        onClick={toggleMobileMenu} 
                        className="ml-2 p-2 text-[var(--navbar-options-text)] rounded-md hover:bg-[var(--navbar-options-hover)]"
                        aria-label="Toggle menu"
                        aria-expanded={mobileMenuOpen}
                    >
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor" 
                            className="w-6 h-6"
                        >
                            {mobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Dropdown */}
            <div 
                className={`md:hidden fixed top-[60px] left-0 w-full bg-[var(--background)] z-40 shadow-lg transform transition-all duration-300 ease-in-out ${
                    mobileMenuOpen 
                        ? 'opacity-100 translate-y-0 max-h-[400px]' 
                        : 'opacity-0 -translate-y-full max-h-0 overflow-hidden'
                }`}
            >
                <ul className="flex flex-col p-4 space-y-3">
                    <li className="py-2 px-3 rounded hover:bg-[var(--navbar-options-hover)]">
                        <Link href="/" className="block w-full" onClick={handleNavLinkClick}>
                            About me
                        </Link>
                    </li>
                    <li className="py-2 px-3 rounded hover:bg-[var(--navbar-options-hover)]">
                        <Link href="/blog" className="block w-full" onClick={handleNavLinkClick}>
                            Blog
                        </Link>
                    </li>
                    <li className="py-2 px-3 rounded hover:bg-[var(--navbar-options-hover)]">
                        <div className="flex flex-col">
                            <span className="font-medium mb-2">Contact me</span>
                            <div className="flex gap-4 ml-2 mt-1">
                                <Link href="mailto:aaronmayoralansias@gmail.com" className="hover:text-[var(--accent)]" onClick={handleNavLinkClick}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                    </svg>
                                </Link>
                                <Link href="https://github.com/aaronma300604" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)]" onClick={handleNavLinkClick}>
                                    {GitHubIcon}
                                </Link>
                                <Link href="https://www.linkedin.com/in/aarón-mayoral-ansias-5225b6353/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)]" onClick={handleNavLinkClick}>
                                    {LinkedInIcon}
                                </Link>
                                <Link href="https://discord.com/users/618820088220483623" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)]" onClick={handleNavLinkClick}>
                                    {DiscordIcon}
                                </Link>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            
            {/* Overlay for clicking outside mobile menu to close it */}
            {mobileMenuOpen && (
                <div 
                    className="md:hidden fixed inset-0 bg-transparent backdrop-blur-lg z-30"
                    onClick={toggleMobileMenu}
                    aria-hidden="true"
                ></div>
            )}
        </>
    );
};

export default MobileMenu;