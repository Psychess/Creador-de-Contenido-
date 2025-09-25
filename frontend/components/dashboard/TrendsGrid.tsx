'use client';

import { TrendData } from '@/shared/types';
import { TrendCard } from './TrendCard';
import { Button } from '@/components/ui/button';
import { Grid, List } from 'lucide-react';
import { useState } from 'react';

interface TrendsGridProps {
  trends: TrendData[];
  onTrendSelect: (trend: TrendData) => void;
}

export function TrendsGrid({ trends, onTrendSelect }: TrendsGridProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  if (trends.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-muted-foreground">
          <p className="text-lg font-medium">No trends found</p>
          <p className="text-sm mt-1">Try adjusting your filters to see more content</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* View Mode Toggle */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          Trending Now ({trends.length})
        </h3>
        <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('grid')}
            className="h-8 px-3"
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('list')}
            className="h-8 px-3"
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Trends Display */}
      <div className={
        viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'
          : 'space-y-3'
      }>
        {trends.map((trend) => (
          <TrendCard
            key={trend.id}
            trend={trend}
            viewMode={viewMode}
            onSelect={() => onTrendSelect(trend)}
          />
        ))}
      </div>

      {/* Load More */}
      {trends.length >= 20 && (
        <div className="text-center pt-6">
          <Button variant="outline" className="gap-2">
            Load More Trends
          </Button>
        </div>
      )}
    </div>
  );
}