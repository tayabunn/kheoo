import { Request, Response } from 'express';
import { executeAiQueryWithFallback, ChatMessage } from '../lib/aiFallbackService';
import { Product } from '../models/Product';

export const handleAiChat = async (req: Request, res: Response) => {
  try {
    const { messages, message } = req.body;

    let chatMessages: ChatMessage[] = [];

    if (Array.isArray(messages) && messages.length > 0) {
      chatMessages = messages;
    } else if (typeof message === 'string' && message.trim().length > 0) {
      chatMessages = [{ role: 'user', content: message.trim() }];
    } else {
      return res.status(400).json({ error: 'Please provide a valid message or messages array.' });
    }

    // Optionally attach live product context if relevant
    const lastUserQuery = chatMessages.filter(m => m.role === 'user').pop()?.content || '';
    let productRecommendations: any[] = [];

    try {
      if (/tee|shirt|anime|marvel|dc|oversized|drop|gojo|luffy|naruto|batman|spider/i.test(lastUserQuery)) {
        productRecommendations = await Product.find({}).limit(4).select('name slug price oldPrice images categoryId rating');
      }
    } catch {
      // product fetch is optional enhancement
    }

    const aiResult = await executeAiQueryWithFallback(chatMessages);

    return res.json({
      success: true,
      message: aiResult.content,
      provider: aiResult.provider,
      model: aiResult.model,
      latencyMs: aiResult.latencyMs,
      fallbackChain: aiResult.fallbackChain,
      suggestedProducts: productRecommendations,
    });
  } catch (error: any) {
    console.error('Error in handleAiChat:', error);
    return res.status(500).json({
      success: false,
      error: error?.message || 'Internal AI service error',
    });
  }
};

export const getAiProvidersStatus = async (req: Request, res: Response) => {
  const status = {
    providers: [
      { name: 'Groq (LPU)', hasKey: Boolean(process.env.GROQ_API_KEY), priority: 1 },
      { name: 'Mistral AI', hasKey: Boolean(process.env.MISTRAL_API_KEY), priority: 2 },
      { name: 'Google Gemini', hasKey: Boolean(process.env.GEMINI_API_KEY), priority: 3 },
      { name: 'Meta LLaMA', hasKey: Boolean(process.env.META_API_KEY), priority: 4 },
      { name: 'Local Knowledge Base', hasKey: true, priority: 5, status: 'Always Ready' },
    ],
    activeFallbackStrategy: 'Groq -> Mistral -> Gemini -> Meta -> Local Knowledge Base',
    timestamp: new Date().toISOString(),
  };

  return res.json(status);
};
