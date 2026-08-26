import React, { useState } from "react";
import { Language, GenerationHistory } from "../types";
import {
  Briefcase,
  Sparkles,
  Copy,
  Check,
  Download,
  DollarSign,
  Clock,
  Target,
  AlertCircle,
} from "lucide-react";
import Markdown from "react-markdown";
import confetti from "canvas-confetti";

interface JobPitchAnalyzerProps {
  language: Language;
  credits: number;
  onDeductCredit: () => void;
  onOpenPricing: () => void;
  onSaveHistory: (historyItem: Omit<GenerationHistory, "id" | "createdAt">) => void;
}

export const JobPitchAnalyzer: React.FC<JobPitchAnalyzerProps> = ({
  language,
  credits,
  onDeductCredit,
  onOpenPricing,
  onSaveHistory,
}) => {
  const [jobDescription, setJobDescription] = useState("");
  const [clientBudget, setClientBudget] = useState("");
  const [freelancerSkills, setFreelancerSkills] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const sampleJob =
    language === "bn"
      ? "Looking for a skilled copywriter to write high-converting Facebook ad copy for our new organic skincare line. Must understand emotional hooks, pain points, and strong CTAs. Budget $100 fixed."
      : "Need a modern responsive React web developer to convert Figma designs into Tailwind CSS with smooth animations. Budget $300.";

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (credits <= 0) {
      onOpenPricing();
      return;
    }
    if (!jobDescription.trim()) {
      setError(
        language === "bn"
          ? "দয়া করে ক্লায়েন্টের জব পোস্টটি পেস্ট করুন"
          : "Please paste the client's job posting"
      );
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/analyze-gig", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobDescription,
          clientBudget,
          freelancerSkills,
          language,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to analyze job");
      }

      setResult(data.result);
      onDeductCredit();
      onSaveHistory({
        toolId: "job-pitch-analyzer",
        toolTitle: language === "bn" ? "জব বিড ও প্রপোজাল অ্যানালাইজার" : "Job Pitch & Bid Analyzer",
        prompt: jobDescription.slice(0, 120) + "...",
        result: data.result,
        language,
      });

      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } catch (err: any) {
      setError(err.message || "Failed to generate proposal.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Form Input Column */}
      <div className="lg:col-span-5 space-y-5">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
          <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs bg-emerald-50 px-3 py-1 rounded-full w-fit">
            <Target className="h-3.5 w-3.5" />
            <span>{language === "bn" ? "টপ ১% ফ্রিল্যান্সার স্ট্র্যাটেজি" : "Top 1% Win Rate"}</span>
          </div>

          <h2 className="mt-3 text-xl font-extrabold text-slate-900">
            {language === "bn" ? "জব বিড ও প্রপোজাল ক্লোজার" : "Job Pitch & Bid Closer"}
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-600">
            {language === "bn"
              ? "ক্লায়েন্টের জব পোস্ট পেস্ট করলেই AI ক্লায়েন্টের আসল সমস্যা খুঁজে বের করে ১৫ মিনিটে রিপ্লাই পাওয়ার উপযোগী কাস্টম প্রপোজাল লিখে দেবে।"
              : "Paste any Upwork, Fiverr, or client job post. AI analyzes pain points and drafts an irresistible pitch."}
          </p>

          <button
            type="button"
            onClick={() => setJobDescription(sampleJob)}
            className="mt-3 text-xs font-semibold text-emerald-700 hover:text-emerald-800 underline block"
          >
            ⚡ {language === "bn" ? "উদাহরণ জব পোস্ট পেস্ট করুন" : "Paste Sample Job Posting"}
          </button>
        </div>

        <form
          onSubmit={handleAnalyze}
          className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm space-y-4"
        >
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1.5">
              {language === "bn" ? "ক্লায়েন্টের সম্পূর্ণ জব পোস্ট *" : "Client's Job Posting *"}
            </label>
            <textarea
              rows={5}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder={
                language === "bn"
                  ? "Upwork বা Fiverr থেকে ক্লায়েন্টের জবের টেক্সট এখানে পেস্ট করুন..."
                  : "Paste the full client job description here..."
              }
              className="w-full rounded-xl border border-slate-200 p-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {language === "bn" ? "ক্লায়েন্টের বাজেট" : "Client Budget"}
              </label>
              <input
                type="text"
                value={clientBudget}
                onChange={(e) => setClientBudget(e.target.value)}
                placeholder={language === "bn" ? "যেমন: $100 / Fixed" : "e.g. $150 fixed / $30/hr"}
                className="w-full rounded-xl border border-slate-200 p-2.5 text-xs sm:text-sm text-slate-900 focus:border-emerald-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {language === "bn" ? "আপনার মূল দক্ষতা" : "Your Skills / USP"}
              </label>
              <input
                type="text"
                value={freelancerSkills}
                onChange={(e) => setFreelancerSkills(e.target.value)}
                placeholder={language === "bn" ? "যেমন: ৩ বছরের অভিজ্ঞতা" : "e.g. 3 years in React & UI"}
                className="w-full rounded-xl border border-slate-200 p-2.5 text-xs sm:text-sm text-slate-900 focus:border-emerald-500 focus:outline-hidden"
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 text-sm font-bold text-white shadow-md hover:bg-slate-800 transition-all cursor-pointer disabled:opacity-70"
          >
            {isLoading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                <span>{language === "bn" ? "অ্যানালাইজ করা হচ্ছে..." : "Analyzing Job..."}</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 text-emerald-400" />
                <span>{language === "bn" ? "উইনিং প্রপোজাল তৈরি করুন" : "Generate Winning Proposal"}</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Output Column */}
      <div className="lg:col-span-7">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm min-h-[500px] flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-emerald-600" />
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                {language === "bn" ? "উইনিং পিচ ও বিড স্ট্র্যাটেজি" : "Winning Pitch & Strategy"}
              </h3>
            </div>

            {result && (
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                    <span className="text-emerald-700">{language === "bn" ? "কপি হয়েছে!" : "Copied!"}</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 text-slate-500" />
                    <span>{language === "bn" ? "কপি করুন" : "Copy"}</span>
                  </>
                )}
              </button>
            )}
          </div>

          <div className="my-4 flex-1 overflow-y-auto">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                  <Sparkles className="h-7 w-7 text-emerald-600 animate-pulse" />
                </div>
                <p className="text-sm font-semibold text-slate-700">
                  {language === "bn"
                    ? "ক্লায়েন্টের জব পোস্টটি বিশ্লেষণ করা হচ্ছে..."
                    : "Analyzing client psychology & drafting hook..."}
                </p>
              </div>
            ) : result ? (
              <div className="prose prose-slate max-w-none text-slate-800 text-sm leading-relaxed space-y-4">
                <Markdown>{result}</Markdown>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center text-slate-400 space-y-3">
                <Briefcase className="h-10 w-10 text-slate-300" />
                <p className="text-sm font-semibold text-slate-600">
                  {language === "bn"
                    ? "বাম পাশের বক্সে কোনো ক্লায়েন্টের জব বিবরণ দিয়ে বাটন চাপুন"
                    : "Paste a job description on the left to get a winning proposal"}
                </p>
              </div>
            )}
          </div>

          <div className="rounded-xl bg-slate-50 p-3 text-xs text-slate-600 border border-slate-200/60 flex items-center justify-between">
            <span>
              {language === "bn"
                ? "💡 প্রপোজাল পাঠানোর আগে ক্লায়েন্টের নাম থাকলে তা যোগ করে নিন।"
                : "💡 Personalize with the client's name if mentioned in the job description."}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
