/**
 * Apify API Integration Service for KHEOO
 * Specification: OpenAPI 3.1.2 (Apify API v2)
 * Base URL: https://api.apify.com/v2
 */

export interface ApifyRunOptions {
  build?: string;
  timeoutSecs?: number;
  memoryMbytes?: number;
  waitForFinish?: number;
}

export interface ApifyActorRunResponse {
  id: string;
  actId: string;
  userId: string;
  status: 'READY' | 'RUNNING' | 'SUCCEEDED' | 'FAILED' | 'TIMED-OUT' | 'ABORTED';
  startedAt: string;
  finishedAt?: string;
  defaultDatasetId: string;
  defaultKeyValueStoreId: string;
  defaultRequestQueueId: string;
  usageTotalUsd?: number;
}

export class ApifyService {
  private static baseUrl = 'https://api.apify.com/v2';

  private static getHeaders(token?: string) {
    const apiToken = (token || process.env.APIFY_API_TOKEN || '').trim();
    return {
      'Content-Type': 'application/json',
      ...(apiToken ? { 'Authorization': `Bearer ${apiToken}` } : {}),
    };
  }

  /**
   * 1. Start an Actor run asynchronously
   * POST /v2/actors/{actorId}/runs
   */
  static async runActor(
    actorId: string,
    input: Record<string, any> = {},
    options: ApifyRunOptions = {},
    token?: string
  ): Promise<ApifyActorRunResponse> {
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

  /**
   * 2. Run Actor synchronously and return dataset items
   * POST /v2/actors/{actorId}/run-sync-get-dataset-items
   */
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

  /**
   * 3. Fetch items from an Apify Dataset
   * GET /v2/datasets/{datasetId}/items
   */
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

  /**
   * 4. Get Key-Value store record
   * GET /v2/key-value-stores/{storeId}/records/{recordKey}
   */
  static async getKeyValueRecord<T = any>(
    storeId: string,
    recordKey: string,
    token?: string
  ): Promise<T> {
    const url = `${this.baseUrl}/key-value-stores/${encodeURIComponent(storeId)}/records/${encodeURIComponent(recordKey)}`;
    const res = await fetch(url, {
      method: 'GET',
      headers: this.getHeaders(token),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Apify getKeyValueRecord error ${res.status}: ${err}`);
    }

    return await res.json();
  }

  /**
   * 5. Get current user's profile and usage limits
   * GET /v2/users/me
   */
  static async getCurrentUser(token?: string) {
    const url = `${this.baseUrl}/users/me`;
    const res = await fetch(url, {
      method: 'GET',
      headers: this.getHeaders(token),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Apify getCurrentUser error ${res.status}: ${err}`);
    }

    const data = await res.json();
    return data.data;
  }
}
