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
        $scope.currentUser;
        //var io = io;
        $scope.newUser = function() {

            io.socket.get("/user/newuser/" + $scope.toto, function(body, jwr) {
                console.log('Sails responded with: ', body);
            });
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

        io.socket.on('new-user-event', function(d, e) {
            $scope.users = d.list;
            $scope.currentUser = d.user;
            $scope.$apply();
        })

        $scope.selectPlayer = function(index) {
            var player = $scope.users[index];
            var data = {
                player1: player,
                player2: $scope.currentUser
            }
            io.socket.post('/lobby/newgame', { data }, function(e, i) {
                console.log(e, i);
            })
        }

        $scope.leaveRoom = function() {
            // io.socket.
        }
    });