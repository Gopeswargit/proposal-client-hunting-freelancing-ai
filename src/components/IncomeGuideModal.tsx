import React, { useState } from "react";
import { Language } from "../types";
import { EARNING_METHODS_GUIDE } from "../data/toolsData";
import {
  X,
  BookOpen,
  DollarSign,
  Briefcase,
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";

interface IncomeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onSelectToolCategory: (category: string) => void;
}

export const IncomeGuideModal: React.FC<IncomeGuideModalProps> = ({
  isOpen,
  onClose,
  language,
  onSelectToolCategory,
}) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  if (!isOpen) return null;

  const currentGuide = EARNING_METHODS_GUIDE[activeTab];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
      <div
        id="income-guide-modal"
        className="relative w-full max-w-4xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl overflow-y-auto max-h-[90vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-teal-700">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                {language === "bn"
                  ? "AI দিয়ে আয় করার সম্পূর্ণ গাইডলাইন"
                  : "Complete Blueprint: How to Earn with AI Tools"}
              </h2>
              <p className="text-xs text-slate-500">
                {language === "bn"
                  ? "৪টি পরীক্ষিত পদ্ধতি যা দিয়ে ঘরে বসে রিয়েল ইনকাম করা সম্ভব"
                  : "4 proven monetization strategies you can execute immediately"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="mt-5 flex flex-wrap gap-2 border-b border-slate-100 pb-3">
          {EARNING_METHODS_GUIDE.map((guide, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-semibold transition-all ${
                activeTab === idx
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <span>{guide.badge}</span>
            </button>
          ))}
        </div>

        {/* Active Guide Content */}
        <div className="mt-6 space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-5">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-lg font-bold text-slate-900">
                {language === "bn" ? currentGuide.titleBn : currentGuide.titleEn}
              </h3>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
                {currentGuide.badge}
              </span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {language === "bn" ? currentGuide.descBn : currentGuide.descEn}
            </p>
          </div>

          {/* Actionable Steps */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">
              {language === "bn" ? "কিভাবে শুরু করবেন (ধাপে ধাপে):" : "Step-by-Step Execution Plan:"}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(language === "bn" ? currentGuide.stepsBn : currentGuide.stepsEn).map((step, sIdx) => (
                <div
                  key={sIdx}
                  className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-3.5 shadow-xs"
                >
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-800">
                    {sIdx + 1}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-snug">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Payment & Security Note */}
          <div className="flex items-start gap-3 rounded-xl border border-teal-200 bg-teal-50/70 p-4 text-xs sm:text-sm text-teal-900">
            <ShieldCheck className="h-5 w-5 shrink-0 text-teal-600 mt-0.5" />
            <div>
              <p className="font-semibold">
                {language === "bn" ? "টাকা পাওয়ার মাধ্যম (Withdrawal):" : "Payment Methods:"}
              </p>
              <p className="text-teal-800 text-xs mt-1">
                {language === "bn"
                  ? "আন্তর্জাতিক ক্লায়েন্ট ও মার্কেটপ্লেস থেকে Payoneer বা সরাসরি Bank Wire Transfer-এর মাধ্যমে দেশের যেকোনো ব্যাংক অথবা বিকাশ/নগদ-এ সরাসরি টাকা আনা যায়।"
                  : "Earn in USD or EUR and withdraw smoothly via Payoneer, direct Bank Wire, or local mobile wallets."}
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
          <span className="text-xs text-slate-500">
            {language === "bn" ? "পদ্ধতি পরিবর্তন করতে উপরের ট্যাবগুলোতে ক্লিক করুন" : "Select a tab above to explore more methods"}
          </span>
          <button
            onClick={() => {
              onClose();
              if (activeTab === 0) onSelectToolCategory("freelance");
              else if (activeTab === 1) onSelectToolCategory("marketing");
              else if (activeTab === 2) onSelectToolCategory("video");
              else onSelectToolCategory("blog");
            }}
            className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors shadow-sm"
          >
            <span>{language === "bn" ? "এই টুল ব্যবহার করুন" : "Try This Tool Now"}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
