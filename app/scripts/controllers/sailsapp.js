'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:SailsappCtrl
 * @description
 * # SailsappCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
    .controller('SailsappCtrl', function($scope, $filter) {
        this.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
        $scope.users = [];

        $scope.currentUser = {};

        this.myRooom = false;

        this.message = "";

        //$scope.msgtest = 'hello world';
        this.msgtest = 'hello world';
        this.roomId = '';

        // when new user created
        this.userLogin = function() {

            var name = $scope._username;

            if (name) {
                $scope.name = name;
                // create a new user
                io.socket.post('/SocketUser/create/', { name: name }, angular.bind(this, function(res) {
                    console.log(res);
                    $scope.currentUser = res;
                    this.getuserList();
                    this.getRoomList();

                    // listener when someone else subscribe to my room      
                    io.socket.on('subscriber', angular.bind(this, function(data) {
                        console.log(data)

                        if (data.message) { this.newMessage(data); }
                        if (data.roomReady) {

                            this.myRoom = data;
                            // get and refresh the room list
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
                    }));
                    // listener for Room controller 
                    io.socket.on('socketroom', function(res, data) {
                        console.log(res, data);
                        $scope.rooms.push(res.data);
                        $scope.$apply();
                    });
                    // listener for User controller
                    io.socket.on('socketuser', function(res, data) {
                        console.log(res, data)
                        if (res.verb === 'created') {
                            $scope.users.push(res.data);
                            $scope.$apply();
                        }
                    });

                }));
            }
        }


        this.createRoom = function() {
            io.socket.post('/SocketRoom/create/', { user: $scope.currentUser }, angular.bind(this, function(res) {
                console.log(res);
                this.getRoomList();
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

        this.joinRoom = function(index) {
            //console.log(index)
            io.socket.post('/SocketRoom/join', {
                room: index.room,
                user: $scope.currentUser
            }, function(res, data) {
                console.log(res, data)
                if (res && res.error) { alert(res.error); }
            })
        };

        // clear the data (destroy collection room and users)
        this.dropData = function() {
            io.socket.get('/SocketRoom/dropData', function(res, body) {
                console.log(res, body);
            })
        };

        // send a message to user in the same room
        this.postMessage = function() {
            if (!this.myRoom) {
                return false;
            }
            this.roomId = this.myRoom.room.createdBy + "-" + this.myRoom.room.id;

            io.socket.post('/SocketRoom/postMessage', {
                data: {
                    msg: $scope._messageToUser,
                    roomName: this.myRoom.room.createdBy + "-" + this.myRoom.room.id
                }
            }, function(res, body) {
                console.log(res, body);
            })
        };


        this.newMessage = function(msg) {
            this.message = msg.message;
            $scope.$apply();
        }
    });