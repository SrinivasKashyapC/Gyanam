@echo off
echo ====================================
echo   Gnyaan Backend Server Setup
echo ====================================
echo.

echo Checking if Node.js is installed...
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed!
    echo Please download and install Node.js from https://nodejs.org
    pause
    exit /b 1
)

echo ✓ Node.js is installed
node --version
echo.

echo Checking if dependencies are installed...
if not exist "node_modules\" (
    echo Installing dependencies...
    echo This may take a minute...
    call npm install
    if errorlevel 1 (
        echo ERROR: Failed to install dependencies!
        pause
        exit /b 1
    )
    echo ✓ Dependencies installed successfully!
) else (
    echo ✓ Dependencies already installed
)
echo.

echo ====================================
echo   Starting Gnyaan Backend Server
echo ====================================
echo.
echo Server will start on http://localhost:3000
echo Press Ctrl+C to stop the server
echo.

call npm start
