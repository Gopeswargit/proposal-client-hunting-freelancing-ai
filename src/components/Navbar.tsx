import React from "react";
import { Language } from "../types";
import {
  Sparkles,
  Calculator,
  HelpCircle,
  History,
  Crown,
  Globe,
  Coins,
} from "lucide-react";

interface NavbarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  credits: number;
  onOpenCalculator: () => void;
  onOpenGuide: () => void;
  onOpenPricing: () => void;
  onOpenHistory: () => void;
  historyCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onLanguageChange,
  credits,
  onOpenCalculator,
  onOpenGuide,
  onOpenPricing,
  onOpenHistory,
  historyCount,
}) => {
  return (
    <header
      id="main-navbar"
      className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/90 backdrop-blur-md transition-colors"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-md shadow-emerald-500/20">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 text-lg sm:text-xl tracking-tight">
                {language === "bn" ? "AI আয় স্টুডিও" : "AI Income Studio"}
              </span>
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-800">
                PRO 3.7
              </span>
            </div>
            <p className="hidden sm:block text-xs text-slate-500">
              {language === "bn"
                ? "ফ্রিল্যান্সিং ও অনলাইন বিজনেসে আয় করার AI প্ল্যাটফর্ম"
                : "AI-Powered Freelance & Monetization Suite"}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Switcher */}
          <button
            id="lang-toggle-btn"
            onClick={() => onLanguageChange(language === "bn" ? "en" : "bn")}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs sm:text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors"
            title={language === "bn" ? "Switch to English" : "বাংলায় পরিবর্তন করুন"}
          >
            <Globe className="h-3.5 w-3.5 text-slate-500" />
            <span>{language === "bn" ? "বাংলা" : "English"}</span>
          </button>

          {/* Income Guide Button */}
          <button
            id="guide-btn"
            onClick={onOpenGuide}
            className="flex items-center gap-1.5 rounded-lg border border-teal-200 bg-teal-50/70 px-2.5 py-1.5 text-xs sm:text-sm font-medium text-teal-800 hover:bg-teal-100/80 transition-colors"
          >
            <HelpCircle className="h-4 w-4 text-teal-600" />
            <span className="hidden md:inline">
              {language === "bn" ? "কিভাবে আয় করবেন?" : "How to Earn"}
            </span>
          </button>

          {/* Income Calculator Button */}
          <button
            id="calculator-btn"
            onClick={onOpenCalculator}
            className="flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1.5 text-xs sm:text-sm font-medium text-emerald-800 hover:bg-emerald-100 transition-colors"
          >
            <Calculator className="h-4 w-4 text-emerald-600" />
            <span className="hidden md:inline">
              {language === "bn" ? "আয় ক্যালকুলেটর" : "ROI Calculator"}
            </span>
          </button>

          {/* History Drawer Trigger */}
          <button
            id="history-btn"
            onClick={onOpenHistory}
            className="relative flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs sm:text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <History className="h-4 w-4 text-slate-500" />
            {historyCount > 0 && (
              <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-emerald-600 px-1 text-[10px] font-bold text-white">
                {historyCount}
              </span>
            )}
          </button>

          {/* Free Credits Badge & Upgrade */}
          <button
            id="pricing-upgrade-btn"
            onClick={onOpenPricing}
            className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 px-3 py-1.5 text-xs sm:text-sm font-semibold text-white shadow-sm hover:from-emerald-700 hover:to-teal-700 transition-all"
          >
            <Coins className="h-3.5 w-3.5 text-amber-300" />
            <span>{credits}</span>
            <Crown className="hidden sm:inline h-3.5 w-3.5 ml-0.5 text-amber-200" />
          </button>
        </div>
      </div>
    </header>
  );
};
