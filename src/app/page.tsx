import Image from "next/image";
import {
  ArrowUpRight,
  BadgeCheck,
  BriefcaseBusiness,
  ExternalLink,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Play,
  Radio,
  Sparkles,
  Twitter,
} from "lucide-react";

import {
  experiences,
  featuredProjects,
  focusAreas,
  profile,
  projectShelf,
  proofMetrics,
  skillGroups,
  socialProfiles,
  type Project,
} from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const navItems = [
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Creator", href: "#creator" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const siteUrl = "https://dimosthenisgkontolias.com";
const allProjects = [...featuredProjects, ...projectShelf];

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
      jobTitle: ["Software Engineer", "AI Builder", "Content Creator"],
      email: `mailto:${profile.email}`,
      url: siteUrl,
      image: `${siteUrl}/images/profile.png`,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Athens",
        addressCountry: "GR",
      },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Athens University of Economics and Business",
      },
      sameAs: [
        profile.githubHref,
        profile.linkedinHref,
        ...socialProfiles.map((social) => social.href),
      ],
      knowsAbout: [
        "Software Engineering",
        "AI Engineering",
        "Data Engineering",
        "React",
        "TypeScript",
        "Python",
        "RAG applications",
        "Content Creation",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: "Dimosthenis Gkontolias Portfolio",
      url: siteUrl,
      inLanguage: "en",
      description: profile.headline,
      author: { "@id": `${siteUrl}/#person` },
    },
    {
      "@type": "ItemList",
      "@id": `${siteUrl}/#projects`,
      name: "Selected software projects by Dimosthenis Gkontolias",
      itemListElement: allProjects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          name: project.title,
          description: project.summary,
          url: publicProjectUrl(project),
          keywords: project.stack.join(", "),
          creator: { "@id": `${siteUrl}/#person` },
        },
      })),
    },
  ],
};

const accentStyles: Record<Project["accent"], string> = {
  coral: "border-coral/35 bg-coral/10 text-coral",
  leaf: "border-leaf/35 bg-leaf/10 text-leaf",
  lilac: "border-[#7b61ff]/35 bg-lilac text-[#6047d7]",
  sky: "border-sky/35 bg-sky/10 text-[#167084]",
  sun: "border-sun/50 bg-sun/20 text-[#785b00]",
};

function externalRel(href: string) {
  return href.startsWith("mailto:") || href.startsWith("/") || href.startsWith("#")
    ? undefined
    : "noreferrer";
}

function externalTarget(href: string) {
  return href.startsWith("mailto:") || href.startsWith("/") || href.startsWith("#")
    ? undefined
    : "_blank";
}

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <p className="mb-3 font-mono text-xs font-semibold uppercase text-leaf">
        {eyebrow}
      </p>
      <h2 className="text-balance font-display text-4xl leading-none text-ink sm:text-5xl">
        {title}
      </h2>
      <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

function LinkButton({
  href,
  children,
  variant = "default",
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "default" | "outline" | "secondary" | "ghost";
  className?: string;
}) {
  return (
    <a
      href={href}
      target={externalTarget(href)}
      rel={externalRel(href)}
      className={cn(
        buttonVariants({ variant, size: "lg" }),
        "h-11 rounded-lg px-4",
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
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            className="inline-flex size-10 items-center justify-center rounded-lg border border-border bg-paper text-ink transition hover:-translate-y-0.5 hover:border-primary hover:text-primary focus-ring"
          />
        }
      >
        {children}
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}

function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  return (
    <Card
      className={cn(
        "h-full rounded-lg border bg-paper/95 shadow-[0_20px_80px_rgb(23_35_28/0.08)] transition hover:-translate-y-1 hover:shadow-[0_24px_90px_rgb(23_35_28/0.12)]",
        featured && "lg:grid lg:grid-cols-[0.88fr_1.12fr]",
      )}
    >
      <CardHeader
        className={cn(
          "gap-5",
          featured && "border-b border-border/80 lg:border-b-0 lg:border-r",
        )}
      >
        <div className="flex flex-wrap items-center gap-2">
          <Badge className={cn("rounded-md border font-mono", accentStyles[project.accent])}>
            {project.eyebrow}
          </Badge>
          <Badge variant="outline" className="rounded-md border-border/80 bg-white/70 font-mono">
            {project.year}
          </Badge>
        </div>
        <div>
          <h3 className="font-display text-3xl leading-none text-ink">
            {project.title}
          </h3>
          <CardDescription className="mt-3 text-base leading-7">
            {project.summary}
          </CardDescription>
        </div>
        <p className="rounded-lg border border-border/80 bg-white/75 p-4 text-sm leading-6 text-foreground">
          <span className="font-semibold text-ink">Role: </span>
          {project.role}
        </p>
        {project.image ? (
          <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-border bg-muted">
            <Image
              src={project.image.src}
              alt={project.image.alt}
              fill
              sizes={featured ? "(min-width: 1024px) 42vw, 100vw" : "(min-width: 1024px) 48vw, 100vw"}
              className="object-cover object-top"
            />
          </div>
        ) : null}
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div>
          <p className="mb-3 font-mono text-xs font-semibold uppercase text-muted-foreground">
            Why it matters
          </p>
          <ul className="space-y-3">
            {project.impact.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-6 text-foreground">
                <BadgeCheck className="mt-0.5 size-4 shrink-0 text-leaf" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <Badge key={tech} variant="secondary" className="rounded-md bg-secondary/90">
              {tech}
            </Badge>
          ))}
        </div>
        <div className="mt-auto flex flex-wrap gap-2">
          {project.links.length > 0 ? (
            project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={externalTarget(link.href)}
                rel={externalRel(link.href)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-white px-3 py-2 text-sm font-semibold text-ink transition hover:border-primary hover:text-primary focus-ring"
              >
                {link.label}
                <ArrowUpRight className="size-4" />
              </a>
            ))
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-white px-3 py-2 text-sm font-semibold text-muted-foreground">
              Case study available on request
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/86 backdrop-blur-xl">
      <div className="container-shell flex h-18 items-center justify-between gap-4">
        <a href="#" className="flex items-center gap-3 focus-ring">
          <Image
            src="/images/logo.png"
            alt="DG logo"
            width={44}
            height={36}
            className="h-9 w-11 object-contain"
            priority
          />
          <span className="hidden text-sm font-bold text-ink sm:inline">
            Dimosthenis Gkontolias
          </span>
        </a>
        <nav aria-label="Primary navigation" className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-muted-foreground transition hover:bg-muted hover:text-ink focus-ring"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-2 sm:flex">
          <a
            href={profile.resumeHref}
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-10 rounded-lg")}
          >
            CV
            <ExternalLink className="size-4" />
          </a>
          <a
            href={`mailto:${profile.email}`}
            className={cn(buttonVariants({ size: "lg" }), "h-10 rounded-lg bg-primary px-4")}
          >
            <Mail className="size-4" />
            Contact
          </a>
        </div>
        <Sheet>
          <SheetTrigger
            render={
              <button
                aria-label="Open navigation"
                className="inline-flex size-10 items-center justify-center rounded-lg border border-border bg-paper text-ink md:hidden"
              />
            }
          >
            <Menu className="size-5" />
          </SheetTrigger>
          <SheetContent className="w-[min(88vw,360px)] bg-paper">
            <SheetHeader>
              <SheetTitle>Navigation</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-2 px-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-lg border border-border bg-white px-4 py-3 font-semibold text-ink"
                >
                  {item.label}
                </a>
              ))}
              <a
                href={profile.resumeHref}
                className="mt-3 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 font-semibold text-primary-foreground"
              >
                Download CV
                <ExternalLink className="size-4" />
              </a>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-border/80 pt-18">
      <div className="absolute inset-y-0 right-0 -z-10 w-full overflow-hidden md:w-[58%]">
        <Image
          src="/images/profile.webp"
          alt="Dimosthenis Gkontolias"
          fill
          sizes="(min-width: 768px) 58vw, 100vw"
          className="object-cover object-[60%_32%] opacity-28 md:opacity-55"
          priority
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#fbfff7_0%,rgb(251_255_247/0.92)_30%,rgb(251_255_247/0.28)_72%,rgb(251_255_247/0.05)_100%)]" />
      </div>
      <div className="container-shell grid min-h-[82svh] content-center pb-16 pt-20">
        <div className="max-w-4xl">
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <Badge className="rounded-md bg-sun/30 text-ink hover:bg-sun/30">
              <Sparkles className="size-3.5" />
              Software engineer + AI builder
            </Badge>
            <Badge variant="outline" className="rounded-md bg-white/70">
              <MapPin className="size-3.5" />
              {profile.location}
            </Badge>
          </div>
          <h1 className="text-balance font-display text-6xl leading-[0.9] text-ink sm:text-7xl lg:text-8xl">
            Dimosthenis Gkontolias
          </h1>
          <p className="mt-6 max-w-3xl text-balance text-xl leading-8 text-foreground sm:text-2xl">
            {profile.headline}
          </p>
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
            {profile.intro}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <LinkButton href="#work">
              See the work
              <ArrowUpRight className="size-4" />
            </LinkButton>
            <LinkButton href={profile.resumeHref} variant="outline">
              Download CV
              <ExternalLink className="size-4" />
            </LinkButton>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <IconLink href={profile.githubHref} label="GitHub">
              <Github className="size-5" />
            </IconLink>
            <IconLink href={profile.linkedinHref} label="LinkedIn">
              <Linkedin className="size-5" />
            </IconLink>
            <IconLink href="https://www.instagram.com/demos.vibes/" label="Demos Vibes on Instagram">
              <Instagram className="size-5" />
            </IconLink>
            <IconLink href="https://x.com/demosvibes" label="Demos Vibes on X">
              <Twitter className="size-5" />
            </IconLink>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProofStrip() {
  return (
    <section aria-label="Proof metrics" className="border-b border-border/80 bg-paper/88">
      <div className="container-shell grid gap-3 py-5 sm:grid-cols-2 lg:grid-cols-4">
        {proofMetrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-lg border border-border bg-white/80 p-4 shadow-sm"
          >
            <p className="font-display text-4xl leading-none text-ink">{metric.value}</p>
            <p className="mt-2 text-sm font-bold text-ink">{metric.label}</p>
            <p className="mt-1 text-sm leading-5 text-muted-foreground">{metric.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function RecruiterSnapshot() {
  const items = [
    {
      title: "Best fit",
      body: "Product-focused engineering roles, especially React/Next, backend/data work, and AI features that need a clean path from prototype to production.",
    },
    {
      title: "Proof",
      body: "Quar.gr is used by cafes, TrackSights work touched real cloud data pipelines, and Demos Vibes makes me explain tools in plain Greek.",
    },
    {
      title: "Why me",
      body: "I am still early, but I have already dealt with users, messy data, deploys, content, and the uncomfortable parts after a demo works.",
    },
  ];

  return (
    <section className="border-b border-border/80 bg-white/72">
      <div className="container-shell grid gap-5 py-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-stretch">
        <div className="rounded-lg border border-primary/15 bg-primary p-6 text-primary-foreground">
          <p className="font-mono text-xs font-semibold uppercase text-sun">
            Recruiter snapshot
          </p>
          <h2 className="mt-5 font-display text-4xl leading-none">
            What a recruiter can learn fast.
          </h2>
          <p className="mt-4 text-sm leading-6 text-primary-foreground/78">
            A quick read before the project cards.
          </p>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {items.map((item) => (
            <div key={item.title} className="rounded-lg border border-border bg-paper p-5">
              <p className="font-mono text-xs font-semibold uppercase text-leaf">
                {item.title}
              </p>
              <p className="mt-4 text-sm leading-6 text-foreground">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FocusAreas() {
  return (
    <section className="section-y">
      <div className="container-shell">
        <div className="grid gap-4 md:grid-cols-3">
          {focusAreas.map((area, index) => (
            <div key={area.title} className="rounded-lg border border-border bg-paper p-6">
              <div className="mb-8 flex size-11 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                {index === 0 && <BriefcaseBusiness className="size-5" />}
                {index === 1 && <Sparkles className="size-5" />}
                {index === 2 && <Radio className="size-5" />}
              </div>
              <h2 className="text-xl font-bold text-ink">{area.title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{area.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkSection() {
  const [leadProject, ...restProjects] = featuredProjects;

  return (
    <section id="work" className="section-y border-y border-border/80 bg-white/65">
      <div className="container-shell">
        <SectionHeader
          eyebrow="Selected work"
          title="Projects that shipped beyond the repo."
          description="A recruiter should be able to see the role, stack, constraint, and result quickly. These are the clearest examples."
        />
        <ProjectCard project={leadProject} featured />
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          {restProjects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MoreProjectsSection() {
  return (
    <section className="section-y">
      <div className="container-shell">
        <SectionHeader
          eyebrow="Project shelf"
          title="More shipped experiments."
          description="Smaller or less public, but useful for range: AI review tools, hospitality frontends, game backends, and product experiments."
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {projectShelf.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section id="experience" className="section-y border-y border-border/80 bg-mint/70">
      <div className="container-shell">
        <SectionHeader
          eyebrow="Experience"
          title="Where the habits came from."
          description="Across internships, Quar.gr, and freelance work, the pattern is the same: own the unclear part, make it reliable, and keep the product understandable."
        />
        <Tabs defaultValue={experiences[0].company} className="mx-auto max-w-5xl">
          <TabsList className="mb-6 h-auto w-full flex-wrap justify-start rounded-lg bg-white/85 p-2">
            {experiences.map((experience) => (
              <TabsTrigger
                key={experience.company}
                value={experience.company}
                className="min-h-10 flex-none px-3"
              >
                {experience.company}
              </TabsTrigger>
            ))}
          </TabsList>
          {experiences.map((experience) => (
            <TabsContent key={experience.company} value={experience.company}>
              <Card className="rounded-lg bg-paper">
                <CardHeader>
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-3xl text-ink">
                        {experience.role}
                      </h3>
                      <CardDescription className="mt-2 text-base">
                        {experience.company} | {experience.location}
                      </CardDescription>
                    </div>
                    <Badge className="rounded-md bg-primary text-primary-foreground">
                      {experience.period}
                    </Badge>
                  </div>
                  <p className="max-w-3xl text-base leading-7 text-foreground">
                    {experience.summary}
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="grid gap-3 md:grid-cols-3">
                    {experience.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="rounded-lg border border-border bg-white/75 p-4 text-sm leading-6 text-foreground"
                      >
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}

function CreatorSection() {
  return (
    <section id="creator" className="section-y">
      <div className="container-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <p className="mb-3 font-mono text-xs font-semibold uppercase text-leaf">
            Creator layer
          </p>
          <h2 className="text-balance font-display text-5xl leading-none text-ink">
            I build the thing, then explain it in Greek.
          </h2>
          <p className="mt-5 text-base leading-7 text-muted-foreground">
            Demos Vibes is my public lab for AI tools, workflows, and reusable resources. Every short demo points back to a resource page, so the content is not just a clip; it becomes something people can use again.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <LinkButton href="https://demosvibes.gr/" variant="outline">
              Visit demosvibes.gr
              <ArrowUpRight className="size-4" />
            </LinkButton>
            <LinkButton href="https://www.instagram.com/demos.vibes/" variant="secondary">
              <Play className="size-4" />
              Watch reels
            </LinkButton>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {socialProfiles.map((social) => (
            <a
              key={social.platform}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-border bg-paper p-5 transition hover:-translate-y-1 hover:border-primary focus-ring"
            >
              <div className="mb-10 flex items-center justify-between">
                <Badge variant="outline" className="rounded-md bg-white">
                  {social.platform}
                </Badge>
                <ArrowUpRight className="size-4 text-muted-foreground" />
              </div>
              <p className="font-display text-3xl leading-none text-ink">{social.handle}</p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{social.detail}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillsSection() {
  return (
    <section id="skills" className="section-y border-y border-border/80 bg-white/65">
      <div className="container-shell">
        <SectionHeader
          eyebrow="Stack"
          title="The stack I actually use."
          description="This is not keyword stuffing. It is the stack behind the projects above: product UI, APIs, scraping, ML/data work, cloud jobs, and the pieces needed to ship."
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {skillGroups.map((group) => (
            <div key={group.title} className="rounded-lg border border-border bg-paper p-5">
              <h3 className="mb-4 font-bold text-ink">{group.title}</h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="rounded-md">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="section-y">
      <div className="container-shell">
        <div className="grid gap-8 rounded-lg border border-border bg-primary p-6 text-primary-foreground sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="font-mono text-xs font-semibold uppercase text-sun">
              Next role
            </p>
            <h2 className="mt-4 max-w-3xl font-display text-5xl leading-none">
              I am looking for a team where shipping matters.
            </h2>
            <p className="mt-5 max-w-2xl leading-7 text-primary-foreground/78">
              {profile.availability}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-sun px-4 font-bold text-ink transition hover:bg-sun/90 focus-ring"
            >
              <Mail className="size-4" />
              Email me
            </a>
            <a
              href={profile.linkedinHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-primary-foreground/25 px-4 font-bold transition hover:bg-primary-foreground/10 focus-ring"
            >
              <Linkedin className="size-4" />
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-paper">
      <div className="container-shell flex flex-col gap-5 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-bold text-ink">{profile.name}</p>
          <p className="text-sm text-muted-foreground">
            Software engineer | AI builder | Content creator
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <IconLink href={profile.githubHref} label="GitHub">
            <Github className="size-5" />
          </IconLink>
          <IconLink href={profile.linkedinHref} label="LinkedIn">
            <Linkedin className="size-5" />
          </IconLink>
          <IconLink href={`mailto:${profile.email}`} label="Email">
            <Mail className="size-5" />
          </IconLink>
          <IconLink href="https://www.threads.com/@demos.vibes" label="Threads">
            <MessageCircle className="size-5" />
          </IconLink>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <Hero />
      <ProofStrip />
      <RecruiterSnapshot />
      <FocusAreas />
      <WorkSection />
      <MoreProjectsSection />
      <ExperienceSection />
      <CreatorSection />
      <SkillsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
