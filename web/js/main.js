/* global ol */

function initMap() {
    var map = new ol.Map({
        target: 'map', // The DOM element that will contains the map
        renderer: 'canvas', // Force the renderer to be used
        layers: [
            // Add a new Tile layer getting tiles from OpenStreetMap source
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        // Create a view centered on the specified location and zoom level
        view: new ol.View({
            center: ol.proj.transform([2.1833, 41.3833], 'EPSG:4326', 'EPSG:3857'),
            zoom: 6
        })
    });
    
    return map;
}


function addControls(){
    
    // outil de recherche
    var searchControl;
    
    // controls du menu de la carte 
    var screenSwitcherControl;
    var featureInfoControl;
    var drawFeaturesControl;
    var measureControl;
    var printControl;
    
    // Outils de selection de couche
    var layerSwitcherControl; 
    var treeLayerSwitcherControl;
    
    var legendControl;
}

$(document).ready(function () {
    var map = initMap();
    addControls(map);
});