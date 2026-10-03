import { Router } from 'express';
import {
  runApifyActor,
  runApifyActorSync,
  getApifyDataset,
  syncDatasetToProducts,
} from '../controllers/apifyController';

const router = Router();

router.post('/actors/run', runApifyActor);
router.post('/actors/run-sync', runApifyActorSync);
router.get('/datasets/:datasetId/items', getApifyDataset);
router.post('/datasets/:datasetId/sync-products', syncDatasetToProducts);

export default router;
