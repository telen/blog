var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var child = require('child_process');
var browserSync = require('browser-sync').create();
var combiner = require('stream-combiner2');

var handleError = function (err) {
    var colors = gutil.colors;
    console.log('\n');
    gutil.log(colors.red('Error!'));
    gutil.log('fileName: ' + colors.red(err.fileName));
    gutil.log('lineNumber: ' + colors.red(err.lineNumber));
    gutil.log('message: ' + err.message);
    gutil.log('plugin: ' + colors.yellow(err.plugin));
};

gulp.task('sass', () => {
    return gulp.src('_sass/main.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('css'))
        .pipe(gulp.dest('_site/css'));
});

gulp.task('jekyll', () => {
    var jekyll = child.spawn('jekyll', ['build',
        '--watch',
        '--drafts'
        ]);

    var jekyllLogger = (buffer) => {
        buffer.toString()
        .split('/\n/')
        .forEach((message) => gutil.log('Jekyll: ' + message));
    };

    jekyll.stdout.on('data', jekyllLogger);
    jekyll.stderr.on('data', jekyllLogger);
});

gulp.task('serve', () => {
    browserSync.init({
        files: ['_site/**'],
        port: 4000,
        server: {
            baseDir: '_site'
        }
    });

    gulp.watch('_sass/*.scss', ['sass']);
    gulp.watch(['*.html', '_posts/*', '_layouts/*', '_includes/*'], ['jekyll']);
});


gulp.task('default', ['sass', 'jekyll', 'serve']);
