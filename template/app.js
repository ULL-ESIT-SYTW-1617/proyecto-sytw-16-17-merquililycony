// importar
    var express = require('express');

    // instanciar
    var app = express();
    var path = require('path');


   // ruteo

   app.use(express.static(path.join(__dirname,'gh-pages')));


   app.get('/', function(request, response) {
     response.send('index');
   });


    // escuchar
   // app.listen(80);
   app.set('port', process.env.PORT || 80);


app.listen(app.get('port'), function() {
  console.log('Servidor escuchando en el puerto:'+app.get('port'));
});

