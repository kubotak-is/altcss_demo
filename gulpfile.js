/* ==========================================================================
   Module
   ========================================================================== */
var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    less         = require('gulp-less'),
    stylus       = require('gulp-stylus'),
    postcss      = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    mqpacker     = require('css-mqpacker'),
    csswring     = require('csswring'),
    poststylus   = require('poststylus');

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
  },
  'postcss': {
    //'src': './postcss/*.css',
    'dest': './compile/postcss'
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

gulp.task('postcss-w-stylus', function () {
    var processors = [
        autoprefixer({browsers: ['last 1 version']}),
        mqpacker,
        csswring
    ];
    return gulp.src(paths.stylus.src)
    .pipe(stylus({
        compress: false,
        use: [
            poststylus(processors)
        ]
    }))
    .on('error', function (err) {
        console.error('Error', err.message);
    })
    .pipe(gulp.dest(paths.postcss.dest));
});

gulp.task('default', [
  'scss', 'less', 'stylus', 'postcss-w-stylus'
], function () {});
