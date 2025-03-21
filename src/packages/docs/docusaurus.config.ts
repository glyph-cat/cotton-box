import type * as Preset from '@docusaurus/preset-classic'
import type { Config } from '@docusaurus/types'
import { themes as prismThemes } from 'prism-react-renderer'

import { DocConstants } from './src/constants'

const config: Config = {
  title: DocConstants.DISPLAY_PACKAGE_NAME,
  tagline: DocConstants.PACKAGE_DESCRIPTION,
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: DocConstants.GLYPH_CAT_GITHUB_IO,
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: `/${DocConstants.CORE_PACKAGE_NAME}`,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'glyph-cat', // Usually your GitHub org/user name.
  projectName: DocConstants.CORE_PACKAGE_NAME, // Usually your repo name.
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          sidebarCollapsed: false,
          editUrl: `${DocConstants.GITHUB_REPO_URL}/tree/main/packages/docs`,
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    algolia: {
      appId: 'I8EAQVNXNC',
      apiKey: '766b0a459e06e2faaabc86ce8215e9fa',
      indexName: 'glyph-catio',
      contextualSearch: false, // TOFIX: 'docusaurus_tag' does not appear in crawled index

      // KIV: [Low priority] Still not sure what this does
      // but take note that the docs site is hosted at '.../cotton-box/'
      // // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl. You can use regexp or string in the `from` param. For example: localhost:3000 vs myCompany.com/docs
      // replaceSearchResultPathname: {
      //   from: '/docs/', // or as RegExp: /\/docs\//
      //   to: '/',
      // },

      searchParameters: {},
      searchPagePath: 'search',
      insights: false,
    },
    colorMode: {
      respectPrefersColorScheme: true,
    },
    image: 'img/social-card.jpg',
    docs: {
      sidebar: {
        autoCollapseCategories: false,
      },
    },
    navbar: {
      title: DocConstants.DISPLAY_PACKAGE_NAME,
      logo: {
        alt: 'Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'learnSidebar',
          position: 'left',
          label: 'Learn',
        },
        {
          type: 'docSidebar',
          sidebarId: 'apiSidebar',
          label: 'API',
          position: 'left',
        },
        {
          to: '/blog',
          label: 'Blog',
          position: 'left',
        },
        {
          href: DocConstants.GITHUB_REPO_URL,
          label: 'GitHub',
          position: 'right',
        },
        // {
        //   type: 'docsVersionDropdown',
        // },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        // {
        //   title: 'Docs',
        //   items: [
        //     {
        //       label: 'Tutorial',
        //       to: '/docs',
        //     },
        //   ],
        // },
        // {
        //   title: 'Community',
        //   items: [
        //     {
        //       label: 'Stack Overflow',
        //       href: `https://stackoverflow.com/questions/tagged/${DocConstants.CORE_PACKAGE_NAME}`,
        //     },
        //     {
        //       label: 'Discord',
        //       href: 'https://discordapp.com/invite/...',
        //     },
        //   ],
        // },
        // {
        //   title: 'More',
        //   items: [
        //     {
        //       label: 'Blog',
        //       to: '/blog',
        //     },
        //     {
        //       label: 'GitHub',
        //       href: DocConstants.GITHUB_REPO_URL,
        //     },
        //   ],
        // },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} GlyphCat`,
    },
    prism: {
      theme: prismThemes.vsLight,
      darkTheme: prismThemes.vsDark,
    },
  } satisfies Preset.ThemeConfig,
}

export default config
