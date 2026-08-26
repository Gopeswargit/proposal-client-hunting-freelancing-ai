import React, { useState } from "react";
import { Language } from "../types";
import { X, TrendingUp, DollarSign, Sparkles, CheckCircle2 } from "lucide-react";

interface EarningsCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const EarningsCalculator: React.FC<EarningsCalculatorProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  // State for calculation parameters
  const [freelanceGigs, setFreelanceGigs] = useState<number>(4);
  const [gigPrice, setGigPrice] = useState<number>(50); // in USD
  const [localClients, setLocalClients] = useState<number>(2);
  const [localClientPrice, setLocalClientPrice] = useState<number>(5000); // in BDT
  const [youtubeViews, setYoutubeViews] = useState<number>(30000);
  const [blogViews, setBlogViews] = useState<number>(15000);

  if (!isOpen) return null;

  const USD_TO_BDT = 120; // 1 USD ~ 120 BDT

  // Calculations
  const freelanceUSD = freelanceGigs * gigPrice;
  const localClientsUSD = (localClients * localClientPrice) / USD_TO_BDT;
  const youtubeUSD = (youtubeViews / 1000) * 1.5; // Average $1.50 RPM
  const blogUSD = (blogViews / 1000) * 2.0; // Average $2.00 RPM for AdSense + Affiliate

  const totalMonthlyUSD = Math.round(freelanceUSD + localClientsUSD + youtubeUSD + blogUSD);
  const totalMonthlyBDT = Math.round(totalMonthlyUSD * USD_TO_BDT);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
      <div
        id="calculator-modal"
        className="relative w-full max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl overflow-y-auto max-h-[90vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                {language === "bn"
                  ? "অনলাইন আয় সম্ভাবনা ক্যালকুলেটর"
                  : "AI Earnings & ROI Calculator"}
              </h2>
              <p className="text-xs text-slate-500">
                {language === "bn"
                  ? "AI টুলগুলো ব্যবহার করে প্রতি মাসে কত উপার্জন সম্ভব তার হিসাব করুন"
                  : "Estimate your monthly income streams using AI-powered workflows"}
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

        {/* Big Total Highlight Card */}
        <div className="my-6 rounded-2xl bg-gradient-to-br from-slate-900 via-teal-950 to-emerald-950 p-6 text-white shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300 border border-emerald-500/30">
                <Sparkles className="h-3 w-3" />
                {language === "bn" ? "আনুমানিক মাসিক আয়" : "Estimated Monthly Income"}
              </span>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-4xl font-extrabold tracking-tight text-white">
                  ${totalMonthlyUSD.toLocaleString()}
                </span>
                <span className="text-xl font-medium text-emerald-400">
                  / {language === "bn" ? "মাস" : "mo"}
                </span>
              </div>
              <p className="mt-1 text-sm text-slate-300">
                {language === "bn"
                  ? `বাংলাদেশী টাকায় আনুমানিক ৳${totalMonthlyBDT.toLocaleString()} টাকা`
                  : `Equivalent to approx ৳${totalMonthlyBDT.toLocaleString()} BDT`}
              </p>
            </div>

            {/* Annual Potential */}
            <div className="rounded-xl bg-white/10 p-3.5 backdrop-blur-md border border-white/10 text-right w-full md:w-auto">
              <span className="text-xs text-slate-300">
                {language === "bn" ? "বাৎসরিক সম্ভাবনা" : "Annual Potential"}
              </span>
              <p className="text-xl font-bold text-amber-300">
                ${(totalMonthlyUSD * 12).toLocaleString()} /{" "}
                <span className="text-sm font-normal text-white">
                  ৳{((totalMonthlyBDT * 12) / 100000).toFixed(1)} লক্ষ
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Freelancing Stream */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
            <div className="flex items-center justify-between text-sm font-semibold text-slate-800">
              <span>{language === "bn" ? "১. Upwork/Fiverr গিগ প্রজেক্ট" : "1. Freelance Projects"}</span>
              <span className="text-emerald-700 font-bold">${freelanceUSD}/mo</span>
            </div>
            <div className="mt-3 space-y-2">
              <div className="flex justify-between text-xs text-slate-600">
                <span>{language === "bn" ? "মাসিক প্রজেক্ট সংখ্যা" : "Gigs per month"}: <strong>{freelanceGigs}</strong></span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                value={freelanceGigs}
                onChange={(e) => setFreelanceGigs(Number(e.target.value))}
                className="w-full accent-emerald-600"
              />
              <div className="flex justify-between text-xs text-slate-600">
                <span>{language === "bn" ? "গড় প্রজেক্ট মূল্য" : "Avg Price"}: <strong>${gigPrice}</strong></span>
              </div>
              <input
                type="range"
                min="10"
                max="300"
                step="10"
                value={gigPrice}
                onChange={(e) => setGigPrice(Number(e.target.value))}
                className="w-full accent-emerald-600"
              />
            </div>
          </div>

          {/* Local Clients Stream */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
            <div className="flex items-center justify-between text-sm font-semibold text-slate-800">
              <span>{language === "bn" ? "২. লোকাল ক্লায়েন্ট / ফেসবুক পেজ কপি" : "2. Local Ad Copy Retainers"}</span>
              <span className="text-teal-700 font-bold">৳{(localClients * localClientPrice).toLocaleString()}/mo</span>
            </div>
            <div className="mt-3 space-y-2">
              <div className="flex justify-between text-xs text-slate-600">
                <span>{language === "bn" ? "মাসিক ক্লায়েন্ট সংখ্যা" : "Clients"}: <strong>{localClients}</strong></span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                value={localClients}
                onChange={(e) => setLocalClients(Number(e.target.value))}
                className="w-full accent-teal-600"
              />
              <div className="flex justify-between text-xs text-slate-600">
                <span>{language === "bn" ? "মাসিক প্যাকেজ ফি" : "Monthly Retainer"}: <strong>৳{localClientPrice.toLocaleString()}</strong></span>
              </div>
              <input
                type="range"
                min="2000"
                max="20000"
                step="1000"
                value={localClientPrice}
                onChange={(e) => setLocalClientPrice(Number(e.target.value))}
                className="w-full accent-teal-600"
              />
            </div>
          </div>

          {/* YouTube Stream */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
            <div className="flex items-center justify-between text-sm font-semibold text-slate-800">
              <span>{language === "bn" ? "৩. ইউটিউব চ্যানেল ভিউ (AdSense)" : "3. YouTube Monthly Views"}</span>
              <span className="text-red-700 font-bold">${Math.round(youtubeUSD)}/mo</span>
            </div>
            <div className="mt-3 space-y-2">
              <div className="flex justify-between text-xs text-slate-600">
                <span>{language === "bn" ? "মাসিক ভিডিও ভিউ" : "Monthly Views"}: <strong>{youtubeViews.toLocaleString()}</strong></span>
              </div>
              <input
                type="range"
                min="0"
                max="200000"
                step="5000"
                value={youtubeViews}
                onChange={(e) => setYoutubeViews(Number(e.target.value))}
                className="w-full accent-red-600"
              />
              <span className="text-[11px] text-slate-500">
                {language === "bn" ? "* গড় RPM $1.50 ধরে হিসাব করা হয়েছে" : "* Based on average $1.50 RPM"}
              </span>
            </div>
          </div>

          {/* Blog / AdSense Stream */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
            <div className="flex items-center justify-between text-sm font-semibold text-slate-800">
              <span>{language === "bn" ? "৪. এসইও ব্লগ / ওয়েবসাইট ট্রাফিক" : "4. SEO Blog Traffic"}</span>
              <span className="text-indigo-700 font-bold">${Math.round(blogUSD)}/mo</span>
            </div>
            <div className="mt-3 space-y-2">
              <div className="flex justify-between text-xs text-slate-600">
                <span>{language === "bn" ? "মাসিক পেজভিউ" : "Monthly Pageviews"}: <strong>{blogViews.toLocaleString()}</strong></span>
              </div>
              <input
                type="range"
                min="0"
                max="100000"
                step="2500"
                value={blogViews}
                onChange={(e) => setBlogViews(Number(e.target.value))}
                className="w-full accent-indigo-600"
              />
              <span className="text-[11px] text-slate-500">
                {language === "bn" ? "* AdSense ও অ্যাফিলিয়েট ক্লিক ধরে হিসাব" : "* Combined AdSense & Affiliate RPM"}
              </span>
            </div>
          </div>
        </div>

        {/* Action Strategy Checklist */}
        <div className="mt-6 rounded-xl border border-emerald-100 bg-emerald-50/60 p-4 text-xs sm:text-sm text-slate-700">
          <div className="flex items-center gap-2 font-semibold text-emerald-900 mb-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            <span>{language === "bn" ? "এই লক্ষ্য পূরণের সহজ রুটিন:" : "Actionable 30-Day Routine:"}</span>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-600">
            <li>• {language === "bn" ? "প্রতিদিন ১-২টি Upwork জবে কাস্টম প্রপোজাল পাঠানো" : "Apply to 1-2 Upwork jobs daily with custom proposals"}</li>
            <li>• {language === "bn" ? "প্রতি সপ্তাহে ২টি ফেসবুক পেজকে ফ্রি স্যাম্পল অফার করা" : "Pitch 2 Facebook shop owners per week with free ad copy"}</li>
            <li>• {language === "bn" ? "ইউটিউবে সপ্তাহে ১টি ট্রেন্ডিং স্ক্রিপ্ট ভিত্তিক ভিডিও দেওয়া" : "Upload 1 script-backed YouTube video weekly"}</li>
            <li>• {language === "bn" ? "ব্লগে প্রতি সপ্তাহে ২টি এসইও আর্টিকেল পাবলিশ করা" : "Publish 2 SEO-optimized blog posts each week"}</li>
          </ul>
        </div>

        {/* Modal Close Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition-colors"
          >
            {language === "bn" ? "বুঝেছি, কাজ শুরু করি" : "Got it, Start Generating"}
          </button>
        </div>
      </div>
    </div>
  );
};
