set -e

ECHO "Testing core package..."
yarn --cwd ./src/packages/core test

ECHO "Testing react package..."
yarn --cwd ./src/packages/react test

ECHO "Testing docs..."
yarn --cwd ./src/packages/docs test
