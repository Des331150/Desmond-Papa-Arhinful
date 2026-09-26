#!/usr/bin/env bash
# One-shot publish: push this repo to GitHub and deploy to Vercel.
#
# Prerequisites (run once, interactively):
#   gh auth login
#   npm i -g vercel && vercel login
#
# Then:  ./deploy.sh
set -euo pipefail

REPO_SLUG="${REPO_SLUG:-Desmond-Papa-Arhinful}"
GITHUB_USER="${GITHUB_USER:-Des331150}"
REPO_FULL="$GITHUB_USER/$REPO_SLUG"

cd "$(dirname "$0")"

step() { printf '\n\033[1m==> %s\033[0m\n' "$1"; }

step "Preflight"
command -v gh >/dev/null || { echo "gh not installed: https://cli.github.com"; exit 1; }
command -v vercel >/dev/null || { echo "vercel not installed: npm i -g vercel"; exit 1; }
gh auth status >/dev/null 2>&1 || { echo "Not logged in to GitHub. Run: gh auth login"; exit 1; }
echo "ok"

step "Commit anything outstanding"
git add -A
git diff --cached --quiet || git commit -m "Update site"

step "Create $REPO_FULL if it does not exist"
if gh repo view "$REPO_FULL" >/dev/null 2>&1; then
  echo "already exists"
else
  gh repo create "$REPO_FULL" --public --source=. --remote=origin \
    --description "Backend engineering portfolio — Python, FastAPI, Django, TypeScript" \
    --push
  echo "created"
fi

step "Ensure remote"
git remote get-url origin >/dev/null 2>&1 \
  || git remote add origin "git@github.com:$REPO_FULL.git"   # gh is configured for SSH

step "Push to main"
git push -u origin main

step "Deploy to Vercel"
if [ -d .vercel ]; then
  vercel --prod
else
  vercel --prod --yes
fi

step "Done"
vercel ls 2>/dev/null | head -5 || true
echo
echo "Live URL will be printed above. To link a custom domain:"
echo "  vercel domains add <your-domain> && vercel alias <default> <your-domain>"
