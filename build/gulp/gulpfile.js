// ----------------------------------------------------------------------------
// REFERENCES
// ----------------------------------------------------------------------------

var gulp 				= require('gulp');
var typescript 	= require('gulp-tsc');
var tslint 			= require('gulp-tslint');
var gulpFilter 	= require('gulp-filter');

// ----------------------------------------------------------------------------
// DECLARATIONS
// ----------------------------------------------------------------------------

var ROOT 			= '../../'
var SRC 			= ROOT + 'src/';
var ALL 			= '**/*.ts';
var COMPILED 	= 'compiled/';
var DEFS 			= 'defs/'

var FILES = [
		SRC + 'client/' + ALL,
		SRC + 'collections/' + ALL,
		SRC + 'lib/' + ALL,
		SRC + 'server/' + ALL
	];

// ----------------------------------------------------------------------------

// create filter instance inside task function
var filter = gulpFilter(['**/*.d.ts']);

// ----------------------------------------------------------------------------
// ERROR-HANDLER
// ----------------------------------------------------------------------------

function errorHandler(err) {
  console.log(err.toString());
  this.emit('end');
}

// ----------------------------------------------------------------------------
// GULP: TYPESCRIPT
// ----------------------------------------------------------------------------

var options = { 
	// declaration: true,
	sourcemap: true,
	// emitError: false,
}

// ----------------------------------------------------------------------------

gulp.task('compile', function(){
  return gulp.src(FILES)
    .pipe( typescript(options).on('error', errorHandler) )
    .pipe(gulp.dest(SRC))

    // .pipe(filter)
    // .pipe(gulp.dest(DEFS))
});

// ----------------------------------------------------------------------------
// GULP: TSLINT
// ----------------------------------------------------------------------------

gulp.task('tslint', function(){
    return gulp.src(FILES)
      .pipe(tslint())
      .pipe(tslint.report('verbose'))
});

// ----------------------------------------------------------------------------
// GULP: DEFAULT
// ----------------------------------------------------------------------------

gulp.task('default', function () {
	gulp.watch(FILES, ['compile'])
});

// ----------------------------------------------------------------------------
// END
// ----------------------------------------------------------------------------
