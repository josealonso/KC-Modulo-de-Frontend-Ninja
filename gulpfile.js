var gulp = require('gulp');
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var browserSync = require('browser-sync').create();
var gulpImport = require('gulp-html-import'); // permite usar @import en html // "gulp-copy" es más fácil
var tap = require('gulp-tap');
var browserify = require('browserify');
var buffer = require('gulp-buffer');
var sourcemaps = require('gulp-sourcemaps');
var htmlmin = require('gulp-htmlmin');
var uglify = require('gulp-uglify');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var imagemin = require('gulp-imagemin');
var responsive = require('gulp-responsive');

// default task
gulp.task('default', [ 'html', 'sass', 'img', 'responsive', 'video', 'js', 'fonts' ], function() {
	browserSync.init({
		// server: './' // Levanta servidor web en carpeta actual
		proxy: 'http://127.0.0.1:3100/', // actúa como proxy enviando las peticiones a "json-server"
		browser: 'google chrome'
	});
	gulp.watch([ 'src/scss/*.scss', 'src/scss/**/*.scss' ], [ 'sass' ]);
	gulp.watch([ 'src/js/*.js', 'src/js/**/*.js' ], [ 'js' ]);
	gulp.watch([ 'src/*.html', 'src/**/*.html' ], [ 'html' ]);
});

gulp.task('sass', function() {
	gulp
		.src([ 'src/scss/style.scss', 'src/scss/**/*.scss' ])
		.pipe(sourcemaps.init())
		.pipe(
			sass().on('error', function(error) {
				// lo compilamos con gulp-sass
				return notify().write(error); // si ocurre un error, mostramos una notificación
			})
		)
		.pipe(postcss([ autoprefixer(), cssnano() ])) // cssnano comprime/minifica el CSS
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('dist/'))
		.pipe(browserSync.stream());
});

// Fuentes que usa el paquete "font-awesome". Fuente: https://stackoverflow.com/questions/21406538/how-to-use-font-awesome-icons-from-node-modules
gulp.task('fonts', function() {
	gulp.src('node_modules/font-awesome/fonts/*')
	.pipe(gulp.dest('dist/fonts'));
});

gulp.task('html', function() {
	gulp
		.src('src/*.html')
		.pipe(gulpImport('src/components/'))
		.pipe(
			htmlmin({
				// minifica el HTML
				collapseWhitespace: true
			})
		)
		.pipe(gulp.dest('dist/'))
		.pipe(browserSync.stream());
});

gulp.task('img', function() {
	gulp.src('src/img/*')
	.pipe(imagemin())
	.pipe(gulp.dest('dist/img'));
});

gulp.task('js', function() {
	gulp
		.src([ 'src/js/main.js' ])
		.pipe(
			tap(function(file) {
				// tap nos permite ejecutar una función por cada fichero seleccionado en gulp.src
				// reemplazamos el contenido del fichero por lo que nos devuelve browserify pasándole el fichero (main.js)
				file.contents = browserify(file.path, {
					debug: true // genera los "source maps"
				}) // creamos una instancia de browserify en base al archivo
					.transform('babelify', {
						presets: [ 'es2015' ]
					}) // traduce nuestro codigo de ES6 -> ES5
					.bundle() // compilamos el archivo
					.on('error', function(error) {
						// en caso de error, mostramos una notificación
						return notify().write(error);
					});
			})
		)
		.pipe(buffer()) // convertimos a buffer para que funcione el siguiente pipe
		.pipe(
			sourcemaps.init({
				loadMaps: true
			})
		) // captura los sourcemaps del archivo fuente
		.pipe(uglify()) // minificamos/comprimimos el JavaScript
		.pipe(sourcemaps.write('./')) // guarda los sourcemaps en el mismo directorio que el archivo fuente
		.pipe(gulp.dest('dist/'))
		.pipe(browserSync.stream()); //recargamos el navegador
});

// tarea que optimiza y crea las imágenes responsive
gulp.task('responsive', function() {
	gulp
		.src('src/img/someone.png')
		.pipe(
			responsive({
				// generamos las versiones responsive
				'someone.png': [
					{ width: 150, rename: { suffix: '-150px' } },
					{ width: 250, rename: { suffix: '-250px' } },
					{ width: 300, rename: { suffix: '-300px' } }
				]
			})
		)
		.pipe(imagemin()) // optimizamos el peso de las imágenes
		.pipe(gulp.dest('dist/img/'));
});

gulp.task('video', function() {
	gulp.src('src/video/*').pipe(gulp.dest('dist/video'));
});
