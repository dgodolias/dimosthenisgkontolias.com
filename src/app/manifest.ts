import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Dimosthenis Gkontolias Portfolio",
    short_name: "DG Portfolio",
    description:
      "Portfolio of Dimosthenis Gkontolias: software engineering, AI/data projects, and creator work.",
    start_url: "/",
    display: "standalone",
    background_color: "#fbfff7",
    theme_color: "#174332",
    icons: [
      {
        src: "/icon.png?v=2",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
