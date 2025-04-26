import Link from 'next/link';
import { GitHubIcon, LinkedInIcon } from './Icons';
import { MailIcon, DiscordIcon } from './Icons';

export default function Footer() {
return (
    <footer className="relative z-10 bg-[var(--footer-background)] text-[var(--footer-text)] py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-lg font-semibold mb-4">Contact me</h3>
                    <ul className="space-y-3">
                        <li className="flex items-center">
                            {MailIcon}
                            <Link href="mailto:aaronmayoralansias@gmail.com" className="hover:text-[var(--accent)] ml-2">
                                aaronmayoralansias@gmail.com
                            </Link>
                        </li>
                        <li className="flex items-center">
                            {DiscordIcon}
                            <Link href="https://discord.com/users/618820088220483623" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)] ml-2">
                                Roth
                            </Link>
                        </li>
                        <li className="flex items-center">
                            {LinkedInIcon}
                            <Link href="https://www.linkedin.com/in/aarón-mayoral-ansias-5225b6353/" target="_blank" rel="noopener noreferrer" className="ml-2 hover:text-[var(--accent)]">
                                LinkedIn
                            </Link>
                        </li>
                        <li className="flex items-center">
                            {GitHubIcon}
                            <Link href="https://github.com/aaronma300604" target="_blank" rel="noopener noreferrer" className="ml-2 hover:text-[var(--accent)]">
                                GitHub
                            </Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-4">Explore</h3>
                    <ul className="space-y-2">
                        <li>
                            <Link href="/" className="hover:text-[var(--accent)]">
                                About me
                            </Link>
                        </li>
                        <li>
                            <Link href="/blog" className="hover:text-[var(--accent)]">
                                Blog
                            </Link>
                        </li>
                        <li>
                            <Link href="/blog/all-posts" className="hover:text-[var(--accent)]">
                                All my posts
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="mt-8 pt-6 border-t border-[var(--border)] text-center text-sm">
                <p>© {new Date().getFullYear()} Roth. All rights reserved.</p>
            </div>
        </div>
    </footer>
);
}
