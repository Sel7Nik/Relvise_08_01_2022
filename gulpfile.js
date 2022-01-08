import gulp from 'gulp'
const { task, watch, parallel, series, src, dest } = gulp
import { path } from './gulp/config/path.js'
import { plugins } from './gulp/config/plugins.js'

global.arg = {
  isBuild: process.argv.includes('--build'),
  isDev: !process.argv.includes('--build'),
  path,
  plugins,
  task,
  watch,
  parallel,
  series,
  src,
  dest,
}

import { copy } from './gulp/tasks/copy.js'
import { reset } from './gulp/tasks/reset.js'
import { html } from './gulp/tasks/html.js'
import { server } from './gulp/tasks/server.js'
import { style } from './gulp/tasks/style.js'
import { script } from './gulp/tasks/script.js'
import { images } from './gulp/tasks/images.js'
import { otfToTtf, ttfToWoff, fontsStyle } from './gulp/tasks/fonts.js'
import { sprite } from './gulp/tasks/sprite.js'
import { zip } from './gulp/tasks/zip.js'
import { ftp } from './gulp/tasks/ftp.js'

const watcher = () => {
  watch(path.watch.files, copy)
  watch(path.watch.html, html) //* html -> change -> series( html,ftp)
  watch(path.watch.scss, style)
  watch(path.watch.js, script)
  watch(path.watch.img, images)
}

const fonts = series(otfToTtf, ttfToWoff, fontsStyle)

const main = series(fonts, parallel(copy, html, style, script, images))

const dev = series(reset, main, parallel(watcher, server))
const build = series(reset, main)
const puckZip = series(reset, main, zip)
const deployFtp = series(reset, main, zip)

export { sprite, dev, build, puckZip, deployFtp }

task('default', dev)
