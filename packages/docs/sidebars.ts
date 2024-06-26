import type { SidebarsConfig } from '@docusaurus/plugin-content-docs'

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  learnSidebar: [
    {
      type: 'category',
      label: 'Tutorial',
      link: {
        type: 'generated-index',
        slug: 'learn/tutorial',
      },
      items: [{
        type: 'autogenerated',
        dirName: 'learn/tutorial',
      }],
    },
    {
      type: 'category',
      label: 'Using with React',
      link: {
        type: 'generated-index',
        slug: 'learn/react',
      },
      items: [{
        type: 'autogenerated',
        dirName: 'learn/react',
      }],
    },
  ],
  apiSidebar: [
    {
      type: 'category',
      label: 'Core',
      link: {
        type: 'generated-index',
        slug: 'api/core',
      },
      items: [{
        type: 'autogenerated',
        dirName: 'api/core',
      }],
    },
    {
      type: 'category',
      label: 'React',
      link: {
        type: 'generated-index',
        slug: 'api/react',
      },
      items: [{
        type: 'autogenerated',
        dirName: 'api/react',
      }],
    },
    {
      type: 'category',
      label: 'Miscellaneous',
      link: {
        type: 'generated-index',
        slug: 'api/misc',
      },
      items: [{
        type: 'autogenerated',
        dirName: 'api/misc',
      }],
    },
  ],
}

export default sidebars
