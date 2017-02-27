module.exports = function( gulp, plugins ) {
    return function() {
		var onError = function( err ) {
			plugins.notify.onError( {
				'title': 'Custom Scripts Task Error',
				'message': 'Error: <%= error.message %>',
				'sound': 'Beep',
				'onLast': true,
				'wait': true
			} )( err );
			this.emit( 'end' );
		};
        gulp.src( [ './_src/js/custom/*.js', './_src/js/main.js' ] )
			.pipe( plugins.plumber( { errorHandler: onError } ) )
			.pipe( plugins.eslint() )
			.pipe( plugins.eslint.format() )
			.pipe( plugins.eslint.failAfterError() )
            .pipe( plugins.concat( 'custom.js' ) )
			.pipe( gulp.dest( './assets/js' ) )
			.pipe( plugins.rename( { basename: 'custom', suffix: '.min' } ) )
			.pipe( plugins.uglify() )
			.pipe( gulp.dest( './assets/js' ) )
			.pipe( plugins.notify( {
				'title': 'Custom Scripts Task Complete',
				'message': '<%= file.relative %>',
				'onLast': true
			} ) );
    };
};
