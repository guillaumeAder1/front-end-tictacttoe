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
        $scope.rooms = [];
        $scope.selectedRoom = [];


        $scope.newUser = function() {

            io.socket.get('/room', function(res, d) {
                console.log(res, d)
                $scope.rooms = res;
                $scope.$apply();
            });

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
        };

        $scope.getConnected = function() {
            restApi.getUserConnected().then(function(res) {
                $scope.connected = res
            });

        };

        io.socket.on('new-user-event', function(d, e) {
            // $scope.users = d.list;
            // $scope.currentUser = d.user;
            // $scope.$apply();
        });

        $scope.selectPlayer = function(index) {
            var roomName = $scope.users[index].socketId + '_' + $scope.currentUser.socketId;
            var players = [];
            players.push($scope.users[index]);
            players.push($scope.currentUser);

            io.socket.post('/room', { name: roomName, roomId: roomName, players: players }, function(data) {
                console.log(data);
                $scope.rooms.push(data);
                $scope.$apply();
                // join a room
                io.socket.post('/room/' + data.roomId + '/' + $scope.currentUser.socketId);
                //io.socekt.post('/room/' + data.roomId + '/' + $scope.users[index].socketId)
            });
        };

        $scope.joinRoom = function(index) {
            var room = $scope.rooms[index];
            io.socket.post('/room/' + room.roomId + '/' + $scope.currentUser.socketId);

            io.socket.get('/room/' + room.roomId + '/members', function(res, d) {
                console.log(res, d);
            });

        };

        io.socket.on('room-event', function(d, e) {
            console.log(d, e);
            alert(d.data);
        });

        $scope.leaveRoom = function() {
            // io.socket.
        };
    });