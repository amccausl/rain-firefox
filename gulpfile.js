var _ = require('underscore');

var gulp      = require('gulp');
var gutil     = require('gulp-util');
var bower     = require('bower');
var concat    = require('gulp-concat');
var connect   = require('gulp-connect');
var jade      = require('gulp-jade');
var jshint    = require('gulp-jshint');
var minifyCss = require('gulp-minify-css');
var rename    = require('gulp-rename');
var sass      = require('gulp-sass');
var sh        = require('shelljs');

var paths = {
  gulp: ['./gulpfile.js'],
  js  : ['./src/app/*.js', './src/components/**/*.js'],
  sass: ['./src/styles/**/*.sass', './src/styles/**/*.scss'],
  jade: ['./src/app/**/*.jade'],
  html: ['./www/templates/*.html'],
  libs_js: ['./www/lib/ionic/js/ionic.bundle.js']
};

gulp.task('default', ['connect', 'lint', 'app-templates', 'app-scripts', 'app-styles', 'lib-scripts', 'watch']);

gulp.task('connect', function() {
  connect.server({
    root: ['www', 'src/assets'],
    port: 3000,
    livereload: true,
  });
});

gulp.task('lint', function() {
  return gulp.src( _.flatten( [ paths.gulp, paths.js ] ) )
    .pipe( jshint() )
    .pipe( jshint.reporter('jshint-stylish') );
});

gulp.task('app-templates', function() {
  return gulp.src( paths.jade )
    .pipe( jade({
      locals: {},
      pretty: true,
    }))
    .pipe( gulp.dest('./www/') )
    .pipe( connect.reload() );
});

gulp.task('app-scripts', function() {
  return gulp.src( paths.js )
    .pipe( concat('app.js') )
    .pipe( gulp.dest('./www/js/') )
    .pipe( connect.reload() );
});

gulp.task('lib-scripts', function() {
  return gulp.src( paths.libs_js )
    .pipe( concat('libs.js') )
    .pipe( gulp.dest('./www/js/') )
    .pipe( connect.reload() );
});

gulp.task('app-styles', function() {
  return gulp.src('./src/styles/ionic.app.scss')
    .pipe( sass() )
    .pipe( gulp.dest('./www/css/') )
    .pipe( minifyCss({
      keepSpecialComments: 0,
    }))
    .pipe( rename({ extname: '.min.css' }) )
    .pipe( gulp.dest('./www/css/') )
    .pipe( connect.reload() );
});

gulp.task('watch', function () {
  gulp.watch( paths.js, ['lint', 'app-scripts'] );
  gulp.watch( paths.sass, ['app-styles'] );
  gulp.watch( paths.jade, ['app-templates'] );
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function( data ) {
      gutil.log('bower', gutil.colors.cyan( data.id ), data.message);
    });
});

gulp.task('git-check', function( done ) {
  if( !sh.which('git') ) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
