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
// Importamos fs (modulo de node que nos permite acceder a archivos de pc)
	var fs = require('fs');

// Con el metodo static le asignamos la carpeta estatica
	app.use(express.static('public'));
// Instalamos Jquery npm install jquery --save
	app.use('/jquery', express.static(path.join(__dirname, 'node_modules', 'jquery', 'dist')));

//Por medio de get le enviamos un mensaje 
	app.get('/', function(req, res){
		//Enviamos un archivo concatenando el directorio actual mas index.html
		res.sendFile(path.join(__dirname, '/index.html'));
	});

// De la ruta canciones ejecutamos una funcion
app.get('/canciones', function(req, res){
	//Leemos el archivo explicitamente en utf8, 
	fs.readFile(path.join(__dirname,'canciones.json'), 'utf8', function(err, canciones){
		//Muestra un error en la consola si hay error
		if (err){
			throw err;
		}
		else{
			// Le enviamos al buscador la lista de canciones, y transformamos en json
			res.json(JSON.parse(canciones));
			//Revisar en http://localhost:3000/canciones
		}
	});
});

// Le decimos en que puerto escuchara
app.listen(3000, function(){
	console.log('aplicacion corriendo');
});

//lo corremos con node index
//podemos ver en http://localhost:3000/ el mensaje