'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
    .controller('MainCtrl', function($scope, restApi) {
        $scope.toto = "toto";
        $scope.users = [];
        $scope.connected = [];
        $scope.newUser = function() {
            restApi.addUser($scope.toto).then(function(res) {
                console.log(res);
            });
            console.log($scope.toto);
        };

        $scope.getUserList = function() {
            restApi.getUsers().then(function(res) {
                $scope.users = res;
            });
        }

        $scope.getConnected = function() {
            restApi.getUserConnected().then(function(res) {
                $scope.connected = res
            })

        }
    });