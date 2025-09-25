'use client';

import { TrendData } from '@/shared/types';
import { PLATFORM_CONFIGS } from '@/shared/constants';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, Hash, Users, MessageCircle, Heart, Share, Zap } from 'lucide-react';
import { formatNumber, formatTimeAgo } from '@/lib/utils';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface TrendCardProps {
  trend: TrendData;
  viewMode: 'grid' | 'list';
  onSelect: () => void;
}

export function TrendCard({ trend, viewMode, onSelect }: TrendCardProps) {
  const platformConfig = PLATFORM_CONFIGS[trend.platform];
  const isGrowing = trend.growth > 0;

  if (viewMode === 'list') {
    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            {/* Platform & Thumbnail */}
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-sm font-bold"
                style={{ backgroundColor: platformConfig.color }}
              >
                {platformConfig.name.slice(0, 2).toUpperCase()}
              </div>
              {trend.thumbnail && (
                <div className="relative w-16 h-12 rounded-md overflow-hidden">
                  <Image
                    src={trend.thumbnail}
                    alt={trend.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h4 className="font-semibold truncate">{trend.title}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-xs">
                      {trend.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {trend.region}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {formatNumber(trend.volume)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      {formatNumber(trend.engagement.likes)}
                    </div>
                    <div className={cn(
                      "flex items-center gap-1",
                      isGrowing ? "text-green-600" : "text-red-600"
                    )}>
                      {isGrowing ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      {Math.abs(trend.growth)}%
                    </div>
                  </div>
                </div>
                <Button onClick={onSelect} size="sm" className="gap-1 flex-shrink-0">
                  <Zap className="w-4 h-4" />
                  Create
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="trend-card cursor-pointer group" onClick={onSelect}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div 
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold"
            style={{ backgroundColor: platformConfig.color }}
          >
            {platformConfig.name.slice(0, 2).toUpperCase()}
          </div>
          <div className={cn(
            "flex items-center gap-1 text-sm",
            isGrowing ? "text-green-600" : "text-red-600"
          )}>
            {isGrowing ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            {Math.abs(trend.growth)}%
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Thumbnail */}
        {trend.thumbnail && (
          <div className="relative w-full h-32 rounded-md overflow-hidden bg-muted">
            <Image
              src={trend.thumbnail}
              alt={trend.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        {/* Title */}
        <div>
          <h4 className="font-semibold text-sm line-clamp-2 mb-2">{trend.title}</h4>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              {trend.category}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {trend.region}
            </span>
          </div>
        </div>

        {/* Hashtags */}
        {trend.hashtags.length > 0 && (
          <div className="flex items-center gap-1 flex-wrap">
            <Hash className="w-3 h-3 text-muted-foreground" />
            {trend.hashtags.slice(0, 3).map((hashtag, index) => (
              <span key={index} className="text-xs text-blue-600">
                {hashtag}
              </span>
            ))}
            {trend.hashtags.length > 3 && (
              <span className="text-xs text-muted-foreground">
                +{trend.hashtags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Users className="w-3 h-3" />
            <span>{formatNumber(trend.volume)}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Heart className="w-3 h-3" />
            <span>{formatNumber(trend.engagement.likes)}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <MessageCircle className="w-3 h-3" />
            <span>{formatNumber(trend.engagement.comments)}</span>
          </div>
        </div>

        {/* Action Button */}
        <Button 
          size="sm" 
          className="w-full gap-2 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
        >
          <Zap className="w-4 h-4" />
          Create Content
        </Button>

        {/* Time */}
        <div className="text-xs text-muted-foreground text-center">
          {formatTimeAgo(trend.updatedAt)}
        </div>
      </CardContent>
    </Card>
  );
}