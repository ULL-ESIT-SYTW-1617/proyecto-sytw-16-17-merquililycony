var gulp = require('gulp');
var shell = require('gulp-shell');
var install = require('gulp-install');
var git = require('gulp-git');
var exec = require('child_process').exec;


gulp.task('clone', function() {
  exec(git.clone('https://github.com/alu0100536690/toorrl.git', function(err) {}));

});

