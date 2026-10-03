/**
 * KHEOO Multi-Provider AI Fallback Engine (Client/Edge Compatible)
 * Order: Groq -> Mistral -> Gemini -> Meta LLaMA -> Built-in Local Knowledge Engine
 * Automatic zero-downtime failover with ultra-low latency (<500ms on Groq)
 */

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface AiResponse {
  content: string;
  provider: 'Groq' | 'Mistral' | 'Gemini' | 'Meta' | 'Local-Knowledge-Base';
  model: string;
  latencyMs: number;
  fallbackChain: string[];
}

const DEFAULT_GROQ_KEY = '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';
const DEFAULT_MISTRAL_KEY = 'mstrl_e4PjL6bMVk0aqwkrE0FYEeyMCG66ykvZ_2L5ZDI';
const DEFAULT_GEMINI_KEY = 'AQ.Ab8RN6Lqw-Y8PNr2KldS5VADRk6_ZT8gfCUaV3j821qG6upjSQ';
const DEFAULT_META_KEY = 'LLM_958275133996807_O9JYT9EX16cTD1Xw1rPXBwCxKIk';

const SYSTEM_PROMPT = `
You are the official KHEOO Fashion & Shopping AI Stylist and Customer Support Specialist for "KHEOO" (Dhaka, Bangladesh).
Brand Identity: KHEOO is an ultra-premium streetwear brand specializing in 240+ GSM heavyweight 100% combed cotton drop shoulder oversized T-shirts inspired by Anime (Naruto, Gojo JJK, Attack on Titan, One Piece Gear 5, Demon Slayer, DBZ), Marvel (Spider-Man Symbiote), and DC (Batman Dark Knight Gotham).

Key Store Information:
- Fabric & Quality: 240 GSM Luxury Heavyweight 100% Combed Ringspun Cotton. High-density screen and puff print. Pre-shrunk and bio-washed.
- Sizing: Drop Shoulder Oversized Fit (S, M, L, XL, XXL). For oversized streetwear drape, pick regular size. For fitted look, size down one size.
- Delivery in Bangladesh: Inside Dhaka: ৳60 (24-48 Hours delivery). Outside Dhaka: ৳120 (2-4 Business Days via Steadfast / RedX).
- Cash on Delivery (COD) and Online Payment (bKash, Nagad, Cards) available.
- Return & Exchange Policy: 7 days hassle-free exchange if wrong size or defective item. Tags must remain intact.
- Active Discounts: "KHEOO10" for 10% OFF on all orders, "KHEOO20" for 20% OFF on orders over ৳2000.
- Tone: Friendly, streetwear-savvy, stylish, concise, and helpful. Use emojis tastefully. Always give accurate fashion & sizing tips.
`.trim();

async function fetchWithTimeout(url: string, options: RequestInit, timeoutMs = 7000): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    return res;
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * 1. GROQ Provider (Priority 1 - Ultra High Speed LPU)
 */
async function callGroq(messages: ChatMessage[], apiKey: string): Promise<{ content: string; model: string }> {
  const key = apiKey || DEFAULT_GROQ_KEY;
  if (!key || key.trim() === '') throw new Error('Groq API Key missing');

  const model = 'llama-3.3-70b-versatile';
  const response = await fetchWithTimeout('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${key.trim()}`,
    },
    body: JSON.stringify({
      model,
      messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
      temperature: 0.7,
      max_tokens: 1024,
    }),
  }, 6500);

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Groq error ${response.status}: ${err}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error('Groq returned empty response');
  return { content, model };
}

/**
 * 2. MISTRAL Provider (Priority 2)
 */
async function callMistral(messages: ChatMessage[], apiKey: string): Promise<{ content: string; model: string }> {
  const key = apiKey || DEFAULT_MISTRAL_KEY;
  if (!key || key.trim() === '') throw new Error('Mistral API Key missing');

  const model = 'mistral-small-latest';
  const response = await fetchWithTimeout('https://api.mistral.ai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${key.trim()}`,
    },
    body: JSON.stringify({
      model,
      messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
      temperature: 0.7,
      max_tokens: 1024,
    }),
  }, 7000);

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Mistral error ${response.status}: ${err}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error('Mistral returned empty response');
  return { content, model };
}

/**
 * 3. GEMINI Provider (Priority 3)
 */
async function callGemini(messages: ChatMessage[], apiKey: string): Promise<{ content: string; model: string }> {
  const key = apiKey || DEFAULT_GEMINI_KEY;
  if (!key || key.trim() === '') throw new Error('Gemini API Key missing');

  const trimmedKey = key.trim();
  const model = 'gemini-1.5-flash';

  const contents = messages.map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }));

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${trimmedKey}`;
  const response = await fetchWithTimeout(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents: contents,
      generationConfig: { temperature: 0.7, maxOutputTokens: 1024 },
    }),
  }, 7500);

  if (!response.ok) {
    const altResponse = await fetchWithTimeout('https://generativelanguage.googleapis.com/v1beta/openai/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${trimmedKey}`,
      },
      body: JSON.stringify({
        model: 'gemini-1.5-flash',
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
      }),
    }, 7000);

    if (!altResponse.ok) {
      const err = await response.text();
      throw new Error(`Gemini error: ${err}`);
    }

    const altData = await altResponse.json();
    const altContent = altData.choices?.[0]?.message?.content;
    if (!altContent) throw new Error('Gemini returned empty response');
    return { content: altContent, model };
  }

  const data = await response.json();
  const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!content) throw new Error('Gemini returned empty text candidate');
  return { content, model };
}

/**
 * 4. META / LLAMA Provider (Priority 4)
 */
async function callMetaLlama(messages: ChatMessage[], apiKey: string): Promise<{ content: string; model: string }> {
  const key = apiKey || DEFAULT_META_KEY;
  if (!key || key.trim() === '') throw new Error('Meta API Key missing');

  const model = 'llama3-70b';
  const response = await fetchWithTimeout('https://api.llama-api.com/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${key.trim()}`,
    },
    body: JSON.stringify({
      model,
      messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
      max_tokens: 1024,
    }),
  }, 7000);

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Meta Llama error ${response.status}: ${err}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error('Meta returned empty response');
  return { content, model };
}

/**
 * Fallback Local Knowledge Base
 */
function getLocalKnowledgeFallback(lastUserMessage: string): { content: string; model: string } {
  const query = lastUserMessage.toLowerCase();

  if (query.includes('size') || query.includes('fit') || query.includes('height') || query.includes('chart')) {
    return {
      content: `👕 **KHEOO Sizing Guide (Drop Shoulder Oversized Fit)**\n\nOur tees are tailored with a modern boxy, relaxed drop shoulder cut from 240+ GSM luxury combed cotton.\n\n• **S (Small)**: Chest 40" | Length 27" (Best for 5'4" - 5'7")\n• **M (Medium)**: Chest 42" | Length 28" (Best for 5'7" - 5'9")\n• **L (Large)**: Chest 44" | Length 29" (Best for 5'9" - 5'11")\n• **XL (Extra Large)**: Chest 46" | Length 30" (Best for 6'0"+)\n• **XXL**: Chest 48" | Length 31"\n\n*Tip: Pick your standard size for the signature relaxed drop shoulder drape.*`,
      model: 'kheoo-knowledge-engine-v1',
    };
  }

  if (query.includes('delivery') || query.includes('shipping') || query.includes('dhaka') || query.includes('time')) {
    return {
      content: `🚚 **KHEOO Shipping & Delivery Details**\n\n• **Inside Dhaka**: ৳60 | Delivered within **24 to 48 Hours**.\n• **Outside Dhaka (All Bangladesh)**: ৳120 | Delivered within **2 to 4 Business Days**.\n• **Payment Methods**: Cash on Delivery (COD), bKash, Nagad, and Credit/Debit Cards.\n• **Tracking**: Real-time SMS tracking updates on dispatch!`,
      model: 'kheoo-knowledge-engine-v1',
    };
  }

  if (query.includes('coupon') || query.includes('discount') || query.includes('promo') || query.includes('offer') || query.includes('code')) {
    return {
      content: `🔥 **Exclusive KHEOO Promo Codes**\n\n1. **KHEOO10** — Get **10% OFF** on any drop shoulder tee!\n2. **KHEOO20** — Get **20% OFF** on orders above ৳2000.\n\nApply the voucher during checkout in your cart drawer!`,
      model: 'kheoo-knowledge-engine-v1',
    };
  }

  if (query.includes('anime') || query.includes('gojo') || query.includes('naruto') || query.includes('titan') || query.includes('luffy') || query.includes('sukuna')) {
    return {
      content: `⚡ **Trending KHEOO Anime Streetwear Drops**\n\n1. **One Piece Gear 5 Sun God Nika Tee** (৳1,450 / $39.99) — Full-color vibrant HD back print.\n2. **Gojo Unlimited Void Oversized Tee** (৳1,390 / $38.99) — Jujutsu Kaisen domain puff print.\n3. **Naruto Sage Mode Heavyweight Drop Tee** (৳1,250 / $34.99) — Six Paths Sage Mode graphic.\n4. **Sukuna King of Curses Tee** (৳1,350 / $37.99) — Malevolent Shrine crimson foil print.\n5. **Attack on Titan Survey Corps Heavy Tee** (৳1,290 / $35.99) — Wings of Freedom embroidery.\n\nAll crafted from 240 GSM 100% combed cotton!`,
      model: 'kheoo-knowledge-engine-v1',
    };
  }

  if (query.includes('return') || query.includes('exchange') || query.includes('refund')) {
    return {
      content: `🔄 **7-Day Hassle-Free Exchange Policy**\n\nIf you need a different size or received a damaged piece, we provide a free 7-day exchange anywhere in Bangladesh. Simply keep tags intact and reach out to our support or WhatsApp!`,
      model: 'kheoo-knowledge-engine-v1',
    };
  }

  return {
    content: `✨ **Welcome to KHEOO Streetwear Assistant!**\n\nI can help you with:\n• **Product Recommendations**: Anime, Marvel & DC Heavyweight Drop Shoulder Tees.\n• **Size Recommendations**: Finding your perfect oversized fit.\n• **Discounts & Promo Codes**: e.g., code **KHEOO10** or **KHEOO20**.\n• **Order & Shipping**: Delivery timelines across Dhaka and Bangladesh.\n\nWhat would you like to explore today?`,
    model: 'kheoo-knowledge-engine-v1',
  };
}

export async function executeAiQueryWithFallback(messages: ChatMessage[]): Promise<AiResponse> {
  const startTime = Date.now();
  const fallbackChain: string[] = [];

  const groqKey = process.env.GROQ_API_KEY || DEFAULT_GROQ_KEY;
  const mistralKey = process.env.MISTRAL_API_KEY || DEFAULT_MISTRAL_KEY;
  const geminiKey = process.env.GEMINI_API_KEY || DEFAULT_GEMINI_KEY;
  const metaKey = process.env.META_API_KEY || DEFAULT_META_KEY;

  // 1. GROQ (Speed First ~500+ tokens/sec)
  try {
    fallbackChain.push('Groq');
    const result = await callGroq(messages, groqKey);
    return {
      content: result.content,
      provider: 'Groq',
      model: result.model,
      latencyMs: Date.now() - startTime,
      fallbackChain,
    };
  } catch (err: any) {
    console.warn(`[Client-AI-Fallback] Groq failed: ${err?.message || err}. Falling back to Mistral...`);
  }

  // 2. MISTRAL
  try {
    fallbackChain.push('Mistral');
    const result = await callMistral(messages, mistralKey);
    return {
      content: result.content,
      provider: 'Mistral',
      model: result.model,
      latencyMs: Date.now() - startTime,
      fallbackChain,
    };
  } catch (err: any) {
    console.warn(`[Client-AI-Fallback] Mistral failed: ${err?.message || err}. Falling back to Gemini...`);
  }

  // 3. GEMINI
  try {
    fallbackChain.push('Gemini');
    const result = await callGemini(messages, geminiKey);
    return {
      content: result.content,
      provider: 'Gemini',
      model: result.model,
      latencyMs: Date.now() - startTime,
      fallbackChain,
    };
  } catch (err: any) {
    console.warn(`[Client-AI-Fallback] Gemini failed: ${err?.message || err}. Falling back to Meta LLaMA...`);
  }

  // 4. META / LLAMA
  try {
    fallbackChain.push('Meta');
    const result = await callMetaLlama(messages, metaKey);
    return {
      content: result.content,
      provider: 'Meta',
      model: result.model,
      latencyMs: Date.now() - startTime,
      fallbackChain,
    };
  } catch (err: any) {
    console.warn(`[Client-AI-Fallback] Meta failed: ${err?.message || err}. Falling back to Smart Knowledge Base...`);
  }

  // 5. Intelligent Local Knowledge Fallback
  fallbackChain.push('Local-Knowledge-Base');
  const lastUserMsg = messages.filter(m => m.role === 'user').pop()?.content || '';
  const localResult = getLocalKnowledgeFallback(lastUserMsg);

  return {
    content: localResult.content,
    provider: 'Local-Knowledge-Base',
    model: localResult.model,
    latencyMs: Date.now() - startTime,
    fallbackChain,
  };
}
