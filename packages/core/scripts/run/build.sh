set -e

# Cleanup old artifacts
rm -rf ./lib ./temp/tsc

# Actual build process
yarn bundle && yarn types && yarn api && yarn --cwd ../.. insert-doc-variables core

# A hacky patch:
# TS error occurs only in bundled type definitions because the some internals
# have been stripped off so TS is not aware that there is actually no problem
# with the code.
yarn tsx ./scripts/run/ts-patch

# Copy index.mjs to 'temp/' and change extension to '.js'
mkdir -p ./temp/test-builds
cp -rf ./lib/es/index.mjs ./temp/test-builds/es-min.js

# Copy important files from 'core' to 'react' package to mimic `yarn install`
mkdir -p ../react/node_modules/cotton-box
cp -rf ./lib ../react/node_modules/cotton-box
cp package.json ../react/node_modules/cotton-box
cp yarn.lock ../react/node_modules/cotton-box
