"use client";
import React from 'react';
import Link from 'next/link';
import ThemeSwitch from './ThemeSwitch';
import { GitHubIcon, LinkedInIcon } from './Icons';
import ContactDropdown from './ContactDropdown';

const NavBar = () => {
    return (
        <nav className="absolute top-0 left-0 right-0 w-[60%] h-20 mx-auto z-50 bg-[var(--background)] text-[var(--navbar-options-text)] py-4 px-8 flex items-center justify-between">
        <ul className="flex space-x-2">
        <li className="group px-4 py-2 rounded transition-colors duration-200 hover:bg-[var(--navbar-options-hover)]">
            <Link href="/" className="block w-full h-full">
            About me
            </Link>
        </li>
        <li className="group px-4 py-2 rounded transition-colors duration-200 hover:bg-[var(--navbar-options-hover)]">
            <Link href="/blog" className="block w-full h-full">
            Blog
            </Link>
        </li>
        <ContactDropdown />
        </ul>
        <section className="flex items-center space-2">
        <ThemeSwitch />

        <Link href= "https://github.com/aaronma300604" target="_blank" rel="noopener noreferrer"
        className="px-4 py-2 text-[var(--navbar-options-text)] rounded transition-colors duration-200 hover:bg-[var(--navbar-options-hover)]">
        {GitHubIcon}
        </Link>

        <Link href= "https://www.linkedin.com/in/aarón-mayoral-ansias-5225b6353/" target="_blank" rel="noopener noreferrer"
        className="px-4 py-2 text-[var(--navbar-options-text)] rounded transition-colors duration-200 hover:bg-[var(--navbar-options-hover)]">
        {LinkedInIcon}
        </Link>
        </section>
    </nav>
    );
};

export default NavBar;