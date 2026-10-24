"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { WelcomeGate } from "@/components/gate/WelcomeGate";
import { WelcomeSplash } from "@/components/ui/WelcomeSplash";

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [stage, setStage] = useState<"gate" | "intro" | "done">("gate");

  useEffect(() => {
    // Deep-link skip parameter support (e.g. /?skip=1)
    if (searchParams.get("skip") === "1") {
      router.replace("/who");
    }
  }, [searchParams, router]);

  const handleEnter = (soundEnabled: boolean) => {
    // User gesture unlocked audio -> show sticker intro with reveal
    setStage("intro");
  };

  const handleSkipToRecruiter = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("pkm_visited_before", "true");
    }
    router.push("/recruiter");
  };

  const handleIntroComplete = () => {
    setStage("done");
    router.push("/who");
  };

  if (stage === "intro") {
    return <WelcomeSplash onComplete={handleIntroComplete} />;
  }

  return (
    <WelcomeGate
      onEnter={handleEnter}
      onSkipToRecruiter={handleSkipToRecruiter}
    />
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0a0a0a]" />}>
      <HomeContent />
    </Suspense>
  );
}
