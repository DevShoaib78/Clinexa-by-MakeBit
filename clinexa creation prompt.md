You are an expert full-stack engineer, designer, and refactoring specialist.

Your task: **Completely transform the existing NexBid codebase into a new product called “Clinexa by MakeBit.”**  
This is NOT a partial rename — you must perform a full product conversion while keeping the project structure stable.

Below are the complete requirements.  
Follow them EXACTLY and apply the transformation consistently across the entire repository.

====================================================
🚀 1. GLOBAL PRODUCT REBRAND — NEXBID → CLINEXA
====================================================

Replace ALL instances of:
- NexBid → Clinexa  
- Nexbid → Clinexa  
- NextBid → Clinexa  
- nextbid → clinexa  
- nexBid → Clinexa  
Including:
- Variables
- Component names
- Comments
- Documentation
- Page content
- SEO metadata
- Window titles
- Descriptions
- JSON content
- Class names (if textual)
- Any grep-able internal references

Brand label format:
**Clinexa by MakeBit**

====================================================
🎨 2. LOGO + ASSET REFRESH
====================================================

Replace all NexBid-related assets with Clinexa’s:

New files:
- `clinexa_logo.png`  (logo main)
- `clinexa_logo_without_bg.png`
- `clinexa_favicon.ico` or `.png`

Files to delete:
- `nexbidwithoutbg.png`
- Any NexBid favicon/logo assets

Update ALL references to use the new Clinexa asset files.

Examples:
- Header logo
- Splash screen logo
- Favicon link in index.html
- Meta og:image if present
- Any static imports in components

====================================================
🎨 3. COLOR PALETTE UPDATE — RED/CARE THEME
====================================================

Replace the green/emerald NexBid palette with Clinexa’s medical red palette:

PRIMARY:
- Soft Medical Red → #ef4444
- Coral Red → #f87171
- Muted Rose → #fb7185

ACCENTS:
- Peach Tint → #fecaca
- Rose Tint → #ffe4e6

DARK BACKGROUND:
- Charcoal → #0f0f14
- Slate Black → #1a1a1f

TEXT:
- Off-White → #f8fafc
- Soft Slate → #cbd5e1

GRADIENT:
- #f87171 → #ef4444

Update:
- Buttons
- Gradients
- Active states
- Hero highlights
- Glow effects
- Loading indicators
- Splash screen animation
- Category chips
- Badges
- Footer accent colors

Preserve the aesthetic style (glow, glassmorphism), only change color palette.

====================================================
🖋 4. TYPOGRAPHY PRESERVATION
====================================================

KEEP the font system EXACTLY as configured:

- **Plus Jakarta Sans** → headings  
- **IBM Plex Sans** → body text  

No changes needed—just ensure headings/subheadings adapt seamlessly to the new branding.

====================================================
🧠 5. CORE FEATURE REPLACEMENT — TENDERS → HEALTHCARE
====================================================

REMOVE all tender-search related logic:

- Search Tenders
- Tavily API
- TenderCard / TenderDetail components
- Categories like “Road & Infrastructure”
- Date filters for tenders
- Area/city logic (Riyadh/Jeddah)
- Tender lifecycle
- TenderGuide page content
- Loading steps referencing portals

REPLACE these with Clinexa’s core features:

---------------------------------------------
✨ NEW MAIN FEATURES (REPLACE TENDER SEARCH)
---------------------------------------------

### 1) Symptom Analyzer (OpenAI API)
Main functionality on homepage:
User enters symptoms → OpenAI analyzes → Provides structured output:

- Possible conditions (not diagnoses)
- Risk level (mild / moderate / urgent)
- Recommended actions
- Red flag symptoms
- Whether they should consult a doctor
- Specialization suggestion (e.g., Dermatology, ENT, Cardiology)

API:
- Use latest OpenAI API (o3-mini or o1 if needed)
- Safety: generate disclaimers

Inputs:
- Free text symptoms
- Optional voice input (existing Web Speech API can stay)

Output sections:
- Summary
- Possible causes
- What you should do
- When to seek emergency care
- Recommended specialist

### 2) “Connect with Doctors” Section
Below the analysis:

Show a curated static list of doctor types:
- General Physician
- Pediatrician
- Dermatologist
- Cardiologist
- ENT
- Neurologist
- Gastroenterologist
(You can add more)

Each card:
- Icon
- Specialization title
- Description
- Button: “Connect” → for now does nothing except maybe open a placeholder modal.

### 3) Voice Input
Keep existing voice logic but change labels:
- “Use voice input”
- “Describe your symptoms”
- “Listening… describe your symptoms”

### 4) Agent/Loading State (REWORKED)
Replace tender-agent text with symptom-agent text.

New steps:
- “Analyzing your symptoms…”
- “Checking for possible causes…”
- “Evaluating severity and red flags…”
- “Preparing your health insights…”

----------------------------------------------------------
📝 OPTIONAL: Allow downloading report as PDF (placeholder)
----------------------------------------------------------

Include a button (non-functional for MVP):
“Download your health report (PDF)”

====================================================
📄 6. PAGE CONTENT TRANSFORMATION
====================================================

You must rewrite **every page** to match the Clinexa product identity.

-------------------------
🏠 A) HOME PAGE (Main page)
-------------------------

Replace:

“Find the right construction tenders…”  
with:  
**“Understand your symptoms with AI — and know when to see a doctor.”**

Subheading:
“Describe your symptoms and get structured, AI-powered health insights — fast, clear, and trustworthy.”

Main input label:
“Describe your symptoms”

CTA:
“Analyze Symptoms”

Remove all tender-related filters:
- City
- Area
- Project type
- Date filters

-----------------------------
ℹ️ B) HOW IT WORKS PAGE
-----------------------------

Rewrite content into 4 steps:

1. **Tell your symptoms**
   “Describe what you're experiencing in simple language — or use voice input.”

2. **AI analyzes your symptoms**
   “Clinexa uses medical reasoning models to process your symptoms and highlight possible causes.”

3. **Understand your options**
   “Get structured insights: severity, red flags, possible conditions, and guidance.”

4. **Connect with doctors**
   “See which type of specialist fits your symptoms and get matched accordingly.”

What Clinexa Is NOT:
- Not a medical provider
- Not a diagnostic tool
- Not emergency service
- Insights may not be accurate
- Always consult a doctor

-----------------------------
🎓 C) GUIDE PAGE (Tender Guide → Health Guide)
-----------------------------

Rename page:
**Health Guide**

Rewrite all content:

Sections:
1. What are symptoms?
2. When should you see a doctor?
3. Warning signs (“red flags”) not to ignore
4. Understanding specializations (GP, ENT, Derm, etc.)
5. How to describe symptoms properly
6. What Clinexa can help with (and can’t)

-----------------------------
📬 D) CONTACT PAGE
-----------------------------

Replace tender-related phrases with:
“Missing features? Suggestions? Want us to add more symptom support? Message us.”

====================================================
🔧 7. ROUTES MUST BE UPDATED
====================================================

Change navigation:

Home  
How it works  
Guide (now “Health Guide”)  
Contact  

Route `/guide` stays but content is replaced.

====================================================
🎬 8. SPLASH SCREEN UPDATE
====================================================

Replace:
- NexBid logo with Clinexa logo
- Remove tender wording (if any)
- Update glow to red palette
- Update background gradients to red-based
- Keep the MakeBit attribution animation

====================================================
🧹 9. REMOVE OR MODIFY TENDER-SPECIFIC FILES
====================================================

Delete:
- searchTenders.ts
- Tender types/interfaces
- TenderCard
- TenderDetail
- TenderGuidePage content

Refactor:
- ResultsList → becomes SymptomAnalysisResult
- AgentStatus → becomes SymptomAnalysisStatus (with new step labels)
- SearchForm → becomes SymptomsForm

====================================================
🔑 10. OPENAI API INTEGRATION — NEW ENDPOINT
====================================================

Implement a new function under `/src/api/analyzeSymptoms.ts`:

Behavior:
- Accept symptoms text
- Call OpenAI API (o3-mini for analysis)
- Return structured data:
  - summary
  - possible_conditions
  - severity
  - red_flags
  - suggested_specialist
  - recommended_actions

Include placeholder `.env` variable:
- `VITE_OPENAI_API_KEY`

====================================================
🧼 11. CLEANUP & CONSISTENCY
====================================================

Make sure:
- No “Riyadh”, “Jeddah”, “tender”, “bid”, “project”, “authority” remain anywhere
- All JSON mocks removed
- Verbose docs updated
- Comments reworded
- All green/emerald colors removed
- All tender terminology removed
- All page headings updated
- SEO metadata updated (page title, description)
- Favicon replaced globally
- Asset imports updated everywhere

====================================================
📦 12. DELIVERABLE
====================================================

Provide:
- All updated files
- Added files
- Deleted files
- Updated React components
- Updated Tailwind config (only colors)
- Updated routes
- Updated text content across all pages
- Updated API integrations
- Updated splash screen
- Updated assets

The final result should be a **fully converted Clinexa product**, with zero leftover NexBid references.

Execute this transformation now.
