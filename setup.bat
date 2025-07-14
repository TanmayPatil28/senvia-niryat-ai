@echo off
echo 🚀 Setting up Senvia Niryat AI Development Environment...

:: Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    pause
    exit /b 1
)

:: Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Python is not installed. Please install Python 3.8+ first.
    pause
    exit /b 1
)

echo ✅ Prerequisites check passed!

:: Install root dependencies
echo 📦 Installing root dependencies...
call npm install

:: Install client dependencies
echo 📦 Installing client dependencies...
cd client
call npm install
cd ..

:: Install server dependencies
echo 📦 Installing server dependencies...
cd server
call npm install
cd ..

:: Install Python dependencies for AI services
echo 🐍 Installing Python dependencies...
cd ai-services
pip install -r requirements.txt
cd ..

:: Copy environment file
if not exist .env (
    echo 📋 Creating environment file...
    copy .env.example .env
    echo ⚠️  Please update the .env file with your configuration!
)

echo 🎉 Setup complete!
echo.
echo 🚀 To start the development environment:
echo    npm run dev (starts all services)
echo.
echo 📚 Available endpoints:
echo    Frontend:    http://localhost:3000
echo    Backend API: http://localhost:5000
echo    AI Services: http://localhost:8000
echo.
echo Happy coding! 🎯
pause
