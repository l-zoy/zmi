import { IApi } from '@zmi-cli/types'

export default (api: IApi) => {
  api.describe({
    key: 'frameType',
    config: {
      schema(joi) {
        return joi.string().valid('react', 'vue', 'miniApp')
      }
    }
  })
}
