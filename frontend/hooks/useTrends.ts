'use client';

import { useState, useEffect, useCallback } from 'react';
import { TrendData, TrendFilter } from '@/shared/types';
import useSWR from 'swr';

// Mock data for development
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
  },
  {
    id: '4',
    title: 'Ultimate YouTube SEO Guide 2024',
    platform: 'youtube',
    hashtags: ['youtube', 'seo', 'marketing', 'tutorial'],
    volume: 156000,
    growth: 31.8,
    category: 'Education',
    region: 'US',
    thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=225&fit=crop',
    engagement: {
      likes: 62000,
      shares: 18000,
      comments: 14500
    },
    createdAt: new Date('2024-01-15T07:00:00Z'),
    updatedAt: new Date('2024-01-15T14:10:00Z')
  },
  {
    id: '5',
    title: 'Crypto Market Analysis: What to Expect',
    platform: 'linkedin',
    hashtags: ['crypto', 'finance', 'investment', 'analysis'],
    volume: 43000,
    growth: 12.1,
    category: 'Finance',
    region: 'US',
    thumbnail: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=225&fit=crop',
    engagement: {
      likes: 19000,
      shares: 5600,
      comments: 3400
    },
    createdAt: new Date('2024-01-15T06:30:00Z'),
    updatedAt: new Date('2024-01-15T10:15:00Z')
  },
  {
    id: '6',
    title: 'Street Food Around the World',
    platform: 'tiktok',
    hashtags: ['streetfood', 'travel', 'food', 'culture'],
    volume: 98000,
    growth: 18.9,
    category: 'Food',
    region: 'CA',
    thumbnail: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=225&fit=crop',
    engagement: {
      likes: 41000,
      shares: 9800,
      comments: 7200
    },
    createdAt: new Date('2024-01-15T11:45:00Z'),
    updatedAt: new Date('2024-01-15T15:30:00Z')
  }
];

const fetcher = async (url: string) => {
  // In production, this would make an actual API call
  // For now, we'll simulate with mock data and filtering
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
  return MOCK_TRENDS;
};

export function useTrends(filter: TrendFilter) {
  const [processedTrends, setProcessedTrends] = useState<TrendData[]>([]);

  const { data: rawTrends, error, isLoading, mutate } = useSWR(
    `/api/trends?${new URLSearchParams(filter as any).toString()}`,
    fetcher,
    {
      refreshInterval: 300000, // Refresh every 5 minutes
      revalidateOnFocus: true,
      errorRetryCount: 3
    }
  );

  const filterTrends = useCallback((trends: TrendData[], filter: TrendFilter) => {
    let filtered = [...trends];

    // Filter by platforms
    if (filter.platforms && filter.platforms.length > 0) {
      filtered = filtered.filter(trend => filter.platforms!.includes(trend.platform));
    }

    // Filter by categories
    if (filter.categories && filter.categories.length > 0) {
      filtered = filtered.filter(trend => filter.categories!.includes(trend.category));
    }

    // Filter by regions
    if (filter.regions && filter.regions.length > 0) {
      filtered = filtered.filter(trend => filter.regions!.includes(trend.region));
    }

    // Filter by time range (simplified - in production this would be server-side)
    if (filter.timeRange) {
      const now = new Date();
      const timeRangeMs = {
        hour: 60 * 60 * 1000,
        day: 24 * 60 * 60 * 1000,
        week: 7 * 24 * 60 * 60 * 1000,
        month: 30 * 24 * 60 * 60 * 1000
      };
      const cutoff = new Date(now.getTime() - timeRangeMs[filter.timeRange]);
      filtered = filtered.filter(trend => new Date(trend.updatedAt) >= cutoff);
    }

    // Sort results
    if (filter.sortBy) {
      filtered.sort((a, b) => {
        let aValue: number, bValue: number;
        
        switch (filter.sortBy) {
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

        return filter.sortOrder === 'desc' ? bValue - aValue : aValue - bValue;
      });
    }

    return filtered;
  }, []);

  useEffect(() => {
    if (rawTrends) {
      const filtered = filterTrends(rawTrends, filter);
      setProcessedTrends(filtered);
    }
  }, [rawTrends, filter, filterTrends]);

  const refetch = useCallback(() => {
    mutate();
  }, [mutate]);

  return {
    trends: processedTrends,
    loading: isLoading,
    error,
    refetch
  };
}