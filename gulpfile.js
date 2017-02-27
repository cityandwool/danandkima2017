'use strict';

var url			= 'my.wedding',
	gulp      	= require( 'gulp' ),
	fs 			= require( 'fs' ),
	plugins     = require( 'gulp-load-plugins' )( { lazy: true, pattern: '*' } );

gulp.task( 'screenshot', require( './_src/gulp/screenshot' )( gulp, plugins ) );
gulp.task( 'masters', require( './_src/gulp/masters' )( gulp, plugins ) );
gulp.task( 'masters-x2', require( './_src/gulp/masters-x2' )( gulp, plugins ) );
gulp.task( 'sass', require( './_src/gulp/sass' )( gulp, plugins ) );
gulp.task( 'vendor-scripts', require( './_src/gulp/vendor-scripts' )( gulp, plugins ) );
gulp.task( 'custom-scripts', require( './_src/gulp/custom-scripts' )( gulp, plugins ) );
gulp.task( 'browser-sync', require( './_src/gulp/browser-sync' )( gulp, plugins, url ) );
gulp.task( 'deploy', require( './_src/gulp/deploy' )( gulp, plugins ) );

gulp.task( 'sketch', [ 'screenshot', 'masters', 'masters-x2' ], function() {
	return gulp.src( './_src/sketch/masters.sketch' )
	.pipe( plugins.notify( {
		'title': 'Sketch Task Complete',
		'message': 'screenshot, masters, masters-x2',
		'onLast': true
	} ) );
} );

gulp.task( 'default', [ 'sass', 'vendor-scripts', 'custom-scripts', 'browser-sync' ], function() {
	gulp.watch( './_src/scss/**/*.scss', [ 'sass' ] );
	gulp.watch( './_src/js/**/*.js', [ 'custom-scripts', plugins.browserSync.reload ] );
} );
