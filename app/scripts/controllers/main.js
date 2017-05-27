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

        io.socket.on('connect', function(res, d) {
            // get list of users
            io.socket.get('/user/getusers', function(res, users) {
                $scope.users = users.body;
                $scope.$apply();
            });
            // get list of rooms
            io.socket.get('/room', function(res, d) {
                if (d.error) {
                    console.log('No Rooms created');
                    return;
                }
                $scope.rooms = res;
                $scope.$apply();
            });
        });


        $scope.newUser = function() {

            // io.socket.get('/room', function(res, d) {
            //     console.log(res, d)
            //     $scope.rooms = res;
            //     $scope.$apply();
            // });

            io.socket.get("/user/newuser/" + $scope.toto, function(body, jwr) {

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
            // this call create the room
            io.socket.post('/room', { name: roomName, roomId: roomName, players: players }, function(data) {
                console.log(data);
                $scope.rooms.push(data);
                $scope.$apply();
                // current user join the room
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
            console.log(" ROOM evetn " + d, e);
            //alert(d.msg);
        });

        $scope.leaveRoom = function() {
            // io.socket.
        };

        $scope.dropData = function() {
            io.socket.get('/user/dropdata', function(res, body) {
                console.log(res, body);
            })
        };

        io.socket.on('user', function(data) {
            alert("USER " + data.verb + " " + data.data.socketId);
            $scope.users.push(data.data);
            $scope.$apply();
        });
        io.socket.on('room', function(data) {
            alert("ROOM " + data.verb + " " + data.data.socketId);
            $scope.rooms.push(data.data);
            $scope.$apply();
        });

        io.socket.on('message', function(d, e) {
            console.log("MESSAGE event", d, e)
        })
    });