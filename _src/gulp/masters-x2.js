module.exports = function( gulp, plugins ) {
	return function() {
		gulp.src( './_src/sketch/masters.sketch' )
			.pipe( plugins.sketch( { export: 'artboards', scales: '2.0', formats: 'png' } ) )
			.pipe( gulp.dest( './assets/img' ) );
	};
};
