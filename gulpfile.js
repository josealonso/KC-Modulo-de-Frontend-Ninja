var gulp = require("gulp");
var sass = require("gulp-sass"); // Esta variable tenía una letra mal, se llamaba "scss" !!
var notify = require("gulp-notify");
var browserSync = require("browser-sync").create();
var gulpImport = require("gulp-html-import");
var tap = require("gulp-tap");
var browserify = require("browserify");
var buffer = require("gulp-buffer");
var sourcemaps = require("gulp-sourcemaps");
var htmlmin = require("gulp-htmlmin");
var uglify = require("gulp-uglify");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var cssnano = require("cssnano");

gulp.task("default", ["html", "sass", "img", "js"], function () {
    //gulp.task("default", ["html", "js"], function () {
    browserSync.init({
        server: "./dist"
    });
    gulp.watch(["src/scss/*.scss", "src/scss/**/*.scss"], ["sass"]);
    //gulp.watch(["src/js/*.js", "src/js/**/*.js"], ["js"]);
    gulp.watch(["src/js/main.js"], ["js"]);
    gulp.watch(["src/*.html", "src/**/*.html"], ["html"]);
});

gulp.task("sass", function () {
    gulp.src(["src/scss/style.scss", "src/scss/**/*.scss"])
        .pipe(sourcemaps.init())
        .pipe(sass().on("error", function (error) { // lo compilamos con gulp-sass
            return notify().write(error); // si ocurre un error, mostramos una notificación
        }))
        .pipe(postcss([
            autoprefixer(),
            cssnano()
        ]))
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest("dist/"))
        .pipe(browserSync.stream());
    //.pipe(notify("SASS Compilado 🤘🏻")); // muestra notifiación en pantalla
});

gulp.task("html", function () {
    gulp.src("src/*.html")
        .pipe(gulpImport("src/components/"))
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest("dist/"))
        .pipe(browserSync.stream());
    //.pipe(notify("HTML importado"));
});

gulp.task("js", function () {
    gulp.src(["src/js/main.js"]) //, "src/js/**/*.js"])
/*        .pipe(tap(function (file) { // tap nos permite ejecutar una función por cada fichero seleccionado en gulp.src
            // reemplazamos el contenido del fichero por lo que nos devuelve browserify pasándole el fichero
            file.contents = browserify(file.path, {
                    debug: true
                }) // creamos una instancia de browserify en base al archivo
                .transform("babelify", {
                    presets: ["es2015"]
                }) // traduce nuestro codigo de ES6 -> ES5
                .bundle() // compilamos el archivo
                .on("error", function (error) { // en caso de error, mostramos una notificación
                    return notify().write(error);
                });
        }))
        .pipe(buffer()) // convertimos a buffer para que funcione el siguiente pipe
        .pipe(sourcemaps.init({
            loadMaps: true
        })) // captura los sourcemaps del archivo fuente
        .pipe(uglify()) // minificamos el JavaScript
        .pipe(sourcemaps.write('./')) // guarda los sourcemaps en el mismo directorio que el archivo fuente
*/      .pipe(gulp.dest("dist/"))
        .pipe(browserSync.stream());  //recargamos el navegador
    //.pipe(notify("JS compilado"));
});

// tarea que optimiza y crea las imágenes responsive
gulp.task("img", function () {
    gulp.src("src/img/*")
        /*     .pipe(responsive({ // generamos las versiones responsive
                 '*': [
                     { width: 150, rename: { suffix: "-150px"}},
                     { width: 250, rename: { suffix: "-250px"}},
                     { width: 300, rename: { suffix: "-300px"}}
                 ]
             }))
             .pipe(imagemin()) // optimizamos el peso de las imágenes */
        .pipe(gulp.dest("dist/img/"))
});