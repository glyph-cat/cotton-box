set -e

ECHO "Testing core package..."
yarn --cwd ./packages/core test

ECHO "Testing react package..."
yarn --cwd ./packages/react test

ECHO "Testing docs..."
yarn --cwd ./packages/docs test

