module.exports = function (grunt) {

// Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            jquery: {
                expand: true,
                flatten: true,
                src: ['node_modules/jquery/dist/**'],
                dest: 'web/vendor/jquery/',
                filter: 'isFile'
            },
            bootstrap: {
                expand: true,
                flatten: true,
                src: ['node_modules/bootstrap/dist/**'],
                dest: 'web/vendor/bootstrap/',
                filter: 'isFile'
            },
            bootstrapTypeahead: {
                expand: true,
                flatten: true,
                src: ['node_modules/bootstrap-typeahead/bootstrap-typeahead.js'],
                dest: 'web/vendor/bootstrap-typeahead/',
                filter: 'isFile'
            },
            openlayers: {
                expand: true,
                flatten: true,
                src: ['node_modules/openlayers/dist/**'],
                dest: 'web/vendor/openlayers/',
                filter: 'isFile'
            },
            geoportalAccessLib: {
                expand: true,
                flatten: true,
                src: ['web/js/GpServices.js'], // attention, mis en dur dans web/js, devrait etre extrait depuis node_module
                dest: 'web/vendor/geoportal-access-lib/',
                filter: 'isFile'
            },
            fontAwesomeCss: {
                expand: true,
                flatten: true,
                src: ['node_modules/font-awesome/css/**'],
                dest: 'web/vendor/font-awesome/css/',
                filter: 'isFile'
            },
            fontAwesomeFont: {
                expand: true,
                flatten: true,
                src: ['node_modules/font-awesome/fonts/**'],
                dest: 'web/vendor/font-awesome/fonts/',
                filter: 'isFile'
            }
        }
    });


    grunt.loadNpmTasks('grunt-contrib-copy');


    grunt.registerTask('default', ['copy']);
};