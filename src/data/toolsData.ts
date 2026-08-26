import { ToolItem, PricingPlan } from "../types";

export const TOOLS_DATA: ToolItem[] = [
  {
    id: "freelance-proposal",
    category: "freelance",
    titleBn: "Upwork ও Fiverr প্রপোজাল রাইটার",
    titleEn: "Upwork & Fiverr Winning Proposal Writer",
    descBn: "বায়ার বা ক্লায়েন্টকে পাঠানো মাত্রই কাজ পাওয়ার উপযোগী কাস্টম প্রপোজাল তৈরি করুন।",
    descEn: "Craft high-converting freelance proposals that get instant replies from clients.",
    iconName: "Briefcase",
    badgeBn: "🔥 সর্বোচ্চ আয়ের সুযোগ",
    badgeEn: "🔥 Highest Earning",
    earningPotentialBn: "প্রতি জবে $২০ - $১০০ (৳২,৫০০ - ৳১২,০০০)",
    earningPotentialEn: "$20 - $100 per accepted gig",
    platforms: ["Upwork", "Fiverr", "Freelancer", "Direct Clients"],
    samplePromptsBn: [
      "একটি ইকমার্স ওয়েবসাইটের জন্য লোগো ও ব্র্যান্ডিং ডিজাইনের প্রপোজাল লিখুন। ক্লায়েন্টের বাজেট $১৫০।",
      "একটি ওয়ার্ডপ্রেস ওয়েবসাইট স্পিড অপ্টিমাইজেশন কাজের জন্য আবেদন লিখুন।",
      "সোশ্যাল মিডিয়া ম্যানেজার হিসেবে একটি রিয়েল এস্টেট এজেন্সির জন্য প্রপোজাল।"
    ],
    samplePromptsEn: [
      "Write a proposal for a Shopify store speed optimization job. Budget $200.",
      "Proposal for a full-stack web development client seeking React & Tailwind UI.",
      "Pitch for an Instagram growth manager role for a fitness brand."
    ],
    fields: [
      {
        name: "jobDescription",
        labelBn: "ক্লায়েন্টের জবের বিবরণ (Job Description)",
        labelEn: "Client's Job Description",
        placeholderBn: "এখানে ক্লায়েন্টের জব পোস্ট কপি করে পেস্ট করুন...",
        placeholderEn: "Paste the client's job requirements here...",
        type: "textarea",
        required: true,
      },
      {
        name: "clientBudget",
        labelBn: "ক্লায়েন্টের বাজেট বা রেট",
        labelEn: "Client Budget / Rate",
        placeholderBn: "যেমন: $50 / Fixed Price বা $20/hr",
        placeholderEn: "e.g. $100 fixed or $25/hr",
        type: "text",
      },
      {
        name: "skills",
        labelBn: "আপনার অভিজ্ঞতা / মূল দক্ষতা",
        labelEn: "Your Key Skills & Past Experience",
        placeholderBn: "যেমন: ৩ বছরের ওয়ার্ডপ্রেস অভিজ্ঞতা, ২০+ স্টোর তৈরি করেছি...",
        placeholderEn: "e.g. 3 years in UI/UX design, built 15+ live SaaS apps...",
        type: "text",
      },
    ],
  },
  {
    id: "fcommerce-ad-copy",
    category: "marketing",
    titleBn: "ফেসবুক বিজ্ঞাপন ও সেলস কপিরাইটার",
    titleEn: "Facebook & E-Commerce Ad Copywriter",
    descBn: "যেকোনো প্রোডাক্ট মুহূর্তেই বিক্রি করার মতো আকর্ষণীয় বাংলা বা ইংরেজি বিজ্ঞাপন কপি লিখুন।",
    descEn: "Generate persuasive, viral ad copy and sales hooks for Facebook, Daraz & Shopify.",
    iconName: "ShoppingBag",
    badgeBn: "💰 দ্রুত ইনকাম",
    badgeEn: "💰 High Conversion",
    earningPotentialBn: "প্রতি কপি সার্ভিসে $১৫ - $৫০ (৳২,০০০ - ৳৬,০০০)",
    earningPotentialEn: "$15 - $50 per ad campaign copy",
    platforms: ["Facebook Ads", "Instagram Ads", "Shopify", "Daraz", "TikTok Ads"],
    samplePromptsBn: [
      "প্রিমিয়াম কোয়ালিটির লেদার ওয়ালেট ও বেল্ট কম্বো সেটের জন্য ৩টি আকর্ষণীয় ফেসবুক সেলস কপি লিখুন।",
      "অর্গানিক খাঁটি সরিষার তেল ও মধুর জন্য অফার সহ আবেগঘন সেলস পোস্ট।",
      "মেয়েদের আকর্ষণীয় পার্টি ড্রেস কালেকশনের জন্য স্পেশাল ডিসকাউন্ট অ্যাড।"
    ],
    samplePromptsEn: [
      "High-converting Facebook ad copy for a minimalist ergonomic desk lamp with 20% discount.",
      "Engaging sales copy for an all-natural herbal hair oil targeting hair fall problems.",
      "TikTok ad script for viral waterproof Bluetooth earbuds."
    ],
    fields: [
      {
        name: "productName",
        labelBn: "পণ্যের নাম ও বৈশিষ্ট্য",
        labelEn: "Product Name & Core Features",
        placeholderBn: "যেমন: প্রিমিয়াম জেনুইন লেদার ওয়ালেট, ওয়াটারপ্রুফ, ৫টি কার্ড স্লট...",
        placeholderEn: "e.g. Ultra-light wireless ANC headphones, 40hr battery...",
        type: "textarea",
        required: true,
      },
      {
        name: "targetAudience",
        labelBn: "টার্গেট কাস্টমার (কারা কিনবে)",
        labelEn: "Target Audience",
        placeholderBn: "যেমন: কর্পোরেট চাকুরিজীবী পুরুষ, তরুণ大学生, গৃহিণী...",
        placeholderEn: "e.g. Tech enthusiasts, gym goers, busy mothers...",
        type: "text",
      },
      {
        name: "offer",
        labelBn: "অফার বা ডিসকাউন্ট (যদি থাকে)",
        labelEn: "Offer / Discount / Guarantee",
        placeholderBn: "যেমন: ২০% ছাড় + সারাদেশে ক্যাশ অন ডেলিভারি ফ্রি",
        placeholderEn: "e.g. Buy 1 Get 1 Free, Free nationwide shipping",
        type: "text",
      },
    ],
  },
  {
    id: "youtube-script",
    category: "video",
    titleBn: "ইউটিউব ও রিলস ভাইরাল স্ক্রিপ্ট",
    titleEn: "YouTube & Shorts Viral Script Generator",
    descBn: "ভিউ ও সাবস্ক্রাইবার বাড়ানোর মতো হুক, টাইমস্ট্যাম্প সহ পূর্ণাঙ্গ ভিডিও স্ক্রিপ্ট তৈরি করুন।",
    descEn: "Craft high-retention video scripts with viral hooks, visual cues, and CTAs.",
    iconName: "Video",
    badgeBn: "🎬 চ্যানেল মনিটাইজেশন",
    badgeEn: "🎬 Channel Monetization",
    earningPotentialBn: "প্রতি স্ক্রিপ্ট $৩০ - $১৫০ (৳৩,৫০০ - ৳১৮,০০০)",
    earningPotentialEn: "$30 - $150 per client video script",
    platforms: ["YouTube", "YouTube Shorts", "Facebook Reels", "TikTok"],
    samplePromptsBn: [
      "২০২৬ সালে AI দিয়ে অনলাইন থেকে আয় করার শীর্ষ ৫টি উপায় নিয়ে একটি ৮ মিনিটের ভিডিও স্ক্রিপ্ট।",
      "কিভাবে মাত্র ৩০ দিনে ফ্রিল্যান্সিং শুরু করবেন - সম্পূর্ণ গাইডলাইন ভিডিও。",
      "Shorts/Reels এর জন্য ৬০ সেকেন্ডের আকর্ষণীয় টেক গ্যাজেট রিভিউ স্ক্রিপ্ট।"
    ],
    samplePromptsEn: [
      "8-minute engaging YouTube script on 'Top 5 AI tools that will make you $100/day in 2026'.",
      "60-second viral Short script revealing a productivity secret used by Elon Musk.",
      "Complete documentary-style script about the rise and fall of Nokia."
    ],
    fields: [
      {
        name: "videoTopic",
        labelBn: "ভিডিওর মূল বিষয় বা টাইটেল আইডিয়া",
        labelEn: "Video Topic / Working Title",
        placeholderBn: "যেমন: নতুনদের জন্য ফ্রিল্যান্সিং শুরু করার সহজ গাইডলাইন...",
        placeholderEn: "e.g. 5 simple side hustles anyone can start with zero budget...",
        type: "textarea",
        required: true,
      },
      {
        name: "videoFormat",
        labelBn: "ভিডিওর ধরন ও দৈর্ঘ্য",
        labelEn: "Video Format & Length",
        type: "select",
        placeholderBn: "সিলেক্ট করুন",
        placeholderEn: "Select format",
        options: [
          { labelBn: "ইউটিউব লং ভিডিও (৫-১০ মিনিট)", labelEn: "YouTube Long Video (5-10 mins)", value: "long-video" },
          { labelBn: "ইউটিউব শর্টস / রিলস (৬০ সেকেন্ড)", labelEn: "Shorts / Reels / TikTok (60s)", value: "shorts" },
          { labelBn: "টিউটোরিয়াল / হাউ-টু গাইড", labelEn: "Tutorial / How-to Guide", value: "tutorial" },
          { labelBn: "কেস স্টাডি / স্টোরিটেলিং", labelEn: "Storytelling / Case Study", value: "storytelling" },
        ],
      },
      {
        name: "callToAction",
        labelBn: "দর্শকদের জন্য কল-টু-অ্যাকশন (CTA)",
        labelEn: "Call To Action (CTA)",
        placeholderBn: "যেমন: কমেন্টে আপনার মতামত জানান ও চ্যানেল সাবস্ক্রাইব করুন...",
        placeholderEn: "e.g. Subscribe, download free PDF checklist in description...",
        type: "text",
      },
    ],
  },
  {
    id: "seo-blog-article",
    category: "blog",
    titleBn: "এসইও আর্টিকেল ও ব্লগ পোস্ট রাইটার",
    titleEn: "SEO Blog & Monetized Article Generator",
    descBn: "গুগলে র‍্যাংক করার মতো কি-ওয়ার্ড সমৃদ্ধ পূর্ণাঙ্গ আর্টিকেল লিখে AdSense ও ক্লায়েন্ট থেকে আয় করুন।",
    descEn: "Generate SEO-optimized, human-like articles ready to rank on Google and earn AdSense revenue.",
    iconName: "FileText",
    badgeBn: "📈 গুগল AdSense ইনকাম",
    badgeEn: "📈 AdSense & Guest Posts",
    earningPotentialBn: "প্রতি আর্টিকেলে $২৫ - $১২০ (৳৩,০০০ - ৳১৫,০০০)",
    earningPotentialEn: "$25 - $120 per article",
    platforms: ["WordPress", "Medium", "Google AdSense", "Affiliate Blogs"],
    samplePromptsBn: [
      "ঘরে বসে ফ্রিল্যান্সিং করার জন্য সেরা ৫টি ওয়েবসাইট - বিস্তারিত এসইও গাইড。",
      "স্বাস্থ্যকর ডায়েট ও ওজন কমানোর সহজ উপায় নিয়ে ১,৫০০ শব্দের তথ্যবহুল ব্লগ আর্টিকেল।",
      "ডিজিটাল মার্কেটিং কি এবং কেন ব্যবসার জন্য জরুরি - সম্পূর্ণ আলোচনা।"
    ],
    samplePromptsEn: [
      "Comprehensive 1500-word SEO guide on 'Best Passive Income Ideas for Students in 2026'.",
      "Product comparison article: 'Top 7 Web Hosting Providers for Beginners' with affiliate hooks.",
      "How to learn Python programming from scratch: step-by-step roadmap."
    ],
    fields: [
      {
        name: "articleTopic",
        labelBn: "ব্লগের বিষয় ও মূল কি-ওয়ার্ড",
        labelEn: "Article Topic & Primary Keywords",
        placeholderBn: "যেমন: অনলাইন ইনকাম গাইড ২০২৬, ফ্রিল্যান্সিং টিপস...",
        placeholderEn: "e.g. Best affiliate marketing niches 2026, low competition...",
        type: "textarea",
        required: true,
      },
      {
        name: "targetWordCount",
        labelBn: "আর্টিকেল সাইজ / ওয়ার্ড কাউন্ট",
        labelEn: "Target Length",
        type: "select",
        placeholderBn: "সিলেক্ট করুন",
        placeholderEn: "Select length",
        options: [
          { labelBn: "স্ট্যান্ডার্ড পোস্ট (৮০০ - ১০০০ শব্দ)", labelEn: "Standard Post (800 - 1000 words)", value: "standard" },
          { labelBn: "ডিটেলড গাইড (১২০০ - ২০০০ শব্দ)", labelEn: "In-Depth Pillar Post (1200 - 2000 words)", value: "deep" },
          { labelBn: "প্রোডাক্ট রিভিউ / অ্যাফিলিয়েট", labelEn: "Product Review / Affiliate Article", value: "review" },
        ],
      },
    ],
  },
  {
    id: "cold-email-pitch",
    category: "freelance",
    titleBn: "ক্লায়েন্ট পাওয়ার কোল্ড ইমেইল ও ডিএম",
    titleEn: "High-Response Cold Email & Direct Outreach",
    descBn: "সরাসরি বিদেশি বা স্থানীয় ক্লায়েন্টদের মেসেজ পাঠিয়ে উচ্চমূল্যের প্রোজেক্ট পাওয়ার টেমপ্লেট।",
    descEn: "Write personalized cold emails and LinkedIn DMs that land $500+ client projects.",
    iconName: "Mail",
    badgeBn: "🎯 সরাসরি ক্লায়েন্ট",
    badgeEn: "🎯 Direct Client Acquisition",
    earningPotentialBn: "প্রতি ক্লায়েন্টে $৩০০ - $২,০০০+ (৳৩৫,০০০ - ৳২,৫০,০০০+)",
    earningPotentialEn: "$300 - $2,000+ per signed client",
    platforms: ["Email", "LinkedIn", "Instagram DM", "Twitter / X"],
    samplePromptsBn: [
      "একটি রেস্টুরেন্ট বা ক্যাফে মালিককে ওয়েবসাইট রিনোভেশন ও অনলাইন অর্ডারিং সুবিধার প্রস্তাব দিয়ে ইমেইল।",
      "ইকমার্স ব্র্যান্ড ওনারদের জন্য ফেসবুক অ্যাড অপ্টিমাইজেশন সার্ভিস অফার করে কোল্ড পিচ।",
      "রিয়েল এস্টেট ব্রোকারদের জন্য লিড জেনারেশন সার্ভিসের প্রস্তাবনা।"
    ],
    samplePromptsEn: [
      "Cold email to Shopify brand owners offering to increase their checkout conversion by 15%.",
      "LinkedIn outreach message to marketing directors offering custom video editing packages.",
      "Direct email pitching web design overhaul for a local dentist clinic."
    ],
    fields: [
      {
        name: "clientNiche",
        labelBn: "ক্লায়েন্টের ব্যবসা বা ক্যাটাগরি",
        labelEn: "Target Client Industry / Niche",
        placeholderBn: "যেমন: ইউএসএ-ভিত্তিক ইকমার্স ক্লোথিং ব্র্যান্ড, স্থানীয় ডেন্টাল ক্লিনিক...",
        placeholderEn: "e.g. Fitness coaches, Shopify fashion stores, SaaS startups...",
        type: "text",
        required: true,
      },
      {
        name: "yourService",
        labelBn: "আপনি কি সেবা বা সমাধান দিতে চান",
        labelEn: "Your Service & Solution",
        placeholderBn: "যেমন: ওয়েবসাইট স্পিড ফিক্স, ফেসবুক অ্যাড অডিট, কন্টেন্ট ক্রিয়েশন...",
        placeholderEn: "e.g. SEO audit, high-converting video edits, automated lead generation...",
        type: "textarea",
        required: true,
      },
    ],
  },
  {
    id: "ai-business-idea",
    category: "business",
    titleBn: "লাভজনক AI বিজনেস ও সাইড-হাসল আইডিয়া",
    titleEn: "Profitable AI Side Hustle & Business Hub",
    descBn: "কম পুঁজিতে AI ব্যবহার করে প্রতি মাসে নিয়মিত আয় করার রিয়েলিস্টিক বিজনেস ব্লুপ্রিন্ট পান।",
    descEn: "Get step-by-step actionable micro-SaaS and AI monetization blueprints.",
    iconName: "Sparkles",
    badgeBn: "💡 বিজনেস ব্লুপ্রিন্ট",
    badgeEn: "💡 Business Roadmap",
    earningPotentialBn: "মাসে $৫০০ - $৩,০০০+ (৳৬০,০০০ - ৳৩,৫০,০০০+)",
    earningPotentialEn: "$500 - $3,000+ monthly recurring income",
    platforms: ["Micro-SaaS", "Digital Products", "Agency", "E-book"],
    samplePromptsBn: [
      "ছাত্রদের জন্য মাত্র ২-৩ ঘণ্টা সময় দিয়ে প্রতি মাসে $৩০০ আয়ের ৩টি AI সাইড বিজনেস আইডিয়া।",
      "বাংলা কন্টেন্ট ক্রিয়েটর ও পেইজ ওনারদের জন্য সাবস্ক্রিপশন ভিত্তিক সার্ভিস ব্যবসার প্ল্যান।",
      "ডিজিটাল প্রোডাক্ট (eBook/Templates) বানিয়ে Etsy ও Gumroad-এ বিক্রির আইডিয়া।"
    ],
    samplePromptsEn: [
      "3 high-margin micro-SaaS tool ideas requiring no code or simple AI API integration.",
      "How to start a niche digital marketing agency for local fitness gyms using AI tools.",
      "Guide to creating and selling digital planner templates on Gumroad & Etsy."
    ],
    fields: [
      {
        name: "budgetAndTime",
        labelBn: "আপনার দৈনিক সময় ও বাজেট",
        labelEn: "Available Time & Budget",
        placeholderBn: "যেমন: দৈনিক ৩ ঘণ্টা, বাজেট প্রায় শূন্য বা খুব সামান্য...",
        placeholderEn: "e.g. 2 hours/day, zero startup capital...",
        type: "text",
        required: true,
      },
      {
        name: "interestArea",
        labelBn: "আপনার পছন্দের কাজের ক্ষেত্র",
        labelEn: "Interest / Strength",
        placeholderBn: "যেমন: কন্টেন্ট রাইটিং, ভিডিও এডিটিং, সোশ্যাল মিডিয়া, কোডিং...",
        placeholderEn: "e.g. Writing, graphic design, tutoring, sales...",
        type: "text",
      },
    ],
  },
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "starter",
    nameBn: "ফ্রি / স্টার্টার প্যাক",
    nameEn: "Starter Pack",
    priceUSD: 0,
    priceBDT: 0,
    period: "month",
    featuresBn: [
      "দৈনিক ৫টি ফ্রি জেনারেশন",
      "Upwork ও Fiverr বেসিক প্রপোজাল",
      "ফেসবুক অ্যাড কপি জেনারেটর",
      "বাংলা ও ইংরেজি ভাষা সাপোর্ট",
      "কমিউনিটি সাপোর্ট"
    ],
    featuresEn: [
      "5 Free generations per day",
      "Basic Upwork & Fiverr proposals",
      "Facebook Ad Copy creator",
      "Dual language support (BN & EN)",
      "Community support"
    ]
  },
  {
    id: "pro",
    nameBn: "প্রো আর্নার প্যাকেজ",
    nameEn: "Pro Earner Plan",
    priceUSD: 15,
    priceBDT: 1800,
    period: "month",
    popular: true,
    featuresBn: [
      "আনলিমিটেড জেনারেশন ও এক্সপোর্ট",
      "সবগুলো প্রিমিয়াম আর্নিং টুল আনলক",
      "জব ডেসক্রিপশন ইনস্ট্যান্ট অ্যানালাইজার",
      "Gemini 3.7 Flash সুপার ফাস্ট ইঞ্জিন",
      "হাই-কনভার্টিং কোল্ড ইমেইল স্ট্র্যাটেজি",
      "ওয়ার্ড / টেক্সট এক্সপোর্ট সুবিধা",
      "ভিআইপি প্রায়োরিটি সাপোর্ট"
    ],
    featuresEn: [
      "Unlimited AI generations & exports",
      "All 8+ premium monetization tools unlocked",
      "Instant Job Pitch & Bid Analyzer",
      "Powered by Gemini 3.7 Flash",
      "High-response cold outreach templates",
      "One-click Word/Text export",
      "VIP Priority Support"
    ]
  },
  {
    id: "agency",
    nameBn: "এজেন্সি ও টিম প্যাকেজ",
    nameEn: "Agency & Team Suite",
    priceUSD: 49,
    priceBDT: 5900,
    period: "month",
    featuresBn: [
      "সবকিছু প্রো প্ল্যান থেকে",
      "৫ জন টিম মেম্বার অ্যাকাউন্ট",
      "হোয়াইট লেবেল ক্লায়েন্ট ডেলিভারি রিপোর্ট",
      "কাস্টম ব্র্যান্ড টেমপ্লেট মেকার",
      "মাসিক এক্সক্লুসিভ আর্নিং ওয়েবিনর",
      "২৪/৭ ডেডিকেটেড ম্যানেজার"
    ],
    featuresEn: [
      "Everything in Pro Plan",
      "5 Team member accounts",
      "White-label client delivery exports",
      "Custom branding prompt templates",
      "Monthly exclusive monetization masterclass",
      "24/7 Dedicated account manager"
    ]
  }
];

export const EARNING_METHODS_GUIDE = [
  {
    titleBn: "১. Upwork ও Fiverr-এ ফ্রিল্যান্সিং গিগ সেল করা",
    titleEn: "1. Selling Freelance Gigs on Upwork & Fiverr",
    descBn: "আপনি Fiverr-এ 'Ad Copy Writing', 'Article Writing', বা 'YouTube Script Writing' নিয়ে গিগ তৈরি করুন। বায়ার যখন কাজ দেবে, আপনি এই টুল দিয়ে ৫ মিনিটে সেরা কোয়ালিটির কাজ করে ক্লায়েন্টকে জমা দিয়ে $২০-$১০০ আয় করতে পারেন।",
    descEn: "Create gigs on Fiverr or apply on Upwork for copywriting, blog writing, and video scripts. Deliver polished outputs within minutes to earn $20-$100 per order.",
    badge: "Fiverr / Upwork",
    stepsBn: [
      "Fiverr-এ ফ্রি অ্যাকাউন্ট খুলুন এবং ৩-৪টি গিগ তৈরি করুন।",
      "Upwork-এ প্রতিদিন আমাদের 'প্রপোজাল রাইটার' দিয়ে জবে বিড করুন।",
      "ক্লায়েন্ট অর্ডার দিলে এই টুল দিয়ে কাস্টমাইজড কনটেন্ট বানিয়ে ডেলিভার করুন।",
      "বিকাশ/রকেট/ব্যাংকের মাধ্যমে Payoneer দিয়ে টাকা তুলুন।"
    ],
    stepsEn: [
      "Create a free Fiverr seller profile with 3-4 specialized gigs.",
      "Submit high-converting proposals on Upwork using the proposal tool.",
      "Generate and refine the final deliverable using this AI studio.",
      "Withdraw earnings to local bank or mobile wallet via Payoneer."
    ]
  },
  {
    titleBn: "২. ফেসবুক পেজ ও লোকাল ব্যবসার বিজ্ঞাপন কপি সার্ভিস",
    titleEn: "2. Ad Copy & Content for Local E-Commerce Businesses",
    descBn: "বাংলাদেশে প্রতিদিন হাজার হাজার ফেসবুক শপ ও ব্যবসা তাদের প্রোডাক্ট বিক্রির জন্য বিজ্ঞাপনের লেখা (Ad Copy) খোঁজে। আপনি পেজগুলোকে মেসেজ দিয়ে তাদের সেলস কপি লিখে দিয়ে প্রতি মাসে ১০-২০ হাজার টাকা লোকাল আয় করতে পারেন।",
    descEn: "Reach out to local online brands and e-commerce stores offering to write their Facebook Ad copy and product descriptions to boost their sales.",
    badge: "F-Commerce / Local",
    stepsBn: [
      "ফেসবুকে বিভিন্ন ইকমার্স শপ বা পেজ খুঁজে বের করুন।",
      "আমাদের 'কোল্ড ইমেইল/ডিএম' টুল দিয়ে তাদের পেজে ইনবক্স করে একটি ফ্রি স্যাম্পল অ্যাড কপি দিন।",
      "তারা রেজাল্ট দেখে খুশি হলে মাসিক ৫,০০০ - ১৫,০০০ টাকার কন্টেন্ট প্যাকেজ অফার করুন।",
      "সরাসরি বিকাশ বা নগদ-এ পেমেন্ট গ্রহণ করুন।"
    ],
    stepsEn: [
      "Identify active Facebook/Instagram shops with weak ad copy.",
      "Send a personalized message with a free sample ad using our Ad copy tool.",
      "Offer them a weekly or monthly package once they see engagement boost.",
      "Receive payments directly via local bank transfer or Stripe."
    ]
  },
  {
    titleBn: "৩. ইউটিউব চ্যানেল বানিয়ে মনিটাইজেশন ও স্পনসরশিপ",
    titleEn: "3. Faceless YouTube Channels & Sponsorships",
    descBn: "নিজের চেহারা না দেখিয়েও (Faceless Channel) স্ক্রিপ্ট এবং ভয়েস দিয়ে তথ্যবহুল বা টেক ভিডিও বানিয়ে ইউটিউব থেকে বিজ্ঞাপন এবং স্পনসরশিপ থেকে প্যাসিভ ইনকাম করা যায়।",
    descEn: "Launch faceless YouTube channels or TikTok pages using generated scripts. Monetize with AdSense, affiliate links, and brand deals.",
    badge: "YouTube / TikTok",
    stepsBn: [
      "আমাদের 'ইউটিউব স্ক্রিপ্ট' টুল দিয়ে ট্রেন্ডিং বিষয়ে আকর্ষণীয় স্ক্রিপ্ট তৈরি করুন।",
      "AI ভয়েস বা নিজের ভয়েস দিয়ে রেকর্ড করে ক্লিপ যুক্ত করুন (Canva/CapCut)।",
      "নিয়মিত আপলোড করে ১,০০০ সাবস্ক্রাইবার ও ৪,০০০ ঘণ্টা ওয়াচটাইম পূরণ করে মনিটাইজেশন চালু করুন।"
    ],
    stepsEn: [
      "Generate viral video scripts on trending high-RPM topics.",
      "Combine voiceovers with royalty-free stock footage using CapCut or Canva.",
      "Upload consistently to hit YouTube Partner Program monetization criteria."
    ]
  },
  {
    titleBn: "৪. এসইও ব্লগ ওয়েবসাইট বানিয়ে গুগল AdSense দিয়ে আয়",
    titleEn: "4. Building an SEO Blog for Google AdSense & Affiliates",
    descBn: "একটি নির্দিষ্ট ক্যাটাগরিতে (যেমন: প্রযুক্তি, ফিটনেস, আয়-রোজগার) ওয়েবসাইট বানিয়ে নিয়মিত তথ্যবহুল আর্টিকেল পোস্ট করলে গুগল সার্চ থেকে ভিজিটর আসবে এবং প্রতি ক্লিকে ডলার আয় হবে।",
    descEn: "Publish high-quality SEO articles on a WordPress site to attract organic Google search traffic and earn through AdSense and affiliate commissions.",
    badge: "AdSense & SEO",
    stepsBn: [
      "একটি ডোমেইন ও হোস্টিং নিয়ে ওয়ার্ডপ্রেস ওয়েবসাইট খুলুন।",
      "আমাদের 'এসইও আর্টিকেল' টুল দিয়ে প্রতিদিন ১-২টি ইউনিক পোস্ট পাবলিশ করুন।",
      "৩০-৪০টি ভালো পোস্ট হলে Google AdSense-এর জন্য আবেদন করুন।"
    ],
    stepsEn: [
      "Setup a niche WordPress or Hugo blog on a target topic.",
      "Publish structured, keyword-optimized articles using the SEO generator.",
      "Apply for Google AdSense and insert affiliate product links."
    ]
  }
];
