export interface SymptomInput {
  symptoms: string;
  voiceInput?: boolean;
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
  doctorNotes?: string;
  disclaimer: string;
  timestamp: string;
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
