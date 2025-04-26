"use client";
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { MailIcon, GitHubIcon, LinkedInIcon, DiscordIcon } from './Icons';

const ContactLink = ({ href, icon, label, external = false }) => {
const linkProps = external ? {
    target: "_blank",
    rel: "noopener noreferrer"
} : {};

return (
    <Link 
    href={href}
    {...linkProps}
    className="flex items-center gap-3 text-[var(--text)] transition-colors group"
    >
    <span className="text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">{icon}</span>
    <span className="group-hover:text-[var(--accent)]">{label}</span>
    </Link>
);
};

export default function ContactDropdown({ floating = false }) {
const [showDropdown, setShowDropdown] = useState(false);
const dropdownRef = useRef(null);

useEffect(() => {
    const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
    }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
    document.removeEventListener('mousedown', handleClickOutside);
    };
}, []);

const handleContactClick = (e) => {
    e.preventDefault();
    setShowDropdown(!showDropdown);
};

const contactLinks = [
{
    href: "mailto:aaron.mayoral@example.com",
    icon: MailIcon,
    label: "Email",
    external: false
},
{
    href: "https://github.com/aaronma300604",
    icon: GitHubIcon,
    label: "GitHub",
    external: true
},
{
    href: "https://www.linkedin.com/in/aarón-mayoral-ansias-5225b6353/",
    icon: LinkedInIcon,
    label: "LinkedIn",
    external: true
},
{
    href: "https://discord.com/users/618820088220483623",
    icon: DiscordIcon,
    label: "Discord",
    external: true
}
];

if (floating) {
    return (
    <div className="relative" ref={dropdownRef}>
        <button 
        onClick={() => setShowDropdown(!showDropdown)} 
        className="w-12 h-12 bg-[var(--buttons-hover)] text-[var(--br-principal)] rounded-full flex items-center justify-center hover:bg-opacity-90 transition-all"
        aria-label="Contact options"
        aria-expanded={showDropdown}
        >
            {MailIcon}
        </button>
        
        <div 
        className={`absolute bottom-14 left-0 bg-[var(--background)] rounded-lg shadow-lg p-3 w-48 transition-all ${showDropdown ? 'opacity-100 scale-100' : 'opacity-0 scale-0 pointer-events-none'}`}
        style={{zIndex: 100}}
        >
        <div className="flex flex-col gap-3">
            {contactLinks.map((link, index) => (
            <ContactLink key={index} {...link} />
            ))}
        </div>
        </div>
    </div>
    );
}

return (
    <li className="px-4 py-2 rounded transition-colors duration-200 hover:bg-[var(--navbar-options-hover)] relative" ref={dropdownRef}>
    <button 
        onClick={handleContactClick} 
        className="block w-full h-full text-left"
        aria-expanded={showDropdown}
        aria-haspopup="true"
    >
        Contact me
    </button>
    
    <div 
        className={`absolute top-full left-0 mt-2 bg-[var(--background)] rounded-lg shadow-lg p-3 w-48 transition-all ${showDropdown ? 'opacity-100 scale-100' : 'opacity-0 scale-0 pointer-events-none'}`}
        style={{zIndex: 100}}
        onClick={(e) => e.stopPropagation()}
    >
        <div className="flex flex-col gap-3">
        {contactLinks.map((link, index) => (
            <ContactLink key={index} {...link} />
        ))}
        </div>
    </div>
    </li>
);
}
