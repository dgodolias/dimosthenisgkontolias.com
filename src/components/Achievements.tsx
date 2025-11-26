'use client';

import { motion } from 'framer-motion';
import { Trophy, Star, BookOpen, Code, Globe } from 'lucide-react';

const Achievements = () => {
    return (
        <section className="py-24 px-6 sm:px-12 lg:px-24 max-w-5xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-lighter mb-12 text-center">
                    Achievements & Skills
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    <div className="glass-card p-6 rounded-lg text-center hover:border-teal transition-colors duration-300">
                        <Trophy className="w-8 h-8 text-teal mx-auto mb-4" />
                        <h3 className="text-3xl font-bold text-slate-lighter mb-2">9.13/10</h3>
                        <p className="text-slate font-mono text-sm">GPA @ AUEB</p>
                    </div>
                    <div className="glass-card p-6 rounded-lg text-center hover:border-teal transition-colors duration-300">
                        <Star className="w-8 h-8 text-teal mx-auto mb-4" />
                        <h3 className="text-3xl font-bold text-slate-lighter mb-2">Rank #1</h3>
                        <p className="text-slate font-mono text-sm">Panhellenic Admission</p>
                    </div>
                    <div className="glass-card p-6 rounded-lg text-center hover:border-teal transition-colors duration-300">
                        <BookOpen className="w-8 h-8 text-teal mx-auto mb-4" />
                        <h3 className="text-3xl font-bold text-slate-lighter mb-2">19.3/20</h3>
                        <p className="text-slate font-mono text-sm">High School Grade</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                        <h3 className="text-xl font-bold text-slate-lighter mb-6 flex items-center gap-2">
                            <Code className="text-teal" /> Soft Skills
                        </h3>
                        <ul className="grid grid-cols-2 gap-4">
                            {['Problem Solving', 'Project Ownership', 'Adaptability', 'Customer Support'].map((skill, i) => (
                                <li key={i} className="flex items-center gap-2 text-slate">
                                    <span className="text-teal">▹</span> {skill}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-slate-lighter mb-6 flex items-center gap-2">
                            <Globe className="text-teal" /> Languages
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex justify-between items-center text-slate border-b border-slate/10 pb-2">
                                <span>English</span>
                                <span className="font-mono text-teal">C2 (Proficiency)</span>
                            </li>
                            <li className="flex justify-between items-center text-slate border-b border-slate/10 pb-2">
                                <span>German</span>
                                <span className="font-mono text-teal">B2</span>
                            </li>
                            <li className="flex justify-between items-center text-slate border-b border-slate/10 pb-2">
                                <span>Greek</span>
                                <span className="font-mono text-teal">Native</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default Achievements;
