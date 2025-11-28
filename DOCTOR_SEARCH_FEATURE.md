# Doctor Search Feature Documentation

## Overview

The **Doctor Search** feature enhances Clinexa by finding nearby doctors and clinics that match the user's symptoms and location. This feature integrates seamlessly with the existing Gemini-powered symptom analysis.

---

## 🎯 Feature Flow

### User Journey

1. **User enters information:**
   - Country (e.g., "Saudi Arabia")
   - City (e.g., "Riyadh")
   - Area/District (Optional, e.g., "Al Olaya")
   - Symptoms (text or voice input)

2. **System processes:**
   - **Step 1**: Gemini AI analyzes symptoms → returns recommended specialties
   - **Step 2**: Tavily API searches for doctors → returns matching providers

3. **User receives:**
   - Comprehensive symptom analysis (as before)
   - **NEW**: List of recommended doctors near their location
   - Doctors matching recommended specialties appear first

---

## 🏗️ Architecture

### New Files Created

```
src/
├── api/
│   └── searchDoctors.ts          # NEW - Tavily API integration
├── components/
│   └── DoctorRecommendations.tsx # NEW - Doctor results UI
├── types/
│   └── index.ts                  # UPDATED - Added Doctor & location types
└── pages/
    └── HomePage.tsx              # UPDATED - Orchestrates both APIs
```

### Updated Files

```
src/
├── components/
│   └── SymptomsForm.tsx          # UPDATED - Added location fields
├── api/
│   └── analyzeSymptoms.ts        # UPDATED - Returns recommendedSpecialties
└── types/
    └── index.ts                  # UPDATED - New interfaces
```

---

## 📋 Technical Implementation

### 1. New Type Definitions

```typescript
// Location input
export interface SymptomInput {
  symptoms: string;
  voiceInput?: boolean;
  country?: string;     // NEW
  city?: string;        // NEW
  area?: string;        // NEW
}

// Doctor search parameters
export interface DoctorSearchParams {
  country: string;
  city: string;
  area?: string;
  specialties?: string[]; // From symptom analysis
}

// Doctor result
export interface Doctor {
  id: string;
  name: string;
  specialization?: string;
  location?: string;
  city?: string;
  area?: string;
  country?: string;
  sourceName?: string;
  sourceUrl?: string;
  notes?: string; // Matching explanation
}

// Symptom analysis (updated)
export interface SymptomAnalysis {
  // ... existing fields
  recommendedSpecialties?: string[]; // NEW - For doctor matching
}
```

### 2. Tavily API Integration

**File**: `src/api/searchDoctors.ts`

**Key Functions:**

- **`searchDoctors(params)`** - Main function
  - Builds optimized search query
  - Calls Tavily API
  - Maps results to Doctor objects
  - Ranks by relevance

- **`buildDoctorSearchQuery(params)`**
  - Combines specialties + location + context keywords
  - Example: "Dermatologist doctors Al Olaya Riyadh Saudi Arabia clinic"

- **`detectSpecialization(content, title)`**
  - Extracts specialty from search result text
  - Maps to standard specialty names

- **`rankDoctorsByRelevance(doctors, specialties)`**
  - Sorts doctors: matching specialties first

**API Configuration:**

```typescript
const response = await fetch("https://api.tavily.com/search", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    api_key: import.meta.env.VITE_TAVILY_API_KEY,
    query: searchQuery,
    search_depth: "advanced",
    max_results: 8,
    include_raw_content: true,
  }),
});
```

### 3. UI Components

#### Location Fields (SymptomsForm.tsx)

```tsx
<div className="space-y-4 pb-6 border-b">
  <h3>Where are you located?</h3>
  <p>We use your location to suggest nearby doctors and clinics.</p>
  
  <input id="country" placeholder="e.g., Saudi Arabia" />
  <input id="city" placeholder="e.g., Riyadh" />
  <input id="area" placeholder="e.g., Al Olaya" />
</div>
```

#### Doctor Cards (DoctorRecommendations.tsx)

```tsx
<DoctorCard doctor={doctor}>
  - Name & Specialization
  - Location (city, area)
  - Matching badge (if matches recommended specialty)
  - Source information
  - "View Details" link
  - Explanation note
</DoctorCard>
```

### 4. Orchestration (HomePage.tsx)

```typescript
const handleAnalyze = async (input: SymptomInput) => {
  // Step 1: Analyze symptoms with Gemini
  const analysis = await analyzeSymptoms(input);
  setAnalysis(analysis);
  
  // Step 2: Search for doctors if location provided
  if (input.country && input.city) {
    searchForDoctors(
      input.country,
      input.city,
      input.area,
      analysis.recommendedSpecialties
    );
  }
};

const searchForDoctors = async (...) => {
  const doctors = await searchDoctors({
    country,
    city,
    area,
    specialties // From Gemini analysis
  });
  setDoctors(doctors);
};
```

---

## 🔧 Environment Setup

### Required API Keys

```env
# Google Gemini (already configured)
VITE_GEMINI_API_KEY=AIzaSyB...

# Tavily Search API (NEW)
VITE_TAVILY_API_KEY=tvly-...
```

### Getting Tavily API Key

1. Visit [https://tavily.com](https://tavily.com)
2. Sign up for free account
3. Navigate to API Keys
4. Copy your key
5. Add to `.env` file

**Free Tier**: 1,000 searches/month

---

## 🎨 UI/UX States

### 1. No Location Provided
```
┌─────────────────────────────────────┐
│ ⚠️  Location Required              │
│                                     │
│ To see nearby doctors, please add  │
│ your country and city when         │
│ describing symptoms.               │
└─────────────────────────────────────┘
```

### 2. Searching for Doctors
```
┌─────────────────────────────────────┐
│ 🔄 Searching for doctors and       │
│    clinics near you...             │
└─────────────────────────────────────┘
```

### 3. Doctors Found
```
┌─────────────────────────────────────┐
│ 🩺 Recommended Doctors Near You    │
│                                     │
│ ┌─────────────────────┐            │
│ │ Recommended         │            │
│ │ Dr. Ahmed Al-Saud   │            │
│ │ Dermatologist       │            │
│ │ 📍 Al Olaya, Riyadh │            │
│ │ [View Details]      │            │
│ └─────────────────────┘            │
└─────────────────────────────────────┘
```

### 4. No Doctors Found
```
┌─────────────────────────────────────┐
│ 🩺 No Nearby Doctors Found         │
│                                     │
│ We couldn't find relevant doctors  │
│ or clinics for your area. Try      │
│ widening your location.            │
└─────────────────────────────────────┘
```

### 5. Error State
```
┌─────────────────────────────────────┐
│ ⚠️  Unable to Fetch Doctors        │
│                                     │
│ We couldn't fetch nearby doctors   │
│ at the moment. Please try again.   │
└─────────────────────────────────────┘
```

---

## ✅ Safety & Error Handling

### 1. Missing API Key
- **Behavior**: Skip doctor search silently
- **User sees**: No error, just no doctor results
- **Console**: Warning message

### 2. Invalid Location
- **Behavior**: Don't call Tavily
- **User sees**: "Location Required" message
- **Symptom analysis**: Still works normally

### 3. Tavily API Error
- **Behavior**: Catch error, show friendly message
- **User sees**: "Unable to fetch doctors" notice
- **Symptom analysis**: Unaffected

### 4. No Results from Tavily
- **Behavior**: Display empty state
- **User sees**: "No nearby doctors found" with suggestions
- **Symptom analysis**: Shown normally

### 5. Gemini API Error
- **Behavior**: Skip symptom analysis
- **User sees**: Error message
- **Doctor search**: Attempted with fallback specialties

---

## 🔒 Disclaimers

### Displayed to Users

1. **Above doctor list:**
   > "We do not endorse or verify these providers — always confirm details yourself."

2. **Below doctor list:**
   > "Clinexa does not endorse or verify any specific doctor or clinic. These recommendations are based on web search results and may not be accurate or current. Always do your own research, verify credentials, and follow local medical regulations. In emergencies, contact your local emergency services immediately."

---

## 📊 Data Flow Diagram

```
User Input
    ↓
┌───────────────────────────────────┐
│ Country, City, Area, Symptoms     │
└───────────────────────────────────┘
    ↓
┌───────────────────────────────────┐
│ Step 1: Gemini Symptom Analysis   │
│ → Returns: recommendedSpecialties │
└───────────────────────────────────┘
    ↓
┌───────────────────────────────────┐
│ Step 2: Tavily Doctor Search      │
│ Input: Location + Specialties     │
│ → Returns: Doctor[]               │
└───────────────────────────────────┘
    ↓
┌───────────────────────────────────┐
│ Step 3: Rank & Display            │
│ - Matching doctors first          │
│ - Others below                    │
│ - Clear explanations              │
└───────────────────────────────────┘
```

---

## 🧪 Testing Checklist

### Functional Tests

- [ ] Location fields appear in form
- [ ] Symptom analysis works without location
- [ ] Doctor search triggers when location provided
- [ ] Doctors matching specialties appear first
- [ ] "No location" state shows correctly
- [ ] "Searching" loading state appears
- [ ] "No results" state displays properly
- [ ] Error handling works (simulate API failure)
- [ ] Links to doctor sources open correctly

### Edge Cases

- [ ] Country provided but not city → Shows "Location Required"
- [ ] City provided but not country → Shows "Location Required"  
- [ ] Area provided without city → Doctor search skipped
- [ ] Empty Tavily response → Shows "No doctors found"
- [ ] Tavily API error → Shows error message, analysis still shown
- [ ] No API key → Silently skips doctor search
- [ ] Very long location names → UI handles gracefully
- [ ] Special characters in location → Query works

---

## 🚀 Future Enhancements

### Phase 2 Features (Potential)

1. **Filter doctors by:**
   - Distance from user
   - Rating/reviews
   - Availability
   - Insurance accepted

2. **Map integration:**
   - Show doctors on map
   - Get directions
   - See office hours

3. **Direct booking:**
   - Integrate with appointment systems
   - Show available slots
   - Book directly from Clinexa

4. **Doctor profiles:**
   - Education & credentials
   - Years of experience
   - Languages spoken
   - Patient reviews

5. **Emergency detection:**
   - If urgent symptoms detected
   - Show nearest emergency rooms
   - Display emergency contact numbers

---

## 📈 Performance Considerations

### API Call Optimization

- **Parallel execution**: Symptom analysis and doctor search could run in parallel (currently sequential)
- **Caching**: Consider caching doctor results for same location (not implemented)
- **Debouncing**: Not needed since search is triggered on submit, not on type

### Current Performance

- **Symptom analysis**: ~2-3 seconds (Gemini)
- **Doctor search**: ~1-2 seconds (Tavily)
- **Total time**: ~3-5 seconds for complete results
- **User experience**: Loading states keep users informed

---

## 💡 Developer Notes

### TODO/Improvements

```typescript
// TODO: Make Tavily search more robust if needed
// Consider:
// - Better specialty detection
// - More sophisticated ranking algorithm
// - Cache results for same location
// - Rate limiting protection
```

### Known Limitations

1. **Doctor data accuracy**: Depends on Tavily web scraping
2. **Specialty detection**: Best-effort from text parsing
3. **Location matching**: Requires exact or similar city names
4. **No verification**: Doctors aren't verified/endorsed

---

## 📞 Support

For questions about this feature:
- **Email**: team@makebit.tech
- **GitHub**: [DevShoaib78/Clinexa-by-MakeBit](https://github.com/DevShoaib78/Clinexa-by-MakeBit)

---

*Last Updated: Nov 28, 2025*  
*Feature Version: 1.0*  
*Integrations: Gemini Pro + Tavily Search API*

