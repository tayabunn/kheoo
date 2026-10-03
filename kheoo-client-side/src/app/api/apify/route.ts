import { NextRequest, NextResponse } from 'next/server';
import { ApifyClientService } from '@/lib/apifyService';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, actorId, input, options, datasetId } = body;

    if (action === 'run' && actorId) {
      const data = await ApifyClientService.runActor(actorId, input || {}, options || {});
      return NextResponse.json({ success: true, data });
    }

    if (action === 'run-sync' && actorId) {
      const data = await ApifyClientService.runActorSyncGetDatasetItems(actorId, input || {});
      return NextResponse.json({ success: true, data, count: data.length });
    }

    if (action === 'get-dataset' && datasetId) {
      const data = await ApifyClientService.getDatasetItems(datasetId, options || {});
      return NextResponse.json({ success: true, data, count: data.length });
    }

    return NextResponse.json(
      { success: false, error: 'Invalid action or missing required parameters (actorId/datasetId)' },
      { status: 400 }
    );
  } catch (error: any) {
    console.error('Apify Next.js API Error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Apify API error' },
      { status: 500 }
    );
  }
}
