import { useState, useEffect, useRef } from "react";
import { Search, MapPin, Building2, Mic, MicOff, Calendar } from "lucide-react";
import { SearchParams } from "../types";
import { useSpeechInput } from "../hooks/useSpeechInput";

interface SearchFormProps {
    onSearch: (params: SearchParams) => void;
    isSearching: boolean;
}

const PROJECT_TYPE_CATEGORIES = [
    "Road & Infrastructure",
    "Buildings",
    "Renovation",
    "Maintenance",
    "MEP",
    "Other",
] as const;

const MONTHS = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
] as const;

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 5 }, (_, i) => CURRENT_YEAR - i); // Last 5 years including current

export function SearchForm({ onSearch, isSearching }: SearchFormProps) {
    const [city, setCity] = useState<"Riyadh" | "Jeddah">("Riyadh");
    const [query, setQuery] = useState("");
    const [area, setArea] = useState("");
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [year, setYear] = useState<number>(2025); // Default to 2025
    const [month, setMonth] = useState<number | undefined>(undefined);

    // Use refs to access latest state in callbacks
    const queryRef = useRef(query);
    const areaRef = useRef(area);
    const cityRef = useRef(city);
    const selectedCategoriesRef = useRef(selectedCategories);
    const yearRef = useRef(year);
    const monthRef = useRef(month);

    // Keep refs updated
    useEffect(() => {
        queryRef.current = query;
        areaRef.current = area;
        cityRef.current = city;
        selectedCategoriesRef.current = selectedCategories;
        yearRef.current = year;
        monthRef.current = month;
    }, [query, area, city, selectedCategories, year, month]);

    // Enhanced speech parsing function
    const parseSpeechInput = (text: string) => {
        const lowerText = text.toLowerCase();
        let detectedCity = cityRef.current;
        let detectedArea = areaRef.current;
        let detectedCategory: string | undefined = undefined;
        let cleanQuery = text;

        // Detect city
        if (lowerText.includes("jeddah")) {
            detectedCity = "Jeddah";
        } else if (lowerText.includes("riyadh")) {
            detectedCity = "Riyadh";
        }

        // Common areas in Riyadh and Jeddah with proper formatting
        const areaMap: Record<string, string> = {
            "al olaya": "Al Olaya",
            "olaya": "Al Olaya",
            "al hamra": "Al Hamra",
            "hamra": "Al Hamra",
            "malaz": "Malaz",
            "king fahd": "King Fahd",
            "downtown": "Downtown",
            "northern": "Northern",
            "southern": "Southern",
            "eastern": "Eastern",
            "western": "Western",
            "corniche": "Corniche",
            "al balad": "Al Balad",
            "balad": "Al Balad",
            "al sabil": "Al Sabil",
            "king road": "King Road"
        };
        
        for (const [key, value] of Object.entries(areaMap)) {
            if (lowerText.includes(key)) {
                detectedArea = value;
                break;
            }
        }

        // Detect project type/category
        const categoryKeywords: Record<string, string[]> = {
            "Road & Infrastructure": ["road", "highway", "infrastructure", "bridge", "tunnel", "street", "pavement"],
            "Buildings": ["building", "construction", "facility", "complex", "tower", "structure"],
            "Renovation": ["renovation", "renovate", "upgrade", "refurbish", "restoration"],
            "Maintenance": ["maintenance", "repair", "servicing", "upkeep"],
            "MEP": ["mep", "mechanical", "electrical", "plumbing", "hvac"]
        };

        for (const [category, keywords] of Object.entries(categoryKeywords)) {
            if (keywords.some(keyword => lowerText.includes(keyword))) {
                detectedCategory = category;
                break;
            }
        }

        return {
            city: detectedCity,
            area: detectedArea,
            category: detectedCategory,
            query: cleanQuery
        };
    };

    const { isListening, startListening, stopListening } = useSpeechInput({
        onTranscription: (text: string) => {
            const parsed = parseSpeechInput(text);
            
            // Update refs immediately for use in onEnd callback
            queryRef.current = parsed.query;
            cityRef.current = parsed.city;
            if (parsed.area) {
                areaRef.current = parsed.area;
            }
            if (parsed.category) {
                selectedCategoriesRef.current = [parsed.category];
            }
            
            // Update state for UI
            setQuery(parsed.query);
            setCity(parsed.city);
            if (parsed.area) {
                setArea(parsed.area);
            }
            if (parsed.category) {
                setSelectedCategories([parsed.category]);
            }
        },
        onEnd: () => {
            // Auto-trigger search after voice input completes
            // Use a small delay to ensure UI updates are visible
            setTimeout(() => {
                const currentQuery = queryRef.current;
                const currentArea = areaRef.current;
                const currentCity = cityRef.current;
                const currentCategories = selectedCategoriesRef.current;
                const currentYear = yearRef.current;
                const currentMonth = monthRef.current;

                const projectType = currentCategories.length > 0 ? currentCategories[0] : undefined;
                const searchParams: SearchParams = {
                    city: currentCity,
                    area: currentArea.trim() || undefined,
                    projectType: projectType || undefined,
                    query: currentQuery.trim() || undefined,
                    year: currentYear || 2025,
                    month: currentMonth || undefined,
                };
                // Only search if we have meaningful input
                if (currentQuery.trim() || currentArea.trim() || projectType) {
                    onSearch(searchParams);
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

    const toggleCategory = (category: string) => {
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((c) => c !== category)
                : [...prev, category]
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Use first selected category as projectType for backward compatibility
        const projectType = selectedCategories.length > 0 ? selectedCategories[0] : undefined;
        onSearch({
            city,
            area: area.trim() || undefined,
            projectType: projectType || undefined,
            query: query.trim() || undefined,
            year: year || 2025,
            month: month || undefined,
        });
    };

    return (
        <div className="glass-strong rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl border border-emerald-500/20">
            {/* Header Row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-slate-100 flex items-center gap-2 sm:gap-3">
                    <Search className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-emerald-400" />
                    Search Tenders
                </h2>
                <button
                    type="button"
                    onClick={handleMicClick}
                    className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
                        isListening
                            ? "bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30"
                            : "text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 border border-transparent hover:border-emerald-500/20"
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
                            <span className="hidden sm:inline">Use voice search</span>
                            <span className="sm:hidden">Voice</span>
                        </>
                    )}
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                {/* City Selector - Centered */}
                <div className="space-y-3 sm:space-y-4">
                    <label className="flex items-center justify-center gap-2 text-xs sm:text-sm font-medium text-slate-300">
                        <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
                        Select City
                    </label>
                    <div className="flex justify-center gap-3 sm:gap-4">
                        <button
                            type="button"
                            onClick={() => setCity("Riyadh")}
                            className={`relative px-5 sm:px-6 md:px-8 py-3 sm:py-3.5 md:py-4 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base transition-all duration-300 ${
                                city === "Riyadh"
                                    ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-[rgba(16,185,129,0.4)] scale-105"
                                    : "bg-slate-800/50 text-slate-300 border border-slate-700/50 hover:border-emerald-500/50 hover:bg-slate-800/70"
                            }`}
                        >
                            Riyadh
                            {city === "Riyadh" && (
                                <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-emerald-400/20 to-emerald-600/20 blur-xl -z-10" />
                            )}
                        </button>
                        <button
                            type="button"
                            onClick={() => setCity("Jeddah")}
                            className={`relative px-5 sm:px-6 md:px-8 py-3 sm:py-3.5 md:py-4 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base transition-all duration-300 ${
                                city === "Jeddah"
                                    ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-[rgba(16,185,129,0.4)] scale-105"
                                    : "bg-slate-800/50 text-slate-300 border border-slate-700/50 hover:border-emerald-500/50 hover:bg-slate-800/70"
                            }`}
                        >
                            Jeddah
                            {city === "Jeddah" && (
                                <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-emerald-400/20 to-emerald-600/20 blur-xl -z-10" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Main Query Input - Most Important */}
                <div className="space-y-2 sm:space-y-3">
                    <label htmlFor="query" className="block text-xs sm:text-sm font-medium text-slate-300">
                        Describe what you're looking for <span className="text-slate-500">(optional)</span>
                    </label>
                    <div className="relative">
                        <input
                            id="query"
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !isSearching) {
                                    e.preventDefault();
                                    handleSubmit(e as any);
                                }
                            }}
                            placeholder="e.g. road construction tenders near Al Olaya above 5M SAR"
                            className="w-full px-4 sm:px-5 py-3.5 sm:py-4 md:py-5 pr-12 sm:pr-16 bg-slate-800/60 border border-slate-700/50 rounded-xl sm:rounded-2xl text-sm sm:text-base text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-200 backdrop-blur-sm"
                        />
                        <button
                            type="button"
                            onClick={handleMicClick}
                            className={`absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 md:p-3 rounded-lg sm:rounded-xl transition-all duration-200 ${
                                isListening
                                    ? "bg-red-500/20 text-red-400 hover:bg-red-500/30 animate-pulse"
                                    : "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 hover:scale-110"
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
                        <p className="text-xs text-emerald-400 animate-pulse flex items-center gap-2">
                            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                            Listening... Speak now
                        </p>
                    )}
                </div>

                {/* Area Input */}
                <div className="space-y-2 sm:space-y-3">
                    <label htmlFor="area" className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-300">
                        <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
                        Area <span className="text-slate-500">(Optional)</span>
                    </label>
                    <input
                        id="area"
                        type="text"
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        placeholder="e.g., Al Olaya, Al Hamra, Downtown"
                        className="w-full px-4 sm:px-5 py-3 sm:py-3.5 md:py-4 bg-slate-800/50 border border-slate-700/50 rounded-xl text-sm sm:text-base text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-200"
                    />
                </div>

                {/* Project Type Chips */}
                <div className="space-y-2 sm:space-y-3">
                    <label className="block text-xs sm:text-sm font-medium text-slate-300">
                        Project Type <span className="text-slate-500">(Optional)</span>
                    </label>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                        {PROJECT_TYPE_CATEGORIES.map((category) => {
                            const isSelected = selectedCategories.includes(category);
                            return (
                                <button
                                    key={category}
                                    type="button"
                                    onClick={() => toggleCategory(category)}
                                    className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                                        isSelected
                                            ? "bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 text-emerald-400 border border-emerald-500/40 shadow-md shadow-emerald-500/10"
                                            : "bg-slate-800/40 text-slate-300 border border-slate-700/50 hover:border-emerald-500/30 hover:bg-slate-800/60"
                                    }`}
                                >
                                    {category}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Year and Month Filters */}
                <div className="space-y-2 sm:space-y-3">
                    <label className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-300">
                        <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
                        Filter by Date
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        {/* Year Selector */}
                        <div className="space-y-2">
                            <label htmlFor="year" className="block text-xs text-slate-400">
                                Year <span className="text-slate-500">(Default: 2025)</span>
                            </label>
                            <select
                                id="year"
                                value={year}
                                onChange={(e) => setYear(Number(e.target.value))}
                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-sm sm:text-base text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-200 cursor-pointer"
                            >
                                {YEARS.map((y) => (
                                    <option key={y} value={y}>
                                        {y}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Month Selector */}
                        <div className="space-y-2">
                            <label htmlFor="month" className="block text-xs text-slate-400">
                                Month <span className="text-slate-500">(Optional)</span>
                            </label>
                            <select
                                id="month"
                                value={month || ""}
                                onChange={(e) => setMonth(e.target.value ? Number(e.target.value) : undefined)}
                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-sm sm:text-base text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-200 cursor-pointer"
                            >
                                <option value="">All Months</option>
                                {MONTHS.map((m) => (
                                    <option key={m.value} value={m.value}>
                                        {m.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Search Button */}
                <button
                    type="submit"
                    disabled={isSearching}
                    className="w-full group relative px-6 sm:px-8 py-4 sm:py-5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold rounded-xl sm:rounded-2xl shadow-lg shadow-[rgba(16,185,129,0.25)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[rgba(16,185,129,0.4)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    <span className="relative flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base md:text-lg">
                        <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                        {isSearching ? "Searching..." : "Search Tenders"}
                    </span>
                </button>
            </form>

            {/* Agent Status Container - Reserved Space */}
            <div id="agent-status-container">
                {/* This space is reserved for agent loading steps, status messages, and progress animations */}
            </div>
        </div>
    );
}
