# Temporary solution, since core package and react package are the most important.
# ESLint is reporting errors everywhere and ignoring nested config files when run from the root.
# At least the errors are not showing in VS Code, so the editing experience is unaffected.

yarn --cwd ./src/packages/core lint
yarn --cwd ./src/packages/react lint
