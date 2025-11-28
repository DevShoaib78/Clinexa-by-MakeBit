import { SymptomAnalysis, SymptomInput } from "../types";

/**
 * Analyzes symptoms using Google Gemini API with a professional medical consultation approach
 */
export async function analyzeSymptoms(input: SymptomInput): Promise<SymptomAnalysis> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "AIzaSyBab6lN5hCDzFfVNpsdFcCNrg7Q64P3aIU";

  // If no API key is configured, return mock data
  if (!apiKey || apiKey === "your_gemini_api_key_here") {
    console.warn("Gemini API key not configured. Using mock data. Set VITE_GEMINI_API_KEY in your .env file.");
    
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 2500));
    
    return generateMockAnalysis(input.symptoms);
  }

  try {
    // Call Google Gemini API
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `You are Dr. Clinexa, a highly experienced and empathetic medical professional with over 15 years of clinical experience. Your role is to provide comprehensive, compassionate symptom analysis while maintaining the highest standards of medical professionalism.

APPROACH:
- Act as a caring, thorough doctor conducting a detailed consultation
- Show empathy and understanding for the patient's concerns
- Be professional but warm and reassuring
- Provide detailed, medically accurate information
- Use clear, patient-friendly language while being thorough
- Consider multiple possibilities and explain your clinical reasoning

CRITICAL DISCLAIMERS (must always mention):
- This is an AI-powered preliminary assessment, not a formal medical diagnosis
- Always recommend consulting with a licensed healthcare provider for proper examination
- Emphasize the importance of professional medical evaluation
- Explain that certain conditions can only be diagnosed through physical examination and tests

ANALYSIS STRUCTURE - Respond in this EXACT JSON format:
{
  "summary": "A warm, doctor-like greeting followed by a comprehensive but easy-to-understand overview of what you've observed about their symptoms. Start with 'Thank you for sharing your symptoms with me.' Be thorough (3-4 sentences minimum).",
  "possibleConditions": [
    "Most likely condition with brief explanation",
    "Second possibility with reasoning", 
    "Third possibility if applicable"
  ],
  "severity": "mild|moderate|urgent",
  "redFlags": [
    "Specific warning sign to watch for",
    "Another concerning symptom that would require immediate attention"
  ],
  "recommendedActions": [
    "First immediate step they can take at home",
    "Self-care measures with specific details",
    "When to seek medical attention (be specific)",
    "Lifestyle or management advice",
    "Follow-up recommendations"
  ],
  "shouldSeeDoctorUrgently": true/false,
  "suggestedSpecialist": "Type of specialist with brief explanation why",
  "recommendedSpecialties": [
    "Primary specialty type (e.g., Dermatologist, Cardiologist, ENT Specialist)",
    "Alternative specialty if applicable",
    "General Physician (as fallback)"
  ],
  "doctorNotes": "Additional professional insights, differential diagnosis considerations, or important contextual information a doctor would share. Be thorough and educational (2-3 sentences)."
}

IMPORTANT: The "recommendedSpecialties" array should contain 1-3 medical specialties that would be most appropriate for the patient's symptoms. Use standard specialty names like: General Physician, Cardiologist, Dermatologist, Neurologist, Gastroenterologist, Orthopedic Surgeon, ENT Specialist, Pediatrician, Psychiatrist, etc.

PATIENT'S SYMPTOMS:
${input.symptoms}

Please provide a thorough, compassionate analysis as if you were conducting an in-person consultation. Think through the differential diagnosis, consider the severity, and provide actionable guidance while emphasizing the importance of professional medical evaluation.`
          }]
        }],
        generationConfig: {
          temperature: 0.8,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API error:", errorText);
      throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!content) {
      throw new Error("No response from Gemini API");
    }

    // Extract JSON from response (handle markdown code blocks)
    let jsonText = content;
    const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/) || content.match(/```\s*([\s\S]*?)\s*```/);
    if (jsonMatch) {
      jsonText = jsonMatch[1];
    }

    // Parse the JSON response
    const analysisData = JSON.parse(jsonText);

    const analysis: SymptomAnalysis = {
      id: `analysis-${Date.now()}`,
      summary: analysisData.summary || "Thank you for sharing your symptoms with me. Let me provide you with a comprehensive assessment.",
      possibleConditions: analysisData.possibleConditions || ["General health concern"],
      severity: analysisData.severity || "moderate",
      redFlags: analysisData.redFlags || ["Symptoms that worsen significantly", "Development of new concerning symptoms"],
      recommendedActions: analysisData.recommendedActions || [
        "Monitor your symptoms closely",
        "Rest and stay well-hydrated",
        "Consult with a healthcare provider if symptoms persist or worsen",
        "Keep a symptom diary to track changes"
      ],
      shouldSeeDoctorUrgently: analysisData.shouldSeeDoctorUrgently || false,
      suggestedSpecialist: analysisData.suggestedSpecialist || "General Physician for initial evaluation",
      recommendedSpecialties: analysisData.recommendedSpecialties || ["General Physician"],
      doctorNotes: analysisData.doctorNotes,
      disclaimer: "This AI-powered analysis is for informational purposes only and does not constitute a medical diagnosis. It's essential to consult with a qualified, licensed healthcare professional for proper medical evaluation, diagnosis, and treatment. Certain conditions require physical examination and diagnostic tests that only an in-person visit can provide.",
      timestamp: new Date().toISOString(),
    };

    return analysis;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    
    // Fallback to mock data on error
    console.warn("Falling back to enhanced mock data due to API error.");
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    return generateMockAnalysis(input.symptoms);
  }
}

/**
 * Generates enhanced mock symptom analysis for testing with doctor-like approach
 */
function generateMockAnalysis(symptoms: string): SymptomAnalysis {
  const symptomsLower = symptoms.toLowerCase();
  
  // Determine severity based on keywords
  let severity: "mild" | "moderate" | "urgent" = "mild";
  let shouldSeeDoctorUrgently = false;
  
  if (symptomsLower.includes("chest pain") || 
      symptomsLower.includes("difficulty breathing") || 
      symptomsLower.includes("severe") ||
      symptomsLower.includes("blood")) {
    severity = "urgent";
    shouldSeeDoctorUrgently = true;
  } else if (symptomsLower.includes("fever") || 
             symptomsLower.includes("pain") ||
             symptomsLower.includes("cough")) {
    severity = "moderate";
  }

  // Determine specialist and conditions based on symptoms
  let suggestedSpecialist = "General Physician for comprehensive evaluation";
  let conditions = ["Common viral infection", "Stress-related manifestation", "Minor inflammatory response"];
  let doctorNotes = "Based on the symptom pattern described, this appears to be a common health concern that typically responds well to conservative management. However, a proper clinical examination would help rule out other possibilities and ensure appropriate care.";
  
  if (symptomsLower.includes("skin") || symptomsLower.includes("rash")) {
    suggestedSpecialist = "Dermatologist - for specialized skin evaluation and treatment";
    conditions = ["Contact dermatitis", "Allergic skin reaction", "Eczema or dermatitis"];
    doctorNotes = "Skin conditions can have various underlying causes. A dermatologist can perform a detailed examination and may recommend patch testing or other diagnostic procedures to identify the exact cause and provide targeted treatment.";
  } else if (symptomsLower.includes("heart") || symptomsLower.includes("chest")) {
    suggestedSpecialist = "Cardiologist - urgent evaluation needed for cardiac symptoms";
    conditions = ["Cardiovascular concern requiring immediate evaluation", "Possible cardiac stress", "Chest wall pain (musculoskeletal)"];
    doctorNotes = "Chest-related symptoms always warrant careful evaluation. While many causes are benign, it's crucial to rule out cardiac issues through proper examination, ECG, and potentially other cardiac tests. Don't delay seeking medical attention.";
    shouldSeeDoctorUrgently = true;
    severity = "urgent";
  } else if (symptomsLower.includes("stomach") || symptomsLower.includes("digestion") || symptomsLower.includes("abdominal")) {
    suggestedSpecialist = "Gastroenterologist - for digestive system evaluation";
    conditions = ["Gastritis or stomach inflammation", "Functional dyspepsia", "Possible food intolerance"];
    doctorNotes = "Digestive symptoms can stem from various causes including dietary factors, stress, or underlying gastrointestinal conditions. A gastroenterologist can perform appropriate tests such as endoscopy if needed and develop a comprehensive treatment plan.";
  } else if (symptomsLower.includes("headache") || symptomsLower.includes("dizziness") || symptomsLower.includes("migraine")) {
    suggestedSpecialist = "Neurologist - for neurological assessment and headache management";
    conditions = ["Tension-type headache", "Possible migraine", "Stress-related headache"];
    doctorNotes = "Headaches can have numerous triggers including stress, sleep patterns, dietary factors, or underlying neurological conditions. A neurologist can help identify the specific type and develop an effective prevention and treatment strategy.";
  } else if (symptomsLower.includes("cough") || symptomsLower.includes("throat") || symptomsLower.includes("respiratory")) {
    suggestedSpecialist = "ENT Specialist or Pulmonologist - depending on symptom severity";
    conditions = ["Upper respiratory tract infection", "Viral pharyngitis", "Post-nasal drip syndrome"];
    doctorNotes = "Respiratory symptoms are commonly viral but can sometimes indicate bacterial infections or other respiratory conditions. Proper examination including throat and lung auscultation will help determine if antibiotics or other interventions are needed.";
  }

  const urgentActions = [
    "Seek immediate medical attention at the nearest emergency department",
    "Do not drive yourself - call emergency services or have someone take you",
    "Avoid physical exertion and remain calm",
    "Have someone stay with you until you receive medical care",
    "Bring a list of any medications you're currently taking"
  ];

  const moderateActions = [
    "Schedule an appointment with a healthcare provider within 24-48 hours",
    "Rest and avoid strenuous activities until you're evaluated",
    "Stay well-hydrated with water or clear fluids",
    "Monitor your symptoms and note any changes or worsening",
    "Keep a symptom diary including timing, intensity, and triggers",
    "Avoid potential irritants or known triggers if applicable"
  ];

  const mildActions = [
    "Monitor your symptoms over the next few days for any changes",
    "Ensure adequate rest and sleep (7-9 hours per night)",
    "Maintain good hydration throughout the day",
    "Consider over-the-counter remedies appropriate for your symptoms",
    "If symptoms persist beyond a week or worsen, consult a healthcare provider",
    "Practice stress management techniques and maintain healthy lifestyle habits"
  ];

  // Extract specialties array
  let recommendedSpecialties = ["General Physician"];
  if (suggestedSpecialist.includes("Dermatologist")) {
    recommendedSpecialties = ["Dermatologist", "General Physician"];
  } else if (suggestedSpecialist.includes("Cardiologist")) {
    recommendedSpecialties = ["Cardiologist", "General Physician"];
  } else if (suggestedSpecialist.includes("Gastroenterologist")) {
    recommendedSpecialties = ["Gastroenterologist", "General Physician"];
  } else if (suggestedSpecialist.includes("Neurologist")) {
    recommendedSpecialties = ["Neurologist", "General Physician"];
  } else if (suggestedSpecialist.includes("ENT") || suggestedSpecialist.includes("Pulmonologist")) {
    recommendedSpecialties = ["ENT Specialist", "Pulmonologist", "General Physician"];
  }

  return {
    id: `mock-${Date.now()}`,
    summary: `Thank you for sharing your symptoms with me. I've carefully reviewed what you've described: "${symptoms.substring(0, 100)}${symptoms.length > 100 ? '...' : ''}". Based on this information, ${severity === 'urgent' ? 'I want to emphasize that these symptoms require prompt medical attention.' : severity === 'moderate' ? 'these symptoms warrant medical evaluation to ensure proper care.' : 'while these symptoms may be concerning, they often respond well to appropriate care and monitoring.'} Let me provide you with a detailed assessment to help guide your next steps.`,
    possibleConditions: conditions,
    severity,
    redFlags: shouldSeeDoctorUrgently ? [
      "Any sudden worsening of symptoms",
      "Development of severe pain or distress",
      "Symptoms affecting breathing, consciousness, or vital functions",
      "Signs of severe infection (high fever, confusion, rapid heart rate)"
    ] : severity === 'moderate' ? [
      "Symptoms persisting beyond one week without improvement",
      "Progressive worsening of symptoms",
      "Development of new concerning symptoms",
      "Fever exceeding 101.5°F (38.6°C) that doesn't respond to medication",
      "Inability to perform daily activities due to symptoms"
    ] : [
      "Symptoms lasting more than two weeks",
      "Gradual worsening over time",
      "Development of fever or systemic symptoms",
      "Symptoms significantly affecting your quality of life"
    ],
    recommendedActions: shouldSeeDoctorUrgently ? urgentActions : severity === 'moderate' ? moderateActions : mildActions,
    shouldSeeDoctorUrgently,
    suggestedSpecialist,
    recommendedSpecialties,
    doctorNotes,
    disclaimer: "This AI-powered analysis is for informational purposes only and does not constitute a medical diagnosis. It's essential to consult with a qualified, licensed healthcare professional for proper medical evaluation, diagnosis, and treatment. Certain conditions require physical examination and diagnostic tests that only an in-person visit can provide.",
    timestamp: new Date().toISOString(),
  };
}

/**
 * List of doctor specialties for "Connect with Doctors" section
 */
export const DOCTOR_SPECIALTIES = [
  {
    id: "gp",
    name: "General Physician",
    description: "For general health concerns, check-ups, and common illnesses",
    icon: "Stethoscope",
  },
  {
    id: "pediatrician",
    name: "Pediatrician",
    description: "Specialized care for infants, children, and adolescents",
    icon: "Baby",
  },
  {
    id: "dermatologist",
    name: "Dermatologist",
    description: "Skin, hair, and nail conditions",
    icon: "Sparkles",
  },
  {
    id: "cardiologist",
    name: "Cardiologist",
    description: "Heart and cardiovascular system conditions",
    icon: "Heart",
  },
  {
    id: "ent",
    name: "ENT Specialist",
    description: "Ear, nose, and throat conditions",
    icon: "Ear",
  },
  {
    id: "neurologist",
    name: "Neurologist",
    description: "Brain, spinal cord, and nervous system disorders",
    icon: "Brain",
  },
  {
    id: "gastro",
    name: "Gastroenterologist",
    description: "Digestive system and gastrointestinal issues",
    icon: "Activity",
  },
  {
    id: "orthopedic",
    name: "Orthopedic Surgeon",
    description: "Bones, joints, ligaments, and musculoskeletal system",
    icon: "Bone",
  },
];

