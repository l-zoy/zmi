import path from 'path'

export function getCwd() {
  const cwd = process.cwd()
  if (process.env.APP_ROOT) {
    // avoid repeat cwd path
    if (!path.isAbsolute(process.env.APP_ROOT)) {
      return path.join(cwd, process.env.APP_ROOT)
    }
    return process.env.APP_ROOT
  }
  return cwd
}

export function getPkg(dir: string) {
  try {
    return require(path.join(dir, 'package.json'))
  } catch (error) {
    return null
  }
}
