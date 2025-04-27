import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ThemeSwitch from './ThemeSwitch';
import { GitHubIcon, LinkedInIcon } from './Icons';
import ContactDropdown from './ContactDropdown';
import MobileMenu from './MobileMenu';

const NavBar = () => {
    return (
        <>
            {/* Desktop Navbar */}
            <nav className="hidden md:flex absolute top-0 left-0 right-0 w-[60%] h-20 mx-auto z-50 bg-[var(--background)] text-[var(--navbar-options-text)] py-4 px-8 items-center justify-between">
                <div className="flex items-center">
                    <Link href="/" className="mr-4">
                        <Image 
                            src="/favicon.ico" 
                            alt="Website Logo" 
                            width={30} 
                            height={30} 
                            className="rounded-sm filter brightness-0 invert opacity-75 text-[var(--navbar-options-text)]"
                            style={{ filter: 'var(--navbar-icon-filter)' }}
                        />
                    </Link>
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
                </div>
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

            {/* Mobile Menu (Client Component) */}
            <MobileMenu />
        </>
    );
};

export default NavBar;