import { configFtp } from '../config/ftp.js'
import vinylFtp from 'vinyl-ftp'
import util from 'gulp-util'

export const ftp = () => {
  configFtp.log = util.log
  const ftpConnect = vinylFtp.create(configFtp)
  return arg
    .src(`${arg.path.buildFolder}/**/*.*`)
    .pipe(
      arg.plugins.plumber(
        arg.plugins.notify.onError({
          title: 'FTP',
          message: 'Error: <%= error.message %>',
        })
      )
    )
    .pipe(ftpConnect.dest(`/${arg.path.ftp}/${arg.path.rootFolder}`))
}
