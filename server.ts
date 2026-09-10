import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini client
let genAIClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  if (!process.env.GEMINI_API_KEY) {
    return null;
  }
  if (!genAIClient) {
    genAIClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return genAIClient;
}

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Generate Sonic Micro-Ad Concept
app.post("/api/generate-sonic-concept", async (req, res) => {
  try {
    const { brandName, industry, location, targetQuery, tone } = req.body;

    const brand = brandName?.trim() || "Your Brand";
    const ind = industry?.trim() || "Local Services";
    const loc = location?.trim() || "Hamburg";
    const query = targetQuery?.trim() || "emergency service near me";
    const mood = tone?.trim() || "energetic, trustworthy, catchy";

    const ai = getGenAI();

    if (ai) {
      const prompt = `You are an elite sonic branding director & advertising composer at Naga Codex.
Create a high-impact 5-8 second Sonic Micro-Ad concept for a high-intent search scenario.
Brand: "${brand}"
Industry: "${ind}"
Location: "${loc}"
High-Intent Search Query: "${query}"
Tone/Style: "${mood}"

Deliver a JSON response with:
1. "jingleHooks": array of 3 distinct, catchy 5-8s jingle lines that rhyme or have rhythmic cadence and strongly embed the brand name "${brand}".
2. "sonicLogoNotes": array of 3-4 musical note names (e.g. ["C5", "E5", "G5", "C6"] or ["D4", "F#4", "A4"]) and "instrument" suggestion (e.g. "Warm Rhodes + Bright Chime").
3. "storyboard": 4 phases for a 6-second micro-animation:
   - "problem": 0-2s description of the high-intent urgency or frustration
   - "solution": 2-4s visual relief and solution presented by ${brand}
   - "sonicLogo": 4-5s iconic sonic logo audio-visual reveal
   - "cta": 5-6s clear high-intent call to action
4. "abTestVariants":
   - "variantA": description of hook & CTA variant A (e.g. Urgency-focused, 128 BPM)
   - "variantB": description of hook & CTA variant B (e.g. Trust/Quality-focused, 100 BPM)
5. "highIntentKeywords": array of 4 realistic search keywords people type when ready to buy in this niche.
6. "rationale": 1-2 punchy sentences on why this sonic identity will stick in customer memory.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              jingleHooks: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "3 catchy rhyming jingle hooks embedding brand name",
              },
              sonicLogoNotes: {
                type: Type.OBJECT,
                properties: {
                  notes: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                  tempoBpm: { type: Type.NUMBER },
                  instrument: { type: Type.STRING },
                },
                required: ["notes", "tempoBpm", "instrument"],
              },
              storyboard: {
                type: Type.OBJECT,
                properties: {
                  problem: { type: Type.STRING },
                  solution: { type: Type.STRING },
                  sonicLogo: { type: Type.STRING },
                  cta: { type: Type.STRING },
                },
                required: ["problem", "solution", "sonicLogo", "cta"],
              },
              abTestVariants: {
                type: Type.OBJECT,
                properties: {
                  variantA: { type: Type.STRING },
                  variantB: { type: Type.STRING },
                },
                required: ["variantA", "variantB"],
              },
              highIntentKeywords: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              rationale: { type: Type.STRING },
            },
            required: [
              "jingleHooks",
              "sonicLogoNotes",
              "storyboard",
              "abTestVariants",
              "highIntentKeywords",
              "rationale",
            ],
          },
        },
      });

      if (response.text) {
        const parsed = JSON.parse(response.text);
        return res.json({ success: true, source: "gemini", data: parsed });
      }
    }

    // High quality tailored fallback if Gemini API is not configured or in transition
    const fallbackData = {
      jingleHooks: [
        `When minutes count, trust ${brand} all the way!`,
        `Direct solution, zero stress — ${brand} is your best!`,
        `Search is over, problem solved with ${brand}!`,
      ],
      sonicLogoNotes: {
        notes: ["C5", "E5", "G5", "C6"],
        tempoBpm: 124,
        instrument: "Punchy synth bell with warm sub bass",
      },
      storyboard: {
        problem: `Searcher urgently types "${query}" with immediate pressure.`,
        solution: `${brand} steps in with instant guaranteed solution in ${loc}.`,
        sonicLogo: `Crisp 3-note sonic logo pulses on screen with radiant brand badge.`,
        cta: `Direct call-out: "Tap to Call Now — Ready in Minutes."`,
      },
      abTestVariants: {
        variantA: `Speed & Emergency hook at 128 BPM: "Immediate response within 15 min"`,
        variantB: `Guaranteed Quality hook at 104 BPM: "Top certified experts in ${loc}"`,
      },
      highIntentKeywords: [
        `${query}`,
        `best ${ind} ${loc}`,
        `emergency ${ind} near me`,
        `${brand} contact`,
      ],
      rationale: `Audio memory encodes 40% faster than visual text. When high-intent buyers face decision fatigue, a rhythmic 3-tone sonic badge makes ${brand} the instant subconscious recall.`,
    };

    return res.json({ success: true, source: "fallback", data: fallbackData });
  } catch (error: any) {
    console.error("Error generating sonic concept:", error);
    return res.status(500).json({
      success: false,
      error: error.message || "Failed to generate sonic concept",
    });
  }
});

// Book a 20-minute call endpoint
app.post("/api/book-call", (req, res) => {
  const { name, email, phone, company, packageTier, preferredDate, preferredTime, notes } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required." });
  }

  // Record booking
  const booking = {
    id: "CALL-" + Math.random().toString(36).substring(2, 9).toUpperCase(),
    name,
    email,
    phone: phone || "Not provided",
    company: company || "Direct Client",
    packageTier: packageTier || "Pro (€3,500)",
    preferredDate: preferredDate || "Earliest available",
    preferredTime: preferredTime || "14:00 CET",
    notes: notes || "",
    confirmedAt: new Date().toISOString(),
    contactHost: "Naga Codex (sonic13.CH@gmail.com)",
  };

  console.log("New 20-minute call booked:", booking);

  res.json({
    success: true,
    bookingId: booking.id,
    message: `Call booked for ${booking.preferredDate} at ${booking.preferredTime}. Naga Codex will send you the calendar invite and custom industry demo preview to ${booking.email}.`,
    details: booking,
  });
});

// Request Free Ad Concept endpoint
app.post("/api/free-concept", async (req, res) => {
  const { name, businessName, websiteOrInstagram, customerActionGoal, whatDoYouSell, email, brandOrName } = req.body;

  const contactName = name?.trim() || "";
  const brand = (businessName || brandOrName)?.trim() || "Your Business";
  const userEmail = email?.trim();
  const webOrSocial = websiteOrInstagram?.trim() || "";
  const goal = customerActionGoal?.trim() || "Get in touch";
  const offering = whatDoYouSell?.trim() || "Services";

  if (!brand || !userEmail) {
    return res.status(400).json({ error: "Business name and email are required." });
  }

  const conceptId = "FCP-" + Math.random().toString(36).substring(2, 9).toUpperCase();

  let conceptDetails = {
    conceptId,
    name: contactName,
    brand,
    service: offering,
    webOrSocial,
    goal,
    hookIdea: `When you need ${offering}, choose ${brand}!`,
    sonicLogoChime: ["D5", "G5", "B5"],
    adLength: "6 seconds (YouTube Bumper / Meta Reel)",
    callToAction: `${goal} with ${brand}`,
    turnaroundDays: "3–5 working days",
  };

  const ai = getGenAI();
  if (ai) {
    try {
      const prompt = `You are an elite sonic branding director at Naga Codex. Create a tailored 6-second musical micro-ad concept for:
Contact Person: "${contactName}"
Business Name: "${brand}"
What They Sell: "${offering}"
Customer Goal Action: "${goal}" (e.g. Call, Book, Get a quote, Visit website, Buy)
Website/Social: "${webOrSocial}"

Respond in valid JSON:
{
  "hookIdea": "A short, rhyming 5-8 second jingle hook embedding the business name '${brand}'",
  "sonicLogoChime": ["C5", "E5", "G5"],
  "adLength": "6 seconds",
  "callToAction": "A crisp, action-oriented CTA encouraging customers to ${goal}",
  "sonicAngle": "A 1-sentence description of the sonic identity"
}`;
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: { responseMimeType: "application/json" },
      });
      if (response.text) {
        const parsed = JSON.parse(response.text);
        conceptDetails = { ...conceptDetails, ...parsed };
      }
    } catch (err) {
      console.warn("Gemini concept generation failed, using fallback:", err);
    }
  }

  console.log("New free concept request:", { email: userEmail, conceptDetails });

  res.json({
    success: true,
    conceptId,
    message: "Thanks—your concept request is in. We’ll review your business and send a short idea for your 5–10 second Sonic Micro‑Ad.",
    concept: conceptDetails,
  });
});


async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Sonic Micro-Ads server running on http://localhost:${PORT}`);
  });
}

startServer();
