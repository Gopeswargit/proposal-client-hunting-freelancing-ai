export type Language = "bn" | "en";

export interface ToolItem {
  id: string;
  category: "freelance" | "marketing" | "video" | "blog" | "business" | "social";
  titleBn: string;
  titleEn: string;
  descBn: string;
  descEn: string;
  iconName: string;
  badgeBn?: string;
  badgeEn?: string;
  earningPotentialBn: string;
  earningPotentialEn: string;
  platforms: string[];
  samplePromptsBn: string[];
  samplePromptsEn: string[];
  fields: {
    name: string;
    labelBn: string;
    labelEn: string;
    placeholderBn: string;
    placeholderEn: string;
    type: "text" | "textarea" | "select";
    options?: { labelBn: string; labelEn: string; value: string }[];
    required?: boolean;
  }[];
}

export interface GenerationHistory {
  id: string;
  toolId: string;
  toolTitle: string;
  prompt: string;
  result: string;
  language: Language;
  createdAt: number;
}

export interface PricingPlan {
  id: string;
  nameBn: string;
  nameEn: string;
  priceUSD: number;
  priceBDT: number;
  period: "month" | "year" | "lifetime";
  popular?: boolean;
  featuresBn: string[];
  featuresEn: string[];
}
