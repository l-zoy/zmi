import type { IPenetrateOptions } from './types'
import getBabelOpts from './getBabelOptions'

async function applyLoader(options: IPenetrateOptions) {
  const {
    modifyBabelPresetOpts,
    modifyBabelOpts,
    webpackConfig,
    isTypescript,
    sourceMap,
    targets,
    isProd,
    config,
    isVue,
    isDev,
    hot,
    cwd,
    env
  } = options

  const genAssetSubPath = (dir: string) => `${dir}/[name].[hash:8].[ext]`

  const genUrlLoaderOptions = (dir: string) => ({
    limit: 4096,
    esModule: false,
    fallback: {
      loader: require.resolve('file-loader'),
      options: {
        name: genAssetSubPath(dir),
        esModule: false
      }
    }
  })

  let presetOpts = {
    dynamicImportNode: config.dynamicImport,
    autoCSSModules: config.autoCSSModules,
    typescript: !isVue && isTypescript,
    type: config.frameType,
    env: { targets },
    nodeEnv: env,
    sourceMap,
    isProd,
    isDev
  }

  modifyBabelPresetOpts && (presetOpts = await modifyBabelPresetOpts(presetOpts))
  let babelOpts = getBabelOpts({ config, presetOpts, hot })
  modifyBabelOpts && (babelOpts = await modifyBabelOpts(babelOpts))

  webpackConfig.module
    .rule('js')
    .test(/\.(js|mjs|jsx|ts|tsx)$/)
    .include.add(cwd)
    .end()
    .exclude.add(/node_modules/)
    .end()
    .use('babel-loader')
    .loader(require.resolve('babel-loader'))
    .options(babelOpts)

  webpackConfig.module
    .rule('images')
    .test(/\.(png|jpe?g|gif|webp|ico)(\?.*)?$/)
    .use('url-loader')
    .loader(require.resolve('url-loader'))
    .options(genUrlLoaderOptions('img'))

  // https://github.com/facebookincubator/create-react-app/pull/1180
  webpackConfig.module
    .rule('svg')
    .test(/\.(svg)(\?.*)?$/)
    .use('file-loader')
    .loader(require.resolve('file-loader'))
    .options({
      name: genAssetSubPath('img'),
      esModule: false
    })

  webpackConfig.module
    .rule('fonts')
    .test(/\.(woff2?|eot|ttf|otf)(\?.*)?$/i)
    .use('url-loader')
    .loader(require.resolve('url-loader'))
    .options(genUrlLoaderOptions('fonts'))

  webpackConfig.module
    .rule('media')
    .test(/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/)
    .use('url-loader')
    .loader(require.resolve('url-loader'))
    .options(genUrlLoaderOptions('media'))

  webpackConfig.module
    .rule('plaintext')
    .test(/\.(txt|text|md)$/)
    .use('raw-loader')
    .loader(require.resolve('raw-loader'))

  webpackConfig.when(isVue, (WConifg) => {
    WConifg.module
      .rule('vue')
      .test(/\.vue$/)
      .use('vue-loader')
      .loader(require.resolve('vue-loader'))
      .options({ hotReload: hot, prettify: false })

    if (isTypescript) {
      const tsRule = WConifg.module.rule('ts').test(/\.ts$/)
      const tsxRule = WConifg.module.rule('tsx').test(/\.tsx$/)

      const addLoader = ({
        name,
        loader,
        options
      }: {
        name: string
        loader: string
        options: Record<string, any>
      }) => {
        tsRule.use(name).loader(loader).options(options)
        tsxRule.use(name).loader(loader).options(options)
      }

      addLoader({
        name: 'ts-loader',
        loader: require.resolve('ts-loader'),
        options: {
          transpileOnly: true,
          appendTsSuffixTo: ['\\.vue$']
        }
      })
      // make sure to append TSX suffix
      tsxRule
        .use('ts-loader')
        .loader(require.resolve('ts-loader'))
        .tap((options) => {
          options = { ...options }
          delete options.appendTsSuffixTo
          options.appendTsxSuffixTo = ['\\.vue$']
          return options
        })
    }
  })
}

export default applyLoader
