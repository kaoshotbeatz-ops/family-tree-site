#!/bin/bash
# Installs the apps Poli needs for school work on this Mac.
# Apps go into /Applications, so they're available on every user profile,
# including Poli's own login.
#
# Run with:
#   curl -fsSL -o school-setup.sh https://raw.githubusercontent.com/kaoshotbeatz-ops/family-tree-site/main/scripts/school-setup.sh
#   bash school-setup.sh
#
# Safe to re-run: anything already installed is skipped.

set -e

if ! command -v brew >/dev/null 2>&1; then
  if [ -x /opt/homebrew/bin/brew ]; then
    eval "$(/opt/homebrew/bin/brew shellenv)"
  else
    echo "Homebrew is missing — run scripts/mac-setup.sh first."
    exit 1
  fi
fi

install_app () {
  local cask="$1" app_path="$2" label="$3"
  if [ -d "$app_path" ]; then
    echo "==> $label already installed."
  else
    echo "==> Installing $label..."
    brew install --cask "$cask"
  fi
}

install_app google-chrome  "/Applications/Google Chrome.app"       "Google Chrome (browser most school sites expect)"
install_app zoom           "/Applications/zoom.us.app"             "Zoom (video classes/meetings)"
install_app google-drive   "/Applications/Google Drive.app"        "Google Drive for Desktop (school files sync)"
install_app libreoffice    "/Applications/LibreOffice.app"         "LibreOffice (free Word/Excel/PowerPoint-compatible suite)"

echo ""
echo "==> Done! All apps are in /Applications and available on every profile."
echo ""
echo "Next steps for Poli's profile:"
echo "  1. Create her account:  System Settings > Users & Groups > Add User"
echo "     (choose 'Standard', not Admin, for a kid's account)"
echo "  2. Log into her profile, open Chrome, and sign into her school Google"
echo "     account — that gives her Google Docs/Slides/Classroom in the browser."
echo "  3. Optional: System Settings > Screen Time to set app/content limits."
