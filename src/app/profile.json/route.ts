import {
  achievements,
  evidenceMap,
  experiences,
  faqs,
  featuredProjects,
  focusAreas,
  operatingPrinciples,
  profile,
  projectShelf,
  proofMetrics,
  skillGroups,
  socialProfiles,
  type Project,
} from "@/data/portfolio";

/**
 * Machine-readable projection of the portfolio data.
 *
 * This is the public contract other surfaces read from — the GitHub profile
 * README generator is the first consumer — so the site stays the single source
 * of truth. Prerendered at build time and served as a static file.
 */
export const dynamic = "force-static";

const SITE_URL = "https://dimosthenisgkontolias.com";

const absolute = (href: string) => (href.startsWith("/") ? `${SITE_URL}${href}` : href);

function serializeProject(project: Project) {
  // `accent` is presentation-only, so it is deliberately not part of the contract.
  return {
    id: project.id,
    title: project.title,
    eyebrow: project.eyebrow,
    year: project.year,
    status: project.status,
    summary: project.summary,
    role: project.role,
    impact: project.impact,
    stack: project.stack,
    links: project.links.map((link) => ({ ...link, href: absolute(link.href) })),
    image: project.image ? { ...project.image, src: absolute(project.image.src) } : undefined,
  };
}

export function GET() {
  const payload = {
    version: 1,
    source: `${SITE_URL}/profile.json`,
    site: SITE_URL,
    profile: {
      ...profile,
      resumeHref: absolute(profile.resumeHref),
      vcardHref: absolute(profile.vcardHref),
    },
    proofMetrics,
    focusAreas,
    operatingPrinciples,
    achievements,
    evidenceMap: evidenceMap.map((item) => ({ ...item, href: absolute(item.href) })),
    faqs,
    projects: {
      featured: featuredProjects.map(serializeProject),
      shelf: projectShelf.map(serializeProject),
    },
    experiences,
    socialProfiles,
    skillGroups,
  };

  return new Response(JSON.stringify(payload, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      // Public data contract: anything may read it, including CI in other repos.
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
