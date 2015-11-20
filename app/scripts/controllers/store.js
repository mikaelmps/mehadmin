'use strict';

angular.module('mehadminApp').controller('StoreCtrl', function ($scope, $http, $routeParams) {
    this.store = $routeParams.id;
    $scope.stores = [];
    angular.element( document.querySelector('svg')).remove()

});
