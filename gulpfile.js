var _ = require('underscore');

var gulp      = require('gulp');
var gutil     = require('gulp-util');

var bower     = require('bower');
var concat    = require('gulp-concat');
var connect   = require('gulp-connect');
var html2js   = require('gulp-ng-html2js');
var jade      = require('gulp-jade');
var jshint    = require('gulp-jshint');
var minifyCss = require('gulp-minify-css');
var rename    = require('gulp-rename');
var sass      = require('gulp-sass');
var size      = require('gulp-size');
var sh        = require('shelljs');
var spawn     = require('child_process').spawn;
var uglify    = require('gulp-uglifyjs');

var paths = {
  gulp: ['./gulpfile.js'],
  js  : ['./src/app/*.js', './src/app/**/*.js', './src/common/**/*.js'],
  sass: ['./src/styles/**/*.sass', './src/styles/**/*.scss'],
  jade: ['./src/app/**/*.jade'],
  html: ['./www/templates/*.html'],
  libs_js: ['./vendor/ionic/js/ionic.bundle.js'],
  fonts: ['./vendor/ionic/fonts/*'],
};

gulp.task('default', ['connect', 'lint', 'app-templates', 'app-scripts', 'app-styles', 'app-fonts', 'lib-scripts', 'assets', 'watch']);

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
    .pipe( html2js({
        moduleName: 'rain.templates',
        prefix: '',
    }))
    .pipe( concat('templates.js' ) )
    .pipe( gulp.dest( './www/js' ) )
    .pipe( uglify( 'templates.min.js', {
      outSourceMap: true,
    }))
    .pipe( gulp.dest('./www/js') )
    .pipe( connect.reload() )
    ;
});

gulp.task('app-scripts', function() {
  return gulp.src( paths.js )
    .pipe( concat('app.js') )
    .pipe( size( { showFiles: true } ) )
    .pipe( size( { showFiles: true, gzip: true } ) )
    .pipe( gulp.dest('./www/js/') )
    .pipe( connect.reload() );
});

gulp.task('lib-scripts', function() {
  return gulp.src( paths.libs_js )
    .pipe( concat('libs.js') )
    .pipe( size( { showFiles: true } ) )
    .pipe( size( { showFiles: true, gzip: true } ) )
    .pipe( gulp.dest('./www/js/') )
    .pipe( connect.reload() );
});

gulp.task('app-styles', function() {
  return gulp.src('./src/styles/ionic.app.scss')
    .pipe( sass() )
    .pipe( gulp.dest('./www/css/') )
    .pipe( size( { showFiles: true } ) )
    .pipe( minifyCss({
      keepSpecialComments: 0,
    }))
    .pipe( rename({ extname: '.min.css' }) )
    .pipe( size( { showFiles: true } ) )
    .pipe( size( { showFiles: true, gzip: true } ) )
    .pipe( gulp.dest('./www/css/') )
    .pipe( connect.reload() );
});

gulp.task('app-fonts', function() {
  return gulp.src( paths.fonts )
    .pipe( gulp.dest('./www/fonts/') )
    .pipe( connect.reload() );
});

gulp.task('assets', function() {
  return gulp.src( './src/assets/**/*' )
    .pipe( gulp.dest('./www/assets') )
    ;
});

gulp.task('watch', function () {
  gulp.watch( paths.js, ['lint', 'app-scripts'] );
  gulp.watch( paths.sass, ['app-styles'] );
  gulp.watch( paths.jade, ['app-templates'] );
});

// http://stackoverflow.com/questions/22886682/how-can-gulp-be-restarted-on-gulpfile-change
gulp.task('reload', function() {
  var process;
  var spawnChildren = function() {
    // kill previous spawned process
    if( process ) {
      process.kill();
    }

    // `spawn` a child `gulp` process linked to the parent `stdio`
    process = spawn( 'gulp', [], { stdio: 'inherit' } );
  };

  gulp.watch( 'gulpfile.js', spawnChildren );
  spawnChildren();
});

gulp.task('firefox', function() {
  return gulp.src( './www/**/*.*' )
    .pipe( gulp.dest('./platforms/firefox-os') )
    ;
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
