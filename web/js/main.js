/* global ol, map */

// si map non global, erreur js a la fin de ol3-ext.js
var map = null;

var viewProjection = 'EPSG:3857';

var centerProjection = 'EPSG:4326';
var mapCenterBase = [3.045080502396645, 46.88264754462082];

function initMap() {
    var map = new ol.Map({
        target: 'gpu-map', // The DOM element that will contains the map
        renderer: 'canvas', // Force the renderer to be used
        layers: [
            // Add a new Tile layer getting tiles from OpenStreetMap source
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        // Create a view centered on the specified location and zoom level
        view: new ol.View({
            center: ol.proj.transform(mapCenterBase, centerProjection, viewProjection),
            zoom: 6,
            projection: viewProjection
        })
    });

    return map;
}

/**
 * 
 * @param {ol.Map} map
 */
function addControls(map) {

    // outil de recherche
    var searchControl;

    // bar d'outils
    var barControl = new ol.control.Bar();
    barControl.setPosition('right');
    map.addControl(barControl);


    // controle du menu de la carte 
    var screenSwitcherControl = new ol.control.ScreenSwitcherControl({
        target: "gpu-map",
        screenDivId: "map-container"
    });
    barControl.addControl(screenSwitcherControl);


    var featureInfoControl;
    var drawFeaturesControl;
    
    var measureControl = new ol.control.MeasureControl({
        target: "gpu-map"
    });
    measureControl.setMap(map);
    barControl.addControl(measureControl);
    
    var printControl;

    // Outils de selection de couche
    var layerSwitcherControl;
    var treeLayerSwitcherControl;

    var legendControl;
    
    var permalink;
    
    var echelle;

}

$(document).ready(function () {
    map = initMap();
    addControls(map);
});