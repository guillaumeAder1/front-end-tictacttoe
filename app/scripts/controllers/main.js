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
        $scope.userId = "";
        //var io = io;
        $scope.newUser = function() {

            io.socket.get("/user/newuser/" + $scope.toto, function(body, jwr) {
                console.log('Sails responded with: ', body);
            });
            console.log($scope.toto);
        };

        $scope.getUserList = function() {
            restApi.getUsers().then(function(res) {
                //$scope.users = res;
            });
        }

        $scope.getConnected = function() {
            restApi.getUserConnected().then(function(res) {
                $scope.connected = res
            })

        }

        io.socket.on('response-event', function(d, e) {
            $scope.users = d.list
            $scope.$apply();
        })

        $scope.leaveRoom = function() {
            // io.socket.
        }
    });