'use client';

import { useState, useEffect } from 'react';
import { TrendsFilter } from './TrendsFilter';
import { TrendsGrid } from './TrendsGrid';
import { TrendsStats } from './TrendsStats';
import { TrendData, TrendFilter } from '@/shared/types';
import { useTrends } from '@/hooks/useTrends';
import { Loader2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function TrendsDashboard() {
  const [filter, setFilter] = useState<TrendFilter>({
    platforms: [],
    categories: [],
    regions: [],
    timeRange: 'day',
    sortBy: 'volume',
    sortOrder: 'desc'
  });

  const { trends, loading, error, refetch } = useTrends(filter);

  const handleFilterChange = (newFilter: Partial<TrendFilter>) => {
    setFilter(prev => ({
      ...prev,
      ...newFilter
    }));
  };

  const handleRefresh = () => {
    refetch();
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-destructive">Failed to load trends</h3>
          <p className="text-sm text-muted-foreground mt-1">
            There was an error fetching the latest trends. Please try again.
          </p>
        </div>
        <Button onClick={handleRefresh} variant="outline">
          <RefreshCw className="w-4 h-4 mr-2" />
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <TrendsStats trends={trends} loading={loading} />

      {/* Filter Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <TrendsFilter 
          filter={filter}
          onFilterChange={handleFilterChange}
        />
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={loading}
            className="gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <div className="text-xs text-muted-foreground">
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>

      {/* Trends Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Loading trending content...</p>
          </div>
        </div>
      ) : (
        <TrendsGrid 
          trends={trends}
          onTrendSelect={(trend) => {
            // Handle trend selection for quick content creation
            console.log('Selected trend:', trend);
          }}
        />
      )}
    </div>
  );
}