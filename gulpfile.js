/* ==========================================================================
   Module
   ========================================================================== */
var gulp   = require('gulp'),
    sass   = require('gulp-sass'),
    less   = require('gulp-less'),
    stylus = require('gulp-stylus');

/* ==========================================================================
   File Path
   ========================================================================== */
var paths = {
  'scss': {
    'src': './scss/*.scss',
    'dest': './compile/scss'
  },
  'less': {
    'src': './less/!(_)*.less',
    'dest': './compile/less'
  },
  'stylus': {
    'src': './stylus/!(_)*.styl',
    'dest': './compile/stylus'
  }
};

/* ==========================================================================
   Tasks
   ========================================================================== */
gulp.task('scss', function () {
  return gulp.src(paths.scss.src)
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest(paths.scss.dest));
});

gulp.task('less', function () {
  return gulp.src(paths.less.src)
  .pipe(less())
  .pipe(gulp.dest(paths.less.dest));
});

gulp.task('stylus', function () {
  return gulp.src(paths.stylus.src)
  .pipe(stylus({
    compress: false
  }))
  .on('error', function (err) {
    console.error('Error', err.message);
  })
  .pipe(gulp.dest(paths.stylus.dest));
});

gulp.task('default', [
  'scss', 'less', 'stylus'
], function () {});
