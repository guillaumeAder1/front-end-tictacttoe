'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:GameCtrl
 * @description
 * # GameCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
    .controller('GameCtrl', function() {
        this.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
        // init grid and status
        this.grid = [
            [{ name: 'a1' }, { name: 'a2' }, { name: 'a3' }],
            [{ name: 'b1' }, { name: 'b2' }, { name: 'b3' }],
            [{ name: 'c1' }, { name: 'c2' }, { name: 'c3' }]
        ];

        // cell click event
        this.clickCell = function(cell) {
            console.log(cell);

        };


    });