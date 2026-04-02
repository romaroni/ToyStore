#!/usr/bin/env bash
# ToyCircle UWS — VPS deployment script
# Run on your VPS: bash deploy.sh
# Assumes: Node.js 18+, PM2, Git are installed

set -e  # exit on any error

APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
echo "→ Deploying ToyCircle UWS from $APP_DIR"

# 1. Pull latest code
echo "→ Pulling latest code..."
git pull origin claude/toy-sharing-app-vsTRo

# 2. Install/update dependencies (production only)
echo "→ Installing dependencies..."
npm ci --omit=dev
# Also install devDependencies needed for the build step
npm ci

# 3. Build the React app
echo "→ Building frontend..."
npm run build

# 4. Start or reload with PM2
echo "→ Starting/reloading PM2..."
if pm2 list | grep -q "toycircle"; then
  pm2 reload ecosystem.config.cjs --env production
else
  pm2 start ecosystem.config.cjs --env production
  pm2 save   # persist across reboots
fi

echo ""
echo "✓ Deployed! ToyCircle UWS is running on port 3000."
echo "  Check status: pm2 status"
echo "  View logs:    pm2 logs toycircle"
