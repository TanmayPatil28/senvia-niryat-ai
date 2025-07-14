#!/bin/bash

echo "🚀 Setting up Senvia Niryat AI Development Environment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python is not installed. Please install Python 3.8+ first."
    exit 1
fi

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

echo "✅ Prerequisites check passed!"

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install client dependencies
echo "📦 Installing client dependencies..."
cd client && npm install && cd ..

# Install server dependencies
echo "📦 Installing server dependencies..."
cd server && npm install && cd ..

# Install Python dependencies for AI services
echo "🐍 Installing Python dependencies..."
cd ai-services
if command -v pip3 &> /dev/null; then
    pip3 install -r requirements.txt
else
    pip install -r requirements.txt
fi
cd ..

# Copy environment file
if [ ! -f .env ]; then
    echo "📋 Creating environment file..."
    cp .env.example .env
    echo "⚠️  Please update the .env file with your configuration!"
fi

echo "🎉 Setup complete!"
echo ""
echo "🚀 To start the development environment:"
echo "   npm run dev (starts all services)"
echo ""
echo "🐳 To use Docker:"
echo "   docker-compose up -d"
echo ""
echo "📚 Available endpoints:"
echo "   Frontend:    http://localhost:3000"
echo "   Backend API: http://localhost:5000"
echo "   AI Services: http://localhost:8000"
echo ""
echo "Happy coding! 🎯"
