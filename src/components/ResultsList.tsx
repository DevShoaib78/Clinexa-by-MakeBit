import { useState } from "react";
import { Tender, SearchParams } from "../types";
import { TenderCard } from "./TenderCard";
import { TenderDetail } from "./TenderDetail";
import { Filter, SortAsc, Calendar, RefreshCw } from "lucide-react";

interface ResultsListProps {
  tenders: Tender[];
  searchParams: SearchParams;
  onRefresh: (params: SearchParams) => void;
}

const MONTHS = [
  { value: 1, label: "Jan" },
  { value: 2, label: "Feb" },
  { value: 3, label: "Mar" },
  { value: 4, label: "Apr" },
  { value: 5, label: "May" },
  { value: 6, label: "Jun" },
  { value: 7, label: "Jul" },
  { value: 8, label: "Aug" },
  { value: 9, label: "Sep" },
  { value: 10, label: "Oct" },
  { value: 11, label: "Nov" },
  { value: 12, label: "Dec" },
] as const;

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 5 }, (_, i) => CURRENT_YEAR - i); // Last 5 years including current

export function ResultsList({ tenders, searchParams, onRefresh }: ResultsListProps) {
  const [selectedTender, setSelectedTender] = useState<Tender | null>(null);
  const [sortBy, setSortBy] = useState<"relevance" | "deadline" | "newest">("relevance");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [keywordFilter, setKeywordFilter] = useState("");
  const [filterYear, setFilterYear] = useState<number | undefined>(searchParams.year || 2025);
  const [filterMonth, setFilterMonth] = useState<number | undefined>(searchParams.month);

  const categories = ["Road & Infrastructure", "Buildings", "Renovation", "Maintenance", "Other"];

  const filteredAndSortedTenders = tenders
    .filter((tender) => {
      if (selectedCategories.length > 0 && !selectedCategories.includes(tender.category || "Other")) {
        return false;
      }
      if (keywordFilter) {
        const keyword = keywordFilter.toLowerCase();
        return (
          tender.title.toLowerCase().includes(keyword) ||
          tender.authority?.toLowerCase().includes(keyword) ||
          tender.area?.toLowerCase().includes(keyword)
        );
      }
      // Filter by year
      if (filterYear) {
        const dateToCheck = tender.announcementDate || tender.submissionDeadline || tender.deadline;
        if (dateToCheck) {
          try {
            const date = new Date(dateToCheck);
            const tenderYear = date.getFullYear();
            if (tenderYear !== filterYear) return false;
          } catch {
            // If date parsing fails, include the tender
          }
        }
      }
      // Filter by month
      if (filterMonth) {
        const dateToCheck = tender.announcementDate || tender.submissionDeadline || tender.deadline;
        if (dateToCheck) {
          try {
            const date = new Date(dateToCheck);
            const tenderMonth = date.getMonth() + 1; // getMonth() returns 0-11
            if (tenderMonth !== filterMonth) return false;
          } catch {
            // If date parsing fails, include the tender
          }
        }
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "deadline" && a.deadline && b.deadline) {
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      }
      if (sortBy === "newest" && a.announcementDate && b.announcementDate) {
        return new Date(b.announcementDate).getTime() - new Date(a.announcementDate).getTime();
      }
      return 0;
    });

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleRefresh = () => {
    // Build updated query including keyword filter and existing query
    let updatedQuery = searchParams.query || "";
    if (keywordFilter.trim()) {
      updatedQuery = updatedQuery ? `${updatedQuery} ${keywordFilter.trim()}` : keywordFilter.trim();
    }

    // Use first selected category as projectType, or keep existing projectType
    const projectType = selectedCategories.length > 0 
      ? selectedCategories[0] 
      : searchParams.projectType;

    // Re-run search with all updated filters
    onRefresh({
      ...searchParams,
      projectType: projectType,
      query: updatedQuery || undefined,
      year: filterYear,
      month: filterMonth,
    });
  };

  if (tenders.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-800 rounded-full mb-4">
          <Filter className="w-8 h-8 text-slate-500" />
        </div>
        <h3 className="text-xl font-semibold text-slate-200 mb-2">
          No tenders found for this search
        </h3>
        <p className="text-slate-400 max-w-md mx-auto">
          Try widening your area, changing project type, or searching in another city.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-emerald-500/10 to-emerald-600/5 border border-emerald-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-6">
        <div className="flex-1 mb-3 sm:mb-4">
          <h3 className="text-base sm:text-lg font-semibold text-slate-100 mb-2">
            We found {filteredAndSortedTenders.length} {filteredAndSortedTenders.length === 1 ? "opportunity" : "opportunities"} in {searchParams.city}
            {searchParams.area && ` near ${searchParams.area}`}
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            Most results relate to construction and infrastructure projects with upcoming deadlines.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="px-2.5 sm:px-3 py-1.5 bg-slate-900 border border-slate-700 text-slate-300 text-xs sm:text-sm rounded-lg">
            City: {searchParams.city}
          </span>
          {searchParams.area && (
            <span className="px-2.5 sm:px-3 py-1.5 bg-slate-900 border border-slate-700 text-slate-300 text-xs sm:text-sm rounded-lg">
              Area: {searchParams.area}
            </span>
          )}
          {searchParams.projectType && (
            <span className="px-2.5 sm:px-3 py-1.5 bg-slate-900 border border-slate-700 text-slate-300 text-xs sm:text-sm rounded-lg">
              Type: {searchParams.projectType}
            </span>
          )}
          <span className="px-2.5 sm:px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs sm:text-sm rounded-lg">
            Last updated: Just now
          </span>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl sm:rounded-2xl p-4 sm:p-6">
        <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 items-start lg:items-center justify-between mb-4">
          <div className="flex items-center gap-2 sm:gap-3 w-full lg:w-auto">
            <SortAsc className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 flex-shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "relevance" | "deadline" | "newest")}
              className="flex-1 lg:flex-none px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="relevance">Sort by: Relevance</option>
              <option value="deadline">Sort by: Deadline</option>
              <option value="newest">Sort by: Newest</option>
            </select>
          </div>

          <input
            type="text"
            value={keywordFilter}
            onChange={(e) => setKeywordFilter(e.target.value)}
            placeholder="Filter by keyword..."
            className="px-3 sm:px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full lg:w-64"
          />
        </div>

        {/* Date Filters */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 mb-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 flex-shrink-0" />
            <span className="text-xs text-slate-400 font-medium whitespace-nowrap">Filter by Date:</span>
          </div>
          <select
            value={filterYear || ""}
            onChange={(e) => setFilterYear(e.target.value ? Number(e.target.value) : undefined)}
            className="px-2.5 sm:px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">All Years</option>
            {YEARS.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
          <select
            value={filterMonth || ""}
            onChange={(e) => setFilterMonth(e.target.value ? Number(e.target.value) : undefined)}
            className="px-2.5 sm:px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">All Months</option>
            {MONTHS.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => toggleCategory(category)}
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                selectedCategories.includes(category)
                  ? "bg-emerald-500 text-white"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Refresh/Re-search Button */}
        <div className="flex justify-center pt-4 border-t border-slate-800">
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:scale-105 hover:shadow-emerald-500/50"
          >
            <RefreshCw className="w-5 h-5" />
            Re-search with Current Filters
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredAndSortedTenders.map((tender) => (
          <TenderCard
            key={tender.id}
            tender={tender}
            onViewDetails={() => setSelectedTender(tender)}
          />
        ))}
      </div>

      {selectedTender && (
        <TenderDetail
          tender={selectedTender}
          onClose={() => setSelectedTender(null)}
        />
      )}
    </div>
  );
}
