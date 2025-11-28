import { AlertCircle } from "lucide-react";

export function AboutPage() {
  const steps = [
    {
      title: "You choose city, area, and project type",
      description: "Tell us what kind of construction opportunities you're looking for and where.",
    },
    {
      title: "We search public tender sources",
      description: "Our system uses external APIs like Tavily to scan government procurement portals and public sources.",
    },
    {
      title: "We extract and organize key details",
      description: "AI helps identify and structure important information like deadlines, requirements, and project scope.",
    },
    {
      title: "You review and go to the official portal",
      description: "View organized results and navigate to official government portals to submit your bid.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 pt-20 sm:pt-24 pb-12 sm:pb-16 md:pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-100 mb-4 sm:mb-6 px-2">
            What is <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">NexBid</span>?
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed px-2">
            NexBid helps contractors and construction companies quickly discover
            construction tenders and public projects in Riyadh and Jeddah by
            searching public sources and organizing key information in an
            easy-to-understand format.
          </p>
        </div>

        <div className="mb-12 sm:mb-16 md:mb-20 relative">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 text-center mb-8 sm:mb-10 md:mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {steps.map((step, index) => {
              return (
                <div
                  key={index}
                  className="group relative bg-gradient-to-br from-slate-900/90 to-slate-800/50 border border-slate-700/50 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 overflow-hidden transition-all duration-500 hover:scale-[1.01] sm:hover:scale-[1.02] hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/20"
                >
                  {/* Animated Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 via-emerald-600/0 to-emerald-500/0 opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                  
                  {/* Animated Glow Effect */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/0 group-hover:bg-emerald-500/20 rounded-full blur-3xl transition-all duration-500 group-hover:scale-150" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-600/0 group-hover:bg-emerald-600/15 rounded-full blur-2xl transition-all duration-500 group-hover:scale-150" />
                  
                  {/* Number Badge with Enhanced Hover Effect */}
                  <div className="absolute top-4 left-4 w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:shadow-emerald-500/50 group-hover:scale-110 transition-all duration-300 z-10">
                    <span className="relative z-10">{index + 1}</span>
                    <div className="absolute inset-0 bg-emerald-400/30 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10 pt-2 pl-16">
                    <h3 className="text-xl font-semibold text-slate-100 mb-4 group-hover:text-emerald-400 transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
                      {step.description}
                    </p>
                  </div>
                  
                  {/* Subtle Border Glow on Hover */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-emerald-500/0 group-hover:border-emerald-500/30 transition-all duration-500 pointer-events-none" />
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-8 mb-16">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-8 h-8 text-amber-400 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold text-slate-100 mb-4">
                What NexBid Is Not
              </h2>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 mt-1">•</span>
                  <span>
                    <strong>We are not an official government portal.</strong>{" "}
                    NexBid aggregates publicly available information but is not
                    affiliated with any government agency.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 mt-1">•</span>
                  <span>
                    <strong>We do not handle bidding or submissions.</strong>{" "}
                    You must submit your bids through the official government
                    procurement portals.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 mt-1">•</span>
                  <span>
                    <strong>
                      We simply help you discover opportunities faster.
                    </strong>{" "}
                    Our goal is to save you time by organizing tender
                    information in one place.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-slate-100 mb-3">
            Who's Behind It
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Built by{" "}
            <a
              href="https://makebit.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 font-semibold underline decoration-emerald-500/50 underline-offset-4 transition-colors duration-200"
            >
              MakeBit
            </a>
            , a product and technology studio dedicated to creating tools that
            make business processes more efficient and accessible.
          </p>
        </div>
      </div>
    </div>
  );
}
