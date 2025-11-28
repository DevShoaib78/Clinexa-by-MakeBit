import { useState, FormEvent } from "react";
import { Mail, Send, CheckCircle2 } from "lucide-react";

export function ContactPage() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setName("");
    setCompany("");
    setEmail("");
    setMessage("");
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-20 sm:pt-24 pb-12 sm:pb-16 md:pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full mb-4 sm:mb-6">
            <Mail className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-100 mb-3 sm:mb-4 px-2">
            Get in touch
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto px-2">
            If you spot missing or incorrect tenders, or want to request new
            cities or features, let us know.
          </p>
        </div>

        {submitted && (
          <div className="mb-8 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 animate-fadeIn">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-emerald-400 mb-1">
                  Thank you for your message!
                </h3>
                <p className="text-slate-300">
                  We'll get back to you as soon as possible.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-slate-900 border border-slate-800 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-slate-200 mb-2"
              >
                Name <span className="text-slate-500">(optional)</span>
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="company"
                className="block text-sm font-semibold text-slate-200 mb-2"
              >
                Company <span className="text-slate-500">(optional)</span>
              </label>
              <input
                id="company"
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Your company name"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-slate-200 mb-2"
              >
                Email <span className="text-red-400">*</span>
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-semibold text-slate-200 mb-2"
              >
                Message <span className="text-red-400">*</span>
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us about missing tenders, feature requests, or any feedback..."
                required
                rows={6}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/30 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Send className="w-5 h-5" />
              <span>Send message</span>
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-800 text-center">
            <p className="text-slate-400 mb-2">Or email us directly at:</p>
            <a
              href="mailto:team@makebit.tech"
              className="text-emerald-400 hover:text-emerald-300 font-medium text-lg transition-colors"
            >
              team@makebit.tech
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
