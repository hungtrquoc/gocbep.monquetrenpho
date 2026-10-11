@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo === Trang thai thay doi ===
git status --short
echo.

git add .
git diff --cached --quiet
if %errorlevel%==0 (
    echo Khong co thay doi nao de publish.
    pause
    exit /b 0
)

for /f "delims=" %%t in ('powershell -NoProfile -Command "Get-Date -Format 'yyyy-MM-dd HH:mm:ss'"') do set NOW=%%t
echo Commit: Publish website %NOW%
git commit -m "Publish website %NOW%"
if errorlevel 1 (
    echo LOI khi commit.
    pause
    exit /b 1
)

git push
if errorlevel 1 (
    echo LOI khi push - kiem tra ket noi/quyen git.
    pause
    exit /b 1
)

echo.
echo === DA PUBLISH ===  Vercel se tu deploy sau 1-2 phut.
pause
