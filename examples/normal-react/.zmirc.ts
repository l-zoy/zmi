import { defineConfig } from 'zmi'

export default defineConfig({
  title: 'zmi',
  frameOptions: {},
  devServer: {
    https: true
  },
  chainWebpack: function (config) {
    config.merge({
      optimization: {
        splitChunks: {
          chunks: 'async',
          minSize: 20000,
          minChunks: 1,
          automaticNameDelimiter: '.',
          cacheGroups: {
            vendors: {
              test: /[\\/]node_modules[\\/]/,
              name: 'nodeModules',
              priority: -10,
              reuseExistingChunk: true
            }
          }
        }
      }
    })
  },
  metas: [
    {
      name: 'keywords',
      content: 'zmi, zmi-cli'
    }
  ],

  scripts: [`console.log('hello zmi');`, { src: './foo.js' }],
  styles: [`body { color: red;margin:0 }`]
})
