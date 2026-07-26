import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Dimosthenis Gkontolias — AI Software Engineer",
    short_name: "DG · AI Engineer",
    description:
      "AI software engineering portfolio featuring TalkToGreekData.gr, Quar.gr, cloud data work, and selected production systems.",
    start_url: "/",
    display: "standalone",
    background_color: "#f1efe6",
    theme_color: "#08140f",
    icons: [
      {
        src: "/icon.png?v=2",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
