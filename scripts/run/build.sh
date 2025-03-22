set -e

ECHO "Building core package..."
yarn --cwd ./packages/core build

ECHO "Building react package..."
yarn --cwd ./packages/react build

ECHO "Building docs..."
yarn --cwd ./packages/docs build
