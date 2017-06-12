'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:SailsappCtrl
 * @description
 * # SailsappCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
    .controller('SailsappCtrl', function($scope) {
        this.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
        $scope.users = [];

        $scope.currentUser = {};

        var name = prompt('Enter your name');
        if (name) {
            $scope.name = name;
            io.socket.post('/SocketUser/create/', { name: name }, angular.bind(this, function(res) {
                console.log(res);
                $scope.currentUser = res;
                this.getuserList();
                this.getRoomList();

                io.socket.on('subscriber', function(data) {
                    console.log(data)
                    alert(data.user.name, " has subscibe")
                });

                io.socket.on('socketroom', function(res, data) {
                    console.log(res, data)
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
            })
        }

        $scope.dropData = function() {
            io.socket.get('/SocketRoom/dropData', function(res, body) {
                console.log(res, body);
            })
        };
    });