import { EventEmitter } from 'events'
import yargs from 'yargs'
import { ApplyPluginsType, PluginType } from './enums'
import PluginAPI from './pluginAPI'
import { resolvePlugins, resolvePresets, pathToRegister } from './pluginUtils'

export default class Service extends EventEmitter {
  cwd: string
  pkg: any
  env: any

  extraPlugins: any[] = []

  userConfig: any = {}

  initialPresets: any
  initialPlugins: any

  pluginMethods: {
    [name: string]: Function
  } = {}
  plugins: any
  hooks: any

  constructor(opts: any) {
    super()

    this.cwd = opts.cwd || process.cwd()
    this.pkg = opts.pkg
    this.env = opts.env

    this.initialPresets = resolvePresets({
      cwd: this.cwd,
      pkg: this.pkg,
      presets: opts.presets || [],
      userConfigPresets: this.userConfig.presets || []
    })
  }

  init() {
    this.initPresetsAndPlugins()
  }

  initPresetsAndPlugins() {
    this.extraPlugins = []

    while (this.initialPresets.length) {
      this.initPreset(this.initialPresets.shift())
    }
  }

  initPreset(preset: any) {
    const { id, key, apply } = preset

    preset.isPreset = true

    const api = this.getPluginAPI({ id, key, service: this })

    this.registerPlugin(preset)

    const { presets, plugins } = this.applyAPI({
      api,
      apply
    })

    if (presets) {
      this.extraPlugins.unshift(
        ...plugins.map((path: any) =>
          pathToRegister({ type: PluginType.plugin, path, cwd: this.cwd })
        )
      )
    }

    if (plugins) {
      this.extraPlugins.push(
        ...plugins.map((path: any) =>
          pathToRegister({ type: PluginType.plugin, path, cwd: this.cwd })
        )
      )
    }
  }

  getPluginAPI(opts: any) {
    const pluginAPI = new PluginAPI(opts)

    return new Proxy(pluginAPI, {
      get: (target, prop) => {
        //
        return target[prop]
      }
    })
  }

  registerPlugin(plugin: any) {
    this.plugins[plugin.id] = plugin
  }

  applyAPI(opts: any) {
    let ret = opts.apply()(opts.api)
    // if (isPromise(ret)) {
    //   ret = await ret
    // }
    return ret || {}
  }

  applyPlugins(pluginOptions: any) {
    const { key, type } = pluginOptions
    const hooks = this.hooks[key]

    switch (type) {
      case ApplyPluginsType.add:
        break
      case ApplyPluginsType.modify:
        break
      case ApplyPluginsType.event:
        break
      default:
        throw new Error(`applyPlugin failed, type is not defined or is not matched, got ${type}.`)
    }
  }

  run({ args, command }: { args: yargs.Arguments; command: string }) {
    debugger
    this.init()
  }

  runCommand() {}
}
