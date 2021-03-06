import { IApi } from '@zmi-cli/types'

export default (api: IApi) => {
  api.describe({
    key: 'paths',
    config: {
      schema(joi) {
        return joi.object()
      }
    }
  })
}
