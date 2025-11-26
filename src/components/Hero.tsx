'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';

const Hero = () => {
    return (
        <section className="min-h-screen flex items-center justify-center px-6 sm:px-12 lg:px-24 pt-20">
            <div className="max-w-4xl w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <h2 className="text-teal font-mono text-lg mb-4">Hi, my name is</h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <h1 className="text-slate-lighter text-5xl sm:text-7xl font-bold mb-4 tracking-tight">
                        Dimosthenis Gkontolias.
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <h2 className="text-slate text-4xl sm:text-6xl font-bold mb-6 tracking-tight">
                        Turning stubbornness into software solutions.
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="max-w-xl"
                >
                    <p className="text-slate text-lg mb-10 leading-relaxed">
                        I’m a Software Engineer, Problem Solver, and Innovator based in Athens.
                        Currently specializing in building exceptional digital experiences.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="flex flex-col sm:flex-row gap-4"
                >
                    <a
                        href="#projects"
                        className="group px-8 py-4 border border-teal text-teal rounded hover:bg-teal-tint transition-colors duration-300 flex items-center justify-center gap-2"
                    >
                        View Projects
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                    <a
                        href="mailto:dgodolias18@gmail.com"
                        className="px-8 py-4 border border-slate text-slate rounded hover:bg-slate-light/10 transition-colors duration-300 flex items-center justify-center gap-2"
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
