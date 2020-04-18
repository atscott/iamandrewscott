
'use strict';

const gulp = require('gulp');

// See `tools/gulp-tasks/README.md` for information about task loading.
function loadTask(taskName) {
  const taskModule = require('./tools/gulp-format');
  const task = taskName ? taskModule[taskName] : taskModule;
  return task(gulp);
}

// All source files.
gulp.task('format:all', loadTask('format'));
gulp.task('format', ['format:all']);
