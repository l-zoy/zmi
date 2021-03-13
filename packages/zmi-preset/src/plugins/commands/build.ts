import { IApi } from '@zmi-cli/types'

import { getBundleAndConfigs } from '../common/BundleUtils'

export default (api: IApi) => {
  api.registerCommand({
    name: 'build',
    description: 'build application production',
    async fn() {
      api.env = 'production'
      process.env.NODE_ENV = 'production'

      const { bundler, bundleConfigs } = await getBundleAndConfigs({ api })

      try {
        const { appOutputPath } = api.paths
        const stats = await bundler.build({
          bundleConfigs,
          appOutputPath
        })

        await api.applyPlugins({
          key: 'onBuildComplete',
          type: api.ApplyPluginsType.event,
          args: { stats }
        })
      } catch (err) {
        await api.applyPlugins({
          key: 'onBuildComplete',
          type: api.ApplyPluginsType.event,
          args: { err }
        })
        throw new Error(err)
      }
    }
  })
}