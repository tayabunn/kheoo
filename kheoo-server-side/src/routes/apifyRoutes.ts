import { Router } from 'express';
import {
  runApifyActor,
  runApifyActorSync,
  getApifyDataset,
  syncDatasetToProducts,
} from '../controllers/apifyController';
import { verifyApiKeyOrAdmin } from '../middleware/securityMiddleware';

const router = Router();

// Protect Actor runs and catalog sync operations from unauthorized triggers
router.post('/actors/run', verifyApiKeyOrAdmin, runApifyActor);
router.post('/actors/run-sync', verifyApiKeyOrAdmin, runApifyActorSync);
router.get('/datasets/:datasetId/items', getApifyDataset);
router.post('/datasets/:datasetId/sync-products', verifyApiKeyOrAdmin, syncDatasetToProducts);

export default router;
