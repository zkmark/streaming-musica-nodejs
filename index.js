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
// Instalamos media server npm install mediaserver --save (para audio)
	var mediaserver = require('mediaserver');
// Instalamos npm install multer --save (midelware para procesar la data)
	var multer = require('multer');

// Opciones para Almacenar en el disco
	var opcionesMulter = multer.diskStorage({
		//Donde se guardara 
		destination: function(req, file, callback){
			callback(null, path.join(__dirname, 'canciones'));
		},
		filename: function(req, file, callback){
			//La guardamos con el nombre que tenia
			callback(null, file.originalname);
		}
	});

	var upload = multer({
		storage: opcionesMulter
	});

// Con el metodo static le asignamos la carpeta estatica
	app.use(express.static('public'));
// Instalamos Jquery npm install jquery --save
	app.use('/jquery', express.static(path.join(__dirname, 'node_modules', 'jquery', 'dist')));

//Por medio de get le enviamos un mensaje 
	app.get('/', function(req, res){
		//Enviamos un archivo concatenando el directorio actual mas index.html
		res.sendFile(path.join(__dirname, 'index.html'));
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

// En la ruta canciones buscamos en el nombre dinamico
app.get('/canciones/:nombre', function(req, res){
	//Obtenemos el nombre por parametros
	var cancion = path.join(__dirname, 'canciones', req.params.nombre);
	//Con el pipe lo comunicamos, 
	mediaserver.pipe(req, res, cancion);
});

//Por post, multer estara pendiente de un solo archivo del input name cancion
	app.post('/canciones', upload.single('cancion'), function(req, res) {
		var archivo_canciones = path.join(__dirname, 'canciones.json');
		var nombre = req.file.originalname;
		//Agregaremos al canciones.json las nuevas canciones
		fs.readFile(archivo_canciones, 'utf8', function(err, archivo){
			if (err){
				throw err;
			}
			else{
				//Transforma el texto en un objeto js
				var canciones = JSON.parse(archivo);
				canciones.push({nombre: nombre});
				//Pasamos de un objeto a texto
				fs.writeFile(archivo_canciones, JSON.stringify(canciones), function(err){
					if (err){
						throw err;
					}else{
						res.sendFile(path.join(__dirname, 'index.html'));
					}
				});
			}
		});
	});

// Le decimos en que puerto escuchara
	app.listen(3000, function(){
		console.log('aplicacion corriendo');
	});

//lo corremos con node index
//podemos ver en http://localhost:3000/ el mensaje