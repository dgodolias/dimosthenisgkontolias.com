import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { profile } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-6 py-12">
      <section className="w-full max-w-2xl rounded-lg border border-border bg-paper/92 p-7 text-center shadow-[0_24px_90px_rgb(23_35_28/0.1)] sm:p-10">
        <Image
          src="/images/logo.png"
          alt="DG logo"
          width={72}
          height={58}
          className="mx-auto h-14 w-[72px] object-contain"
          priority
        />
        <p className="mt-8 font-mono text-xs font-semibold uppercase text-leaf">
          404
        </p>
        <h1 className="mt-4 font-display text-5xl leading-none text-ink sm:text-6xl">
          Page not found.
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-base leading-7 text-muted-foreground">
          This route is not part of the portfolio. The strongest project evidence is on the main page.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/#work"
            className={cn(buttonVariants({ size: "lg" }), "h-11 rounded-lg px-4")}
          >
            <ArrowLeft className="size-4" />
            Back to work
          </Link>
          <a
            href={`mailto:${profile.email}`}
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-11 rounded-lg bg-white/75 px-4",
            )}
          >
            <Mail className="size-4" />
            Email Dimosthenis
          </a>
        </div>
      </section>
    </main>
  );
}
