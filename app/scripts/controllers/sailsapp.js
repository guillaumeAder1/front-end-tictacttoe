'use strict';

/*
example how to use angular an socket io adn make the unti test Work

    https://loopback.io/doc/en/lb2/Realtime-socket-io.html
    https://www.html5rocks.com/en/tutorials/frameworks/angular-websockets/
*/


/**
 * @ngdoc function
 * @name frontendApp.controller:SailsappCtrl
 * @description
 * # SailsappCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
    .controller('SailsappCtrl', function($scope, $filter, socketIO) {
        this.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
        $scope.users = [];

        $scope.currentUser = {};

        var io = socketIO.connect();

        this.userLogin = function() {
            var name = $scope._username;

            if (name) {
                $scope.name = name;
                io.socket.post('/SocketUser/create/', { name: name }, angular.bind(this, function(res) {
                    console.log(res);
                    $scope.currentUser = res;
                    this.getuserList();
                    this.getRoomList();

                    io.socket.on('subscriber', angular.bind(this, function(data) {
                        console.log(data)
                        if (data.roomReady) {
                            //alert("room is ready")
                            io.socket.get('/SocketRoom/get/' + data.room.id, function(res, data) {
                                console.log(res, data)
                                var newTemp = $filter("filter")($scope.rooms, { id: res.id });
                                for (var i in $scope.rooms) {
                                    if ($scope.rooms[i].id == res.id) {
                                        $scope.rooms[i] = res;
                                        $scope.$apply();
                                    }
                                }
                            });
                        }
                        //alert(data.user.name, " has subscibe")
                    }));

                    io.socket.on('socketroom', function(res, data) {
                        console.log(res, data);
                        $scope.rooms.push(res.data);
                        $scope.$apply();
                    });

                    io.socket.on('socketuser', function(res, data) {
                        console.log(res, data)
                        if (res.verb === 'created') {
                            $scope.users.push(res.data);
                            $scope.$apply();
                        }
                    });

                }));
            }
        };

        //var name = prompt('Enter your name');

        $scope.createRoom = function() {
            io.socket.post('/SocketRoom/create/', { user: $scope.currentUser }, angular.bind(this, function(res) {
                console.log(res);
                this.ctrl.getRoomList();
            }));
        };

        this.getuserList = function() {
            io.socket.get('/SocketUser/', function(res, data) {
                console.log(res, data);
                $scope.users = data.body;
                $scope.$apply();
            });
        };
        this.getRoomList = function() {
            io.socket.get('/SocketRoom/', function(res, data) {
                console.log(res, data);
                $scope.rooms = data.body;
                $scope.$apply();
            });
        };

        $scope.joinRoom = function(index) {
            //console.log(index)
            io.socket.post('/SocketRoom/join', {
                room: index.room,
                user: $scope.currentUser
            }, function(res, data) {
                console.log(res, data)
            });
        };

        $scope.dropData = function() {
            io.socket.get('/SocketRoom/dropData', function(res, body) {
                console.log(res, body);
            });
        };
    });