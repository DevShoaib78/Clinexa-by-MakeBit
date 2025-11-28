import { AgentStep } from "../types";
import { Loader2, CheckCircle2, Circle } from "lucide-react";

interface AgentStatusProps {
  steps: AgentStep[];
}

export function AgentStatus({ steps }: AgentStatusProps) {
  return (
    <div className="relative glass-strong rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 mb-6 sm:mb-8 border-red-500/30 overflow-hidden animate-scaleIn">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-red-600/5 to-transparent animate-gradient" />

      {/* Glow Effect */}
      <div className="absolute top-0 right-0 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 bg-red-400/20 rounded-full blur-3xl animate-pulse-glow" />

      <div className="relative flex items-start gap-4 sm:gap-5 md:gap-6">
        <div className="flex-shrink-0 mt-1">
          <div className="relative">
            <Loader2 className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-red-400 animate-spin" />
            <div className="absolute inset-0 bg-red-400/30 blur-xl rounded-full animate-pulse-glow" />
            <div className="absolute -inset-1 sm:-inset-2 border-2 border-red-500/20 rounded-full animate-ping" />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-100 mb-2 gradient-text-animated break-words">
            Analyzing your symptoms...
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mb-4 sm:mb-5 md:mb-6 font-medium">
            Our AI is processing your symptoms to provide structured health insights
          </p>

          <div className="space-y-4">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className="flex items-center gap-4 text-sm transition-all duration-500 animate-slideUp"
                style={{ animationDelay: `${index * 0.1}s`, opacity: 0, animationFillMode: 'forwards' }}
              >
                <div className="flex-shrink-0">
                  {step.status === "done" && (
                    <div className="relative">
                      <CheckCircle2 className="w-5 h-5 text-red-400" />
                      <div className="absolute inset-0 bg-red-400/20 blur-md rounded-full" />
                    </div>
                  )}
                  {step.status === "active" && (
                    <div className="relative">
                      <Loader2 className="w-5 h-5 text-red-400 animate-spin" />
                      <div className="absolute inset-0 bg-red-400/30 blur-lg rounded-full animate-pulse" />
                    </div>
                  )}
                  {step.status === "pending" && (
                    <Circle className="w-5 h-5 text-slate-600" />
                  )}
                </div>
                <div className="flex-1 flex items-center gap-3">
                  <span
                    className={`font-medium transition-all duration-300 ${step.status === "done"
                        ? "text-slate-500 line-through"
                        : step.status === "active"
                          ? "text-slate-100 font-semibold"
                          : "text-slate-600"
                      }`}
                  >
                    {step.text}
                  </span>
                  {step.status === "active" && (
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                      <div className="w-1.5 h-1.5 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-1.5 h-1.5 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
