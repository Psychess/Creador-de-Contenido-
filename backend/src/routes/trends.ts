import express from 'express';
import { z } from 'zod';
import { asyncHandler } from '../middleware/errorHandler';
import { TrendData, TrendFilter } from '@/shared/types';

const router = express.Router();

// Mock trends data for development
const MOCK_TRENDS: TrendData[] = [
  {
    id: '1',
    title: 'AI Revolution in Content Creation',
    platform: 'tiktok',
    hashtags: ['ai', 'contentcreation', 'viral', 'tech'],
    volume: 125000,
    growth: 15.7,
    category: 'Technology',
    region: 'US',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=225&fit=crop',
    engagement: {
      likes: 45000,
      shares: 12000,
      comments: 8500
    },
    createdAt: new Date('2024-01-15T10:30:00Z'),
    updatedAt: new Date('2024-01-15T12:45:00Z')
  },
  {
    id: '2',
    title: 'Morning Routine That Changed My Life',
    platform: 'instagram',
    hashtags: ['morningroutine', 'selfcare', 'productivity', 'lifestyle'],
    volume: 89000,
    growth: 23.4,
    category: 'Lifestyle',
    region: 'US',
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=225&fit=crop',
    engagement: {
      likes: 34000,
      shares: 7800,
      comments: 5600
    },
    createdAt: new Date('2024-01-15T08:00:00Z'),
    updatedAt: new Date('2024-01-15T11:30:00Z')
  },
  {
    id: '3',
    title: 'Breaking: New Social Media Algorithm Update',
    platform: 'twitter',
    hashtags: ['algorithm', 'socialmedia', 'update', 'news'],
    volume: 67000,
    growth: -5.2,
    category: 'News',
    region: 'GB',
    thumbnail: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=225&fit=crop',
    engagement: {
      likes: 28000,
      shares: 15000,
      comments: 12000
    },
    createdAt: new Date('2024-01-15T09:15:00Z'),
    updatedAt: new Date('2024-01-15T13:20:00Z')
  }
];

// Validation schemas
const getTrendsSchema = z.object({
  platforms: z.string().optional(),
  categories: z.string().optional(),
  regions: z.string().optional(),
  timeRange: z.enum(['hour', 'day', 'week', 'month']).optional(),
  sortBy: z.enum(['volume', 'growth', 'engagement', 'recent']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
  page: z.string().transform(Number).optional(),
  limit: z.string().transform(Number).optional(),
});

// GET /api/trends
router.get('/', asyncHandler(async (req, res) => {
  const query = getTrendsSchema.parse(req.query);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  let trends = [...MOCK_TRENDS];
  
  // Apply filters (simplified - in production this would be done at database level)
  if (query.platforms) {
    const platforms = query.platforms.split(',');
    trends = trends.filter(trend => platforms.includes(trend.platform));
  }
  
  if (query.categories) {
    const categories = query.categories.split(',');
    trends = trends.filter(trend => categories.includes(trend.category));
  }
  
  if (query.regions) {
    const regions = query.regions.split(',');
    trends = trends.filter(trend => regions.includes(trend.region));
  }
  
  // Sort results
  if (query.sortBy) {
    trends.sort((a, b) => {
      let aValue: number, bValue: number;
      
      switch (query.sortBy) {
        case 'volume':
          aValue = a.volume;
          bValue = b.volume;
          break;
        case 'growth':
          aValue = a.growth;
          bValue = b.growth;
          break;
        case 'engagement':
          aValue = a.engagement.likes + a.engagement.shares + a.engagement.comments;
          bValue = b.engagement.likes + b.engagement.shares + b.engagement.comments;
          break;
        case 'recent':
          aValue = new Date(a.updatedAt).getTime();
          bValue = new Date(b.updatedAt).getTime();
          break;
        default:
          return 0;
      }
      
      return query.sortOrder === 'desc' ? bValue - aValue : aValue - bValue;
    });
  }
  
  // Pagination
  const page = query.page || 1;
  const limit = query.limit || 20;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedTrends = trends.slice(startIndex, endIndex);
  
  res.json({
    success: true,
    data: paginatedTrends,
    pagination: {
      page,
      limit,
      total: trends.length,
      hasNext: endIndex < trends.length,
      hasPrevious: page > 1,
    },
    timestamp: new Date().toISOString(),
  });
}));

// GET /api/trends/platform/:platform
router.get('/platform/:platform', asyncHandler(async (req, res) => {
  const { platform } = req.params;
  
  const trends = MOCK_TRENDS.filter(trend => trend.platform === platform);
  
  res.json({
    success: true,
    data: trends,
    platform,
    timestamp: new Date().toISOString(),
  });
}));

// GET /api/trends/search
router.get('/search', asyncHandler(async (req, res) => {
  const { q } = req.query;
  
  if (!q || typeof q !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'Query parameter "q" is required',
      timestamp: new Date().toISOString(),
    });
  }
  
  const searchQuery = q.toLowerCase();
  const trends = MOCK_TRENDS.filter(trend => 
    trend.title.toLowerCase().includes(searchQuery) ||
    trend.hashtags.some(tag => tag.toLowerCase().includes(searchQuery)) ||
    trend.category.toLowerCase().includes(searchQuery)
  );
  
  res.json({
    success: true,
    data: trends,
    query: q,
    timestamp: new Date().toISOString(),
  });
}));

// GET /api/trends/:id
router.get('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  const trend = MOCK_TRENDS.find(t => t.id === id);
  
  if (!trend) {
    return res.status(404).json({
      success: false,
      error: 'Trend not found',
      timestamp: new Date().toISOString(),
    });
  }
  
  res.json({
    success: true,
    data: trend,
    timestamp: new Date().toISOString(),
  });
}));

export default router;