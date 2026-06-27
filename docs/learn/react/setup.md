# Setup

> :::info
React **19** (or above) is required.
:::

# Setup

:::info
React **19** (or above) is required.
:::

In order to use `cotton-box` with <Link href={DocConstants.REACT_DOCS_SITE}>React</Link>, we need to install `cotton-box-react`.

## Installation

### Through dependency manager (recommended)
<PackageManagerCommand>
npm install {DocConstants.CORE_PACKAGE_NAME}
// highlight-next-line
npm install {DocConstants.REACT_PACKAGE_NAME}
</PackageManagerCommand>

### With UNPKG

#### For development
```html
<script src="https://www.unpkg.com/{:CORE_PACKAGE_NAME:}@<VERSION>/dist/umd/index.js" crossorigin></script>
<!-- highlight-next-line -->
<script src="https://www.unpkg.com/{:REACT_PACKAGE_NAME:}@<VERSION>/dist/umd/index.js" crossorigin></script>
```

#### For production
```html
<script src="https://www.unpkg.com/{:CORE_PACKAGE_NAME:}@<VERSION>/dist/umd/index.min.js" crossorigin></script>
<!-- highlight-next-line -->
<script src="https://www.unpkg.com/{:REACT_PACKAGE_NAME:}@<VERSION>/dist/umd/index.min.js" crossorigin></script>
```

Then replace `<VERSION>` with the version that you need.
