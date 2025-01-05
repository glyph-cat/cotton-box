set -e

# Loop through each subpackage and do `yarn install`
for item in ./packages/*; do
  if [ -d "$item" ]; then
    yarn --cwd $item install
  fi
done
