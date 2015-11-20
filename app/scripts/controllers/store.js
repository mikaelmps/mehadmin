'use strict';

angular.module('mehadminApp').controller('StoreCtrl', function ($scope, $http, $routeParams, $location) {
    this.store = $routeParams.id;
    $scope.stores = [];
    angular.element( document.querySelector('svg')).remove();

    $scope.store = {
    	"beacon_id": [22],
    	"full_name": "Vapiano",
    	"game_over": "1",
    	"hits": Math.floor((Math.random()*25)+10),
    	"id": "vapiano",
    	"location_x": 120,
    	"location_y": 70,
    	"riddle_1": "German Italian Food",
    	"riddle_2": "Homemade Pasta",
    	"weight": "1"
    };

    $scope.update = function(store) {
    	$scope.store = store;
    	$location.path('/');
    }
});
