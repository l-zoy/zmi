import { IApi } from '@zmi-cli/types'

export default (api: IApi) => {
  api.describe({
    key: 'hash',
    config: {
      default: true,
      schema(joi) {
        return joi.boolean()
      }
    }
  })
}
