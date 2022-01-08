import plumber from 'gulp-plumber'
import notify from 'gulp-notify'
import browserSync from 'browser-sync'
import replace from 'gulp-replace'
import rename from 'gulp-rename'
import concat from 'gulp-concat'
import newer from 'gulp-newer'
import iff from 'gulp-if'

export const plugins = {
  plumber,
  notify,
  browserSync,
  replace,
  rename,
  concat,
  newer,
  if: iff,
}
