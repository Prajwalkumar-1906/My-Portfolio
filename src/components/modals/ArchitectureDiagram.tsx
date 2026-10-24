"use client";

interface ArchitectureDiagramProps {
  type?: "placewise" | "chukta" | "retention" | "generic";
}

export function ArchitectureDiagram({ type = "generic" }: ArchitectureDiagramProps) {
  if (type === "placewise") {
    return (
      <div className="w-full bg-[#121212] p-4 rounded-xl border border-white/10 overflow-x-auto">
        <div className="text-[11px] font-mono font-bold text-[#E50914] uppercase tracking-wider mb-3">
          Architecture: Explainable & Fair ML Pipeline (PlaceWise)
        </div>
        <svg viewBox="0 0 760 170" className="w-full min-w-[650px] h-auto font-mono text-[11px]">
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 8 5 L 0 9 z" fill="#E50914" />
            </marker>
          </defs>

          {/* Node 1: Ingestion */}
          <rect x="10" y="50" width="120" height="70" rx="8" fill="#1f1f1f" stroke="#444" strokeWidth="1.5" />
          <text x="70" y="75" fill="#fff" textAnchor="middle" fontWeight="bold">Data Ingestion</text>
          <text x="70" y="93" fill="#aaa" textAnchor="middle" fontSize="10">Kaggle + Hybrid</text>
          <text x="70" y="107" fill="#888" textAnchor="middle" fontSize="9">Bias Injected</text>

          {/* Arrow 1 */}
          <line x1="130" y1="85" x2="165" y2="85" stroke="#E50914" strokeWidth="2" markerEnd="url(#arrow)" />

          {/* Node 2: Pipeline */}
          <rect x="170" y="50" width="130" height="70" rx="8" fill="#1f1f1f" stroke="#E50914" strokeWidth="1.5" />
          <text x="235" y="75" fill="#fff" textAnchor="middle" fontWeight="bold">Stratified Pipeline</text>
          <text x="235" y="93" fill="#E50914" textAnchor="middle" fontSize="10">Zero Data Leakage</text>
          <text x="235" y="107" fill="#888" textAnchor="middle" fontSize="9">XGBoost / LightGBM</text>

          {/* Arrow 2 */}
          <line x1="300" y1="85" x2="335" y2="85" stroke="#E50914" strokeWidth="2" markerEnd="url(#arrow)" />

          {/* Node 3: Fairlearn Audit */}
          <rect x="340" y="50" width="135" height="70" rx="8" fill="#1f1f1f" stroke="#10b981" strokeWidth="1.5" />
          <text x="407" y="75" fill="#fff" textAnchor="middle" fontWeight="bold">Fairlearn Audit</text>
          <text x="407" y="93" fill="#10b981" textAnchor="middle" fontSize="10">Demographic Parity</text>
          <text x="407" y="107" fill="#888" textAnchor="middle" fontSize="9">Equalized Odds</text>

          {/* Arrow 3 */}
          <line x1="475" y1="85" x2="510" y2="85" stroke="#E50914" strokeWidth="2" markerEnd="url(#arrow)" />

          {/* Node 4: SHAP Explanations */}
          <rect x="515" y="50" width="125" height="70" rx="8" fill="#1f1f1f" stroke="#3b82f6" strokeWidth="1.5" />
          <text x="577" y="75" fill="#fff" textAnchor="middle" fontWeight="bold">SHAP Engine</text>
          <text x="577" y="93" fill="#60a5fa" textAnchor="middle" fontSize="10">Local Attributions</text>
          <text x="577" y="107" fill="#888" textAnchor="middle" fontSize="9">What-If Scenarios</text>

          {/* Arrow 4 */}
          <line x1="640" y1="85" x2="665" y2="85" stroke="#E50914" strokeWidth="2" markerEnd="url(#arrow)" />

          {/* Node 5: Output UI */}
          <rect x="670" y="50" width="80" height="70" rx="8" fill="#261010" stroke="#E50914" strokeWidth="1.5" />
          <text x="710" y="80" fill="#fff" textAnchor="middle" fontWeight="bold">Student</text>
          <text x="710" y="98" fill="#E50914" textAnchor="middle" fontSize="10">UI Action</text>
        </svg>
      </div>
    );
  }

  if (type === "chukta") {
    return (
      <div className="w-full bg-[#121212] p-4 rounded-xl border border-white/10 overflow-x-auto">
        <div className="text-[11px] font-mono font-bold text-[#E50914] uppercase tracking-wider mb-3">
          Architecture: High-Concurrency Settlement Engine (Chukta)
        </div>
        <svg viewBox="0 0 760 170" className="w-full min-w-[650px] h-auto font-mono text-[11px]">
          <defs>
            <marker id="arrow2" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 8 5 L 0 9 z" fill="#E50914" />
            </marker>
          </defs>

          {/* Node 1: Client Layer */}
          <rect x="10" y="50" width="125" height="70" rx="8" fill="#1f1f1f" stroke="#444" strokeWidth="1.5" />
          <text x="72" y="75" fill="#fff" textAnchor="middle" fontWeight="bold">Clients / Socket.IO</text>
          <text x="72" y="93" fill="#aaa" textAnchor="middle" fontSize="10">Real-Time Sync</text>
          <text x="72" y="107" fill="#888" textAnchor="middle" fontSize="9">Offline Optimistic</text>

          {/* Arrow 1 */}
          <line x1="135" y1="85" x2="165" y2="85" stroke="#E50914" strokeWidth="2" markerEnd="url(#arrow2)" />

          {/* Node 2: Integer Ledger */}
          <rect x="170" y="50" width="135" height="70" rx="8" fill="#1f1f1f" stroke="#10b981" strokeWidth="1.5" />
          <text x="237" y="75" fill="#fff" textAnchor="middle" fontWeight="bold">Integer Paise Ledger</text>
          <text x="237" y="93" fill="#10b981" textAnchor="middle" fontSize="10">Zero Float Drift</text>
          <text x="237" y="107" fill="#888" textAnchor="middle" fontSize="9">PostgreSQL + Redis</text>

          {/* Arrow 2 */}
          <line x1="305" y1="85" x2="335" y2="85" stroke="#E50914" strokeWidth="2" markerEnd="url(#arrow2)" />

          {/* Node 3: Graph Minimization Solver */}
          <rect x="340" y="50" width="150" height="70" rx="8" fill="#1f1f1f" stroke="#E50914" strokeWidth="1.5" />
          <text x="415" y="75" fill="#fff" textAnchor="middle" fontWeight="bold">Graph Solver</text>
          <text x="415" y="93" fill="#E50914" textAnchor="middle" fontSize="10">Greedy Max-Heap</text>
          <text x="415" y="107" fill="#f87171" textAnchor="middle" fontSize="9">+ Bitmask-DP Optimal</text>

          {/* Arrow 3 */}
          <line x1="490" y1="85" x2="520" y2="85" stroke="#E50914" strokeWidth="2" markerEnd="url(#arrow2)" />

          {/* Node 4: Settlement Output */}
          <rect x="525" y="50" width="120" height="70" rx="8" fill="#1f1f1f" stroke="#3b82f6" strokeWidth="1.5" />
          <text x="585" y="75" fill="#fff" textAnchor="middle" fontWeight="bold">Minimized Graph</text>
          <text x="585" y="93" fill="#60a5fa" textAnchor="middle" fontSize="10">Min Cash Flows</text>
          <text x="585" y="107" fill="#888" textAnchor="middle" fontSize="9">O(N) Transactions</text>

          {/* Arrow 4 */}
          <line x1="645" y1="85" x2="670" y2="85" stroke="#E50914" strokeWidth="2" markerEnd="url(#arrow2)" />

          {/* Node 5: UPI QR */}
          <rect x="675" y="50" width="75" height="70" rx="8" fill="#261010" stroke="#E50914" strokeWidth="1.5" />
          <text x="712" y="80" fill="#fff" textAnchor="middle" fontWeight="bold">UPI QR</text>
          <text x="712" y="98" fill="#E50914" textAnchor="middle" fontSize="10">Instant</text>
        </svg>
      </div>
    );
  }

  if (type === "retention") {
    return (
      <div className="w-full bg-[#121212] p-4 rounded-xl border border-white/10 overflow-x-auto">
        <div className="text-[11px] font-mono font-bold text-[#E50914] uppercase tracking-wider mb-3">
          Architecture: B2B Churn & Retention Analytics Pipeline
        </div>
        <svg viewBox="0 0 760 170" className="w-full min-w-[650px] h-auto font-mono text-[11px]">
          <defs>
            <marker id="arrow3" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 8 5 L 0 9 z" fill="#E50914" />
            </marker>
          </defs>

          {/* Node 1: Billing Ingestion */}
          <rect x="15" y="50" width="130" height="70" rx="8" fill="#1f1f1f" stroke="#444" strokeWidth="1.5" />
          <text x="80" y="75" fill="#fff" textAnchor="middle" fontWeight="bold">Transaction Data</text>
          <text x="80" y="93" fill="#aaa" textAnchor="middle" fontSize="10">Invoices & Payment</text>
          <text x="80" y="107" fill="#888" textAnchor="middle" fontSize="9">Galaxy Systems</text>

          {/* Arrow 1 */}
          <line x1="145" y1="85" x2="180" y2="85" stroke="#E50914" strokeWidth="2" markerEnd="url(#arrow3)" />

          {/* Node 2: RFM Feature Engineering */}
          <rect x="185" y="50" width="145" height="70" rx="8" fill="#1f1f1f" stroke="#3b82f6" strokeWidth="1.5" />
          <text x="257" y="75" fill="#fff" textAnchor="middle" fontWeight="bold">RFM Engineering</text>
          <text x="257" y="93" fill="#60a5fa" textAnchor="middle" fontSize="10">Recency & Frequency</text>
          <text x="257" y="107" fill="#888" textAnchor="middle" fontSize="9">Invoice Lag Indicators</text>

          {/* Arrow 2 */}
          <line x1="330" y1="85" x2="365" y2="85" stroke="#E50914" strokeWidth="2" markerEnd="url(#arrow3)" />

          {/* Node 3: Model Tuning */}
          <rect x="370" y="50" width="140" height="70" rx="8" fill="#1f1f1f" stroke="#E50914" strokeWidth="1.5" />
          <text x="440" y="75" fill="#fff" textAnchor="middle" fontWeight="bold">Classifier Tuning</text>
          <text x="440" y="93" fill="#E50914" textAnchor="middle" fontSize="10">Random Forest / XGB</text>
          <text x="440" y="107" fill="#888" textAnchor="middle" fontSize="9">High Recall Optimization</text>

          {/* Arrow 3 */}
          <line x1="510" y1="85" x2="545" y2="85" stroke="#E50914" strokeWidth="2" markerEnd="url(#arrow3)" />

          {/* Node 4: Calibrated Risk */}
          <rect x="550" y="50" width="125" height="70" rx="8" fill="#1f1f1f" stroke="#10b981" strokeWidth="1.5" />
          <text x="612" y="75" fill="#fff" textAnchor="middle" fontWeight="bold">Risk Scoring</text>
          <text x="612" y="93" fill="#10b981" textAnchor="middle" fontSize="10">Calibrated Churn %</text>
          <text x="612" y="107" fill="#888" textAnchor="middle" fontSize="9">Priority Flags</text>

          {/* Arrow 4 */}
          <line x1="675" y1="85" x2="695" y2="85" stroke="#E50914" strokeWidth="2" markerEnd="url(#arrow3)" />

          {/* Node 5: Sales Intervention */}
          <rect x="700" y="50" width="50" height="70" rx="8" fill="#261010" stroke="#E50914" strokeWidth="1.5" />
          <text x="725" y="80" fill="#fff" textAnchor="middle" fontWeight="bold">Sales</text>
          <text x="725" y="98" fill="#E50914" textAnchor="middle" fontSize="9">Alert</text>
        </svg>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#121212] p-4 rounded-xl border border-white/10">
      <div className="text-[11px] font-mono font-bold text-zinc-400 uppercase tracking-wider mb-2">
        System Dataflow Architecture
      </div>
      <div className="flex items-center justify-between gap-3 text-xs font-mono text-zinc-300 py-2 overflow-x-auto">
        <span className="p-2.5 rounded bg-zinc-800 border border-white/10">Client Input / Sensors</span>
        <span className="text-[#E50914]">→</span>
        <span className="p-2.5 rounded bg-zinc-800 border border-[#E50914]/40 text-white">Algorithmic Processing</span>
        <span className="text-[#E50914]">→</span>
        <span className="p-2.5 rounded bg-zinc-800 border border-white/10">Validation / Storage</span>
        <span className="text-[#E50914]">→</span>
        <span className="p-2.5 rounded bg-zinc-800 border border-emerald-500/40 text-emerald-400">Production Output</span>
      </div>
    </div>
  );
}
