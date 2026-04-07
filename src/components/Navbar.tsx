'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Lock body and html scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            document.documentElement.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
            document.documentElement.style.overflow = 'unset';
        };
    }, [isMenuOpen]);

    const navLinks = [
        { name: 'About', href: '#about' },
        { name: 'Experience', href: '#experience' },
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '#contact' },
    ];

    const navLinkVariants: Variants = {
        hidden: { opacity: 0, y: -20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.5,
                ease: "easeOut"
            }
        })
    };

    const mobileMenuVariants: Variants = {
        hidden: { opacity: 0, x: '100%' },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.3,
                ease: "easeInOut",
                when: "beforeChildren",
                staggerChildren: 0.1
            }
        },
        exit: {
            opacity: 0,
            x: '100%',
            transition: {
                duration: 0.3,
                ease: "easeInOut"
            }
        }
    };

    const mobileLinkVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    return (
        <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-obsidian/90 backdrop-blur-md shadow-lg py-4' : 'bg-transparent py-6'}`}>
            <div className="px-6 sm:px-12 lg:px-24 flex justify-between items-center">
                <a href="#" className="z-50 relative group">
                    <div className="absolute inset-0 bg-teal blur-[20px] opacity-50 group-hover:opacity-80 transition-opacity duration-300 rounded-full"></div>
                    <img
                        src="/images/logo.png"
                        alt="DG Logo"
                        className="w-12 h-12 relative z-10 object-contain drop-shadow-[0_0_10px_rgba(100,255,218,0.5)]"
                    />
                </a>

                {/* Desktop Menu */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link, index) => (
                        <motion.a
                            key={link.name}
                            href={link.href}
                            className="text-slate hover:text-teal transition-colors duration-300 font-mono text-sm"
                            custom={index}
                            initial="hidden"
                            animate="visible"
                            variants={navLinkVariants}
                        >
                            {link.name}
                        </motion.a>
                    ))}
                    <motion.a
                        href="/resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 border border-teal text-teal rounded hover:bg-teal-tint transition-all duration-300 font-mono text-sm"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                    >
                        Resume
                    </motion.a>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden z-50 text-teal relative"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
                </button>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            className="fixed inset-0 bg-obsidian/95 backdrop-blur-xl z-[60] flex flex-col items-center justify-center h-screen w-screen touch-none"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={mobileMenuVariants}
                        >
                            <div className="flex flex-col items-center gap-8">
                                {navLinks.map((link) => (
                                    <motion.a
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="text-slate-lighter text-4xl font-bold tracking-tight hover:text-teal transition-colors duration-300"
                                        variants={mobileLinkVariants}
                                    >
                                        {link.name}
                                    </motion.a>
                                ))}
                                <motion.a
                                    href="/resume.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-8 px-12 py-4 border-2 border-teal text-teal text-xl font-mono rounded hover:bg-teal-tint transition-all duration-300"
                                    variants={mobileLinkVariants}
                                >
                                    Resume
                                </motion.a>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
};

export default Navbar;
