import { useState, useRef } from "react";
import { SymptomInput, SymptomAnalysis, AgentStep } from "../types";
import { analyzeSymptoms } from "../api/analyzeSymptoms";
import { SymptomsForm } from "../components/SymptomsForm";
import { SymptomAnalysisResult } from "../components/SymptomAnalysisResult";
import { AgentStatus } from "../components/AgentStatus";
import Aurora from "../components/Aurora";

export function HomePage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<SymptomAnalysis | null>(null);
  const [agentSteps, setAgentSteps] = useState<AgentStep[]>([]);
  const searchPanelRef = useRef<HTMLDivElement>(null);

  const scrollToSearch = () => {
    searchPanelRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const handleAnalyze = async (input: SymptomInput) => {
    setIsAnalyzing(true);
    setAnalysis(null);

    const steps: AgentStep[] = [
      { id: "step-1", text: "Dr. Clinexa is reviewing your symptoms...", status: "pending" },
      { id: "step-2", text: "Conducting differential diagnosis analysis...", status: "pending" },
      { id: "step-3", text: "Assessing severity and identifying warning signs...", status: "pending" },
      { id: "step-4", text: "Formulating clinical recommendations...", status: "pending" },
      { id: "step-5", text: "Preparing your comprehensive health assessment...", status: "pending" },
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

    const result = await analyzeSymptoms(input);

    setAgentSteps((prev) =>
      prev.map((step) => ({ ...step, status: "done" as const }))
    );

    setTimeout(() => {
      setAnalysis(result);
      setIsAnalyzing(false);
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
            colorStops={["#ef4444", "#f87171", "#fb7185"]}
            blend={0.7}
            amplitude={1.5}
            speed={0.4}
          />
        </div>

        {/* Gradient Orbs - Behind Aurora */}
        <div className="absolute top-0 left-1/4 w-[250px] sm:w-[350px] md:w-[500px] h-[250px] sm:h-[350px] md:h-[500px] bg-red-500/10 rounded-full blur-3xl animate-blob z-0" />
        <div className="absolute top-1/4 right-1/4 w-[200px] sm:w-[300px] md:w-[400px] h-[200px] sm:h-[300px] md:h-[400px] bg-red-600/10 rounded-full blur-3xl animate-blob z-0" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-0 left-1/3 w-[300px] sm:w-[450px] md:w-[600px] h-[300px] sm:h-[450px] md:h-[600px] bg-rose-400/5 rounded-full blur-3xl animate-blob z-0" style={{ animationDelay: '4s' }} />

        {/* Particles */}
        <div className="particles z-5">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="particle" style={{ left: `${i * 10}%` }} />
          ))}
        </div>

        {/* Grid Pattern - Subtle overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.02)_1px,transparent_1px)] bg-[size:50px_50px] z-5" />
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="relative pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-slideUp">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-100 mb-4 sm:mb-6 leading-tight tracking-tight">
                Understand your symptoms with{" "}
                <br className="hidden sm:block" />
                <span className="gradient-text-animated inline-block pb-2">
                  AI-powered insights
                </span>
              </h1>
            </div>

            <div className="animate-slideUp" style={{ animationDelay: '0.1s', opacity: 0, animationFillMode: 'forwards' }}>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-300 mb-8 sm:mb-10 md:mb-12 max-w-3xl mx-auto leading-relaxed px-2 font-normal">
                Describe your symptoms and get structured, AI-powered health insights —
                <br className="hidden md:block" />
                <span className="text-red-400 font-semibold">fast, clear, and trustworthy.</span>
              </p>
            </div>

            <div className="animate-slideUp" style={{ animationDelay: '0.2s', opacity: 0, animationFillMode: 'forwards' }}>
              <button
                onClick={scrollToSearch}
                className="group relative inline-flex items-center px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold rounded-xl sm:rounded-2xl shadow-lg shadow-red-500/30 transition-all duration-300 hover:scale-105 hover:shadow-red-500/50 overflow-hidden text-sm sm:text-base md:text-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <span className="relative">Analyze Your Symptoms</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Analysis Section */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12 animate-scaleIn" ref={searchPanelRef}>
        <SymptomsForm onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
      </div>

      {/* Results Section */}
      {(isAnalyzing || analysis) && (
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
          {isAnalyzing && (
            <AgentStatus steps={agentSteps} />
          )}

          {!isAnalyzing && analysis && (
            <SymptomAnalysisResult analysis={analysis} />
          )}
        </div>
      )}
    </div>
  );
}
