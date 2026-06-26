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
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-lg border border-border bg-white px-4 py-3 font-semibold text-ink"
            >
              {item.label}
            </a>
          ))}
          <a
            href={resumeHref}
            onClick={() => setOpen(false)}
            className="mt-3 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 font-semibold text-primary-foreground"
          >
            Download CV
            <ExternalLink className="size-4" />
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}
