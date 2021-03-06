import { IApi } from '@zmi-cli/types'

export default (api: IApi) => {
  api.describe({
    key: 'extraPostCSSPlugins',
    config: {
      default: [],
      schema(joi) {
        return joi.array()
      }
    }
  })
}
