import fileInclude from 'gulp-file-include'
import webpHtml from 'gulp-webp-html-nosvg'
import versionNumber from 'gulp-version-number'

export const html = () => {
  return arg
    .src(arg.path.src.html)
    .pipe(
      arg.plugins.plumber(
        arg.plugins.notify.onError({
          title: 'HTML',
          message: 'Error: <%= error.message %>',
        })
      )
    )
    .pipe(fileInclude())
    .pipe(arg.plugins.replace(/@img\//g, '/img/'))
    .pipe(arg.plugins.if(arg.isBuild, webpHtml()))
    .pipe(
      arg.plugins.if(
        arg.isBuild,
        versionNumber({
          value: '%DT%',
          append: {
            key: '_v',
            cover: 0,
            to: ['css', 'js'],
          },
          output: {
            file: 'gulp/version.json',
          },
        })
      )
    )
    .pipe(arg.dest(arg.path.build.html))
    .pipe(arg.plugins.browserSync.stream())
}
