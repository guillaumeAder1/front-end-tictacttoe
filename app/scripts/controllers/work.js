'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:WorkCtrl
 * @description
 * # WorkCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
    .controller('WorkCtrl', function($scope, $http) {

        $scope.works = [];
        $scope.search = "all";
        $scope.types = ["all", "web", "graphic"]
        this.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        $http.get('works-data.json')
            .then(function(res) {
                console.log(res);
                if (res.status != 200) {
                    return false;
                }
                $scope.works = res.data;
            });
    });