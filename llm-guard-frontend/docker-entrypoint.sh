#!/bin/sh
set -e

echo "Starting container setup..."

# Example: inject runtime env vars into a config file if needed
# envsubst < /usr/share/nginx/html/config.template.js > /usr/share/nginx/html/config.js

# Example: verify build output exists before starting
if [ ! -f /usr/share/nginx/html/index.html ]; then
  echo "ERROR: index.html not found in /usr/share/nginx/html"
  exit 1
fi

echo "Setup complete. Starting nginx..."

# Hand off control to nginx (replaces shell process, keeps signal handling correct)
exec nginx -g "daemon off;"