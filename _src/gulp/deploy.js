module.exports = function( gulp, plugins ) {
    return function() {

		var development = plugins.environments.development;
		var production = plugins.environments.production;

		// SCSS STYLES
        gulp.src( './_src/scss/global.scss' )
			.pipe( development( plugins.sourcemaps.init() ) )
			.pipe( plugins.sass( { outputStyle: 'expanded', precision: 10 } ) )
			.pipe( development( plugins.sourcemaps.write( { includeContent: false } ) ) )
			.pipe( development( plugins.sourcemaps.init( { loadMaps: true } ) ) )
			.pipe( plugins.rucksack() )
			.pipe( plugins.autoprefixer(
                'last 5 version', '> 1%', 'safari 5', 'ie >= 9',
                'opera 12.1', 'ios 6', 'android 4' ) )
			.pipe( development( plugins.sourcemaps.write( '.' ) ) )
			.pipe( gulp.dest( './assets/css/' ) )
			.pipe( production( plugins.filter( '**/*.css' ) ) )
			.pipe( production( plugins.uglifycss( { maxLineLen: 80 } ) ) )
			.pipe( production( gulp.dest( './assets/css/' ) ) );

		// CUSTOM JAVASCRIPT
		gulp.src( [ './_src/js/custom/*.js', './_src/js/main.js' ] )
            .pipe( plugins.concat( 'custom.js' ) )
			.pipe( production( plugins.uglify() ) )
			.pipe( gulp.dest( './assets/js' ) );

		// VENDORS JAVASCRIPT
		gulp.src( './_src/js/vendors/*.js' )
			.pipe( plugins.concat( 'vendors.js' ) )
			.pipe( production( plugins.uglify() ) )
			.pipe( gulp.dest( './assets/js' ) );
	};
};
