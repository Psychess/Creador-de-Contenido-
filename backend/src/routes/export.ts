import express from 'express';
import { asyncHandler } from '../middleware/errorHandler';

const router = express.Router();

// POST /api/export/text
router.post('/text', asyncHandler(async (req, res) => {
  res.json({
    success: true,
    message: 'Content exported as text',
    timestamp: new Date().toISOString(),
  });
}));

// POST /api/export/media
router.post('/media', asyncHandler(async (req, res) => {
  res.json({
    success: true,
    message: 'Content exported with media',
    timestamp: new Date().toISOString(),
  });
}));

export default router;