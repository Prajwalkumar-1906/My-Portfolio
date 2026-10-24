import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://prajwalkumar-madiwal.vercel.app";
  const routes = ["", "/recruiter", "/browse", "/sessions", "/network", "/contact"];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date("2026-10-24"),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8
  }));
}
