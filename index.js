/*
	Creamos el proyectos npm init
	Instalamos express npm install express --save
*/
//Importamos a express y lo usamos como variable
	var express = require('express');
//Creamos la aplicacion e inicializamos la libreria
	var app = express();

//Por medio de get le enviamos un mensaje 
	app.get('/', function(req, res){
		res.send('Hola mundo');
	});

// Le decimos en que puerto escuchara
app.listen(3000, function(){
	console.log('aplicacion corriendo');
});

//lo corremos con node index
//podemos ver en http://localhost:3000/ el mensaje