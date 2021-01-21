import miniAppSchema from 'zmi-nerd/lib/schema'
import { IApi } from '@zmi/types'

export default function (api: IApi) {
  api.describe({
    key: 'miniAppConfig',
    config: {
      schema() {
        return miniAppSchema
      }
    }
  })
}