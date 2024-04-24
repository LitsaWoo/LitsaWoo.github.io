/* initialize the map. 
  setView method: Sets the view of the map (geographical center and zoom)
 */

  document.addEventListener("DOMContentLoaded", function() {
    var map = L.map('mapId', {
        center: [46.955157, 105.305162],
        zoom: 5,
        zoomControl: false,
        tap: true
    });

    /*control panel to display map layers*/

    var controlLayers = L.control.layers(baseMap).addTo(map);

    // Chose a map style from http://leaflet-extras.github.io/leaflet-providers/preview/

   //terrain map with outline/label overlay
var Esri_WorldImagery = L.layerGroup([
  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: false,
  })
]).addTo(map);

L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_toner_lines/{z}/{x}/{y}{r}.{ext}', {
  attribution: false,
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);

L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_terrain_labels/{z}/{x}/{y}{r}.{ext}', {
  minZoom: 0,
  maxZoom: 18,
  attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  ext: 'png'
}).addTo(map);

controlLayers.addBaseLayer(Esri_WorldImagery, "Terrain Basemap");


     //dark outline map
     var CartoDB_DarkMatter = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
       attribution: false,
       maxZoom: 20,
     
     });
     controlLayers.addBaseLayer(CartoDB_DarkMatter, "Street Basemap");
     
    
     
     // Create a variable to add to the control panel variable
     
     var baseMap = {
       "Street Basemap": CartoDB_DarkMatter,
       "Terrain Basemap": Esri_WorldImagery,
       
     }
   // Zoom controls
   var zoomOptions = {
     zoomInText: '+',
     zoomOutText: '-',
     position: 'bottomleft'
   };
   var zoom = L.control.zoom(zoomOptions);
   zoom.addTo(map);
   
   // Scale controls
   var scale = L.control.scale();
   scale.addTo(map);
   
   // About section
   $(document).ready(function() {
     // Open the modal when the button is clicked
     $("#aboutmap").click(function() {
       $("#modal-background").fadeIn();
       $(".modal-content").fadeIn();
     });
   
     // Close the modal when the close button or the background is clicked
     $(".close, .modal-background").on("click", function() {
       $("#modal-background").fadeOut();
       $(".modal-content").fadeOut();
     });
   });
   
   
   const slider = document.getElementById('slider');
   
     noUiSlider.create(slider, {
         start: [1997, 2023],
         connect: true,
         range: {
           'min': 1997,
           'max': 2022
         },
         step: 1,
         connect: true,
         behaviour: 'tap-drag',
         orientation: 'vertical',
         direction: 'rtl',
         tooltips: true,
         mode: 'steps',
         stepped: true,
         format: {
           from: function(value) {
                   return parseInt(value);
               },
           to: function(value) {
                   return parseInt(value);
               }}
     });
   
     
   // Search dropdown menu for mammals
   $('#Species').multiselect({
    texts: {
     placeholder: 'Хөхтний зүйл сонгох',
     search: 'Эрэл хайгуул хийх',
     selectAll: 'Бүгдийг сонгох',
     unselectAll: 'Бүгдийг нь сонгоно уу'},
     search: true,
     selectAll: true,
     selectGroup: true,
     maxPlaceholderOpts: 1,
   });
   
   // Search dropdown menu for ectoparasites
   $('#Ectoparasites').multiselect({
    texts: {
     placeholder: 'Эктопаразитын зүйл сонгох',
     search: 'Эрэл хайгуул хийх',
     selectAll: 'Бүгдийг сонгох',
     unselectAll: 'Бүгдийг нь сонгоно уу' },
     search: true,
     selectAll: true,
     selectGroup: true,
     maxPlaceholderOpts: 1,
   });
   
   // Search dropdown menu for endoparasites
   $('#Endoparasites').multiselect({
    texts: {
     placeholder: 'Эндопаразитын зүйл сонгох',
     search: 'Эрэл хайгуул хийх',
     selectAll: 'Бүгдийг сонгох',
     unselectAll: 'Бүгдийг нь сонгоно уу'},
     search: true,
     selectAll: true,
     selectGroup: true,
     maxPlaceholderOpts: 1,
   });
   
     // Read in the GeoJSON file
     fetch("Species/MongoliaSpecies.geojson")
       .then(response => response.json())
       .then(data => {
         // Define the features variable
         var features = data.features;
   
         // Define the markers layer
         const markers = L.markerClusterGroup({
           disableClusteringAtZoom: 20,
         });
   
         // Define a function to return color based on the family value
         function getColor(family) {
           switch (family) {
             case "Bovidae":
               return {color: "rgba(128, 0, 0, 1.0)"}; //  maroon
             case "Camelidae":
               return {color: "rgba(170, 110, 40, 1.0)"}; // brown
             case "Canidae":
               return {color: "rgba(220, 190, 255, 1.0)"}; // lavender
             case "Cervidae":
               return {color: "rgba(0, 128, 128, 1.0)"}; // teal
             case "Cricetidae":
               return {color: "rgba(100, 25, 10, 1.0)"}; // red
             case "Dipodidae":
               return {color: "rgba(0, 0, 0, 1.0)"}; // black
             case "Equidae":
               return {color: "rgba(0, 0, 128, 1.0)"}; // navy
             case "Erinaceidae":
               return {color: "rgba(245, 130, 48, 1.0)"}; // orange
             case "Gliridae":
               return {color: "rgba(255, 255, 25, 1.0)"}; // yellow
              case "Leporidae":
               return {color: "rgba(210, 245, 60, 1.0)"}; // lime
             case "Muridae":
               return {color: "rgba(60, 180, 75, 1.0)"}; // green
             case "Mustelidae":
               return {color: "rgba(240, 50, 230, 1.0)"}; // magenta
             case "Ochotonidae":
               return {color: "rgba(0, 130, 200, 1.0)"}; // blue
             case "Sciuridae":
               return {color: "rgba(145, 30, 180, 1.0)"}; // purple
             case "Soricidae":
              return {color: "rgba(70, 240, 240, 1.0)"}; // cyan
             case "Spalacidae":
               return {color: "rgba(128, 128, 128, 1.0)"}; // grey
             case "Vespertilionidae":
               return {color: "rgba(255, 255, 255, 1.0)"}; // white
             
           }      
         }
   
   // Add dropdown filter functionality for mammals
   const mammalsOptionsSet = new Set();
   const ectoparasitesOptionsSet = new Set();
   const endoparasitesOptionsSet = new Set();
   
   features.forEach(feature => {
       const scientificName = feature.properties.scientific_name;
       const trimmedName = scientificName.trim().toLowerCase();
       mammalsOptionsSet.add(trimmedName);
   
       const paraEcto = feature.properties.ParaEcto;
       if (paraEcto && typeof paraEcto === 'string') {
           ectoparasitesOptionsSet.add(paraEcto.toLowerCase());
       }
   
       const paraEndo = feature.properties.ParaEndo;
       if (paraEndo && typeof paraEndo === 'string') {
           endoparasitesOptionsSet.add(paraEndo.toLowerCase());
       }
   });
   
   
      $('#Species, #Ectoparasites, #Endoparasites').on('change', () => {
       filterGeoJSON();
   });
   
   
   slider.noUiSlider.on('change', () => {
     filterGeoJSON();
   });
   
   function filterGeoJSON() {
     // Get the selected values from the dropdown filters
     const selectedMammals = $('#Species').val() || [];
     const selectedEctoparasites = $('#Ectoparasites').val() || [];
     const selectedEndoparasites = $('#Endoparasites').val() || [];
    
     // Get the range of years from the slider
     const yearRange = slider.noUiSlider.get();
     
     // Check if all filter options are empty
     if (selectedMammals.length === 0 && selectedEctoparasites.length === 0 && selectedEndoparasites.length === 0) {
       // Clear the markers layer and return
       markers.clearLayers();
       return;
     }
     
     // Filter the features based on the selected values and year range
     const filteredFeatures = features.filter(feature => {
         const year = new Date(feature.properties.Date).getFullYear();
   
         const paraEndoLower = feature.properties.ParaEndo.toLowerCase();
         const selectedEndoparasitesLower = selectedEndoparasites.map(name => name.toLowerCase());
   
         const paraEctoLower = feature.properties.ParaEcto.toLowerCase();
         const selectedEctoparasitesLower = selectedEctoparasites.map(name => name.toLowerCase());
   
         // Check if the feature matches all selected filters
         const isMammalIncluded = selectedMammals.length === 0 || selectedMammals.includes(feature.properties.scientific_name);
         const isEctoparasiteIncluded = selectedEctoparasites.length === 0 || selectedEctoparasitesLower.every(selectedName => paraEctoLower.includes(selectedName));
         const isEndoparasiteIncluded = selectedEndoparasites.length === 0 || selectedEndoparasitesLower.every(selectedName => paraEndoLower.includes(selectedName));
   
         return isMammalIncluded && isEctoparasiteIncluded && isEndoparasiteIncluded &&
             (year >= yearRange[0] && year <= yearRange[1]);
     });
   
     // Clear the markers layer
     markers.clearLayers();


  
     // Add the filtered features to the markers layer
    L.geoJSON(filteredFeatures, {
       onEachFeature: function (feature, layer) {
           var MSB_mammal_number = feature.properties.guid;
   
           var popupContent = "<strong>Түгээмэл Нэр: </strong>" + feature.properties.mongolian_name + "<br>" +
               "<strong>Цуглуулсан Огноо: </strong>" + feature.properties.MongDate + "<br>" +
               "<strong>Аймаг: </strong>" + feature.properties.aimags + "<br>" +
               "<strong>Координатууд: </strong>" + feature.geometry.coordinates + "<br>" +
               "<strong>Эктопаразит Олдсон: </strong>" + feature.properties.ParaEctoMong + "<br>" +
               "<strong>Олдсон Эктопаразитын Тоо: </strong>" + feature.properties.total_ecto + "<br>" +
               "<strong>Эндопаразит Олдсон: </strong>" + feature.properties.ParaEndoMong + "<br>" +
               "<strong>Олдсон Эндопаразит Тоо: </strong>" + feature.properties.total_endo + "<br>" +
               "<strong>Музейн Дугаар: </strong><a href='https://arctos.database.museum/guid/" + MSB_mammal_number + "' target='_blank'>" + MSB_mammal_number + "</a>";
           layer.bindPopup(popupContent);
       },
       pointToLayer: function (feature, latlng) {
           var color;
           if (feature.properties.family) {
               color = getColor(feature.properties.family);
           } else {
               color = { color: "rgba(0, 0, 0, 1.0)", stroke: "rgba(0, 0, 0, 1.0)" };
           }
   
           return L.circleMarker(latlng, {
               fillColor: color.color,
               color: color.stroke,
               radius: 7.5,
               weight: 1,
               opacity: 1,
               fillOpacity: 1
           });
       }
   }).addTo(markers);
   
   map.addLayer(markers);
   }
   
   
   
           map.addLayer(markers);
           // Get a reference to the toggle button
   const toggleClusterButton = document.getElementById("toggle");
   
   // Flag to track clustering state
   let isClusteringEnabled = true;
   
   // Add event listener to handle button click
   toggleClusterButton.addEventListener("click", function() {
     if (isClusteringEnabled) {
       markers.disableClustering();
     } else {
       markers.enableClustering();
     }
     
     isClusteringEnabled = !isClusteringEnabled; // Toggle the flag
   });
         }
       );
   
   
   
   ;
   
     // Search range dropdown menu
   $('#range').multiselect({
    texts: {
     placeholder: 'Хөхтний зүлийн тархац нутгийг сонгох',
     search: 'Эрэл хайгуул хийх',
     selectAll: 'Бүгдийг сонгох' },
     search: true,
     selectAll: true,
     selectGroup: true,
     maxPlaceholderOpts: 1,
   });
   function getColor(FAM_NAME) {
     switch (FAM_NAME) {
       case "Bovidae":
               return {color: "rgba(128, 0, 0, 1.0)"}; //  maroon
             case "Camelidae":
               return {color: "rgba(170, 110, 40, 1.0)"}; // brown
             case "Canidae":
               return {color: "rgba(220, 190, 255, 1.0)"}; // lavender
             case "Cervidae":
               return {color: "rgba(0, 128, 128, 1.0)"}; // teal
             case "Cricetidae":
               return {color: "rgba(100, 25, 10, 1.0)"}; // red
             case "Dipodidae":
               return {color: "rgba(0, 0, 0, 1.0)"}; // black
             case "Equidae":
               return {color: "rgba(0, 0, 128, 1.0)"}; // navy
             case "Erinaceidae":
               return {color: "rgba(245, 130, 48, 1.0)"}; // orange
             case "Gliridae":
               return {color: "rgba(255, 255, 25, 1.0)"}; // yellow
              case "Leporidae":
               return {color: "rgba(210, 245, 60, 1.0)"}; // lime
             case "Muridae":
               return {color: "rgba(60, 180, 75, 1.0)"}; // green
             case "Mustelidae":
               return {color: "rgba(240, 50, 230, 1.0)"}; // magenta
             case "Ochotonidae":
               return {color: "rgba(0, 130, 200, 1.0)"}; // blue
             case "Sciuridae":
               return {color: "rgba(145, 30, 180, 1.0)"}; // purple
             case "Soricidae":
              return {color: "rgba(70, 240, 240, 1.0)"}; // cyan
             case "Spalacidae":
               return {color: "rgba(128, 128, 128, 1.0)"}; // grey
             case "Vespertilionidae":
               return {color: "rgba(255, 255, 255, 1.0)"}; // white
   
     }
   }
   let geoJSONLayer; // Declare a variable to store the GeoJSON layer
   
   const rangeFilter = $('#range');
   
   // Add event listener for filter changes
   rangeFilter.on('change', () => {
     filterGeoJSON();
   });
   
   function filterGeoJSON() {
     // Get the selected species from the dropdown filter
     const speciesRange = rangeFilter.val();
   
     // Check if the GeoJSON layer is already added to the map
     if (geoJSONLayer && map.hasLayer(geoJSONLayer)) {
       // Remove the GeoJSON layer from the map
       map.removeLayer(geoJSONLayer);
     }
   
     // Load GeoJSON from an external file
     fetch("Species/AllSpeciesMerged.geojson")
       .then(response => response.json())
       .then(data => {
         // Filter the GeoJSON data based on the selected species
         const filteredFeatures = data.features.filter(feature => {
           return speciesRange.includes(feature.properties.SCI_NAME);
         });
   
         // Create a new GeoJSON layer with the filtered features
         geoJSONLayer = L.geoJSON(filteredFeatures, {
           style: function(feature) {
             var color = getColor(feature.properties.FAM_NAME);
             return {
               fillColor: color.color,
               color: color.stroke,
               weight: 2,
               opacity: 1,
               fillOpacity: 0.7
             };
           },
           onEachFeature: function(feature, layer) {
             var popupContent = "<strong>Species Range: </strong>" + feature.properties.SCI_NAME + "<br>";
             layer.bindPopup(popupContent);
           }
         });
   
         // Add the new GeoJSON layer to the map
         geoJSONLayer.addTo(map);
       });
   
       
   }
     });
     function navigateToPage(page) {
       window.location.href = page;
     }
     
     