import { Link } from "react-router-dom";
import { BookOpen, CheckCircle, ArrowRight } from "lucide-react";

export function TenderGuidePage() {
  return (
    <div className="min-h-screen bg-slate-950 pt-20 sm:pt-24 pb-12 sm:pb-16 md:pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12 sm:mb-14 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-4 sm:mb-6">
            <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
            <span className="text-xs sm:text-sm font-semibold text-emerald-400">Guide</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-100 mb-3 sm:mb-4 font-heading px-2">
            Tender Guide
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed px-2">
            Learn the basics of Saudi construction tenders, bidding, and how to make the most of NextBid.
          </p>
        </div>

        {/* Quick Overview Section */}
        <section className="mb-12 sm:mb-14 md:mb-16">
          <h2 className="text-2xl sm:text-3xl font-semibold text-slate-100 mb-6 sm:mb-8 font-heading">Quick Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="glass-strong rounded-2xl p-6 border border-white/10 hover:border-emerald-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10">
              <h3 className="text-xl font-semibold text-slate-100 mb-3 font-heading">What is a Tender?</h3>
              <p className="text-slate-400 leading-relaxed">
                A tender is a formal invitation from a government authority or organization to submit a bid for a construction project. It outlines project requirements, deadlines, and evaluation criteria.
              </p>
            </div>

            <div className="glass-strong rounded-2xl p-6 border border-white/10 hover:border-emerald-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10">
              <h3 className="text-xl font-semibold text-slate-100 mb-3 font-heading">What are Construction Tenders?</h3>
              <p className="text-slate-400 leading-relaxed">
                Construction tenders specifically cover infrastructure, buildings, roads, utilities, and renovation projects. They require contractors to demonstrate technical capability and competitive pricing.
              </p>
            </div>

            <div className="glass-strong rounded-2xl p-6 border border-white/10 hover:border-emerald-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10">
              <h3 className="text-xl font-semibold text-slate-100 mb-3 font-heading">Who Uses NextBid?</h3>
              <p className="text-slate-400 leading-relaxed">
                Contractors, project managers, bid teams, consultants, and construction companies looking to discover and track public tender opportunities in Saudi Arabia efficiently.
              </p>
            </div>
          </div>
        </section>

        {/* Tender Lifecycle Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-slate-100 mb-8 font-heading">How a typical tender works</h2>
          <div className="space-y-4">
            {[
              { step: 1, title: "Announcement", description: "The authority publishes the tender on official portals like Etimad, announcing project details, requirements, and submission deadlines." },
              { step: 2, title: "Document Download & Clarifications", description: "Contractors download tender documents, review specifications, and submit clarification questions during the designated period." },
              { step: 3, title: "Bid Preparation", description: "Contractors prepare technical proposals (methodology, team, timeline) and financial offers (pricing, BOQ) based on requirements." },
              { step: 4, title: "Submission", description: "Complete bid packages are submitted before the deadline through the official portal, including all required documents and guarantees." },
              { step: 5, title: "Evaluation", description: "Authorities evaluate technical bids first, then open financial offers from technically qualified bidders for comparison." },
              { step: 6, title: "Award", description: "The contract is awarded to the winning bidder who meets technical requirements and offers the best value (not always lowest price)." },
            ].map((item) => (
              <div
                key={item.step}
                className="glass-strong rounded-2xl p-6 border border-white/10 hover:border-emerald-500/30 transition-all duration-300 flex items-start gap-6"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-emerald-500/30">
                  {item.step}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-slate-100 mb-2 font-heading">{item.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Key Concepts Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-slate-100 mb-8 font-heading">Key concepts you should know</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                term: "Technical Bid vs Financial Bid",
                explanation: "Technical bid demonstrates your capability, methodology, and team qualifications. Financial bid contains your pricing and commercial terms. Technical evaluation usually happens first."
              },
              {
                term: "Tender Classification / Eligibility",
                explanation: "Saudi contractors must have appropriate classification grades (Grade 1, 2, 3, etc.) for specific project types. Check if your classification matches the tender requirements before bidding."
              },
              {
                term: "Bill of Quantities (BOQ)",
                explanation: "A detailed list of materials, labor, and services with quantities and unit prices. It's the basis for your financial proposal and contract pricing if awarded."
              },
              {
                term: "Prequalification (Pre-Q)",
                explanation: "Some tenders require prequalification where contractors submit credentials first. Only prequalified contractors can submit full bids. This filters eligible bidders early."
              },
              {
                term: "Public vs Invited Tenders",
                explanation: "Public tenders are open to all qualified contractors. Invited tenders are sent only to selected contractors who meet specific criteria or have been pre-screened."
              },
              {
                term: "Submission Deadline & Clarification Period",
                explanation: "Submission deadline is the final date/time for bid submission. Clarification period is when you can ask questions. Both are strict—missing deadlines disqualifies your bid."
              },
            ].map((item, index) => (
              <div
                key={index}
                className="glass-strong rounded-xl p-5 border border-white/10 hover:border-emerald-500/30 transition-all duration-300"
              >
                <h3 className="text-lg font-semibold text-emerald-400 mb-2 font-heading">{item.term}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.explanation}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tips for Contractors Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-slate-100 mb-8 font-heading">Practical tips for better bidding</h2>
          <div className="glass-strong rounded-2xl p-8 border border-white/10">
            <div className="space-y-4">
              {[
                "Don't wait until the last week to read tender documents. Start early to understand requirements and plan your response.",
                "Check eligibility and classification requirements first. Ensure you meet minimum qualifications before investing time in bid preparation.",
                "Track clarification deadlines to avoid missing crucial updates. Submit questions early and monitor official responses.",
                "Always verify final dates and details on the official portal. Don't rely solely on third-party information—confirm everything directly.",
                "Focus on tenders aligned with your strengths instead of bidding on everything. Quality over quantity improves your win rate.",
                "Prepare a checklist of required documents (licenses, certificates, guarantees) well in advance to avoid last-minute issues.",
                "Review past similar projects to understand typical requirements and pricing expectations in your market segment.",
              ].map((tip, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-6 h-6 bg-emerald-500/20 rounded-lg flex items-center justify-center mt-0.5">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                  </div>
                  <p className="text-slate-300 leading-relaxed flex-1">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Using NextBid Effectively Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-slate-100 mb-8 font-heading">How NextBid helps</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="glass-strong rounded-2xl p-6 border border-white/10 hover:border-emerald-500/30 transition-all duration-300 text-center">
              <h3 className="text-xl font-semibold text-slate-100 mb-3 font-heading">Discover</h3>
              <p className="text-slate-400 leading-relaxed">
                Find tenders by city, area, and project type. Filter by date, category, and keywords to quickly identify relevant opportunities.
              </p>
            </div>

            <div className="glass-strong rounded-2xl p-6 border border-white/10 hover:border-emerald-500/30 transition-all duration-300 text-center">
              <h3 className="text-xl font-semibold text-slate-100 mb-3 font-heading">Understand</h3>
              <p className="text-slate-400 leading-relaxed">
                See summarized key details, requirements, deadlines, and AI-powered insights to quickly assess if a tender fits your capabilities.
              </p>
            </div>

            <div className="glass-strong rounded-2xl p-6 border border-white/10 hover:border-emerald-500/30 transition-all duration-300 text-center">
              <h3 className="text-xl font-semibold text-slate-100 mb-3 font-heading">Act</h3>
              <p className="text-slate-400 leading-relaxed">
                Visit the official portal directly from NextBid to download documents, submit clarifications, and submit your bid.
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <Link
              to="/"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold rounded-2xl shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:scale-105 hover:shadow-emerald-500/50"
            >
              <span>Start searching tenders</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

