const { series, parallel, src, dest } = require('gulp')
const { sync } = require('glob')
const sass = require('gulp-sass')
const { join } = require('path')
const cleanCSS = require('gulp-clean-css')
const rename = require('gulp-rename')
require('colors')
sass.compiler = require('node-sass')
const path = join(__dirname, 'src')

const compileSCSS = (cb) => {
  return src(sync(join(path, 'scss', '**/*.scss')))
    .pipe(sass().on('error', sass.logError))
    .pipe(dest(join(path, 'dist')))
}

const compileJS = (cb) => {
  cb()
}

const minifyCSS = (cb) => {
  return src(sync(join(path, 'dist', '**/!(*.min).css')))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(
      rename(({ dirname, basename }) => ({
        dirname,
        basename: `${basename}.min`,
        extname: '.css',
      }))
    )
    .pipe(dest(join(path, 'dist')))
}

const minifyJS = (cb) => {
  cb()
}

exports.default = series(
  parallel(compileJS, compileSCSS),
  parallel(minifyCSS, minifyJS)
)
