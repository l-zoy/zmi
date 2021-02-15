import { IConfig, IPrivate, IStyle } from '@zmi-cli/types'
import Joi from 'joi'

export enum ServiceStage {
  uninitialized,
  init,
  initPlugins,
  initHooks,
  pluginReady,
  getConfig,
  getPaths,
  run
}

export enum EnumApplyPlugins {
  add = 'add',
  modify = 'modify',
  event = 'event'
}

export enum EnumEnableBy {
  register = 'register',
  config = 'config'
}

export interface IDep {
  [name: string]: string
}

export enum ConfigChangeType {
  reload = 'reload'
}

export interface IChanged {
  key: string
  pluginId: string
}

export interface IPackage {
  name?: string
  dependencies?: IDep
  devDependencies?: IDep
  [key: string]: any
}

export interface IPluginConfig {
  default?: any
  schema?: {
    (joi: Joi.Root): Joi.Schema
  }
  onChange?: string | { (): void }
}

export interface IPlugin {
  id: string
  key: string
  path: string
  apply: () => any
  config?: IPluginConfig
  isPreset?: boolean
  enableBy?: EnumEnableBy | (() => void)
}

export interface IHook {
  key: string
  fn: (args?: { args: any }, option?: any) => Promise<any> | void
  pluginId?: string
  before?: string
  stage?: number
}

export interface ICommand {
  name: string
  alias?: string
  description?: string
  details?: string
  fn: {
    ({ args }: { args: any }): void
  }
}

export type IServicePathKeys =
  | 'cwd'
  | 'appNodeModulesPath'
  | 'appOutputPath'
  | 'appSrcPath'
  | 'appPagesPath'

export type IServicePaths = {
  [key in IServicePathKeys]: string
}

export interface IModifyHTML {
  (memo: any, args?: any): Promise<any>
}

export type IOpts = {
  config: IConfig
  tplPath?: string
  modifyHTML?: IModifyHTML
}

export interface ILink {
  [key: string]: string
}

export type IHtmlConfig = Pick<IPrivate, 'metas' | 'links' | 'headScripts' | 'scripts'>

export interface IGetContentArgs extends IHtmlConfig {
  styles: IStyle[]
  tplPath?: string
  modifyHTML?: IModifyHTML
}
