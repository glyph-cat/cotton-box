set -e

yarn lint
yarn debug
yarn build
yarn test
yarn pack
