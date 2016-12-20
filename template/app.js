var fs = require('fs');
var http = require('http');
var https = require('https');
var path = require('path');
var express = require('express');
var app = express();
var json = require(path.join(__dirname,'package.json'));
var host = json.remoteserver.ruta_remoto; //Ruta remota de despliegue

function checkDirectorySync(directory) {
  try {
    fs.statSync(directory); //Busca directorio tls

    var privateKey  = fs.readFileSync(host+'/certssh/key.pem', 'utf8');
    var certificate = fs.readFileSync(host+'/certssh/cert.pem', 'utf8');
    var credentials = {key: privateKey, cert: certificate};

    app.use(express.static(path.join(__dirname,'gh-pages')));
    app.get('/', function(request, response) {
      response.send('index');
    });
    var httpServer = http.createServer(app);
    var httpsServer = https.createServer(credentials, app);
    httpServer.listen(8080);
    httpsServer.listen(443);
  } catch(e) {

    app.use(express.static(path.join(__dirname,'gh-pages')));
    app.get('/', function(request, response) {
      response.send('index');
    });

    var httpServer = http.createServer(app);
    httpServer.listen(8080);
  }

}
checkDirectorySync(host+'/certssh');

