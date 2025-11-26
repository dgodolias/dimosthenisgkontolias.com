'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const experiences = [
    {
        company: "Dalia Labs FZE LLC",
        role: "Software Developer (Intern)",
        location: "Dubai",
        period: "July 2025 - Sept 2025",
        description: [
            "Contributed to software development projects in a fast-paced environment.",
            "Collaborated with cross-functional teams to deliver high-quality code.",
            "Gained hands-on experience with modern development tools and practices."
        ]
    },
    {
        company: "VR-Game by Moptil",
        role: "Backend Developer",
        location: "Athens",
        period: "Aug 2025 - Oct 2025",
        description: [
            "Developed and maintained backend services for VR gaming applications.",
            "Optimized database queries and API endpoints for performance.",
            "Ensured seamless integration between frontend and backend systems."
        ]
    },
    {
        company: "Freelance / Doctors",
        role: "Software/Website Developer",
        location: "Remote",
        period: "May 2024 - Present",
        description: [
            "Designed and developed websites for medical professionals.",
            "Implemented booking systems and patient management features.",
            "Provided ongoing maintenance and technical support."
        ]
    },
    {
        company: "Various",
        role: "Non-Tech Roles",
        location: "Various",
        period: "Previous",
        description: [
            "Factory Worker: Developed strong work ethic and attention to detail.",
            "Service Industry: Honed communication and customer service skills.",
            "Demonstrated reliability and adaptability in diverse work environments."
        ]
    }
];

const Experience = () => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <section id="experience" className="py-24 px-6 sm:px-12 lg:px-24 max-w-4xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex items-center gap-4 mb-12">
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-lighter">
                        <span className="text-teal font-mono mr-2">02.</span>
                        Where I’ve Worked
                    </h2>
                    <div className="h-px bg-slate/30 flex-grow max-w-xs"></div>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                    {/* Tab List */}
                    <div className="flex md:flex-col overflow-x-auto md:overflow-visible border-b md:border-b-0 md:border-l border-slate/30 min-w-max relative">
                        {experiences.map((exp, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveTab(index)}
                                className={`px-4 py-3 text-left font-mono text-sm transition-all duration-300 hover:bg-teal-tint/50 hover:text-teal relative z-10
                  ${activeTab === index
                                        ? 'text-teal bg-teal-tint/10'
                                        : 'text-slate'
                                    }
                `}
                            >
                                {exp.company}
                            </button>
                        ))}
                        {/* Active Indicator */}
                        <motion.div
                            className="absolute bg-teal transition-all duration-300"
                            layoutId="activeTabIndicator"
                            initial={false}
                            animate={{
                                top: window.innerWidth >= 768 ? activeTab * 44 : 'auto',
                                height: window.innerWidth >= 768 ? 44 : 2,
                                left: window.innerWidth >= 768 ? -2 : activeTab * 120, // Approximate width for mobile
                                width: window.innerWidth >= 768 ? 2 : 120, // Approximate width for mobile
                                bottom: window.innerWidth >= 768 ? 'auto' : 0
                            }}
                        />
                    </div>

                    {/* Tab Content */}
                    <div className="py-2 md:px-4 min-h-[300px] w-full">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <h3 className="text-xl font-bold text-slate-lighter mb-1">
                                    {experiences[activeTab].role} <span className="text-teal">@ {experiences[activeTab].company}</span>
                                </h3>
                                <p className="text-sm font-mono text-slate mb-6">
                                    {experiences[activeTab].period} | {experiences[activeTab].location}
                                </p>
                                <ul className="space-y-4">
                                    {experiences[activeTab].description.map((item, i) => (
                                        <li key={i} className="flex items-start gap-2 text-slate">
                                            <span className="text-teal mt-1.5">▹</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default Experience;
