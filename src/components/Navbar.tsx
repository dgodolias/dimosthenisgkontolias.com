'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled
                    ? 'bg-obsidian/80 backdrop-blur-md shadow-lg py-4 border-b border-teal/10'
                    : 'bg-transparent py-6'
                }`}
        >
            <div className="px-6 sm:px-12 lg:px-24 flex justify-between items-center">
                <a href="#" className="text-teal font-mono font-bold text-xl z-50">
                    DG
                </a>

                {/* Desktop Menu */}
                <nav className="hidden md:flex items-center gap-8">
                    <ul className="flex gap-8">
                        {navLinks.map((link, index) => (
                            <li key={index}>
                                <a
                                    href={link.href}
                                    className="text-slate hover:text-teal font-mono text-sm transition-colors"
                                >
                                    <span className="text-teal mr-1">0{index + 1}.</span>
                                    {link.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <a
                        href="/resume.pdf"
                        className="px-4 py-2 border border-teal text-teal rounded text-sm font-mono hover:bg-teal-tint transition-colors"
                    >
                        Resume
                    </a>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-teal z-50"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, x: '100%' }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: '100%' }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 bg-obsidian flex flex-col items-center justify-center md:hidden"
                        >
                            <ul className="flex flex-col gap-8 text-center mb-8">
                                {navLinks.map((link, index) => (
                                    <li key={index}>
                                        <a
                                            href={link.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className="text-slate-lighter text-xl font-mono hover:text-teal transition-colors"
                                        >
                                            <span className="text-teal block text-sm mb-1">0{index + 1}.</span>
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                            <a
                                href="/resume.pdf"
                                className="px-8 py-3 border border-teal text-teal rounded font-mono hover:bg-teal-tint transition-colors"
                            >
                                Resume
                            </a>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
};

export default Navbar;
