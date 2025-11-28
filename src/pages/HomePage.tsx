import { useState, useRef } from "react";
import { SearchParams, Tender, AgentStep } from "../types";
import { searchTenders } from "../api/searchTenders";
import { SearchForm } from "../components/SearchForm";
import { ResultsList } from "../components/ResultsList";
import { AgentStatus } from "../components/AgentStatus";
import Aurora from "../components/Aurora";

export function HomePage() {
  const [isSearching, setIsSearching] = useState(false);
  const [tenders, setTenders] = useState<Tender[]>([]);
  const [searchParams, setSearchParams] = useState<SearchParams | null>(null);
  const [agentSteps, setAgentSteps] = useState<AgentStep[]>([]);
  const searchPanelRef = useRef<HTMLDivElement>(null);

  const scrollToSearch = () => {
    searchPanelRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const handleSearch = async (params: SearchParams) => {
    setIsSearching(true);
    setSearchParams(params);
    setTenders([]);

    const steps: AgentStep[] = [
      { id: "step-1", text: "Checking government procurement portals", status: "pending" },
      { id: "step-2", text: "Scanning recent public tender announcements", status: "pending" },
      { id: "step-3", text: "Extracting key tender details and requirements", status: "pending" },
    ];
    setAgentSteps(steps);

    for (let i = 0; i < steps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 600));
      setAgentSteps((prev) =>
        prev.map((step, idx) => ({
          ...step,
          status: idx < i ? "done" : idx === i ? "active" : "pending",
        }))
      );
    }

    const results = await searchTenders(params);

    setAgentSteps((prev) =>
      prev.map((step) => ({ ...step, status: "done" as const }))
    );

    setTimeout(() => {
      setTenders(results);
      setIsSearching(false);
      setAgentSteps([]);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-950 relative">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Aurora Effect - Top Layer */}
        <div className="absolute inset-0 opacity-80 z-10">
          <Aurora
            colorStops={["#10b981", "#34d399", "#059669"]}
            blend={0.7}
            amplitude={1.5}
            speed={0.4}
          />
        </div>

        {/* Gradient Orbs - Behind Aurora */}
        <div className="absolute top-0 left-1/4 w-[250px] sm:w-[350px] md:w-[500px] h-[250px] sm:h-[350px] md:h-[500px] bg-emerald-500/10 rounded-full blur-3xl animate-blob z-0" />
        <div className="absolute top-1/4 right-1/4 w-[200px] sm:w-[300px] md:w-[400px] h-[200px] sm:h-[300px] md:h-[400px] bg-emerald-600/10 rounded-full blur-3xl animate-blob z-0" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-0 left-1/3 w-[300px] sm:w-[450px] md:w-[600px] h-[300px] sm:h-[450px] md:h-[600px] bg-emerald-400/5 rounded-full blur-3xl animate-blob z-0" style={{ animationDelay: '4s' }} />

        {/* Particles */}
        <div className="particles z-5">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="particle" style={{ left: `${i * 10}%` }} />
          ))}
        </div>

        {/* Grid Pattern - Subtle overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.02)_1px,transparent_1px)] bg-[size:50px_50px] z-5" />
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="relative pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-slideUp">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-100 mb-4 sm:mb-6 leading-tight tracking-tight">
                Find the right construction tenders in{" "}
                <br className="hidden sm:block" />
                <span className="gradient-text-animated inline-block pb-2">
                  Riyadh & Jeddah
                </span>
              </h1>
            </div>

            <div className="animate-slideUp" style={{ animationDelay: '0.1s', opacity: 0, animationFillMode: 'forwards' }}>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-300 mb-8 sm:mb-10 md:mb-12 max-w-3xl mx-auto leading-relaxed px-2 font-normal">
                Search public construction opportunities by area and project type,
                <br className="hidden md:block" />
                and get <span className="text-emerald-400 font-semibold">AI-ready summaries</span> with the key details that matter.
              </p>
            </div>

            <div className="animate-slideUp" style={{ animationDelay: '0.2s', opacity: 0, animationFillMode: 'forwards' }}>
              <button
                onClick={scrollToSearch}
                className="group relative inline-flex items-center px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold rounded-xl sm:rounded-2xl shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:scale-105 hover:shadow-emerald-500/50 overflow-hidden text-sm sm:text-base md:text-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <span className="relative">Start searching tenders</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12 animate-scaleIn" ref={searchPanelRef}>
        <SearchForm onSearch={handleSearch} isSearching={isSearching} />
      </div>

      {/* Results Section */}
      {(isSearching || tenders.length > 0) && (
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
          {isSearching && searchParams && (
            <AgentStatus city={searchParams.city} steps={agentSteps} />
          )}

          {!isSearching && tenders.length > 0 && searchParams && (
            <ResultsList tenders={tenders} searchParams={searchParams} onRefresh={handleSearch} />
          )}

          {!isSearching && tenders.length === 0 && searchParams && (
            <div className="text-center py-12 sm:py-14 md:py-16 animate-slideUp px-4">
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-full bg-slate-800/50 border border-slate-700 mb-4 sm:mb-5 md:mb-6">
                <svg className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-200 mb-2 sm:mb-3">
                No tenders found for this search
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-slate-400 max-w-md mx-auto px-2">
                Try widening your area, changing project type, or searching in another city.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
