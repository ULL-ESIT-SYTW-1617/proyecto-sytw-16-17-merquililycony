// importar
    var express = require('express');
    var app = express();
    var path = require('path');


    // escuchar
   // app.listen(80);
   app.set('port', process.env.PORT || 80);

    deploy_digitalocean.push_digitalocean();


//digitalocean git:remote -a digitalocean-project-name
app.listen(app.get('port'), function() {
  console.log('Servidor escuchando en el puerto:'+app.get('port'));
});


module.exports = app;
