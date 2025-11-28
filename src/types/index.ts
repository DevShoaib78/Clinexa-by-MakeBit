export interface SearchParams {
  city: "Riyadh" | "Jeddah";
  area?: string;
  projectType?: string;
  query?: string; // Natural language query from the main input field
  year?: number; // Filter by year (default: 2025)
  month?: number; // Filter by month (1-12, optional)
}

export interface Tender {
  id: string;
  title: string;
  status: "open" | "closing_soon" | "closed";
  city: "Riyadh" | "Jeddah";
  area?: string;
  category?: string;
  authority?: string;
  estimatedValue?: string;
  deadline?: string;
  summary?: string;
  requirements?: string[];
  announcementDate?: string;
  clarificationDeadline?: string;
  submissionDeadline?: string;
  duration?: string;
  sourceName?: string;
  sourceUrl?: string;
  aiInsight?: string;
}

export interface AgentStep {
  id: string;
  text: string;
  status: "pending" | "active" | "done";
}
