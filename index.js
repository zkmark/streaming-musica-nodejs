/*
	Creamos el proyectos npm init
	Instalamos express npm install express --save
*/
//Importamos a express y lo usamos como variable
	var express = require('express');
//Creamos la aplicacion e inicializamos la libreria
	var app = express();
// Importamos el modulo path, para manipular los directosios del SO
	var path = require('path');

// Con el metodo static le asignamos la carpeta estatica
	app.use(express.static('public'));

//Por medio de get le enviamos un mensaje 
	app.get('/', function(req, res){
		//Enviamos un archivo concatenando el directorio actual mas index.html
		res.sendFile(path.join(__dirname, '/index.html'));
	});

// Le decimos en que puerto escuchara
app.listen(3000, function(){
	console.log('aplicacion corriendo');
});

//lo corremos con node index
//podemos ver en http://localhost:3000/ el mensaje