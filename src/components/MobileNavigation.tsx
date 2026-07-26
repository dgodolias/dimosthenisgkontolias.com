"use client";

import * as React from "react";
import { ExternalLink, Menu } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface MobileNavItem {
  href: string;
  label: string;
}

interface MobileNavigationProps {
  items: MobileNavItem[];
  resumeHref: string;
}

export function MobileNavigation({ items, resumeHref }: MobileNavigationProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <button
            aria-label="Open navigation"
            className="inline-flex size-11 items-center justify-center border border-paper/25 bg-night text-paper transition hover:border-signal hover:bg-signal hover:text-ink focus-ring lg:hidden"
          />
        }
      >
        <Menu className="size-5" />
      </SheetTrigger>
      <SheetContent className="w-[min(90vw,380px)] border-l border-ink/20 bg-paper">
        <SheetHeader>
          <SheetTitle className="font-display text-3xl font-normal">
            Navigation
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col border-t border-ink/20 px-4">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex min-h-13 items-center justify-between border-b border-ink/20 py-3 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-ink transition hover:px-2 hover:text-forest focus-ring"
            >
              {item.label}
              <span aria-hidden="true">↗</span>
            </a>
          ))}
          <a
            href={resumeHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 bg-ink px-4 py-3 font-semibold text-paper transition hover:bg-forest focus-ring"
          >
            Check CV
            <ExternalLink className="size-4" />
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}
