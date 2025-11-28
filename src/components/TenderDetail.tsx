import { X, ExternalLink, Calendar, Building2, MapPin, DollarSign, FileText, AlertCircle } from "lucide-react";
import { Tender } from "../types";

interface TenderDetailProps {
  tender: Tender;
  onClose: () => void;
}

export function TenderDetail({ tender, onClose }: TenderDetailProps) {
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center sm:justify-end bg-slate-950/80 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full sm:w-full sm:max-w-2xl h-full bg-slate-900 shadow-2xl overflow-y-auto animate-slideInRight sm:animate-slideInRight"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 bg-slate-900 border-b border-slate-800 px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 pr-2 sm:pr-4 min-w-0">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-100 mb-2 break-words">
                {tender.title}
              </h2>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 text-xs sm:text-sm text-slate-400">
                <span className={`px-2.5 sm:px-3 py-1 rounded-full text-xs font-medium border whitespace-nowrap ${getStatusStyles(tender.status)}`}>
                  {getStatusText(tender.status)}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="break-words">{tender.city}{tender.area && ` – ${tender.area}`}</span>
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 p-2 hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">
          <div>
            <h3 className="text-xs sm:text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3 sm:mb-4">
              Key Facts
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {tender.authority && (
                <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Building2 className="w-4 h-4 text-slate-500" />
                    <span className="text-xs text-slate-500 uppercase tracking-wider">
                      Client / Authority
                    </span>
                  </div>
                  <p className="text-base font-medium text-slate-200">
                    {tender.authority}
                  </p>
                </div>
              )}

              {tender.category && (
                <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <FileText className="w-4 h-4 text-slate-500" />
                    <span className="text-xs text-slate-500 uppercase tracking-wider">
                      Category
                    </span>
                  </div>
                  <p className="text-base font-medium text-slate-200">
                    {tender.category}
                  </p>
                </div>
              )}

              {tender.estimatedValue && (
                <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <DollarSign className="w-4 h-4 text-slate-500" />
                    <span className="text-xs text-slate-500 uppercase tracking-wider">
                      Estimated Value
                    </span>
                  </div>
                  <p className="text-base font-medium text-slate-200">
                    {tender.estimatedValue}
                  </p>
                </div>
              )}

              {tender.submissionDeadline && (
                <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="w-4 h-4 text-slate-500" />
                    <span className="text-xs text-slate-500 uppercase tracking-wider">
                      Submission Deadline
                    </span>
                  </div>
                  <p className="text-base font-medium text-slate-200">
                    {new Date(tender.submissionDeadline).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              )}

              {tender.duration && (
                <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="w-4 h-4 text-slate-500" />
                    <span className="text-xs text-slate-500 uppercase tracking-wider">
                      Project Duration
                    </span>
                  </div>
                  <p className="text-base font-medium text-slate-200">
                    {tender.duration}
                  </p>
                </div>
              )}

              {tender.sourceName && (
                <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <ExternalLink className="w-4 h-4 text-slate-500" />
                    <span className="text-xs text-slate-500 uppercase tracking-wider">
                      Source Portal
                    </span>
                  </div>
                  <p className="text-base font-medium text-slate-200">
                    {tender.sourceName}
                  </p>
                </div>
              )}
            </div>
          </div>

          {tender.summary && (
            <div>
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Summary
              </h3>
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
                <p className="text-slate-300 leading-relaxed">{tender.summary}</p>
              </div>
            </div>
          )}

          {tender.requirements && tender.requirements.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Key Requirements
              </h3>
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
                <ul className="space-y-2">
                  {tender.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-2 text-slate-300">
                      <span className="text-emerald-400 mt-1">•</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {(tender.announcementDate || tender.clarificationDeadline || tender.submissionDeadline) && (
            <div>
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Timeline
              </h3>
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 space-y-3">
                {tender.announcementDate && (
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Announcement Date</span>
                    <span className="text-slate-200 font-medium">
                      {new Date(tender.announcementDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                )}
                {tender.clarificationDeadline && (
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Clarification Deadline</span>
                    <span className="text-slate-200 font-medium">
                      {new Date(tender.clarificationDeadline).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                )}
                {tender.submissionDeadline && (
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Submission Deadline</span>
                    <span className="text-emerald-400 font-medium">
                      {new Date(tender.submissionDeadline).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-slate-300 leading-relaxed">
                Always confirm deadlines and requirements on the official portal
                before bidding. This information is provided for convenience only.
              </p>
            </div>
          </div>

          {tender.sourceUrl && (
            <a
              href={tender.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold rounded-lg sm:rounded-xl shadow-lg shadow-emerald-500/30 transition-all duration-200 hover:scale-[1.02] text-sm sm:text-base"
            >
              <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Open official tender page</span>
            </a>
          )}

          <button
            onClick={onClose}
            className="w-full px-4 sm:px-6 py-2.5 sm:py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium rounded-lg sm:rounded-xl border border-slate-700 transition-colors text-sm sm:text-base"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
