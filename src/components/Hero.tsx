'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';

const Hero = () => {
    return (
        <section className="min-h-screen flex items-center justify-center px-6 sm:px-12 lg:px-24 pt-20 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-1/4 right-10 w-64 h-64 bg-teal/5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-slate/5 rounded-full blur-3xl animate-pulse delay-1000"></div>

            <div className="max-w-5xl w-full z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <h2 className="text-teal font-mono text-lg mb-6 tracking-wide">Hi, my name is</h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <h1 className="text-slate-lighter text-6xl sm:text-8xl font-bold mb-4 tracking-tight leading-tight">
                        Dimosthenis <br className="sm:hidden" />
                        <span className="text-gradient glow-text">Gkontolias.</span>
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <h2 className="text-slate text-4xl sm:text-6xl font-bold mb-8 tracking-tight opacity-80">
                        Turning stubbornness into <br className="hidden sm:block" /> software solutions.
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="max-w-xl"
                >
                    <p className="text-slate text-lg mb-12 leading-relaxed">
                        I’m a Software Engineer, Problem Solver, and Innovator based in Athens.
                        Currently specializing in building exceptional digital experiences that live on the internet.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="flex flex-col sm:flex-row gap-6"
                >
                    <a
                        href="#projects"
                        className="group px-8 py-4 border border-teal text-teal rounded hover:bg-teal-tint transition-all duration-300 flex items-center justify-center gap-2 font-mono text-sm relative overflow-hidden"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            View Projects
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-teal/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    </a>
                    <a
                        href="mailto:dgodolias18@gmail.com"
                        className="px-8 py-4 border border-slate text-slate rounded hover:bg-slate-light/10 transition-all duration-300 flex items-center justify-center gap-2 font-mono text-sm"
                    >
                        Contact Me
                        <Mail className="w-4 h-4" />
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
