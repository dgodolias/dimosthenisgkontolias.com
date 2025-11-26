'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Folder, Code, Gamepad2, Database, Globe, Smartphone, Wrench } from 'lucide-react';

type ProjectCategory = 'All' | 'Web Apps' | 'Game Dev' | 'ML & Data' | 'Scraping' | 'Backend' | 'Mobile' | 'Client Sites' | 'Utility';

const categories: ProjectCategory[] = [
    'All', 'Web Apps', 'Game Dev', 'ML & Data', 'Scraping', 'Backend', 'Mobile', 'Client Sites', 'Utility'
];

const projects = [
    // Web Apps
    {
        title: "QuaR",
        description: "Web application with modern frontend technologies. Deployed on Vercel for production use.",
        tech: ["HTML", "JavaScript", "Python", "CSS"],
        links: { external: "https://quar-beta.vercel.app", github: "#" },
        category: "Web Apps"
    },
    {
        title: "torantevoumou",
        description: "Appointment booking platform allowing users to book appointments with professionals quickly and easily.",
        tech: ["JavaScript", "HTML", "CSS", "C#"],
        links: { external: "#", github: "#" },
        category: "Web Apps"
    },
    {
        title: "Tsipster.gr",
        description: "Hybrid web platform. Features 1 star and forks from other users.",
        tech: ["HTML", "Dart", "Python"],
        links: { external: "#", github: "#" },
        category: "Web Apps"
    },
    {
        title: "efood_clone",
        description: "Clone of the popular efood app. Android application for food ordering.",
        tech: ["Java"],
        links: { external: "#", github: "#" },
        category: "Web Apps"
    },
    // Game Dev
    {
        title: "AthensSecret_VR-MR_Game",
        description: "VR/MR game themed around Athens' secrets. Combines web technologies and Unity for immersive experiences.",
        tech: ["JavaScript", "C#", "HTML", "Docker"],
        links: { external: "#", github: "#" },
        category: "Game Dev"
    },
    {
        title: "KitchenChaos",
        description: "Unity cooking game similar to Overcooked. 3D game development with physics and multiplayer mechanics.",
        tech: ["C#", "Mathematica"],
        links: { external: "#", github: "#" },
        category: "Game Dev"
    },
    {
        title: "TrailGame",
        description: "Strategy board game implementation in Java. Features 1 fork.",
        tech: ["Java"],
        links: { external: "#", github: "#" },
        category: "Game Dev"
    },
    {
        title: "Stickyball",
        description: "Initialized project for game development.",
        tech: ["Game Dev"],
        links: { external: "#", github: "#" },
        category: "Game Dev"
    },
    // ML & Data
    {
        title: "Greek_Supreme_Court_Decisions_2024",
        description: "Analysis of Greek Supreme Court decisions for 2024. Data analysis and NLP on Greek legal texts.",
        tech: ["Jupyter Notebook", "Python"],
        links: { external: "#", github: "#" },
        category: "ML & Data"
    },
    {
        title: "ML_GreekLegalDocs",
        description: "Machine Learning pipeline for processing Greek legal documents. Text classification and NLP.",
        tech: ["Python"],
        links: { external: "#", github: "#" },
        category: "ML & Data"
    },
    {
        title: "trading_pattern_recognition",
        description: "Trading pattern recognition using Machine Learning techniques. Financial data analysis and pattern detection.",
        tech: ["Python"],
        links: { external: "#", github: "#" },
        category: "ML & Data"
    },
    {
        title: "HotelCancellationsClustering",
        description: "Clustering analysis for hotel cancellations. Customer segmentation and predictive analytics.",
        tech: ["Jupyter Notebook"],
        links: { external: "#", github: "#" },
        category: "ML & Data"
    },
    // Scraping
    {
        title: "BFS_emailScrcaper",
        description: "Email scraper using Breadth-First Search algorithm. Automated web crawling for email extraction.",
        tech: ["Python"],
        links: { external: "#", github: "#" },
        category: "Scraping"
    },
    {
        title: "aegean_webscraper",
        description: "Web scraper for the University of the Aegean. Automated information extraction from academic sources.",
        tech: ["Python"],
        links: { external: "#", github: "#" },
        category: "Scraping"
    },
    {
        title: "crawl4ai_startups_4internship",
        description: "Web crawler to find startups for internships. Uses crawl4ai framework.",
        tech: ["Python"],
        links: { external: "#", github: "#" },
        category: "Scraping"
    },
    {
        title: "xo_webscraper",
        description: "Web scraper project for data extraction.",
        tech: ["Python"],
        links: { external: "#", github: "#" },
        category: "Scraping"
    },
    {
        title: "prices_scrapper",
        description: "Price monitoring scraper. Automated product price tracking with containerized deployment.",
        tech: ["Python", "HTML", "Docker"],
        links: { external: "#", github: "#" },
        category: "Scraping"
    },
    // Backend
    {
        title: "ElasticSearch_custom_engine",
        description: "Custom search engine based on ElasticSearch. Full-text search implementation with advanced query capabilities.",
        tech: ["Python"],
        links: { external: "#", github: "#" },
        category: "Backend"
    },
    {
        title: "MCP_server",
        description: "Model Context Protocol server implementation. Backend infrastructure for AI integrations.",
        tech: ["TypeScript", "HTML", "Handlebars", "CSS", "Docker"],
        links: { external: "#", github: "#" },
        category: "Backend"
    },
    {
        title: "SciPythia",
        description: "Scientific computing platform. Java backend with web interface.",
        tech: ["Java", "HTML", "CSS"],
        links: { external: "#", github: "#" },
        category: "Backend"
    },
    // Mobile
    {
        title: "JupiterTheaterApp-AI-integrated",
        description: "Android theater app with integrated AI. AI recommendations and booking system.",
        tech: ["Java", "Python"],
        links: { external: "#", github: "#" },
        category: "Mobile"
    },
    {
        title: "karteles_asthenwn",
        description: "Cross-platform mobile app for patient record management. Healthcare management system with Flutter.",
        tech: ["Dart (Flutter)", "C++", "CMake", "Swift"],
        links: { external: "#", github: "#" },
        category: "Mobile"
    },
    // Client Sites
    {
        title: "gkonigeorgia",
        description: "Professional website hosted on GitHub Pages.",
        tech: ["HTML", "CSS", "SCSS", "JavaScript", "PHP"],
        links: { external: "#", github: "#" },
        category: "Client Sites"
    },
    {
        title: "gkontoliasofthalmiatros",
        description: "Ophthalmologist website. Professional medical website on GitHub Pages.",
        tech: ["CSS", "SCSS", "JavaScript", "HTML", "PHP"],
        links: { external: "#", github: "#" },
        category: "Client Sites"
    },
    {
        title: "lainakiswebsite",
        description: "Business website hosted on GitHub Pages.",
        tech: ["HTML", "CSS", "SCSS", "JavaScript", "PHP"],
        links: { external: "#", github: "#" },
        category: "Client Sites"
    },
    {
        title: "salon_de_mayas",
        description: "Hair salon website. Modern responsive design.",
        tech: ["CSS", "HTML", "JavaScript"],
        links: { external: "#", github: "#" },
        category: "Client Sites"
    },
    // Utility
    {
        title: "fatsakarta_Heads-Up-Game",
        description: "Online party game like 'Heads Up'. Real-time multiplayer gameplay.",
        tech: ["Python", "JavaScript", "CSS", "HTML"],
        links: { external: "#", github: "#" },
        category: "Game Dev" // Categorized as Game Dev based on content
    },
    {
        title: "mouse_mover",
        description: "Automatic mouse movement script. Utility tool for system automation.",
        tech: ["Python"],
        links: { external: "#", github: "#" },
        category: "Utility"
    }
];

const getIcon = (category: string) => {
    switch (category) {
        case 'Web Apps': return <Globe className="w-10 h-10 text-teal" />;
        case 'Game Dev': return <Gamepad2 className="w-10 h-10 text-teal" />;
        case 'ML & Data': return <Database className="w-10 h-10 text-teal" />;
        case 'Mobile': return <Smartphone className="w-10 h-10 text-teal" />;
        case 'Backend': return <Code className="w-10 h-10 text-teal" />;
        case 'Utility': return <Wrench className="w-10 h-10 text-teal" />;
        default: return <Folder className="w-10 h-10 text-teal" />;
    }
};

const Projects = () => {
    const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All');

    const filteredProjects = activeCategory === 'All'
        ? projects
        : projects.filter(p => p.category === activeCategory);

    return (
        <section id="projects" className="py-24 px-6 sm:px-12 lg:px-24 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6">
                    <div className="flex items-center gap-4">
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-lighter">
                            <span className="text-teal font-mono mr-2">03.</span>
                            Some Things I’ve Built
                        </h2>
                        <div className="h-px bg-slate/30 w-32 hidden sm:block"></div>
                    </div>

                    {/* Filter Buttons */}
                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-4 py-2 rounded-full text-xs font-mono transition-all duration-300 border ${activeCategory === cat
                                        ? 'bg-teal/10 border-teal text-teal'
                                        : 'bg-transparent border-slate/20 text-slate hover:border-teal/50 hover:text-teal'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    <AnimatePresence>
                        {filteredProjects.map((project, index) => (
                            <motion.div
                                layout
                                key={project.title}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="glass-card p-8 rounded-lg hover:-translate-y-2 transition-all duration-300 flex flex-col h-full group relative overflow-hidden"
                            >
                                {/* Hover Glow Effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-teal/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                <div className="flex justify-between items-center mb-6 relative z-10">
                                    {getIcon(project.category)}
                                    <div className="flex gap-4">
                                        <a href={project.links.github} className="text-slate hover:text-teal transition-colors">
                                            <Github className="w-5 h-5" />
                                        </a>
                                        <a href={project.links.external} className="text-slate hover:text-teal transition-colors">
                                            <ExternalLink className="w-5 h-5" />
                                        </a>
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-slate-lighter mb-2 group-hover:text-teal transition-colors relative z-10">
                                    {project.title}
                                </h3>

                                <div className="text-slate mb-6 text-sm leading-relaxed flex-grow relative z-10">
                                    {project.description}
                                </div>

                                <ul className="flex flex-wrap gap-3 text-xs font-mono text-slate-light mt-auto relative z-10">
                                    {project.tech.map((tech, i) => (
                                        <li key={i} className="bg-teal/5 px-2 py-1 rounded text-teal/80">
                                            {tech}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Projects;
