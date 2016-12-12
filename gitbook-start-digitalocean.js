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


function checkDirectorySync(directory) {
  try {
    fs.statSync(directory);
  } catch(e) {
    fs.mkdirSync(directory);

    var usuario = readlineSync.question('Introduzca el USUARIO de github: ');
    var password = readlineSync.question('Introduzca su contraseña de github: ', { hideEchoBack: true });

    fe.mkdirs('.gitbook-start', function (err) {
      if (err) return console.error(err)
      console.log("success!")
    })

    var args = " -u "+usuario+":"+password+" -d ";
    var args1 = '\'{"scopes": ["repo", "user"], "note":"'+usuario+'"}\'';
    var args2 = " https://api.github.com/authorizations >> .gitbook-start/config.json";
    var crear_token = args + args1 + args2;
    exec('curl ' + crear_token);
  }
}

checkDirectorySync("./.gitbook-start");

// //COGER TOKEN
var json_token = JSON.parse(fs.readFileSync('.gitbook-start/config.json','utf8'))

var token = json_token.token;
var usuario_tok = json_token.app.name;
console.log("Usuario: "+usuario_tok);
console.log("Token: "+token);

var json = JSON.parse(fs.readFileSync('./package.json','utf8'));
var dir = json.Directorio.nombre_dir; //Utilizar el que está comentado arriba cuando instalemos los paquetes.
console.log("Directorio actual: "+dir);
exec('json -I -f package.json -e \'this.repository.url=\"'+"https://github.com/"+usuario_tok+"/"+dir+".git"+'\"\'');//URL REMOTA

//CREAR REPOSITORIO REMOTO EN GITHUB CON EL TOKEN
var pwd = function(pwd, callback){

  var repo_name = path.basename(exec(pwd)); //Obtiene el directorio actual
  repo_name = repo_name.split("\n").join("");//Elimina salto de carro de directorio actual

  callback(repo_name);
};

var getPwd = function(repo_name){
  exec('curl -u '+"\""+usuario_tok+"\":\""+token+"\" https://api.github.com/user/repos -d "+'\'{"name":"'+repo_name+'"}\'');
  // exec('git remote add origin git@github.com:'+usuario+'/'+repo_name+'.git; git push -u origin master');
  //   exec('git init; git add README.md; git commit -m "first commit; git remote add origin git@github.com:'+usuario+'/'+repo_name+'.git; git push -u origin master');

}

pwd("pwd", getPwd);
