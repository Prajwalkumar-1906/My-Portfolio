import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Network Hub & Community Wall | Prajwalkumar Madiwal",
  description: "Connect with Prajwalkumar Madiwal across verified socials (LinkedIn, GitHub, Instagram, Twitter) and leave a note on the Community Wall."
};

export default function NetworkLayout({ children }: { children: React.ReactNode }) {
  return children;
}
