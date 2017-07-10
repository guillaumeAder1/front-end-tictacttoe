'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:GameCtrl
 * @description
 * # GameCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
    .controller('GameCtrl', function($scope) {
        this.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
        console.log(this.userid, $scope.userid);

        // init grid and status
        this.grid = [
            [{ name: 'a1' }, { name: 'a2' }, { name: 'a3' }],
            [{ name: 'b1' }, { name: 'b2' }, { name: 'b3' }],
            [{ name: 'c1' }, { name: 'c2' }, { name: 'c3' }]
        ];

        // cell click event
        this.clickCell = function(cell) {
            console.log(cell);
            cell.value = "X";
            io.socket.post('/SocketRoom/postMessage', {
                data: {
                    msg: 'play',
                    grid: this.grid,
                    roomName: this.roomid
                }
            }, function(res, body) {
                console.log(res, body);
            })
        };

        this.initGameEvent = function() {
            io.socket.on('subscriber', angular.bind(this, function(data) {
                console.log(data)
            }));
        };

        this.initGameEvent();


    });