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
        $scope.currentUser = '';
        $scope.myName = "";

        $scope.newUser = function() {

            io.socket.get("/user/newuser/" + $scope.toto, function(body, jwr) {
                console.log('Sails responded with: ', body);
                $scope.currentUser = body;
                $scope.myName = body.name + " - " + body.socketId;
                $scope.$apply();

                // get list of all users
                io.socket.get('/user', function(body, jwr) {
                    console.log(body, jwr);
                    $scope.users = body;
                    $scope.$apply();
                });
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
            // $scope.users = d.list;
            // $scope.currentUser = d.user;
            // $scope.$apply();
        })

        $scope.selectPlayer = function(index) {
            var roomName = $scope.users[index].socketId + '_' + $scope.currentUser.socketId;
            var players = [];
            players.push($scope.users[index]);
            players.push($scope.currentUser);

            io.socket.post('/room', { name: roomName, players: players }, function(data) {
                console.log(data)
                    //io.socekt.post('/room/' + data.name + '/' + $scope.users[index].socketId)
            });
        }

        $scope.leaveRoom = function() {
            // io.socket.
        }
    });