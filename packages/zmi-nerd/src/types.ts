export interface IBundleOptions {
  moduleType?: 'esm' | 'cjs'
  extraBabelPlugins?: any[]
  extraBabelPresets?: any[]
  target?: 'node' | 'browser'
  browserFiles?: string[]
  nodeFiles?: string[]
  nodeVersion?: number
  runtimeHelpers?: boolean
  pkgs?: string[]
  entry?: string
  output?: string
  lessOptions?: Omit<Less.Options, 'sourceMap' | 'compress' | 'filename'>
}

export interface IBundleOpt extends IBundleOptions {
  entry: string
  output: string
}
