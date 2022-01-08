import Sass from 'sass'
import gulpSass from 'gulp-sass'
import cleanCss from 'gulp-clean-css'
import webpcss from 'gulp-webpcss'
import prefixer from 'gulp-autoprefixer'
import mediaQueries from 'gulp-group-css-media-queries'

const sass = gulpSass(Sass)

export const style = () => {
  return arg
    .src(arg.path.src.scss, { sourcemaps: arg.isDev })
    .pipe(
      arg.plugins.plumber(
        arg.plugins.notify.onError({
          title: 'SCSS',
          message: 'Error: <%= error.message %>',
        })
      )
    )
    .pipe(
      sass({
        // outputStyle: 'compressed',
        outputStyle: 'expanded',
      })
    )
    .pipe(arg.plugins.replace(/@img\//g, '../img/'))
    .pipe(arg.plugins.if(arg.isBuild, mediaQueries()))

    .pipe(
      arg.plugins.if(
        arg.isBuild,
        webpcss({ webpClass: '.webp', noWebpClass: '.no-webp' })
      )
    )
    .pipe(
      arg.plugins.if(
        arg.isBuild,
        prefixer({
          grid: true,
          overrideBrowserslist: ['last 8 versions'],
          cascade: true,
          browsers: [
            'Android >= 4',
            'Chrome >= 20',
            'Firefox >= 24',
            'Explorer >= 11',
            'iOS >= 6',
            'Opera >= 12',
            'Safari >= 6',
          ],
        })
      )
    )
    .pipe(arg.dest(arg.path.build.css, { sourcemaps: arg.isDev }))
    .pipe(arg.plugins.if(arg.isBuild, cleanCss()))
    .pipe(arg.plugins.rename('css.min.css'))
    .pipe(arg.dest(arg.path.build.css, { sourcemaps: arg.isDev }))
    .pipe(arg.plugins.browserSync.stream())
}
