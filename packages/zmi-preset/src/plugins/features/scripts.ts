import { IApi } from '@zmi-cli/types'

import { formatScripts } from '../common/htmlTools'

export default (api: IApi) => {
  api.describe({
    key: 'scripts',
    config: {
      default: [],
      schema(joi) {
        return joi.array()
      }
    }
  })

  api.addHTMLScripts(() => {
    return formatScripts(api.initConfig.scripts)
  })
}
