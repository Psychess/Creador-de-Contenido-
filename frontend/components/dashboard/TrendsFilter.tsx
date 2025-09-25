'use client';

import { TrendFilter, SocialPlatform } from '@/shared/types';
import { PLATFORM_CONFIGS, CONTENT_CATEGORIES, REGIONS } from '@/shared/constants';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Filter, X } from 'lucide-react';
import { useState } from 'react';

interface TrendsFilterProps {
  filter: TrendFilter;
  onFilterChange: (filter: Partial<TrendFilter>) => void;
}

export function TrendsFilter({ filter, onFilterChange }: TrendsFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handlePlatformToggle = (platform: SocialPlatform) => {
    const currentPlatforms = filter.platforms || [];
    const newPlatforms = currentPlatforms.includes(platform)
      ? currentPlatforms.filter(p => p !== platform)
      : [...currentPlatforms, platform];
    
    onFilterChange({ platforms: newPlatforms });
  };

  const handleCategoryToggle = (category: string) => {
    const currentCategories = filter.categories || [];
    const newCategories = currentCategories.includes(category)
      ? currentCategories.filter(c => c !== category)
      : [...currentCategories, category];
    
    onFilterChange({ categories: newCategories });
  };

  const handleRegionToggle = (region: string) => {
    const currentRegions = filter.regions || [];
    const newRegions = currentRegions.includes(region)
      ? currentRegions.filter(r => r !== region)
      : [...currentRegions, region];
    
    onFilterChange({ regions: newRegions });
  };

  const clearFilters = () => {
    onFilterChange({
      platforms: [],
      categories: [],
      regions: [],
      timeRange: 'day',
      sortBy: 'volume',
      sortOrder: 'desc'
    });
  };

  const activeFiltersCount = 
    (filter.platforms?.length || 0) + 
    (filter.categories?.length || 0) + 
    (filter.regions?.length || 0);

  return (
    <div className="flex items-center gap-4">
      {/* Quick Time Range */}
      <Select
        value={filter.timeRange}
        onValueChange={(value) => onFilterChange({ timeRange: value as any })}
      >
        <SelectTrigger className="w-32">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="hour">Last Hour</SelectItem>
          <SelectItem value="day">Last Day</SelectItem>
          <SelectItem value="week">Last Week</SelectItem>
          <SelectItem value="month">Last Month</SelectItem>
        </SelectContent>
      </Select>

      {/* Sort By */}
      <Select
        value={filter.sortBy}
        onValueChange={(value) => onFilterChange({ sortBy: value as any })}
      >
        <SelectTrigger className="w-40">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="volume">Volume</SelectItem>
          <SelectItem value="growth">Growth</SelectItem>
          <SelectItem value="engagement">Engagement</SelectItem>
          <SelectItem value="recent">Most Recent</SelectItem>
        </SelectContent>
      </Select>

      {/* Advanced Filters */}
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filters
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-1 px-1 py-0 text-xs">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-96 p-4" align="start">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">Filter Trends</h4>
              {activeFiltersCount > 0 && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear All
                </Button>
              )}
            </div>

            {/* Platforms */}
            <div>
              <label className="text-sm font-medium mb-2 block">Platforms</label>
              <div className="flex flex-wrap gap-2">
                {Object.entries(PLATFORM_CONFIGS).map(([key, config]) => (
                  <Badge
                    key={key}
                    variant={filter.platforms?.includes(key as SocialPlatform) ? "default" : "outline"}
                    className="cursor-pointer hover:bg-muted"
                    onClick={() => handlePlatformToggle(key as SocialPlatform)}
                  >
                    {config.name}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div>
              <label className="text-sm font-medium mb-2 block">Categories</label>
              <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto custom-scrollbar">
                {CONTENT_CATEGORIES.map((category) => (
                  <Badge
                    key={category}
                    variant={filter.categories?.includes(category) ? "default" : "outline"}
                    className="cursor-pointer hover:bg-muted"
                    onClick={() => handleCategoryToggle(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Regions */}
            <div>
              <label className="text-sm font-medium mb-2 block">Regions</label>
              <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto custom-scrollbar">
                {REGIONS.map((region) => (
                  <Badge
                    key={region.code}
                    variant={filter.regions?.includes(region.code) ? "default" : "outline"}
                    className="cursor-pointer hover:bg-muted"
                    onClick={() => handleRegionToggle(region.code)}
                  >
                    {region.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          {filter.platforms?.map((platform) => (
            <Badge key={platform} variant="secondary" className="gap-1">
              {PLATFORM_CONFIGS[platform].name}
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={() => handlePlatformToggle(platform)}
              />
            </Badge>
          ))}
          {filter.categories?.slice(0, 3).map((category) => (
            <Badge key={category} variant="secondary" className="gap-1">
              {category}
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={() => handleCategoryToggle(category)}
              />
            </Badge>
          ))}
          {(filter.categories?.length || 0) > 3 && (
            <Badge variant="secondary">
              +{(filter.categories?.length || 0) - 3} more
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}