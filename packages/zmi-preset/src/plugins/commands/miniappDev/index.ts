import { IApi } from '@zmi/types'

import Nerd from 'zmi-nerd'

export default (api: IApi) => {
  api.registerCommand({
    name: 'miniAppDev',
    description: 'start miniApp dev server for development',
    async fn() {
      const nerd = new Nerd({
        watch: true,
        userConfig: api.config.miniAppConfig ?? {}
      })

      await nerd.step()
    }
  })
}
