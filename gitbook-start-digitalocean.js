var github = require('octonode');
var client = github.client();
var readlineSync = require('readline-sync');
var fs = require('fs');
var fe = require('fs-extra');
var path = require('path');
var gulp = require(path.join(__dirname,'/', 'gulpfile.js'));
var cp = require('child_process');
var deasync = require('deasync');
var exec = deasync(cp.exec);
var Curl = require('node-libcurl').Curl;
var curl = new Curl();


var usuario = readlineSync.question('Introduzca el USUARIO de github: ');
var password = readlineSync.question('Introduzca su contraseña de github: ', { hideEchoBack: true });

// var args = " -u "+usuario+":"+password+" -d ";
// var args1 = '\'{"scopes": ["repo", "user"], "note":"'+usuario+'"}\'';
// var args2 = " https://api.github.com/authorizations >> "+usuario+".json";
// var crear_token = args + args1 + args2;
// exec('curl ' + crear_token);

// //COGER TOKEN
// var json = JSON.parse(fs.readFileSync(usuario+'.json','utf8'))
 var json = JSON.parse(fs.readFileSync('./package.json','utf8'));
 //json -I -f package.json -e 'this.repository.url="bebe"'
dir = json.Directorio.nombre_dir;
exec('json -I -f package.json -e \'this.repository.url=\"'+"https://github.com/"+usuario+"/"+dir+".git"+'\"\'');//URL REMOTA

//console.log("Token usuario: "+token);


//CREAR REPOSITORIO REMOTO EN GITHUB CON EL TOKEN
var pwd = function(pwd, callback){

  var repo_name = path.basename(exec(pwd)); //Obtiene el directorio actual
  repo_name = repo_name.split("\n").join("");//Elimina salto de carro de directorio actual

  callback(repo_name);
};

var getPwd = function(repo_name){
  exec('curl -u '+"\""+usuario+"\":\""+password+"\" https://api.github.com/user/repos -d "+'\'{"name":"'+repo_name+'"}\'');
   // exec('git remote add origin git@github.com:'+usuario+'/'+repo_name+'.git; git push -u origin master');
    //   exec('git init; git add README.md; git commit -m "first commit; git remote add origin git@github.com:'+usuario+'/'+repo_name+'.git; git push -u origin master');

}

pwd("pwd", getPwd);


// funcion deploy
// var initialize = function(){
//   exec('git init; git add README.md; git commit -m "first commit; git remote add origin git@github.com:'+usuario+'/'+repo_name+'.git; git push -u origin master');
// }
// var deploy = function(){

//   exec('git add .; git commit -m "Deploy to Heroku"; git push heroku ');
// }
