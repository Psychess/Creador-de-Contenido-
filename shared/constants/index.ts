import { SocialPlatform, ContentTone, ContentType } from '../types';

// Platform configurations
export const PLATFORM_CONFIGS: Record<SocialPlatform, {
  name: string;
  maxTextLength: number;
  maxHashtags: number;
  supportedContentTypes: ContentType[];
  color: string;
  icon: string;
}> = {
  tiktok: {
    name: 'TikTok',
    maxTextLength: 2200,
    maxHashtags: 100,
    supportedContentTypes: ['video', 'post'],
    color: '#000000',
    icon: 'tiktok'
  },
  instagram: {
    name: 'Instagram',
    maxTextLength: 2200,
    maxHashtags: 30,
    supportedContentTypes: ['post', 'story', 'reel', 'carousel'],
    color: '#E4405F',
    icon: 'instagram'
  },
  twitter: {
    name: 'Twitter/X',
    maxTextLength: 280,
    maxHashtags: 10,
    supportedContentTypes: ['post', 'thread', 'poll'],
    color: '#1DA1F2',
    icon: 'twitter'
  },
  youtube: {
    name: 'YouTube',
    maxTextLength: 5000,
    maxHashtags: 15,
    supportedContentTypes: ['video', 'post'],
    color: '#FF0000',
    icon: 'youtube'
  },
  facebook: {
    name: 'Facebook',
    maxTextLength: 63206,
    maxHashtags: 30,
    supportedContentTypes: ['post', 'story', 'video'],
    color: '#1877F2',
    icon: 'facebook'
  },
  linkedin: {
    name: 'LinkedIn',
    maxTextLength: 3000,
    maxHashtags: 30,
    supportedContentTypes: ['post', 'poll'],
    color: '#0A66C2',
    icon: 'linkedin'
  }
};

// Content tones configuration
export const CONTENT_TONES: Record<ContentTone, {
  name: string;
  description: string;
  keywords: string[];
  examples: string[];
}> = {
  professional: {
    name: 'Professional',
    description: 'Formal, business-oriented tone',
    keywords: ['industry', 'expertise', 'insights', 'strategy'],
    examples: ['Leverage data-driven insights', 'Industry best practices', 'Strategic approach']
  },
  casual: {
    name: 'Casual',
    description: 'Relaxed, conversational tone',
    keywords: ['hey', 'just', 'honestly', 'simple'],
    examples: ['Hey there!', 'Just wanted to share', 'Honestly, I think']
  },
  humorous: {
    name: 'Humorous',
    description: 'Funny, entertaining content',
    keywords: ['hilarious', 'funny', 'lol', 'comedy'],
    examples: ['You won\'t believe this', 'Plot twist:', 'Meanwhile...']
  },
  inspirational: {
    name: 'Inspirational',
    description: 'Motivating and uplifting',
    keywords: ['inspire', 'motivate', 'achieve', 'dream'],
    examples: ['Believe in yourself', 'Never give up', 'You got this']
  },
  educational: {
    name: 'Educational',
    description: 'Informative and teaching',
    keywords: ['learn', 'discover', 'tips', 'how-to'],
    examples: ['Did you know?', 'Here\'s how to', 'Pro tip:']
  },
  promotional: {
    name: 'Promotional',
    description: 'Marketing and sales focused',
    keywords: ['exclusive', 'limited', 'offer', 'sale'],
    examples: ['Don\'t miss out', 'Limited time offer', 'Get yours now']
  },
  storytelling: {
    name: 'Storytelling',
    description: 'Narrative and story-driven',
    keywords: ['story', 'journey', 'experience', 'moment'],
    examples: ['Let me tell you about', 'Once upon a time', 'My journey began']
  },
  urgent: {
    name: 'Urgent',
    description: 'Time-sensitive and pressing',
    keywords: ['urgent', 'now', 'immediate', 'breaking'],
    examples: ['Breaking news', 'Act now', 'Don\'t wait']
  },
  friendly: {
    name: 'Friendly',
    description: 'Warm and approachable',
    keywords: ['friend', 'welcome', 'community', 'together'],
    examples: ['Welcome to our community', 'Let\'s connect', 'Happy to help']
  }
};

// Content categories
export const CONTENT_CATEGORIES = [
  'Entertainment',
  'Education',
  'Technology',
  'Business',
  'Lifestyle',
  'Health',
  'Food',
  'Travel',
  'Fashion',
  'Sports',
  'Gaming',
  'Music',
  'Art',
  'Politics',
  'Science',
  'Finance',
  'Marketing',
  'Fitness',
  'Beauty',
  'DIY',
  'Parenting',
  'Relationships',
  'Career',
  'Environment',
  'News'
];

// Regional configurations
export const REGIONS = [
  { code: 'US', name: 'United States', timezone: 'America/New_York' },
  { code: 'GB', name: 'United Kingdom', timezone: 'Europe/London' },
  { code: 'CA', name: 'Canada', timezone: 'America/Toronto' },
  { code: 'AU', name: 'Australia', timezone: 'Australia/Sydney' },
  { code: 'DE', name: 'Germany', timezone: 'Europe/Berlin' },
  { code: 'FR', name: 'France', timezone: 'Europe/Paris' },
  { code: 'IT', name: 'Italy', timezone: 'Europe/Rome' },
  { code: 'ES', name: 'Spain', timezone: 'Europe/Madrid' },
  { code: 'BR', name: 'Brazil', timezone: 'America/Sao_Paulo' },
  { code: 'MX', name: 'Mexico', timezone: 'America/Mexico_City' },
  { code: 'JP', name: 'Japan', timezone: 'Asia/Tokyo' },
  { code: 'IN', name: 'India', timezone: 'Asia/Kolkata' },
  { code: 'KR', name: 'South Korea', timezone: 'Asia/Seoul' },
  { code: 'CN', name: 'China', timezone: 'Asia/Shanghai' }
];

// API endpoints
export const API_ENDPOINTS = {
  trends: {
    getAll: '/api/trends',
    getByPlatform: '/api/trends/platform',
    search: '/api/trends/search'
  },
  content: {
    generate: '/api/content/generate',
    optimize: '/api/content/optimize',
    templates: '/api/content/templates',
    save: '/api/content/save',
    history: '/api/content/history'
  },
  export: {
    text: '/api/export/text',
    media: '/api/export/media',
    schedule: '/api/export/schedule'
  },
  publish: {
    direct: '/api/publish',
    schedule: '/api/publish/schedule',
    status: '/api/publish/status'
  },
  analytics: {
    performance: '/api/analytics/performance',
    trends: '/api/analytics/trends',
    engagement: '/api/analytics/engagement'
  },
  user: {
    profile: '/api/user/profile',
    preferences: '/api/user/preferences',
    accounts: '/api/user/accounts'
  }
};

// Application limits
export const APP_LIMITS = {
  free: {
    trendsPerDay: 50,
    contentGenerationsPerDay: 10,
    scheduledPostsPerMonth: 5,
    connectedAccounts: 2,
    templatesCustom: 0
  },
  pro: {
    trendsPerDay: 500,
    contentGenerationsPerDay: 100,
    scheduledPostsPerMonth: 50,
    connectedAccounts: 10,
    templatesCustom: 20
  },
  enterprise: {
    trendsPerDay: -1, // unlimited
    contentGenerationsPerDay: -1,
    scheduledPostsPerMonth: -1,
    connectedAccounts: -1,
    templatesCustom: -1
  }
};

// Error messages
export const ERROR_MESSAGES = {
  UNAUTHORIZED: 'Authentication required',
  FORBIDDEN: 'Access denied',
  NOT_FOUND: 'Resource not found',
  VALIDATION_ERROR: 'Invalid input data',
  RATE_LIMIT_EXCEEDED: 'Rate limit exceeded',
  EXTERNAL_API_ERROR: 'External service unavailable',
  GENERATION_FAILED: 'Content generation failed',
  PUBLISHING_FAILED: 'Publishing failed',
  INSUFFICIENT_CREDITS: 'Insufficient credits for this action'
};

// Success messages
export const SUCCESS_MESSAGES = {
  CONTENT_GENERATED: 'Content generated successfully',
  CONTENT_SAVED: 'Content saved to drafts',
  CONTENT_PUBLISHED: 'Content published successfully',
  CONTENT_SCHEDULED: 'Content scheduled for publishing',
  ACCOUNT_CONNECTED: 'Social account connected successfully',
  PREFERENCES_UPDATED: 'Preferences updated successfully'
};

// Default values
export const DEFAULT_VALUES = {
  contentTone: 'casual' as ContentTone,
  contentType: 'post' as ContentType,
  characterLimit: 280,
  hashtagCount: 5,
  trendsPerPage: 20,
  contentHistoryLimit: 50
};

// File upload constraints
export const UPLOAD_CONSTRAINTS = {
  maxFileSize: 10 * 1024 * 1024, // 10MB
  allowedImageTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  allowedVideoTypes: ['video/mp4', 'video/webm', 'video/avi'],
  maxImageWidth: 1920,
  maxImageHeight: 1080
};

// Cache durations (in seconds)
export const CACHE_DURATIONS = {
  trends: 300, // 5 minutes
  userProfile: 3600, // 1 hour
  templates: 1800, // 30 minutes
  analytics: 600 // 10 minutes
};