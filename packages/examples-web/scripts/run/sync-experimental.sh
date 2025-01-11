# Copy important files from 'core' to 'react' package to mimic `yarn install`
# as it might be removed by yarn after running `yarn install` since it is not
# specified in package.json

if [ -d ../core/lib ]; then

  mkdir -p ./node_modules/cotton-box
  cp -rf ../core/lib ./node_modules/cotton-box
  cp ../core/package.json ./node_modules/cotton-box
  cp ../core/yarn.lock ./node_modules/cotton-box

  mkdir -p ./node_modules/cotton-box-react
  cp -rf ../react/lib ./node_modules/cotton-box-react
  cp ../react/package.json ./node_modules/cotton-box-react
  cp ../react/yarn.lock ./node_modules/cotton-box-react

fi
