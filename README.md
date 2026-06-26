# Dimosthenis Gkontolias Portfolio

Personal portfolio for [dimosthenisgkontolias.com](https://dimosthenisgkontolias.com).

The site is built to be recruiter-readable first: strong project evidence, clear role fit, creator links, SEO metadata, structured data, favicon/manifest support, and smoke tests for the important user-facing paths.

## Stack

- Next.js App Router
- React 19
- TypeScript
- Tailwind CSS 4
- shadcn/ui components
- Playwright smoke tests

## Local Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quality Gates

```bash
npm run lint
npm run build
npm run test:smoke
```

The smoke suite checks the homepage content, navigation, favicon, social preview image, sitemap, manifest, structured data, image loading, external-link hygiene, mobile menu, and reduced-motion behavior.

## Content Model

Main portfolio content lives in [`src/data/portfolio.ts`](src/data/portfolio.ts):

- profile and proof metrics
- recruiter role-fit evidence
- achievements
- featured projects and project shelf
- experience
- creator profiles
- skill groups

The homepage composition lives in [`src/app/page.tsx`](src/app/page.tsx).

## Runtime Cost

The portfolio is static-first and does not depend on paid media-generation APIs or runtime AI services.
