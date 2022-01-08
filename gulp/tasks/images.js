import imagemin from 'gulp-imagemin'
// const imagemin = require('gulp-imagemin')
import webpConv from 'gulp-webp'

export const images = () => {
  return arg
    .src(arg.path.src.img)
    .pipe(
      arg.plugins.plumber(
        arg.plugins.notify.onError({
          title: 'IMAGES',
          message: 'Error: <%= error.message %>',
        })
      )
    )
    .pipe(arg.plugins.newer('arg.path.build.img/'))
    .pipe(
      arg.plugins.if(
        arg.isBuild,
        imagemin([
          imagemin.mozjpeg({ quality: 75, progressive: true }),
          imagemin.optipng({ optimizationLevel: 5 }),
          imagemin.gifsicle({ interlaced: true }),
          imagemin.svgo({
            plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
          }),
        ])
      )
    )
    .pipe(arg.plugins.if(arg.isBuild, webpConv()))
    .pipe(arg.plugins.if(arg.isBuild, arg.dest(arg.path.build.img)))

    .pipe(arg.plugins.if(arg.isBuild, arg.src(arg.path.src.img)))
    .pipe(arg.plugins.if(arg.isBuild, arg.plugins.newer('arg.path.build.img/')))
    .pipe(
      arg.plugins.if(
        arg.isBuild,
        imagemin([
          imagemin.mozjpeg({ quality: 75, progressive: true }),
          imagemin.optipng({ optimizationLevel: 5 }),
          imagemin.gifsicle({ interlaced: true }),
          imagemin.svgo({
            plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
          }),
        ])
      )
    )
    .pipe(arg.dest(arg.path.build.img))

    .pipe(arg.src(arg.path.src.svg))
    .pipe(arg.dest(arg.path.build.img))

    .pipe(arg.plugins.browserSync.stream())
}
