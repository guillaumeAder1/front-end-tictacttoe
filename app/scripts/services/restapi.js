'use strict';

/**
 * @ngdoc service
 * @name frontendApp.restApi
 * @description
 * # restApi
 * Factory in the frontendApp.
 */
angular.module('frontendApp')
    .factory('restApi', function($http) {
        // Service logic
        // ...

        var meaningOfLife = 42;
        var path = "http://localhost:1337/";

        // Public API here
        return {

            addUser: function(name) {
                return $http.get(path + "user/create?username='" + name + "'").then(function(res) {
                    console.log(res)
                });
            },
            getUsers: function() {
                return $http.get(path + "user/").then(function(res) {
                    return res.data;
                });
            },
            someMethod: function() {
                return meaningOfLife;
            }
        };
    });