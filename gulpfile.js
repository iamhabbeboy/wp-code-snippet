const gulp = require('gulp'),
  exec1 = require('gulp-exec'),
  uglifycss = require('gulp-uglifycss'),
  gulp_rename = require('gulp-rename');
const exec = require('child_process').exec;

/**
 * Uglify css
 */
gulp.task('ugly-css', async function () {
  gulp
    .src('admin/css/*.css')
    .pipe(
      uglifycss({
        uglyComments: true,
      }),
    )
    .pipe(gulp_rename('code-snippet-editor-admin.min.css'))
    .pipe(gulp.dest('admin/dist/css/'));
});

/**
 *  Uglify js using terser command line tool
 */
gulp.task('ugly-js', async function (cb) {
  exec(
    'terser admin/js/code-snippet-editor-admin.js -m',
    async function (err, stdout, stderr) {
      require('fs').writeFileSync(
        'admin/dist/js/code-snippet-editor-admin.min.js',
        stdout,
      );
      cb(err);
    },
  );
});

// Watch for file changes
gulp.task('watch', async function () {
  gulp.watch('admin/css/*.css', gulp.parallel('ugly-css'));
  gulp.watch('admin/js/code-snippet-editor-admin.js', gulp.parallel('ugly-js'));
});

// Default config
gulp.task('default', gulp.parallel('ugly-css', 'ugly-js'));
