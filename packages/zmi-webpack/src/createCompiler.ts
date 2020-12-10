// import forkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
// import { Issue } from 'fork-ts-checker-webpack-plugin/lib/issue'
import { chalk, clearConsole } from '@zmi/utils'
import address from 'address'
import webpack from 'webpack'
import url from 'url'

import formatWebpackMessages from './formatWebpackMessages'

interface IUrlType {
  lanUrlForConfig: any
  lanUrlForTerminal: string | undefined
  localUrlForTerminal: string
  localUrlForBrowser: string
}

interface IPrepareUrlOpts {
  protocol?: 'http' | 'https'
  host: string
  port: string | number
  pathname?: string
}

const makeLine = (num: number, sign = ' ') => new Array(num).join(sign)
const line = (interval: string, isTop: boolean) =>
  `${isTop ? '┌' : '└'}${makeLine(29, '─')}${interval}${isTop ? '┐' : '┘'}`
const urlRe = /^10[.]|^172[.](1[6-9]|2[0-9]|3[0-1])[.]|^192[.]168[.]/

export function prepareUrls(prepareUrlOptions: IPrepareUrlOpts) {
  const { protocol = 'http', host, port, pathname = '/' } = prepareUrlOptions
  const formatUrl = (hostname: string) =>
    url.format({
      protocol,
      hostname,
      port,
      pathname
    })
  const prettyPrintUrl = (hostname: string) =>
    url.format({
      protocol,
      hostname,
      port: chalk.bold(port),
      pathname
    })

  const isUnspecifiedHost = host === '0.0.0.0' || host === '::'

  let prettyHost
  let lanUrlForConfig
  let lanUrlForTerminal

  if (isUnspecifiedHost) {
    prettyHost = 'localhost'
    try {
      lanUrlForConfig = address.ip()
      if (lanUrlForConfig) {
        if (urlRe.test(lanUrlForConfig)) {
          lanUrlForTerminal = prettyPrintUrl(lanUrlForConfig)
        } else {
          lanUrlForConfig = undefined
        }
      }
    } catch (_e) {
      // ignored
    }
  } else {
    prettyHost = host
  }

  const localUrlForTerminal = prettyPrintUrl(prettyHost)
  const localUrlForBrowser = formatUrl(prettyHost)

  return {
    lanUrlForConfig,
    lanUrlForTerminal,
    localUrlForTerminal,
    localUrlForBrowser
  }
}

function printInstructions(opts: {
  appName: string
  urls: IUrlType
  port: number
}) {
  const { appName, urls, port } = opts
  const { yellow, cyan } = chalk
  const { log } = console

  log('📦  Compiled successfully! ')
  log()

  const interval = makeLine(appName.length + 6, '─')
  const portMakeLine = makeLine(appName.length - 3)

  log(
    [
      line(interval, true),
      // devConifg.target !== 'web' &&
      `│ Running metro bundler on Port: ${yellow(port)} ${portMakeLine}│`,
      `│ You can now view your Project: ${yellow(appName)} │`,
      line(interval, false)
    ]
      .filter(Boolean)
      .join('\n')
  )

  // if (devConifg.target === 'web') {
  if (urls.lanUrlForTerminal) {
    log('|')
    log(`|- Localhost: ${cyan(urls.localUrlForTerminal)}`)
    log('|')
    log(`|- Network: ${cyan(urls.lanUrlForTerminal)}`)
  } else {
    log(`|- Localhost: ${cyan(urls.localUrlForTerminal)}`)
  }
  // }
  log()
}

function createCompiler(opts: {
  appName: string
  config: webpack.Configuration
  urls: IUrlType
  port: number
  bundleImplementor: typeof webpack
}) {
  const { appName, config, urls, port, bundleImplementor } = opts
  const { log } = console

  let compiler: webpack.Compiler

  try {
    compiler = bundleImplementor(config)
  } catch (err) {
    log(chalk.red('❌ Compilation failed.'))
    log()
    log(err.message ?? err)
    process.exit(1)
  }

  // let isFirstCompile = true

  compiler.hooks.invalid.tap('invalid', () => {
    clearConsole()
    log(chalk.cyan('🎯 Accelerating compilation ,Wait a moment...'))
  })

  // const forkHook = forkTsCheckerWebpackPlugin.getCompilerHooks(compiler)

  // forkHook.issues.tap('ForkTsCheckerWebpackPlugin', (issues): Issue[] => {
  //   if (issues.length) {
  //     clearConsole()
  //   }
  //   return []
  // })

  compiler.hooks.done.tap('done', (stats) => {
    const statsData = stats.toJson({
      all: false,
      warnings: true,
      errors: true
    })

    const messages = formatWebpackMessages(statsData)
    const isSuccessful = !messages.errors.length && !messages.warnings.length

    if (isSuccessful) {
      printInstructions({ appName, urls, port })
    }

    // isFirstCompile = false

    if (messages.errors.length) {
      if (messages.errors.length > 1) {
        messages.errors.length = 1
      }
      log(chalk.red('❌ Compilation failed.\n'))
      log(chalk.red(messages.errors.join('\n\n')))
      return
    }

    if (messages.warnings.length) {
      log(chalk.yellow(`🚸 Compile warning.\n`))
      log(messages.warnings.join('\n\n'))
      log()
    }
  })

  return compiler
}

export default createCompiler
