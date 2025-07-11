#!/bin/bash
set -e

echo "🚀 Deployment started..."

cd ~/projects/oktaxis.co.uk || {
  echo "❌ Failed to access project directory"
  exit 1
}

echo "🧹 Cleaning local Git changes..."
git reset --hard HEAD
git clean -fd

echo "📥 Pulling latest changes from main..."
git pull --rebase origin main
echo "✅ New changes pulled!"

echo "📦 Installing dependencies..."
npm install --legacy-peer-deps

echo "🏗️ Creating production build..."
npm run build

echo "🔁 Reloading PM2 app..."
pm2 reload 0 --update-env

echo "✅ Deployment finished successfully!"
