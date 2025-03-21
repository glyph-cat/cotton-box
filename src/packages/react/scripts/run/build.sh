set -e

yarn clean
yarn bundle
yarn types
yarn api

NODE_ENV=production
yarn tsx ./scripts/run/insert-doc-variables

rm -r ./temp/tsc

# # Copy index.mjs to 'temp/' and change extension to '.js'
# mkdir -p ./temp/test-builds
# cp -rf ./lib/es/index.mjs ./temp/test-builds/es-min.js
