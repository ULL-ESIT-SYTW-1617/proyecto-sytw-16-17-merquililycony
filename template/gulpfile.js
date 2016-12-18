/*
* Dependencias
*/
var gulp = require('gulp');
var shell = require('gulp-shell');
var install = require('gulp-install');
var path = require('path');
var json = require(path.join(__dirname,'package.json'));
var git = require('simple-git');
var fs = require('fs-extra');
var exec = require('child_process').exec;
var ssh_exec = require('ssh-exec');
var client = require('scp2');
var Curl = require('node-libcurl').Curl;
var curl = new Curl();

var host ="178.62.123.244";
var username ="root";
var password = "esperanza2016";

gulp.task('paquete-ocean', function(){
    var ocean = require("gitbook-start-digitalocean-merquililycony");
})
//var hero = require("gitbook-start-heroku-merquililycony");

gulp.task('push', function(){

    if (!fs.existsSync(path.join(__dirname, '.git'))){
      git()
        .init()
        .add('./*')
        .commit("first commit")
        .addRemote('origin', json.repository.url)
        .push('origin', 'master');
    }
    else
    {
       git()
        .add('./*')
        .commit("Actualizando Gitbook.")
        .push('origin', 'master');
    }
});

///gulp.task('instalar_recursos',['instalar_dependencias','instalar_plugins']);

gulp.task('instalar_dependencias', function()
{
    gulp.src(['./package.json']).pipe(install())
});

gulp.task('instalar_plugins', function()
{
    return gulp.src('').pipe(shell([
        'gitbook install'
    ]))
});
gulp.task('deploy', function () {
  return gulp.src('')
      .pipe(shell(['./generar-permisos']))
      .pipe(shell(['./scripts/losh generate-gitbook']))
      .pipe(shell(['./scripts/losh deploy-gitbook']))

});

gulp.task('default', ['deploy']);


//generar pdf
gulp.task('pdf',shell.task("gitbook pdf ./txt",{ verbose: true }));


gulp.task('crear-repo', function() {

  var hero = require("gitbook-start-digitalocean-merquililycony");
});



gulp.task('deploy-digitalocean',function(){

    client.scp('gh-pages/', username+':'+password+'@'+host+':/home/src/sytw/gh-pages/', function(err) {});
    client.scp('./template/app.js', username+':'+password+'@'+host+':/home/src/sytw/', function(err) {});
    client.scp('./template/package.json', username+':'+password+'@'+host+':/home/src/sytw/', function(err) {});

});
gulp.task('instalar-dependencias',function(){

    ssh_exec('cd /home/src/sytw/; npm install', username+'@'+host).pipe(process.stdout);

});
gulp.task('run-server',function(){

  ssh_exec('cd /home/src/sytw/; node app.js', username+'@'+host).pipe(process.stdout);
});

//gulp.task('run', ['deploy','deploy-digitalocean','instalar_dependencias','run-server']);
