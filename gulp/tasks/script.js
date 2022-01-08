import webpack from 'webpack-stream'

export const script = () => {
  return arg
    .src(arg.path.src.js, { sourcemaps: arg.isDev })
    .pipe(
      arg.plugins.plumber(
        arg.plugins.notify.onError({
          title: 'JS',
          message: 'Error: <%= error.message %>',
        })
      )
    )
    .pipe(
      webpack({
        mode: arg.isBuild ? 'production' : 'development',
        output: {
          filename: 'js.min.js',
        },
      })
    )

    .pipe(arg.plugins.replace(/@img\//g, '../img/'))

    .pipe(arg.dest(arg.path.build.js, { sourcemaps: arg.isDev }))
    .pipe(arg.plugins.browserSync.stream())
}
