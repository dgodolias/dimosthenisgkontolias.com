import Image from "next/image";
import type { ReactNode } from "react";
import {
  ArrowDownToLine,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  MessageCircle,
  Play,
} from "lucide-react";

import { MobileNavigation } from "@/components/MobileNavigation";
import {
  ProjectOrbit,
  type OrbitProject,
} from "@/components/ProjectOrbit";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  achievements,
  experiences,
  faqs,
  featuredProjects,
  operatingPrinciples,
  profile,
  projectShelf,
  proofMetrics,
  skillGroups,
  socialProfiles,
  type Project,
} from "@/data/portfolio";
import { cn } from "@/lib/utils";

const siteUrl = "https://dimosthenisgkontolias.com";

const navItems = [
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Creator", href: "#creator" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const allProjects = [...featuredProjects, ...projectShelf];

function projectById(id: string) {
  const project = allProjects.find((item) => item.id === id);

  if (!project) {
    throw new Error(`Missing portfolio project: ${id}`);
  }

  return project;
}

const talkToGreekData = projectById("project-talktogreekdata");
const quar = projectById("project-quar");
const supportingProjects = allProjects.filter(
  (project) => project.id !== talkToGreekData.id && project.id !== quar.id,
);

const orbitProjects: OrbitProject[] = [
  {
    id: "project-talktogreekdata",
    title: "TalkToGreekData",
    signal: "AI product",
    proof:
      "A conversational analysis surface that turns Greek economic datasets into streamed answers and visual evidence.",
    metrics: ["23k+ data points", "207 metrics", "12 chart types"],
    href: "#project-talktogreekdata",
    action: "Inspect AI proof",
    accent: "#78d8e8",
    texture: "/images/projects/dataviz.webp",
    kind: "screen",
  },
  {
    id: "project-quar",
    title: "Quar.gr",
    signal: "Production SaaS",
    proof:
      "A founder-built QR menu platform that has to keep working for real cafes after the demo ends.",
    metrics: ["10+ cafes live", "300+ commits", "Founder-built"],
    href: "#project-quar",
    action: "Inspect product proof",
    accent: "#f0a123",
    texture: "/images/projects/quar.webp",
    kind: "screen",
  },
  {
    id: "project-tracksights",
    title: "TrackSights",
    signal: "Data engineering",
    proof:
      "Provider pipelines, canonical schemas, cloud warehouse work, and modeling over European automotive data.",
    metrics: ["785k listings", "71 features", "R² 0.946"],
    href: "#project-tracksights",
    action: "Inspect data proof",
    accent: "#83aef5",
    kind: "data",
  },
  {
    id: "project-demos-vibes",
    title: "Demos Vibes",
    signal: "Distribution",
    proof:
      "A public AI education loop where every short demo leads to a reusable, searchable technical resource.",
    metrics: ["Greek AI demos", "Resource hub", "Build + explain"],
    href: "#project-demos-vibes",
    action: "Inspect creator proof",
    accent: "#e77c5d",
    texture: "/images/projects/demosvibes.webp",
    kind: "screen",
  },
];

function absoluteUrl(href: string) {
  return href.startsWith("http") ? href : `${siteUrl}${href}`;
}

function publicProjectUrl(project: Project) {
  return project.links.find((link) => link.href.startsWith("http"))?.href ?? siteUrl;
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: profile.name,
      jobTitle: ["AI Software Engineer", "Software Engineer", "Product Engineer"],
      email: `mailto:${profile.email}`,
      contactPoint: [
        {
          "@type": "ContactPoint",
          email: profile.email,
          contactType: "recruiting",
          areaServed: "Europe",
          availableLanguage: ["Greek", "English", "German"],
        },
      ],
      url: siteUrl,
      image: `${siteUrl}/images/profile-hero.jpeg`,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Athens",
        addressCountry: "GR",
      },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Athens University of Economics and Business",
      },
      award: achievements.map((achievement) => `${achievement.title}: ${achievement.value}`),
      sameAs: [
        profile.githubHref,
        profile.linkedinHref,
        ...socialProfiles.map((social) => social.href),
      ],
      knowsAbout: [
        "AI Software Engineering",
        "Retrieval-Augmented Generation",
        "Software Engineering",
        "Data Engineering",
        "React",
        "TypeScript",
        "Python",
        "FastAPI",
        "Product Engineering",
      ],
      knowsLanguage: ["Greek", "English", "German"],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: "Dimosthenis Gkontolias — AI Software Engineer",
      url: siteUrl,
      inLanguage: "en",
      description: profile.headline,
      author: { "@id": `${siteUrl}/#person` },
    },
    {
      "@type": "ProfilePage",
      "@id": `${siteUrl}/#profile-page`,
      name: `${profile.name} — AI Software Engineer Portfolio`,
      url: siteUrl,
      inLanguage: "en",
      isPartOf: { "@id": `${siteUrl}/#website` },
      mainEntity: { "@id": `${siteUrl}/#person` },
      about: profile.headline,
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/#faq`,
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
    {
      "@type": "ItemList",
      "@id": `${siteUrl}/#projects`,
      name: "Selected AI and software projects by Dimosthenis Gkontolias",
      itemListElement: allProjects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          name: project.title,
          description: project.summary,
          url: publicProjectUrl(project),
          image: project.image ? absoluteUrl(project.image.src) : undefined,
          keywords: project.stack.join(", "),
          creator: { "@id": `${siteUrl}/#person` },
        },
      })),
    },
  ],
};

const accentStyles: Record<Project["accent"], string> = {
  coral: "bg-coral text-ink",
  leaf: "bg-signal text-ink",
  lilac: "bg-lilac text-ink",
  sky: "bg-ice text-ink",
  sun: "bg-sun text-ink",
};

function externalRel(href: string) {
  return href.startsWith("mailto:") || href.startsWith("/") || href.startsWith("#")
    ? undefined
    : "noopener noreferrer";
}

function externalTarget(href: string) {
  return href.startsWith("mailto:") || href.startsWith("/") || href.startsWith("#")
    ? undefined
    : "_blank";
}

function Eyebrow({
  children,
  dark = false,
}: {
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 font-mono text-[0.69rem] font-semibold uppercase tracking-[0.18em]",
        dark ? "text-signal" : "text-forest",
      )}
    >
      <span
        aria-hidden="true"
        className={cn("h-px w-7", dark ? "bg-signal" : "bg-forest")}
      />
      {children}
    </p>
  );
}

function ActionLink({
  href,
  children,
  variant = "primary",
  className,
  download,
  newTab = false,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "dark" | "quiet";
  className?: string;
  download?: boolean;
  newTab?: boolean;
}) {
  return (
    <a
      href={href}
      target={newTab ? "_blank" : externalTarget(href)}
      rel={newTab ? "noopener noreferrer" : externalRel(href)}
      download={download}
      className={cn(
        "action-link focus-ring",
        variant === "primary" && "action-link-primary",
        variant === "outline" && "action-link-outline",
        variant === "dark" && "action-link-dark",
        variant === "quiet" && "action-link-quiet",
        className,
      )}
    >
      {children}
    </a>
  );
}

function IconLink({
  href,
  label,
  children,
  inverse = false,
}: {
  href: string;
  label: string;
  children: ReactNode;
  inverse?: boolean;
}) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <a
            href={href}
            target={externalTarget(href)}
            rel={externalRel(href)}
            aria-label={label}
            className={cn(
              "inline-flex size-11 items-center justify-center border transition focus-ring",
              inverse
                ? "border-white/20 text-paper hover:border-signal hover:bg-signal hover:text-ink"
                : "border-ink/15 bg-paper text-ink hover:border-forest hover:bg-forest hover:text-paper",
            )}
          />
        }
      >
        {children}
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}

function Header() {
  return (
    <header className="site-header">
      <a href="#main-content" className="skip-link focus-ring">
        Skip to main content
      </a>
      <div className="container-shell flex h-[4.8rem] items-center justify-between gap-4">
        <a
          href="#"
          aria-label="Dimosthenis Gkontolias — back to top"
          className="site-wordmark focus-ring"
        >
          <span>Dimosthenis Gkontolias</span>
          <small>AI Software Engineer</small>
        </a>

        <nav aria-label="Primary navigation" className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="nav-link focus-ring"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-5 sm:flex">
          <a
            href={profile.linkedinHref}
            target="_blank"
            rel="noopener noreferrer"
            className="header-text-link focus-ring"
          >
            LinkedIn
            <ExternalLink className="size-3.5" />
          </a>
          <a
            href={profile.resumeHref}
            target="_blank"
            rel="noopener noreferrer"
            className="header-cv focus-ring"
          >
            Check CV
            <ArrowUpRight className="size-4" />
          </a>
        </div>

        <MobileNavigation items={navItems} resumeHref={profile.resumeHref} />
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="orbit-hero" aria-labelledby="hero-title">
      <div className="orbit-hero-sticky">
        <div aria-hidden="true" className="orbit-hero-field" />
        <div className="container-shell orbit-hero-layout">
          <div className="orbit-hero-copy">
            <div className="orbit-kicker">
              <span>AI Software Engineer</span>
              <span>Athens / EU</span>
            </div>

            <h1 id="hero-title" className="orbit-hero-title">
              <span className="sr-only">Dimosthenis Gkontolias — </span>
              <span>I build software</span>
              <span>that makes complex</span>
              <span>
                things feel <em>obvious.</em>
              </span>
            </h1>

            <p className="orbit-hero-deck">
              AUEB valedictorian, Quar.gr founder, and AI product engineer
              working across retrieval, cloud data, and interfaces people can
              actually operate.
            </p>

            <div className="orbit-hero-actions">
              <ActionLink href={profile.resumeHref} newTab>
                Check CV
                <ArrowUpRight className="size-4" />
              </ActionLink>
              <ActionLink href="#work" variant="dark">
                Inspect the work
                <ArrowRight className="size-4" />
              </ActionLink>
            </div>

            <div className="orbit-socials" aria-label="Professional profiles">
              <a href={profile.githubHref} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <a href={profile.linkedinHref} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <a
                href="https://www.instagram.com/demos.vibes/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Demos Vibes
              </a>
            </div>
          </div>

          <div className="orbit-hero-visual">
            <figure className="orbit-person">
              <div className="orbit-person-image">
                <Image
                  src="/images/profile-hero.jpeg"
                  alt="Dimosthenis Gkontolias smiling outdoors"
                  fill
                  priority
                  sizes="(max-width: 767px) 44vw, 20vw"
                  className="object-cover"
                />
              </div>
              <figcaption>
                <strong>Dimosthenis</strong>
                <span>The person behind the systems</span>
              </figcaption>
            </figure>
            <ProjectOrbit projects={orbitProjects} />
          </div>
        </div>
      </div>
    </section>
  );
}

function ProofStrip() {
  return (
    <section aria-label="Recruiter proof metrics" className="proof-strip">
      <div className="container-shell grid sm:grid-cols-2 xl:grid-cols-4">
        {proofMetrics.map((metric, index) => (
          <article key={metric.label} className="proof-metric">
            <span className="proof-index" aria-hidden="true">
              0{index + 1}
            </span>
            <p className="proof-value">{metric.value}</p>
            <p className="proof-label">{metric.label}</p>
            <p className="proof-detail">{metric.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProjectLinks({ project, inverse = false }: { project: Project; inverse?: boolean }) {
  if (project.links.length === 0) {
    return (
      <span
        className={cn(
          "inline-flex min-h-11 items-center border px-4 py-2 text-sm font-semibold",
          inverse ? "border-white/20 text-paper/65" : "border-ink/15 text-muted-foreground",
        )}
      >
        Case study available on request
      </span>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {project.links.map((link) => (
        <ActionLink
          key={`${project.id}-${link.label}`}
          href={link.href}
          variant={inverse ? "dark" : "outline"}
          className="min-w-0"
        >
          {link.label}
          <ArrowUpRight className="size-4" />
        </ActionLink>
      ))}
    </div>
  );
}

function FlagshipStory({
  project,
  index,
  thesis,
  signal,
  reverse = false,
}: {
  project: Project;
  index: string;
  thesis: string;
  signal: string;
  reverse?: boolean;
}) {
  return (
    <article
      id={project.id}
      className={cn(
        "flagship-story",
        project.id === "project-talktogreekdata"
          ? "flagship-story-talk"
          : "flagship-story-quar",
        reverse && "flagship-story-reverse",
      )}
      data-reveal={reverse ? "right" : "left"}
    >
      <div className="flagship-copy">
        <div className="flagship-meta-line">
          <span>{project.eyebrow}</span>
          <span className="project-meta">{project.status}</span>
          <span className="project-meta">{project.year}</span>
        </div>

        <span className="flagship-number" aria-hidden="true">
          {index}
        </span>
        <p className="flagship-signal">{signal}</p>
        <h3>{project.title}</h3>
        <p className="flagship-thesis">{thesis}</p>
        <p className="flagship-role">
          <strong>My role</strong>
          {project.role}
        </p>

        <ul className="flagship-impact">
          {project.impact.map((item) => (
            <li key={item}>
              <BadgeCheck className="mt-1 size-4 shrink-0 text-signal" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-7">
          <ProjectLinks project={project} inverse />
        </div>
      </div>

      <div className="flagship-visual">
        <div className="project-browser">
          <div className="project-browser-bar" aria-hidden="true">
            <span />
            <span />
            <span />
            <p>{project.title.toLowerCase()}</p>
          </div>
          {project.image ? (
            <div className="relative aspect-[16/10] overflow-hidden bg-night-2">
              <Image
                src={project.image.src}
                alt={project.image.alt}
                fill
                sizes="(min-width: 1024px) 48vw, 92vw"
                className="object-cover object-top"
              />
            </div>
          ) : null}
        </div>
        <div className="stack-line" aria-label={`${project.title} technology stack`}>
          {project.stack.map((technology) => (
            <span key={technology}>{technology}</span>
          ))}
        </div>
      </div>
    </article>
  );
}

function FlagshipWork() {
  return (
    <section id="work" className="dark-grid section-y scroll-mt-16" aria-labelledby="work-title">
      <div className="container-shell">
        <div className="flagship-heading" data-reveal="up">
          <Eyebrow dark>Flagship proof</Eyebrow>
          <div>
            <h2 id="work-title">
              Two systems.
              <br />
              <span>Two different kinds of proof.</span>
            </h2>
            <p>
              TalkToGreekData demonstrates the AI role fit. Quar demonstrates the
              product judgment and production ownership behind it.
            </p>
          </div>
        </div>

        <div className="flagship-stories">
          <FlagshipStory
            project={talkToGreekData}
            index="01"
            signal="AI engineering proof"
            thesis="Natural-language exploration over Greek economic data, designed as a product rather than a model demo."
          />
          <FlagshipStory
            project={quar}
            index="02"
            signal="Founder and production proof"
            thesis="A live QR menu platform that has to work for non-technical operators after the launch post is forgotten."
            reverse
          />
        </div>
      </div>
    </section>
  );
}

function SupportingWork() {
  return (
    <section className="section-y bg-canvas" aria-labelledby="supporting-work-title">
      <div className="container-shell">
        <div className="editorial-heading">
          <div data-reveal="left">
            <Eyebrow>Selected systems</Eyebrow>
            <h2 id="supporting-work-title" className="section-title mt-6">
              The range behind
              <br />
              the positioning.
            </h2>
          </div>
          <p data-reveal="right">
            Cloud data, AI tooling, frontend delivery, discovery systems, and
            technical communication. Curated for signal, not volume.
          </p>
        </div>

        <div className="project-index">
          {supportingProjects.map((project, index) => (
            <article
              id={project.id}
              key={project.id}
              className="project-index-item"
              data-reveal="up"
            >
              <div className="project-index-topline">
                <span className="project-index-number">
                  {String(index + 3).padStart(2, "0")}
                </span>
                <span className={cn("project-chip", accentStyles[project.accent])}>
                  {project.eyebrow}
                </span>
                <span className="project-index-year">{project.year}</span>
              </div>
              <h3>{project.title}</h3>
              <p className="project-index-summary">{project.summary}</p>
              <p className="project-index-role">
                <strong>Role signal:</strong> {project.role}
              </p>
              <div className="project-index-footer">
                <ul aria-label={`${project.title} technology stack`}>
                  {project.stack.slice(0, 5).map((technology) => (
                    <li key={technology}>{technology}</li>
                  ))}
                </ul>
                <ProjectLinks project={project} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CredibilitySection() {
  return (
    <section className="proof-ledger section-y" aria-labelledby="proof-ledger-title">
      <div className="container-shell">
        <div className="editorial-heading">
          <div data-reveal="left">
            <Eyebrow>Proof ledger</Eyebrow>
            <h2 id="proof-ledger-title" className="section-title mt-6">
              High standards,
              <br />
              held for a while.
            </h2>
          </div>
          <p data-reveal="right">
            Academic and competition signals matter less than shipped work, but
            they make the pattern easier to trust.
          </p>
        </div>

        <div className="achievement-row">
          {achievements.map((achievement, index) => (
            <article key={achievement.title} data-reveal="up">
              <span>0{index + 1}</span>
              <p>{achievement.title}</p>
              <strong>{achievement.value}</strong>
              <small>{achievement.detail}</small>
            </article>
          ))}
        </div>

        <div className="operating-grid">
          <div>
            <Eyebrow>Operating system</Eyebrow>
            <h3>How I work when the path is unclear.</h3>
          </div>
          <ol>
            {operatingPrinciples.map((principle, index) => (
              <li key={principle.title} data-reveal="up">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h4>{principle.title}</h4>
                  <p>{principle.detail}</p>
                  <small>{principle.proof}</small>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section id="experience" className="section-y bg-paper scroll-mt-16" aria-labelledby="experience-title">
      <div className="container-shell experience-layout">
        <div className="experience-intro" data-reveal="left">
          <Eyebrow>Experience</Eyebrow>
          <h2 id="experience-title" className="section-title mt-6">
            From data teams
            <br />
            to founder work.
          </h2>
          <p>
            The common thread is ownership: understand the messy part, make it
            reliable, and leave the system easier to operate.
          </p>
          <ActionLink href={profile.resumeHref} newTab variant="outline">
            Check full CV
            <ArrowUpRight className="size-4" />
          </ActionLink>
        </div>

        <div className="experience-list">
          {experiences.map((experience, index) => (
            <article key={experience.company} data-reveal="right">
              <div className="experience-marker" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div>
                <p className="experience-period">{experience.period}</p>
                <h3>{experience.role}</h3>
                <p className="experience-company">
                  {experience.company} · {experience.location}
                </p>
                <p className="experience-summary">{experience.summary}</p>
                <ul>
                  {experience.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CreatorSection() {
  return (
    <section id="creator" className="creator-section section-y scroll-mt-16" aria-labelledby="creator-title">
      <div className="container-shell creator-layout">
        <div className="creator-copy" data-reveal="left">
          <Eyebrow dark>Creator layer</Eyebrow>
          <h2 id="creator-title">
            I build the thing.
            <br />
            Then I make it
            <br />
            <em>understandable.</em>
          </h2>
          <p>
            Demos Vibes is my public lab for AI tools and workflows in Greek.
            Every short demo points back to a reusable resource, so communication
            becomes part of the engineering feedback loop.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ActionLink href="https://demosvibes.gr/" variant="dark">
              Visit demosvibes.gr
              <ArrowUpRight className="size-4" />
            </ActionLink>
            <ActionLink href="https://www.instagram.com/demos.vibes/" variant="quiet">
              <Play className="size-4" />
              Watch the demos
            </ActionLink>
          </div>
        </div>

        <div className="creator-channels" data-reveal="right">
          {socialProfiles.map((social, index) => (
            <a
              key={social.platform}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="creator-channel focus-ring"
            >
              <span className="creator-channel-index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <p>{social.platform}</p>
                <strong>{social.handle}</strong>
                <small>{social.detail}</small>
              </div>
              <ArrowUpRight className="size-4" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillsAndFaq() {
  return (
    <section id="skills" className="section-y bg-canvas scroll-mt-16" aria-labelledby="skills-title">
      <div className="container-shell">
        <div className="editorial-heading">
          <div data-reveal="left">
            <Eyebrow>Working stack</Eyebrow>
            <h2 id="skills-title" className="section-title mt-6">
              Tools in service
              <br />
              of shipped systems.
            </h2>
          </div>
          <p data-reveal="right">
            The stack behind the work above, organized by how I use it rather
            than as an undifferentiated keyword cloud.
          </p>
        </div>

        <div className="skill-matrix">
          {skillGroups.map((group, index) => (
            <article key={group.title} data-reveal="up">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{group.title}</h3>
              <ul>
                {group.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div id="faq" className="faq-layout">
          <div data-reveal="left">
            <Eyebrow>Recruiter FAQ</Eyebrow>
            <h2>Answers without the scroll hunt.</h2>
          </div>
          <div className="faq-list" data-reveal="right">
            {faqs.map((faq, index) => (
              <details key={faq.question}>
                <summary>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {faq.question}
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="contact-section section-y scroll-mt-16" aria-labelledby="contact-title">
      <div aria-hidden="true" className="contact-signal" />
      <div className="container-shell contact-layout">
        <div data-reveal="left">
          <Eyebrow dark>Next role</Eyebrow>
          <h2 id="contact-title">
            The fastest way to
            <br />
            see the full picture.
          </h2>
          <p>{profile.availability}</p>
        </div>

        <div className="contact-actions" data-reveal="right">
          <a
            href={profile.resumeHref}
            target="_blank"
            rel="noopener noreferrer"
            className="cv-orbit focus-ring"
          >
            <span>
              Check
              <br />
              my CV
            </span>
            <ArrowUpRight className="size-7" />
          </a>
          <div className="contact-secondary">
            <ActionLink href={`mailto:${profile.email}`} variant="dark">
              <Mail className="size-4" />
              Email me
            </ActionLink>
            <ActionLink href={profile.linkedinHref} variant="quiet">
              <Linkedin className="size-4" />
              LinkedIn
            </ActionLink>
            <ActionLink href={profile.vcardHref} variant="quiet" download>
              Save contact
              <ArrowDownToLine className="size-4" />
            </ActionLink>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container-shell flex flex-col gap-6 py-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-display text-2xl text-paper">{profile.name}</p>
          <p className="mt-2 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-paper/55">
            AI Software Engineer · Athens, Greece
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <IconLink href={profile.githubHref} label="GitHub" inverse>
            <Github className="size-4.5" />
          </IconLink>
          <IconLink href={profile.linkedinHref} label="LinkedIn" inverse>
            <Linkedin className="size-4.5" />
          </IconLink>
          <IconLink href={`mailto:${profile.email}`} label="Email" inverse>
            <Mail className="size-4.5" />
          </IconLink>
          <IconLink href="https://www.threads.com/@demos.vibes" label="Threads" inverse>
            <MessageCircle className="size-4.5" />
          </IconLink>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <ProofStrip />
        <FlagshipWork />
        <SupportingWork />
        <CredibilitySection />
        <ExperienceSection />
        <CreatorSection />
        <SkillsAndFaq />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
