import { SymptomAnalysis } from "../types";
import { AlertTriangle, CheckCircle, Activity, Stethoscope, AlertCircle, Download } from "lucide-react";
import { DOCTOR_SPECIALTIES } from "../api/analyzeSymptoms";

interface SymptomAnalysisResultProps {
  analysis: SymptomAnalysis;
}

export function SymptomAnalysisResult({ analysis }: SymptomAnalysisResultProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "urgent":
        return "text-red-500 bg-red-500/10 border-red-500/30";
      case "moderate":
        return "text-yellow-500 bg-yellow-500/10 border-yellow-500/30";
      case "mild":
        return "text-green-500 bg-green-500/10 border-green-500/30";
      default:
        return "text-slate-500 bg-slate-500/10 border-slate-500/30";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "urgent":
        return <AlertTriangle className="w-5 h-5" />;
      case "moderate":
        return <AlertCircle className="w-5 h-5" />;
      case "mild":
        return <CheckCircle className="w-5 h-5" />;
      default:
        return <Activity className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-red-500/10 to-red-600/5 border border-red-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-6">
        <div className="flex-1 mb-3 sm:mb-4">
          <h3 className="text-base sm:text-lg font-semibold text-slate-100 mb-2">
            Analysis Complete
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            {analysis.summary}
          </p>
        </div>
        
        {/* Severity Badge */}
        <div className="flex flex-wrap gap-2">
          <span className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold border ${getSeverityColor(analysis.severity)}`}>
            {getSeverityIcon(analysis.severity)}
            Severity: {analysis.severity.charAt(0).toUpperCase() + analysis.severity.slice(1)}
          </span>
          {analysis.shouldSeeDoctorUrgently && (
            <span className="inline-flex items-center gap-2 px-3 py-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg text-sm font-semibold animate-pulse">
              <AlertTriangle className="w-4 h-4" />
              Seek Medical Attention
            </span>
          )}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Possible Conditions */}
        <div className="glass-strong rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-slate-700/50">
          <h4 className="text-base sm:text-lg font-semibold text-slate-100 mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-red-400" />
            Possible Conditions
          </h4>
          <ul className="space-y-2">
            {analysis.possibleConditions.map((condition, index) => (
              <li key={index} className="flex items-start gap-3 text-sm text-slate-300">
                <span className="text-red-400 mt-1">•</span>
                <span>{condition}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Red Flags */}
        <div className="glass-strong rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-slate-700/50">
          <h4 className="text-base sm:text-lg font-semibold text-slate-100 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-400" />
            Warning Signs
          </h4>
          <ul className="space-y-2">
            {analysis.redFlags.map((flag, index) => (
              <li key={index} className="flex items-start gap-3 text-sm text-slate-300">
                <span className="text-yellow-400 mt-1">⚠</span>
                <span>{flag}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recommended Actions */}
      <div className="glass-strong rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-slate-700/50">
        <h4 className="text-base sm:text-lg font-semibold text-slate-100 mb-4 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-400" />
          Recommended Actions
        </h4>
        <ul className="space-y-3">
          {analysis.recommendedActions.map((action, index) => (
            <li key={index} className="flex items-start gap-3 text-sm text-slate-300">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-400 text-xs font-semibold">
                {index + 1}
              </span>
              <span>{action}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Doctor's Professional Opinion */}
      {analysis.doctorNotes && (
        <div className="glass-strong rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-transparent">
          <h4 className="text-base sm:text-lg font-semibold text-slate-100 mb-3 flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-blue-400" />
            Doctor's Notes
          </h4>
          <p className="text-sm text-slate-300 leading-relaxed italic border-l-2 border-blue-500/30 pl-4">
            "{analysis.doctorNotes}"
          </p>
        </div>
      )}

      {/* Suggested Specialist */}
      {analysis.suggestedSpecialist && (
        <div className="glass-strong rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-red-500/20 bg-gradient-to-br from-red-500/5 to-transparent">
          <h4 className="text-base sm:text-lg font-semibold text-slate-100 mb-2 flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-red-400" />
            Recommended Specialist
          </h4>
          <p className="text-sm text-slate-300 mb-4">
            Based on my clinical assessment, I recommend consulting with:
          </p>
          <div className="inline-flex items-center gap-3 px-4 py-3 bg-slate-800/50 border border-red-500/30 rounded-lg">
            <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
              <Stethoscope className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <p className="text-base font-semibold text-slate-100">{analysis.suggestedSpecialist}</p>
              <p className="text-xs text-slate-400">Specialized Medical Care</p>
            </div>
          </div>
        </div>
      )}

      {/* Connect with Doctors Section */}
      <div className="glass-strong rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-slate-700/50">
        <h4 className="text-base sm:text-lg font-semibold text-slate-100 mb-2">
          Connect with Doctors
        </h4>
        <p className="text-xs sm:text-sm text-slate-400 mb-6">
          Choose a specialist to connect with for professional medical consultation
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {DOCTOR_SPECIALTIES.slice(0, 6).map((specialty) => (
            <button
              key={specialty.id}
              className="group relative p-4 bg-slate-800/50 hover:bg-slate-800/70 border border-slate-700/50 hover:border-red-500/30 rounded-lg transition-all duration-300 text-left"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-red-500/10 group-hover:bg-red-500/20 flex items-center justify-center transition-colors flex-shrink-0">
                  <Stethoscope className="w-5 h-5 text-red-400" />
                </div>
                <div className="min-w-0">
                  <h5 className="text-sm font-semibold text-slate-100 mb-1 group-hover:text-red-400 transition-colors">
                    {specialty.name}
                  </h5>
                  <p className="text-xs text-slate-400 line-clamp-2">
                    {specialty.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="glass-strong rounded-xl p-4 border border-yellow-500/20 bg-yellow-500/5">
        <p className="text-xs text-slate-400 leading-relaxed">
          <span className="font-semibold text-yellow-400">Medical Disclaimer:</span> {analysis.disclaimer}
        </p>
      </div>

      {/* Download Report (Placeholder) */}
      <div className="flex justify-center">
        <button
          disabled
          className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800/50 border border-slate-700/50 text-slate-400 rounded-lg text-sm font-medium cursor-not-allowed opacity-50"
        >
          <Download className="w-4 h-4" />
          Download Health Report (Coming Soon)
        </button>
      </div>
    </div>
  );
}
