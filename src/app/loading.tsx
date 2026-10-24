export default function Loading() {
  return (
    <div className="min-h-screen bg-[#141414] text-white flex flex-col justify-center items-center p-6 select-none">
      {/* Netflix-style pulsing red loader */}
      <div className="relative w-16 h-16 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-4 border-white/10" />
        <div className="absolute inset-0 rounded-full border-4 border-[#E50914] border-t-transparent animate-spin" />
        <span className="font-bebas text-2xl text-[#E50914] font-bold">P</span>
      </div>

      <div className="mt-4 font-mono text-xs uppercase tracking-widest text-zinc-400 animate-pulse">
        Buffering Experience...
      </div>
    </div>
  );
}
