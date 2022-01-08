import fs from 'fs'
import fonter from 'gulp-fonter'
import ttf2woff2 from 'gulp-ttf2woff2'

export const otfToTtf = () => {
  return arg
    .src(`${arg.path.srcFolder}/fonts/*.otf`, {})
    .pipe(
      arg.plugins.plumber(
        arg.plugins.notify.onError({
          title: 'FONTS',
          message: 'Error: <%= error.message %>',
        })
      )
    )
    .pipe(
      fonter({
        formats: ['ttf'],
      })
    )
    .pipe(arg.dest(`${arg.path.srcFolder}/fonts/`))
}
export const ttfToWoff = () => {
  return arg
    .src(`${arg.path.srcFolder}/fonts/*.ttf`, {})
    .pipe(
      arg.plugins.plumber(
        arg.plugins.notify.onError({
          title: 'FONTS',
          message: 'Error: <%= error.message %>',
        })
      )
    )
    .pipe(
      fonter({
        formats: ['woff'],
      })
    )
    .pipe(arg.dest(arg.path.build.fonts))

    .pipe(arg.src(`${arg.path.srcFolder}/fonts/*.ttf`))
    .pipe(ttf2woff2())
    .pipe(arg.dest(arg.path.build.fonts))

    .pipe(arg.src(`${arg.path.srcFolder}/fonts/*.woff`))
    .pipe(arg.dest(arg.path.build.fonts))

    .pipe(arg.src(`${arg.path.srcFolder}/fonts/*.woff2`))
    .pipe(arg.dest(arg.path.build.fonts))
}

const folderPath = 'src\\fonts\\'
const fontsStore = {}
let arrNameFonts = []

export const fontsStyle = (done) => {
  const filesFolder = fs.readdirSync(folderPath)

  const files = filesFolder.filter((item) => {
    const stats = fs.statSync(folderPath + item)
    return stats.isFile()
  })

  files.forEach((file, pos) => {
    const indexDef = file.lastIndexOf('-')
    const fontName = file.slice(0, indexDef)
    const indexDot = file.lastIndexOf('.')
    let fontStyle = file.slice(indexDef + 1, indexDot)
    const fontFormat = file.slice(indexDot + 1)
    let fontItalic = ''
    console.log(fontStyle)
    if (file.lastIndexOf('Italic') >= 0) {
      fontItalic = 'Italic'
    } else {
      fontItalic = 'not'
    }

    let srcFonts = 'src/scss/_local-fonts.scss'
    let appFonts = 'src/fonts/'

    arrNameFonts.push(fontName)

    let fontWeight
    if (fontStyle == 'Italic') fontStyle = 'Regular'
    switch (fontStyle.toLowerCase()) {
      case 'extrabold':
      case 'extrabolditalic':
        fontWeight = 800
        fontStyle = 'ExtraBold'
        break
      case 'bold':
      case 'bolditalic':
        fontWeight = 700
        fontStyle = 'Bold'
        break
      case 'semibold':
      case 'semiboldItalic':
        fontWeight = 600
        fontStyle = 'SemiBold'
        break
      case 'mediumitalic':
      case 'medium':
        fontWeight = 500
        fontStyle = 'Medium'
        break
      case 'regular':
      case 'regularitalic':
        fontWeight = 400
        fontStyle = 'Regular'
        break
      case 'light':
      case 'lightltalic':
        fontWeight = 300
        fontStyle = 'Light'
        break
      default:
        fontWeight = 400
        fontStyle = 'Regular'
        break
    }

    fs.appendFile(
      srcFonts,
      `@font-face {\t
                font-family: ${fontName};\t
                font-display: swap;\t
                src: url("../fonts/${fontName}.woff2") format("woff2"),\t
                     url("../fonts/${fontName}.woff") format("woff");\t
                font-weight: ${fontWeight};\t
                font-style: ${fontStyle};

          }\r\n`,
      () => {}
    )
  })
  done()
}

// export const fontsStyle = () => {
//   const filesFolder = fs.readdirSync(folderPath)

//   let fontsFile = `${arg.path.srcFolder}/scss/fonts.scss`

//   fs.readdir(arg.path.build.fonts, function (err, fontsFiles) {
//     if (fontsFiles) {
//       if (!fs.existsSync(fontsFile)) {
//         fs.writeFile(fontsFile, '', cb)
//         let newFileOnly
//         for (let i = 0; i < fontsFiles.length; i++) {
//           let fontFileName = fontsFiles[i].split('.')[0]
//           if (newFileOnly !== fontFileName) {
//             let fontName = fontFileName.split('-')[0]
//               ? fontFileName.split('-')[0]
//               : fontFileName
//             let fontWeight = fontFileName.split('-')[0]
//               ? fontFileName.split('-')[0]
//               : fontFileName
//             if (fontWeight.toLowerCase() === 'thin') {
//               fontWeight = 100
//             } else if (fontWeight.toLowerCase() === 'extralight') {
//               fontWeight = 200
//             } else if (fontWeight.toLowerCase() === 'light') {
//               fontWeight = 300
//             } else if (fontWeight.toLowerCase() === 'medium') {
//               fontWeight = 500
//             } else if (fontWeight.toLowerCase() === 'semibold') {
//               fontWeight = 600
//             } else if (fontWeight.toLowerCase() === 'bold') {
//               fontWeight = 700
//             } else if (
//               fontWeight.toLowerCase() === 'extrabold' ||
//               fontWeight.toLowerCase() === 'heavy'
//             ) {
//               fontWeight = 800
//             } else if (fontWeight.toLowerCase() === 'black') {
//               fontWeight = 900
//             } else {
//               fontWeight = 400
//             }

//             fs.appendFile(
//               fontsFile,
//               `@font-face {\t
//                 font-family: ${fontName};\t
//                 font-display: swap;\t
//                 src: url("../fonts/${fontFileName}.woff2") format("woff2"),\t
//                      url("../fonts/${fontFileName}.woff") format("woff");\t
//                 font-weight: ${fontWeight};\t
//                 font-style: ${fontStyle};
//           }\r\n`,
//               cb
//             )
//             newFileOnly = fontFileName
//           }
//         }
//       } else {
//         console.log('Файл scss/fonts.scss уже существует')
//       }
//     }
//   })

//   return arg.src(`${arg.path.srcFolder}`)
//   function cb() {}
// }
