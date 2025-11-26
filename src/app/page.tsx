import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Achievements from "@/components/Achievements";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-obsidian selection:bg-teal-tint selection:text-teal">
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Achievements />
      <Contact />
    </main>
  );
}
