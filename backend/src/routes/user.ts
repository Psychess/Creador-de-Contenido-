import express from 'express';
import { asyncHandler } from '../middleware/errorHandler';

const router = express.Router();

// GET /api/user/profile
router.get('/profile', asyncHandler(async (req, res) => {
  res.json({
    success: true,
    data: {
      id: 'user-1',
      name: 'John Doe',
      email: 'john@example.com',
      subscription: 'pro',
    },
    timestamp: new Date().toISOString(),
  });
}));

// PUT /api/user/preferences
router.put('/preferences', asyncHandler(async (req, res) => {
  res.json({
    success: true,
    message: 'Preferences updated successfully',
    timestamp: new Date().toISOString(),
  });
}));

// GET /api/user/accounts
router.get('/accounts', asyncHandler(async (req, res) => {
  res.json({
    success: true,
    data: [
      { platform: 'instagram', username: '@johndoe', connected: true },
      { platform: 'twitter', username: '@johndoe', connected: false },
    ],
    timestamp: new Date().toISOString(),
  });
}));

export default router;