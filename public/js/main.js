$(function () {
	var audio = $('audio');
	
	function cargarCanciones(){
		//Con ajax pasamos un objeto
		$.ajax({
			url: '/canciones'
		//Recibimos array de canciones
		}).done(function(canciones){
			var lista = $('.lista-canciones');
			//Vaciamos la lista para agregar nuestras canciones
			lista.empty();
			//Desplegamos el array
			canciones.forEach(function(cancion){
				var nuevoElemento = $('<li class="cancion">'+cancion.nombre+'</li>');
				
				nuevoElemento
					//Cuando se de clic, obtenemos la cancion y activamos la funcion play
					.on('click', cancion, play)
					//Agregamos el nuevo elemento a la lista
					.appendTo(lista);
			})
		//Si falla
		}).fail(function(){
			alert('No se pudieron cargar las canciones');
		})
	}

	//Cambiara el atributo src
	function play(evento){
		//Elemento nativo audio[0] , para la cancion
		audio[0].pause();
		//Elemento Jquery audio , data nos da acceso al objeto cancion (al que se clickeo)
		audio.attr('src', '/canciones/' + evento.data.nombre);
		audio[0].play();
	}

	cargarCanciones();
});