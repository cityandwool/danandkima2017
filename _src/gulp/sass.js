module.exports = function( gulp, plugins ) {
    return function() {
		var onError = function( err ) {
			plugins.notify.onError( {
				'title': 'Sass Task Error',
				'message': 'Error: <%= error.message %>',
				'sound': 'Beep',
				'onLast': true,
				'wait': true
			} )( err );
			this.emit( 'end' );
		};
        gulp.src( './_src/scss/global.scss' )
			.pipe( plugins.plumber( { errorHandler: onError } ) )
			.pipe( plugins.sourcemaps.init() )
			.pipe( plugins.sass( {
				errLogToConsole: true,
				outputStyle: 'expanded',
				precision: 10
			} ) )
			.pipe( plugins.sourcemaps.write( { includeContent: false } ) )
			.pipe( plugins.sourcemaps.init( { loadMaps: true } ) )
			.pipe( plugins.rucksack() )
			.pipe( plugins.autoprefixer(
				'last 5 version', '> 1%', 'safari 5', 'ie >= 9',
				'opera 12.1', 'ios 6', 'android 4' ) )
			.pipe( plugins.sourcemaps.write( '.' ) )
			.pipe( plugins.plumber.stop() )
			.pipe( gulp.dest( './assets/css/' ) )
			.pipe( plugins.filter( '**/*.css' ) )
			.pipe( plugins.browserSync.reload( { stream: true } ) )
			.pipe( plugins.rename( { suffix: '.min' } ) )
			.pipe( plugins.uglifycss( {
				maxLineLen: 80
			} ) )
			.pipe( gulp.dest( './assets/css/' ) )
			.pipe( plugins.browserSync.reload( { stream: true } ) )
			.pipe( plugins.notify( {
				'title': 'Sass Task Complete',
				'message': '<%= file.relative %>',
				'onLast': true
			} ) );
    };
};
