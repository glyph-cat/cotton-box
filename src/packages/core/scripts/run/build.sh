set -e

yarn clean
yarn bundle
yarn types
yarn api

yarn tsx ./scripts/run/insert-doc-variables

rm -r ./temp/tsc

# Copy index.mjs to 'temp/' and change extension to '.js'
mkdir -p ./temp/test-builds
cp -rf ./lib/es/index.mjs ./temp/test-builds/es-min.js

# # A hacky patch:
# # TS error occurs only in bundled type definitions because the some internals
# # have been stripped off so TS is not aware that there is actually no problem
# # with the code.
# yarn tsx ./scripts/run/ts-patch
