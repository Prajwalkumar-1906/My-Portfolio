import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore The Show | Prajwalkumar Madiwal",
  description: "Browse featured projects, architectural deep-dives (PlaceWise, Chukta), educational background, and technical articles in Netflix-grade 3D depth."
};

export default function BrowseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
