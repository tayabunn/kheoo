import { Request, Response } from 'express';
import { ApifyService } from '../lib/apifyService';
import { Product } from '../models/Product';

export const runApifyActor = async (req: Request, res: Response) => {
  try {
    const { actorId, input, options, token } = req.body;

    if (!actorId) {
      return res.status(400).json({ success: false, error: 'actorId is required' });
    }

    const runResult = await ApifyService.runActor(actorId, input || {}, options || {}, token);
    return res.json({ success: true, data: runResult });
  } catch (error: any) {
    console.error('Error running Apify Actor:', error);
    return res.status(500).json({ success: false, error: error?.message || 'Failed to run Apify actor' });
  }
};

export const runApifyActorSync = async (req: Request, res: Response) => {
  try {
    const { actorId, input, token } = req.body;

    if (!actorId) {
      return res.status(400).json({ success: false, error: 'actorId is required' });
    }

    const items = await ApifyService.runActorSyncGetDatasetItems(actorId, input || {}, token);
    return res.json({ success: true, data: items, count: items.length });
  } catch (error: any) {
    console.error('Error running sync Apify Actor:', error);
    return res.status(500).json({ success: false, error: error?.message || 'Failed to run sync actor' });
  }
};

export const getApifyDataset = async (req: Request, res: Response) => {
  try {
    const { datasetId } = req.params;
    const { limit, offset, clean, token } = req.query;

    if (!datasetId) {
      return res.status(400).json({ success: false, error: 'datasetId is required' });
    }

    const items = await ApifyService.getDatasetItems(
      datasetId,
      {
        limit: limit ? Number(limit) : undefined,
        offset: offset ? Number(offset) : undefined,
        clean: clean === '1' || clean === 'true',
      },
      typeof token === 'string' ? token : undefined
    );

    return res.json({ success: true, data: items, count: items.length });
  } catch (error: any) {
    console.error('Error fetching Apify dataset:', error);
    return res.status(500).json({ success: false, error: error?.message || 'Failed to fetch dataset' });
  }
};

export const syncDatasetToProducts = async (req: Request, res: Response) => {
  try {
    const { datasetId } = req.params;
    const { defaultCategory = 'anime' } = req.body;

    if (!datasetId) {
      return res.status(400).json({ success: false, error: 'datasetId is required' });
    }

    const items = await ApifyService.getDatasetItems(datasetId, { clean: true });
    let importedCount = 0;

    for (const item of items) {
      const name = item.title || item.name || item.productName;
      if (!name) continue;

      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const price = Number(item.price || item.currentPrice || 35.00);

      const existing = await Product.findOne({ slug });
      if (!existing) {
        await Product.create({
          name,
          slug,
          description: item.description || `Premium heavyweight streetwear drop shoulder tee.`,
          price,
          oldPrice: price + 10,
          categoryId: item.categoryId || defaultCategory,
          isNewProduct: true,
          isTrending: true,
          stock: 50,
          material: '100% Combed Cotton (240 GSM)',
          printQuality: 'Screen & Puff Print',
          images: Array.isArray(item.images) ? item.images : item.image ? [item.image] : [],
        });
        importedCount++;
      }
    }

    return res.json({
      success: true,
      message: `Successfully imported ${importedCount} products from Apify dataset into KHEOO catalog!`,
      importedCount,
    });
  } catch (error: any) {
    console.error('Error syncing dataset to products:', error);
    return res.status(500).json({ success: false, error: error?.message || 'Failed to import products' });
  }
};
