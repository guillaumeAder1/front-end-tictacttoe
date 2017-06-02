'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:EsrimapCtrl
 * @description
 * # EsrimapCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
    .controller('EsrimapCtrl', function(esriLoader) {
        console.log(esriLoader)
        var self = this;
        esriLoader.require(['esri/Map'], function(Map) {
            self.map = new Map({
                basemap: 'streets'
            });
        });
    });