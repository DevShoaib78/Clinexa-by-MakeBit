import { ExternalLink, Calendar, Building2, MapPin, DollarSign } from "lucide-react";
import { Tender } from "../types";

interface TenderCardProps {
  tender: Tender;
  onViewDetails: () => void;
}

export function TenderCard({ tender, onViewDetails }: TenderCardProps) {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case "open":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "closing_soon":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "closed":
        return "bg-red-500/10 text-red-400 border-red-500/20";
      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/20";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "open":
        return "Open";
      case "closing_soon":
        return "Closing Soon";
      case "closed":
        return "Closed";
      default:
        return status;
    }
  };

  const getDaysUntilDeadline = (deadline?: string) => {
    if (!deadline) return null;
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysRemaining = getDaysUntilDeadline(tender.deadline);

  return (
    <div className="group relative glass-strong rounded-xl sm:rounded-2xl p-4 sm:p-6 border-slate-700/50 hover:border-emerald-500/50 transition-all duration-500 hover:scale-[1.01] sm:hover:scale-[1.02] hover:shadow-2xl hover:shadow-emerald-500/20 overflow-hidden">
      {/* Gradient Overlay on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-emerald-600/0 group-hover:from-emerald-500/5 group-hover:to-emerald-600/10 transition-all duration-500 rounded-xl sm:rounded-2xl pointer-events-none" />

      {/* Animated Border Glow */}
      <div className="absolute -inset-[1px] bg-gradient-to-r from-emerald-500/0 via-emerald-400/0 to-emerald-500/0 group-hover:from-emerald-500/20 group-hover:via-emerald-400/30 group-hover:to-emerald-500/20 rounded-xl sm:rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4 sm:mb-5 gap-3 sm:gap-4">
          <h3 className="text-lg sm:text-xl font-bold text-slate-100 leading-tight flex-1 group-hover:text-emerald-400 transition-colors duration-300">
            {tender.title}
          </h3>
          <span
            className={`px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-xs font-bold border-2 ${getStatusStyles(
              tender.status
            )} flex-shrink-0 uppercase tracking-wide whitespace-nowrap`}
          >
            {getStatusText(tender.status)}
          </span>
        </div>

        <div className="space-y-3 mb-5">
          {tender.authority && (
            <div className="flex items-start gap-3 text-sm group/item hover:translate-x-1 transition-transform duration-200">
              <div className="p-2 rounded-lg bg-slate-800/50 group-hover/item:bg-emerald-500/10 transition-colors">
                <Building2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              </div>
              <span className="text-slate-300 pt-1.5">
                <span className="text-slate-500 font-medium">Client:</span> {tender.authority}
              </span>
            </div>
          )}

          {tender.estimatedValue && (
            <div className="flex items-start gap-3 text-sm group/item hover:translate-x-1 transition-transform duration-200">
              <div className="p-2 rounded-lg bg-slate-800/50 group-hover/item:bg-emerald-500/10 transition-colors">
                <DollarSign className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              </div>
              <span className="text-slate-300 pt-1.5">
                <span className="text-slate-500 font-medium">Value:</span> {tender.estimatedValue}
              </span>
            </div>
          )}

          <div className="flex items-start gap-3 text-sm group/item hover:translate-x-1 transition-transform duration-200">
            <div className="p-2 rounded-lg bg-slate-800/50 group-hover/item:bg-emerald-500/10 transition-colors">
              <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            </div>
            <span className="text-slate-300 pt-1.5">
              <span className="text-slate-500 font-medium">Location:</span> {tender.city}
              {tender.area && ` – ${tender.area}`}
            </span>
          </div>

          {tender.deadline && (
            <div className="flex items-start gap-3 text-sm group/item hover:translate-x-1 transition-transform duration-200">
              <div className="p-2 rounded-lg bg-slate-800/50 group-hover/item:bg-emerald-500/10 transition-colors">
                <Calendar className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              </div>
              <span className="text-slate-300 pt-1.5">
                <span className="text-slate-500 font-medium">Deadline:</span>{" "}
                {new Date(tender.deadline).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
                {daysRemaining !== null && daysRemaining > 0 && (
                  <span className="ml-2 px-2 py-0.5 bg-amber-500/20 text-amber-400 rounded-md text-xs font-semibold border border-amber-500/30">
                    {daysRemaining} {daysRemaining === 1 ? "day" : "days"} left
                  </span>
                )}
              </span>
            </div>
          )}

          {tender.category && (
            <div className="flex items-center gap-2 pt-1">
              <span className="px-3 py-1.5 bg-gradient-to-r from-slate-800/70 to-slate-800/50 text-emerald-400 text-xs rounded-lg border border-slate-700 font-semibold uppercase tracking-wide">
                {tender.category}
              </span>
            </div>
          )}
        </div>

        {tender.aiInsight && (
          <div className="mb-5 p-4 bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/30 rounded-xl relative overflow-hidden group/insight">
            <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-400/10 rounded-full blur-2xl" />
            <div className="relative flex items-start gap-2">
              <svg className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <p className="text-sm text-slate-200 font-medium leading-relaxed">{tender.aiInsight}</p>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 pt-4 sm:pt-5 border-t border-slate-700/50">
          <button
            onClick={onViewDetails}
            className="flex-1 px-4 sm:px-5 py-2.5 sm:py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/30 text-sm sm:text-base"
          >
            View details
          </button>
          {tender.sourceUrl && (
            <a
              href={tender.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 text-slate-300 hover:text-emerald-400 text-xs sm:text-sm font-semibold transition-all duration-300 hover:scale-105 bg-slate-800/50 rounded-lg sm:rounded-xl border border-slate-700 hover:border-emerald-500/50"
            >
              <span>Source</span>
              <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </a>
          )}
        </div>

        <p className="mt-5 text-xs text-slate-500 text-center leading-relaxed">
          Data sourced from public information. Always verify details on the official portal.
        </p>
      </div>
    </div>
  );
}
