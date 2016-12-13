
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

    if (options.screenDivId)
        this.screen = $('#' + options.screenDivId);

    var self = this;
    $("<button>").addClass("fa fa-expand fa-2x")
            .attr('title', 'Afficher la carte en plen écran')
            .on("touchstart click", function (e)
            {
                if (e && e.preventDefault)
                    e.preventDefault();




                if (self.screen.hasClass('ol-screen-full')) {
                    self.screen.removeClass('ol-screen-full');
                    $(this).addClass('fa-expand').removeClass('fa-compress').attr('title', 'Afficher la carte en plen écran');


                } else {
                    self.screen.addClass('ol-screen-full');
                    $(this).removeClass('fa-expand').addClass('fa-compress').attr('title', 'Quitter le mode plein écran');
                }

                self.getMap().updateSize();

            })
            .appendTo(element);



    ol.control.Control.call(this,
            {
                element: element.get(0),
                target: options.target
            });

    setTimeout(function ()
    {
        if (!self.screen)
            self.screen = $('#' + self.getMap().getTarget());

        self.screen.addClass('ol-screen');
        self.getMap().updateSize();

    }, 0);

};


ol.inherits(ol.control.ScreenSwitcherControl, ol.control.Control);
