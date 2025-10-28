# FuturePath - Push to GitHub PowerShell Script

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   FuturePath - Push to GitHub" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Git is installed
try {
    $gitVersion = git --version 2>&1
    Write-Host "[OK] Git is installed: $gitVersion" -ForegroundColor Green
    Write-Host ""
} catch {
    Write-Host "[ERROR] Git is not installed!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install Git first:" -ForegroundColor Yellow
    Write-Host "https://git-scm.com/download/windows" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Or use GitHub Desktop (easier):" -ForegroundColor Yellow
    Write-Host "https://desktop.github.com/" -ForegroundColor Yellow
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

# Initialize repository
Write-Host "[Step 1/5] Initializing Git repository..." -ForegroundColor Yellow
try {
    git init 2>&1 | Out-Null
    Write-Host "Repository initialized!" -ForegroundColor Green
} catch {
    Write-Host "Repository already exists, continuing..." -ForegroundColor Yellow
}
Write-Host ""

# Add all files
Write-Host "[Step 2/5] Adding all files..." -ForegroundColor Yellow
git add .
Write-Host "All files added!" -ForegroundColor Green
Write-Host ""

# Commit
Write-Host "[Step 3/5] Creating commit..." -ForegroundColor Yellow
try {
    git commit -m "Initial commit - FuturePath complete web application"
    Write-Host "Commit created!" -ForegroundColor Green
} catch {
    Write-Host "Commit created (or no changes to commit)!" -ForegroundColor Yellow
}
Write-Host ""

# Set main branch
Write-Host "[Step 4/5] Setting main branch..." -ForegroundColor Yellow
git branch -M main
Write-Host "Main branch set!" -ForegroundColor Green
Write-Host ""

# Add remote
Write-Host "[Step 5/5] Adding GitHub remote..." -ForegroundColor Yellow
$remoteExists = git remote | Select-String -Pattern "origin"
if ($remoteExists) {
    Write-Host "Remote already exists, updating..." -ForegroundColor Yellow
    git remote set-url origin https://github.com/youcefassidy/futurepath.git
} else {
    git remote add origin https://github.com/youcefassidy/futurepath.git
}
Write-Host "Remote configured!" -ForegroundColor Green
Write-Host ""

# Push
Write-Host "[Final Step] Pushing to GitHub..." -ForegroundColor Yellow
Write-Host ""
Write-Host "NOTE: You may need to enter your GitHub credentials." -ForegroundColor Cyan
Write-Host ""

$pushResult = git push -u origin main 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "   SUCCESS!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Your project has been pushed to GitHub!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Repository: " -NoNewline
    Write-Host "https://github.com/youcefassidy/futurepath" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Yellow
    Write-Host "1. Visit your repository on GitHub"
    Write-Host "2. Enable GitHub Pages in Settings"
    Write-Host "3. Your website will be live at:"
    Write-Host "   https://youcefassidy.github.io/futurepath/" -ForegroundColor Cyan
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "   ERROR" -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Red
    Write-Host ""
    Write-Host "Push failed! Common issues:" -ForegroundColor Red
    Write-Host ""
    Write-Host "1. Repository doesn't exist on GitHub" -ForegroundColor Yellow
    Write-Host "   - Go to github.com and create 'futurepath' repository first"
    Write-Host ""
    Write-Host "2. Authentication failed" -ForegroundColor Yellow
    Write-Host "   - Make sure you're logged in to GitHub"
    Write-Host "   - Try using GitHub Desktop instead (easier!)"
    Write-Host "   - Download: https://desktop.github.com/"
    Write-Host ""
    Write-Host "3. Permission denied" -ForegroundColor Yellow
    Write-Host "   - Check that the repository URL is correct"
    Write-Host "   - Make sure you have write access"
    Write-Host ""
    Write-Host "Error details:" -ForegroundColor Yellow
    Write-Host $pushResult
    Write-Host ""
}

Write-Host ""
Read-Host "Press Enter to exit"

