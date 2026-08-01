#!/bin/bash
# One-command setup for working on the family tree site from a new Mac.
#
# Run it with:
#   curl -fsSL https://raw.githubusercontent.com/kaoshotbeatz-ops/family-tree-site/main/scripts/mac-setup.sh | bash
# or, if you already cloned the repo:
#   bash scripts/mac-setup.sh
#
# Safe to re-run: everything already installed is skipped.

set -e

echo "==> Setting up this Mac for the family tree site..."

# 1. Homebrew (the Mac package manager everything else installs through)
if ! command -v brew >/dev/null 2>&1; then
  echo "==> Installing Homebrew..."
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
  # Put brew on PATH for Apple Silicon Macs
  if [ -x /opt/homebrew/bin/brew ]; then
    eval "$(/opt/homebrew/bin/brew shellenv)"
    grep -q 'brew shellenv' ~/.zprofile 2>/dev/null || \
      echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
  fi
else
  echo "==> Homebrew already installed."
fi

# 2. Git and the GitHub CLI (for pushing changes and managing the repo)
echo "==> Installing git and gh..."
brew list git >/dev/null 2>&1 || brew install git
brew list gh  >/dev/null 2>&1 || brew install gh

# 3. Visual Studio Code (editor)
if [ ! -d "/Applications/Visual Studio Code.app" ]; then
  echo "==> Installing Visual Studio Code..."
  brew install --cask visual-studio-code
else
  echo "==> VS Code already installed."
fi

# 4. Node.js (needed by Claude Code)
brew list node >/dev/null 2>&1 || brew install node

# 5. Claude Code CLI
if ! command -v claude >/dev/null 2>&1; then
  echo "==> Installing Claude Code..."
  npm install -g @anthropic-ai/claude-code
else
  echo "==> Claude Code already installed."
fi

# 6. Clone the site repo if it isn't here yet
REPO_DIR="$HOME/family-tree-site"
if [ ! -d "$REPO_DIR/.git" ] && [ ! -d "./.git" ]; then
  echo "==> Cloning the site repo to $REPO_DIR..."
  git clone https://github.com/kaoshotbeatz-ops/family-tree-site.git "$REPO_DIR"
fi

echo ""
echo "==> Done! Two manual steps remain:"
echo "    1. Sign in to GitHub:   gh auth login"
echo "    2. Sign in to Claude:   claude   (follow the login prompt)"
echo ""
echo "To preview the site locally, run this inside the repo folder:"
echo "    python3 -m http.server 8000    # then open http://localhost:8000"
