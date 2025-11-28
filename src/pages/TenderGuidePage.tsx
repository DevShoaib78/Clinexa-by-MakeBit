import { Link } from "react-router-dom";
import { BookOpen, CheckCircle, ArrowRight, AlertTriangle } from "lucide-react";

export function TenderGuidePage() {
  return (
    <div className="min-h-screen bg-slate-950 pt-20 sm:pt-24 pb-12 sm:pb-16 md:pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12 sm:mb-14 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 bg-red-500/10 border border-red-500/20 rounded-full mb-4 sm:mb-6">
            <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-400" />
            <span className="text-xs sm:text-sm font-semibold text-red-400">Guide</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-100 mb-3 sm:mb-4 font-heading px-2">
            Health Guide
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed px-2">
            Learn about symptoms, health guidance, and how to make the most of Clinexa's AI-powered insights.
          </p>
        </div>

        {/* Quick Overview Section */}
        <section className="mb-12 sm:mb-14 md:mb-16">
          <h2 className="text-2xl sm:text-3xl font-semibold text-slate-100 mb-6 sm:mb-8 font-heading">Quick Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="glass-strong rounded-2xl p-6 border border-white/10 hover:border-red-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/10">
              <h3 className="text-xl font-semibold text-slate-100 mb-3 font-heading">What are Symptoms?</h3>
              <p className="text-slate-400 leading-relaxed">
                Symptoms are physical or mental features that indicate a condition or disease. They're your body's way of signaling that something may not be working as it should.
              </p>
            </div>

            <div className="glass-strong rounded-2xl p-6 border border-white/10 hover:border-red-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/10">
              <h3 className="text-xl font-semibold text-slate-100 mb-3 font-heading">When to See a Doctor?</h3>
              <p className="text-slate-400 leading-relaxed">
                See a doctor if symptoms persist for more than a few days, worsen over time, or if you experience severe pain, difficulty breathing, or other alarming signs.
              </p>
            </div>

            <div className="glass-strong rounded-2xl p-6 border border-white/10 hover:border-red-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/10">
              <h3 className="text-xl font-semibold text-slate-100 mb-3 font-heading">What Clinexa Does</h3>
              <p className="text-slate-400 leading-relaxed">
                Clinexa analyzes your symptoms using AI to provide structured insights, severity assessment, and guidance on whether you should seek medical care.
              </p>
            </div>
          </div>
        </section>

        {/* Warning Signs Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-slate-100 mb-8 font-heading">Warning Signs - Red Flags</h2>
          <p className="text-slate-300 mb-6">
            These symptoms should never be ignored. Seek immediate medical attention if you experience:
          </p>
          <div className="space-y-4">
            {[
              { title: "Chest Pain or Pressure", description: "Especially if accompanied by shortness of breath, sweating, or pain radiating to arms, neck, or jaw. Could indicate heart problems." },
              { title: "Difficulty Breathing", description: "Severe shortness of breath, wheezing, or inability to catch your breath may signal respiratory issues or allergic reactions." },
              { title: "Sudden Severe Headache", description: "The worst headache of your life, especially with confusion, vision changes, or neck stiffness, could indicate serious conditions." },
              { title: "High Fever (Above 103°F/39.4°C)", description: "Persistent high fever with confusion, severe headache, or rash requires immediate attention." },
              { title: "Severe Abdominal Pain", description: "Intense, sudden abdominal pain, especially with vomiting or rigidity, may indicate serious internal issues." },
              { title: "Bleeding That Won't Stop", description: "Uncontrolled bleeding from any source, or coughing/vomiting blood, requires emergency care." },
              { title: "Sudden Confusion or Disorientation", description: "Difficulty speaking, understanding, or sudden behavioral changes may indicate neurological issues." },
              { title: "Loss of Consciousness", description: "Fainting, seizures, or loss of consciousness always requires immediate medical evaluation." },
            ].map((item, index) => (
              <div
                key={index}
                className="glass-strong rounded-2xl p-6 border border-red-500/20 hover:border-red-500/40 transition-all duration-300 flex items-start gap-6 bg-red-500/5"
              >
                <div className="flex-shrink-0">
                  <AlertTriangle className="w-6 h-6 text-red-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-slate-100 mb-2 font-heading">{item.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Understanding Specializations Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-slate-100 mb-8 font-heading">Understanding Doctor Specializations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                specialist: "General Physician (GP)",
                description: "First point of contact for most health issues. Treats common illnesses, provides health screenings, and refers to specialists when needed."
              },
              {
                specialist: "Cardiologist",
                description: "Heart and cardiovascular system specialist. Treats heart disease, high blood pressure, chest pain, and circulation problems."
              },
              {
                specialist: "Dermatologist",
                description: "Skin, hair, and nail specialist. Treats acne, rashes, eczema, skin cancer, and cosmetic concerns."
              },
              {
                specialist: "ENT (Ear, Nose, Throat)",
                description: "Treats conditions affecting ears, nose, throat, sinuses, and related head and neck structures."
              },
              {
                specialist: "Gastroenterologist",
                description: "Digestive system specialist. Treats stomach, intestines, liver, and other digestive organ conditions."
              },
              {
                specialist: "Neurologist",
                description: "Brain and nervous system specialist. Treats headaches, seizures, stroke, memory problems, and nerve disorders."
              },
              {
                specialist: "Orthopedic Surgeon",
                description: "Bone, joint, and musculoskeletal specialist. Treats fractures, arthritis, sports injuries, and spine problems."
              },
              {
                specialist: "Pediatrician",
                description: "Children's health specialist. Provides care from infancy through adolescence, including growth monitoring and vaccinations."
              },
            ].map((item, index) => (
              <div
                key={index}
                className="glass-strong rounded-2xl p-6 border border-white/10 hover:border-red-500/30 transition-all duration-300"
              >
                <h3 className="text-lg font-semibold text-slate-100 mb-2 font-heading">{item.specialist}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How to Describe Symptoms Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-slate-100 mb-8 font-heading">How to Describe Your Symptoms</h2>
          <div className="glass-strong rounded-2xl p-8 border border-white/10">
            <p className="text-slate-300 mb-6">
              When describing symptoms to Clinexa or your doctor, include:
            </p>
            <ul className="space-y-4">
              {[
                "Location: Where exactly do you feel the symptom? (e.g., left side of chest, upper abdomen)",
                "Duration: How long have you had this symptom? (e.g., 2 days, 3 weeks)",
                "Intensity: How severe is it on a scale of 1-10?",
                "Quality: How would you describe it? (e.g., sharp pain, dull ache, burning sensation)",
                "Triggers: Does anything make it better or worse? (e.g., eating, movement, rest)",
                "Associated symptoms: Are there other symptoms occurring at the same time?",
                "Timing: Is it constant or does it come and go? Does it happen at specific times?",
              ].map((tip, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* What Clinexa Can Help With */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-slate-100 mb-8 font-heading">What Clinexa Can (and Can't) Help With</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="glass-strong rounded-2xl p-6 border border-green-500/20 bg-green-500/5">
              <h3 className="text-xl font-semibold text-slate-100 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                What Clinexa CAN Do
              </h3>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li>• Provide structured analysis of your symptoms</li>
                <li>• Suggest possible conditions to discuss with your doctor</li>
                <li>• Assess symptom severity (mild, moderate, urgent)</li>
                <li>• Identify red flag symptoms that need attention</li>
                <li>• Recommend what type of specialist to see</li>
                <li>• Offer general health guidance and next steps</li>
              </ul>
            </div>

            <div className="glass-strong rounded-2xl p-6 border border-red-500/20 bg-red-500/5">
              <h3 className="text-xl font-semibold text-slate-100 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                What Clinexa CANNOT Do
              </h3>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li>• Provide medical diagnoses</li>
                <li>• Replace professional medical advice</li>
                <li>• Prescribe medications or treatments</li>
                <li>• Handle medical emergencies</li>
                <li>• Guarantee accuracy of insights</li>
                <li>• Serve as a substitute for seeing a doctor</li>
              </ul>
            </div>
          </div>

          <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6">
            <p className="text-slate-300 text-sm leading-relaxed">
              <strong className="text-amber-400">Remember:</strong> Clinexa is an informational tool designed to help you understand your symptoms better. 
              It should always be used alongside—not instead of—professional medical care. When in doubt, consult a healthcare provider.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-red-500/10 to-red-600/5 border border-red-500/20 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-slate-100 mb-4">Ready to Analyze Your Symptoms?</h2>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Use Clinexa to get AI-powered insights about your health symptoms and know when to seek professional care.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg shadow-red-500/30"
          >
            Analyze Symptoms Now
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
