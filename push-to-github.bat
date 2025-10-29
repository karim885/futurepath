@echo off
echo ========================================
echo   FuturePath - Push to GitHub
echo ========================================
echo.

:: Check if Git is installed
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Git is not installed!
    echo.
    echo Please install Git first:
    echo https://git-scm.com/download/windows
    echo.
    echo Or use GitHub Desktop instead:
    echo https://desktop.github.com/
    echo.
    pause
    exit /b 1
)

echo [OK] Git is installed!
echo.

:: Initialize repository
echo [Step 1/5] Initializing Git repository...
git init
if %errorlevel% neq 0 (
    echo Repository already exists, continuing...
)
echo.

:: Add all files
echo [Step 2/5] Adding all files...
git add .
echo.

:: Commit
echo [Step 3/5] Creating commit...
git commit -m "Initial commit - FuturePath complete web application"
echo.

:: Set main branch
echo [Step 4/5] Setting main branch...
git branch -M main
echo.

:: Add remote (check if already exists)
git remote | findstr origin >nul
if %errorlevel% neq 0 (
    echo [Step 5/5] Adding GitHub remote...
    git remote add origin https://github.com/youcefassidy/futurepath.git
) else (
    echo [Step 5/5] Remote already exists, updating...
    git remote set-url origin https://github.com/youcefassidy/futurepath.git
)
echo.

:: Push
echo [Final Step] Pushing to GitHub...
echo.
echo NOTE: You may need to enter your GitHub credentials.
echo.
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo   SUCCESS! 
    echo ========================================
    echo.
    echo Your project has been pushed to GitHub!
    echo.
    echo Repository: https://github.com/youcefassidy/futurepath
    echo.
    echo Next steps:
    echo 1. Visit your repository on GitHub
    echo 2. Enable GitHub Pages in Settings
    echo 3. Your website will be live at:
    echo    https://youcefassidy.github.io/futurepath/
    echo.
) else (
    echo.
    echo ========================================
    echo   ERROR
    echo ========================================
    echo.
    echo Push failed! Common issues:
    echo.
    echo 1. Repository doesn't exist on GitHub
    echo    - Go to github.com and create it first
    echo.
    echo 2. Authentication failed
    echo    - Make sure you're logged in
    echo    - Try GitHub Desktop instead
    echo.
    echo 3. Permission denied
    echo    - Check repository URL is correct
    echo.
)

echo.
pause


