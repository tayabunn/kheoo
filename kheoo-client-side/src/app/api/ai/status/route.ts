import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'online',
    providers: [
      { name: 'Groq (LPU Inference)', configured: Boolean(process.env.GROQ_API_KEY), priority: 1, speed: 'Ultra Fast (<500ms)' },
      { name: 'Mistral AI', configured: Boolean(process.env.MISTRAL_API_KEY), priority: 2, speed: 'Fast' },
      { name: 'Google Gemini', configured: Boolean(process.env.GEMINI_API_KEY), priority: 3, speed: 'Fast' },
      { name: 'Meta LLaMA', configured: Boolean(process.env.META_API_KEY), priority: 4, speed: 'Normal' },
      { name: 'Local Knowledge Base', configured: true, priority: 5, speed: 'Instant (0ms)', status: 'Fallback Ready' },
    ],
    fallbackOrder: ['Groq', 'Mistral', 'Gemini', 'Meta', 'Local-Knowledge-Base'],
    timestamp: new Date().toISOString(),
  });
}
