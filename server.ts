import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Lazy initialize GenAI client
  let aiClient: GoogleGenAI | null = null;
  function getAI(): GoogleGenAI {
    if (!aiClient) {
      const apiKey = process.env.GEMINI_API_KEY;
      aiClient = new GoogleGenAI({
        apiKey: apiKey || "",
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
    return aiClient;
  }

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Main AI Generation Endpoint
  app.post("/api/generate", async (req, res) => {
    try {
      const {
        toolId,
        toolTitle,
        prompt,
        tone = "professional",
        language = "bn",
        targetPlatform = "general",
        additionalDetails = "",
      } = req.body;

      if (!prompt || typeof prompt !== "string") {
        return res.status(400).json({ error: "Prompt is required" });
      }

      const ai = getAI();

      const systemInstruction = `You are an elite, world-class AI Income & Content Monetization Specialist named 'AI Income Studio' (এআই আয় স্টুডিও).
Your job is to generate world-class, extremely high-converting, monetizable copy, scripts, articles, or proposals that allow the user to make real money through freelancing (Upwork, Fiverr), digital marketing, social media monetization, YouTube/TikTok, or selling products.

Language requirement:
${language === "bn" ? "Provide the primary output in natural, fluent, professional, and engaging Bengali (বাংলা) or Bengali mixed with common English business terms where appropriate, followed by monetization strategies." : "Provide the primary output in crisp, fluent, high-converting English."}

Structure your response with clear markdown headings and sections:
1. 🎯 **Main Deliverable / মূল কনটেন্ট** (Complete, ready-to-use, polished, no placeholders).
2. 💡 **Earning Strategy / কিভাবে এটা দিয়ে আয় করবেন** (Step-by-step monetization guide: which platform to sell it on like Upwork/Fiverr/Facebook, recommended pricing like $20-$150 or ৳২,০০০-৳১৫,০০০, and client outreach tips).
3. 🚀 **Pro Tips for 2X Conversion / সফল হওয়ার সিক্রেট টিপস** (Key adjustments to stand out).`;

      const userMessage = `Tool Category: ${toolTitle || toolId}
Target Platform: ${targetPlatform}
Tone: ${tone}
User Requirement/Topic:
"""
${prompt}
"""
${additionalDetails ? `Additional Constraints/Details:\n${additionalDetails}` : ""}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: userMessage,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const text = response.text || "No response generated. Please try again.";

      res.json({
        success: true,
        result: text,
        timestamp: new Date().toISOString(),
      });
    } catch (error: any) {
      console.error("AI Generation error:", error);
      res.status(500).json({
        error: error.message || "Failed to generate content",
      });
    }
  });

  // Client Job Analyzer & Bid Winning Proposal Generator
  app.post("/api/analyze-gig", async (req, res) => {
    try {
      const { jobDescription, clientBudget, freelancerSkills, language = "bn" } = req.body;
      if (!jobDescription) {
        return res.status(400).json({ error: "Job description is required" });
      }

      const ai = getAI();
      const systemInstruction = `You are a top 1% Upwork/Fiverr Top Rated Plus Freelancer and proposal closing coach.
Analyze the provided client job posting and craft a pitch that gets replies within 15 minutes.
Language: ${language === "bn" ? "Bangla with English proposal copy" : "English"}.

Provide:
1. 🔍 **Client Needs Breakdown** (What the client actually cares about)
2. ✍️ **Winning Proposal Copy** (Ready to copy-paste, opening with hook, no generic 'Dear Hiring Manager')
3. 💰 **Recommended Bid & Timeline**
4. 🎁 **Free Value Hook** (A quick tip to share with the client to prove expertise)`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: `Job Description: ${jobDescription}\nClient Budget: ${clientBudget || "Not specified"}\nMy Skills: ${freelancerSkills || "General Expert"}`,
        config: { systemInstruction, temperature: 0.6 },
      });

      res.json({
        success: true,
        result: response.text || "",
      });
    } catch (error: any) {
      console.error("Analyze gig error:", error);
      res.status(500).json({ error: error.message || "Failed to analyze gig" });
    }
  });

  // Vite middleware for development vs static build in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
