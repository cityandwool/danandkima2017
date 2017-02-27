module.exports = function( gulp, plugins ) {
	return function() {
		gulp.src( './_src/sketch/masters.sketch' )
			.pipe( plugins.sketch( { export: 'artboards', formats: 'png' } ) )
			.pipe( gulp.dest( './assets/img' ) );
	};
};
