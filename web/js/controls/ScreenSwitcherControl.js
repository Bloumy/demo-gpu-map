
/** Créé un bouton pour switcher la carte en plein ecran
 *
 * @constructor
 * @extends {ol.control.Control}
 * @param {Object=} opt_options Control options.
 *		target {String} id du div qui contiendra le bouton
 *		screenDivId {String} id du div qui passe en plein écran
 */
ol.control.ScreenSwitcherControl = function (options)
{
    options = options || {};
    var element = $("<div>").addClass('ol-screen-switch ol-unselectable ol-control');
    var self = this;

    $("<button>").addClass("fa fa-expand fa-2x")
            .attr('title', 'Afficher la carte en plen écran')
            .on("touchstart click", function (e)
            {
                if (e && e.preventDefault)
                    e.preventDefault();

                if (options.screenDivId) {

                    if ($('#' + options.screenDivId).hasClass('ol-screen-full')) {
                        $('#' + options.screenDivId).removeClass('ol-screen-full');
                        $(this).addClass('fa-expand');
                        $(this).removeClass('fa-compress');


                    } else {
                        $('#' + options.screenDivId).addClass('ol-screen-full');
                        $(this).removeClass('fa-expand');
                        $(this).addClass('fa-compress');
                    }
                }

                self.getMap().updateSize();

            })
            .appendTo(element);

    if (options.screenDivId)
        $('#' + options.screenDivId).addClass('ol-screen');

    ol.control.Control.call(this,
            {
                element: element.get(0),
                target: options.target
            });

    setTimeout(function ()
    {
        self.getMap().updateSize();
    }, 0);

};


ol.inherits(ol.control.ScreenSwitcherControl, ol.control.Control);
