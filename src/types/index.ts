export interface SymptomInput {
  symptoms: string;
  voiceInput?: boolean;
  country?: string;
  city?: string;
  area?: string;
}

export interface SymptomAnalysis {
  id: string;
  summary: string;
  possibleConditions: string[];
  severity: "mild" | "moderate" | "urgent";
  redFlags: string[];
  recommendedActions: string[];
  shouldSeeDoctorUrgently: boolean;
  suggestedSpecialist?: string;
  recommendedSpecialties?: string[]; // For doctor matching
  doctorNotes?: string;
  disclaimer: string;
  timestamp: string;
}

export interface DoctorSearchParams {
  country: string;
  city: string;
  area?: string;
  specialties?: string[]; // e.g. ["Dermatology", "Cardiology"]
}

export interface Doctor {
  id: string;
  name: string;
  specialization?: string;
  location?: string;
  city?: string;
  area?: string;
  country?: string;
  sourceName?: string; // e.g. "Healthgrades", "Clinic website"
  sourceUrl?: string;
  notes?: string; // explanation like "Matches recommended specialty: Dermatology"
}

export interface DoctorSpecialty {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface AgentStep {
  id: string;
  text: string;
  status: "pending" | "active" | "done";
}
