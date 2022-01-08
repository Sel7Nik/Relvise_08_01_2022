import del from 'del'
import zipPuck from 'gulp-zip'

export const zip = () => {
  del(`./${arg.path.rootFolder}.zip`)
  return arg
    .src(`${arg.path.buildFolder}/**/*.*`)
    .pipe(
      arg.plugins.plumber(
        arg.plugins.notify.onError({
          title: 'ZIP',
          message: 'Error: <%= error.message %>',
        })
      )
    )
    .pipe(zipPuck(`${arg.path.rootFolder}.zip`))
    .pipe(arg.dest(`./`))
}
