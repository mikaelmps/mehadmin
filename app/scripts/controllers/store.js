'use strict';

angular.module('mehadminApp').controller('StoreCtrl', function ($scope, $http, $routeParams, $location, StoreService) {
    this.store = $routeParams.id;
    $scope.stores = [];
    angular.element( document.querySelector('svg')).remove();
    StoreService.getStores();
    $scope.store = _.find(StoreService.getData().stores, function(store){
        return store.id === $routeParams.id;
    });

    // $scope.update = function(store) {
    // 	$scope.store = store;
    // 	$location.path('/');
    // }
});
