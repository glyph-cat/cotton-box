# Setup

> <PackageManagerCommand>
npm install {DocConstants.CORE_PACKAGE_NAME}
</PackageManagerCommand>

# Setup

## Installation

### Through dependency manager (recommended)

<PackageManagerCommand>
npm install {DocConstants.CORE_PACKAGE_NAME}
</PackageManagerCommand>

### With UNPKG

#### For development
```html
<script src="https://www.unpkg.com/{:CORE_PACKAGE_NAME:}@<VERSION>/dist/umd/index.js" crossorigin></script>
```

#### For production
```html
<script src="https://www.unpkg.com/{:CORE_PACKAGE_NAME:}@<VERSION>/dist/umd/index.min.js" crossorigin></script>
```

Then replace `<VERSION>` with the version that you need.
