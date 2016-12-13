
/** Créé un bouton pour switcher la carte en plein ecran
 *
 * @constructor
 * @extends {ol.control.Control}
 * @param {Object=} opt_options Control options.
 *		target {String} id du div qui contiendra le bouton
 *		resultsDiv {String} id du div qui passe en plein écran
 */
ol.control.MeasureControl = function (options)
{
    options = options || {};

    // extraction des options
    if (options.resultsDivId)
        this.resultsDiv = $('#' + options.resultsDivId);



    var getFeaturesStyle = function () {

        var stroke = new ol.style.Stroke({color: 'rgba(60, 136, 0, 1)', width: 2});
        var fill = new ol.style.Fill({color: 'red'});

        return new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'rgba(60, 136, 0, 1)',
                width: 2,
                lineDash: [5]
            }),
            image: new ol.style.RegularShape({
                fill: fill,
                stroke: stroke,
                points: 4,
                radius: 10,
                radius2: 0,
                angle: 0
            })
        });
    };



    // ajout de la couche de mesure
    this.measurementLayer = new ol.layer.Vector({
        source: new ol.source.Vector(),
        style: getFeaturesStyle()
    });


    var self = this;


    // creation des interactions de mesure
    var measureDistanceInteraction = new ol.interaction.Draw({
        type: 'LineString',
        source: this.measurementLayer.getSource(),
        style: getFeaturesStyle()
    });

    measureDistanceInteraction.on('drawstart', function (event) {
        self.measurementLayer.getSource().clear();
        self.resultsDiv.show();


        event.feature.on('change', function (event) {
            var measurement = event.target.getGeometry().getLength();
            var measurementFormatted = measurement > 100 ? (measurement / 1000).toFixed(2) + 'km' : measurement.toFixed(2) + 'm';
            self.resultsSpan.html(measurementFormatted);
        });
    });




    var measureAreaInteraction = new ol.interaction.Draw({
        type: 'Polygon',
        source: this.measurementLayer.getSource(),
        style: getFeaturesStyle()
    });

    measureAreaInteraction.on('drawstart', function (event) {

        self.measurementLayer.getSource().clear();
        self.resultsDiv.show();

        event.feature.on('change', function (event) {
            var measurement = event.target.getGeometry().getArea();
            var measurementFormatted = measurement > 100 ? (measurement / 1000).toFixed(2) + 'km' : measurement.toFixed(2) + 'm';

            self.resultsSpan.html(measurementFormatted + '<sup>2</sup>');
        });
    });



    var reset = function () {
        $(self.getMap().getTargetElement()).removeClass('measure-on');
        self.measurementLayer.getSource().clear();
        self.resultsDiv.hide();
    };

    // ajout des controles de dessin line et poly
    var distanceMeasure = new ol.control.Toggle({
        onToggle: function (active) {
            reset();
            if (active) {
                $(self.getMap().getTargetElement()).addClass('measure-on');
                self.resultsDiv.show();
                self.resultsSpan.html('0km');
            }
        },
        interaction: measureDistanceInteraction
    });

    var areaMeasure = new ol.control.Toggle({
        onToggle: function (active) {
            reset();
            if (active) {
                $(self.getMap().getTargetElement()).addClass('measure-on');
                self.resultsDiv.show();
                self.resultsSpan.html('0km<sup>2</sup>');
            }
        },
        interaction: measureAreaInteraction
    });


    // ajout du sous menu pour y placer ses controles
    this.subMenuBar = new ol.control.Bar({
        toggleOne: true,
        autoDeactivate: true,
        controls: [distanceMeasure, areaMeasure]
    });

    var measureControl = new ol.control.Toggle({
        onToggle: function () {
            reset();
        },
        className: "ol-measures",
        bar: this.subMenuBar
    });


    // devrait se faire au moment du set map mais ne le fait pas
    setTimeout(function () {
        self.getMap().addControl(self.subMenuBar);
        self.getMap().addLayer(self.measurementLayer);

        if (!self.resultsDiv) {
            self.resultsDiv = $('<div>').addClass("ol-control measurement-results").appendTo(self.getMap().getViewport()).hide();
        }

        self.resultsSpan = $('<span></span>').addClass("ol-measure-result pull-right").appendTo(self.resultsDiv);

    }, 0);

    ol.control.Control.call(this, {
        element: measureControl.element,
        target: options.target
    });
};







ol.inherits(ol.control.MeasureControl, ol.control.Toggle);



