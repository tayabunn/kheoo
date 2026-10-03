/**
 * Apify API Integration Service for KHEOO (Client/Next.js)
 * Base URL: https://api.apify.com/v2
 */

export interface ApifyRunOptions {
  build?: string;
  timeoutSecs?: number;
  memoryMbytes?: number;
  waitForFinish?: number;
}

const DEFAULT_APIFY_TOKEN = 'apify_api_WpypwJFXOqbM3VxolfvoyRFAr4puik0u7zGR';

export class ApifyClientService {
  private static baseUrl = 'https://api.apify.com/v2';

  private static getHeaders(token?: string) {
    const apiToken = token || process.env.APIFY_API_TOKEN || DEFAULT_APIFY_TOKEN;
    return {
      'Content-Type': 'application/json',
      ...(apiToken ? { 'Authorization': `Bearer ${apiToken.trim()}` } : {}),
    };
  }

  static async runActor(
    actorId: string,
    input: Record<string, any> = {},
    options: ApifyRunOptions = {},
    token?: string
  ) {
    const query = new URLSearchParams();
    if (options.timeoutSecs) query.append('timeout', options.timeoutSecs.toString());
    if (options.memoryMbytes) query.append('memory', options.memoryMbytes.toString());
    if (options.build) query.append('build', options.build);
    if (options.waitForFinish !== undefined) query.append('waitForFinish', options.waitForFinish.toString());

    const url = `${this.baseUrl}/actors/${encodeURIComponent(actorId)}/runs?${query.toString()}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: this.getHeaders(token),
      body: JSON.stringify(input),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Apify runActor error ${res.status}: ${err}`);
    }

    const data = await res.json();
    return data.data;
  }

  static async runActorSyncGetDatasetItems<T = any>(
    actorId: string,
    input: Record<string, any> = {},
    token?: string
  ): Promise<T[]> {
    const url = `${this.baseUrl}/actors/${encodeURIComponent(actorId)}/run-sync-get-dataset-items?format=json`;
    const res = await fetch(url, {
      method: 'POST',
      headers: this.getHeaders(token),
      body: JSON.stringify(input),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Apify runActorSync error ${res.status}: ${err}`);
    }

    return await res.json();
  }

  static async getDatasetItems<T = any>(
    datasetId: string,
    options: { limit?: number; offset?: number; clean?: boolean } = {},
    token?: string
  ): Promise<T[]> {
    const query = new URLSearchParams();
    query.append('format', 'json');
    if (options.limit) query.append('limit', options.limit.toString());
    if (options.offset) query.append('offset', options.offset.toString());
    if (options.clean) query.append('clean', '1');

    const url = `${this.baseUrl}/datasets/${encodeURIComponent(datasetId)}/items?${query.toString()}`;
    const res = await fetch(url, {
      method: 'GET',
      headers: this.getHeaders(token),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Apify getDatasetItems error ${res.status}: ${err}`);
    }

    return await res.json();
  }
}
