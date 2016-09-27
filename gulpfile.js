var  gulp           = require('gulp'),
    less           = require('gulp-less'),
    cssmin         = require('gulp-minify-css'),
    notify         = require('gulp-notify'),
    path           = require('path'),
    uglify         = require('gulp-uglify'),
    concat         = require('gulp-concat'),
    rename         = require('gulp-rename'),
    plumber        = require('gulp-plumber');


/*
|--------------------------------------------------------------------------
| Error Catching
|--------------------------------------------------------------------------
*/

var onError = function (err) {  
    console.log(err);
    this.emit('end');
};


/*
|--------------------------------------------------------------------------
| Compile Less
|--------------------------------------------------------------------------
*/

gulp.task('less', function() {
    return gulp.src('public/less/style.less')
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(less())
        .pipe(cssmin())
        .pipe(gulp.dest('public/css'))
        .pipe(notify({ message: 'Less - Done!'}));
});


/*
|--------------------------------------------------------------------------
| Compile Javascript
|--------------------------------------------------------------------------
*/

gulp.task('uglify', function() {
    return gulp.src('public/js/src/*.js')
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(concat('main.js'))
        .pipe(rename('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/js'))
        .pipe(notify({ message: 'JS - Done!' }))
});


/*
|--------------------------------------------------------------------------
| Watch Task
|--------------------------------------------------------------------------
*/

gulp.task('watch', function() {
    gulp.watch('public/less/*.less', ['less']);
    gulp.watch('public/js/src/*.js', ['uglify']);
});


