/* initialize the map. 
  setView method: Sets the view of the map (geographical center and zoom)
 */

  var map = L.map('mapId', {
    center: [46.955157, 105.305162],
    zoom: 4,
    zoomControl: false,
    tap: true
  });
  
  /*control panel to display map layers*/
  
  var controlLayers = L.control.layers(baseMap).addTo(map);
  
  // Chose a map style from http://leaflet-extras.github.io/leaflet-providers/preview/

//terrain map with outline/label overlay
var Esri_WorldImagery = L.layerGroup([L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: false,
    
  }).addTo(map),
  
  L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-hybrid/{z}/{x}/{y}{r}.{ext}', {
    attribution: false,
    minZoom: 0,
    maxZoom: 20,
    ext: 'png',
  })]).addTo(map);
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
  
  //zoom controls
  var zoomOptions = {
    zoomInText: '+',
    zoomOutText: '-',
    position: 'bottomleft'
  };
  var zoom = L.control.zoom(zoomOptions);
  zoom.addTo(map);
  
  //scale controls
  var scale = L.control.scale();
  scale.addTo(map);

//about section

$(document).ready(function() {
  // Open the modal when the button is clicked
  $("#aboutmap").click(function() {
    console.log("Button clicked!");
    $("#modal-background").fadeIn();
    $(".modal-content").fadeIn();
  });

  // Close the modal when the close button or the background is clicked
  $(".close, .modal-background").on("click", function() {
    $("#modal-background").fadeOut();
    $(".modal-content").fadeOut();
  });
});


//Search dropdown menu  
  $('#Species').multiselect({
    placeholder: 'Select Species',
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



  // Define a function to return color based on the scientific_name value
  function getColor(scientific_name) {
    switch (scientific_name) {
      case "Allocricetulus curtatus":
        return {color: "rgba(0, 0, 0, 1.0)", stroke: "rgba(105, 1, 0)"}; //  black with red outline
      case "Alticola":
        return {color: "rgba(0, 0, 0, 1.0)", stroke: "rgba(0, 18, 204)"}; // black with  dark blue outline
      case "Alticola barakshin":
        return {color: "rgba(0, 0, 0, 1.0)", stroke: "rgba(229, 132, 0)"}; // black with orange outline
      case "Alticola semicanus":
        return {color: "rgba(0, 0, 0, 1.0)", stroke: "rgba(247, 255, 1)"}; // black with yellow outline
      case "Alticola strelzowi":
        return {color: "rgba(0, 0, 0, 1.0)", stroke: "rgba(53, 171, 4)"}; // black with green outline
      case "Alticola tuvinicus":
        return {color: "rgba(0, 0, 0, 1.0)", stroke: "rgba(0, 206, 162)"}; // black with teal outline
      case "Alticola tuvinicus cf.":
        return {color: "rgba(0, 0, 0, 1.0)", stroke: "rgba(64, 49, 12)"}; // black with brown outline
      case "Apodemus":
        return {color: "rgba(0, 0, 0, 1.0)", stroke: "rgba(69, 249, 255)"}; // black with light blue outline
      case "Apodemus agrarius":
        return {color: "rgba(0, 0, 0, 1.0)", stroke: "rgba(103, 19, 215)"}; // black with purple outline
       case "Apodemus peninsulae":
        return {color: "rgba(0, 0, 0, 1.0)", stroke: "rgba(186, 19, 215)"}; // black with pink outline
      case "Apodemus uralensis":
        return {color: "rgba(105, 1, 0, 1.0)", stroke: "rgba(105, 1, 0)"}; // red
      case "Bos grunniens":
        return {color: "rgba(105, 1, 0, 1.0)", stroke: "rgba(0, 18, 204)"}; // red with dark blue outline
      case "Camelus bactrianus":
        return {color: "rgba(105, 1, 0, 1.0)", stroke: "rgba(247, 255, 1)"}; // red with yellow outline
      case "Canis lupus":
        return {color: "rgba(105, 1, 0, 1.0)", stroke: "rgba(53, 171, 4)"}; // red with green outline
      case "Capra hircus":
       return {color: "rgba(105, 1, 0, 1.0)", stroke: "rgba(0, 206, 162)"}; // red with teal outline
      case "Cardiocranius paradoxus":
        return {color: "rgba(105, 1, 0, 1.0)", stroke: "rgba(69, 249, 255)"}; // red with light blue outline
      case "Cervus canadensis":
        return {color: "rgba(105, 1, 0, 1.0)", stroke: "rgba(103, 19, 215)"}; // red with purple outline
      case "Cervus elaphus":
        return {color: "rgba(105, 1, 0, 1.0)", stroke: "rgba(186, 19, 215)"}; // red with pink outline
      case "Clethrionomys":
        return {color: "rgba(0, 0, 0, 1.0)", stroke: "rgba(255, 255, 255)"}; // black with white outline
      case "Clethrionomys rufocanus":
        return {color: "rgba(0, 18, 204, 1.0)", stroke: "rgba(105, 1, 0)"}; // dark blue with red outline
      case "Clethrionomys rutilus":
        return {color: "rgba(0, 18, 204, 1.0)", stroke: "rgba(0, 18, 204)"}; // dark blue 
      case "Clethrionomys rutilus cf.":
        return {color: "rgba(0, 18, 204, 1.0)", stroke: "rgba(1, 10, 112)"}; // dark blue with darker blue outline
      case "Cricetulus":
        return {color: "rgba(0, 18, 204, 1.0)", stroke: "rgba(229, 132, 0)"}; // dark blue with orange outline
      case "Cricetulus barabensis":
        return {color: "rgba(0, 18, 204, 1.0)", stroke: "rgba(247, 255, 1)"}; // dark blue with yellow outline
      case "Cricetulus longicaudatus":
        return {color: "rgba(0, 18, 204, 1.0)", stroke: "rgba(53, 171, 4)"}; // dark blue with green outline
      case "Cricetulus longicaudatus cf.":
        return {color: "rgba(0, 18, 204, 1.0)", stroke: "rgba(37, 110, 7)"}; // dark blue with darker green outline
      case "Cricetulus migratorius":
        return {color: "rgba(0, 18, 204, 1.0)", stroke: "rgba(0, 206, 162)"}; // dark blue with teal outline
      case "Cricetulus sokolovi":
        return {color: "rgba(0, 18, 204, 1.0)", stroke: "rgba(103, 19, 215)"}; // dark blue with purple outline
      case "Crocidura shantungensis":
        return {color: "rgba(0, 18, 204, 1.0)", stroke: "rgba(186, 19, 215)"}; // dark blue with pink outline
      case "Crocidura suaveolens":
        return {color: "rgba(0, 18, 204, 1.0)", stroke: "rgba(255, 255, 255)"}; // dark blue with white outline
      case "Dipus sagitta":
        return {color: "rgba(229, 132, 0, 1.0)", stroke: "rgba(229, 132, 0)"}; // orange
      case "Dryomys nitedula":
        return {color: "rgba(229, 132, 0, 1.0)", stroke: "rgba(105, 1, 0)"}; // orange with red outline
      case "Ellobius tancrei":
        return {color: "rgba(229, 132, 0, 1.0)", stroke: "rgba(0, 18, 204)"}; // orange with dark blue outline
      case "Eolagurus luteus":
        return {color: "rgba(229, 132, 0, 1.0)", stroke: "rgba(247, 255, 1)"}; // orange with yellow outline
      case "Eptesicus":
        return {color: "rgba(229, 132, 0, 1.0)", stroke: "rgba(53, 171, 4)"}; // orange with green outline
      case "Eptesicus gobiensis":
        return {color: "rgba(229, 132, 0, 1.0)", stroke: "rgba(0, 206, 162)"}; // orange with teal outline
      case "Eptesicus nilssoni":
        return {color: "rgba(229, 132, 0, 1.0)", stroke: "rgba(103, 19, 215)"}; // orange with purple outline
      case "Eptesicus serotinus":
        return {color: "rgba(229, 132, 0, 1.0)", stroke: "rgba(186, 19, 215)"}; // orange with pink outline
      case "Equus hemionus":
        return {color: "rgba(229, 132, 0, 1.0)", stroke: "rgba(255, 255, 255)"}; // orange with white outline
      case "Euchoreutes naso":
        return {color: "rgba(229, 132, 0, 1.0)", stroke: "rgba(0, 0, 0)"}; // orange with black outline
      case "Eutamias sibiricus":
        return {color: "rgba(0, 18, 204, 1.0)", stroke: "rgba(0, 0, 0)"}; // dark blue with black outline
      case "Gazella subguttorosa":
        return {color: "rgba(247, 255, 1, 1.0)", stroke: "rgba(247, 255, 1)"}; // yellow
      case "Hemiechinus auritus":
        return {color: "rgba(247, 255, 1, 1.0)", stroke: "rgba(0, 0, 0)"}; // yellow with black outline
      case "Hypsugo alaschanicus":
        return {color: "rgba(247, 255, 1, 1.0)", stroke: "rgba(105, 1, 0)"}; // yellow with red outline
      case "Lasiopodomys brandtii":
        return {color: "rgba(247, 255, 1, 1.0)", stroke: "rgba(0, 18, 204)"}; // yellow with dark blue outline
      case "Lasiopodomys mandarinus":
        return {color: "rgba(247, 255, 1, 1.0)", stroke: "rgba(53, 171, 4)"}; // yellow with green outline
      case "Lepus timidus":
        return {color: "rgba(247, 255, 1, 1.0)", stroke: "rgba(0, 206, 162)"}; // yellow with teal outline
      case "Lepus tolai":
        return {color: "rgba(247, 255, 1, 1.0)", stroke: "rgba(103, 19, 215)"}; // yellow with purple outline
      case "Marmota":
        return {color: "rgba(247, 255, 1, 1.0)", stroke: "rgba(186, 19, 215)"}; // yellow with pink outline
      case "Marmota baibacina":
        return {color: "rgba(247, 255, 1, 1.0)", stroke: "rgba(255, 255, 255)"}; // yellow with white outline
      case "Marmota sibirica":
        return {color: "rgba(53, 171, 4, 1.0)", stroke: "rgba(53, 171, 4)"}; // green
      case "Martes foina":
        return {color: "rgba(53, 171, 4, 1.0)", stroke: "rgba(0, 0, 0)"}; // green with black outline
      case "Meles leucurus":
        return {color: "rgba(53, 171, 4, 1.0)", stroke: "rgba(105, 1, 0)"}; // green with red outline
      case "Meles meles":
        return {color: "rgba(53, 171, 4, 1.0)", stroke: "rgba(0, 18, 204)"}; // green with dark blue outline
      case "Meriones":
        return {color: "rgba(53, 171, 4, 1.0)", stroke: "rgba(0, 206, 162)"}; // green with teal outline
      case "Meriones meridianus":
        return {color: "rgba(53, 171, 4, 1.0)", stroke: "rgba(103, 19, 215)"}; // green with purple outline
      case "Meriones tamariscinus":
        return {color: "rgba(53, 171, 4, 1.0)", stroke: "rgba(186, 19, 215)"}; // green with pink outline
      case "Meriones unguiculatus":
        return {color: "rgba(53, 171, 4, 1.0)", stroke: "rgba(255, 255, 255)"}; // green with white outline
      case "Microtus":
        return {color: "rgba(0, 206, 162, 1.0)", stroke: "rgba(0, 206, 162)"}; // teal
      case "Microtus arvalis":
        return {color: "rgba(0, 206, 162, 1.0)", stroke: "rgba(0, 0, 0)"}; // teal with black outline
      case "Microtus fortis":
        return {color: "rgba(0, 206, 162, 1.0)", stroke: "rgba(105, 1, 0)"}; // teal with red outline
      case "Microtus fortis cf.":
        return {color: "rgba(0, 206, 162, 1.0)", stroke: "rgba(56, 2, 2)"}; // teal with dark red outline
      case "Microtus gregalis":
        return {color: "rgba(0, 206, 162, 1.0)", stroke: "rgba(0, 18, 204)"}; // teal with dark blue outline
      case "Microtus gregalis cf.":
        return {color: "rgba(0, 206, 162, 1.0)", stroke: "rgba(8, 15, 87)"}; // teal with darker blue outline
      case "Microtus limnophilus":
        return {color: "rgba(0, 206, 162, 1.0)", stroke: "rgba(103, 19, 215)"}; // teal with purple outline
      case "Microtus maximowiczii":
        return {color: "rgba(0, 206, 162, 1.0)", stroke: "rgba(186, 19, 215)"}; // teal with pink outline
      case "Microtus maximowiczii cf.":
        return {color: "rgba(0, 206, 162, 1.0)", stroke: "rgba(232, 145, 248)"}; // teal with light pink outline
      case "Microtus mongolicus":
        return {color: "rgba(0, 206, 162, 1.0)", stroke: "rgba(255, 255, 255)"}; // teal with white outline
      case "Microtus mongolicus cf.":
        return {color: "rgba(0, 206, 162, 1.0)", stroke: "rgba(143, 143, 143)"}; // teal with grey outline
      case "Microtus oeconomus":
        return {color: "rgba(103, 19, 215, 1.0)", stroke: "rgba(103, 19, 215)"}; // purple
      case "Microtus oeconomus cf.":
        return {color: "rgba(103, 19, 215, 1.0)", stroke: "rgba(62, 0, 151)"}; // purple with dark purple outline
      case "Mus":
        return {color: "rgba(103, 19, 215, 1.0)", stroke: "rgba(0, 0, 0)"}; // purple with black outline
      case "Mus musculus":
        return {color: "rgba(103, 19, 215, 1.0)", stroke: "rgba(105, 1, 0)"}; // purple with red outline
      case "Mustela altaica":
        return {color: "rgba(103, 19, 215, 1.0)", stroke: "rgba(0, 18, 204)"}; // purple with dark blue outline
      case "Mustela erminea":
        return {color: "rgba(103, 19, 215, 1.0)", stroke: "rgba(53, 171, 4)"}; // purple with green outline
      case "Mustela nivalis":
        return {color: "rgba(0, 206, 162, 1.0)", stroke: "rgba(53, 171, 4)"}; // teal with green outline
      case "Myopus schisticolor":
        return {color: "rgba(103, 19, 215, 1.0)", stroke: "rgba(186, 19, 215)"}; // purple with pink outline
      case "Myospalax aspalax":
        return {color: "rgba(103, 19, 215, 1.0)", stroke: "rgba(255, 255, 255)"}; // purple with white outline
      case "Myospalax psilurus":
        return {color: "rgba(186, 19, 215, 1.0)", stroke: "rgba(186, 19, 215)"}; // pink
      case "Myotis aurascens":
        return {color: "rgba(186, 19, 215, 1.0)", stroke: "rgba(0, 0, 0)"}; // pink with black outline
      case "Myotis brandtii":
        return {color: "rgba(186, 19, 215, 1.0)", stroke: "rgba(105, 1, 0)"}; // pink with red outline
      case "Myotis davidii":
        return {color: "rgba(186, 19, 215, 1.0)", stroke: "rgba(0, 18, 204)"}; // pink with dark blue outline
      case "Myotis nattereri":
        return {color: "rgba(186, 19, 215, 1.0)", stroke: "rgba(53, 171, 4)"}; // pink with green outline
      case "Myotis petax":
        return {color: "rgba(186, 19, 215, 1.0)", stroke: "rgba(0, 206, 162)"}; // pink with teal outline
      case "Myotis sibiricus":
        return {color: "rgba(186, 19, 215, 1.0)", stroke: "rgba(103, 19, 215)"}; // pink with purple outline
      case "Neomys fodiens":
        return {color: "rgba(103, 19, 215, 1.0)", stroke: "rgba(0, 206, 162)"}; // purple with teal outline
      case "Ochotona":
        return {color: "rgba(186, 19, 215, 1.0)", stroke: "rgba(255, 255, 255)"}; // pink with white outline
     case "Ochotona alpina":
        return {color: "rgba(255, 255, 255, 1.0)", stroke: "rgba(255, 255, 255)"}; // white
      case "Ochotona dauurica":
        return {color: "rgba(255, 255, 255, 1.0)", stroke: "rgba(105, 1, 0)"}; // white with red outline
      case "Ochotona hoffmanni":
        return {color: "rgba(255, 255, 255, 1.0)", stroke: "rgba(0, 18, 204)"}; // white with dark blue outline
      case "Ochotona hyperborea":
        return {color: "rgba(255, 255, 255, 1.0)", stroke: "rgba(53, 171, 4)"}; // white with green outline
      case "Ochotona pallasi":
        return {color: "rgba(255, 255, 255, 1.0)", stroke: "rgba(0, 206, 162)"}; // white with teal outline
      case "Ondatra zibethicus":
        return {color: "rgba((255, 255, 255, 1.0)", stroke: "rgba(103, 19, 215)"}; // white with purple outline
      case "Orientallactaga":
        return {color: "rgba(255, 255, 255, 1.0)", stroke: "rgba(186, 19, 215)"}; // white with pink outline
      case "Orientallactaga balikunica":
        return {color: "rgba(255, 255, 255, 1.0)", stroke: "rgba(143, 143, 143)"}; // white with grey outline
      case "Orientallactaga bullata":
        return {color: "rgba(105, 1, 0, 1.0)", stroke: "rgba(143, 143, 143)"}; // red with grey outline
      case "Orientallactaga sibirica":
        return {color: "rgba(0, 18, 204, 1.0)", stroke: "rgba(143, 143, 143)"}; // dark blue with grey outline
      case "Ovis ammon":
        return {color: "rgba(53, 171, 4, 1.0)", stroke: "rgba(143, 143, 143)"}; // green with grey outline
      case "Ovis aries":
        return {color: "rgba(0, 206, 162, 1.0)", stroke: "rgba(143, 143, 143)"}; // teal with grey outline
      case "Phodopus":
        return {color: "rgba(103, 19, 215, 1.0)", stroke: "rgba(143, 143, 143)"}; // purple with grey outline
      case "Phodopus campbelli":
        return {color: "rgba(186, 19, 215, 1.0)", stroke: "rgba(143, 143, 143)"}; // pink with grey outline
      case "Phodopus roborovskii":
        return {color: "rgba(143, 143, 143)", stroke: "rgba(143, 143, 143)"}; // grey
      case "Plecotus kozlovi":
        return {color: "rgba(143, 143, 143, 1.0)", stroke: "rgba(0, 0, 0)"}; // grey with black outline
      case "Plecotus ognevi":
        return {color: "rgba(143, 143, 143, 1.0)", stroke: "rgba(105, 1, 0)"}; // grey with red outline
      case "Pygeretmus pumilio":
        return {color: "rgba(143, 143, 143, 1.0)", stroke: "rgba(0, 18, 204)"}; // grey with dark blue outline
      case "Rattus norvegicus":
        return {color: "rgba(143, 143, 143, 1.0)", stroke: "rgba(53, 171, 4)"}; // grey with green outline
      case "Rhombomys opimus":
        return {color: "rgba(143, 143, 143, 1.0)", stroke: "rgba(0, 206, 162)"}; // grey with teal outline
      case "Salpingotus crassicauda":
        return {color: "rgba(143, 143, 143, 1.0)", stroke: "rgba(103, 19, 215)"}; // grey with purple outline
      case "Salpingotus kozlovi":
        return {color: "rgba(143, 143, 143, 1.0)", stroke: "rgba(186, 19, 215)"}; // grey with pink outline
      case "Sciurus vulgaris":
        return {color: "rgba(143, 143, 143, 1.0)", stroke: "rgba(255, 255, 255)"}; // grey with white outline
      case "Sorex":
        return {color: "rgba(40, 87, 35, 1.0)", stroke: "rgba(40, 87, 35)"}; // dark green
      case "Sorex araneus":
        return {color: "rgba(250, 117, 1, 1.0)", stroke: "rgba(250, 117, 1)"}; // red orange
      case "Sorex caecutiens":
        return {color: "rgba(255, 0, 0, 1.0)", stroke: "rgba(255, 0, 0)"}; // true red
      case "Sorex daphaenodon":
        return {color: "rgba(0, 255, 161, 1.0)", stroke: "rgba(0, 255, 161)"}; // bright green
      case "Sorex isodon":
        return {color: "rgba(0, 167, 255, 1.0)", stroke: "rgba(0, 167, 255)"}; // calm blue
      case "Sorex minutissimus":
        return {color: "rgba(0, 87, 255, 1.0)", stroke: "rgba(0, 87, 255)"}; // vibrant blue
      case "Sorex roboratus":
        return {color: "rgba(21, 0, 255, 1.0)", stroke: "rgba(21, 0, 255)"}; // true blue
      case "Sorex roboratus cf.":
        return {color: "rgba(21, 0, 255, 1.0)", stroke: "rgba(166, 158, 241)"}; // true blue with lavender outline
      case "Sorex tundrensis":
        return {color: "rgba(166, 158, 241, 1.0)", stroke: "rgba(166, 158, 241)"}; // lavender
      case "Sorex tundrensis cf.":
        return {color: "rgba(166, 158, 241, 1.0)", stroke: "rgba(255, 255, 255)"}; // lavender with white outline
      case "Spermophilus alashanicus":
        return {color: "rgba(166, 158, 241, 1.0)", stroke: "rgba(0, 0, 0)"}; // lavender with black outline
      case "Spermophilus dauricus":
        return {color: "rgba(166, 158, 241, 1.0)", stroke: "rgba(143, 143, 143)"}; // lavender with grey outline
      case "Spermophilus pallidicauda":
        return {color: "rgba(166, 158, 241, 1.0)", stroke: "rgba(186, 19, 215)"}; // lavender with pink outline
      case "Spermophilus pallidicauda cf.":
        return {color: "rgba(166, 158, 241, 1.0)", stroke: "rgba(103, 19, 215)"}; // lavender with purple outline
      case "Stylodipus andrewsi":
        return {color: "rgba(102, 7, 246, 1.0)", stroke: "rgba(102, 7, 246)"}; // true purple
      case "Stylodipus sungorus":
        return {color: "rgba(102, 7, 246, 1.0)", stroke: "rgba(255, 255, 255)"}; // true purple with white outline
      case "Urocitellus undulatus":
        return {color: "rgba(139, 198, 131, 1.0)", stroke: "rgba(139, 198, 131)"}; // pistachio green
      case "Vespertilio":
        return {color: "rgba(139, 198, 131, 1.0)", stroke: "rgba(255, 255, 255)"}; // pistachio green with white outline
      case "Vespertilio murinus":
        return {color: "rgba(250, 255, 167, 1.0)", stroke: "rgba(250, 255, 167)"}; // pale yellow
      case "Vulpes corsac":
        return {color: "rgba(64, 49, 12, 1.0)", stroke: "rgba(64, 49, 12)"}; // brown
      case "Vulpes vulpes":
        return {color: "rgba(64, 49, 12, 1.0)", stroke: "rgba(255, 255, 255)"}; // brown with white outline
      

    }
  }
  
  
  // Add dropdown filter functionality
 

  const speciesFilter = $('#Species');
  
 
  // Create options for dropdown filter
  const options = features.reduce((acc, feature) => {
    const scientificName = feature.properties.scientific_name;
    if (!acc.includes(scientificName)) {
        
    }
    return acc;
  }, []);

  // Add options to dropdown filter
  options.forEach((option) => {
    speciesFilter.append(`<option value="${option}"></option>`);
  });

  // Add event listener for filter changes
  speciesFilter.on('change', () => {
    filterGeoJSON();
  });

  // Define the slider and its properties
  const slider = document.getElementById('slider');

  noUiSlider.create(slider, {
      start: [1999, 2022],
      connect: true,
      range: {
        'min': 1999,
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

  // Add event listener for slider changes
  slider.noUiSlider.on('change', () => {
    filterGeoJSON();
  });

    function filterGeoJSON() {
    // Get the selected species from the dropdown filter
    const selectedSpecies = speciesFilter.val();
  
    // Get the range of years from the slider
    const yearRange = slider.noUiSlider.get();
  
    // Filter the features based on the selected species and year range
    const filteredFeatures = features.filter(feature => {
      const year = new Date(feature.properties.Date).getFullYear();
      return selectedSpecies.includes(feature.properties.scientific_name) &&
        year >= yearRange[0] && year <= yearRange[1];
    });
  
    // Clear the markers layer
    markers.clearLayers();
  
    // Add the filtered features to the markers layer
    L.geoJSON(filteredFeatures, {
      onEachFeature: function(feature, layer) {
        var popupContent = "<strong>Scientific Name: </strong>" + feature.properties.scientific_name + "<br>" + 
                           "<strong>Collection Date: </strong>" + feature.properties.Date + "<br>" + 
                           "<strong>Province: </strong>" + feature.properties.state_prov + "<br>" +
                           "<strong>Catalog Number: </strong>" + feature.properties.MSB_mammal_number + "<br>" +
                           "<strong>Coordinates: </strong>" + feature.geometry.coordinates
                           ;
        layer.bindPopup(popupContent);
      },
      pointToLayer: function(feature, latlng) {
        var color = getColor(feature.properties.scientific_name);
        return L.circleMarker(latlng, { 
          fillColor: color.color,
          color: color.stroke,
          weight: 2,
          opacity: 1,
          fillOpacity: 1
         });
      }
    }).addTo(markers)
  
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

  }});

  
