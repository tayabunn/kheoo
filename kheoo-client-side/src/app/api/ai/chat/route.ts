import { NextRequest, NextResponse } from 'next/server';
import { executeAiQueryWithFallback, ChatMessage } from '@/lib/aiFallbackService';
import {
  executeSearchProducts,
  executeRecommendSize,
  executeTrackOrder,
  executeApplyCoupon,
} from '@/lib/aiTools';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, message, stream = true } = body;

    let chatMessages: ChatMessage[] = [];

    if (Array.isArray(messages) && messages.length > 0) {
      chatMessages = messages;
    } else if (typeof message === 'string' && message.trim().length > 0) {
      chatMessages = [{ role: 'user', content: message.trim() }];
    } else {
      return NextResponse.json(
        { error: 'Please provide a valid message or messages array.' },
        { status: 400 }
      );
    }

    const lastUserQuery = chatMessages.filter(m => m.role === 'user').pop()?.content || '';
    const qLower = lastUserQuery.toLowerCase();

    // Determine if any tool should be invoked for Generative UI
    let toolResult: any = null;

    if (/product|drop|tee|shirt|anime|marvel|dc|collection|luffy|gojo|naruto|batman|spider/i.test(qLower) && !qLower.includes('track') && !qLower.includes('size')) {
      let category: 'anime' | 'marvel' | 'dc' | 'all' = 'all';
      if (qLower.includes('anime') || qLower.includes('gojo') || qLower.includes('naruto') || qLower.includes('luffy')) category = 'anime';
      else if (qLower.includes('marvel') || qLower.includes('spider')) category = 'marvel';
      else if (qLower.includes('dc') || qLower.includes('batman')) category = 'dc';

      toolResult = executeSearchProducts({ query: lastUserQuery, category });
    } else if (/size|fit|height|weight|chart|how does it fit|measure/i.test(qLower)) {
      toolResult = executeRecommendSize({
        height: lastUserQuery,
        fitPreference: qLower.includes('fitted') || qLower.includes('tight') ? 'fitted' : 'oversized',
      });
    } else if (/track|order|where is my|shipment|status/i.test(qLower) && (qLower.includes('kh-') || /\d{4}/.test(qLower) || qLower.includes('order'))) {
      toolResult = executeTrackOrder({ orderIdOrPhone: lastUserQuery });
    } else if (/coupon|promo|discount|voucher|offer|code/i.test(qLower)) {
      toolResult = executeApplyCoupon({ code: qLower.includes('20') ? 'KHEOO20' : 'KHEOO10' });
    }

    // If non-streaming requested
    if (!stream) {
      const aiResult = await executeAiQueryWithFallback(chatMessages);
      return NextResponse.json({
        success: true,
        message: aiResult.content,
        provider: aiResult.provider,
        model: aiResult.model,
        latencyMs: aiResult.latencyMs,
        toolResult,
      });
    }

    // Streaming SSE (Server-Sent Events) implementation
    const encoder = new TextEncoder();

    const readable = new ReadableStream({
      async start(controller) {
        try {
          // If tool was called, emit the tool payload first
          if (toolResult) {
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ type: 'tool', data: toolResult })}\n\n`)
            );
          }

          // Execute AI query with multi-provider fallback
          const aiResult = await executeAiQueryWithFallback(chatMessages);
          const fullText = aiResult.content || '';

          // Split into words / token chunks for natural fluid streaming
          const chunks = fullText.split(/(?<=\s+)/);

          for (let i = 0; i < chunks.length; i++) {
            const chunk = chunks[i];
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ type: 'token', content: chunk })}\n\n`)
            );
            // Micro-delay between tokens for smooth streaming effect
            await new Promise(resolve => setTimeout(resolve, 20));
          }

          // Emit completion event
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({
                type: 'done',
                provider: aiResult.provider,
                model: aiResult.model,
                latencyMs: aiResult.latencyMs,
              })}\n\n`
            )
          );
          controller.close();
        } catch (err: any) {
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ type: 'error', error: err?.message || 'Streaming failed' })}\n\n`)
          );
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive',
      },
    });
  } catch (error: any) {
    console.error('Next.js AI Chat Route Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'AI service failure',
      },
      { status: 500 }
    );
  }
}
