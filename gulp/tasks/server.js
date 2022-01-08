export const server = (done) => {
  arg.plugins.browserSync.init({
    server: {
      baseDir: `${arg.path.build.html}`,
      // baseDir: 'dist/',
    },
    notify: false,
    host: '192.168.0.68', // установить свой
    port: 3000,
    online: true,
  })
}
