# TrendCraft Studio API Documentation

## Overview

The TrendCraft Studio API provides endpoints for trending content analysis, AI-powered content generation, and social media management. This RESTful API is built with Express.js and TypeScript.

## Base URL

- **Development**: `http://localhost:3001/api`
- **Production**: `https://api.trendcraft-studio.com/api`

## Authentication

Most endpoints require authentication via JWT tokens. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Rate Limiting

- **Free Tier**: 100 requests per 15 minutes
- **Pro Tier**: 1000 requests per 15 minutes  
- **Enterprise**: Custom limits

## Response Format

All API responses follow this structure:

```json
{
  "success": boolean,
  "data": any,
  "error": string | null,
  "message": string | null,
  "timestamp": string,
  "pagination": {
    "page": number,
    "limit": number,
    "total": number,
    "hasNext": boolean,
    "hasPrevious": boolean
  }
}
```

## Endpoints

### Trends API

#### GET /trends
Get trending topics across platforms with filtering options.

**Query Parameters:**
- `platforms` (string, optional): Comma-separated list of platforms (tiktok,instagram,twitter,youtube,facebook,linkedin)
- `categories` (string, optional): Comma-separated list of categories
- `regions` (string, optional): Comma-separated list of region codes
- `timeRange` (string, optional): Time range (hour,day,week,month)
- `sortBy` (string, optional): Sort field (volume,growth,engagement,recent)
- `sortOrder` (string, optional): Sort order (asc,desc)
- `page` (number, optional): Page number for pagination
- `limit` (number, optional): Results per page (max 100)

**Example Request:**
```
GET /api/trends?platforms=tiktok,instagram&categories=Technology&sortBy=volume&sortOrder=desc
```

**Example Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "title": "AI Revolution in Content Creation",
      "platform": "tiktok",
      "hashtags": ["ai", "contentcreation", "viral", "tech"],
      "volume": 125000,
      "growth": 15.7,
      "category": "Technology",
      "region": "US",
      "thumbnail": "https://example.com/thumb.jpg",
      "engagement": {
        "likes": 45000,
        "shares": 12000,
        "comments": 8500
      },
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T12:45:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 1,
    "hasNext": false,
    "hasPrevious": false
  },
  "timestamp": "2024-01-15T14:30:00Z"
}
```

#### GET /trends/platform/:platform
Get trends for a specific platform.

#### GET /trends/search
Search trends by keywords.

**Query Parameters:**
- `q` (string, required): Search query

#### GET /trends/:id
Get a specific trend by ID.

### Content Generation API

#### POST /content/generate
Generate content based on specified parameters.

**Request Body:**
```json
{
  "topic": "Content topic or trend title",
  "platforms": ["instagram", "twitter"],
  "tone": "casual",
  "contentType": "post",
  "targetAudience": "Young professionals",
  "keywords": ["AI", "productivity", "innovation"],
  "hashtags": ["#AI", "#productivity"],
  "cta": "Visit our website for more",
  "characterLimit": 280
}
```

#### POST /content/optimize
Optimize existing content for specific platforms.

#### GET /content/templates
Get available content templates.

### Export API

#### POST /export/text
Export content as plain text.

#### POST /export/media
Export content with media assets.

### Publishing API

#### POST /publish/:platform
Publish or schedule content to a specific platform.

#### GET /publish/status/:id
Get publishing status of scheduled content.

### Analytics API

#### GET /analytics/performance
Get performance metrics for published content.

#### GET /analytics/trends
Get trending analysis and insights.

### User API

#### GET /user/profile
Get user profile information.

#### PUT /user/preferences
Update user preferences.

#### GET /user/accounts
Get connected social media accounts.

## Error Codes

- `400` - Bad Request: Invalid request parameters
- `401` - Unauthorized: Authentication required
- `403` - Forbidden: Access denied
- `404` - Not Found: Resource not found
- `409` - Conflict: Resource already exists
- `422` - Unprocessable Entity: Validation failed
- `429` - Too Many Requests: Rate limit exceeded
- `500` - Internal Server Error: Server error
- `503` - Service Unavailable: External service unavailable

## SDKs and Libraries

### JavaScript/TypeScript
```bash
npm install @trendcraft/api-client
```

### Python
```bash
pip install trendcraft-api
```

### PHP
```bash
composer require trendcraft/api-client
```

## Webhooks

Configure webhooks to receive real-time notifications:

- Trend alerts
- Content generation completion
- Publishing status updates
- Analytics reports

## Support

- Documentation: https://docs.trendcraft-studio.com
- Support: support@trendcraft-studio.com
- Discord: https://discord.gg/trendcraft