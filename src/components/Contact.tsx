'use client';

import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, ArrowUp } from 'lucide-react';

const Contact = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <section id="contact" className="py-24 px-6 sm:px-12 lg:px-24 max-w-4xl mx-auto text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <p className="text-teal font-mono mb-4">04. What’s Next?</p>
                <h2 className="text-4xl sm:text-5xl font-bold text-slate-lighter mb-6">Get In Touch</h2>
                <p className="text-slate text-lg mb-12 max-w-xl mx-auto">
                    I’m currently looking for new opportunities. Whether you have a question or just want to say hi,
                    I’ll try my best to get back to you!
                </p>

                <a
                    href="mailto:dgodolias18@gmail.com"
                    className="inline-flex items-center gap-2 px-8 py-4 border border-teal text-teal rounded hover:bg-teal-tint transition-colors duration-300 mb-24"
                >
                    <Mail className="w-5 h-5" />
                    Say Hello
                </a>

                <footer className="flex flex-col items-center gap-6">
                    <div className="flex gap-6">
                        <a href="#" className="text-slate hover:text-teal hover:-translate-y-1 transition-all duration-300">
                            <Github className="w-6 h-6" />
                        </a>
                        <a href="#" className="text-slate hover:text-teal hover:-translate-y-1 transition-all duration-300">
                            <Linkedin className="w-6 h-6" />
                        </a>
                    </div>

                    <p className="text-slate font-mono text-xs">
                        Designed & Built by Dimosthenis Gkontolias
                    </p>

                    <button
                        onClick={scrollToTop}
                        className="p-2 text-teal hover:-translate-y-1 transition-transform duration-300"
                        aria-label="Scroll to top"
                    >
                        <ArrowUp className="w-6 h-6" />
                    </button>
                </footer>
            </motion.div>
        </section>
    );
};

export default Contact;
