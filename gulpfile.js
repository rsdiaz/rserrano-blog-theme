const { series, watch, src, dest, parallel } = require('gulp');
const pump = require('pump')
const exec = require('child_process').exec

// gulp plugins and utils
const livereload = require('gulp-livereload')
const postcss = require('gulp-postcss')
const zip = require('gulp-zip')

// postcss plugins
const autoprefixer = require('autoprefixer')
const cssImport = require('postcss-import')
const cssNesting = require('postcss-nesting')
const cssnano = require('cssnano')

const serve = (done) => {
  livereload.listen()
  done()
}

const handleError = (done) => {
  return (err) => {
    if (err) console.log(err)
    return done(err)
  }
}

const restart = (cb) => {
  exec('cd /home/roberto/Dev/ghostjs && ghost restart', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
}

const hbs = (done) => {
  pump([
    src(['*.hbs', 'partials/**/*.hbs']),
    livereload()
  ], handleError(done));
}

const css = (done) => {
  const processors = [
    cssImport,
    cssNesting(),
    autoprefixer(),
    cssnano({
      preset: 'default'
    })
  ]

  pump([
    src('assets/css/style.css', { sourcemaps: false }),
    postcss(processors),
    dest('assets/built/', { sourcemaps: '.' }),
    livereload()
  ], handleError(done));
}

const zipper = (done) => {
  const targetDir = 'dist/';
  const themeName = require('./package.json').name;
  const filename = themeName + '.zip';

  pump([
    src([
      '**',
      '!node_modules', '!node_modules/**',
      '!dist', '!dist/**'
    ]),
    zip(filename),
    dest(targetDir)
  ], handleError(done));
}


const cssWatcher = () => watch('assets/css/**', build);
const hbsWatcher = () => watch(['*.hbs', 'partials/**/*.hbs'], build);

const watcher = parallel(cssWatcher, hbsWatcher);
const build = series(css, hbs, zipper);
const dev = series(build, serve, watcher);

exports.build = build;
exports.zip = series(build, zipper);
exports.default = dev;