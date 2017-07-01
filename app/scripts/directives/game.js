'use strict';

/**
 * @ngdoc directive
 * @name frontendApp.directive:game
 * @description
 * # game
 */

angular.module('frontendApp')
    .component('game', {
        templateUrl: 'views/game.html',
        controller: 'GameCtrl',
        controllerAs: 'ctrl'
    });