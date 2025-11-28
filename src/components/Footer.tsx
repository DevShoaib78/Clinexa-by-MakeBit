export function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <div className="mb-4">
              <img
                src="/assets/clinexalogo.webp"
                alt="Clinexa Logo"
                className="h-10 sm:h-12 w-auto object-contain"
                loading="lazy"
              />
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              AI-powered symptom analysis to help you understand your health
              and know when to see a doctor.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-sm font-semibold text-slate-100 uppercase tracking-wider mb-4">
              Product
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="text-sm text-slate-400 hover:text-red-400 transition-colors"
                >
                  Symptom Analyzer
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-sm text-slate-400 hover:text-red-400 transition-colors"
                >
                  How It Works
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center">
            <h3 className="text-sm font-semibold text-slate-100 uppercase tracking-wider mb-4">
              Contact
            </h3>
            <p className="text-sm text-slate-400 mb-2">
              Questions or feedback?
            </p>
            <a
              href="mailto:team@makebit.tech"
              className="text-sm text-red-400 hover:text-red-300 transition-colors"
            >
              team@makebit.tech
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <div className="flex items-center gap-3">
              <p className="text-sm text-slate-400">A product of</p>
              <a
                href="https://makebit.tech"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block hover:opacity-100 transition-opacity"
              >
                <img
                  src="/assets/makebit transparent.webp"
                  alt="MakeBit Logo"
                  className="h-8 sm:h-10 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
                  loading="lazy"
                />
              </a>
            </div>
            <p className="text-xs text-slate-500 max-w-md">
              Clinexa is not a medical service and does not provide diagnoses. 
              Always consult with qualified healthcare professionals for medical advice.
            </p>
          </div>
          <div className="mt-4 text-center">
            <p className="text-xs text-slate-500">
              © 2025 MakeBit. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
