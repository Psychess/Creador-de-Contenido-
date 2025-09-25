'use client';

import { TrendData } from '@/shared/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Eye, Hash, Globe } from 'lucide-react';
import { formatNumber } from '@/lib/utils';

interface TrendsStatsProps {
  trends: TrendData[];
  loading: boolean;
}

export function TrendsStats({ trends, loading }: TrendsStatsProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                <div className="w-24 h-4 bg-muted rounded animate-pulse" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-16 h-8 bg-muted rounded animate-pulse" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const stats = {
    totalTrends: trends.length,
    totalVolume: trends.reduce((sum, trend) => sum + trend.volume, 0),
    avgGrowth: trends.length > 0 ? trends.reduce((sum, trend) => sum + trend.growth, 0) / trends.length : 0,
    totalHashtags: trends.reduce((sum, trend) => sum + trend.hashtags.length, 0),
  };

  const statCards = [
    {
      title: 'Active Trends',
      value: formatNumber(stats.totalTrends),
      icon: TrendingUp,
      description: 'Trends found',
      color: 'text-blue-600'
    },
    {
      title: 'Total Volume',
      value: formatNumber(stats.totalVolume),
      icon: Eye,
      description: 'Total mentions',
      color: 'text-green-600'
    },
    {
      title: 'Avg Growth',
      value: `${stats.avgGrowth.toFixed(1)}%`,
      icon: TrendingUp,
      description: 'Growth rate',
      color: stats.avgGrowth >= 0 ? 'text-green-600' : 'text-red-600'
    },
    {
      title: 'Hashtags',
      value: formatNumber(stats.totalHashtags),
      icon: Hash,
      description: 'Total hashtags',
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <Icon className={`w-4 h-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}