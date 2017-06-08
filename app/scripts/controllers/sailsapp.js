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

        var name = prompt('Enter your name');
        if (name) {
            $scope.name = name;
            io.socket.post('/SocketUser/create/', { name: name }, angular.bind(this, function(res) {
                console.log(res);
                this.getuserList();
                this.getRoomList();
            }));
        }
        $scope.createRoom = function() {
            io.socket.post('/SocketRoom/create/', { createdBy: $scope.name }, angular.bind(this, function(res) {
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
    });