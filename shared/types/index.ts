// Platform definitions
export type SocialPlatform = 'tiktok' | 'instagram' | 'twitter' | 'youtube' | 'facebook' | 'linkedin';

// Trend-related types
export interface TrendData {
  id: string;
  title: string;
  platform: SocialPlatform;
  hashtags: string[];
  volume: number;
  growth: number;
  category: string;
  region: string;
  thumbnail?: string;
  engagement: {
    likes: number;
    shares: number;
    comments: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface TrendFilter {
  platforms?: SocialPlatform[];
  categories?: string[];
  regions?: string[];
  timeRange?: 'hour' | 'day' | 'week' | 'month';
  sortBy?: 'volume' | 'growth' | 'engagement' | 'recent';
  sortOrder?: 'asc' | 'desc';
}

// Content creation types
export interface ContentRequest {
  id?: string;
  trend?: TrendData;
  customTopic?: string;
  targetPlatforms: SocialPlatform[];
  tone: ContentTone;
  contentType: ContentType;
  characterLimit?: number;
  timeLimit?: number;
  cta?: string;
  keywords: string[];
  hashtags: string[];
  targetAudience?: string;
}

export type ContentTone = 
  | 'professional' 
  | 'casual' 
  | 'humorous' 
  | 'inspirational' 
  | 'educational' 
  | 'promotional' 
  | 'storytelling'
  | 'urgent'
  | 'friendly';

export type ContentType = 
  | 'post' 
  | 'story' 
  | 'reel' 
  | 'video' 
  | 'carousel' 
  | 'poll' 
  | 'thread';

export interface GeneratedContent {
  id: string;
  platform: SocialPlatform;
  contentType: ContentType;
  title?: string;
  text: string;
  hashtags: string[];
  mediaUrls?: string[];
  thumbnailUrl?: string;
  cta?: string;
  estimatedPerformance?: PerformanceMetrics;
  variations?: GeneratedContent[];
  createdAt: Date;
}

export interface PerformanceMetrics {
  engagementScore: number;
  viralPotential: number;
  reachEstimate: number;
  trendinessScore: number;
}

// Template types
export interface ContentTemplate {
  id: string;
  name: string;
  description: string;
  platform: SocialPlatform;
  contentType: ContentType;
  template: string;
  variables: TemplateVariable[];
  category: string;
  isPublic: boolean;
  usage: number;
  rating: number;
}

export interface TemplateVariable {
  name: string;
  type: 'text' | 'number' | 'array' | 'image' | 'video';
  required: boolean;
  placeholder?: string;
  defaultValue?: any;
}

// User and authentication types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  subscription: SubscriptionTier;
  preferences: UserPreferences;
  connectedAccounts: ConnectedAccount[];
  createdAt: Date;
  updatedAt: Date;
}

export type SubscriptionTier = 'free' | 'pro' | 'enterprise';

export interface UserPreferences {
  defaultPlatforms: SocialPlatform[];
  defaultTone: ContentTone;
  language: string;
  timezone: string;
  notifications: NotificationSettings;
}

export interface NotificationSettings {
  trendingAlerts: boolean;
  contentReady: boolean;
  publishingReminders: boolean;
  weeklyReports: boolean;
}

export interface ConnectedAccount {
  id: string;
  platform: SocialPlatform;
  username: string;
  accessToken: string;
  refreshToken?: string;
  expiresAt?: Date;
  isActive: boolean;
}

// Export and publishing types
export interface ExportOptions {
  format: 'text' | 'json' | 'csv' | 'image' | 'video';
  includeMetadata: boolean;
  includeAnalytics: boolean;
  platforms?: SocialPlatform[];
}

export interface PublishingSchedule {
  id: string;
  contentId: string;
  platform: SocialPlatform;
  scheduledAt: Date;
  status: 'scheduled' | 'published' | 'failed' | 'cancelled';
  publishedAt?: Date;
  publishedUrl?: string;
  error?: string;
}

// Analytics types
export interface ContentAnalytics {
  contentId: string;
  platform: SocialPlatform;
  impressions: number;
  engagement: number;
  clicks: number;
  shares: number;
  comments: number;
  likes: number;
  saves: number;
  reachUnique: number;
  ctr: number;
  engagementRate: number;
  measuredAt: Date;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: Date;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}

// Workflow types
export interface ContentWorkflow {
  id: string;
  name: string;
  userId: string;
  steps: WorkflowStep[];
  isActive: boolean;
  trigger: WorkflowTrigger;
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkflowStep {
  id: string;
  type: 'generate' | 'review' | 'schedule' | 'publish' | 'analyze';
  config: Record<string, any>;
  order: number;
}

export interface WorkflowTrigger {
  type: 'manual' | 'scheduled' | 'trend_detected' | 'keyword_trending';
  config: Record<string, any>;
}