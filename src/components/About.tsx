'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const About = () => {
    return (
        <section id="about" className="py-24 px-6 sm:px-12 lg:px-24 max-w-5xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex flex-col md:flex-row gap-12 items-center"
            >
                <div className="md:w-2/3">
                    <div className="flex items-center gap-4 mb-8">
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-lighter">
                            <span className="text-teal font-mono mr-2">01.</span>
                            About Me
                        </h2>
                        <div className="h-px bg-slate/30 flex-grow max-w-xs"></div>
                    </div>

                    <div className="text-slate space-y-4 text-lg leading-relaxed">
                        <p>
                            I’m a stubborn person in the best way possible. Whatever I set my mind to, I see it through.
                        </p>
                        <p>
                            Currently in my final year at <span className="text-teal">Athens University of Economics and Business</span> (GPA 9.13/10),
                            I love experimenting with new technologies. My goal is to build my own business and run it with my own vision.
                        </p>
                        <p>
                            I enjoy bridging the gap between engineering and design — combining my technical knowledge with my keen eye for design
                            to create a beautiful product.
                        </p>
                    </div>
                </div>

                <div className="md:w-1/3 relative group">
                    <div className="relative w-64 h-64 rounded-lg overflow-hidden z-10">
                        <Image
                            src="/images/profile.png"
                            alt="Dimosthenis Gkontolias"
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
                        />
                        <div className="absolute inset-0 bg-teal/20 hover:bg-transparent transition-colors duration-300"></div>
                    </div>
                    <div className="absolute top-4 left-4 w-64 h-64 border-2 border-teal rounded-lg z-0 group-hover:top-3 group-hover:left-3 transition-all duration-300"></div>
                </div>
            </motion.div>
        </section>
    );
};

export default About;
