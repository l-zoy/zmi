/** @type {import('@docusaurus/types').DocusaurusConfig} */

module.exports = {
  title: 'Zmi-CLI',
  tagline: '🎃 通用的 React Vue miniapp-ts 开发工具.',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'zoy-l',
  projectName: 'zmi',
  themeConfig: {
    prism: {
      theme: require('prism-react-renderer/themes/github'),
      darkTheme: require('prism-react-renderer/themes/dracula')
    },
    navbar: {
      title: 'Zmi-CLI',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg'
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: '配置参考',
          position: 'left'
        },
        {
          href: 'https://github.com/l-zoy/zmi',
          label: 'GitHub',
          position: 'right'
        }
      ]
    }
  },
  presets: [
    [
      require.resolve('@docusaurus/preset-classic'),
      {
        docs: {
          sidebarPath: require.resolve('./src/sidebars.js')
          // editUrl: 'https://github.com/facebook/docusaurus/edit/master/website/'
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css')
        }
      }
    ]
  ]
}
