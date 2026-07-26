import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { profile } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <main className="dark-grid relative grid min-h-screen place-items-center overflow-hidden px-5 py-12 text-paper">
      <div
        aria-hidden="true"
        className="absolute -right-40 top-1/2 size-[34rem] -translate-y-1/2 rounded-full border border-signal/25 shadow-[0_0_0_6rem_rgb(217_237_117/0.03),0_0_0_12rem_rgb(169_220_212/0.02)]"
      />
      <section className="relative z-10 grid w-full max-w-6xl gap-10 border-y border-paper/20 py-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end lg:py-16">
        <div>
          <Link
            href="/"
            className="focus-ring font-display text-2xl font-normal tracking-[-0.04em] text-paper"
          >
            Dimosthenis Gkontolias
          </Link>
          <p className="mt-14 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-signal">
            Lost signal / 404
          </p>
          <p className="mt-5 max-w-sm text-sm leading-7 text-paper/55">
            This route is not part of the portfolio. The strongest project
            evidence is on the main page.
          </p>
        </div>
        <div>
          <p
            aria-hidden="true"
            className="font-display text-[clamp(6rem,20vw,15rem)] leading-[0.55] text-paper/7"
          >
            404
          </p>
          <h1 className="mt-8 font-display text-6xl font-normal leading-[0.88] tracking-[-0.055em] text-paper sm:text-8xl">
            Page not found.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-paper/60">
            The signal ends here. Return to the work or use the direct contact
            route.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/#work"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-12 rounded-full bg-signal px-5 font-bold text-ink hover:bg-sun",
            )}
          >
            <ArrowLeft className="size-4" />
            Back to work
          </Link>
          <a
            href={`mailto:${profile.email}`}
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-12 rounded-full border-paper/25 bg-transparent px-5 font-bold text-paper hover:bg-paper/10 hover:text-paper",
            )}
          >
            <Mail className="size-4" />
            Email Dimosthenis
          </a>
        </div>
        </div>
      </section>
    </main>
  );
}
