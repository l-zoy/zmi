import { IApi } from '@zmi-cli/types'

import { formatStyles } from '../common/htmlTools'

export default function (api: IApi) {
  api.describe({
    key: 'styles',
    config: {
      default: [],
      schema(joi) {
        return joi.array()
      }
    }
  })

  const { styles } = api.service.userConfig
  const [linkArr, styleArr] = formatStyles(styles!)

  api.addHTMLStyles(() => styleArr)
  api.addHTMLLinks(() => linkArr)
}
