import dotenv from 'dotenv';
import { z } from 'zod';

// Load environment variables
dotenv.config();

// Define environment schema
const envSchema = z.object({
  // Application
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().transform(Number).default('3001'),
  
  // Frontend URL
  FRONTEND_URL: z.string().default('http://localhost:3000'),
  BACKEND_URL: z.string().default('http://localhost:3001'),
  
  // Database
  DATABASE_URL: z.string(),
  REDIS_URL: z.string().optional(),
  
  // JWT & Auth
  JWT_SECRET: z.string(),
  NEXTAUTH_SECRET: z.string().optional(),
  NEXTAUTH_URL: z.string().optional(),
  
  // AI Services
  OPENAI_API_KEY: z.string().optional(),
  STABILITY_API_KEY: z.string().optional(),
  
  // Social Media APIs
  TWITTER_API_KEY: z.string().optional(),
  TWITTER_API_SECRET: z.string().optional(),
  TWITTER_BEARER_TOKEN: z.string().optional(),
  
  INSTAGRAM_CLIENT_ID: z.string().optional(),
  INSTAGRAM_CLIENT_SECRET: z.string().optional(),
  
  TIKTOK_CLIENT_ID: z.string().optional(),
  TIKTOK_CLIENT_SECRET: z.string().optional(),
  
  YOUTUBE_API_KEY: z.string().optional(),
  
  // Google Services
  GOOGLE_TRENDS_API_KEY: z.string().optional(),
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),
  
  // Rate Limiting
  RATE_LIMIT_WINDOW_MS: z.string().transform(Number).default('900000'),
  RATE_LIMIT_MAX_REQUESTS: z.string().transform(Number).default('100'),
  
  // File Upload
  MAX_FILE_SIZE: z.string().transform(Number).default('10485760'),
  UPLOAD_PATH: z.string().default('./uploads'),
  
  // Email Configuration
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().transform(Number).optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  
  // Analytics
  GOOGLE_ANALYTICS_ID: z.string().optional(),
  MIXPANEL_TOKEN: z.string().optional(),
});

// Validate environment variables
const envVars = {
  NODE_ENV: process.env['NODE_ENV'],
  PORT: process.env['PORT'],
  FRONTEND_URL: process.env['FRONTEND_URL'],
  BACKEND_URL: process.env['BACKEND_URL'],
  DATABASE_URL: process.env['DATABASE_URL'],
  REDIS_URL: process.env['REDIS_URL'],
  JWT_SECRET: process.env['JWT_SECRET'],
  NEXTAUTH_SECRET: process.env['NEXTAUTH_SECRET'],
  NEXTAUTH_URL: process.env['NEXTAUTH_URL'],
  OPENAI_API_KEY: process.env['OPENAI_API_KEY'],
  STABILITY_API_KEY: process.env['STABILITY_API_KEY'],
  TWITTER_API_KEY: process.env['TWITTER_API_KEY'],
  TWITTER_API_SECRET: process.env['TWITTER_API_SECRET'],
  TWITTER_BEARER_TOKEN: process.env['TWITTER_BEARER_TOKEN'],
  INSTAGRAM_CLIENT_ID: process.env['INSTAGRAM_CLIENT_ID'],
  INSTAGRAM_CLIENT_SECRET: process.env['INSTAGRAM_CLIENT_SECRET'],
  TIKTOK_CLIENT_ID: process.env['TIKTOK_CLIENT_ID'],
  TIKTOK_CLIENT_SECRET: process.env['TIKTOK_CLIENT_SECRET'],
  YOUTUBE_API_KEY: process.env['YOUTUBE_API_KEY'],
  GOOGLE_TRENDS_API_KEY: process.env['GOOGLE_TRENDS_API_KEY'],
  GOOGLE_CLIENT_ID: process.env['GOOGLE_CLIENT_ID'],
  GOOGLE_CLIENT_SECRET: process.env['GOOGLE_CLIENT_SECRET'],
  RATE_LIMIT_WINDOW_MS: process.env['RATE_LIMIT_WINDOW_MS'],
  RATE_LIMIT_MAX_REQUESTS: process.env['RATE_LIMIT_MAX_REQUESTS'],
  MAX_FILE_SIZE: process.env['MAX_FILE_SIZE'],
  UPLOAD_PATH: process.env['UPLOAD_PATH'],
  SMTP_HOST: process.env['SMTP_HOST'],
  SMTP_PORT: process.env['SMTP_PORT'],
  SMTP_USER: process.env['SMTP_USER'],
  SMTP_PASS: process.env['SMTP_PASS'],
  GOOGLE_ANALYTICS_ID: process.env['GOOGLE_ANALYTICS_ID'],
  MIXPANEL_TOKEN: process.env['MIXPANEL_TOKEN'],
};

let config: z.infer<typeof envSchema>;

try {
  config = envSchema.parse(envVars);
} catch (error) {
  console.error('❌ Invalid environment variables:', error);
  process.exit(1);
}

export { config };

// Export individual configs for convenience
export const {
  NODE_ENV,
  PORT,
  FRONTEND_URL,
  BACKEND_URL,
  DATABASE_URL,
  REDIS_URL,
  JWT_SECRET,
  OPENAI_API_KEY,
  STABILITY_API_KEY,
} = config;