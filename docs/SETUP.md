# TrendCraft Studio - Development Setup Guide

## Prerequisites

Make sure you have the following installed:

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **npm** or **yarn** package manager
- **PostgreSQL** 14+ ([Download](https://www.postgresql.org/download/))
- **Redis** 6+ ([Download](https://redis.io/download))
- **Git** ([Download](https://git-scm.com/downloads))

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/Psychess/Creador-de-Contenido-.git
cd Creador-de-Contenido-
```

### 2. Environment Setup

Copy the environment template:

```bash
cp .env.example .env
```

Update the `.env` file with your configuration:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/trendcraft_studio"
REDIS_URL="redis://localhost:6379"

# JWT Secret (generate a strong secret)
JWT_SECRET="your-super-secret-jwt-key-here"

# AI Services (optional for development)
OPENAI_API_KEY="your-openai-api-key"

# Social Media APIs (optional for development)
TWITTER_API_KEY="your-twitter-api-key"
INSTAGRAM_CLIENT_ID="your-instagram-client-id"
# ... other API keys
```

### 3. Database Setup

Create a PostgreSQL database:

```bash
createdb trendcraft_studio
```

### 4. Install Dependencies

Install frontend dependencies:
```bash
cd frontend
npm install
```

Install backend dependencies:
```bash
cd ../backend
npm install
```

Install service dependencies:
```bash
cd ../services/ai-engine
npm install

cd ../trend-aggregator
npm install

cd ../social-connectors
npm install
```

### 5. Start Development Servers

#### Option A: Start All Services (Recommended)

From the root directory:
```bash
# Terminal 1: Backend API
cd backend && npm run dev

# Terminal 2: Frontend
cd frontend && npm run dev

# Terminal 3: AI Engine Service
cd services/ai-engine && npm run dev
```

#### Option B: Using Process Manager

Install PM2 globally:
```bash
npm install -g pm2
```

Start all services:
```bash
pm2 start ecosystem.config.js
```

### 6. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **API Health Check**: http://localhost:3001/health

## Development Workflow

### Code Structure

```
TrendCraft-Studio/
├── frontend/          # Next.js React application  
├── backend/           # Express.js API server
├── services/          # Microservices
│   ├── ai-engine/     # AI content generation
│   ├── trend-aggregator/  # Trend data collection
│   └── social-connectors/ # Social platform APIs
├── shared/            # Shared types and utilities
├── docs/              # Documentation
└── config/            # Configuration files
```

### Frontend Development

The frontend is built with:
- **Next.js 14** with App Router
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Zustand** for state management
- **SWR** for data fetching

Key commands:
```bash
cd frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint
npm run type-check   # Check TypeScript types
```

### Backend Development

The backend uses:
- **Express.js** with TypeScript
- **Prisma** ORM for database operations
- **Redis** for caching
- **JWT** for authentication

Key commands:
```bash
cd backend
npm run dev          # Start with hot reloading
npm run build        # Build TypeScript
npm run start        # Start production server
npm run migrate      # Run database migrations
npm run generate     # Generate Prisma client
```

### Database Management

Run migrations:
```bash
cd backend
npx prisma migrate dev
```

Reset database:
```bash
npx prisma migrate reset
```

Seed database:
```bash
npm run db:seed
```

View database:
```bash
npx prisma studio
```

## Testing

### Frontend Tests
```bash
cd frontend
npm run test         # Run Jest tests
npm run test:watch   # Run tests in watch mode
```

### Backend Tests
```bash
cd backend
npm run test         # Run Jest tests
npm run test:watch   # Run in watch mode
```

### E2E Tests
```bash
npm run test:e2e     # Run Playwright tests
```

## Production Deployment

### Environment Variables

Ensure all production environment variables are set:

```env
NODE_ENV=production
DATABASE_URL=your_production_database_url
REDIS_URL=your_production_redis_url
JWT_SECRET=your_production_jwt_secret
# ... other production configs
```

### Build Commands

```bash
# Build frontend
cd frontend && npm run build

# Build backend
cd backend && npm run build

# Build services
cd services/ai-engine && npm run build
cd ../trend-aggregator && npm run build
cd ../social-connectors && npm run build
```

### Docker Deployment

Build and run with Docker Compose:

```bash
docker-compose up -d
```

### Deployment Platforms

The application can be deployed to:
- **Vercel** (Frontend)
- **Railway/Render** (Backend)
- **AWS/GCP/Azure** (Full stack)
- **Heroku** (Simplified setup)

## Troubleshooting

### Common Issues

1. **Port conflicts**: Change ports in `.env` file
2. **Database connection**: Check PostgreSQL is running
3. **Redis connection**: Check Redis is running
4. **Node version**: Ensure Node.js 18+

### Reset Everything

```bash
# Stop all processes
pm2 stop all

# Clear dependencies
rm -rf node_modules frontend/node_modules backend/node_modules

# Reinstall
npm install
cd frontend && npm install
cd ../backend && npm install

# Reset database
cd backend && npx prisma migrate reset
```

### Logs

View application logs:
```bash
# PM2 logs
pm2 logs

# Individual service logs
cd backend && npm run dev  # Check console output
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Run tests: `npm test`
5. Commit changes: `git commit -m 'Add feature'`
6. Push to branch: `git push origin feature-name`
7. Create a Pull Request

## Support

- **Documentation**: [docs.trendcraft-studio.com](https://docs.trendcraft-studio.com)
- **Issues**: [GitHub Issues](https://github.com/Psychess/Creador-de-Contenido-/issues)
- **Discord**: [Join our community](https://discord.gg/trendcraft)
- **Email**: support@trendcraft-studio.com