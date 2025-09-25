# TrendCraft Studio - Social Content Creator

## Overview

TrendCraft Studio is a comprehensive social content creation platform that helps users create viral content by leveraging real-time trend analysis and AI-powered content generation.

## Architecture

The application is built with a modular architecture consisting of:

### 🎯 Core Modules

#### 1. **Dashboard de Tendencias** (Trends Dashboard)
- Real-time integration with trending APIs (TikTok, Google Trends, YouTube, Twitter/X)
- Visual trend display with filters by platform, category, and region
- Quick action buttons to start content creation with pre-loaded trends

#### 2. **Pantalla de Personalización** (Customization Screen)
- Custom content creation form with platform-specific options
- Tone/voice selection, character limits, CTAs, and keyword targeting
- Multi-platform content optimization

#### 3. **Motor de Generación de Contenido** (AI Content Engine)
- Integration with advanced language models (GPT-4) and media generators
- Multi-platform content optimization and variation generation
- Automated script, text, and description generation

#### 4. **Editor y Vista Previa** (Editor & Preview)
- Visual platform simulators for content preview
- Basic text editor with template selection
- Real-time preview across different social platforms

#### 5. **Exportación y Publicación** (Export & Publishing)
- Multiple export options (clipboard, download, direct sharing)
- Content scheduling and publishing automation
- Asset management and organization

## Project Structure

```
TrendCraft-Studio/
├── frontend/                 # React/Next.js frontend application
│   ├── components/           # Reusable UI components
│   │   ├── dashboard/        # Trending dashboard components
│   │   ├── editor/           # Content editor components
│   │   ├── preview/          # Platform preview simulators
│   │   └── common/           # Shared components
│   ├── pages/                # Application pages/routes
│   ├── hooks/                # Custom React hooks
│   ├── services/             # API service integrations
│   └── utils/                # Utility functions
├── backend/                  # Node.js/Express backend API
│   ├── controllers/          # API route controllers
│   ├── services/             # Business logic services
│   ├── models/               # Data models
│   ├── middleware/           # Express middleware
│   └── routes/               # API route definitions
├── services/                 # External service integrations
│   ├── ai-engine/            # AI content generation service
│   ├── trend-aggregator/     # Trend data collection service
│   └── social-connectors/    # Social platform API integrations
├── shared/                   # Shared types and utilities
│   ├── types/                # TypeScript type definitions
│   └── constants/            # Application constants
├── docs/                     # Documentation
└── config/                   # Configuration files
```

## Tech Stack

### Frontend
- **Framework**: React with Next.js
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **UI Components**: Shadcn/ui
- **Charts**: Recharts

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Caching**: Redis

### AI & External Services
- **AI Models**: OpenAI GPT-4, Stability AI
- **Trend APIs**: TikTok Creative Center, Google Trends, YouTube Data API
- **Social APIs**: Twitter API v2, Instagram Basic Display API

## Features

### ✨ Trending Dashboard
- Real-time trend aggregation from multiple platforms
- Interactive filtering by platform, category, region
- Trend analytics with engagement metrics
- One-click content creation from trends

### 🎨 Content Creation
- AI-powered content generation for multiple platforms
- Platform-specific optimization (character limits, hashtags, CTAs)
- Tone and voice customization
- Keyword and hashtag suggestions

### 👀 Visual Editor & Preview
- Platform simulators (TikTok, Instagram, Twitter, etc.)
- Template library with customization options
- Real-time preview and editing
- Asset management and media integration

### 📤 Export & Publishing
- Multiple export formats (text, images, videos)
- Direct publishing to social platforms
- Content scheduling and automation
- Performance tracking and analytics

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Redis 6+

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Psychess/Creador-de-Contenido-.git
cd Creador-de-Contenido-
```

2. Install dependencies:
```bash
# Install frontend dependencies
cd frontend && npm install

# Install backend dependencies
cd ../backend && npm install

# Install service dependencies
cd ../services/ai-engine && npm install
cd ../trend-aggregator && npm install
cd ../social-connectors && npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Set up the database:
```bash
cd backend
npx prisma migrate dev
npx prisma generate
```

5. Start the development servers:
```bash
# Start backend (terminal 1)
cd backend && npm run dev

# Start frontend (terminal 2)
cd frontend && npm run dev

# Start AI engine service (terminal 3)
cd services/ai-engine && npm run dev
```

## API Documentation

### Trends API
- `GET /api/trends` - Get trending topics across platforms
- `GET /api/trends/platform/:platform` - Get platform-specific trends
- `GET /api/trends/search` - Search trends by keywords

### Content Generation API
- `POST /api/content/generate` - Generate content based on prompts
- `POST /api/content/optimize` - Optimize content for specific platforms
- `GET /api/content/templates` - Get available content templates

### Export API
- `POST /api/export/text` - Export content as text
- `POST /api/export/media` - Export content with media assets
- `POST /api/publish/:platform` - Publish directly to social platforms

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Roadmap

- [ ] Phase 1: Core architecture and trending dashboard
- [ ] Phase 2: AI content generation integration
- [ ] Phase 3: Visual editor and platform previews
- [ ] Phase 4: Publishing automation and scheduling
- [ ] Phase 5: Analytics and performance tracking
- [ ] Phase 6: Mobile application
- [ ] Phase 7: Advanced AI features and personalization

## Support

For support, email support@trendcraft-studio.com or join our [Discord community](https://discord.gg/trendcraft).