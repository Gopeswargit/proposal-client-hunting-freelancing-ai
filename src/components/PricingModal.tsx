import React, { useState } from "react";
import { Language, PricingPlan } from "../types";
import { PRICING_PLANS } from "../data/toolsData";
import { X, Check, Crown, Zap, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onUpgradeSuccess: (credits: number, planName: string) => void;
}

export const PricingModal: React.FC<PricingModalProps> = ({
  isOpen,
  onClose,
  language,
  onUpgradeSuccess,
}) => {
  const [selectedBilling, setSelectedBilling] = useState<"monthly" | "yearly">("monthly");
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSelectPlan = (plan: PricingPlan) => {
    setLoadingPlan(plan.id);
    setTimeout(() => {
      setLoadingPlan(null);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
      const creditsAdded = plan.id === "starter" ? 5 : plan.id === "pro" ? 500 : 2000;
      onUpgradeSuccess(creditsAdded, language === "bn" ? plan.nameBn : plan.nameEn);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
      <div
        id="pricing-modal"
        className="relative w-full max-w-4xl rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[92vh]"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="text-center max-w-xl mx-auto">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800 mb-3">
            <Crown className="h-3.5 w-3.5" />
            <span>{language === "bn" ? "SaaS সাবস্ক্রিপশন মডেল" : "Micro-SaaS Pricing Model"}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {language === "bn" ? "আপনার প্রয়োজনমতো প্যাকেজ বেছে নিন" : "Flexible Plans for High Earners"}
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            {language === "bn"
              ? "আপনি যখন ক্লায়েন্ট বা কাস্টমারদের কাছে এমন AI টুল বিক্রি করবেন, তখন এমন সাবস্ক্রিপশন প্যাকেজে চার্জ করতে পারবেন।"
              : "Experience how SaaS owners package and monetize AI tools for clients and recurring revenue."}
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {PRICING_PLANS.map((plan) => {
            const isPopular = plan.popular;
            return (
              <div
                key={plan.id}
                className={`relative flex flex-col justify-between rounded-2xl p-6 transition-all ${
                  isPopular
                    ? "border-2 border-emerald-600 bg-gradient-to-b from-emerald-50/40 via-white to-white shadow-xl shadow-emerald-600/10 scale-102"
                    : "border border-slate-200 bg-white hover:border-slate-300 shadow-sm"
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-emerald-600 px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white shadow-md">
                    {language === "bn" ? "সবচেয়ে জনপ্রিয়" : "Most Popular"}
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {language === "bn" ? plan.nameBn : plan.nameEn}
                  </h3>

                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                      ${plan.priceUSD}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      / {language === "bn" ? "মাস" : "month"}
                    </span>
                  </div>
                  {plan.priceBDT > 0 && (
                    <p className="text-xs text-emerald-700 font-semibold mt-0.5">
                      (৳{plan.priceBDT.toLocaleString()} {language === "bn" ? "টাকা" : "BDT"})
                    </p>
                  )}

                  <div className="my-6 border-t border-slate-100" />

                  {/* Feature Checklist */}
                  <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                    {(language === "bn" ? plan.featuresBn : plan.featuresEn).map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5">
                        <Check className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4">
                  <button
                    onClick={() => handleSelectPlan(plan)}
                    disabled={loadingPlan !== null}
                    className={`w-full rounded-xl py-2.5 text-sm font-bold transition-all shadow-sm flex items-center justify-center gap-2 ${
                      isPopular
                        ? "bg-emerald-600 text-white hover:bg-emerald-700"
                        : "bg-slate-900 text-white hover:bg-slate-800"
                    }`}
                  >
                    {loadingPlan === plan.id ? (
                      <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    ) : (
                      <>
                        <Zap className="h-4 w-4" />
                        <span>
                          {plan.priceUSD === 0
                            ? language === "bn"
                              ? "ফ্রি ব্যবহার করুন"
                              : "Get Started Free"
                            : language === "bn"
                            ? "প্ল্যান অ্যাক্টিভ করুন"
                            : "Activate Plan"}
                        </span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
