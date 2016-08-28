$(function () {
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
				//Agregamos el nuevo elemento a la lista
				nuevoElemento.appendTo(lista);
			})
		//Si falla
		}).fail(function(){
			alert('No se pudieron cargar las canciones');
		})
	}

	cargarCanciones();
});