import { Router } from 'express';
import { handleAiChat, getAiProvidersStatus } from '../controllers/aiController';

const router = Router();

router.post('/chat', handleAiChat);
router.post('/ask', handleAiChat);
router.get('/status', getAiProvidersStatus);

export default router;
