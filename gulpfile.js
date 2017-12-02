var gulp = require('gulp');
var runSequence = require('run-sequence');
var del = require('del');
var inject = require('gulp-inject');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

var files = require('./gulp/gulp.config.js');

gulp.task('default', function (callback) {
    browserSync.init({
        proxy: "localhost:800",
        reloadDelay: 2500
    });

    runSequence('build', callback);
});

gulp.task('build', function (callback) {
    runSequence('clean', 'copy-build', 'reference', 'sass-watch', 'watch', callback);
});

gulp.task('copy-build', ['copy-app', 'copy-models', 'copy-public', 'copy-routes', 'copy-views', 'sass']);

gulp.task('clean', function (callback) {
    del([files.build_dir], {force: true})
        .then((paths) => {console.log('paths ' + paths)})
        .then(callback);
});

gulp.task('copy-app', function  () {
    return gulp.src('./src/*.js')
        .pipe(gulp.dest(files.build_dir))
});

gulp.task('copy-models', function () {
    return gulp.src('./src/models/*.js')
        .pipe(gulp.dest('./build/models'))
});

gulp.task('copy-public', function () {
    return gulp.src(['!./src/public/stylesheets/*.sass', './src/public/**/*.*'])
        .pipe(gulp.dest('./build/public'))
});

gulp.task('copy-routes', function () {
    return gulp.src('./src/routes/*.js')
        .pipe(gulp.dest('./build/routes'))
});

gulp.task('copy-views', function () {
    return gulp.src(['!./src/views/layout.pug', './src/views/*'])
        .pipe(gulp.dest('./build/views'))
});

gulp.task('reference', function () {
    return gulp.src('./src/views/layout.pug')
        .pipe(inject(gulp.src(files.app_files.file_src), {ignorePath: 'build/public'}))
        .pipe(gulp.dest('./build/views'));
});

gulp.task('lint', function () {
    return gulp.src(files.app_files.js)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('watch', function () {
    gulp.watch(files.app_files.all, ['build']).on("change", reload);
});

gulp.task('watch-js', function () {
    gulp.watch(files.app_files.js, ['lint', 'build']);
});

gulp.task('sass', function () {
    return gulp.src('./src/public/stylesheets/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./build/public/stylesheets'));
});

gulp.task('sass-watch', function () {
    gulp.watch('././build/public/stylesheets/*.sass', ['sass']);
});