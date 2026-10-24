import type { Metadata } from "next";
import { ProfileSelector } from "@/components/ui/ProfileSelector";

export const metadata: Metadata = {
  title: "Who's Watching? | Select Your Viewing Profile",
  description: "Select your viewing experience: Recruiter, Just Browsing, Book a Session, or Networker."
};

export default function WhoPage() {
  return (
    <div className="min-h-screen bg-[#141414] text-white">
      <ProfileSelector />
    </div>
  );
}
