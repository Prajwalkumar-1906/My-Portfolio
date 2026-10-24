import Link from "next/link";
import { ArrowLeft, Film, Compass, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col justify-between p-6 sm:p-12 relative overflow-hidden select-none">
      {/* Background Red Vignette */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#E50914]/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Brand Wordmark */}
      <header className="relative z-10 flex items-center justify-between">
        <Link href="/" className="netflix-wordmark text-3xl sm:text-4xl font-bold tracking-widest text-[#E50914]">
          PRAJWAL
        </Link>
        <Link
          href="/who"
          className="text-xs font-semibold text-zinc-400 hover:text-white uppercase tracking-wider transition-colors"
        >
          Who&apos;s Watching?
        </Link>
      </header>

      {/* Center 404 Visual Content */}
      <main className="relative z-10 max-w-2xl mx-auto text-center my-auto py-12">
        <div className="font-bebas text-8xl sm:text-9xl md:text-[180px] leading-none text-[#E50914] tracking-widest drop-shadow-[0_0_35px_rgba(229,9,20,0.5)]">
          404
        </div>

        <h1 className="font-bebas text-3xl sm:text-5xl text-white tracking-wide mt-2">
          LOST YOUR WAY?
        </h1>

        <p className="text-zinc-400 text-sm sm:text-base max-w-md mx-auto mt-3 leading-relaxed">
          Sorry, we can&apos;t find that title. You&apos;ll find lots to explore on Prajwalkumar&apos;s streaming portfolio.
        </p>

        {/* Quick Navigation Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#E50914] hover:bg-[#b20710] text-white font-bebas text-xl tracking-wider uppercase transition-colors shadow-lg"
          >
            <Home className="w-5 h-5" />
            <span>Prajwal Home</span>
          </Link>

          <Link
            href="/who"
            className="flex items-center gap-2 px-5 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bebas text-xl tracking-wider uppercase transition-colors border border-white/15"
          >
            <Compass className="w-5 h-5" />
            <span>Profile Selector</span>
          </Link>

          <Link
            href="/recruiter"
            className="flex items-center gap-2 px-5 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bebas text-xl tracking-wider uppercase transition-colors border border-white/15"
          >
            <Film className="w-5 h-5" />
            <span>Recruiter View</span>
          </Link>
        </div>

        <div className="mt-10 font-mono text-xs text-zinc-600">
          Error Code: <span className="text-zinc-400">NETFLIX_STYLE_404_NOT_FOUND</span>
        </div>
      </main>

      {/* Footer Attribution */}
      <footer className="relative z-10 text-center text-xs text-zinc-600">
        &copy; 2026 Prajwalkumar Madiwal &bull; Bengauru, Karnataka
      </footer>
    </div>
  );
}
