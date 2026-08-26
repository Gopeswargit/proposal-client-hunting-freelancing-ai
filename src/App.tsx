import React, { useState, useEffect } from "react";
import { Language, ToolItem, GenerationHistory } from "./types";
import { TOOLS_DATA } from "./data/toolsData";
import { Navbar } from "./components/Navbar";
import { ToolStudio } from "./components/ToolStudio";
import { JobPitchAnalyzer } from "./components/JobPitchAnalyzer";
import { EarningsCalculator } from "./components/EarningsCalculator";
import { IncomeGuideModal } from "./components/IncomeGuideModal";
import { PricingModal } from "./components/PricingModal";
import { HistoryDrawer } from "./components/HistoryDrawer";
import {
  Briefcase,
  ShoppingBag,
  Video,
  FileText,
  Sparkles,
  Target,
  ArrowRight,
  TrendingUp,
  HelpCircle,
  Zap,
  CheckCircle2,
  DollarSign,
  Layers,
} from "lucide-react";

export default function App() {
  const [language, setLanguage] = useState<Language>("bn");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedToolId, setSelectedToolId] = useState<string>(TOOLS_DATA[0].id);
  const [isJobAnalyzerActive, setIsJobAnalyzerActive] = useState<boolean>(false);

  // Credits & Monetization simulation
  const [credits, setCredits] = useState<number>(() => {
    const saved = localStorage.getItem("ai_income_credits");
    return saved !== null ? Number(saved) : 10;
  });

  // History state
  const [history, setHistory] = useState<GenerationHistory[]>(() => {
    try {
      const saved = localStorage.getItem("ai_income_history");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modals
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem("ai_income_credits", credits.toString());
  }, [credits]);

  useEffect(() => {
    localStorage.setItem("ai_income_history", JSON.stringify(history));
  }, [history]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleDeductCredit = () => {
    setCredits((prev) => Math.max(0, prev - 1));
  };

  const handleUpgradeSuccess = (creditsAdded: number, planName: string) => {
    setCredits((prev) => prev + creditsAdded);
    showToast(
      language === "bn"
        ? `অভিনন্দন! ${planName} চালু হয়েছে এবং +${creditsAdded} ক্রেডিট যোগ হয়েছে!`
        : `Success! ${planName} activated, +${creditsAdded} credits added!`
    );
  };

  const handleSaveHistory = (
    item: Omit<GenerationHistory, "id" | "createdAt">
  ) => {
    const newItem: GenerationHistory = {
      ...item,
      id: "gen_" + Date.now() + "_" + Math.random().toString(36).substr(2, 4),
      createdAt: Date.now(),
    };
    setHistory((prev) => [newItem, ...prev.slice(0, 29)]);
  };

  const handleClearHistory = () => {
    setHistory([]);
    showToast(language === "bn" ? "সকল হিস্ট্রি মুছে ফেলা হয়েছে" : "History cleared");
  };

  const handleDeleteHistoryItem = (id: string) => {
    setHistory((prev) => prev.filter((h) => h.id !== id));
  };

  // Find currently selected tool
  const currentTool =
    TOOLS_DATA.find((t) => t.id === selectedToolId) || TOOLS_DATA[0];

  // Filtered tools by category
  const filteredTools =
    activeCategory === "all"
      ? TOOLS_DATA
      : TOOLS_DATA.filter((t) => t.category === activeCategory);

  const getToolIcon = (iconName: string) => {
    switch (iconName) {
      case "Briefcase":
        return <Briefcase className="h-4 w-4" />;
      case "ShoppingBag":
        return <ShoppingBag className="h-4 w-4" />;
      case "Video":
        return <Video className="h-4 w-4" />;
      case "FileText":
        return <FileText className="h-4 w-4" />;
      case "Sparkles":
        return <Sparkles className="h-4 w-4" />;
      default:
        return <Layers className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-xl flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-bottom-3">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation */}
      <Navbar
        language={language}
        onLanguageChange={setLanguage}
        credits={credits}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
        onOpenGuide={() => setIsGuideOpen(true)}
        onOpenPricing={() => setIsPricingOpen(true)}
        onOpenHistory={() => setIsHistoryOpen(true)}
        historyCount={history.length}
      />

      {/* Main Workspace Container */}
      <main className="flex-1 mx-auto max-w-7xl w-full px-4 py-6 sm:px-6 space-y-6">
        {/* Banner Alert with Quick Action */}
        <div className="rounded-2xl border border-emerald-200/80 bg-gradient-to-r from-emerald-50 via-teal-50 to-white p-4 sm:p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm shadow-emerald-600/30">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 text-sm sm:text-base">
                  {language === "bn"
                    ? "কিভাবে এই AI দিয়ে আয় করবেন?"
                    : "Ready to turn AI outputs into income?"}
                </span>
                <span className="rounded-full bg-emerald-600 text-white text-[10px] font-extrabold px-2 py-0.5 uppercase tracking-wide">
                  {language === "bn" ? "ইনকাম গাইড" : "Earning Guide"}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                {language === "bn"
                  ? "Upwork, Fiverr ও সোশ্যাল মিডিয়ায় এই কনটেন্ট বিক্রি করে প্রতি মাসে $৩০০ - $১,৫০০ আয়ের পূর্ণাঙ্গ রূপরেখা দেখুন।"
                  : "Discover 4 practical blueprints to sell these generated outputs to clients worldwide."}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full md:w-auto shrink-0">
            <button
              onClick={() => setIsGuideOpen(true)}
              className="flex-1 md:flex-none flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-emerald-700 transition-colors shadow-xs"
            >
              <HelpCircle className="h-4 w-4" />
              <span>{language === "bn" ? "আয়ের উপায় দেখুন" : "View Strategies"}</span>
            </button>
            <button
              onClick={() => setIsCalculatorOpen(true)}
              className="flex-1 md:flex-none flex items-center justify-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <DollarSign className="h-4 w-4 text-emerald-600" />
              <span>{language === "bn" ? "ক্যালকুলেটর" : "ROI Calc"}</span>
            </button>
          </div>
        </div>

        {/* Category & Tools Selector Header */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
              {language === "bn" ? "ইনকাম ও কনটেন্ট স্টুডিও" : "Monetization & Content Studio"}
            </h1>
            <span className="text-xs font-semibold text-slate-500">
              {language === "bn" ? "টুল বেছে নিন" : "Select an AI Tool"}
            </span>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "all", labelBn: "🌟 সকল টুল", labelEn: "🌟 All Tools" },
              { id: "freelance", labelBn: "💼 ফ্রিল্যান্সিং", labelEn: "💼 Freelancing" },
              { id: "marketing", labelBn: "🛒 মার্কেটিং ও সেলস", labelEn: "🛒 Marketing & Ads" },
              { id: "video", labelBn: "🎥 ইউটিউব ও রিলস", labelEn: "🎥 Video & Shorts" },
              { id: "blog", labelBn: "📝 এসইও ও ব্লগ", labelEn: "📝 SEO & Blog" },
              { id: "business", labelBn: "💡 বিজনেস আইডিয়া", labelEn: "💡 Business Plans" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setIsJobAnalyzerActive(false);
                }}
                className={`rounded-xl px-3 py-1.5 text-xs sm:text-sm font-medium transition-all ${
                  activeCategory === cat.id && !isJobAnalyzerActive
                    ? "bg-slate-900 text-white shadow-xs"
                    : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                {language === "bn" ? cat.labelBn : cat.labelEn}
              </button>
            ))}

            {/* Special Bid Analyzer Tab */}
            <button
              onClick={() => setIsJobAnalyzerActive(true)}
              className={`rounded-xl px-3 py-1.5 text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all ${
                isJobAnalyzerActive
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "border border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
              }`}
            >
              <Target className="h-3.5 w-3.5" />
              <span>{language === "bn" ? "🎯 জব বিড অ্যানালাইজার" : "🎯 Job Pitch Analyzer"}</span>
            </button>
          </div>
        </div>

        {/* Tools Selection Horizontal Cards (When Not in Job Analyzer Mode) */}
        {!isJobAnalyzerActive && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {filteredTools.map((tool) => {
              const isSelected = selectedToolId === tool.id;
              return (
                <button
                  key={tool.id}
                  onClick={() => setSelectedToolId(tool.id)}
                  className={`flex flex-col items-start justify-between rounded-xl p-3.5 text-left transition-all cursor-pointer ${
                    isSelected
                      ? "border-2 border-emerald-600 bg-white shadow-md shadow-emerald-500/10 ring-2 ring-emerald-500/10"
                      : "border border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs"
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-2">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                        isSelected
                          ? "bg-emerald-600 text-white"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {getToolIcon(tool.iconName)}
                    </div>
                    {isSelected && (
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    )}
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1">
                    {language === "bn" ? tool.titleBn : tool.titleEn}
                  </h4>
                  <p className="text-[11px] text-emerald-700 font-semibold mt-1 line-clamp-1">
                    {language === "bn" ? tool.earningPotentialBn : tool.earningPotentialEn}
                  </p>
                </button>
              );
            })}
          </div>
        )}

        {/* Primary Interactive Workspace */}
        <div className="pt-2">
          {isJobAnalyzerActive ? (
            <JobPitchAnalyzer
              language={language}
              credits={credits}
              onDeductCredit={handleDeductCredit}
              onOpenPricing={() => setIsPricingOpen(true)}
              onSaveHistory={handleSaveHistory}
            />
          ) : (
            <ToolStudio
              tool={currentTool}
              language={language}
              onSaveHistory={handleSaveHistory}
              credits={credits}
              onDeductCredit={handleDeductCredit}
              onOpenPricing={() => setIsPricingOpen(true)}
            />
          )}
        </div>

        {/* Bottom Income Methods Quick Cards */}
        <div className="mt-8 pt-6 border-t border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {language === "bn" ? "আয়ের শীর্ষ ৪টি সেক্টর" : "Top 4 Monetization Sectors"}
              </h3>
              <p className="text-xs text-slate-500">
                {language === "bn"
                  ? "যেভাবে হাজারো মানুষ এই কনটেন্ট টুলগুলো ব্যবহার করে উপার্জন করছেন"
                  : "Real-world income workflows ready for deployment"}
              </p>
            </div>
            <button
              onClick={() => setIsGuideOpen(true)}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 underline flex items-center gap-1"
            >
              <span>{language === "bn" ? "বিস্তারিত দেখুন" : "Learn More"}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div
              onClick={() => {
                setSelectedToolId("freelance-proposal");
                setIsJobAnalyzerActive(false);
              }}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs hover:border-emerald-300 hover:shadow-sm cursor-pointer transition-all"
            >
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
                <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                  Fiverr / Upwork
                </span>
                <span>$20 - $100</span>
              </div>
              <h4 className="text-sm font-bold text-slate-900">
                {language === "bn" ? "ফ্রিল্যান্সিং সার্ভিস" : "Freelance Gigs"}
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {language === "bn"
                  ? "ক্লায়েন্টদের জন্য কপিরাইটিং, আর্টিকেল ও ভিডিও স্ক্রিপ্ট লিখে আয়।"
                  : "Deliver copywriting and scripts for Upwork & Fiverr buyers."}
              </p>
            </div>

            <div
              onClick={() => {
                setSelectedToolId("fcommerce-ad-copy");
                setIsJobAnalyzerActive(false);
              }}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs hover:border-emerald-300 hover:shadow-sm cursor-pointer transition-all"
            >
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
                <span className="text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md">
                  Local / FB
                </span>
                <span>৳৫,০০০ - ৳২০,০০০</span>
              </div>
              <h4 className="text-sm font-bold text-slate-900">
                {language === "bn" ? "ফেসবুক অ্যাড কপি" : "E-Commerce Ad Copy"}
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {language === "bn"
                  ? "অনলাইন শপ ও ব্র্যান্ডকে সেলস অ্যাড লিখে দিয়ে মাসিক চার্জ নিন।"
                  : "Help local e-commerce stores boost sales with persuasive ad copy."}
              </p>
            </div>

            <div
              onClick={() => {
                setSelectedToolId("youtube-script");
                setIsJobAnalyzerActive(false);
              }}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs hover:border-emerald-300 hover:shadow-sm cursor-pointer transition-all"
            >
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
                <span className="text-red-700 bg-red-50 px-2 py-0.5 rounded-md">
                  YouTube
                </span>
                <span>$100 - $1,000+</span>
              </div>
              <h4 className="text-sm font-bold text-slate-900">
                {language === "bn" ? "ইউটিউব মনিটাইজেশন" : "Faceless Channels"}
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {language === "bn"
                  ? "AI স্ক্রিপ্ট ও ভয়েস দিয়ে ফেসলেস চ্যানেল চালিয়ে বিজ্ঞাপন থেকে আয়।"
                  : "Build faceless YouTube channels monetized via AdSense & sponsorships."}
              </p>
            </div>

            <div
              onClick={() => {
                setSelectedToolId("seo-blog-article");
                setIsJobAnalyzerActive(false);
              }}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs hover:border-emerald-300 hover:shadow-sm cursor-pointer transition-all"
            >
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
                <span className="text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">
                  AdSense
                </span>
                <span>$200 - $2,500</span>
              </div>
              <h4 className="text-sm font-bold text-slate-900">
                {language === "bn" ? "এসইও ব্লগ ওয়েবসাইট" : "SEO AdSense Blogs"}
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {language === "bn"
                  ? "ওয়েবসাইটে আর্টিকেল পাবলিশ করে গুগল সার্চ ভিজিটর থেকে প্যাসিভ ইনকাম।"
                  : "Rank keyword-rich blog articles to earn passive AdSense clicks."}
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            © 2026 AI Income Studio (এআই আয় স্টুডিও) • Powered by Gemini 3.7 Flash
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsGuideOpen(true)}
              className="hover:text-emerald-700"
            >
              {language === "bn" ? "আয়ের নির্দেশিকা" : "Earning Guide"}
            </button>
            <button
              onClick={() => setIsCalculatorOpen(true)}
              className="hover:text-emerald-700"
            >
              {language === "bn" ? "আয় ক্যালকুলেটর" : "ROI Calculator"}
            </button>
            <button
              onClick={() => setIsPricingOpen(true)}
              className="hover:text-emerald-700"
            >
              {language === "bn" ? "সাবস্ক্রিপশন প্ল্যান" : "Pricing Plans"}
            </button>
          </div>
        </div>
      </footer>

      {/* Modals & Drawers */}
      <EarningsCalculator
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
        language={language}
      />

      <IncomeGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        language={language}
        onSelectToolCategory={(cat) => {
          setActiveCategory(cat);
          setIsJobAnalyzerActive(false);
        }}
      />

      <PricingModal
        isOpen={isPricingOpen}
        onClose={() => setIsPricingOpen(false)}
        language={language}
        onUpgradeSuccess={handleUpgradeSuccess}
      />

      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onClearHistory={handleClearHistory}
        onDeleteHistoryItem={handleDeleteHistoryItem}
        language={language}
      />
    </div>
  );
}
