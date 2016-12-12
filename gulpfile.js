var gulp = require('gulp');
var shell = require('gulp-shell');
var install = require('gulp-install');
var git = require('simple-git');




// Repositorio Github
gulp.task('push', function(){
    git()
        .add('./*')
        .commit("update package")
        .push('origin', 'master');
});

// Install dependencies and resources

gulp.task('install-resource', function()
{
    gulp.src(['./package.json']).pipe(install());
});

 
//Deploy
gulp.task('deploy', ['install-resource', 'push'], function()
{
    return gulp.src('')
           .pipe(shell([
            'npm publish'
           ]))
});




gulp.task('default', ['deploy']);
