module.exports = function( gulp, plugins ) {
    return function() {
        gulp.src( './_src/js/vendors/*.js' )
			.pipe( plugins.concat( 'vendors.js' ) )
			.pipe( gulp.dest( './assets/js' ) )
			.pipe( plugins.rename( { basename: 'vendors', suffix: '.min' } ) )
			.pipe( plugins.uglify() )
			.pipe( gulp.dest( './assets/js' ) )
			.pipe( plugins.notify( {
				'title': 'Vendor Scripts Task Complete',
				'message': '<%= file.relative %>',
				'onLast': true
			} ) );
    };
};
