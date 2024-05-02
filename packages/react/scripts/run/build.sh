set -e

# Cleanup old artifacts
rm -rf ./lib ./temp/tsc

# Actual build process
yarn bundle && yarn types && yarn api && yarn --cwd ../.. insert-doc-variables react

# Copy index.mjs to 'temp/' and change extension to '.js'
mkdir -p ./temp/test-builds
cp -rf ./lib/es/index.mjs ./temp/test-builds/es-min.js
