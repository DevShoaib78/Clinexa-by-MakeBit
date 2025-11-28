import { Doctor } from "../types";
import { MapPin, ExternalLink, Stethoscope, AlertCircle, Loader2 } from "lucide-react";

interface DoctorRecommendationsProps {
  doctors: Doctor[];
  isSearching: boolean;
  hasLocation: boolean;
  error?: string;
}

export function DoctorRecommendations({ 
  doctors, 
  isSearching, 
  hasLocation,
  error 
}: DoctorRecommendationsProps) {
  
  // Loading state
  if (isSearching) {
    return (
      <div className="glass-strong rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-slate-700/50 animate-fadeIn">
        <div className="flex items-center justify-center gap-3 py-8">
          <Loader2 className="w-6 h-6 text-red-400 animate-spin" />
          <p className="text-slate-300 text-sm sm:text-base">
            Searching for doctors and clinics near you...
          </p>
        </div>
      </div>
    );
  }

  // No location provided
  if (!hasLocation) {
    return (
      <div className="glass-strong rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-yellow-500/20 bg-yellow-500/5 animate-fadeIn">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-base sm:text-lg font-semibold text-slate-100 mb-2">
              Location Required for Doctor Recommendations
            </h4>
            <p className="text-sm text-slate-300">
              To see nearby doctors, please add your <strong>country</strong> and <strong>city</strong> when describing your symptoms.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="glass-strong rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-red-500/20 bg-red-500/5 animate-fadeIn">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-base sm:text-lg font-semibold text-slate-100 mb-2">
              Unable to Fetch Doctors
            </h4>
            <p className="text-sm text-slate-300 mb-3">
              We couldn't fetch nearby doctors at the moment. Please try again later or search manually.
            </p>
            <p className="text-xs text-slate-400">
              Error: {error}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // No doctors found
  if (doctors.length === 0) {
    return (
      <div className="glass-strong rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-slate-700/50 animate-fadeIn">
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-slate-800/50 border border-slate-700 rounded-full mb-4">
            <Stethoscope className="w-6 h-6 text-slate-400" />
          </div>
          <h4 className="text-base sm:text-lg font-semibold text-slate-100 mb-2">
            No Nearby Doctors Found
          </h4>
          <p className="text-sm text-slate-300 max-w-md mx-auto">
            We couldn't find relevant doctors or clinics for your area. Try widening your location or searching manually.
          </p>
        </div>
      </div>
    );
  }

  // Display doctor cards
  return (
    <div className="space-y-4 animate-fadeIn">
      {/* Header */}
      <div className="glass-strong rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-red-500/20 bg-gradient-to-br from-red-500/5 to-transparent">
        <h3 className="text-base sm:text-lg font-semibold text-slate-100 mb-2 flex items-center gap-2">
          <Stethoscope className="w-5 h-5 text-red-400" />
          Recommended Doctors Near You
        </h3>
        <p className="text-xs sm:text-sm text-slate-300">
          Based on your symptoms and location, here are some doctors and clinics you can consider.{" "}
          <span className="text-slate-400">
            We do not endorse or verify these providers — always confirm details yourself.
          </span>
        </p>
      </div>

      {/* Doctor Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {doctors.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </div>

      {/* Disclaimer */}
      <div className="glass-strong rounded-xl p-4 border border-yellow-500/20 bg-yellow-500/5">
        <p className="text-xs text-slate-400 leading-relaxed">
          <span className="font-semibold text-yellow-400">Important Disclaimer:</span> Clinexa does not endorse or verify any specific doctor or clinic. These recommendations are based on web search results and may not be accurate or current. Always do your own research, verify credentials, and follow local medical regulations. In emergencies, contact your local emergency services immediately.
        </p>
      </div>
    </div>
  );
}

/**
 * Individual Doctor Card Component
 */
function DoctorCard({ doctor }: { doctor: Doctor }) {
  const isMatchingSpecialty = doctor.notes?.includes("Matches recommended specialty");

  return (
    <div 
      className={`group relative glass-strong rounded-xl p-4 sm:p-5 border transition-all duration-300 hover:scale-[1.01] ${
        isMatchingSpecialty 
          ? "border-red-500/30 bg-gradient-to-br from-red-500/5 to-transparent" 
          : "border-slate-700/50 hover:border-red-500/20"
      }`}
    >
      {/* Matching Badge */}
      {isMatchingSpecialty && (
        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-500/20 border border-red-500/30 rounded-full text-xs font-semibold text-red-400">
            <Stethoscope className="w-3 h-3" />
            Recommended
          </span>
        </div>
      )}

      <div className="space-y-3">
        {/* Name */}
        <div>
          <h4 className="text-base sm:text-lg font-semibold text-slate-100 group-hover:text-red-400 transition-colors pr-20">
            {doctor.name}
          </h4>
          {doctor.specialization && (
            <p className="text-sm text-red-400 font-medium mt-1">
              {doctor.specialization}
            </p>
          )}
        </div>

        {/* Location */}
        {doctor.location && (
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-slate-300">
              {doctor.location}
            </p>
          </div>
        )}

        {/* Notes/Explanation */}
        {doctor.notes && (
          <p className="text-xs text-slate-400 italic border-l-2 border-slate-700 pl-3">
            {doctor.notes}
          </p>
        )}

        {/* Source */}
        {doctor.sourceName && (
          <p className="text-xs text-slate-500">
            Found via Tavily search (source: {doctor.sourceName})
          </p>
        )}

        {/* Action Button */}
        {doctor.sourceUrl && (
          <a
            href={doctor.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/50 text-red-400 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105"
          >
            <span>View Details</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </div>
  );
}

