import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import webpackBundleAnalyzer from 'webpack-bundle-analyzer'
import ProgressBarPlugin from 'progress-bar-webpack-plugin'
import miniCssExtractPlugin from 'mini-css-extract-plugin'
import { chalk, deepmerge, isWin } from '@zmi-cli/utils'
import esLintWebpackPlugin from 'eslint-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack from 'webpack'
import path from 'path'

import VueClientWebpackPlugin from './VueClientWebpackPlugin'
import type { IPenetrateOptions } from './types'
import terserOptions from './terserOptions'
import PrettierHtml from './PrettierHtml'
import formatter from './eslintFormatter'

function applyPlugin(options: IPenetrateOptions) {
  const {
    webpackConfig,
    isTypescript,
    htmlContent,
    sourceMap,
    isReact,
    useHash,
    isProd,
    config,
    isVue,
    isDev,
    hot,
    cwd,
    pkg
  } = options

  const disableCompress = isProd && process.env.COMPRESS === 'none'

  webpackConfig.when(process.env.ZMI_TEST !== 'true', (WConfig) => {
    WConfig.plugin('ProgressBarPlugin').use(ProgressBarPlugin, [
      {
        total: 15,
        summary: false,
        complete: '▇',
        format: `${isWin ? '⭐' : '🚧'}  ${chalk.cyan(':bar ')}${chalk.cyan(
          ':percent'
        )}  ${chalk.grey('( :elapseds )')}`,
        customSummary: (time) => {
          console.log(chalk.blue(`${isWin ? '✨' : '🎯'} time ${time} \n`))
        }
      }
    ])
  })

  const forkTsCheckerOpt: Record<string, any> = {
    async: false,
    typescript: {
      extensions: {
        vue: {
          enabled: true,
          compiler: '@vue/compiler-sfc'
        }
      },
      configFile: `${cwd}/tsconfig.json`,
      diagnosticOptions: {
        semantic: true
      }
    }
  }

  let reactVersion
  if (isReact) {
    const { react } = pkg.dependencies
    delete forkTsCheckerOpt.typescript.extensions

    if (isNaN(Number(react.charAt(0)))) {
      reactVersion = react.replace(react.charAt(0), '')
    } else {
      reactVersion = react
    }
  }

  webpackConfig.plugin('esLintWebpackPlugin').use(esLintWebpackPlugin, [
    {
      extensions: ['js', 'mjs', 'jsx', 'ts', 'tsx', 'vue'],
      formatter,
      eslintPath: require.resolve('eslint'),
      context: cwd,
      cwd,
      cache: true,
      failOnError: isDev,
      resolvePluginsRelativeTo: __dirname,
      cacheLocation: path.resolve(`${cwd}/node_modules`, '.cache/.eslintcache'),
      baseConfig: {
        extends: [
          require.resolve(isTypescript ? 'eslint-config-zmi/typescript' : 'eslint-config-zmi/base'),
          require.resolve(isReact ? 'eslint-config-zmi/react' : 'eslint-config-zmi/vue')
        ],
        settings: isReact
          ? {
              react: {
                version: reactVersion
              }
            }
          : {}
      }
    }
  ])

  webpackConfig.plugin('define').use(webpack.DefinePlugin, [config.define])

  webpackConfig.when(isTypescript, (WConfig) => {
    WConfig.plugin('ForkTsChecker').use(ForkTsCheckerWebpackPlugin, [forkTsCheckerOpt])
  })

  // Turn on react fast refresh
  // Official implementation
  // And also added in cra 4.0
  // https://github.com/pmmmwh/react-refresh-webpack-plugin
  webpackConfig.when(isReact && isDev && hot, (WConfig) => {
    WConfig.plugin('hmr').use(ReactRefreshWebpackPlugin)
  })

  webpackConfig.when(
    disableCompress,
    (WConfig) => {
      WConfig.optimization.minimize(false)
    },
    (WConfig) => {
      WConfig.optimization.minimizer('terser').use(require.resolve('terser-webpack-plugin'), [
        {
          terserOptions: deepmerge(terserOptions, config.terserOptions),
          extractComments: false,
          parallel: true
        }
      ])

      WConfig.optimization
        .minimizer('css-minimizer')
        .use(require.resolve('css-minimizer-webpack-plugin'), [{ sourceMap }])
    }
  )

  webpackConfig.when(
    isProd,
    (WConfig) => {
      WConfig.plugin('extract-css').use(miniCssExtractPlugin, [
        { filename: `${useHash}.css`, chunkFilename: `${[useHash]}.chunk.css` }
      ])

      if (process.env.ANALYZER) {
        webpackConfig
          .plugin('webpackBundleAnalyzer')
          .use(webpackBundleAnalyzer.BundleAnalyzerPlugin)
      }
    },
    (WConfig) => {
      WConfig.plugin('prettier-html').use(PrettierHtml)
    }
  )

  webpackConfig.when(config.ignoreMomentLocale, (WConfig) => {
    WConfig.plugin('ignore-moment-locale').use(webpack.IgnorePlugin, [
      { resourceRegExp: /^\.\/locale$/, contextRegExp: /moment$/ }
    ])
  })

  const omitKey = ['favicon', 'template', 'templateContent']
  omitKey.forEach((key) => {
    if (config.htmlPlugin[key]) {
      delete config.htmlPlugin[key]
    }
  })

  webpackConfig
    .plugin('HtmlWebpackPlugin')
    .use(HtmlWebpackPlugin, [deepmerge(config.htmlPlugin, { templateContent: htmlContent })])

  webpackConfig.when(isVue, (WConifg) => {
    if (isDev) {
      WConifg.plugin('vue-client').use(VueClientWebpackPlugin)
    }

    WConifg.plugin('vue-loader').use(require('vue-loader').VueLoaderPlugin)

    WConifg.plugin('define').use(webpack.DefinePlugin, [
      {
        // http://link.vuejs.org/feature-flags
        __VUE_OPTIONS_API__: 'true',
        __VUE_PROD_DEVTOOLS__: 'false'
      }
    ])
  })
}

export default applyPlugin
