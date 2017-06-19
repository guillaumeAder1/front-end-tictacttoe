'use strict';

/**
 * @ngdoc service
 * @name frontendApp.socketIO
 * @description
 * # socketIO
 * Factory in the frontendApp.
 */
angular.module('frontendApp')
    .factory('socketIO', function() {

        var connections = [];
        //var io;
        // Public API here
        return {
            connect: function() {
                //var io = window.io;
                //var io = io.sails.connect('http://127.0.0.1:1337/')
                //io.sails.url = "http://127.0.0.1:1337/";
                //var io = io.sails.connect();

                return window.io;
            }
        };
    });