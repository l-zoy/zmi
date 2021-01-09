import fs from 'fs'
import path from 'path'
import glob from 'glob'
import { copy, renameSync, mkdirSync } from 'fs-extra'
import rimraf from 'rimraf'

import Nerd from './Build'

function assertBuildResult(cwd: string) {
  const actualDir = path.join(cwd, 'dist')
  const expectDir = path.join(cwd, 'expected')

  if (fs.existsSync(actualDir) && !fs.existsSync(expectDir)) {
    copy(actualDir, expectDir)
    return
  }

  const actualFiles = glob.sync('**/*', { cwd: actualDir, nodir: true })
  const expectFiles = glob.sync('**/*', { cwd: actualDir, nodir: true })

  expect(actualFiles.length).toEqual(expectFiles.length)

  actualFiles.forEach((file) => {
    const actualFile = fs.readFileSync(path.join(actualDir, file), 'utf-8')
    const expectFile = fs.readFileSync(path.join(expectDir, file), 'utf-8')

    expect(actualFile.trim()).toEqual(expectFile.trim())
  })
}

function moveEsLibToDist(cwd: string) {
  const absDirPath = path.join(cwd, 'lib')
  const absDistPath = path.join(cwd, 'dist')
  if (fs.existsSync(absDirPath)) {
    mkdirSync(absDistPath)
    renameSync(absDirPath, path.join(absDistPath, 'lib'))
  }
}

describe('nerd build', () => {
  const root = path.join(__dirname, './fixtures')

  fs.readdirSync(root).forEach((dir) => {
    it(dir, (done) => {
      const cwd = path.join(root, dir)
      process.chdir(cwd)
      rimraf.sync(path.join(cwd, 'dist'))
      done()

      const build = new Nerd({ cwd })

      build
        .step()
        .then(() => {
          moveEsLibToDist(cwd)
          try {
            assertBuildResult(cwd)
            done()
          } catch (err) {
            done(err)
          }
        })
        .finally(() => {
          done()
        })
    })
  })
})
