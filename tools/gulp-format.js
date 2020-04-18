// clang-format entry points
const srcsToFmt = [ 'src/**/*.{js,ts}', 'tools/**/*.{js,ts}' ];

module.exports = {
  format : (gulp) => () => {
    const format = require('gulp-clang-format');
    const clangFormat = require('clang-format');
    return gulp.src(srcsToFmt, {base : '.'})
        .pipe(format.format('file', clangFormat))
        .pipe(gulp.dest('.'));
  },
};
