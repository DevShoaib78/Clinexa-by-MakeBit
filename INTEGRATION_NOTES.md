# NexBid Integration Notes

This document outlines the key integration points for future API connections.

## 🔌 API Integration Points

### 1. Tavily Search API Integration
**File:** `src/api/searchTenders.ts`

The `searchTenders()` function currently returns mock data. To integrate with Tavily:

```typescript
export async function searchTenders(params: SearchParams): Promise<Tender[]> {
  // TODO: Replace mock implementation with Tavily API call
  // Example:
  // const response = await fetch('https://api.tavily.com/search', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${TAVILY_API_KEY}`
  //   },
  //   body: JSON.stringify({
  //     query: buildSearchQuery(params),
  //     search_depth: 'advanced',
  //     // Additional Tavily parameters
  //   })
  // });
  //
  // const data = await response.json();
  // return mapTavilyResultsToTenders(data);
}
```

### 2. Speech-to-Text Integration
**File:** `src/hooks/useSpeechInput.ts`

The `useSpeechInput` hook currently simulates transcription. To integrate with a real STT service:

#### Option A: Browser Web Speech API
```typescript
const startListening = () => {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'ar-SA'; // or 'en-US'
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    onTranscription(transcript);
  };

  recognition.start();
  setIsListening(true);
};
```

#### Option B: Gemini API
```typescript
const startListening = async () => {
  setIsListening(true);

  // TODO: Record audio and send to Gemini
  // const audioBlob = await recordAudio();
  // const response = await fetch('GEMINI_ENDPOINT', {
  //   method: 'POST',
  //   headers: { 'Authorization': `Bearer ${API_KEY}` },
  //   body: audioBlob
  // });
  //
  // const { transcript } = await response.json();
  // onTranscription(transcript);

  setIsListening(false);
};
```

## 📁 Project Structure

```
src/
├── api/
│   └── searchTenders.ts       # Tavily integration point
├── components/
│   ├── AgentStatus.tsx        # Loading state UI
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── ResultsList.tsx        # Results display & filtering
│   ├── SearchForm.tsx         # Main search interface
│   ├── SpeechInput.tsx        # Voice input component
│   ├── TenderCard.tsx         # Individual tender card
│   └── TenderDetail.tsx       # Tender detail drawer
├── hooks/
│   └── useSpeechInput.ts      # STT integration point
├── pages/
│   ├── AboutPage.tsx
│   ├── ContactPage.tsx
│   └── HomePage.tsx
└── types/
    └── index.ts               # TypeScript interfaces
```

## 🎯 Key Features Implemented

### ✅ Search Interface
- City selector (Riyadh/Jeddah)
- Area/locality input
- Project type input
- Voice search capability (placeholder)
- Example queries for quick testing

### ✅ Agentic Loading Experience
- Multi-step loading animation
- Status messages showing progress
- Smooth transitions between states

### ✅ Results Display
- Responsive tender cards grid
- Filtering by category
- Sorting (relevance, deadline, newest)
- Keyword search
- Summary bar with search context

### ✅ Tender Details
- Right-side drawer modal
- Comprehensive tender information
- Timeline visualization
- Direct links to official portals
- Clear disclaimers

### ✅ Pages
- Home (search + results)
- About / How It Works
- Contact form

## 🎨 Design System

- **Colors:** Dark theme with emerald accent
- **Font:** System sans-serif stack
- **Spacing:** 8px grid system
- **Borders:** Rounded (2xl for cards)
- **Shadows:** Subtle with color-matched glows
- **Animations:** Smooth transitions, hover effects

## 🚀 Next Steps

1. **Integrate Tavily API:** Replace mock data in `searchTenders()`
2. **Add Speech-to-Text:** Implement real STT in `useSpeechInput`
3. **Enhance NLP:** Parse voice commands to extract city, area, and type
4. **Add Analytics:** Track searches and popular queries
5. **Expand Coverage:** Add more Saudi cities
6. **Real-time Updates:** Add webhook for new tender notifications
