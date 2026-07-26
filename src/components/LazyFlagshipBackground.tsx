"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const TalkToGreekDataBackground = dynamic(
  () =>
    import("@/components/FlagshipBackgrounds").then(
      (module) => module.TalkToGreekDataBackground,
    ),
  { ssr: false },
);

const QuarBackground = dynamic(
  () =>
    import("@/components/FlagshipBackgrounds").then(
      (module) => module.QuarBackground,
    ),
  { ssr: false },
);

export function LazyFlagshipBackground({
  project,
}: {
  project: "talktogreekdata" | "quar";
}) {
  const sentinelRef = useRef<HTMLSpanElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const sentinel = sentinelRef.current;

    if (!sentinel || shouldLoad) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin: "500px 0px" },
    );
    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [shouldLoad]);

  return (
    <>
      <span
        ref={sentinelRef}
        className="flagship-effect-sentinel"
        data-effect-loader={project}
        data-load-state={shouldLoad ? "loaded" : "deferred"}
        aria-hidden="true"
      />
      {shouldLoad ? (
        project === "talktogreekdata" ? (
          <TalkToGreekDataBackground />
        ) : (
          <QuarBackground />
        )
      ) : null}
    </>
  );
}
