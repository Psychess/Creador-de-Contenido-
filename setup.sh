#!/bin/bash

echo "🚀 Setting up TrendCraft Studio development environment..."

# Check for Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt "18" ]; then
    echo "❌ Node.js version 18+ is required. You have version $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "⚠️  Please update the .env file with your configuration before starting the services"
fi

# Install dependencies
echo "📦 Installing dependencies..."

echo "Installing frontend dependencies..."
cd frontend && npm install

echo "Installing backend dependencies..."
cd ../backend && npm install

echo "Installing AI engine dependencies..."
cd ../services/ai-engine && npm install

echo "Installing trend aggregator dependencies..."
cd ../trend-aggregator && npm install

echo "Installing social connectors dependencies..."
cd ../social-connectors && npm install

cd ../..

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update the .env file with your configuration"
echo "2. Set up PostgreSQL and Redis"
echo "3. Start the development servers:"
echo ""
echo "   # Terminal 1 - Backend API"
echo "   cd backend && npm run dev"
echo ""
echo "   # Terminal 2 - Frontend"
echo "   cd frontend && npm run dev"
echo ""
echo "   # Terminal 3 - AI Engine (optional)"
echo "   cd services/ai-engine && npm run dev"
echo ""
echo "4. Open http://localhost:3000 in your browser"
echo ""
echo "For more detailed setup instructions, see docs/SETUP.md"