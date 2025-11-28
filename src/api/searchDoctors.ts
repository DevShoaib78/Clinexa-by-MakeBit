import { DoctorSearchParams, Doctor } from "../types";

/**
 * Searches for doctors and clinics using Tavily Search API
 * Based on location and recommended specialties from symptom analysis
 */
export async function searchDoctors(params: DoctorSearchParams): Promise<Doctor[]> {
  const apiKey = import.meta.env.VITE_TAVILY_API_KEY || "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";

  // If no API key is configured, return empty array with warning
  if (!apiKey || apiKey === "your_tavily_api_key_here") {
    console.warn("Tavily API key not configured. Skipping doctor search. Set VITE_TAVILY_API_KEY in your .env file.");
    return [];
  }

  // Build search query
  const searchQuery = buildDoctorSearchQuery(params);
  
  console.log("Searching for doctors with query:", searchQuery);

  try {
    // Call Tavily Search API
    const response = await fetch("https://api.tavily.com/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        api_key: apiKey,
        query: searchQuery,
        search_depth: "advanced",
        max_results: 8,
        include_answer: false,
        include_raw_content: true,
        include_images: false,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Tavily API error:", errorText);
      throw new Error(`Tavily API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();

    // Check if we have results
    if (!data.results || data.results.length === 0) {
      console.warn("No doctor results from Tavily API");
      return [];
    }

    // Map Tavily results to Doctor format
    const doctors = mapTavilyResultsToDoctors(data.results, params);

    // Rank doctors: those matching recommended specialties first
    const rankedDoctors = rankDoctorsByRelevance(doctors, params.specialties);

    return rankedDoctors;
  } catch (error) {
    console.error("Error calling Tavily API for doctor search:", error);
    // Return empty array on error - don't break the UI
    return [];
  }
}

/**
 * Builds an optimized search query for finding doctors
 */
function buildDoctorSearchQuery(params: DoctorSearchParams): string {
  const { country, city, area, specialties } = params;
  
  const parts: string[] = [];

  // Add specialty if available (use top 1-3)
  if (specialties && specialties.length > 0) {
    const topSpecialties = specialties.slice(0, 3).join(" OR ");
    parts.push(topSpecialties);
  } else {
    // Fallback to general physician
    parts.push("general physician");
  }

  // Add "doctors" keyword
  parts.push("doctors");

  // Add location specifics
  if (area) {
    parts.push(area);
  }
  parts.push(city);
  parts.push(country);

  // Add context keywords
  parts.push("clinic hospital medical center appointment contact");

  return parts.join(" ");
}

/**
 * Maps Tavily search results to Doctor objects
 */
function mapTavilyResultsToDoctors(
  tavilyResults: any[],
  params: DoctorSearchParams
): Doctor[] {
  return tavilyResults.map((result, index) => {
    // Extract basic info
    const title = result.title || `Medical Provider ${index + 1}`;
    const url = result.url || "";
    const content = result.content || result.raw_content || "";
    
    // Extract domain name for source
    let sourceName = "Unknown Source";
    try {
      if (url) {
        const urlObj = new URL(url);
        sourceName = urlObj.hostname.replace("www.", "");
      }
    } catch {
      sourceName = "Web Source";
    }

    // Try to extract doctor/clinic name from title
    const name = extractDoctorName(title);

    // Try to detect specialization from content
    const specialization = detectSpecialization(content, title);

    // Build location string
    const location = buildLocationString(params.city, params.area, params.country);

    // Check if this doctor matches recommended specialties
    const notes = generateMatchNotes(specialization, params.specialties);

    const doctor: Doctor = {
      id: `doctor-${index}-${Date.now()}`,
      name,
      specialization,
      location,
      city: params.city,
      area: params.area,
      country: params.country,
      sourceName,
      sourceUrl: url,
      notes,
    };

    return doctor;
  });
}

/**
 * Extracts doctor or clinic name from title
 */
function extractDoctorName(title: string): string {
  // Clean up common patterns
  let name = title;
  
  // Remove common suffixes
  name = name.replace(/\s*[-–|]\s*.+$/, ""); // Remove everything after dash/pipe
  name = name.replace(/\s*\(.+?\)\s*/g, ""); // Remove parentheses
  
  // If it starts with "Dr." or "Doctor", keep it
  if (name.match(/^(Dr\.|Doctor)/i)) {
    return name.trim();
  }

  // If it mentions clinic/hospital/medical center, keep it
  if (name.match(/(clinic|hospital|medical center|health center)/i)) {
    return name.trim();
  }

  // Otherwise, clean and return
  return name.trim() || "Medical Provider";
}

/**
 * Detects medical specialization from text
 */
function detectSpecialization(content: string, title: string): string | undefined {
  const text = `${title} ${content}`.toLowerCase();

  // Common specializations to detect
  const specializations: { [key: string]: string[] } = {
    "General Physician": ["general physician", "family medicine", "primary care", "general practitioner", "gp"],
    "Cardiologist": ["cardiologist", "cardiology", "heart specialist", "cardiac"],
    "Dermatologist": ["dermatologist", "dermatology", "skin specialist", "skin doctor"],
    "Pediatrician": ["pediatrician", "pediatrics", "children's doctor", "child health"],
    "Neurologist": ["neurologist", "neurology", "brain specialist", "nerve doctor"],
    "Orthopedic": ["orthopedic", "orthopedics", "bone doctor", "joint specialist"],
    "ENT Specialist": ["ent", "ear nose throat", "otolaryngology", "ent specialist"],
    "Gastroenterologist": ["gastroenterologist", "gastroenterology", "digestive", "stomach doctor"],
    "Psychiatrist": ["psychiatrist", "psychiatry", "mental health"],
    "Ophthalmologist": ["ophthalmologist", "ophthalmology", "eye doctor", "eye specialist"],
    "Dentist": ["dentist", "dental", "orthodontist"],
    "Gynecologist": ["gynecologist", "gynecology", "obstetrician", "women's health"],
  };

  // Check for matches
  for (const [specialty, keywords] of Object.entries(specializations)) {
    for (const keyword of keywords) {
      if (text.includes(keyword)) {
        return specialty;
      }
    }
  }

  // If no specific specialty found, check for general medical terms
  if (text.match(/\b(doctor|physician|clinic|hospital|medical)\b/)) {
    return undefined; // Will show as general medical provider
  }

  return undefined;
}

/**
 * Builds location display string
 */
function buildLocationString(city: string, area?: string, country?: string): string {
  const parts: string[] = [];
  
  if (area) parts.push(area);
  if (city) parts.push(city);
  if (country) parts.push(country);
  
  return parts.join(", ");
}

/**
 * Generates matching notes if doctor matches recommended specialty
 */
function generateMatchNotes(
  doctorSpecialization: string | undefined,
  recommendedSpecialties?: string[]
): string | undefined {
  if (!doctorSpecialization || !recommendedSpecialties || recommendedSpecialties.length === 0) {
    return "Suggested based on your location and general medical relevance.";
  }

  // Check if doctor's specialization matches any recommended specialty
  for (const recommended of recommendedSpecialties) {
    const recommendedLower = recommended.toLowerCase();
    const doctorLower = doctorSpecialization.toLowerCase();

    // Exact or partial match
    if (
      doctorLower.includes(recommendedLower) ||
      recommendedLower.includes(doctorLower) ||
      areSimilarSpecialties(recommendedLower, doctorLower)
    ) {
      return `Matches recommended specialty: ${recommended}`;
    }
  }

  return "Suggested based on your location and general medical relevance.";
}

/**
 * Checks if two specialties are similar
 */
function areSimilarSpecialties(spec1: string, spec2: string): boolean {
  // Map of similar terms
  const similarMap: { [key: string]: string[] } = {
    cardio: ["heart", "cardiac", "cardiovascular"],
    derm: ["skin"],
    neuro: ["brain", "nerve"],
    ortho: ["bone", "joint"],
    gastro: ["stomach", "digestive", "intestine"],
    ent: ["ear", "nose", "throat"],
  };

  for (const [base, synonyms] of Object.entries(similarMap)) {
    const hasBase1 = spec1.includes(base);
    const hasBase2 = spec2.includes(base);
    const hasSynonym1 = synonyms.some(s => spec1.includes(s));
    const hasSynonym2 = synonyms.some(s => spec2.includes(s));

    if ((hasBase1 || hasSynonym1) && (hasBase2 || hasSynonym2)) {
      return true;
    }
  }

  return false;
}

/**
 * Ranks doctors by relevance to recommended specialties
 */
function rankDoctorsByRelevance(
  doctors: Doctor[],
  recommendedSpecialties?: string[]
): Doctor[] {
  if (!recommendedSpecialties || recommendedSpecialties.length === 0) {
    return doctors;
  }

  // Sort so matching doctors appear first
  return doctors.sort((a, b) => {
    const aMatches = a.notes?.includes("Matches recommended specialty") ? 1 : 0;
    const bMatches = b.notes?.includes("Matches recommended specialty") ? 1 : 0;
    
    return bMatches - aMatches; // Descending order (matches first)
  });
}

