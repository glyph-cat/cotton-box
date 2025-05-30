set -e

ECHO "Building core package..."
yarn --cwd ./src/packages/core build

ECHO "Building react package..."
yarn --cwd ./src/packages/react build

ECHO "Building docs..."
yarn --cwd ./src/packages/docs build
