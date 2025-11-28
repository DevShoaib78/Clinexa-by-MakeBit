import { SearchParams, Tender } from "../types";

// Fallback mock data for when API is unavailable or for testing
const MOCK_TENDERS: Tender[] = [
  {
    id: "tender-001",
    title: "Road Maintenance Works – Eastern Riyadh District",
    status: "open",
    city: "Riyadh",
    area: "Eastern District",
    category: "Road & Infrastructure",
    authority: "Riyadh Municipality",
    estimatedValue: "SAR 8,500,000 - 12,000,000",
    deadline: "2025-12-12",
    summary: "Comprehensive road maintenance and resurfacing project covering major arterial roads in the Eastern Riyadh district. Includes asphalt overlay, traffic management systems, and drainage improvements.",
    requirements: [
      "Grade 1 contractor classification for road works",
      "Minimum 5 years experience in similar projects",
      "Valid GOSI registration",
      "Technical and financial proposal submission required",
      "Site visit mandatory before bid submission"
    ],
    announcementDate: "2025-11-15",
    clarificationDeadline: "2025-12-05",
    submissionDeadline: "2025-12-12",
    duration: "8 months",
    sourceName: "Etimad Portal",
    sourceUrl: "https://etimad.sa",
    aiInsight: "Likely requires road works classification and prior experience with municipal projects."
  },
  {
    id: "tender-002",
    title: "Construction of Primary School Building – Al Olaya",
    status: "closing_soon",
    city: "Riyadh",
    area: "Al Olaya",
    category: "Buildings",
    authority: "Ministry of Education",
    estimatedValue: "SAR 25,000,000 - 30,000,000",
    deadline: "2025-12-03",
    summary: "Design and construction of a new primary school building with 24 classrooms, administrative offices, sports facilities, and outdoor areas. Green building standards required.",
    requirements: [
      "Grade 1 contractor classification for building construction",
      "Previous experience in educational facility construction",
      "LEED or MOSTADAM certification preferred",
      "Quality management system ISO 9001",
      "Health and safety certification"
    ],
    announcementDate: "2025-10-20",
    clarificationDeadline: "2025-11-28",
    submissionDeadline: "2025-12-03",
    duration: "18 months",
    sourceName: "Ministry Portal",
    sourceUrl: "https://moe.gov.sa",
    aiInsight: "High-value project requiring educational construction experience and green building expertise."
  },
  {
    id: "tender-003",
    title: "MEP Installation for Commercial Complex – King Fahd Road",
    status: "open",
    city: "Riyadh",
    area: "King Fahd Road",
    category: "Buildings",
    authority: "Private Developer - Al Safi Holdings",
    estimatedValue: "SAR 15,000,000",
    deadline: "2025-12-20",
    summary: "Complete MEP (Mechanical, Electrical, and Plumbing) installation for a 12-story commercial complex including HVAC, electrical systems, fire safety, and plumbing infrastructure.",
    requirements: [
      "Specialized MEP contractor classification",
      "Experience with high-rise commercial buildings",
      "BMS system integration capability",
      "Manufacturer warranties for major equipment",
      "Post-completion maintenance plan"
    ],
    announcementDate: "2025-11-20",
    clarificationDeadline: "2025-12-13",
    submissionDeadline: "2025-12-20",
    duration: "12 months",
    sourceName: "Private Tender Portal",
    sourceUrl: "https://example.com",
    aiInsight: "Requires specialized MEP expertise and high-rise building experience."
  },
  {
    id: "tender-004",
    title: "Coastal Development Infrastructure – North Jeddah",
    status: "open",
    city: "Jeddah",
    area: "North Jeddah",
    category: "Road & Infrastructure",
    authority: "Jeddah Municipality",
    estimatedValue: "SAR 45,000,000 - 60,000,000",
    deadline: "2025-12-28",
    summary: "Major infrastructure development including road networks, utilities, drainage systems, and public amenities for coastal development area in North Jeddah.",
    requirements: [
      "Grade 1 contractor for infrastructure",
      "Experience with coastal construction projects",
      "Environmental impact assessment compliance",
      "Marine construction capabilities",
      "Equipment and resource mobilization plan"
    ],
    announcementDate: "2025-11-18",
    clarificationDeadline: "2025-12-15",
    submissionDeadline: "2025-12-28",
    duration: "24 months",
    sourceName: "Etimad Portal",
    sourceUrl: "https://etimad.sa",
    aiInsight: "Large-scale infrastructure project requiring coastal construction expertise and environmental compliance."
  },
  {
    id: "tender-005",
    title: "Hospital Renovation and Expansion – Al Zahra District",
    status: "open",
    city: "Jeddah",
    area: "Al Zahra",
    category: "Renovation",
    authority: "Ministry of Health",
    estimatedValue: "SAR 18,000,000",
    deadline: "2025-12-15",
    summary: "Renovation and expansion of existing hospital facility including new emergency wing, upgraded patient rooms, and modernized medical infrastructure while maintaining operational capacity.",
    requirements: [
      "Healthcare facility construction experience",
      "Phased construction capability",
      "Infection control protocols",
      "24/7 operational coordination",
      "Medical equipment installation experience"
    ],
    announcementDate: "2025-11-10",
    clarificationDeadline: "2025-12-08",
    submissionDeadline: "2025-12-15",
    duration: "16 months",
    sourceName: "Ministry Portal",
    sourceUrl: "https://moh.gov.sa",
    aiInsight: "Complex renovation requiring healthcare expertise and coordination with active hospital operations."
  },
  {
    id: "tender-006",
    title: "Industrial Warehouse Complex – Jeddah Industrial City",
    status: "open",
    city: "Jeddah",
    area: "Industrial City",
    category: "Buildings",
    authority: "Saudi Industrial Property Authority",
    estimatedValue: "SAR 32,000,000",
    deadline: "2025-12-25",
    summary: "Construction of modern industrial warehouse complex with 50,000 sqm covered area, including loading facilities, office spaces, and advanced logistics infrastructure.",
    requirements: [
      "Industrial construction classification",
      "Experience with warehouse and logistics facilities",
      "Heavy-duty structural engineering capability",
      "Material handling system integration",
      "Fast-track construction methodology"
    ],
    announcementDate: "2025-11-22",
    clarificationDeadline: "2025-12-18",
    submissionDeadline: "2025-12-25",
    duration: "14 months",
    sourceName: "MODON Portal",
    sourceUrl: "https://modon.gov.sa",
    aiInsight: "Industrial-scale project requiring specialized warehouse construction and logistics expertise."
  }
];

/**
 * Builds a search query string from search parameters
 */
function buildSearchQuery(params: SearchParams): string {
  const parts: string[] = [];

  // Add natural language query if provided
  if (params.query?.trim()) {
    parts.push(params.query.trim());
  }

  // Add city
  parts.push(`construction tenders ${params.city} Saudi Arabia`);

  // Add area if specified
  if (params.area?.trim()) {
    parts.push(`near ${params.area.trim()}`);
  }

  // Add project type if specified
  if (params.projectType?.trim()) {
    parts.push(params.projectType.trim());
  }

  return parts.join(" ");
}

/**
 * Tavily API result structure
 */
interface TavilyResult {
  title?: string;
  url?: string;
  content?: string;
  raw_content?: string;
}

/**
 * Maps Tavily API results to Tender objects
 */
function mapTavilyResultsToTenders(
  tavilyResults: TavilyResult[],
  params: SearchParams
): Tender[] {
  return tavilyResults.map((result, index) => {
    // Extract title from result
    const title = result.title || result.content?.substring(0, 100) || `Tender Opportunity ${index + 1}`;
    
    // Extract URL
    const sourceUrl = result.url || "";
    
    // Extract content/summary
    const content = result.content || result.raw_content || "";
    const summary = content.substring(0, 500) || "Construction tender opportunity in Saudi Arabia.";
    
    // Try to extract key information from content
    const cityMatch = content.match(/\b(Riyadh|Jeddah)\b/i);
    const detectedCity = cityMatch ? (cityMatch[1] === "Riyadh" ? "Riyadh" : "Jeddah") : params.city;
    
    // Try to extract area/district
    const areaMatch = content.match(/\b(Al \w+|North|South|East|West|Downtown|Industrial)\b/i);
    const detectedArea = areaMatch ? areaMatch[1] : params.area;
    
    // Try to detect category from content
    let category = "Other";
    const contentLower = content.toLowerCase();
    if (contentLower.includes("road") || contentLower.includes("infrastructure") || contentLower.includes("highway")) {
      category = "Road & Infrastructure";
    } else if (contentLower.includes("building") || contentLower.includes("construction") || contentLower.includes("facility")) {
      category = "Buildings";
    } else if (contentLower.includes("renovation") || contentLower.includes("renovate") || contentLower.includes("upgrade")) {
      category = "Renovation";
    } else if (contentLower.includes("maintenance") || contentLower.includes("repair")) {
      category = "Maintenance";
    } else if (contentLower.includes("mep") || contentLower.includes("mechanical") || contentLower.includes("electrical")) {
      category = "MEP";
    }
    
    // Try to extract authority/organization
    const authorityMatch = content.match(/(Ministry|Municipality|Authority|Portal|Government|Ministry of \w+)/i);
    const authority = authorityMatch ? authorityMatch[1] : undefined;
    
    // Try to extract estimated value
    const valueMatch = content.match(/(SAR|USD|SR)\s*([\d,]+(?:\s*-\s*[\d,]+)?(?:\s*(?:million|M|thousand|K))?)/i);
    const estimatedValue = valueMatch ? `${valueMatch[1]} ${valueMatch[2]}` : undefined;
    
    // Try to extract dates
    const datePattern = /\b(\d{1,2}[/-]\d{1,2}[/-]\d{2,4}|\d{4}[/-]\d{1,2}[/-]\d{1,2})\b/g;
    const dates = content.match(datePattern) || [];
    const submissionDeadline = dates.length > 0 ? dates[0] : undefined;
    
    // Generate AI insight
    const aiInsight = `Found via web search. ${category} project in ${detectedCity}${detectedArea ? ` near ${detectedArea}` : ""}. ${authority ? `Issued by ${authority}.` : ""}`;

    return {
      id: `tavily-${index}-${Date.now()}`,
      title: title.length > 150 ? title.substring(0, 150) + "..." : title,
      status: "open" as const,
      city: detectedCity,
      area: detectedArea,
      category,
      authority,
      estimatedValue,
      deadline: submissionDeadline,
      summary,
      sourceName: sourceUrl ? (() => {
        try {
          return new URL(sourceUrl).hostname;
        } catch {
          return "Web Source";
        }
      })() : "Web Source",
      sourceUrl,
      aiInsight,
    };
  });
}

/**
 * Searches for tenders using Tavily API or falls back to mock data
 */
export async function searchTenders(params: SearchParams): Promise<Tender[]> {
  const apiKey = import.meta.env.VITE_TAVILY_API_KEY;

  // If no API key is configured, use mock data
  if (!apiKey || apiKey === "your_tavily_api_key_here") {
    console.warn("Tavily API key not configured. Using mock data. Set VITE_TAVILY_API_KEY in your .env file.");
    
    // Fallback to mock data with filtering
    await new Promise((resolve) => setTimeout(resolve, 1800));
    
    let results = MOCK_TENDERS.filter(tender => tender.city === params.city);

    if (params.area) {
      const areaLower = params.area.toLowerCase();
      results = results.filter(tender =>
        tender.area?.toLowerCase().includes(areaLower) ||
        tender.title.toLowerCase().includes(areaLower)
      );
    }

    if (params.projectType) {
      const typeLower = params.projectType.toLowerCase();
      results = results.filter(tender =>
        tender.title.toLowerCase().includes(typeLower) ||
        tender.category?.toLowerCase().includes(typeLower) ||
        tender.summary?.toLowerCase().includes(typeLower)
      );
    }

    if (params.query) {
      const queryLower = params.query.toLowerCase();
      results = results.filter(tender =>
        tender.title.toLowerCase().includes(queryLower) ||
        tender.summary?.toLowerCase().includes(queryLower) ||
        tender.category?.toLowerCase().includes(queryLower)
      );
    }

    // Filter by year and month
    const filterYear = params.year ?? 2025; // Default to 2025
    const filterMonth = params.month;

    results = results.filter(tender => {
      // Check announcement date, submission deadline, or deadline
      const dateToCheck = tender.announcementDate || tender.submissionDeadline || tender.deadline;
      if (!dateToCheck) return true; // Include if no date available

      try {
        const date = new Date(dateToCheck);
        const tenderYear = date.getFullYear();
        const tenderMonth = date.getMonth() + 1; // getMonth() returns 0-11

        // Filter by year
        if (tenderYear !== filterYear) return false;

        // Filter by month if specified
        if (filterMonth && tenderMonth !== filterMonth) return false;

        return true;
      } catch {
        // If date parsing fails, include the tender
        return true;
      }
    });

    return results;
  }

  // Build search query
  const searchQuery = buildSearchQuery(params);

  try {
    // Call Tavily API
    // Tavily API accepts the API key either in the request body or as a header
    // We'll try with the API key in the body first (most common method)
    const response = await fetch("https://api.tavily.com/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        api_key: apiKey,
        query: searchQuery,
        search_depth: "advanced",
        max_results: 10,
        include_answer: false,
        include_raw_content: true,
        include_images: false,
        // Focus on Saudi Arabia government and tender portals
        include_domains: [
          "etimad.sa",
          "mof.gov.sa",
          "moe.gov.sa",
          "moh.gov.sa",
          "modon.gov.sa",
          "municipality.gov.sa",
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`Tavily API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Check if we have results
    if (!data.results || data.results.length === 0) {
      console.warn("No results from Tavily API. Falling back to mock data.");
      // Return filtered mock data as fallback
      return MOCK_TENDERS.filter(tender => tender.city === params.city).slice(0, 3);
    }

    // Map Tavily results to Tender format
    let tenders = mapTavilyResultsToTenders(data.results, params);

    // Filter by year and month
    const filterYear = params.year ?? 2025; // Default to 2025
    const filterMonth = params.month;

    tenders = tenders.filter(tender => {
      // Check announcement date, submission deadline, or deadline
      const dateToCheck = tender.announcementDate || tender.submissionDeadline || tender.deadline;
      if (!dateToCheck) return true; // Include if no date available

      try {
        const date = new Date(dateToCheck);
        const tenderYear = date.getFullYear();
        const tenderMonth = date.getMonth() + 1; // getMonth() returns 0-11

        // Filter by year
        if (tenderYear !== filterYear) return false;

        // Filter by month if specified
        if (filterMonth && tenderMonth !== filterMonth) return false;

        return true;
      } catch {
        // If date parsing fails, include the tender
        return true;
      }
    });

    return tenders;
  } catch (error) {
    console.error("Error calling Tavily API:", error);
    
    // Fallback to mock data on error
    console.warn("Falling back to mock data due to API error.");
    
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    let results = MOCK_TENDERS.filter(tender => tender.city === params.city);

    if (params.area) {
      const areaLower = params.area.toLowerCase();
      results = results.filter(tender =>
        tender.area?.toLowerCase().includes(areaLower) ||
        tender.title.toLowerCase().includes(areaLower)
      );
    }

    if (params.projectType) {
      const typeLower = params.projectType.toLowerCase();
      results = results.filter(tender =>
        tender.title.toLowerCase().includes(typeLower) ||
        tender.category?.toLowerCase().includes(typeLower) ||
        tender.summary?.toLowerCase().includes(typeLower)
      );
    }

    // Filter by year and month
    const filterYear = params.year ?? 2025; // Default to 2025
    const filterMonth = params.month;

    results = results.filter(tender => {
      // Check announcement date, submission deadline, or deadline
      const dateToCheck = tender.announcementDate || tender.submissionDeadline || tender.deadline;
      if (!dateToCheck) return true; // Include if no date available

      try {
        const date = new Date(dateToCheck);
        const tenderYear = date.getFullYear();
        const tenderMonth = date.getMonth() + 1; // getMonth() returns 0-11

        // Filter by year
        if (tenderYear !== filterYear) return false;

        // Filter by month if specified
        if (filterMonth && tenderMonth !== filterMonth) return false;

        return true;
      } catch {
        // If date parsing fails, include the tender
        return true;
      }
    });

    return results.slice(0, 5);
  }
}
