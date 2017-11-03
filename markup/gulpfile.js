var gulp = require('gulp'),
    less = require('gulp-less'),
    browserSync = require('browser-sync'),
    del = require('del'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('less', function(){
    return gulp.src('app/less/**/*.less')
    .pipe(less())
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: true 
    }))
    .pipe(gulp.dest('app/css'))
});

gulp.task('cssmin', ['less'], function() {
    return gulp.src('app/css/styles.css')
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('app/css'));
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false
    });
});

gulp.task('js-libs', function() {
    return gulp.src(['app/libs/**/*.js'])
    .pipe(concat('libs.min.js'))
    .pipe(uglify()) 
    .pipe(gulp.dest('app/js/minify'));
});

gulp.task('scripts', ['js-libs'], function() {
    return gulp.src(['app/js/**/*.js', '!app/js/minify/**/*.js'])
    .pipe(uglify('scripts.min.js'))
    .pipe(gulp.dest('app/js/minify/'));
});

gulp.task('clean', function() {
    return del.sync('dist');
});

gulp.task('watch', function() {
    gulp.watch('app/less/**/*.less', ['cssmin']);
    gulp.watch(['app/js/**/*.js', '!app/js/minify/**/*.js'], ['scripts']);
});

gulp.task('build', ['clean', 'cssmin', 'scripts'], function() {
    var buildCss = gulp.src([
        'app/css/styles.min.css',
    ])
    .pipe(gulp.dest('dist/css'))

    var buildJs = gulp.src('app/js/minify/*.js')
    .pipe(gulp.dest('dist/js/minify'))
    
    var buildHtml = gulp.src('app/*.html')
    .pipe(gulp.dest('dist'))

    browserSync({
        server: {
            baseDir: 'dist'
        },
        notify: false
    });
});

