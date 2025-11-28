import { useState, useEffect, useRef } from "react";
import { Activity, Mic, MicOff } from "lucide-react";
import { SymptomInput } from "../types";
import { useSpeechInput } from "../hooks/useSpeechInput";

interface SymptomsFormProps {
    onAnalyze: (input: SymptomInput) => void;
    isAnalyzing: boolean;
}

export function SymptomsForm({ onAnalyze, isAnalyzing }: SymptomsFormProps) {
    const [symptoms, setSymptoms] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [area, setArea] = useState("");
    
    // Use refs to access latest state in callbacks
    const symptomsRef = useRef(symptoms);
    const countryRef = useRef(country);
    const cityRef = useRef(city);
    const areaRef = useRef(area);

    // Keep refs updated
    useEffect(() => {
        symptomsRef.current = symptoms;
        countryRef.current = country;
        cityRef.current = city;
        areaRef.current = area;
    }, [symptoms, country, city, area]);

    const { isListening, startListening, stopListening } = useSpeechInput({
        onTranscription: (text: string) => {
            // Update refs immediately for use in onEnd callback
            symptomsRef.current = text;
            
            // Update state for UI
            setSymptoms(text);
        },
        onEnd: () => {
            // Auto-trigger analysis after voice input completes
            setTimeout(() => {
                const currentSymptoms = symptomsRef.current;
                const currentCountry = countryRef.current;
                const currentCity = cityRef.current;
                const currentArea = areaRef.current;

                // Only analyze if we have meaningful input
                if (currentSymptoms.trim()) {
                    onAnalyze({
                        symptoms: currentSymptoms,
                        voiceInput: true,
                        country: currentCountry.trim() || undefined,
                        city: currentCity.trim() || undefined,
                        area: currentArea.trim() || undefined,
                    });
                }
            }, 150);
        },
    });

    const handleMicClick = () => {
        if (isListening) {
            stopListening();
        } else {
            startListening();
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (symptoms.trim()) {
            onAnalyze({
                symptoms: symptoms.trim(),
                voiceInput: false,
                country: country.trim() || undefined,
                city: city.trim() || undefined,
                area: area.trim() || undefined,
            });
        }
    };

    return (
        <div className="glass-strong rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl border border-red-500/20">
            {/* Header Row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-slate-100 flex items-center gap-2 sm:gap-3">
                    <Activity className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-red-400" />
                    Describe Your Symptoms
                </h2>
                <button
                    type="button"
                    onClick={handleMicClick}
                    className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
                        isListening
                            ? "bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30"
                            : "text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-transparent hover:border-red-500/20"
                    }`}
                >
                    {isListening ? (
                        <>
                            <MicOff className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            <span className="hidden sm:inline">Stop listening</span>
                            <span className="sm:hidden">Stop</span>
                        </>
                    ) : (
                        <>
                            <Mic className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            <span className="hidden sm:inline">Use voice input</span>
                            <span className="sm:hidden">Voice</span>
                        </>
                    )}
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                {/* Location Section */}
                <div className="space-y-4 pb-6 border-b border-slate-700/50">
                    <div className="flex items-center gap-2">
                        <h3 className="text-base sm:text-lg font-semibold text-slate-100">
                            Where are you located?
                        </h3>
                        <span className="text-xs text-slate-500">(Optional)</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-400">
                        We use your location to suggest nearby specialist doctors for your symptoms.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Country */}
                        <div className="space-y-2">
                            <label htmlFor="country" className="block text-xs sm:text-sm font-medium text-slate-300">
                                Country
                            </label>
                            <input
                                id="country"
                                type="text"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                placeholder="e.g., Saudi Arabia"
                                className="w-full px-4 py-3 bg-slate-800/60 border border-slate-700/50 rounded-xl text-sm sm:text-base text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all duration-200"
                            />
                        </div>

                        {/* City */}
                        <div className="space-y-2">
                            <label htmlFor="city" className="block text-xs sm:text-sm font-medium text-slate-300">
                                City
                            </label>
                            <input
                                id="city"
                                type="text"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                placeholder="e.g., Riyadh"
                                className="w-full px-4 py-3 bg-slate-800/60 border border-slate-700/50 rounded-xl text-sm sm:text-base text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all duration-200"
                            />
                        </div>
                    </div>

                    {/* Area / District */}
                    <div className="space-y-2">
                        <label htmlFor="area" className="block text-xs sm:text-sm font-medium text-slate-300">
                            Area / District <span className="text-slate-500">(Optional)</span>
                        </label>
                        <input
                            id="area"
                            type="text"
                            value={area}
                            onChange={(e) => setArea(e.target.value)}
                            placeholder="e.g., Al Olaya, Downtown, North Riyadh"
                            className="w-full px-4 py-3 bg-slate-800/60 border border-slate-700/50 rounded-xl text-sm sm:text-base text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all duration-200"
                        />
                    </div>
                </div>

                {/* Main Symptom Input */}
                <div className="space-y-2 sm:space-y-3">
                    <label htmlFor="symptoms" className="block text-xs sm:text-sm font-medium text-slate-300">
                        What symptoms are you experiencing?
                    </label>
                    <div className="relative">
                        <textarea
                            id="symptoms"
                            value={symptoms}
                            onChange={(e) => setSymptoms(e.target.value)}
                            rows={6}
                            placeholder="e.g., I have a headache, mild fever, and feeling tired for the past 2 days..."
                            className="w-full px-4 sm:px-5 py-3.5 sm:py-4 bg-slate-800/60 border border-slate-700/50 rounded-xl sm:rounded-2xl text-sm sm:text-base text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all duration-200 backdrop-blur-sm resize-none"
                        />
                        <button
                            type="button"
                            onClick={handleMicClick}
                            className={`absolute right-2 sm:right-3 top-2 sm:top-3 p-2 sm:p-2.5 md:p-3 rounded-lg sm:rounded-xl transition-all duration-200 ${
                                isListening
                                    ? "bg-red-500/20 text-red-400 hover:bg-red-500/30 animate-pulse"
                                    : "bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:scale-110"
                            }`}
                        >
                            {isListening ? (
                                <MicOff className="w-4 h-4 sm:w-5 sm:h-5" />
                            ) : (
                                <Mic className="w-4 h-4 sm:w-5 sm:h-5" />
                            )}
                        </button>
                    </div>
                    {isListening && (
                        <p className="text-xs text-red-400 animate-pulse flex items-center gap-2">
                            <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                            Listening... Describe your symptoms now
                        </p>
                    )}
                </div>

                {/* Important Notice */}
                <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-4">
                    <p className="text-xs text-slate-400 leading-relaxed">
                        <span className="font-semibold text-red-400">Important:</span> This is not a medical diagnosis. 
                        If you're experiencing severe or emergency symptoms, please call emergency services or visit the nearest hospital immediately.
                    </p>
                </div>

                {/* Analyze Button */}
                <button
                    type="submit"
                    disabled={isAnalyzing || !symptoms.trim()}
                    className="w-full group relative px-6 sm:px-8 py-4 sm:py-5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold rounded-xl sm:rounded-2xl shadow-lg shadow-[rgba(239,68,68,0.25)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[rgba(239,68,68,0.4)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    <span className="relative flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base md:text-lg">
                        <Activity className="w-4 h-4 sm:w-5 sm:h-5" />
                        {isAnalyzing ? "Analyzing..." : "Analyze Symptoms"}
                    </span>
                </button>
            </form>
        </div>
    );
}
