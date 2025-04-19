 /**
  * Función para Crear una capa WMS (Web Map Service) con OpenLayers.
  *
  * @param {string} layerName - El nombre completo de la capa que se cargará desde el servidor WMS.
  * @param {string} urlServicio - La URL del servicio WMS.
  * @returns {TileLayer} - Devuelve una instancia de `TileLayer` configurada con la fuente WMS.
  */
 const createWmsLayer = (layerName, urlServicio, id) => {
     // Determinamos si la capa es una capa base
     const isBaseLayer = urlServicio !== 'http://mapascoello.ujaen.es:8080/geoserver/alumno21/wms';
     return new ol.layer.Tile({
         // Configuración de la fuente de la capa: TileWMS
         source: new ol.source.TileWMS({
             // Atribuciones que se mostrarán en el mapa para la capa
             attributions: developedBy,
             // URL del servidor WMS
             url: urlServicio,
             // Parámetros que se envían al servidor WMS
             params: {
                 'LAYERS': layerName, // Nombre de la capa en el servidor WMS
                 'TILED': false, // Carga de la capa como imagen completa (no mosaicos)
                 'VERSION': '1.3.0', // Versión del protocolo WMS que se utiliza
                 'FORMAT': 'image/png', // Formato de la imagen devuelta por el servidor
                 'SRS': 'EPSG:4258' // Sistema de referencia espacial usado para la capa
             },
             // Tipo de servidor especificado: GeoServer
             serverType: 'geoserver'
         }),
         // Propiedad que define si la capa estará visible inicialmente
         visible: false, // La capa estará oculta al inicio
         properties: {
             isBaseLayer: isBaseLayer,
             id: id || null // Agregamos el id o null si no se proporciona
         }
     });
 };

 const bounds = [-2500000.254, 4192521.039, 1526951.938, 5900000.312];
 const base = "http://www.ign.es/wms-inspire/ign-base?";
 const base_pnoa = "http://www.ign.es/wms-inspire/pnoa-ma?";
 const urlCapas = 'http://mapascoello.ujaen.es:8080/geoserver/alumno21/wms';
 const developedBy = 'Cartografia Tematica: © Desarrollada por John Lopez';
 const ignBaseTodoWmsLayer = createWmsLayer('IGNBaseTodo', base);
 const basePnoaWmsLayer = createWmsLayer('OI.OrthoimageCoverage', base_pnoa);

 const limitesAdvtosWmsLayer = createWmsLayer('alumno21:Limites_adtvos', urlCapas, 3);
 const hombresVsMujeres2013WmsLayer = createWmsLayer('alumno21:HombresvsMujeres_2013', urlCapas, 4);
 const hombresVsMujeres2023WmsLayer = createWmsLayer('alumno21:HombresvsMujeres_2023', urlCapas, 5);
 const paro2013_2023WmsLayer = createWmsLayer('alumno21:Paro2013_2023', urlCapas, 6);
 const densidadPoblacion2013WmsLayer = createWmsLayer('alumno21:Densidad_pob_2013', urlCapas, 7);
 const densidadPoblacion2023WmsLayer = createWmsLayer('alumno21:Densidad_2023', urlCapas, 8);
 const oficinaSepeWmsLayer = createWmsLayer('alumno21:Oficina SEPE', urlCapas, 9);
 const curvasNivelWmsLayer = createWmsLayer('alumno21:Curvas de Nivel', urlCapas, 10);
 const riosWmsLayer = createWmsLayer('alumno21:Rios', urlCapas, 11);
 const deseminadoWsmLayer = createWmsLayer('alumno21:Diseminado', urlCapas, 12);
 const zonaUsoWmsLayer = createWmsLayer('alumno21:Zona de usos', urlCapas, 13);
 const autopistaWmsLayer = createWmsLayer('alumno21:Autopista', urlCapas, 14);
 const autoviaWmsLayer = createWmsLayer('alumno21:Autovia', urlCapas, 15);
 const carreteraNacionalWmsLayer = createWmsLayer('alumno21:Carretera Nacional', urlCapas, 16);
 const carreteraAutonomicaWmsLayer = createWmsLayer('alumno21:Carretera Autonomica', urlCapas, 17);
 const nucleoPoblacionWmsLayer = createWmsLayer('alumno21:Nucleo Poblacional', urlCapas, 18);
 const zonasProtegidasWmsLayer = createWmsLayer('alumno21:Zonas Protegidas', urlCapas, 19);






 // Seleccionamos elementos
 const optionBtn = document.getElementById('optionBtn');
 const panel = document.getElementById('panel');

 // Creamos el div para el overlay
 const overlay = document.createElement("div");
 overlay.classList.add("overlay");
 // Añadimos el overlay al cuerpo del documento
 document.body.appendChild(overlay);

 // Evento para abrir/cerrar el panel
 optionBtn.addEventListener('click', () => {
     // Cambiamos el estado del panel 
     panel.classList.toggle('active');
     // Cambiamos el color de boton 
     optionBtn.classList.toggle('active');
     // Mostramos/ocultamos el overlay
     overlay.classList.toggle("active");
 });

 // Evento para cerrar el panel cuando se haga clic en el overlay
 overlay.addEventListener('click', () => {
     // Ocultamos el panel y el overlay cuando se haga clic en el overlay
     panel.classList.remove('active');
     optionBtn.classList.remove('active');
     overlay.classList.remove('active');
 });




 const map = new ol.Map({
     target: 'map',
     layers: [
         new ol.layer.Tile({
             source: new ol.source.OSM({
                 attributions: developedBy
             }),
         }),
         ignBaseTodoWmsLayer,
         basePnoaWmsLayer,
         limitesAdvtosWmsLayer,
         hombresVsMujeres2013WmsLayer,
         hombresVsMujeres2023WmsLayer,
         paro2013_2023WmsLayer,
         densidadPoblacion2013WmsLayer,
         densidadPoblacion2023WmsLayer,
         oficinaSepeWmsLayer,
         curvasNivelWmsLayer,
         riosWmsLayer,
         deseminadoWsmLayer,
         zonaUsoWmsLayer,
         autopistaWmsLayer,
         autoviaWmsLayer,
         carreteraNacionalWmsLayer,
         carreteraAutonomicaWmsLayer,
         nucleoPoblacionWmsLayer,
         zonasProtegidasWmsLayer,
     ],
     view: new ol.View({
         center: ol.proj.fromLonLat([0, 0]),
         extent: bounds,
         zoom: 2,
     }),
 });

 // Capa vectorial para el marcador
 const markerSource = new ol.source.Vector(); // Fuente de datos para el marcador
 const markerLayer = new ol.layer.Vector({
     source: markerSource,
     style: new ol.style.Style({
         image: new ol.style.Icon({
             anchor: [0.5, 1], // Anclado en la parte inferior del ícono
             src: '../geoportal/imagenes/gps.png', // Ícono del marcador
             scale: 0.05 // Escala del ícono
         }),
     }),
 });
 map.addLayer(markerLayer); // Agregamos la capa de marcador al mapa




 // Lista de capas base disponibles
 const layersBases = [{
         name: 'Base OSM', id: 0
     },
     {
         name: 'Base IGN', id: 1
     },
     {
         name: 'Base PNOA', id: 2
     },
 ];

 // Lista de otras capas disponibles
 const layersCapasGenerales = [{
         name: 'Límites Administrativos', id: 3
     },
     {
         name: 'Hombres vs Mujeres 2013', id: 4
     },
     {
         name: 'Hombres vs Mujeres 2023', id: 5
     },
     {
         name: 'Paro2013_2023', id: 6
     },
     {
         name: 'Dencidad Población 2013', id: 7
     },
     {
         name: 'Dencidad Población 2023', id: 8
     },
     {
         name: 'Oficinas SEPE', id: 9
     },
     {
         name: 'Curvas de Nivel', id: 10
     },
     {
         name: 'Ríos', id: 11
     },
     {
         name: 'Deseminado', id: 12
     },
     {
         name: 'Zona Uso', id: 13
     },
     {
         name: 'Autopistas', id: 14
     },
     {
         name: 'Autovia', id: 15
     },
     {
         name: 'Carretera Nacional', id: 16
     },
     {
         name: 'Carretera Autonomica', id: 17
     },
     {
         name: 'Núcleo Población', id: 18
     },
     {
         name: 'Zonas Protegidas', id: 19
     },

 ];

 // Variables globales para los paneles
 let panelBase;
 let panelGenerales;
 let leyendaDiv;

 /**
  * Función para crear un panel dinámico que gestiona capas de un mapa.
  * 
  * @param {string} titulo - Título del panel.
  * @param {Array} capas - Arreglo de objetos que representa las capas. Cada objeto debe contener:
  *                        - `id`: Identificador único de la capa.
  *                        - `name`: Nombre de la capa.
  * @param {string} tipoEntrada - Tipo de entrada a generar en el panel ("radio" para botones de selección única, "button" para botones independientes).
  * @returns {HTMLElement} - Devuelve un elemento `div` que representa el panel dinámico.
  */
 function crearPanel(titulo, capas, tipoEntrada) {
     // Creamos el contenedor principal del panel y lo ocultamos inicialmente
     const panelCapas = document.createElement('div');
     panelCapas.style.display = 'none'; // Inicialmente oculto

     // Creamos el encabezado del panel
     const header = document.createElement('div');
     header.id = 'panelCapasHeader';

     // Título del panel
     const title = document.createElement('span');
     title.innerText = titulo;

     // Botón para cerrar el panel
     const closeButton = document.createElement('button');
     closeButton.innerText = 'X';
     closeButton.addEventListener('click', () => {
         panelCapas.style.display = 'none'; // Ocultar el panel al hacer clic
     });

     // Añadimos el título y el botón de cerrar al encabezado
     header.appendChild(title);
     header.appendChild(closeButton);

     // Añadimos el encabezado al panel
     panelCapas.appendChild(header);

     // Contenedor para los botones o inputs dinámicos
     const baseMapaContainer = document.createElement('div');
     baseMapaContainer.id = 'baseMapaContainer';
     panelCapas.appendChild(baseMapaContainer);

     // Iteramos sobre las capas para generar dinámicamente los controles
     capas.forEach(layer => {
         if (tipoEntrada === 'radio') {
             // Creamos un input de tipo radio para capas base
             const radioInput = document.createElement('input');
             radioInput.type = 'radio';
             radioInput.id = layer.name.replace(/\s+/g, '').toLowerCase(); // Generar id único
             radioInput.name = 'base_osm'; // Grupo de botones radio
             radioInput.value = layer.name;
             radioInput.dataset.id = layer.id;
             radioInput.checked = layer.id === 0; // Activar el primer botón por defecto

             // Creamos la etiqueta asociada al input
             const label = document.createElement('label');
             label.htmlFor = radioInput.id;
             label.innerHTML = layer.name;

             // Añadimos un evento para alternar la visibilidad de las capas
             radioInput.addEventListener('change', () => {
                 capas.forEach(layer => {
                     const selectedLayer = map.getLayers().getArray()[layer.id];
                     const button = baseMapaContainer.querySelector(`input[data-id="${layer.id}"]`);
                     if (button && button.checked) {
                         selectedLayer.setVisible(true); // Mostrar la capa seleccionada
                     } else {
                         selectedLayer.setVisible(false); // Ocultar otras capas
                     }
                 });
             });

             // Añadimos el input y su etiqueta al contenedor
             baseMapaContainer.appendChild(radioInput);
             baseMapaContainer.appendChild(label);
             baseMapaContainer.appendChild(document.createElement('br')); // Salto de línea
         } else if (tipoEntrada === 'button') {
             // Creamos botones independientes para las capas generales
             const layerButton = document.createElement('button');
             layerButton.className = 'admin-button';
             layerButton.innerHTML = layer.name;
             layerButton.dataset.id = layer.id;

             // Añadimos un evento para alternar la visibilidad de cada capa
             layerButton.addEventListener('click', () => {
                 const selectedLayer = map.getLayers().getArray()[layer.id];
                 if (selectedLayer) {
                     const isVisible = selectedLayer.getVisible();
                     if (!isVisible) {
                         toggleSpinner(true); // Mostrar spinner mientras carga
                     }
                     setTimeout(() => {
                         selectedLayer.setVisible(!isVisible); // Alternar visibilidad
                         toggleSpinner(false); // Ocultar spinner
                     }, 200);

                     // Cambiar el estilo del botón dependiendo de la visibilidad
                     layerButton.style.backgroundColor = !isVisible ? 'rgb(26, 132, 56)' : '';
                     layerButton.style.color = !isVisible ? 'white' : 'black';

                     // Limpiar información de la capa si se desactiva
                     if (isVisible) {
                         limpiarInfo(layer.id);
                     }
                 }
             });

             // Añadimos el botón al contenedor
             baseMapaContainer.appendChild(layerButton);
             baseMapaContainer.appendChild(document.createElement('br')); // Salto de línea
         }
     });

     // Retornamos el panel dinámico para su uso externo
     return panelCapas;
 }

 // Función para limpiar los elementos 'feature-info' asociados a un layer
 const limpiarInfo = (layerId) => {
     //console.log('Entramos en limpiarInfo');
     // Buscar todos los elementos con la clase 'toggle-button'
     const featureInfoElements = Array.from(document.querySelectorAll('.toggle-button'));

     featureInfoElements.forEach(element => {
         const elementLayerId = element.dataset.layerId; // Obtener el data-layer-id del botón
         //console.log('Elemento LayerId:', elementLayerId);
         //console.log('LayerID:', layerId);
         if (elementLayerId === String(layerId)) {
             //console.log('Se eliminó el elemento con layerId:', elementLayerId);
             element.remove();
         }
     });
 };


 /**
  * Función para crear y mostrar un panel que permite gestionar capas base en un mapa.
  * 
  * - Si el panel no existe, lo crea dinámicamente utilizando la función `crearPanel`.
  * - Muestra el panel para capas base y oculta otros paneles relacionados (capas generales y leyenda, si están presentes).
  * 
  * @global {HTMLElement} panelBase - Panel para gestionar las capas base del mapa.
  */
 function mostrarPanelCapasBase() {
     // Busca si el panel para capas base ya existe en el documento
     panelBase = document.getElementById('panelBase');

     // Si el panel no existe, se crea dinámicamente
     if (!panelBase) {
         // Llama a la función `crearPanel` para generar el panel de capas base
         panelBase = crearPanel('Mapa Base', layersBases, 'radio');

         // Asigna un ID único al panel para facilitar su identificación en el DOM
         panelBase.id = 'panelBase';

         // Añade el panel recién creado al cuerpo del documento
         document.body.appendChild(panelBase);
     }

     // Muestra el panel de capas base
     panelBase.style.display = 'block';

     // Si el panel de capas generales existe, lo oculta
     if (panelGenerales) {
         panelGenerales.style.display = 'none';
     }

     // Si el panel de leyenda existe, lo oculta
     if (leyendaDiv) {
         leyendaDiv.style.display = 'none';
     }
 }



 /**
  * Función para crear y mostrar un panel que permite gestionar las capas generales de un mapa.
  * 
  * - Si el panel no existe, lo crea dinámicamente utilizando la función `crearPanel`.
  * - Muestra el panel para capas generales y oculta otros paneles relacionados (capas base y leyenda, si están presentes).
  * 
  * @global {HTMLElement} panelGenerales - Panel para gestionar las capas generales del mapa.
  */
 function mostrarPanelCapasGenerales() {
     // Busca si el panel para capas generales ya existe en el documento
     panelGenerales = document.getElementById('panelGenerales');

     // Si el panel no existe, se crea dinámicamente
     if (!panelGenerales) {
         // Llama a la función `crearPanel` para generar el panel de capas generales
         panelGenerales = crearPanel('Capas Almería', layersCapasGenerales, 'button');

         // Asigna un ID único al panel para facilitar su identificación en el DOM
         panelGenerales.id = 'panelGenerales';

         // Añade el panel recién creado al cuerpo del documento
         document.body.appendChild(panelGenerales);
     }

     // Muestra el panel de capas generales
     panelGenerales.style.display = 'block';

     // Si el panel de capas base existe, lo oculta
     if (panelBase) {
         panelBase.style.display = 'none';
     }

     // Si el panel de leyenda existe, lo oculta
     if (leyendaDiv) {
         leyendaDiv.style.display = 'none';
     }
 }


 // Evento para mostrar/ocultar el panel de "Mapa Base" al hacer clic en su imagen
 const mapBase = document.getElementById('mapBase');
 mapBase.addEventListener('click', (e) => {
     e.preventDefault();
     mostrarPanelCapasBase();
 });

 // Evento para mostrar/ocultar el panel de "Capas Generales" al hacer clic en su imagen
 const mapCapa = document.getElementById('mapCapa');
 mapCapa.addEventListener('click', (e) => {
     e.preventDefault();
     mostrarPanelCapasGenerales();
 });

 const obtenerLeyendaCapaActiva = () => {
     const layers = map.getLayers().getArray(); // Obtener todas las capas del mapa

     // Contenedor para mostrar todas las leyendas
     leyendaDiv = document.getElementById('leyendaDiv');
     if (!leyendaDiv) {
         leyendaDiv = document.createElement('div');
         leyendaDiv.className = 'leyenda';
         leyendaDiv.id = 'leyendaDiv';

         document.body.appendChild(leyendaDiv);
     }

     // Limpiar leyendas previas
     leyendaDiv.innerHTML = ''; // Limpiar el contenido previo

     // Crear el header con el botón de cierre
     const header = document.createElement('div');
     header.className = 'leyenda-header';

     const titulo = document.createElement('h4');
     titulo.className = 'leyenda-titulo';
     titulo.textContent = 'Leyendas de Capas Activas';

     const botonCerrar = document.createElement('button');
     botonCerrar.className = 'leyenda-boton-cerrar';
     botonCerrar.textContent = 'X';
     botonCerrar.addEventListener('click', () => {
         leyendaDiv.style.display = 'none'; // Ocultar el contenedor de leyendas al hacer clic en el botón
     });

     header.appendChild(titulo);
     header.appendChild(botonCerrar);
     leyendaDiv.appendChild(header);

     // Verificamos capas activas
     let capasActivas = false; // Variable para saber si hay capas activas

     layers.forEach(layer => {
         // Verificamos si la capa es visible y tiene una fuente compatible con WMS
         if (layer.getVisible() && layer.getSource() && layer.getSource().params_ && !layer.get('isBaseLayer')) {
             const layerName = layer.getSource().params_.LAYERS; // Nombre de la capa
             if (layerName) {
                 capasActivas = true;
                 mostrarLeyenda(leyendaDiv, layerName); // Llamamos a la función para mostrar cada leyenda
             }
         }
     });

     if (!capasActivas) {
         const noCapasMessage = document.createElement('div');
         noCapasMessage.className = 'no-capass-activas';
         noCapasMessage.textContent = 'No hay capas activas';
         leyendaDiv.appendChild(noCapasMessage);
     }

     // mostramos el panel si se está accediendo a él
     leyendaDiv.style.display = 'block'; // Aseguramos de que el panel esté visible después de actualizar
 };

 const mostrarLeyenda = (contenedor, layerName) => {
     const baseUrl = 'http://mapascoello.ujaen.es:8080/geoserver/alumno21/wms';
     const leyendaUrl = `${baseUrl}?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&FORMAT=image/png&LAYER=${layerName}`;

     // Creamos contenedor individual para cada leyenda
     const leyendaItem = document.createElement('div');
     leyendaItem.className = 'leyenda-item';

     // Creamos el título de la leyenda
     const tituloLeyenda = document.createElement('h5');
     tituloLeyenda.textContent = `Capa: ${layerName.substring(9)}`;

     const imagenLeyenda = document.createElement('img');
     imagenLeyenda.src = leyendaUrl;
     imagenLeyenda.alt = `Leyenda de la capa ${layerName}`;
     imagenLeyenda.className = 'leyenda-imagen';

     // Agregamos los elementos al contenedor de leyenda
     leyendaItem.appendChild(tituloLeyenda);
     leyendaItem.appendChild(imagenLeyenda);

     // Agregamos la leyenda al contenedor principal
     contenedor.appendChild(leyendaItem);
 };




 // Evento para mostrar/ocultar el panel de "Capas Generales" al hacer clic en su imagen
 const mapLeyenda = document.getElementById('leyenda');
 mapLeyenda.addEventListener('click', (e) => {
     e.preventDefault();
     obtenerLeyendaCapaActiva();
     if (panelBase)
         panelBase.style.display = 'none';
     if (panelGenerales)
         panelGenerales.style.display = 'none';
 });





 // Creamos un spinner para indicar la carga
 const loadingSpinner = document.createElement('div');
 loadingSpinner.id = 'loading-spinner';
 loadingSpinner.style.position = 'absolute';
 loadingSpinner.style.top = '50%';
 loadingSpinner.style.left = '50%';
 loadingSpinner.style.transform = 'translate(-50%, -50%)';
 loadingSpinner.style.zIndex = '1000';
 loadingSpinner.style.display = 'none'; // Oculto inicialmente

 // Creamos el contenedor y los estilos del spinner
 loadingSpinner.innerHTML = `
    <div class="spinner-container">
        <div class="spinner"></div>
    </div>
`;

 // Agregamos el spinner al contenedor del mapa
 map.getTargetElement().appendChild(loadingSpinner);

 // Función para mostrar/ocultar el spinner
 function toggleSpinner(show) {
     loadingSpinner.style.display = show ? 'block' : 'none';
 }




 // Creamos un elemento para mostrar la escala
 const scaleElement = document.createElement('div');
 scaleElement.className = 'scale-map';
 scaleElement.id = 'scale';
 // Agregamos la escala al mapa 
 map.getTargetElement().appendChild(scaleElement);

 // Función para calcular y formatear la escala
 function formatScale(scale) {
     if (scale >= 1_000_000) {
         return `1:${(scale / 1_000_000).toFixed(0)}M`; // Millones con 1 decimal
     } else if (scale >= 1_000) {
         return `1:${(scale / 1_000).toFixed(0)}K`; // Miles con 1 decimal
     } else {
         return `1:${Math.round(scale)}`; // Números completos
     }
 }

 /**
  * Convierte un valor decimal en formato DMS (grados, minutos, segundos).
  * @param {number} degree - Coordenada decimal (latitud o longitud).
  * @param {boolean} isLongitude - Indica si es longitud (true) o latitud (false).
  * @returns {string} Coordenada en formato DMS.
  */
 const toDMS = (degree, isLongitude) => {
     const absolute = Math.abs(degree);
     const degrees = Math.floor(absolute);
     const minutesDecimal = (absolute - degrees) * 60;
     const minutes = Math.floor(minutesDecimal);
     const seconds = ((minutesDecimal - minutes) * 60).toFixed(1);

     const direction = degree >= 0 ?
         isLongitude ?
         'E' :
         'N' :
         isLongitude ?
         'O' :
         'S';

     return `${degrees}°${minutes}'${seconds}"${direction}`;
 };



 /**
  * Elimina todos los elementos de información (con clase 'feature-info') dentro del contenedor del mapa.
  * 
  * Esta función recorre el contenedor del mapa y elimina cualquier elemento con la clase 'feature-info'.
  * Esto es útil para limpiar los detalles de las características que se muestran en el mapa, especialmente
  * cuando se actualiza la visualización de datos o se desea quitar la información previa antes de mostrar nueva información.
  *
  * @param {ol.Map} map - El objeto de mapa de OpenLayers en el que se eliminarán los elementos de información.
  * 
  * @example
  * limpiarInfoDiv(map);
  */
 const limpiarInfoDiv = (map) => {
     // Obtenemos el contenedor del mapa
     const mapContainer = map.getTargetElement();

     // Buscamos todos los elementos con la clase 'feature-info' dentro del contenedor del mapa
     const existeInfoDiv = mapContainer.getElementsByClassName('feature-info');

     // Eliminamos todos los elementos encontrados
     while (existeInfoDiv.length > 0) {
         existeInfoDiv[0].remove(); // Eliminamos el primer elemento hasta que la colección esté vacía
     }
 };



 /**
  * Calcula y actualiza la escala del mapa basada en la resolución actual de la vista.
  * 
  * Esta función obtiene la resolución actual del mapa, que está relacionada con el nivel de zoom, 
  * y utiliza una fórmula basada en la densidad de píxeles de la pantalla (96 ppi) y la conversión 
  * de metros a pulgadas para calcular la escala del mapa. Luego, actualiza el valor de la escala 
  * en el elemento HTML correspondiente.
  *
  * @function
  * @returns {void} No retorna ningún valor, solo actualiza el contenido del DOM.
  *
  * @example
  * updateScale();
  */
 function updateScale() {
     // Obtenemos la resolución actual del mapa
     const resolution = map.getView().getResolution();

     // Resolución de pantalla (96 píxeles por pulgada)
     const dpi = 96;

     // Conversión de metros por pulgada
     const metersPerInch = 0.0254;

     // Calculamos la escala usando la resolución, dpi y metros por pulgada
     const scale = resolution * dpi / metersPerInch;

     // Actualizamos el valor de la escala formateada en el elemento HTML correspondiente
     scaleElement.innerHTML = `Escala: ${formatScale(scale)}`;
 }


 // Actualizamos la escala cuando el mapa cambia
 map.getView().on('change:resolution', updateScale);

 // Inicializamos la escala
 updateScale();



 // Creamos el elemento div para MousePosition
 const mousePosition = document.createElement('div');
 mousePosition.id = 'mouse-position';
 mousePosition.className = 'custom-mouse-position';

 // Agregamos el elemento al contenedor del mapa
 map.getTargetElement().appendChild(mousePosition);

 // Creamos el control MousePosition
 const mousePositionControl = new ol.control.MousePosition({
     coordinateFormat: (coord) => {
         const lon = toDMS(coord[0], true); // Longitud
         const lat = toDMS(coord[1], false); // Latitud
         return `${lat} ${lon}`;
     },
     projection: 'EPSG:4326', // Proyección de las coordenadas (WGS84)
     target: mousePosition, // Usamos directamente el elemento creado
     placeholder: 'Fuera del Mapa' // Texto  cuando el mouse no está sobre el mapa
 });

 // Agregamos el control al mapa
 map.addControl(mousePositionControl);




 /**
  * Evento de clic simple en el mapa para obtener información de las capas visibles.
  * 
  * - Obtiene las URLs de las capas visibles que soportan `GetFeatureInfo`.
  * - Filtra las capas que no son base y que están configuradas para ser consultables.
  * - Llama a la función `getFeatureData` para manejar los datos obtenidos.
  * - Añade un marcador en la posición clicada.
  * 
  * @event singleclick
  * @param {Object} evt - Objeto de evento que contiene la coordenada del clic y otros datos.
  */
 map.on('singleclick', function (evt) {
     // Obtiene la resolución actual de la vista del mapa
     const viewResolution = map.getView().getResolution();

     // Obtiene todas las capas del mapa
     const layers = map.getLayers().getArray();

     // Arreglo para almacenar los nombres y URLs de las capas visibles
     let urlsAndNames = [];

     // Itera sobre las capas para filtrar y generar las URLs de consulta
     layers.forEach(layer => {
         // Verifica si la capa está visible, soporta `GetFeatureInfo` y no es una capa base
         if (layer.getVisible() && layer.getSource().getFeatureInfoUrl && !layer.get('isBaseLayer')) {
             // Genera la URL de consulta `GetFeatureInfo` para la capa
             const url = layer.getSource().getFeatureInfoUrl(
                 evt.coordinate, // Coordenada del clic
                 viewResolution, // Resolución actual
                 map.getView().getProjection(), // Proyección del mapa
                 {
                     'INFO_FORMAT': 'application/json', // Formato de respuesta
                 }
             );

             console.log(url); // Imprime la URL generada en la consola para depuración

             if (url) {
                 // Obtiene el nombre de la capa y su ID
                 const nombreCapa = layer.getSource().params_.LAYERS;
                 const idLayer = layer.get('id');

                 // Almacena la información en el arreglo `urlsAndNames`
                 urlsAndNames.push({
                     nombreCapa,
                     url,
                     id: idLayer
                 });
             }
         }
     });

     // Verifica si hay capas consultables disponibles
     if (urlsAndNames.length > 0) {
         // Llama a la función para obtener datos de las capas visibles
         getFeatureData(urlsAndNames);
         console.log(urlsAndNames); // Imprime la información obtenida en la consola

         // Actualiza la posición del marcador en el mapa
         markerSource.clear(); // Limpia cualquier marcador anterior
         const markerFeature = new ol.Feature(
             new ol.geom.Point(evt.coordinate) // Crea un marcador en la posición clicada
         );
         markerSource.addFeature(markerFeature); // Agrega el marcador a la fuente de datos
     } else {
         // Si no hay capas consultables, muestra un mensaje en la consola
         console.log("No hay URLs disponibles");

         // Limpia la información visualizada en el mapa y los marcadores
         limpiarInfoDiv(map);
         markerSource.clear();
     }
 });



 /**
  * Función asincrónica para obtener y mostrar información de características (features) 
  * desde URLs proporcionadas.
  * 
  * - Consulta servicios `GetFeatureInfo` para obtener información de características.
  * - Crea un panel dinámico para mostrar los resultados obtenidos.
  * - Permite alternar la visualización de información por capa.
  * 
  * @async
  * @function
  * @param {Array} urlJson - Array de objetos que contienen información sobre capas:
  *   - `nombreCapa` (string): Nombre de la capa.
  *   - `url` (string): URL del servicio `GetFeatureInfo` de la capa.
  *   - `id` (number): Identificador único de la capa.
  */
 const getFeatureData = async (urlJson) => {
     try {
         // Obtiene el contenedor principal del mapa
         const mapContainer = map.getTargetElement();

         // Limpia cualquier información previa mostrada en el mapa
         limpiarInfoDiv(map);

         // Crea un contenedor principal para mostrar la información de las características
         const infoDiv = document.createElement('div');
         infoDiv.className = 'feature-info';

         // Crea el encabezado del panel
         const headerContainer = document.createElement('div');
         headerContainer.className = 'header';
         const headerText = document.createElement('span');
         headerText.textContent = 'INFORMACIÓN';

         // Botón de cerrar el panel
         const closeButton = document.createElement('button');
         closeButton.className = 'close-button';
         closeButton.textContent = 'X';

         // Evento para cerrar el panel y limpiar los marcadores
         closeButton.addEventListener('click', () => {
             infoDiv.style.display = 'none';
             markerSource.clear();
         });

         // Añade el encabezado y botón al contenedor principal
         headerContainer.appendChild(headerText);
         headerContainer.appendChild(closeButton);
         infoDiv.appendChild(headerContainer);

         // Procesa cada capa en `urlJson` para obtener datos
         urlJson.forEach(({
             nombreCapa,
             url,
             id
         }) => {
             // Crea un botón para alternar la visualización de información de la capa
             const toggleButton = document.createElement('div');
             toggleButton.className = 'toggle-button';
             toggleButton.id = `toggle-${id}`;
             toggleButton.dataset.layerId = id;
             toggleButton.textContent = `> ${nombreCapa.substring(9)}`;

             // Contenedor adicional para mostrar detalles
             const extraInfo = document.createElement('div');
             extraInfo.className = 'extra-info';
             extraInfo.style.display = 'none';

             // Evento para alternar la visualización del contenedor de detalles
             toggleButton.addEventListener('click', () => {
                 extraInfo.style.display = extraInfo.style.display === 'none' ? 'block' : 'none';
                 toggleButton.style.color = toggleButton.style.color === 'rgb(7, 2, 2)' ? 'white' : 'rgb(7, 2, 2)';
                 toggleButton.style.backgroundColor = toggleButton.style.backgroundColor === 'rgb(13, 131, 142)' ? 'rgb(69, 146, 148)' : 'rgb(13, 131, 142)';
                 toggleButton.style.borderBottom = toggleButton.style.borderBottom === '2px solid  rgb(89, 86, 86)' ? 'none' : '2px solid  rgb(89, 86, 86)';
             });

             // Añade el botón y contenedor de detalles al panel principal
             infoDiv.appendChild(toggleButton);
             infoDiv.appendChild(extraInfo);

             // Realiza la consulta a la URL de la capa
             fetch(url)
                 .then((response) => {
                     if (!response.ok) {
                         throw new Error(`HTTP error! Status: ${response.status}`);
                     }
                     return response.json();
                 })
                 .then((data) => {
                     // Verifica si hay datos en la respuesta
                     if (!data.features || data.features.length === 0) {
                         const noDataMessage = document.createElement('p');
                         noDataMessage.textContent = 'No se encontraron features en la respuesta.';
                         extraInfo.appendChild(noDataMessage);
                         return;
                     }

                     // Procesa los datos de las características
                     createFeatureInfo(data.features, nombreCapa.substring(9), extraInfo);
                 })
                 .catch((error) => {
                     console.error(`Error al procesar la URL ${url}:`, error);
                 });
         });

         // Añade el contenedor principal al mapa
         map.getTargetElement().appendChild(infoDiv);
     } catch (error) {
         console.error('Error al obtener datos del servicio:', error);
     }
 };



 /**
  * Configuración de las capas del mapa.
  * 
  * Cada clave en el objeto `layerConfig` corresponde al nombre de una capa, y el valor es un arreglo
  * de propiedades que se deben mostrar cuando se seleccionan características de esa capa.
  * 
  * @type {Object.<string, string[]>}
  */
 const layerConfig = {
     'Autopista': ['ID', 'ID_CODIGO', 'ESTAD_0602', 'ETIQUETA'],
     'Limites_adtvos': ['ID', 'ID_CODIGO', 'CODIGO_INE', 'TIPO_0101', 'ETIQUETA', 'Sup_Km2'],
     'Paro2013_2023': ['ID', 'ID_CODIGO', 'CODIGO_INE', 'TIPO_0101', 'ETIQUETA', 'Paro_2013', 'Paro_2023', 'Sup_Km2'],
     'HombresvsMujeres_2013': ['ID', 'ID_CODIGO', 'CODIGO_INE', 'TIPO_0101', 'ETIQUETA', 'Sup_Km2'],
     'HombresvsMujeres_2023': ['ID', 'ID_CODIGO', 'CODIGO_INE', 'TIPO_0101', 'ETIQUETA', 'Sup_Km2'],
     'Densidad_pob_2013': ['ID', 'ID_CODIGO', 'TIPO_0101', 'CODIGO_INE', 'ETIQUETA', 'Sup_Km2', 'Den_2013'],
     'Densidad_2023': ['ID', 'ID_CODIGO', 'TIPO_0101', 'CODIGO_INE', 'ETIQUETA', 'Sup_Km2', 'Den_2023'],
     'Curvas de Nivel': ['ID', 'TIPO_0202', 'CATEG_0202', 'COTA'],
     'Rios': ['ID', 'ETIQUETA'],
     'Oficina SEPE': ['id', 'Cod_postal', 'Ciudad', 'Direccio0n'],
     'Diseminado': ['ID', 'ID_CODIGO', 'CODIGO_INE', 'ETIQUETA', 'POBLACION'],
     'Zona de usos': ['ID', 'ID_CODIGO', 'TIPO_0503', 'ETIQUETA'],
     'Autovia': ['ID', 'ID_CODIGO', 'ESTAD_0601', 'ETIQUETA'],
     'Carretera Nacional': ['ID', 'ID_CODIGO', 'ESTAD_0603', 'ETIQUETA'],
     'Carretera Autonomica': ['ID', 'ID_CODIGO', 'ESTAD_0604', 'ETIQUETA'],
     'Nucleo Poblacional': ['ID', 'ID_CODIGO', 'CODIGO_INE', 'POBLACION', 'CAPITAL', 'ETIQUETA'],
     'Zonas Protegidas': ['ID', 'TIPO_0102', 'ETIQUETA'],
 };


 /**
  * Crea la información visualizable para cada característica de la capa activa.
  * 
  * Esta función toma las características de la capa activa, extrae las propiedades definidas en la
  * configuración de `layerConfig` para esa capa, y genera elementos HTML para mostrarlas en un contenedor
  * específico dentro de la página.
  * 
  * @param {Object[]} features - Arreglo de objetos que representan las características de la capa seleccionada.
  *                              Cada objeto debe tener una propiedad `properties` con los datos correspondientes.
  * @param {string} capaActiva - Nombre de la capa activa, usado para acceder a la configuración de la capa.
  * @param {HTMLElement} extraInfo - Elemento HTML donde se mostrará la información generada.
  * 
  * @example
  * createFeatureInfo(features, 'Autopista', document.getElementById('info-container'));
  */
 const createFeatureInfo = (features, capaActiva, extraInfo) => {
     console.log('Procesando datos para la capa:', capaActiva);

     // Verifica si la capa activa está configurada
     if (!layerConfig[capaActiva]) {
         console.warn(`No se ha encontrado la capa "${capaActiva}" en la configuración.`);
         return;
     }

     // Obtiene las propiedades a mostrar de la capa activa
     const propertiesToRender = layerConfig[capaActiva];
     const fragment = document.createDocumentFragment();

     // Recorre las características y genera la información visual
     features.forEach((feature) => {
         const properties = feature.properties;
         const featureData = document.createElement('div');
         featureData.className = 'feature-data';
         featureData.innerHTML = propertiesToRender
             .map((prop) => `<p><strong>${prop.replace(/_/g, ' ')}:</strong> ${properties[prop] || 'N/A'}</p>`)
             .join('');
         fragment.appendChild(featureData);
     });

     // Añade la información generada al contenedor extraInfo
     extraInfo.appendChild(fragment);
 };





 // Creamos el contenedor principal donde se muestran las medidas 
 const panelContainer = document.createElement('div');
 panelContainer.id = 'panel-container';
 panelContainer.style.display = 'none';
 panelContainer.style.position = 'absolute';
 panelContainer.style.top = '50px';
 panelContainer.style.left = '450px';
 panelContainer.style.width = '250px';
 panelContainer.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
 panelContainer.style.borderRadius = '5px';
 panelContainer.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)';

 // Creamos el título "Medidas"
 const title = document.createElement('div');
 title.id = 'panel-title';
 title.textContent = 'Medidas';
 title.style.backgroundColor = '#007bff'; // Azul

 title.style.color = '#ffffff'; // Texto blanco
 title.style.fontSize = '16px';
 title.style.fontWeight = 'bold';
 title.style.textAlign = 'center';
 title.style.padding = '10px 0';
 title.style.borderRadius = '5px 5px 0 0';

 // Agregamos el título al contenedor principal
 panelContainer.appendChild(title);

 // Creamos el div para mostrar las medidas
 const output = document.createElement('div');
 output.id = 'measure-output';
 output.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
 output.style.padding = '10px';
 output.style.borderRadius = '5px';
 output.style.fontSize = '14px';
 output.style.lineHeight = '1.5';
 output.textContent = '';

 // Agregamos el div de medidas al contenedor principal
 panelContainer.appendChild(output);

 // Agregamos el contenedor principal al mapa (o al cuerpo del documento si es independiente del mapa)
 map.getTargetElement().appendChild(panelContainer);





 // Fuente para los dibujos
 const source = new ol.source.Vector();

 const vectorLayer = new ol.layer.Vector({
     source: source,
     attributions: developedBy,
     style: new ol.style.Style({
         fill: new ol.style.Fill({
             color: 'rgba(255, 255, 255, 0.2)',
         }),
         stroke: new ol.style.Stroke({
             color: 'blue',
             width: 3,
         }),
         image: new ol.style.Circle({
             radius: 7,
             fill: new ol.style.Fill({
                 color: '#ffcc33',
             }),
         }),
     }),
 });

 map.addLayer(vectorLayer);

 // Creamos el contenedor de medidas
 const medidas = document.createElement('div');
 medidas.id = 'medidas';
 medidas.style.position = 'absolute';
 medidas.style.display = 'flex';
 medidas.style.top = '9px';
 medidas.style.left = '450px';
 medidas.style.backgroundColor = 'white';
 medidas.style.width = '250px';
 medidas.style.height = '40px'; // Ajustar la altura
 medidas.style.justifyContent = 'space-between'; // Separar divs equitativamente
 map.getTargetElement().appendChild(medidas);

 // Función para Creamos los divs dentro del contenedor medidas
 const CreamosDivMedida = (id, imgSrc) => {
     const div = document.createElement('div');
     div.id = id;
     div.style.backgroundColor = 'white';
     div.style.border = '2px solid grey';
     div.style.width = '100px';
     div.style.height = '40px';
     div.style.display = 'flex';
     div.style.justifyContent = 'center';
     div.style.alignItems = 'center';

     const img = document.createElement('img');
     img.src = imgSrc;
     img.style.width = '30%';
     img.style.height = '20px';
     div.appendChild(img);

     return div;
 };

 // Creamos los divs con imágenes
 const medidaData = [{
         id: 'poligono',
         imgSrc: '../geoportal/imagenes/dibujar-poligono.png'
     },
     {
         id: 'rectangulo',
         imgSrc: '../geoportal/imagenes/rectangulo.png'
     },
     {
         id: 'circulo',
         imgSrc: '../geoportal/imagenes/circulo.png'
     },
     {
         id: 'linea',
         imgSrc: '../geoportal/imagenes/medida.png'
     },
 ];

 // Agregamos cada medida al contenedor
 medidaData.forEach(item => {
     const div = CreamosDivMedida(item.id, item.imgSrc);
     medidas.appendChild(div);
 });



 // Variable para guardar la interacción activa
 let interactionActiva = null;
 let nombreActiva = null;

 /**
  * Maneja las interacciones del usuario con el mapa, permitiendo dibujar geometrías
  * (punto, línea, polígono, círculo, etc.) al seleccionar el botón correspondiente.
  * 
  * Cuando un usuario hace clic en un botón, se activa una interacción para dibujar la geometría
  * especificada en el mapa. Si ya hay una interacción activa, se desactiva antes de agregar una nueva.
  * 
  * La función también maneja el cálculo y la visualización de las medidas de las geometrías dibujadas
  * (por ejemplo, área para polígonos o distancia para líneas).
  * 
  * @param {string} botonId - El id del botón en el que se hace clic para activar la interacción. 
  *                            Este id se usa para verificar cuál botón está activo y modificar su estilo.
  * @param {string} tipo - El tipo de geometría que el usuario podrá dibujar (por ejemplo, "Point", "LineString", "Polygon").
  * @param {ol.source.Vector} fuente - La fuente de vectores donde se guardarán las geometrías dibujadas.
  * @param {Function|null} geometryFunction - Una función opcional para modificar la geometría, como el cálculo de un radio para círculos. 
  *                                           Si no se requiere, debe ser `null` (por defecto).
  * 
  * @example
  * manejarInteraccion('poligono', 'Polygon', vectorSource);
  */
 const manejarInteraccion = (botonId, tipo, fuente, geometryFunction = null) => {
     let interaction;

     // Asocia un evento de clic al botón correspondiente
     document.getElementById(botonId).onclick = () => {
         // Si ya hay una interacción activa para el botón, la removemos
         if (interactionActiva && nombreActiva === botonId) {
             map.removeInteraction(interactionActiva);
             source.clear(); // Limpiar la fuente para eliminar las geometrías previas
             interactionActiva = null;
             document.getElementById(botonId).style.backgroundColor = 'white';
             panelContainer.style.display = 'none';
             return;
         } else {
             map.removeInteraction(interactionActiva);
             source.clear(); // Limpiar la fuente para eliminar las geometrías previas
             document.getElementById(botonId).style.backgroundColor = 'white';
             if (nombreActiva !== null) {
                 document.getElementById(nombreActiva).style.backgroundColor = 'white';
             }
         }

         // Verifica si la nueva interacción ya está activa
         console.log(source.getFeatures().length);
         if (!map.getInteractions().getArray().includes(interaction)) {
             console.log(`Agregamos interacción para ${botonId}`);
             panelContainer.style.display = 'none';

             // Crea una nueva interacción de dibujo
             interaction = new ol.interaction.Draw({
                 source: fuente,
                 type: tipo,
                 geometryFunction: geometryFunction, // Se usa si es necesario
             });

             // Agrega la interacción al mapa
             map.addInteraction(interaction);

             // Guarda la interacción activa y cambia el estilo del botón
             interactionActiva = interaction;
             nombreActiva = botonId;
             document.getElementById(botonId).style.backgroundColor = '#07785d';

             // Evento cuando se termina de dibujar
             interaction.on('drawend', function (event) {
                 const feature = event.feature;
                 const geom = event.feature.getGeometry();
                 console.log(`${botonId} dibujado:`, feature.getGeometry().getExtent());
                 console.log(source.getFeatures().length);

                 // Dependiendo del tipo de geometría, calcula y muestra la medida
                 switch (nombreActiva) {
                     case 'poligono':
                         output.textContent = formatArea(geom);
                         break;
                     case 'circulo':
                         document.getElementById('measure-output').textContent =
                             `Radio: ${(geom.getRadius()).toFixed(2)} m`;
                         break;
                     case 'linea':
                         output.textContent = `Distancia: ${formatLength(geom)} `;
                         break;
                     case 'rectangulo':
                         output.textContent = formatArea(geom);
                         break;
                     default:
                         output.textContent = `Geometría desconocida`;
                         break;
                 }

                 panelContainer.style.display = 'block';

                 // Desactiva la interacción al finalizar el dibujo
                 console.log(`Dibujo completado, desactivamos interacción para ${botonId}`);
                 map.removeInteraction(interactionActiva);
             });
         }
     };
 };


 // Usar la función común para cada botón
 manejarInteraccion('poligono', 'Polygon', source);
 manejarInteraccion('rectangulo', 'Circle', source, ol.interaction.Draw.createBox()); // Rectángulo (función de geometría)
 manejarInteraccion('circulo', 'Circle', source); // Círculo
 manejarInteraccion('linea', 'LineString', source); // Línea

 const formatLength = (line) => {
     const length = ol.sphere.getLength(line);
     return length > 1000 ?
         `${(length / 1000).toFixed(2)} km` :
         `${length.toFixed(2)} m`;
 };

 const formatArea = (polygon) => {
     const area = ol.sphere.getArea(polygon);
     return area > 10000 ?
         `Area: ${(area / 1000000).toFixed(2)} km²` :
         `Area: ${area.toFixed(2)} m²`;
 };




 // Creamos el contenedor de tooltip
 const tooltip = document.createElement('div');
 tooltip.id = 'tooltip';
 tooltip.style.position = 'absolute';
 tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
 tooltip.style.color = 'white';
 tooltip.style.padding = '5px';
 tooltip.style.borderRadius = '5px';
 tooltip.style.fontSize = '12px';
 tooltip.style.display = 'none'; // Ocultarlo inicialmente
 document.body.appendChild(tooltip);

 // Función para mostrar el tooltip
 const mostrarTooltip = (event, texto) => {
     tooltip.textContent = texto;
     tooltip.style.left = `${event.pageX + 10}px`; // Ajustar posición
     tooltip.style.top = `${event.pageY + 10}px`;
     tooltip.style.display = 'block';
 };

 // Función para ocultar el tooltip
 const ocultarTooltip = () => {
     tooltip.style.display = 'none';
 };

 // Agregamos eventos de tooltip a los divs de medidas
 medidaData.forEach((item) => {
     const div = document.getElementById(item.id);

     div.addEventListener('mouseenter', (event) => {
         let mensaje = `Área: ${item.id}`;
         mostrarTooltip(event, mensaje = item.id === 'linea' ? `Distancia: ${item.id}` : item
             .id === 'circulo' ? `Radio: ${item.id}` : mensaje);
     });

     div.addEventListener('mousemove', (event) => {
         tooltip.style.left = `${event.pageX + 10}px`;
         tooltip.style.top = `${event.pageY + 10}px`;
     });

     div.addEventListener('mouseleave', ocultarTooltip);
 });