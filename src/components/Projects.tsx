'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github, Folder } from 'lucide-react';

const projects = [
    {
        title: "Tsipster.gr",
        description: "A personalized betting platform leveraging Artificial Intelligence and Machine Learning algorithms to provide data-driven insights. Built to analyze patterns and offer tailored suggestions.",
        tech: ["AI/ML", "Python", "React", "Data Analysis"],
        links: { external: "#", github: "#" },
        featured: true
    },
    {
        title: "TrailIt",
        description: "A strategic game implementing advanced game theory algorithms (Minimax/Alpha-Beta pruning) similar to Chess/Tic-Tac-Toe. Demonstrates deep understanding of algorithmic thinking and complexity.",
        tech: ["Game Theory", "Algorithms", "Minimax", "Alpha-Beta"],
        links: { external: "#", github: "#" },
        featured: true
    },
    {
        title: "Torantevoumou.gr",
        description: "A comprehensive appointment scheduling platform facilitating client-business connections. Features real-time slot management and user-friendly interfaces.",
        tech: ["SaaS", "React", "Node.js", "Real-time"],
        links: { external: "#", github: "#" },
        featured: true
    },
    {
        title: "AI Document Classification",
        description: "A machine learning project utilizing NLP (Natural Language Processing) to automatically classify and organize documents, streamlining data management workflows.",
        tech: ["NLP", "Machine Learning", "Python"],
        links: { external: "#", github: "#" },
        featured: false
    },
    {
        title: "Android Stickball Game",
        description: "A native Android mobile game showcasing mobile UI/UX principles, touch-event handling, and physics-based game loops.",
        tech: ["Android", "Java/Kotlin", "Physics Engine"],
        links: { external: "#", github: "#" },
        featured: false
    },
    {
        title: "Recipe App",
        description: "A full-stack culinary application featuring complex state management, custom search filtering, and a responsive UI.",
        tech: ["React", "State Management", "API Integration"],
        links: { external: "#", github: "#" },
        featured: false
    }
];

const Projects = () => {
    return (
        <section id="projects" className="py-24 px-6 sm:px-12 lg:px-24 max-w-6xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex items-center gap-4 mb-12">
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-lighter">
                        <span className="text-teal font-mono mr-2">03.</span>
                        Some Things I’ve Built
                    </h2>
                    <div className="h-px bg-slate/30 flex-grow max-w-xs"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="glass-card p-8 rounded-lg hover:-translate-y-2 transition-transform duration-300 flex flex-col h-full group"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <Folder className="w-10 h-10 text-teal" />
                                <div className="flex gap-4">
                                    <a href={project.links.github} className="text-slate hover:text-teal transition-colors">
                                        <Github className="w-5 h-5" />
                                    </a>
                                    <a href={project.links.external} className="text-slate hover:text-teal transition-colors">
                                        <ExternalLink className="w-5 h-5" />
                                    </a>
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-slate-lighter mb-2 group-hover:text-teal transition-colors">
                                {project.title}
                            </h3>

                            <div className="text-slate mb-6 text-sm leading-relaxed flex-grow">
                                {project.description}
                            </div>

                            <ul className="flex flex-wrap gap-3 text-xs font-mono text-slate-light mt-auto">
                                {project.tech.map((tech, i) => (
                                    <li key={i}>{tech}</li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default Projects;
