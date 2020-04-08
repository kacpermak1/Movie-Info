const gulp = require("gulp");
const jshint = require("gulp-jshint");    /* Wymagamy użycia wtyczki jshint */
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const browserSync = require("browser-sync").create();

gulp.task("jshint", function () {
    return gulp.src("./js/*.js")            /* Przeszukaj folder js */
        .pipe(jshint())
        .pipe(jshint.reporter("default"))
});

gulp.task("sass", function () {
    return gulp.src("scss/main.scss")
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'expanded',
        }).on("error", sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("css"))
        .pipe(browserSync.stream())
});

gulp.task("watch", function () {
    browserSync.init({
        server:{
            baseDir:'./'
        }
    })
    gulp.watch("scss/**/*.scss", gulp.series("sass"));
    gulp.watch("./*.html").on('change', browserSync.reload);
    gulp.watch("./css/*.css").on('change', browserSync.reload);
    gulp.watch("./js/*.js").on('change', browserSync.reload);
    gulp.watch("./*.js").on('change', browserSync.reload);
});