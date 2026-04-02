#!/usr/bin/env bash
# ToyCircle UWS — Full VPS bootstrap (run once as root or sudo user)
# Usage: bash setup-vps.sh
# Tested on Ubuntu 22.04 / 24.04

set -euo pipefail

REPO="https://github.com/romaroni/ToyStore.git"
BRANCH="claude/toy-sharing-app-vsTRo"
APP_DIR="/var/www/toycircle"
APP_PORT=3000
SERVER_IP="187.77.192.120"

# ── Colours ────────────────────────────────────────────────────────────────
GREEN='\033[0;32m'; CYAN='\033[0;36m'; RED='\033[0;31m'; NC='\033[0m'
step() { echo -e "\n${CYAN}▶ $1${NC}"; }
ok()   { echo -e "${GREEN}✓ $1${NC}"; }
die()  { echo -e "${RED}✗ $1${NC}"; exit 1; }

# ── Must run as root or with sudo ──────────────────────────────────────────
[[ $EUID -ne 0 ]] && die "Please run as root or with sudo: sudo bash setup-vps.sh"

# ── 1. System update ───────────────────────────────────────────────────────
step "1/6  Updating system packages"
apt-get update -qq && apt-get upgrade -y -qq
ok "System up to date"

# ── 2. Node.js 20 LTS ─────────────────────────────────────────────────────
step "2/6  Installing Node.js 20 LTS"
if command -v node &>/dev/null && node -e "process.exit(parseInt(process.version.slice(1)) >= 20 ? 0 : 1)" 2>/dev/null; then
  ok "Node.js $(node -v) already installed"
else
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash - -qq
  apt-get install -y nodejs -qq
  ok "Node.js $(node -v) installed"
fi

step "   Installing PM2 globally"
npm install -g pm2 --silent
ok "PM2 $(pm2 -v) installed"

# ── 3. Nginx ───────────────────────────────────────────────────────────────
step "3/6  Installing Nginx"
apt-get install -y nginx -qq
systemctl enable nginx
systemctl start nginx
ok "Nginx installed and running"

# ── 4. Clone repo & build ──────────────────────────────────────────────────
step "4/6  Cloning repository and building app"
if [[ -d "$APP_DIR/.git" ]]; then
  echo "   Repo already cloned — pulling latest..."
  git -C "$APP_DIR" fetch origin
  git -C "$APP_DIR" checkout "$BRANCH"
  git -C "$APP_DIR" pull origin "$BRANCH"
else
  git clone --branch "$BRANCH" "$REPO" "$APP_DIR"
fi

cd "$APP_DIR"
npm ci --silent
npm run build --silent
ok "Frontend built to dist/"

# ── 5. Nginx site config ───────────────────────────────────────────────────
step "5/6  Configuring Nginx"
cat > /etc/nginx/sites-available/toycircle <<NGINX
server {
    listen 80;
    server_name $SERVER_IP;

    # Gzip
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml text/javascript;

    location / {
        proxy_pass         http://localhost:$APP_PORT;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade \$http_upgrade;
        proxy_set_header   Connection 'upgrade';
        proxy_set_header   Host \$host;
        proxy_set_header   X-Real-IP \$remote_addr;
        proxy_set_header   X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}
NGINX

# Enable site, disable default
ln -sf /etc/nginx/sites-available/toycircle /etc/nginx/sites-enabled/toycircle
rm -f /etc/nginx/sites-enabled/default

nginx -t && systemctl reload nginx
ok "Nginx configured and reloaded"

# ── 6. PM2 ────────────────────────────────────────────────────────────────
step "6/6  Starting app with PM2"
cd "$APP_DIR"

# Stop existing instance if any
pm2 delete toycircle 2>/dev/null || true

pm2 start ecosystem.config.cjs --env production
pm2 save

# Register PM2 to start on reboot
pm2 startup systemd -u root --hp /root | tail -1 | bash
ok "PM2 running and registered for auto-start on reboot"

# ── Done ──────────────────────────────────────────────────────────────────
echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}  ToyCircle UWS is live!${NC}"
echo -e "${GREEN}  Open: http://$SERVER_IP${NC}"
echo ""
echo -e "  Useful commands:"
echo -e "  pm2 status              — process health"
echo -e "  pm2 logs toycircle      — live logs"
echo -e "  cd $APP_DIR && bash deploy.sh   — redeploy after changes"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
