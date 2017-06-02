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
        // init vars
        $scope.works = [];
        $scope.search = "all";
        // $scope.types = ["all", "web", "graphic"];
        $scope.types = ["all"];
        // get json data
        $scope.getData = function() {
            $http.get('works-data.json')
                .then(function(res) {
                    console.log(res);
                    if (res.status !== 200) {
                        return false;
                    }
                    $scope.works = res.data;
                    for (var i in $scope.works) {
                        if ($scope.types.indexOf($scope.works[i].type) === -1) {
                            $scope.types.push($scope.works[i].type);
                        }
                    }
                    console.log($scope.types);
                });
        };
        // change filter (web / graphic)
        $scope.selectFilter = function(val) {
            console.log($scope.types[val]);
            $scope.search = $scope.types[val];

        };

        $scope.isSelected = function(index) {
            return ($scope.search == $scope.types[index]) ? true : false;
        };

        $scope.getData();
    });