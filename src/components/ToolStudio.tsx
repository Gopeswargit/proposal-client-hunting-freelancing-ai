import React, { useState } from "react";
import { ToolItem, Language, GenerationHistory } from "../types";
import {
  Sparkles,
  Send,
  Copy,
  Check,
  Download,
  Share2,
  RefreshCw,
  Zap,
  Lightbulb,
  ExternalLink,
  Briefcase,
  DollarSign,
  AlertCircle,
  Clock,
  ThumbsUp,
} from "lucide-react";
import Markdown from "react-markdown";
import confetti from "canvas-confetti";

interface ToolStudioProps {
  tool: ToolItem;
  language: Language;
  onSaveHistory: (historyItem: Omit<GenerationHistory, "id" | "createdAt">) => void;
  credits: number;
  onDeductCredit: () => void;
  onOpenPricing: () => void;
}

export const ToolStudio: React.FC<ToolStudioProps> = ({
  tool,
  language,
  onSaveHistory,
  credits,
  onDeductCredit,
  onOpenPricing,
}) => {
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [tone, setTone] = useState<string>("persuasive");
  const [outputLang, setOutputLang] = useState<Language>(language);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  // Sync language selection when parent language changes
  React.useEffect(() => {
    setOutputLang(language);
  }, [language]);

  const handleInputChange = (fieldName: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [fieldName]: value }));
  };

  const handleSamplePrompt = (sampleText: string) => {
    const firstField = tool.fields[0];
    if (firstField) {
      setFormValues((prev) => ({ ...prev, [firstField.name]: sampleText }));
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (credits <= 0) {
      onOpenPricing();
      return;
    }

    const firstField = tool.fields[0];
    const primaryInput = formValues[firstField.name] || "";
    if (!primaryInput.trim()) {
      setError(language === "bn" ? "দয়া করে প্রয়োজনীয় বিবরণ লিখুন" : "Please provide the required details");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      // Build structured prompt from fields
      const fieldDetails = tool.fields
        .map((f) => `${f.labelEn}: ${formValues[f.name] || "N/A"}`)
        .join("\n");

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toolId: tool.id,
          toolTitle: tool.titleEn,
          prompt: primaryInput,
          tone,
          language: outputLang,
          targetPlatform: tool.platforms.join(", "),
          additionalDetails: fieldDetails,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to generate content");
      }

      setResult(data.result);
      onDeductCredit();
      onSaveHistory({
        toolId: tool.id,
        toolTitle: language === "bn" ? tool.titleBn : tool.titleEn,
        prompt: primaryInput,
        result: data.result,
        language: outputLang,
      });

      // Celebration effect
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
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

  const handleDownload = () => {
    if (!result) return;
    const element = document.createElement("a");
    const file = new Blob([result], { type: "text/plain;charset=utf-8" });
    element.href = URL.createObjectURL(file);
    element.download = `${tool.id}_monetized_content_${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Left Column: Configuration & Form */}
      <div className="lg:col-span-5 space-y-6">
        {/* Tool Header Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
              {language === "bn" ? tool.badgeBn : tool.badgeEn}
            </span>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
              <DollarSign className="h-3.5 w-3.5 text-emerald-600" />
              <span>{language === "bn" ? tool.earningPotentialBn : tool.earningPotentialEn}</span>
            </div>
          </div>

          <h2 className="mt-3 text-xl font-extrabold text-slate-900">
            {language === "bn" ? tool.titleBn : tool.titleEn}
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed">
            {language === "bn" ? tool.descBn : tool.descEn}
          </p>

          {/* Supported Platforms Tag Row */}
          <div className="mt-4 flex flex-wrap items-center gap-1.5 pt-3 border-t border-slate-100">
            <span className="text-[11px] font-medium text-slate-400">
              {language === "bn" ? "টার্গেট প্ল্যাটফর্ম:" : "Platforms:"}
            </span>
            {tool.platforms.map((plat, idx) => (
              <span
                key={idx}
                className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700"
              >
                {plat}
              </span>
            ))}
          </div>
        </div>

        {/* Input Form */}
        <form
          onSubmit={handleGenerate}
          className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm space-y-4"
        >
          {/* Quick Preset Sample Chips */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {language === "bn" ? "💡 দ্রুত শুরু করার টেমপ্লেট:" : "💡 Ready Templates:"}
              </span>
            </div>
            <div className="flex flex-col gap-1.5">
              {(language === "bn" ? tool.samplePromptsBn : tool.samplePromptsEn).map((sample, sIdx) => (
                <button
                  type="button"
                  key={sIdx}
                  onClick={() => handleSamplePrompt(sample)}
                  className="text-left rounded-lg border border-slate-200/80 bg-slate-50 px-3 py-1.5 text-xs text-slate-700 hover:bg-emerald-50 hover:border-emerald-200 transition-colors line-clamp-1"
                >
                  ⚡ {sample}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Fields */}
          {tool.fields.map((field) => (
            <div key={field.name} className="space-y-1.5">
              <label className="block text-xs sm:text-sm font-semibold text-slate-800">
                {language === "bn" ? field.labelBn : field.labelEn}{" "}
                {field.required && <span className="text-red-500">*</span>}
              </label>

              {field.type === "textarea" ? (
                <textarea
                  rows={4}
                  value={formValues[field.name] || ""}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                  placeholder={language === "bn" ? field.placeholderBn : field.placeholderEn}
                  className="w-full rounded-xl border border-slate-200 p-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20"
                />
              ) : field.type === "select" ? (
                <select
                  value={formValues[field.name] || (field.options?.[0]?.value || "")}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs sm:text-sm text-slate-900 focus:border-emerald-500 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20"
                >
                  {field.options?.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {language === "bn" ? opt.labelBn : opt.labelEn}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={formValues[field.name] || ""}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                  placeholder={language === "bn" ? field.placeholderBn : field.placeholderEn}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20"
                />
              )}
            </div>
          ))}

          {/* Tone & Language Selectors */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {language === "bn" ? "টোনের ধরন" : "Writing Tone"}
              </label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full rounded-xl border border-slate-200 p-2 text-xs sm:text-sm text-slate-800 focus:border-emerald-500 focus:outline-hidden"
              >
                <option value="persuasive">
                  {language === "bn" ? "🔥 আকর্ষণীয় ও সেলস (Persuasive)" : "🔥 High-Converting"}
                </option>
                <option value="professional">
                  {language === "bn" ? "💼 প্রফেশনাল ও মার্জিত" : "💼 Professional"}
                </option>
                <option value="storytelling">
                  {language === "bn" ? "📖 গল্প ও আবেগঘন" : "📖 Storytelling"}
                </option>
                <option value="urgent">
                  {language === "bn" ? "⚡ অফার ও দ্রুত অ্যাকশন" : "⚡ Urgent / FOMO"}
                </option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {language === "bn" ? "আউটপুট ভাষা" : "Output Language"}
              </label>
              <select
                value={outputLang}
                onChange={(e) => setOutputLang(e.target.value as Language)}
                className="w-full rounded-xl border border-slate-200 p-2 text-xs sm:text-sm text-slate-800 focus:border-emerald-500 focus:outline-hidden"
              >
                <option value="bn">বাংলা (Bengali)</option>
                <option value="en">English (International)</option>
              </select>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-2">
            <button
              id="generate-content-btn"
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 py-3 text-sm font-bold text-white shadow-md shadow-emerald-600/20 hover:from-emerald-700 hover:to-teal-700 transition-all disabled:opacity-70 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>{language === "bn" ? "AI তৈরি করছে..." : "Generating Content..."}</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 text-amber-300" />
                  <span>
                    {language === "bn"
                      ? "ইনকাম উপযোগী কনটেন্ট তৈরি করুন"
                      : "Generate Monetized Deliverable"}
                  </span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Right Column: Generated Output & Monetization Strategy */}
      <div className="lg:col-span-7">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm min-h-[520px] flex flex-col justify-between">
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                {language === "bn" ? "ফলাফল ও আয় নির্দেশিকা" : "Generated Output & Earning Guide"}
              </h3>
            </div>

            {result && (
              <div className="flex items-center gap-2">
                <button
                  id="copy-result-btn"
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                      <span className="text-emerald-700">
                        {language === "bn" ? "কপি হয়েছে!" : "Copied!"}
                      </span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5 text-slate-500" />
                      <span>{language === "bn" ? "কপি করুন" : "Copy"}</span>
                    </>
                  )}
                </button>

                <button
                  id="download-result-btn"
                  onClick={handleDownload}
                  className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
                  title={language === "bn" ? "ডাউনলোড টেক্সট ফাইল" : "Download TXT"}
                >
                  <Download className="h-3.5 w-3.5 text-slate-500" />
                </button>
              </div>
            )}
          </div>

          {/* Content Body */}
          <div className="my-4 flex-1 overflow-y-auto">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                  <Sparkles className="h-8 w-8 animate-pulse text-emerald-600" />
                  <div className="absolute inset-0 rounded-2xl border-2 border-emerald-500/30 animate-ping" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-800">
                    {language === "bn"
                      ? "Gemini 3.7 Flash কনটেন্ট তৈরি করছে..."
                      : "Crafting High-Converting Output..."}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm">
                    {language === "bn"
                      ? "সেরা মানের কপি এবং ক্লায়েন্ট থেকে আয় করার স্ট্র্যাটেজি সাজানো হচ্ছে..."
                      : "Applying top conversion frameworks, persuasive hooks, and monetization tactics."}
                  </p>
                </div>
              </div>
            ) : result ? (
              <div className="prose prose-slate max-w-none text-slate-800 text-sm leading-relaxed space-y-4">
                <Markdown>{result}</Markdown>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center text-slate-400 space-y-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-slate-300">
                  <Zap className="h-7 w-7" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-600">
                    {language === "bn"
                      ? "ফর্মটি পূরণ করে 'কনটেন্ট তৈরি করুন' বাটনে ক্লিক করুন"
                      : "Fill out the fields on the left and hit Generate"}
                  </p>
                  <p className="text-xs text-slate-400 mt-1 max-w-sm">
                    {language === "bn"
                      ? "এখানে সম্পূর্ণ প্রস্তুত কনটেন্ট ও তা দিয়ে কিভাবে আয় করবেন তার গাইড দেখতে পাবেন।"
                      : "You will receive the complete deliverable along with a step-by-step monetization action plan."}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Quick Monetization Footer Note */}
          <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-3 text-xs text-emerald-950 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>
                {language === "bn"
                  ? "টিপ: প্রতি জেনারেশনে আয় করার সুনির্দিষ্ট স্ট্র্যাটেজি নিচে যুক্ত থাকে।"
                  : "Tip: Every generation includes step-by-step pricing & sales strategies."}
              </span>
            </div>
            <span className="font-bold text-emerald-800 shrink-0">
              {credits} {language === "bn" ? "ক্রেডিট বাকি" : "credits left"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
