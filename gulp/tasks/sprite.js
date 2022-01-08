import svgSprite from 'gulp-svg-sprite'
import svgmin from 'gulp-svgmin'

export const sprite = () => {
  return arg
    .src(arg.path.src.sprite)
    .pipe(
      arg.plugins.plumber(
        arg.plugins.notify.onError({
          title: 'SPRITE',
          message: 'Error: <%= error.message %>',
        })
      )
    )
    .pipe(
      svgmin({
        plugins: ['removeComments', 'removeEmptyContainers'],
      })
    )
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: '../sprite/sprite.svg',
            example: true, //* создать примеры
          },
        },
      })
    )
    .pipe(arg.dest(arg.path.build.img))
}
